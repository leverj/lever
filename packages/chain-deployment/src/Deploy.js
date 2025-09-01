import {JsonFileStore} from '@leverj/lever.storage'
import {verifyContract} from '@nomicfoundation/hardhat-verify/verify'
import {encodeBytes32String, JsonRpcProvider, Wallet} from 'ethers'
import * as glob from 'glob'
import hre, {artifacts, config, network} from 'hardhat'
import {Map} from 'immutable'
import {cloneDeep} from 'lodash-es'
import {execSync} from 'node:child_process'
import {tmpdir} from 'node:os'
import {setTimeout} from 'node:timers/promises'
import {inspect} from 'node:util'
import * as networksByChain from 'viem/chains'
import {Create3Factory, deployCreate3Factory, deployViaCreate3Factory} from './create3.js'

/*** from https://github.com/blockscout/chainscout/blob/main/data/chains.json ***/
import blockscoutExplorerUrls_ from './chainscout-chains.json' with {type: 'json'}

const {ethers: {deployContract, getContractFactoryFromArtifact}} = await network.connect() //fixme:hardhat: need to do per network?

const toNetworkCanon = (chain, network) => {
  const {id, name, nativeCurrency, rpcUrls, blockExplorers} = cloneDeep(network)
  if (!id || !name || !rpcUrls) return null
  const providerURL = rpcUrls.default.http[0]
  const blockExplorer = blockExplorers?.default ?? {}
  const contracts = {}
  const testnet = !!network.testnet || chain === 'hardhat' || chain === 'localhost'
  return {id: BigInt(id), chain, name, nativeCurrency, providerURL, blockExplorer, contracts, testnet}
}
export const networks = Map(networksByChain).map((network, chain) => toNetworkCanon(chain, network)).filter(_ => !!_).toJS()
export const blockscoutExplorerUrls = Object.assign({}, blockscoutExplorerUrls_)

/** custom network should look like network definitions in viem/chains */
export const registerCustomNetwork = (chain, network) => {
  networks[chain] = toNetworkCanon(chain, network)
  blockscoutExplorerUrls[network.id] = {
    explorers: [
      {
        url: network.blockExplorers.default.url,
        hostedBy: 'custom',
      }
    ]
  }
}

export class Deploy {
  static from(config) {
    const {deploymentDir, env} = config
    const store = new JsonFileStore(`${deploymentDir}/${env}`, '.evms')
    return new this(config, store)
  }

  constructor(config, store) {
    this.config = config
    this.store = store
    this.logger = config.logger ?? console
    this.deployer = new Wallet(config.deployer.privateKey)
  }

  async to(chain, options = {}) {
    const network = networks[chain]
    if (!network) throw Error(`chain ${chain} is not supported`)
    else if (!this.store.has(chain)) {
      const providerURL = process.env[`${chain.toUpperCase()}_PROVIDER_URL`] ?? network.providerURL
      this.store.set(chain, Object.assign({}, network, {providerURL}))
    }

    this.logger.log(`${'*'.repeat(30)} starting deploying contracts on [${chain} @ ${networks[chain].providerURL}] chain `.padEnd(120, '*'))
    this.logger.log(`${'-'.repeat(60)} config `.padEnd(120, '-'))
    const {env, deploymentDir, constructors} = this.config
    this.logger.log(inspect({env, deployer: this.deployer.address, deploymentDir, constructors}))
    this.logger.log('-'.repeat(120))
    this.compileContracts()
    await this.deployContracts(chain, options)
    this.logger.log(`${'*'.repeat(30)} finished deploying contracts `.padEnd(120, '*'))
  }

  compileContracts() {
    this.logger.log(`compiling contracts `.padEnd(120, '.'))
    execSync(`npx hardhat compile --build-profile production --quiet --config ${process.cwd()}/hardhat.config.js`)
  }

  async deployContracts(chain, options) {
    const getContractAddress = (name) => this.store.get(chain).contracts[name]?.address

    const {providerURL, block, id} = this.store.get(chain)
    const provider = new JsonRpcProvider(providerURL)
    const deployer = this.deployer.connect(provider)
    this.config.setContractsConstructors(chain)
    const constructors = this.config.constructors[chain]

    this.logger.log(`deploying contracts: [${Object.keys(constructors)}] `.padEnd(120, '.'))
    if (!block) this.store.update(chain, {block: await provider.getBlockNumber()}) // establish start block
    if (options.create3 && !getContractAddress(Create3Factory.contractName)) {
      this.logger.log(`deploying Create3 Factory contract keylessly [${Create3Factory.contractName}] `.padEnd(120, '.'))
      this.storeDeployedContract(chain, await deployCreate3Factory(deployer))
    }
    for (let [name, {libraries, params}] of Object.entries(constructors)) {
      const translateAddresses = (params = []) => params.map(_ => Array.isArray(_) ? translateAddresses(_) : getContractAddress(_) ?? _)
      const translateLibraries = (names = []) => names.reduce((result, _) => Object.assign(result, ({[_]: getContractAddress(_)})), {})

      libraries = translateLibraries(libraries)
      params = translateAddresses(params)
      if (options.create3) {
        if (getContractAddress(name) && options.reset) throw Error('no can do right now') //fixme:create3: must deploy to a different address; use a different salt?
        else {
          //fixme:create3: problem is, in order to have same address on all blockchains, we cannot change it after first production deployment .
          //so, how to pass-in and enforce uniqueness methodically?
          const unique = '1'
          const salt = encodeBytes32String(`${name}.${unique}`)
          const artifact = await artifacts.readArtifact(name)
          const contractFactory = await getContractFactoryFromArtifact(artifact, {libraries, signer: deployer})
          this.storeDeployedContract(chain, await deployViaCreate3Factory(deployer, contractFactory, name, params, salt))
        }
      } else if (!getContractAddress(name) || options.reset) {
        this.logger.log(`deploying ${name} contract `.padEnd(120, '.'))
        this.storeDeployedContract(chain, await this.deployContract(name, params, {libraries, signer: deployer}))
        await setTimeout(200) // note: must wait a bit to avoid "Nonce too low" error
      }
      if (options.verify) {
        const network = this.store.get(chain)
        if (false) {
          const explorerUrl = blockscoutExplorerUrls[id]?.explorers[0].url
          await blockscout.verifyContract(this.logger, network, name, libraries ?? {}, explorerUrl)
        } else {
          await this.verifyContract(network, name, params, libraries)
        }
      }
    }
  }

  async deployContract(name, params, factoryOptions) {
    const contract = await deployContract(name, params, factoryOptions)
    const address = contract.target
    const blockCreated = await contract.deploymentTransaction().wait().then(_ => _.blockNumber)
    return {name, address, blockCreated}
  }

  storeDeployedContract(chain, {name, address, blockCreated}) {
    if (!address) return this.logger.error(`failed to deploy ${name} contract `.padEnd(120, '.')) //fixme:create3: needed?
    this.store.update(chain, {contracts: {[name]: {address, blockCreated}}})
  }

  //fixme:hardhat: look into using hardhat-verify
  async verifyContract(network, name, constructorArgs, libraries) {
    const address = network.contracts[name].address
    try {
      // execSync(`npx hardhat verify blockscout --network ${network.chain} ${address} ...constructorArgs`)
      await verifyContract(
        {
          address,
          constructorArgs,
          libraries,
          contract: fullyQualifiedNames[name],
          provider: 'blockscout',
        },
        hre
      )
    } catch (e) {
      const {
        solcLongVersion,
        input: {
          settings: {
            evmVersion,
            optimizer,
          }
        }
      } = await getBuildInfo(name)
      this.logger.warn(`verifying on chain ${network.chain} [${network.id}] is not supported`)
      this.logger.warn(`instead, try verifying manually using the following data:`)
      this.logger.warn('-'.repeat(120))
      this.logger.log('Contract Name:', name)
      this.logger.log('Contract Address:', address)
      this.logger.log('Compiler Type:', 'Solidity (Single File)')
      this.logger.log('License Type:', 'MIT License (MIT)')
      this.logger.log('Compiler Version:', solcLongVersion)
      this.logger.log('Optimization:', optimizer.enabled)
      this.logger.log('Runs (Optimizer):', optimizer.runs)
      this.logger.log('EVM Version to target:', evmVersion)
      this.logger.log('Constructor Arguments:', constructorArgs)
      this.logger.log('Solidity Contract Code (read from file):', await flattenContractSource(name))
      this.logger.log('Libraries:', libraries)
      this.logger.warn('-'.repeat(120))
    }
  }
}

const fullyQualifiedNames = Map(Array.from(await artifacts.getAllFullyQualifiedNames()).map(_ => [_.split(':')[1], _])).toJS()

const getBuildInfo = async (name) => artifacts.getBuildInfoId(name).
  then(_ => artifacts.getBuildInfoPath(_)).
  then(_ => import(_, {with: {type: 'json'}})).
  then(_ => _.default)

const flattenContractSource = async (name) => artifacts.readArtifact(name).
  then(_ => {
    const source_path = _.inputSourceName.replace('project', config.paths.root)
    const flattened_path = `${tmpdir()}/${name}.sol`
    execSync(`npx hardhat flatten ${source_path} | awk '/SPDX-License-Identifier/&&c++>0 {next} 1' > ${flattened_path}`)
    return flattened_path
  })

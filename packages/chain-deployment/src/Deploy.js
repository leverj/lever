import {JsonFileStore} from '@leverj/lever.storage'
import {encodeBytes32String, JsonRpcProvider, Wallet} from 'ethers'
import hre from 'hardhat'
import {Map} from 'immutable'
import {cloneDeep} from 'lodash-es'
import {execSync} from 'node:child_process'
import {setTimeout} from 'node:timers/promises'
import {inspect} from 'node:util'
import * as networksByChain from 'viem/chains'
import {Create3Factory, deployCreate3Factory, deployViaCreate3Factory} from './create3.js'
import {verify} from './verify.js'

/*** from https://github.com/blockscout/chainscout/blob/main/data/chains.json ***/
import blockscoutExplorerUrls_ from './chainscout-chains.json' with {type: 'json'}

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
  if (networksByChain[chain]) throw Error(`attempt to modify a publicly known chain: ${chain}`)
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
    //fixme:hardhat: need to do per network? see: NetworkManager, NetworkConnectionParams
    const {ethers} = await hre.network.connect()

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
    this.logger.log(`compiling contracts `.padEnd(120, '.'))
    execSync(`npx hardhat compile --build-profile production --quiet --config ${process.cwd()}/hardhat.config.js`)
    await this.deployContracts(chain, options, ethers)
    this.logger.log(`${'*'.repeat(30)} finished deploying contracts `.padEnd(120, '*'))
  }

  async deployContracts(chain, options, ethers) {
    const network = this.store.get(chain)
    const getContractAddress = (name) => network.contracts[name]?.address

    const deployer = this.deployer.connect(new JsonRpcProvider(network.providerURL))
    const constructors = this.config.setContractsConstructors(chain)
    this.logger.log(`deploying contracts: [${Object.keys(constructors)}] `.padEnd(120, '.'))

    if (options.create3 && !getContractAddress(Create3Factory.contractName)) {
      this.logger.log(`deploying Create3 Factory keylessly [${Create3Factory.contractName}] `.padEnd(120, '.'))
      this.storeDeployedContract(chain, await deployCreate3Factory(deployer))
    }

    for (let [name, {libraries, params, predeployed}] of Object.entries(constructors)) {
      const translateAddresses = (params = []) => params.map(_ => Array.isArray(_) ? translateAddresses(_) : getContractAddress(_) ?? _)
      const translateLibraries = (names = []) => names.reduce((result, _) => Object.assign(result, ({[_]: getContractAddress(_)})), {})

      libraries = translateLibraries(libraries)
      params = translateAddresses(params)
      if (options.create3) { // the draw-back of the current approach is that all contracts (but the factory) would be redeployed
        if (options.reset) throw Error(`cannot reset when using create3 deployment`)
        else { //fixme:create3:
        /**
        the problem:
          in order to deploy a contract to the same address across all blockchains, we can deploy it only once.
          (as 'selfdestruct' opcode is gone; see: https://rya-sge.github.io/access-denied/2024/03/13/EIP-6780-selfdestruct/)
          therefore, in-order to "redeploy", we have to change the newly expected address, for which the salt is a contributing factor.
          so, how to do this methodically?
        the solution:
          pass the salt (really a sprinkle) in together with the create3 deploy option.
        */
          const salt = encodeBytes32String(`${name}.${options.salt || 'first'}`)
          const contractFactory = await ethers.getContractFactory(name, {libraries, signer: deployer})
          this.storeDeployedContract(chain, await deployViaCreate3Factory(name, params, contractFactory, deployer, salt))
        }
      } else if (!getContractAddress(name) || options.reset) {
        if (predeployed) this.storeDeployedContract(chain, {name, address: predeployed, blockCreated: 0})
        else {
          this.logger.log(`deploying ${name} contract `.padEnd(120, '.'))
          const contract = await ethers.deployContract(name, params, {libraries, signer: deployer})
          const address = contract.target
          const blockCreated = await contract.deploymentTransaction().wait().then(_ => _.blockNumber)
          this.storeDeployedContract(chain, {name, address, blockCreated})
          await setTimeout(200) // note: must wait a bit to avoid "Nonce too low" error
        }
      }
      if (options.verify) await verify(name, params, libraries, network, this.logger)
    }
    //note: since create3 allows for restoring all contracts, we update the deployment block at the end rather than at start
    const block = Map(network.contracts).reduce((result, _) => Math.min(result, _.blockCreated), Number.MAX_VALUE)
    this.store.update(chain, {block}) // establish start block
  }

  storeDeployedContract(chain, {name, address, blockCreated}) {
    if (!address) return this.logger.error(`failed to deploy ${name} contract `.padEnd(120, '.'))
    this.store.update(chain, {contracts: {[name]: {address, blockCreated}}})
  }
}

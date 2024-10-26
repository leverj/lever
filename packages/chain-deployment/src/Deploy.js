import {JsonStore} from '@leverj/lever.common'
import {default as hardhat} from 'hardhat'
import {Map} from 'immutable'
import {execSync} from 'node:child_process'
import {readFileSync} from 'node:fs'
import {setTimeout} from 'node:timers/promises'
import {Sourcify} from '@nomicfoundation/hardhat-verify/sourcify.js'
import {networks} from './networks.js'
import {verifiableChains} from './verifiable-chains.js'

const {artifacts, ethers: {deployContract, JsonRpcProvider, Wallet}} = hardhat
const contractFullyQualifiedNames = Map((await artifacts.getAllFullyQualifiedNames()).map(_ => [_.split(':')[1], _])).toJS()

export class Deploy {
  static from(config, logger = logger) {
    const {deploymentDir, env} = config
    const store = new JsonStore(`${deploymentDir}/${env}`, '.evms')
    return new this(config, store, logger)
  }

  constructor(config, store, logger) {
    this.config = config
    this.store = store
    this.logger = logger
  }

  async to(chain, options = {}) {
    const network = networks[chain]
    if (!network) throw Error(`chain ${chain} is not supported`)
    else if (!this.store.has(chain)) this.store.set(chain, network)

    this.logger.log(`${'*'.repeat(30)} starting deploying contracts `.padEnd(120, '*'))
    this.logger.log(`${'-'.repeat(60)} config `.padEnd(120, '-'))
    const {deployer, contracts, ...secureConfig} = this.config
    this.logger.log(secureConfig)
    this.logger.log('-'.repeat(120))
    this.compileContracts()
    await this.deployContracts(chain, options)
    this.logger.log(`${'*'.repeat(30)} finished deploying contracts `.padEnd(120, '*'))
  }

  compileContracts() {
    this.logger.log(`compiling contracts `.padEnd(120, '.'))
    execSync(`npx hardhat compile --quiet --config ${process.env.PWD}/hardhat.config.cjs`)
  }

  async deployContracts(chain, options) {
    const {reset, verify} = options
    const network = this.store.get(chain)
    const provider = new JsonRpcProvider(network.providerURL)
    const signer = new Wallet(this.config.deployer.privateKey, provider)
    const contracts = this.config.contracts[chain]
    const deployedContracts = network.contracts

    this.logger.log(`deploying contracts: [${Object.keys(contracts)}] `.padEnd(120, '.'))
    if (!network.block) { // establish start block
      this.store.update(chain, {block: await provider.getBlockNumber()})
    }
    for (let [name, {libraries, params}] of Object.entries(contracts)) {
      if (!deployedContracts[name]?.address || reset) {
        const getContractAddress = (name) => deployedContracts[name]?.address
        const translateAddresses = (params = []) => params.map(_ => Array.isArray(_) ? translateAddresses(_) : getContractAddress(_) || _)
        const translateLibraries = (names = []) => names.reduce((result, _) => Object.assign(result, ({[_]: getContractAddress(_)})), {})

        this.logger.log(`deploying ${name} contract `.padEnd(120, '.'))
        libraries = translateLibraries(libraries)
        params = translateAddresses(params)
        const contract = await deployContract(name, params, {libraries, signer})
        const address = contract.target
        const blockCreated = await provider.getTransactionReceipt(contract.deploymentTransaction().hash).then(_ => _?.blockNumber || -1)
        this.store.update(chain, {contracts: {[name]: {address, blockCreated}}})
        await setTimeout(200) // note: must wait a bit to avoid "Nonce too low" error
      }
      if (verify) await this.verifyContract(chain, name)
    }
  }

  async verifyContract(chain, name) {
    const network = this.store.get(chain)
    const chainId = parseInt(network.id)
    if (!verifiableChains.has(chainId)) return this.logger.warn(`verifying on ${chain} chain (${chainId}) is not supported`)

    const address = network.contracts[name].address
    execSync(`npx hardhat verify --network ${chain} ${address} --config ${process.env.PWD}/hardhat.config.cjs`)
    // const {apiUrl, browserUrl} = hardhat.config.sourcify
    // const sourcify = new Sourcify(chainId, apiUrl, browserUrl)
    // try {
    //   if (!await sourcify.isVerified(address)) execSync(`npx hardhat verify --network ${chain} ${address} --config ${process.env.PWD}/hardhat.config.cjs`)
    //   if (!await sourcify.isVerified(address)) {
    //     const contractFQN = contractFullyQualifiedNames[name]
    //     const files = {
    //       ['metadata.json']: JSON.stringify(await artifacts.getBuildInfo(contractFQN)),
    //       [`${name}.sol`]: readFileSync(contractFQN.split(':')[0], 'utf8'),
    //     }
    //     await sourcify.verify(address, files, 0)
    //   }
    //   const status = await sourcify.isVerified(address)
    //   const contractUrl = await sourcify.getContractUrl(address, status)
    //   this.logger.log(`contract ${address} is verified on Sourcify: ${contractUrl}`)
    // } catch (e) {
    //   this.logger.error(e)
    // }
  }
}
//find . -depth -name "*.ts" -exec sh -c 'f="{}"; mv -- "$f" "${f%.ts}.js"' \;

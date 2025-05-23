import {JsonFileStore} from '@leverj/lever.storage'
import {Map} from 'immutable'
import {default as hardhat} from 'hardhat'
import {cloneDeep} from 'lodash-es'
import {execSync} from 'node:child_process'
import {setTimeout} from 'node:timers/promises'
import {inspect} from 'node:util'
import * as networksByChain from 'viem/chains'
import {verifyContract} from './blockscout.js'

/*** from https://github.com/blockscout/chainscout/blob/main/data/chains.json ***/
import blockscoutExplorerUrls_ from './chainscout-chains.json' with {type: 'json'}

const {ethers: {deployContract, JsonRpcProvider, Wallet}} = hardhat

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
    this.logger.log(inspect({env, deploymentDir, constructors}))
    this.logger.log('-'.repeat(120))
    this.compileContracts()
    await this.deployContracts(chain, options)
    this.logger.log(`${'*'.repeat(30)} finished deploying contracts `.padEnd(120, '*'))
  }

  compileContracts() {
    this.logger.log(`compiling contracts `.padEnd(120, '.'))
    execSync(`npx hardhat compile --quiet --config ${process.cwd()}/hardhat.config.cjs`)
  }

  async deployContracts(chain, options) {
    const {providerURL, block, id} = this.store.get(chain)
    const provider = new JsonRpcProvider(providerURL)
    const signer = new Wallet(this.config.deployer.privateKey, provider)
    this.config.setContractsConstructors(chain)
    const constructors = this.config.constructors[chain]

    this.logger.log(`deploying contracts: [${Object.keys(constructors)}] `.padEnd(120, '.'))
    if (!block) this.store.update(chain, {block: await provider.getBlockNumber()}) // establish start block
    for (let [name, {libraries, params}] of Object.entries(constructors)) {
      const getContractAddress = (name) => this.store.get(chain).contracts[name]?.address
      const translateAddresses = (params = []) => params.map(_ => Array.isArray(_) ? translateAddresses(_) : getContractAddress(_) ?? _)
      const translateLibraries = (names = []) => names.reduce((result, _) => Object.assign(result, ({[_]: getContractAddress(_)})), {})

      libraries = translateLibraries(libraries)
      params = translateAddresses(params)
      if (!getContractAddress(name) || options.reset) {
        this.logger.log(`deploying ${name} contract `.padEnd(120, '.'))
        const contract = await deployContract(name, params, {libraries, signer})
        if (!contract?.target) return this.logger.error(`failed to deploy ${name} contract `.padEnd(120, '.'))
        const address = contract.target
        const blockCreated = await contract.deploymentTransaction().wait().then(_ => _.blockNumber)
        this.store.update(chain, {contracts: {[name]: {address, blockCreated}}})
        await setTimeout(200) // note: must wait a bit to avoid "Nonce too low" error
      }
      if (options.verify) {
        const network = this.store.get(chain)
        const explorerUrl = blockscoutExplorerUrls[id]?.explorers[0].url
        await verifyContract(this.logger, network, name, libraries ?? {}, explorerUrl)
      }
    }
  }
}

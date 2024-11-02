import {JsonStore} from '@leverj/lever.common'
import {default as hardhat} from 'hardhat'
import {execSync} from 'node:child_process'
import {setTimeout} from 'node:timers/promises'
import {verifyContract} from './blockscout.js'
import {networks} from './networks.js'

const {ethers: {deployContract, JsonRpcProvider, Wallet}} = hardhat

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
    this.config.setContractsConstructors(chain)
    const constructors = this.config.constructors[chain]
    const deployedContracts = network.contracts

    this.logger.log(`deploying contracts: [${Object.keys(constructors)}] `.padEnd(120, '.'))
    if (!network.block) { // establish start block
      this.store.update(chain, {block: await provider.getBlockNumber()})
    }
    for (let [name, {libraries, params}] of Object.entries(constructors)) {
      const getContractAddress = (name) => deployedContracts[name]?.address
      const translateAddresses = (params = []) => params.map(_ => Array.isArray(_) ? translateAddresses(_) : getContractAddress(_) || _)
      const translateLibraries = (names = []) => names.reduce((result, _) => Object.assign(result, ({[_]: getContractAddress(_)})), {})

      libraries = translateLibraries(libraries)
      params = translateAddresses(params)
      if (!deployedContracts[name]?.address || reset) {
        this.logger.log(`deploying ${name} contract `.padEnd(120, '.'))
        const contract = await deployContract(name, params, {libraries, signer})
        const address = contract.target
        const blockCreated = await provider.getTransactionReceipt(contract.deploymentTransaction().hash).then(_ => _?.blockNumber || -1)
        this.store.update(chain, {contracts: {[name]: {address, blockCreated}}})
        await setTimeout(200) // note: must wait a bit to avoid "Nonce too low" error
      }
      if (verify) {
        const network = this.store.get(chain)
        const chainId = parseInt(network.id)
        const address = network.contracts[name].address
        await verifyContract(this.logger, name, chainId, address, libraries || {})
      }
    }
  }
}

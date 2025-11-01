import {killProcess, uint} from '@leverj/lever.common'
import {configure} from '@leverj/lever.config'
import {JsonFileStore} from '@leverj/lever.storage'
import {Contract, JsonRpcProvider, Wallet} from 'ethers'
import {rmSync} from 'node:fs'
import waitOn from 'wait-on'
import {postLoad, schema} from '../../config.schema.js'
import {Deploy, networks} from '../Deploy.js'
import {artifacts, establishChainsAt, startHardhatNode} from './help.js'

export class Evms {
  static async ensureConfig(config) {
    if (!config) {
      const {NODE_ENV} = process.env
      const PWD = `${import.meta.dirname}/../..`
      config = await configure(schema, postLoad, {env: {PWD, NODE_ENV}})
    }
    return config
  }

  static async start(chains, config) {
    return new this(chains, await this.ensureConfig(config)).start()
  }

  constructor(chains, config) {
    this.chains = chains
    this.config = config
    this.deployer = new Wallet(config.deployer.privateKey)
    this.deploymentDir = `${config.deploymentDir}/${config.env}`
    rmSync(this.deploymentDir, {recursive: true, force: true})
    this.configFile = establishChainsAt(chains, this.deploymentDir)
  }
  get chainIds() { return this.chains.map(_ => networks[_].id) }
  get logger() { return this.config.logger }
  get store() { return new JsonFileStore(this.deploymentDir, '.evms') }
  get deployed() { return this.store.toObject() }

  contracts(chain) { return this.deployed[chain].contracts }
  provider(chain) { return new JsonRpcProvider(this.deployed[chain].providerURL) }

  async getContractIn(name, chain, wallet) {
    const address = this.contracts(this.primaryChain)[name].address
    const {abi} = await artifacts.readArtifact(name)
    const provider = this.provider(chain)
    return new Contract(address, abi, wallet ? wallet.connect(provider) : provider)
  }

  async start() {
    if (this.isRunning) return
    this.processes = await this.launch()
    this.isRunning = true
    return this
  }

  async stop() {
    if (!this.isRunning) return
    for (let each of this.processes) await killProcess(each)
    this.processes.length = 0
    this.isRunning = false
  }

  async launch() {
    const processes = this.chains.map(_ => {
      const process = startHardhatNode(_, networks[_].id, this.configFile)
      process.stdout.on('store', this.logger.log)
      return process
    })
    for (let chain of this.chains) await waitOn({resources: [networks[chain].providerURL], timeout: 10_000})
    return processes
  }

  async deploy(options = {}, postDeploy = _ => _) {
    if (!this.isRunning) return this.logger.warn('EVMs must run before deploying')

    const deploy = Deploy.from(this.config)
    for (let chain of this.chains) {
      await deploy.to(chain, options)
    }
    await postDeploy(options)
    return this
  }
}

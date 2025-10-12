import {killProcess, uint} from '@leverj/lever.common'
import {configure} from '@leverj/lever.config'
import {JsonFileStore} from '@leverj/lever.storage'
import {JsonRpcProvider} from 'ethers'
import {rmSync} from 'node:fs'
import {exec} from 'node:child_process'
import waitOn from 'wait-on'
import {postLoad, schema} from '../../config.schema.js'
import {Deploy, networks, registerCustomNetwork} from '../Deploy.js'
import {configDir, configFile, createCustomNetwork, writeConfigFile} from './help.js'

export class Evms {
  static establishChains(chains) {
    chains.forEach((chain, i) => {
      const id = 8101 + i
      const network = createCustomNetwork(id, chain)
      registerCustomNetwork(chain, network)
      writeConfigFile(chain, id)
    })
  }

  static async ensureConfig(config) {
    if (!config) {
      const {NODE_ENV} = process.env
      const PWD = `${import.meta.dirname}/../..`
      config = await configure(schema, postLoad, {env: {PWD, NODE_ENV}})
    }
    return config
  }

  static async start(chains, config) {
    this.establishChains(chains)
    return new this(chains, await this.ensureConfig(config)).start()
  }

  constructor(chains, config) {
    this.chains = chains
    this.config = config
    this.deploymentDir = `${config.deploymentDir}/${config.env}`
    rmSync(this.deploymentDir, {recursive: true, force: true})
  }
  get logger() { return this.config.logger }
  get store() { return new JsonFileStore(this.deploymentDir, '.evms') }
  get deployed() { return this.store.toObject() }
  get deployments() {
    return this.store.values().map(_ => ({
      id: uint(_.id),
      chain: _.chain,
      provider: new JsonRpcProvider(_.providerURL),
      contracts: _.contracts,
    }))
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
    rmSync(configDir, {recursive: true, force: true})
  }

  async launch() {
    const processes = this.chains.map(_ => {
      const {port} = new URL(networks[_].providerURL)
      const process = exec(`npx hardhat node --config ${configFile(_)} --port ${port}`)
      process.stdout.on('store', this.logger.log)
      return process
    })
    for (let chain of this.chains) await waitOn({resources: [networks[chain].providerURL], timeout: 10_000})
    return processes
  }

  async deploy(options = {}, postDeploy = _ => _) {
    if (!this.isRunning) return this.logger.warn('EVMs must run before deploying')

    const deploy = Deploy.from(this.config)
    for (let chain of this.chains) await deploy.to(chain, options)
    await postDeploy(options)
    //fixme: now snapshot if required
    return this
  }
}

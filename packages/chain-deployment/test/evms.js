import {Deploy, networks} from '@leverj/lever.chain-deployment'
import {killProcess, uint} from '@leverj/lever.common'
import {configure} from '@leverj/lever.config'
import {JsonFileStore} from '@leverj/lever.storage'
import {JsonRpcProvider} from 'ethers'
import {exec} from 'node:child_process'
import {rmSync} from 'node:fs'
import waitOn from 'wait-on'
import {postLoad, schema} from '../config.schema.js'
import {configFile, establishCustomNetwork} from './help.js'

const createConfig = async () => {
  const {NODE_ENV} = process.env
  const PWD = `${import.meta.dirname}/../..`
  return configure(schema, postLoad, {env: {PWD, NODE_ENV}})
}

export class Evms {
  static async start(chains, config) {
    chains.forEach((_, i) => establishCustomNetwork(8101 + i, _))
    return new this(chains, config ?? await createConfig()).start()
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
      Bridge: _.contracts.Bridge,
      tokens: _.tokens ?? []
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
  }

  async launch() {
    const processes = this.chains.map(_ => {
      const {port} = new URL(networks[_].providerURL)
      const process = exec(`npx hardhat node --config ${(configFile(_))} --port ${port}`)
      process.stdout.on('store', this.logger.log)
      return process
    })
    for (let chain of this.chains) await waitOn({resources: [networks[chain].providerURL], timeout: 10_000})
    return processes
  }

  async deploy(overrides = {}) {
    if (!this.isRunning) return this.logger.warn('EVMs must run before deploying')

    this.config.bridge.publicKey = overrides.publicKey ?? this.config.bridge.publicKey
    const deploy = Deploy.from(this.config)
    for (let chain of this.chains) await deploy.to(chain, {create3: true})
    return this
  }
}

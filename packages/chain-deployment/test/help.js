import {Deploy, networks, registerCustomNetwork} from '@leverj/lever.chain-deployment'
import {ensureExistsSync, killProcess, uint} from '@leverj/lever.common'
import {configure} from '@leverj/lever.config'
import {JsonFileStore} from '@leverj/lever.storage'
import {JsonRpcProvider} from 'ethers'
import {Map} from 'immutable'
import {exec} from 'node:child_process'
import {rmSync, writeFileSync} from 'node:fs'
import waitOn from 'wait-on'
import {postLoad, schema} from '../config.schema.js'

export const chainsById = Map(networks).mapEntries(([chain, _]) => [_.id, chain]).toJS()

export const configDir = `${import.meta.dirname}/hardhat`
export const configFile = (chain) => `${configDir}/${chain}.config.js`
export const writeConfigFile = (chain, chainId) => {
  ensureExistsSync(configDir)
  //fixme: change default to ${chain}
  const source =
    `const {default: config} = await import(\`\${process.env.PWD}/hardhat.config.js\`)
    |export default Object.assign(config, {
    |  networks: {
    |    default: {
    |      chainId: ${chainId},  /*** ${chain} ***/
    |      gasPrice: 0,
    |      initialBaseFeePerGas: 0,
    |    }
    |  }
    |})
    |`.replaceAll(/[ \t]+\|/g, '')
  writeFileSync(configFile(chain), source)
}

export const createCustomNetwork = (
  id,
  chain,
  name = chain.charAt(0).toUpperCase() + chain.slice(1).replaceAll('_', '-'),
  rpcUrl = `http://localhost:${id}`,
  blockExplorerUrl = `http://localhost:${id + 4000}`
) => ({
    id,
    name,
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: {
      default: {
        http: [rpcUrl],
      },
    },
    blockExplorers: {
      default: {
        name: `${name} Scout`,
        url: blockExplorerUrl,
        apiUrl: '',
      },
    },
    testnet: true,
  }
)

export const establishCustomNetwork = (id, chain, name, rpcUrl, blockExplorerUrl) => {
  const network = createCustomNetwork(id, chain, name, rpcUrl, blockExplorerUrl)
  registerCustomNetwork(chain, network)
  writeConfigFile(chain, id)
}

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

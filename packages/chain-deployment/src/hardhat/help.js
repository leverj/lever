import {ensureExistsSync, killProcess, uint} from '@leverj/lever.common'
import {configure} from '@leverj/lever.config'
import {JsonFileStore} from '@leverj/lever.storage'
import {JsonRpcProvider} from 'ethers'
import {config, network} from 'hardhat'
import {Map} from 'immutable'
import {rmSync, writeFileSync} from 'node:fs'
import {exec} from 'node:child_process'
import waitOn from 'wait-on'
import {postLoad, schema} from '../../config.schema.js'
import {Deploy, networks, registerCustomNetwork} from '../Deploy.js'

export {artifacts, config, network} from 'hardhat'

const {mnemonic, path} = config.networks.default.accounts, phrase = await mnemonic.get()

export const connectToNetwork = async (params) => {
  const {ethers, networkConfig: {chainId}, networkHelpers: evm} = params ?
    await network.connect({name: params.chain, url: params.providerURL, chainId: params.chainId}) :
    await network.connect()
  const {deployContract, getSigners, getContractAt, HDNodeWallet, Mnemonic, provider} = ethers
  const accounts = await getSigners()
  const wallets = accounts.map((value, i) => HDNodeWallet.fromMnemonic(Mnemonic.fromPhrase(phrase), `${path}/${i}`))
  return {
    ethers, chainId, evm,
    deployContract, getContractAt, provider,
    accounts, wallets,
  }
}

export const configDir = `${import.meta.dirname}/hardhat`
export const configFile = (chain) => `${configDir}/${chain}.config.js`
export const writeConfigFile = (chain, chainId) => {
  ensureExistsSync(configDir)
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

export const chainsById = Map(networks).mapEntries(([chain, _]) => [_.id, chain]).toJS()

export class Evms {
  static async start(chains, config) {
    chains.forEach((chain, i) => {
      const id = 8101 + i
      const network = createCustomNetwork(id, chain/*, name, rpcUrl, blockExplorerUrl */) //fixme
      registerCustomNetwork(chain, network)
      writeConfigFile(chain, id)
    })
    if (!config) {
      const {NODE_ENV} = process.env
      const PWD = `${import.meta.dirname}/../..`
      config = configure(schema, postLoad, {env: {PWD, NODE_ENV}})
    }
    return new this(chains, config).start()
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
    // return Object.values(this.deployed).map(_ => ({ //fixme
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

  //options = {create3: true}
  async deploy(options = {}, postDeploy = _ => _) {
    if (!this.isRunning) return this.logger.warn('EVMs must run before deploying')

    const deploy = Deploy.from(this.config)
    for (let chain of this.chains) await deploy.to(chain, options)
    await postDeploy(options)
    //fixme: now snapshot if required
    return this
  }

  async postDeploy() { /* should override */ }
}

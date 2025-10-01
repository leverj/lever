import {networks, registerCustomNetwork} from '@leverj/lever.chain-deployment'
import {ensureExistsSync} from '@leverj/lever.common'
import {artifacts, config, network} from 'hardhat'
import {Map} from 'immutable'
import {writeFileSync} from 'node:fs'

export {artifacts, config, network} from 'hardhat'
export const {ethers, networkConfig: {chainId}, networkHelpers: evm} = await network.connect()
export const {deployContract, getSigners, HDNodeWallet, Mnemonic, provider} = ethers

export const accounts = await getSigners()

const {mnemonic, path} = config.networks.default.accounts, phrase = await mnemonic.get()
export const wallets = accounts.map((value, i) => HDNodeWallet.fromMnemonic(Mnemonic.fromPhrase(phrase), `${path}/${i}`))

export const configDir = `${import.meta.dirname}/hardhat`
export const configFile = (chain) => `${configDir}/${chain}.config.js`
export const writeConfigFile = (chain, chainId) => {
  ensureExistsSync(configDir)
  const source = `
    |const {default: config} = await import(\`\${process.env.PWD}/hardhat.config.js\`)
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

export const chainsById = Map(networks).mapEntries(([chain, _]) => [_.id, chain]).toJS()

export const configureContracts = (config) => config.createContractsConstructors = (chain) => ({
  ToyMath: {},
  Bank: {
    libraries: ['ToyMath'],
    params: [networks[chain].id, 'whatever'],
  },
})

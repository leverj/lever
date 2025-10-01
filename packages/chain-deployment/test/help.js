import {networks, registerCustomNetwork} from '@leverj/lever.chain-deployment'
import {ensureExistsSync} from '@leverj/lever.common'
import {Map} from 'immutable'
import {writeFileSync} from 'node:fs'

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

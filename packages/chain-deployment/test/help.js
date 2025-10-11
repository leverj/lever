import {ensureExistsSync} from '@leverj/lever.common'
import {networks} from '@leverj/lever.chain-deployment'
import {writeFileSync} from 'node:fs'
import {deployContract} from './network-connect.js'

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

export const configureContracts = (config) => config.createContractsConstructors = (chain) => ({
  ToyMath: {},
  Bank: {
    libraries: ['ToyMath'],
    params: [networks[chain].id, 'whatever'],
  },
})

export const ERC20 = async (name = 'Crap', symbol = 'CRAP') => deployContract('ERC20Mock', [name, symbol])
export const ERC721 = async (name = 'Crap', symbol = 'CRAP') => deployContract('ERC721Mock', [name, symbol])
export const Bank = async (chainId, name) => deployContract('ToyMath', []).then(
  _ => deployContract('Bank', [chainId, name], {libraries: {ToyMath: _.target}})
)

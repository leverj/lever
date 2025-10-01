import {ensureExistsSync} from '@leverj/lever.common'
import {networks} from '@leverj/lever.chain-deployment'
import {writeFileSync} from 'node:fs'

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

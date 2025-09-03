import {ensureExistsSync} from '@leverj/lever.common'
import {artifacts, config, network} from 'hardhat'
import {writeFileSync} from 'node:fs'

export {artifacts, config, network} from 'hardhat'
export const {ethers, networkConfig: {chainId}, networkHelpers: evm} = await network.connect()
export const {deployContract, getSigners, provider} = ethers

export const accounts = await getSigners()

const {mnemonic, path} = config.networks.default.accounts, phrase = await mnemonic.get()
export const wallets = accounts.map((value, i) => ethers.HDNodeWallet.fromMnemonic(ethers.Mnemonic.fromPhrase(phrase), `${path}/${i}`))

export const configDir = `${import.meta.dirname}/hardhat`
export const configFile = (chain) => `${configDir}/${chain}.config.cjs`
export const writeConfigFile = (chain, chainId) => {
  ensureExistsSync(configDir)
  writeFileSync(configFile(chain), createHardhatConfig(chain, chainId))
}
const createHardhatConfig = (chain, chainId) => `
const {default: config} = await import(\`\${process.env.PWD}/hardhat.config.js\`)
export default Object.assign(config, {
  networks: {
    default: {
      chainId: ${chainId},  /*** ${chain} ***/
      gasPrice: 0,
      initialBaseFeePerGas: 0,
    }
  }
})`

export const configureContracts = (config) => config.createContractsConstructors = (chain) => ({
  ToyMath: {},
  Bank: {
    libraries: ['ToyMath'],
    params: [networks[chain].id, 'whatever'],
  },
})

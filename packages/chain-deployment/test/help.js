import {artifacts, config, network} from 'hardhat'

export {artifacts, config, network} from 'hardhat'
export const {ethers, networkConfig: {chainId}, networkHelpers: evm} = await network.connect()
export const {deployContract, getSigners, provider} = ethers

export const accounts = await getSigners()

const {mnemonic, path} = config.networks.default.accounts, phrase = await mnemonic.get()
export const wallets = accounts.map((value, i) => ethers.HDNodeWallet.fromMnemonic(ethers.Mnemonic.fromPhrase(phrase), `${path}/${i}`))

export const createHardhatConfig = (chain, chainId) => `
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

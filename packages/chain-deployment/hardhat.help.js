import {artifacts, config, network} from 'hardhat'

export {artifacts, config, network} from 'hardhat'
export const {ethers, networkConfig: {chainId}, networkHelpers: evm, provider} = await network.connect()
export const {deployContract, getContractFactory, getContractAt, getSigners} = ethers

export const accounts = await getSigners()

const {mnemonic, path} = config.networks.default.accounts, phrase = await mnemonic.get()
export const wallets = accounts.map((value, i) => ethers.HDNodeWallet.fromPhrase(phrase, `${path}/${i}`))

export const createHardhatConfig = (chain, chainId) => `
import config from \`\${process.env.PWD}/hardhat.config.js\`
export default Object.assign({}, config, {
  networks: {
    hardhat: {
      chainId: ${chainId},  /*** ${chain} ***/
      gasPrice: 0,
      initialBaseFeePerGas: 0,
    }
  }
})`

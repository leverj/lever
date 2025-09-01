import {artifacts, config, network} from 'hardhat'

export {artifacts, config, network} from 'hardhat'
export const {ethers, networkConfig: {chainId}, networkHelpers: evm, provider} = await network.connect()
export const {deployContract, getContractFactory, getContractAt, getSigners} = ethers

//fixme: not really working?
export const getBlockNumber = async () => provider.request({method: 'eth_blockNumber', params: []}).then(_ => parseInt(_, 16))

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

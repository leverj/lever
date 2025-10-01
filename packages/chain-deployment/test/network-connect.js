import {artifacts, config, network} from 'hardhat'

export {artifacts, config, network} from 'hardhat'
export const {ethers, networkConfig: {chainId}, networkHelpers: evm} = await network.connect()
export const {deployContract, getSigners, HDNodeWallet, Mnemonic, provider} = ethers

export const accounts = await getSigners()

const {mnemonic, path} = config.networks.default.accounts, phrase = await mnemonic.get()
export const wallets = accounts.map((value, i) => HDNodeWallet.fromMnemonic(Mnemonic.fromPhrase(phrase), `${path}/${i}`))

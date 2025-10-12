import {networks} from '@leverj/lever.chain-deployment'
import {connectToNetwork} from '@leverj/lever.chain-deployment/hardhat.help'

export * from '@leverj/lever.chain-deployment/hardhat.help'
export const {
  ethers, chainId, evm,
  deployContract, provider,
  accounts, wallets,
} = await connectToNetwork()

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

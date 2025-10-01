import {networks} from '@leverj/lever.chain-deployment'

export const configureContracts = (config) => config.createContractsConstructors = (chain) => ({
  ToyMath: {},
  Bank: {
    libraries: ['ToyMath'],
    params: [networks[chain].id, 'whatever'],
  },
})

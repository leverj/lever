import hardhat_ethers from '@nomicfoundation/hardhat-ethers'
import hardhat_network_helpers from '@nomicfoundation/hardhat-network-helpers'
import hardhat_verify from '@nomicfoundation/hardhat-verify'

export default {
  networks: {
    default: {
      gasPrice: 0,
      initialBaseFeePerGas: 0,
    },
  },
  plugins: [
    hardhat_ethers,
    hardhat_network_helpers,
    hardhat_verify,
  ],
  solidity: { // changing these values affects deployment address
    compilers: [
      {
        version: '0.8.30',
        settings: {
          optimizer: {enabled: true, runs: 200, details: {yul: true}},
          viaIR: true, //see: https://docs.soliditylang.org/en/latest/ir-breaking-changes.html
        }
      },
    ],
  },
}

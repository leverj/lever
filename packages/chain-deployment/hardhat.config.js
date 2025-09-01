import hardhat_toolbox_mocha_ethers from '@nomicfoundation/hardhat-toolbox-mocha-ethers'
import hardhat_ethers from '@nomicfoundation/hardhat-ethers'
import hardhat_network_helpers from '@nomicfoundation/hardhat-network-helpers'
import hardhat_verify from '@nomicfoundation/hardhat-verify'
// import hardhat_yul from '@skybit/hardhat-yul'

export default {
  networks: {
    default: {
      gasPrice: 0,
      initialBaseFeePerGas: 0,
    },
  },
  plugins: [
    hardhat_toolbox_mocha_ethers,
    hardhat_ethers,
    hardhat_network_helpers,
    hardhat_verify,
    // hardhat_yul,
  ],
  solidity: { // changing these values affects deployment address
    compilers: [
      {
        version: '0.8.30',
        settings: {
          optimizer: {
            enabled: true,
            runs: 15000
          },
        }
      },
    ],
  },
}

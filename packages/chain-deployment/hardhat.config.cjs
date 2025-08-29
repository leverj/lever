require('@nomicfoundation/hardhat-ethers')
require('@nomicfoundation/hardhat-network-helpers')
require('@nomicfoundation/hardhat-verify')
require('@skybit/hardhat-yul')
require('hardhat-deploy-ethers')

module.exports = {
  networks: {
    hardhat: {
      gasPrice: 0,
      initialBaseFeePerGas: 0,
    },
  },
  solidity: { // changing these values affects deployment address
    compilers: [
      {
        version: '0.8.28',
        settings: {
          optimizer: {
            enabled: true,
            runs: 15000
          },
          evmVersion: 'cancun'
        }
      },
    ],
  },
}

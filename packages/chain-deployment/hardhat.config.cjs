require('@nomicfoundation/hardhat-ethers')
require('@nomicfoundation/hardhat-network-helpers')
require('@nomicfoundation/hardhat-verify')
require('hardhat-deploy-ethers')

module.exports = {
  solidity: '0.8.28',
  networks: {
    hardhat: {
      gasPrice: 0,
      initialBaseFeePerGas: 0,
    },
  },
}

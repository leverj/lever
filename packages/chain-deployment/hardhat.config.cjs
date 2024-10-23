require('@nomicfoundation/hardhat-ethers')
require('@nomicfoundation/hardhat-network-helpers')
require('@nomicfoundation/hardhat-verify')
require('hardhat-deploy-ethers')

module.exports = {
  networks: {
    hardhat: {
      gasPrice: 0,
      initialBaseFeePerGas: 0,
    },
  },
  sourcify: {
    enabled: true,
  },
  solidity: '0.8.24',
}

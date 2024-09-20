module.exports = Object.assign(require(`${process.env.PWD}/hardhat.config.cjs`), {
  networks: {
    hardhat: {
      chainId: 11155111,  /*** sepolia ***/
      gasPrice: 0,
      initialBaseFeePerGas: 0,
    }
  }
})

module.exports = Object.assign(require(`${process.env.PWD}/hardhat.config.cjs`), {
  networks: {
    hardhat: {
      chainId: 17000,  /*** holesky ***/
      gasPrice: 0,
      initialBaseFeePerGas: 0,
    }
  }
})

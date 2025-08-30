import {default as hardhat} from 'hardhat'
import {deployViaCreate3Factory} from './Create3Factory.js'

const {ethers: {
  encodeBytes32String,
  getContractFactory,
}} = hardhat

// PASS YOUR OWN STRING HERE TO GENERATE A UNIQUE SALT. After doing your first production deployment, don't change it in order to have same address on other blockchains.
const saltForCREATE3 = encodeBytes32String('SKYBIT.ASIA TESTERC20..........')

async function deploy(deployer) {
  // WRITE YOUR CONTRACT NAME AND CONSTRUCTOR ARGUMENTS HERE
  const tokenContractName = 'contracts/TESTERC20.sol:TESTERC20'
  const wallet2Address = '0xEB2e452fC167b5bb948c6FC2c9215ce7F4064692'
  const constructorArgs = [
    'Token 4628',
    'TOKEN4628',
    1000,
    [deployer.address, wallet2Address], // test array constructor argument
    { x: 10, y: 5 }, // test struct constructor argument
    '0xabcdef', // test byte constructor argument. bytes have to be 0x-prefixed
  ]

  // const contractFactory = await getContractFactory(artifact.abi, artifact.bytecode)
  const contractFactory = await getContractFactory(tokenContractName) // No need to use artifacts-saved for your contract because with CREATE3 deployment address isn't dependent on bytecode
  const contract = await deployViaCreate3Factory(contractFactory, tokenContractName, constructorArgs, saltForCREATE3, deployer)
  if (contract === undefined) throw Error('contractInstance is undefined')
}

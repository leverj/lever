import {default as hardhat} from 'hardhat'

const {ethers: {
  encodeBytes32String,
  formatUnits,
  keccak256,
  getContractAt,
  getContractFactory,
  getCreateAddress,
  getCreate2Address,
  getSigners,
  provider,
  solidityPackedKeccak256,
}, network} = hardhat
const [wallet] = await getSigners()

const factoryToUse = { name: 'SKYBITLite', address: '0x739201bA340A675624D9ADb1cc27e68F76a29765' }
// PASS YOUR OWN STRING HERE TO GENERATE A UNIQUE SALT. After doing your first production deployment, don't change it in order to have same address on other blockchains.
const saltForCREATE3 = encodeBytes32String('SKYBIT.ASIA TESTERC20..........')

async function deploy(deployer = wallet) {
  console.log(`Using network: ${network.name} (${network.config.chainId}), account: ${deployer.address} having ${formatUnits(await provider.getBalance(deployer.address), 'ether')} of native currency, RPC url: ${network.config.url}`)

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

  // const cfToken = await getContractFactory(artifactOfContractToDeploy.abi, artifactOfContractToDeploy.bytecode)
  const cfToken = await getContractFactory(tokenContractName) // No need to use artifacts-saved for your contract because with CREATE3 deployment address isn't dependent on bytecode
  const contractInstance = await CREATE3Deploy(factoryToUse.name, factoryToUse.address, cfToken, tokenContractName, constructorArgs, saltForCREATE3, deployer)
  if (contractInstance === undefined) {
    console.error('contractInstance is undefined')
    return
  }

  // Testing the deployed ERC20 contract. If your contract isn't ERC20 then you can call a function other than balanceOf.
  console.log('Testing:')
  const totalSupply = formatUnits(await contractInstance.totalSupply())
  const tokenDecimals = await contractInstance.decimals()
  console.log(`${deployer.address} has ${formatUnits(await contractInstance.balanceOf(deployer.address), tokenDecimals)} of ${totalSupply}`)
  console.log(`${wallet2Address} has ${formatUnits(await contractInstance.balanceOf(wallet2Address), tokenDecimals)} of ${totalSupply}`)
  console.log(`point: ${await contractInstance.point()}`)
  console.log(`b: ${await contractInstance.b()}`)
}

const CREATE3Deploy = async (factoryToUse, addressOfFactory, contractFactory, contractToDeployName, constructorArguments, salt, deployer) => {

  const getCreate3Address = async (addressOfFactory, callerAddress, salt) => {
    // const { evmVersion } = hre.config.solidity.compilers[0].settings
    // const bytecodeOfCreateFactory = evmVersion === 'shanghai' ? '0x601180600a5f395ff3fe365f6020373660205ff05f526014600cf3' : '0x601480600c6000396000f3fe3660006020373660206000f06000526014600cf3' // This needs to be updated if CREATEFactory object in contracts/SKYBITCREATE3FactoryLite.yul is changed
    const factoryContractArtifacts = await hre.artifacts.readArtifact('CREATEFactory') // Generate the CREATEFactory bytecode from CREATEFactory.yul instead of using hardcoded bytecode above.
    const bytecodeOfCreateFactory = factoryContractArtifacts.bytecode
    const keccak256Calculated = solidityPackedKeccak256(['address', 'bytes32'], [callerAddress, salt]) // same as keccak256(callerAddress + salt.slice(2)) // Inputs must not be 0-padded.
    const addressOfCreateFactory = getCreate2Address(addressOfFactory, keccak256Calculated, keccak256(bytecodeOfCreateFactory))
    return getCreateAddress({
      from: addressOfCreateFactory,
      nonce: 1 // nonce starts at 1 in contracts. Don't use getTransactionCount to get nonce because if a deployment is repeated with same inputs getCreate2Address would fail before it gets here.
    })
  }

  const deploy = async (factoryToUse, instanceOfFactory, bytecode, wallet, salt, feeData) => {
    delete feeData.gasPrice
    return await wallet.sendTransaction({
      to: instanceOfFactory.target,
      data: bytecode.replace('0x', salt),
    }, {...feeData})
  }

  const bytecode = await contractFactory.getDeployTransaction(...constructorArguments).then(_ => _.data)
  const artifactOfFactory = {abi: []}
  const instanceOfFactory = await getContractAt(artifactOfFactory.abi, addressOfFactory)
  console.log(`salt: ${salt}`)
  const addressExpected = await getCreate3Address(instanceOfFactory.target, deployer.address, salt)
  console.log(`Expected address of ${contractToDeployName} using factory at ${addressOfFactory}: ${addressExpected}`)
  if (await provider.getCode(addressExpected) !== '0x') {
    console.log(`The contract already exists at ${addressExpected}. Change the salt if you want to deploy your contract to a different address.`)
    console.log('Returning an instance of the already-deployed contract...')
    return contractFactory.attach(addressExpected)
  }

  const functionCallGasCost = await deployer.estimateGas({
    to: instanceOfFactory.target,
    data: bytecode.replace('0x', salt),
  })
  console.log(`functionCallGasCost: ${functionCallGasCost}`)
  const feeData = await provider.getFeeData()
  console.log(`feeData: ${JSON.stringify(feeData)}`)
  const gasFeeEstimate = feeData.gasPrice * functionCallGasCost
  console.log(`gasFeeEstimate: ${formatUnits(gasFeeEstimate, 'ether')} of native currency`)

  // Call DEPLOY
  console.log('now calling deploy() in the CREATE3 factory...')
  const txResponse = await deploy(factoryToUse, instanceOfFactory, bytecode, deployer, salt, feeData)
  console.log(`txResponse: ${JSON.stringify(txResponse, null, 2)}`)
  const txReceipt = await txResponse.wait()
  console.log(`txReceipt: ${JSON.stringify(txReceipt, null, 2)}`)
  const contractInstance = contractFactory.attach(addressExpected)
  if (await provider.getCode(addressExpected) !== '0x')
    console.log(`${contractToDeployName} was successfully deployed via ${factoryToUse} CREATE3 factory to ${contractInstance.target}`)
  else
    console.error(`${contractToDeployName} was not found at ${contractInstance.target}`)
  return contractInstance
}

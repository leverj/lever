import {isContractAt} from '@leverj/lever.common'
import {default as hardhat} from 'hardhat'

const {ethers: {
  formatUnits,
  keccak256,
  getCreateAddress,
  getCreate2Address,
  provider,
  solidityPackedKeccak256,
}, network} = hardhat
const create3FactoryAddress = '0x739201bA340A675624D9ADb1cc27e68F76a29765' //fixme: pass it in

export const deployViaCreate3 = async (contractFactory, contractName, constructorArgs, salt, deployer) => {
  console.log(`deploying using network: ${network.name} (${network.config.chainId}), account: ${deployer.address} having ${formatUnits(await provider.getBalance(deployer.address), 'ether')} of native currency, RPC url: ${network.config.url}`)
  const bytecode = await contractFactory.getDeployTransaction(...constructorArgs).then(_ => _.data)
  const expectedAddress = await getCreate3Address(create3FactoryAddress, deployer.address, salt)
  console.log(`Expected address of ${contractName} using factory at ${create3FactoryAddress}: ${expectedAddress}`)
  if (await isContractAt(provider, expectedAddress)) {
    console.log(`${contractName} contract already exists at ${expectedAddress}. Change the salt if you want to deploy your contract to a different address.`)
    console.log('returning an instance of the already-deployed contract...')
    return contractFactory.attach(expectedAddress)
  }

  const functionCallGasCost = await deployer.estimateGas({
    to: create3FactoryAddress,
    data: bytecode.replace('0x', salt),
  })
  const feeData = await provider.getFeeData()
  const gasFeeEstimate = feeData.gasPrice * functionCallGasCost
  console.log(`functionCallGasCost: ${functionCallGasCost}`)
  console.log(`feeData: ${JSON.stringify(feeData)}`)
  console.log(`gasFeeEstimate: ${formatUnits(gasFeeEstimate, 'ether')} of native currency`)
  console.log('now calling deploy() in the CREATE3 factory...')
  delete feeData.gasPrice
  const txResponse = await deployer.sendTransaction({
    to: create3FactoryAddress,
    data: bytecode.replace('0x', salt),
  }, {...feeData})

  console.log(`txResponse: ${JSON.stringify(txResponse, null, 2)}`)
  const txReceipt = await txResponse.wait()
  console.log(`txReceipt: ${JSON.stringify(txReceipt, null, 2)}`)
  const contractInstance = contractFactory.attach(expectedAddress)
  if (await isContractAt(provider, expectedAddress))
    console.log(`${contractName} was successfully deployed via SKYBITLite CREATE3 factory to ${contractInstance.target}`)
  else
    console.error(`${contractName} was not found at ${contractInstance.target}`)
  return contractInstance
}

const getCreate3Address = async (addressOfFactory, callerAddress, salt) => {
  // const { evmVersion } = hardhat.config.solidity.compilers[0].settings
  // const bytecodeOfCreateFactory = evmVersion === 'shanghai' ? '0x601180600a5f395ff3fe365f6020373660205ff05f526014600cf3' : '0x601480600c6000396000f3fe3660006020373660206000f06000526014600cf3' // This needs to be updated if CREATEFactory object in contracts/SKYBITCREATE3FactoryLite.yul is changed
  const factoryContractArtifacts = await hardhat.artifacts.readArtifact('CREATEFactory') // Generate the CREATEFactory bytecode from CREATEFactory.yul instead of using hardcoded bytecode above
  const bytecodeOfCreateFactory = factoryContractArtifacts.bytecode
  const keccak256Calculated = solidityPackedKeccak256(['address', 'bytes32'], [callerAddress, salt]) // same as keccak256(callerAddress + salt.slice(2)) // Inputs must not be 0-padded
  const addressOfCreateFactory = getCreate2Address(addressOfFactory, keccak256Calculated, keccak256(bytecodeOfCreateFactory))
  return getCreateAddress({
    from: addressOfCreateFactory,
    nonce: 1 // nonce starts at 1 in contracts. Don't use getTransactionCount to get nonce because if a deployment is repeated with same inputs getCreate2Address would fail before it gets here
  })
}

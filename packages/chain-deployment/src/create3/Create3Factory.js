import {getCreationBlock, isContractAt, logger, until} from '@leverj/lever.common'
import {getCreateAddress, Transaction} from 'ethers'
import {deriveAddressOfSignerFromSig, getCreate3Address, verifyNotDeployedAt} from './create3-utils.js'

/************************************************* !!! important !!! **************************************************/
/****************** keep this data consistent otherwise the deployment address will become different ******************/
export const Create3Factory = {
  contractName: 'SKYBITCREATE3FactoryLite',
  sourceName: 'contracts/create3/SKYBITCREATE3FactoryLite.yul',
  abi: [],
  bytecode: '0x607780600a5f395ff3fe335f525f356020526034600c20601b80605c5f395f80f580156052575f601491818052602082601f19360192838380375af1156049575f511560405760145ff35b60035f5360015ffd5b60025f5360015ffd5b60015f5360015ffdfe601180600a5f395ff3fe365f6020373660205ff05f526014600cf3',
  /*           resulting in the expected address:            */
  contractAddress: '0x739201bA340A675624D9ADb1cc27e68F76a29765'
}
export const txData = {
  type: 0,
  data: Create3Factory.bytecode,
  nonce: 0,
  gasLimit: 100000n,
  gasPrice: 100000000000n,  // = 100 gwei; made high for future-proofing. DO NOT CHANGE IT AFTER DEPLOYING YOUR FIRST CONTRACT TO LIVE BLOCKCHAIN.
  value: 0,
  chainId: 0,
  signature: { // manually created
    r: '0x3333333333333333333333333333333333333333333333333333333333333333',
    s: '0x3333333333333333333333333333333333333333333333333333333333333333',
    v: 27,
  },
}
/*** ************************************************************************************************************** ***/
const {gasLimit, gasPrice} = txData
const {contractName, contractAddress} = Create3Factory

const interval = 10, timeout = 100 * interval, timing = {interval, timeout}

export async function deployCreate3Factory(deployer) {
  const provider = deployer.provider
  if (await isContractAt(provider, contractAddress)) {
    logger.warn(`${contractName} contract already exists`)
    return {name: contractName, address: contractAddress, blockCreated: getCreationBlock(provider, contractAddress)}
  }

  await verifyGasLimit(provider)
  const transactionSignerAddress = await deriveAddressOfSignerFromSig(txData)
  const addressExpected = getCreateAddress({from: transactionSignerAddress, nonce: txData.nonce})
  await verifyNotDeployedAt(contractName, addressExpected, provider)
  await fundTransactionSigner(deployer, transactionSignerAddress, gasPrice, gasLimit)

  const transaction = Transaction.from(txData).serialized
  // logger.log(`expected transaction id: ${keccak256(transaction)}`)
  const receipt = await provider.broadcastTransaction(transaction).then(_ => _.wait())
  if (!await isContractAt(provider, addressExpected)) throw Error(`${contractName} contract was deployed but not found at ${addressExpected}`)
  return {
    name: contractName,
    address: addressExpected,
    blockCreated: receipt.blockNumber,
  }
}

const verifyGasLimit = async (provider) => {
  const gasCost = await provider.estimateGas({data: txData.data})
  const gasLimitPercentageAboveCost = Number(gasLimit * 100n / gasCost) - 100
  if (gasLimitPercentageAboveCost < 0) throw Error(`gasLimit ${gasLimit} isn't high enough to proceed`)
  if (gasLimitPercentageAboveCost < 10) logger.warn(`
    gasLimit may be too low to accommodate for possibly increasing future opcode cost. 
    once you choose a gasLimit, you'll need to use the same value for deployments on other 
    blockchains any time in the future in order for your contract to have the same address.
  `)
}

/** there needs to be some funds at transactionSignerAddress to pay gas fee for the deployment */
export const fundTransactionSigner = async (deployer, transactionSignerAddress, gasPrice, gasLimit) => {
  const provider = deployer.provider
  const balanceOfSignerMinRequired = gasPrice * gasLimit
  const balanceOfSigner = await provider.getBalance(transactionSignerAddress)
  if (balanceOfSigner >= balanceOfSignerMinRequired) return

  const shortfall = balanceOfSignerMinRequired - balanceOfSigner
  if (await provider.getBalance(deployer.address) <= shortfall) throw Error(
    `Insufficient Funds: ${deployer.address} need to transfer at least ${shortfall} of native currency to ${transactionSignerAddress} (transaction signer's address)`
  )
  const {maxFeePerGas, maxPriorityFeePerGas} = await provider.getFeeData()
  await deployer.sendTransaction({
    to: transactionSignerAddress,
    value: shortfall,
    maxFeePerGas,
    maxPriorityFeePerGas,
  }).then(_ => _.wait())
  await until(() => provider.getBalance(transactionSignerAddress) >= balanceOfSignerMinRequired, timing)
  const balanceAfter = await provider.getBalance(transactionSignerAddress)
  if (balanceAfter < balanceOfSignerMinRequired) throw Error(`post-transfer... insufficient balance: ${balanceAfter}. required: ${balanceOfSignerMinRequired}`)
}

export const deployViaCreate3Factory = async (deployer, contractFactory, name, params, salt) => {
  const provider = deployer.provider
  const bytecode = await contractFactory.getDeployTransaction(...params).then(_ => _.data)
  const address = await getCreate3Address(contractAddress, deployer.address, salt)
  if (await isContractAt(provider, address)) {
    logger.warn(`
        ${name} contract already exists at ${address}; returning current contract data.
        to deploy your contract to a different address, the salt must be changed.
    `)
    return {name, address, blockCreated: getCreationBlock(provider, address)}
  }

  const {maxFeePerGas, maxPriorityFeePerGas} = await provider.getFeeData()
  const receipt = await deployer.sendTransaction({
    to: contractAddress,
    data: bytecode.replace('0x', salt),
    maxFeePerGas,
    maxPriorityFeePerGas,
  }).then(_ => _.wait())
  await until(() => isContractAt(provider, address), timing)
  if (!await isContractAt(provider, address)) throw Error(`${name} was not found at the expected address: ${address}`)
  return {name, address, blockCreated: receipt.blockNumber}
}

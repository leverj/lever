import {isContractAt, logger, until} from '@leverj/lever.common'
import {formatUnits, getCreateAddress, keccak256, Transaction} from 'ethers'
import {cloneDeep} from 'lodash-es'
import {deriveAddressOfSignerFromSig, getCreate3Address, verifyNotDeployedAt} from './create3-utils.js'
import create3FactoryArtifact from './pickled-artifacts/SKYBITCREATE3FactoryLite.json' with {type: 'json'}

/** ********************************************** !!! important !!! **************************************************/
/** *************** keep this data consistent otherwise the deployment address will become different ******************/
export const cast_in_stone = {
  txData: {
    type: 0,
    data: create3FactoryArtifact.bytecode,
    nonce: 0,
    gasLimit: 100000n,
    gasPrice: 100000000000n,  // = 100 gwei; made high for future-proofing. DO NOT CHANGE IT AFTER DEPLOYING YOUR FIRST CONTRACT TO LIVE BLOCKCHAIN.
    value: 0,
    chainId: 0,
  },
  splitSig: { // manually created
    r: '0x3333333333333333333333333333333333333333333333333333333333333333',
    s: '0x3333333333333333333333333333333333333333333333333333333333333333',
    v: 27,
  },
}
/** *******************************************************************************************************************/
const {gasLimit, gasPrice} = cast_in_stone.txData
// cast_in_stone.txData.signature = cast_in_stone.splitSig
//0x93AA019F0128e3C2338201C9d09a96A6bF48113b

const {abi, bytecode, contractName} = create3FactoryArtifact
export const Create3Factory = {
  abi,
  bytecode,
  name: contractName,
  address: '0x739201bA340A675624D9ADb1cc27e68F76a29765' //fixme: test to see
}

const interval = 10, timeout = 100 * interval, timing = {interval, timeout}

export async function deployCreate3Factory(network, deployer) {
  const provider = deployer.provider
  logger.log(`deploying ${Create3Factory.name} contract keylessly...`)
  // logger.log(`using network: ${network.chain}, account: ${deployer.address} having ${await provider.getBalance(deployer.address)} of native currency, RPC url: ${network.providerURL}`)
  await verifyGasLimit(provider)
  const {txData, splitSig} = cloneDeep(cast_in_stone) //fixme: is it needed?
  const transactionSignerAddress = await deriveAddressOfSignerFromSig(txData, splitSig)
  logger.log(`derived address of transaction signer: ${transactionSignerAddress}`)
  const addressExpected = getCreateAddress({from: transactionSignerAddress, nonce: txData.nonce})
  await verifyNotDeployedAt(Create3Factory.name, addressExpected, provider)
  await fundTransactionSigner(gasPrice, gasLimit, transactionSignerAddress, deployer)

  logger.log(`deploying ${Create3Factory.name} contract by broadcasting signed raw transaction to ${network.chain}...`)
  txData.signature = splitSig
  const txSignedSerialized = Transaction.from(txData).serialized
  logger.log(`expected transaction id: ${keccak256(txSignedSerialized)}`)
  const txResponse = await provider.broadcastTransaction(txSignedSerialized)
  logger.log(`txResponse: ${JSON.stringify(txResponse, null, 2)}`)
  const txReceipt = await txResponse.wait()
  logger.log(`txReceipt: ${JSON.stringify(txReceipt, null, 2)}`)
  if (await isContractAt(provider, addressExpected)) logger.log(`${Create3Factory.name} contract was successfully deployed to ${addressExpected} in transaction ${txResponse.hash}`)
  else throw Error(`${Create3Factory.name} contract was deployed but not found at ${addressExpected}`)
}

const verifyGasLimit = async (provider) => {
  const gasCost = await provider.estimateGas({data: Create3Factory.bytecode})
  const gasLimitPercentageAboveCost = Number(gasLimit * 100n / gasCost) - 100
  logger.log(`expected gas cost: ${gasCost}`)
  logger.log(`gasLimit: ${gasLimit} (${gasLimitPercentageAboveCost}% above expected cost)`)
  logger.log(`expected gas cost: ${gasCost}`)
  logger.log(`gasLimit: ${gasLimit} (${gasLimitPercentageAboveCost}% above expected cost)`)
  if (gasLimitPercentageAboveCost < 0) throw Error(`gasLimit ${gasLimit} isn't high enough to proceed`)
  if (gasLimitPercentageAboveCost < 10) logger.log(
    `gasLimit may be too low to accommodate for possibly increasing future opcode cost. Once you choose a gasLimit, 
you'll need to use the same value for deployments on other blockchains any time in the future in order for your contract to have the same address.`
  )
}

/** there needs to be some funds at transactionSignerAddress to pay gas fee for the deployment */
export const fundTransactionSigner = async (gasPrice, gasLimit, transactionSignerAddress, deployer) => {
  const provider = deployer.provider
  const balanceOfSignerMinRequired = gasPrice * gasLimit
  const balanceOfSigner = await provider.getBalance(transactionSignerAddress)
  if (balanceOfSigner >= balanceOfSignerMinRequired) return

  const shortfall = balanceOfSignerMinRequired - balanceOfSigner
  if (await provider.getBalance(deployer.address) <= shortfall) throw Error(
    `insufficient funds: ${deployer.address} need to transfer at least ${shortfall} of native currency to ${transactionSignerAddress} (transaction signer's address)`
  )
  const {maxFeePerGas, maxPriorityFeePerGas} = await provider.getFeeData()
  await deployer.sendTransaction({to: transactionSignerAddress, value: shortfall, maxFeePerGas, maxPriorityFeePerGas}).then(_ => _.wait())
  await until(() => provider.getBalance(transactionSignerAddress) >= balanceOfSignerMinRequired, timing)
  const balanceAfter = await provider.getBalance(transactionSignerAddress)
  if (balanceAfter < balanceOfSignerMinRequired) throw Error(`post-transfer... insufficient balance: ${balanceAfter}. required: ${balanceOfSignerMinRequired}`)
}

export const deployViaCreate3Factory = async (network, contractFactory, name, params, salt, deployer) => {
  const provider = deployer.provider
  logger.log(`deploying using network: ${network.chain} (${network.id}), account: ${deployer.address} having ${await provider.getBalance(deployer.address)} of native currency, RPC url: ${network.providerURL}`)
  const bytecode = await contractFactory.getDeployTransaction(...params).then(_ => _.data)
  const expectedAddress = await getCreate3Address(Create3Factory.address, deployer.address, salt)
  logger.log(`Expected address of ${name} using factory at ${(Create3Factory.address)}: ${expectedAddress}`)
  if (await isContractAt(provider, expectedAddress)) {
    logger.log(`${name} contract already exists at ${expectedAddress}. Change the salt if you want to deploy your contract to a different address.`)
    logger.log('returning an instance of the already-deployed contract...')
    return contractFactory.attach(expectedAddress)
  }

  const functionCallGasCost = await deployer.estimateGas({
    to: Create3Factory.address,
    data: bytecode.replace('0x', salt),
  })
  const feeData = await provider.getFeeData()
  const gasFeeEstimate = feeData.gasPrice * functionCallGasCost
  logger.log(`functionCallGasCost: ${functionCallGasCost}`)
  logger.log(`feeData: ${JSON.stringify(feeData)}`)
  logger.log(`gasFeeEstimate: ${gasFeeEstimate} of native currency`)
  logger.log('now calling deploy() in the CREATE3 factory...')
  delete feeData.gasPrice
  const txResponse = await deployer.sendTransaction({
    to: Create3Factory.address,
    data: bytecode.replace('0x', salt),
  }, {...feeData})

  logger.log(`txResponse: ${JSON.stringify(txResponse, null, 2)}`)
  const txReceipt = await txResponse.wait()
  logger.log(`txReceipt: ${JSON.stringify(txReceipt, null, 2)}`)
  const contractInstance = contractFactory.attach(expectedAddress)
  if (await isContractAt(provider, expectedAddress))
    logger.log(`${name} was successfully deployed via SKYBITLite CREATE3 factory to ${contractInstance.target}`)
  else
    logger.error(`${name} was not found at ${contractInstance.target}`)
  return contractInstance
}

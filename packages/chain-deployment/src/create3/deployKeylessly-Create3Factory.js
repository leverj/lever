import {isContractAt} from '@leverj/lever.common'
import {default as hardhat} from 'hardhat'
import {cloneDeep} from 'lodash-es'
import create3FactoryArtifact from './pickled-artifacts/SKYBITCREATE3FactoryLite.json' with {type: 'json'}

const {contractName, bytecode} = create3FactoryArtifact
const {ethers: {
  resolveProperties,
  Transaction,
  keccak256,
  getBytes,
  getSigners,
  Signature,
  recoverAddress,
  formatUnits,
  provider,
  getCreateAddress,
}, network} = hardhat
const [wallet] = await getSigners()

/** ********************************************** !!! important !!! **************************************************/
/** *************** keep this data consistent otherwise the deployment address will become different ******************/
const cast_in_stone = {
  txData: {
    type: 0,
    data: bytecode,
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
const {gasLimit, gasPrice} = cast_in_stone.txData
/** *******************************************************************************************************************/

async function deployKeylessly(deployer = wallet) {
  console.log(`deploying ${contractName} contract keylessly...`)
  console.log(`using network: ${network.name} (${network.config.chainId}), account: ${deployer.address} having ${formatUnits(await provider.getBalance(deployer.address), 'ether')} of native currency, RPC url: ${network.config.url}`)
  await verifyGasLimit()
  const {txData, splitSig} = cloneDeep(cast_in_stone)
  const signerAddress = await deriveAddressOfSignerFromSig(txData, splitSig)
  console.log(`derived address of transaction signer: ${signerAddress}`)
  const addressExpected = getCreateAddress({from: signerAddress, nonce: txData.nonce})
  await verifyNotDeployedAt(addressExpected)
  await fundTransactionSigner(gasPrice, gasLimit, signerAddress, deployer)

  console.log(`deploying ${contractName} contract by broadcasting signed raw transaction to ${network.name}...`)
  txData.signature = splitSig
  const txSignedSerialized = Transaction.from(txData).serialized
  console.log(`expected transaction id: ${keccak256(txSignedSerialized)}`)
  const txResponse = await provider.broadcastTransaction(txSignedSerialized)
  console.log(`txResponse: ${JSON.stringify(txResponse, null, 2)}`)
  const txReceipt = await txResponse.wait()
  console.log(`txReceipt: ${JSON.stringify(txReceipt, null, 2)}`)
  if (await isContractAt(provider, addressExpected)) console.log(`${contractName} contract was successfully deployed to ${addressExpected} in transaction ${txResponse.hash}`)
  else throw Error(`${contractName} contract was deployed but not found at ${addressExpected}`)
}

const verifyGasLimit = async () => {
  const gasCost = await provider.estimateGas({data: bytecode})
  const gasLimitPercentageAboveCost = Number(gasLimit * 100n / gasCost) - 100
  console.log(`expected gas cost: ${gasCost}`)
  console.log(`gasLimit: ${gasLimit} (${gasLimitPercentageAboveCost}% above expected cost)`)
  console.log(`expected gas cost: ${gasCost}`)
  console.log(`gasLimit: ${gasLimit} (${gasLimitPercentageAboveCost}% above expected cost)`)
  if (gasLimitPercentageAboveCost < 0) throw Error(`gasLimit ${gasLimit} isn't high enough to proceed`)
  if (gasLimitPercentageAboveCost < 10) console.log(
`gasLimit may be too low to accommodate for possibly increasing future opcode cost. Once you choose a gasLimit, 
you'll need to use the same value for deployments on other blockchains any time in the future in order for your contract to have the same address.`
  )
}

const verifyNotDeployedAt = async (address) => {
  console.log(`expected address of ${contractName} contract once deployed: ${address}`)
  if (await isContractAt(provider, address)) throw Error(`${contractName} contract already exists at ${address}`)
}

const deriveAddressOfSignerFromSig = async (txData, splitSig) => resolveProperties(txData).then(_ => {
  const digest = getBytes(keccak256(Transaction.from(_).unsignedSerialized /*RLP encoded*/) /* as specified by ECDSA */)
  const signature = Signature.from(splitSig).serialized
  return recoverAddress(digest, signature)
})

/** there needs to be some funds at signerAddress to pay gas fee for the deployment */
const fundTransactionSigner = async (gasPrice, gasLimit, signerAddress, deployer) => {
  const balanceOfSignerMinRequired = gasPrice * gasLimit
  console.log(`minimum balance of signer required based on the gasPrice and gasLimit: ${gasPrice} x ${gasLimit} wei = ${formatUnits(balanceOfSignerMinRequired, 'ether')} of native currency`)
  const balanceOfSigner = await provider.getBalance(signerAddress)
  console.log(`balanceOfSigner: ${formatUnits(balanceOfSigner, 'ether')}`)
  if (balanceOfSigner >= balanceOfSignerMinRequired) return

  const balanceOfDeployer = await provider.getBalance(deployer.address)
  const shortfall = balanceOfSignerMinRequired - balanceOfSigner
  if (balanceOfDeployer < balanceOfSignerMinRequired) {
    console.log(`you don't have enough funds in your wallet. You'll need to transfer at least ${formatUnits(shortfall, 'ether')} of native currency to the address of the transaction signer: ${signerAddress}`)
    throw Error(`there needs to be some funds at ${signerAddress} to pay gas fee for the deployment`)
  }

  console.log(`there are insufficient funds at ${signerAddress} on ${network.name} to broadcast the transaction`)
  console.log(`transferring ${formatUnits(shortfall, 'ether')} of native currency from ${deployer.address} to ${signerAddress} on ${network.name}...`)
  const feeData = await provider.getFeeData()
  delete feeData.gasPrice
  await deployer.sendTransaction({to: signerAddress, value: shortfall, ...feeData}).then(_ => _.wait())
  console.log(`${signerAddress} now has ${formatUnits(await provider.getBalance(signerAddress), 'ether')} of native currency`)
}

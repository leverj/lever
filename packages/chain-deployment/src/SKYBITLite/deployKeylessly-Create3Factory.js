import {default as hardhat} from 'hardhat'
import create3FactoryArtifact from 'artifacts-saved/contracts/SKYBITCREATE3FactoryLite.yul/SKYBITCREATE3FactoryLite.json' with {type: 'json'}

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
const isDeployEnabled = true
const create3Factory = 'SKYBITLite'

async function deployKeylessly(deployer = wallet) {
  const {contractName, bytecode} = create3FactoryArtifact
  console.log(`Deploying ${contractName} keylessly...`)
  const balanceOfWallet = await provider.getBalance(deployer.address)
  console.log(`Using network: ${network.name} (${network.config.chainId}), account: ${deployer.address} having ${formatUnits(balanceOfWallet, 'ether')} of native currency, RPC url: ${network.config.url}`)
  const gasLimit = 100000n
  const gasPrice = 100000000000n // = 100 Gwei. Made high for future-proofing. DON'T CHANGE IT AFTER DEPLOYING YOUR FIRST CONTRACT TO LIVE BLOCKCHAIN.
  const gasCost = await provider.estimateGas({data: bytecode})
  console.log(`Expected gas cost: ${gasCost}`)
  const gasLimitPercentageAboveCost = Number(gasLimit * 100n / gasCost) - 100
  console.log(`gasLimit: ${gasLimit} (${gasLimitPercentageAboveCost}% above expected cost)`)
  if (gasLimitPercentageAboveCost < 0) {
    console.log(`gasLimit isn't high enough to proceed.`)
    return
  } else if (gasLimitPercentageAboveCost < 10) {
    console.log(`gasLimit may be too low to accommodate for possibly increasing future opcode cost. Once you choose a gasLimit, you'll need to use the same value for deployments on other blockchains any time in the future in order for your contract to have the same address.`)
  }

  // Keep this data consistent otherwise the deployment address will become different
  const txData = {
    type: 0,
    data: bytecode,
    nonce: 0,
    gasLimit,
    gasPrice,
    value: 0,
    chainId: 0,
  }
  // Keep this data consistent otherwise the deployment address will become different
  const splitSig = { // manually created
    r: '0x3333333333333333333333333333333333333333333333333333333333333333',
    s: '0x3333333333333333333333333333333333333333333333333333333333333333',
    v: 27,
  }
  const derivedAddressOfSigner = await deriveAddressOfSignerFromSig(txData, splitSig)
  console.log(`Derived address of transaction signer: ${derivedAddressOfSigner}`)
  txData.signature = splitSig
  const txSignedSerialized = Transaction.from(txData).serialized
  // console.log(`Signed raw transaction to be pushed to ${network.name}: ${txSignedSerialized}`)
  // const tx = Transaction.from(txSignedSerialized) // checking the contents of signed transaction
  // console.log(`Signed transaction: ${JSON.stringify(tx, null, 2)}`)
  const addressExpected = getCreateAddress({from: derivedAddressOfSigner, nonce: txData.nonce})
  console.log(`Expected address of deployed ${contractName} contract: ${addressExpected}`)
  if (await provider.getCode(addressExpected) !== '0x') {
    console.log(`The contract already exists at ${addressExpected}`)
    return addressExpected
  }

  const txSignedSerializedHash = keccak256(txSignedSerialized)
  console.log(`Expected transaction ID: ${txSignedSerializedHash}`)

  // FUND SIGNER - There needs to be some funds at derivedAddressOfSigner to pay gas fee for the deployment.
  const isTransactionSignerFunded = await fundTransactionSigner(txData.gasPrice, txData.gasLimit, derivedAddressOfSigner, deployer)
  if (!isTransactionSignerFunded) throw Error(`There needs to be some funds at ${derivedAddressOfSigner} to pay gas fee for the deployment`)

  // THE DEPLOYMENT TRANSACTION
  if (isDeployEnabled) {
    console.log(`Deploying ${contractName} contract by broadcasting signed raw transaction to ${network.name}...`)
    // const txHash = await provider.send(`eth_sendRawTransaction`, [txSignedSerialized])
    const txResponse = await provider.broadcastTransaction(txSignedSerialized)
    console.log(`txResponse: ${JSON.stringify(txResponse, null, 2)}`)
    const txReceipt = await txResponse.wait()
    console.log(`txReceipt: ${JSON.stringify(txReceipt, null, 2)}`)
    if (await provider.getCode(addressExpected) !== '0x') console.log(`${contractName} contract was successfully deployed to ${addressExpected} in transaction ${txResponse.hash}`)
    else console.error(`${contractName} contract was not found at ${addressExpected}`)
  }
  console.log('Verification on explorer skipped')
  return addressExpected
}

const deriveAddressOfSignerFromSig = async (txData, splitSig) => {
  const txWithResolvedProperties = await resolveProperties(txData)
  const txUnsignedSerialized = Transaction.from(txWithResolvedProperties).unsignedSerialized // returns RLP encoded tx
  const txUnsignedSerializedHashed = keccak256(txUnsignedSerialized) // as specified by ECDSA
  const txUnsignedSerializedHashedBytes = getBytes(txUnsignedSerializedHashed) // create binary hash
  const signatureSerialized = Signature.from(splitSig).serialized
  return recoverAddress(txUnsignedSerializedHashedBytes, signatureSerialized)
}

const fundTransactionSigner = async (gasPrice, gasLimit, derivedAddressOfSigner, deployer, isDeployEnabled) => {
  const balanceOfSignerMinRequired = gasPrice * gasLimit
  console.log(`Minimum balance of signer required based on the gasPrice and gasLimit: ${gasPrice} x ${gasLimit} wei = ${formatUnits(balanceOfSignerMinRequired, 'ether')} of native currency`)
  let balanceOfSigner = await provider.getBalance(derivedAddressOfSigner)
  console.log(`balanceOfSigner: ${formatUnits(balanceOfSigner, 'ether')}`)
  if (balanceOfSigner >= balanceOfSignerMinRequired) return true

  const balanceOfDeployer = await provider.getBalance(deployer.address)
  if (balanceOfDeployer < balanceOfSignerMinRequired) {
    console.log(`You don't have enough funds in your wallet. You'll need to transfer at least ${formatUnits(shortfall, 'ether')} of native currency to the address of the transaction signer: ${derivedAddressOfSigner}`)
    return false
  }

  const shortfall = balanceOfSignerMinRequired - balanceOfSigner
  console.log(`There are insufficient funds at ${derivedAddressOfSigner} on ${network.name} to broadcast the transaction.`)
  console.log(`Transferring ${formatUnits(shortfall, 'ether')} of native currency from ${deployer.address} to ${derivedAddressOfSigner} on ${network.name}...`)
  const feeData = await provider.getFeeData()
  delete feeData.gasPrice
  await deployer.sendTransaction({to: derivedAddressOfSigner, value: shortfall, ...feeData}).then(_ => _.wait())
  console.log(`${derivedAddressOfSigner} now has ${formatUnits(await provider.getBalance(derivedAddressOfSigner), 'ether')} of native currency`)
  return true
}

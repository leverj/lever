import {isContractAt} from '@leverj/lever.common'
import {
  getBytes,
  getCreate2Address,
  getCreateAddress,
  keccak256,
  recoverAddress,
  resolveProperties,
  Signature,
  solidityPackedKeccak256,
  Transaction,
} from 'ethers'

const CREATEFactory = {
  contractName: 'CREATEFactory',
  sourceName: 'contracts/create3/CREATEFactory.yul',
  abi: [],
  bytecode: '0x601180600a5f395ff3fe365f6020373660205ff05f526014600cf3',
}

export const getCreate3Address = async (addressOfFactory, callerAddress, salt) => {
  const keccak256Calculated = solidityPackedKeccak256(['address', 'bytes32'], [callerAddress, salt]) // same as keccak256(callerAddress + salt.slice(2)). inputs must not be 0-padded
  const addressOfCreateFactory = getCreate2Address(addressOfFactory, keccak256Calculated, keccak256(CREATEFactory.bytecode))
  return getCreateAddress({
    from: addressOfCreateFactory,
    nonce: 1 // nonce starts at 1 in contracts. don't use getTransactionCount to get nonce because if a deployment is repeated with same inputs getCreate2Address would fail before it gets here
  })
}

export const deriveAddressOfSignerFromSig = async txData => resolveProperties(txData).then(_ => {
  const digest = getBytes(keccak256(Transaction.from(_).unsignedSerialized /* RLP encoded */) /* as specified by ECDSA */)
  const signature = Signature.from(txData.signature).serialized
  return recoverAddress(digest, signature)
})

export const verifyNotDeployedAt = async (contractName, address, provider) => {
  if (await isContractAt(provider, address)) throw Error(`Redeploy Attempt: ${contractName} contract already exists at ${address}`)
}

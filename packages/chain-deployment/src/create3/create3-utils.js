import {isContractAt, logger} from '@leverj/lever.common'
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
import {default as hardhat} from 'hardhat'

export const verifyNotDeployedAt = async (contractName, address, provider) => {
  if (await isContractAt(provider, address)) throw Error(`${contractName} contract already exists at ${address}`)
}

export const deriveAddressOfSignerFromSig = async (txData, splitSig) => resolveProperties(txData).then(_ => {
  const digest = getBytes(keccak256(Transaction.from(_).unsignedSerialized /*RLP encoded*/) /* as specified by ECDSA */)
  const signature = Signature.from(splitSig).serialized
  return recoverAddress(digest, signature)
})

export const getCreate3Address = async (addressOfFactory, callerAddress, salt) => {
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

import {getAddress, solidityPackedKeccak256, ZeroAddress, ZeroHash} from 'ethers'

export {getAddress, verifyMessage, isAddress} from 'ethers'

BigInt.prototype.toJSON = function () { return this.toString() }
BigInt.fromBuffer = function (buffer) {
  let bits = 8n
  if (ArrayBuffer.isView(buffer)) bits = BigInt(buffer.BYTES_PER_ELEMENT * 8)
  else buffer = new Uint8Array(buffer)
  return buffer.reduce((result, _) => (result << bits) + BigInt(_), 0n)
}

export const uint = BigInt
export const address = getAddress
export const keccak256 = (subject) => solidityPackedKeccak256(['string'], [subject.toString()])
export const MinHash = ZeroHash
export const MaxHash = `0x${'f'.repeat(64)}`
export const ETH = ZeroAddress

export const getCreationBlock = async (provider, address, fromBlock = 0, toBlock) => {
  if (!toBlock) toBlock = await provider.getBlockNumber()

  if (fromBlock === toBlock) return fromBlock

  const midway = Math.floor((fromBlock + toBlock) / 2)
  const code = await provider.getCode(address, midway)
  return code.length > 2 ?
    getCreationBlock(provider, address, fromBlock, midway) :
    getCreationBlock(provider, address, midway + 1, toBlock)
}


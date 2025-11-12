import {Contract, getAddress, solidityPackedKeccak256, ZeroAddress, ZeroHash} from 'ethers'
import {setTimeout} from 'node:timers/promises'

export {getAddress, verifyMessage, verifyTypedData, isAddress} from 'ethers'

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

export const isContractAt = async (provider, address, abi) => {
  if (abi) {
    try {
      new Contract(address, abi, provider)
      return true
    } catch (e) {
      return false
    }
  } else return await provider.getCode(address) !== '0x'
}

export const getCreationBlock = async (provider, address, throttle = 0, fromBlock = 0, toBlock) => {
  try {
    if (!toBlock) toBlock = await provider.getBlockNumber()

    if (fromBlock === toBlock) return fromBlock

    const midway = Math.floor((fromBlock + toBlock) / 2)
    const code = await provider.getCode(address, midway)
    await setTimeout(throttle)
    return code.length > 2 ?
      getCreationBlock(provider, address, throttle, fromBlock, midway).catch(_ => 0) :
      getCreationBlock(provider, address, throttle, midway + 1, toBlock).catch(_ => 0)
  } catch (e) {
    return 0
  }
}

export const getCreationTransaction = async (provider, blockNumber, address) => {
  const block = await provider.getBlock(blockNumber)
  for (let each of block.transactions) {
    const receipt = await provider.getTransactionReceipt(each)
    if (receipt.contractAddress === address) return receipt.getTransaction()
  }
  return null
}


import {days} from '@leverj/lever.common'
import {getAddress, Wallet} from 'ethers'

export class ApiKey {
  static new(timeToLive = 7 * days) {
    const {address, privateKey} = Wallet.createRandom()
    return new this(address, privateKey, Date.now() + timeToLive)
  }

  constructor(address, privateKey, expires) {
    this.address = getAddress(address)
    this.privateKey = privateKey
    this.expires = expires
  }
}

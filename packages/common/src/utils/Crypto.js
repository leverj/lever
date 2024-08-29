import {FixedNumber} from 'ethers'
import {address_0} from './constants.js'
import {address} from './ethereum.js'


const NativeCurrency = address_0

export class Crypto {
  static Native(amount) { return new this(amount, NativeCurrency) }
  static Zero(currency) { return new this(0, currency) }

  static formatAmount(amount, decimals, fractionDigits) {
    const fixed = FixedNumber.fromValue(amount || '0', decimals, `fixed256x${decimals}`).toString()
    const [left, right] = fixed.split('.')
    const fraction = right.substring(0, fractionDigits)
    return parseInt(fraction) === 0 ? left : `${left}.${fraction}`.replace(/0+$/, '')
  }

  constructor(amount, currency) {
    this.amount = BigInt(amount)
    this.currency = address(currency)
  }

  isNative() { return this.currency === NativeCurrency }
  isZero() { return this.amount === 0n }
  isEqualTo(other) { return this.currency === other.currency && this.amount == BigInt(other.amount) }
  isGreaterThan(other) { return this.currency === other.currency && this.amount > BigInt(other.amount) }
  plus(other) { return new Crypto(this.amount + BigInt(other.amount), this.currency) }
  minus(other) { return new Crypto(this.amount - BigInt(other.amount), this.currency) }
  multipliedBy(value) { return new Crypto(this.amount * BigInt(value), this.currency) }
  dividedBy(value) { return new Crypto(this.amount / BigInt(value), this.currency) }

  asStructForEthers() {
    return {
      amount: this.amount,
      currency: this.currency
    }
  }

  toBSON() {
    return {
      amount: this.amount.toString(),
      currency: this.currency
    }
  }
}

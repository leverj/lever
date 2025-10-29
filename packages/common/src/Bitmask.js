
export class Bitmask {
  static practical_bits_limit = 1073741822

  constructor(value = 0n) {
    this.mask = BigInt(value)
  }
  get practical_bits_limit() { return 1073741822 }

  toString(radix = 10) { return this.mask.toString(radix) }

  _validate(index) {
    if (index < 0 || index > this.practical_bits_limit) throw RangeError(`index must be >= 0 and <= ${Bitmask.practical_bits_limit}`)
    if (!Number.isInteger(index)) throw TypeError('index must be an integer')
  }

  set(index) {
    this._validate(index)
    this.mask |= (1n << BigInt(index))
    return this
  }

  clear(index) {
    this._validate(index)
    this.mask &= ~(1n << BigInt(index))
    return this
  }

  toggle(index) {
    this._validate(index)
    this.mask ^= (1n << BigInt(index))
    return this
  }

  has(index) {
    this._validate(index)
    return ((this.mask >> BigInt(index)) & 1n) === 1n
  }

  and(other) {
    this.mask &= BigInt(other.mask ?? other)
    return this
  }

  or(other) {
    this.mask |= BigInt(other.mask ?? other)
    return this
  }

  xor(other) {
    this.mask ^= BigInt(other.mask ?? other)
    return this
  }

  not() {
    // Infinite does NOT make sense, so flip only the bits that currently exist
    const highest = this.highest()
    if (highest >= 0) {
      const maskLimit = (1n << BigInt(highest + 1)) - 1n
      this.mask = (~this.mask) & maskLimit
    }
    return this
  }

  highest() {
    if (this.mask === 0n) return -1

    let bit = 0
    // use exponential growth to get upper bound fast
    while ((1n << BigInt(bit + 1)) <= this.mask) bit = (bit + 1) * 2
    // now narrow down binary search from current bit down to floor(log2(n))
    let left = bit / 2, right = bit
    while (left <= right) {
      const mid = Math.floor((left + right) / 2)
      const shifted = 1n << BigInt(mid)
      if (shifted <= this.mask) left = mid + 1
      else right = mid - 1
    }
    return right
  }

  getAllSet() {
    if (this.mask === 0n) return []

    const results = []
    let temp = this.mask
    let index = 0
    while (temp !== 0n) {
      if ((temp & 1n) === 1n) results.push(index)
      temp >>= 1n
      index++
    }
    return results
  }
}

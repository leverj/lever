export class Bitmask {
  static practical_bits_limit = 1073741822n

  static with(bits) { return new this().write(bits)  }

  constructor(value = 0n) {
    this.mask = BigInt(value)
  }

  toString(radix = 10) { return this.mask.toString(radix) }

  read() {
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
  values() { return this.read() }

  write(bits) {
    bits.forEach(_ => this.set(_))
    return this
  }

  /** efficient bit count (using the Kernighan method) */
  count() {
    let count = 0, n = this.mask
    while (n) {
      n &= (n - 1n)
      count++
    }
    return count
  }
  size() { return this.count() }

  validate(bit) {
    bit = BigInt(bit)
    if (!Number.isInteger(Number(bit))) throw TypeError('bit must be an integer')
    if (bit < 0n) throw RangeError('bit must be >= 0')
    if (bit > Bitmask.practical_bits_limit) throw RangeError(`value must be <= ${Bitmask.practical_bits_limit}`)
    return bit
  }

  has(bit) {
    bit = this.validate(bit)
    return ((this.mask >> bit) & 1n) === 1n
  }
  includes(bit) { return this.has(bit) }
  contains(bit) { return this.has(bit) }

  get(bit) { return this.has(bit) }

  getHighest() {
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

  set(bit) {
    bit = this.validate(bit)
    this.mask |= (1n << bit)
    return this
  }
  add(bit) { return this.set(bit) }

  unset(bit) {
    bit = this.validate(bit)
    this.mask &= ~(1n << bit)
    return this
  }
  clear(bit) { return this.unset(bit) }
  remove(bit) { return this.unset(bit) }

  toggle(bit) {
    bit = this.validate(bit)
    this.mask ^= (1n << bit)
    return this
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
    const highest = this.getHighest()
    if (highest >= 0) {
      const maskLimit = (1n << BigInt(highest + 1)) - 1n
      this.mask = (~this.mask) & maskLimit
    }
    return this
  }
}

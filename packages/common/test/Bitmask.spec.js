import {expect} from 'expect'
import {Bitmask} from '@leverj/lever.common'

describe('Bitmask', () => {
  it('initializes to 0n by default', () => {
    const bitmask = new Bitmask()
    expect(bitmask.mask).toBe(0n)
  })

  it('initializes with a given BigInt value', () => {
    const bitmask = new Bitmask(10n)
    expect(bitmask.mask).toBe(10n)
  })

  it('set turns on the correct bit', () => {
    const bitmask = new Bitmask()
    bitmask.set(5)
    expect(bitmask.has(5)).toBe(true)
    expect(bitmask.mask).toBe(32n)
  })

  it('clear resets only the correct bit', () => {
    const bitmask = new Bitmask()
    bitmask.set(4).set(5)
    expect(bitmask.has(4)).toBe(true)
    expect(bitmask.has(5)).toBe(true)

    bitmask.clear(4)
    expect(bitmask.has(4)).toBe(false)
    expect(bitmask.has(5)).toBe(true)
  })

  it('toggle flips a bit on and off', () => {
    const bitmask = new Bitmask()
    bitmask.toggle(8)
    expect(bitmask.has(8)).toBe(true)
    bitmask.toggle(8)
    expect(bitmask.has(8)).toBe(false)
  })

  it('has returns false for unset bits', () => {
    const bitmask = new Bitmask()
    expect(bitmask.has(10)).toBe(false)
  })

  it('and() performs bitwise AND', () => {
    const a = new Bitmask().set(1).set(3) // 1010
    const b = new Bitmask().set(3)           // 1000
    a.and(b)
    expect(a.mask).toBe(8n)
    expect(a.has(3)).toBe(true)
    expect(a.has(1)).toBe(false)
  })

  it('or() performs bitwise OR', () => {
    const a = new Bitmask().set(1) // 0010
    const b = new Bitmask().set(3) // 1000
    a.or(b)
    expect(a.mask).toBe(10n)         // 1010
    expect(a.has(1)).toBe(true)
    expect(a.has(3)).toBe(true)
  })

  it('xor() performs bitwise XOR', () => {
    const a = new Bitmask().set(1).set(3) // 1010
    const b = new Bitmask().set(3)           // 1000
    a.xor(b)
    expect(a.mask).toBe(2n)                    // 0010
    expect(a.has(3)).toBe(false)
    expect(a.has(1)).toBe(true)
  })

  it('not() flips bits only within highest active bit boundary', () => {
    const bitmask = new Bitmask()
    bitmask.set(3).set(1)  // 1010
    expect(bitmask.mask).toBe(10n)

    bitmask.not() // 1010 -> 0101 (within 4-bit range)
    expect(bitmask.mask).toBe(5n)
    expect(bitmask.has(0)).toBe(true)
    expect(bitmask.has(1)).toBe(false)
    expect(bitmask.has(2)).toBe(true)
    expect(bitmask.has(3)).toBe(false)
  })

  it('highest returns highest set value', () => {
    const bitmask = new Bitmask()
    expect(bitmask.highest()).toBe(-1)

    const high = 100, middle = 10, low = 1
    bitmask.set(middle)
    expect(bitmask.highest()).toBe(middle)

    bitmask.set(low)
    expect(bitmask.highest()).toBe(middle)

    bitmask.set(high)
    expect(bitmask.highest()).toBe(high)
  })

  it('supports very large bit positions', () => {
    const bitmask = new Bitmask()
    const big = Bitmask.practical_bits_limit
    bitmask.set(big)
    expect(bitmask.has(big)).toBe(true)
    expect(bitmask.has(big - 1)).toBe(false)
    expect(bitmask.highest()).toBe(big)
  })

  it('out of range checks', () => {
    const bitmask = new Bitmask()
    expect(() => bitmask.set(-1)).toThrow(RangeError)
    expect(() => bitmask.set(0)).not.toThrow(RangeError)
    expect(() => bitmask.has(Bitmask.practical_bits_limit)).not.toThrow(RangeError)
    expect(() => bitmask.has(Bitmask.practical_bits_limit + 1)).toThrow(RangeError)
  })

  it('toString supports radix formatting', () => {
    const bitmask = new Bitmask()
    bitmask.set(2)
    expect(bitmask.toString()).toBe('4')
    expect(bitmask.toString(2)).toBe('100')
    expect(bitmask.toString(16)).toBe('4')
  })

  it('getAllSet returns all "stored" values', () => {
    const bitmask = new Bitmask()
    expect(bitmask.getAllSet()).toEqual([])

    const values = [100_000, 10_000, 1_000, 100, 10, 1]
    values.forEach(_ => {
      expect(bitmask.has(_)).toBe(false)
      bitmask.set(_)
      expect(bitmask.has(_)).toBe(true)
    })
    expect(bitmask.getAllSet()).toEqual(values.sort())
  })
})

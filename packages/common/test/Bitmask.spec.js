import {expect} from 'expect'
import {Bitmask} from '@leverj/lever.common'

describe('Bitmask', () => {
  it('initializes to 0n by default', () => {
    const bitmask = new Bitmask()
    expect(bitmask.mask).toBe(0n)
  })

  it('initializes with a given BigInt mask', () => {
    const bitmask = new Bitmask(10n)
    expect(bitmask.mask).toBe(10n)
    expect(bitmask.has(1)).toBe(true)
    expect(bitmask.has(3)).toBe(true)
    expect(bitmask.values()).toEqual([1, 3])
  })

  it('can set a specific bit', () => {
    const bitmask = new Bitmask()
    bitmask.set(5)
    expect(bitmask.has(5)).toBe(true)
    expect(bitmask.mask).toBe(32n)
  })

  it('can unset a specific bit', () => {
    const bitmask = Bitmask.with([1, 2, 3, 5, 8, 13, 21])
    expect(bitmask.values()).toEqual([1, 2, 3, 5, 8, 13, 21])

    bitmask.unset(2)
    bitmask.unset(4) // should have no effect
    bitmask.clear(5)    // using alias
    bitmask.remove(13)  // using alias
    expect(bitmask.values()).toEqual([1, 3, 8,21])
  })

  it('can toggle a bit on and off', () => {
    const bitmask = new Bitmask()
    expect(bitmask.has(8)).toBe(false)

    bitmask.toggle(8)
    expect(bitmask.has(8)).toBe(true)

    bitmask.toggle(8)
    expect(bitmask.has(8)).toBe(false)
  })

  it('has', () => {
    const values = [1, 2, 3, 5, 8, 13, 21]
    {
      const bitmask = new Bitmask()
      values.forEach(_ => expect(bitmask.has(_)).toBe(false))
    }
    {
      const bitmask = Bitmask.with(values)
      values.forEach(_ => {
        expect(bitmask.has(_)).toBe(true)
        expect(bitmask.includes(_)).toBe(true) // using alias
        expect(bitmask.contains(_)).toBe(true) // using alias
      })
    }
  })

  it('can performs bitwise AND', () => {
    const a = new Bitmask().set(1).set(3) // 1010
    const b = new Bitmask().set(3)        // 1000
    a.and(b)
    expect(a.mask).toBe(8n)
    expect(a.has(3)).toBe(true)
    expect(a.has(1)).toBe(false)
  })

  it('can performs bitwise OR', () => {
    const a = new Bitmask().set(1) // 0010
    const b = new Bitmask().set(3) // 1000
    a.or(b)
    expect(a.mask).toBe(10n)       // 1010
    expect(a.has(1)).toBe(true)
    expect(a.has(3)).toBe(true)
  })

  it('can performs bitwise XOR', () => {
    const a = new Bitmask().set(1).set(3) // 1010
    const b = new Bitmask().set(3)        // 1000
    a.xor(b)
    expect(a.mask).toBe(2n)               // 0010
    expect(a.has(3)).toBe(false)
    expect(a.has(1)).toBe(true)
  })

  it('can performs bitwise NOT (which flips bits only within highest set bit boundary)', () => {
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

  it('getHighest returns highest set bit', () => {
    const bitmask = new Bitmask()
    expect(bitmask.getHighest()).toBe(-1)

    const high = 100, middle = 10, low = 1
    bitmask.set(middle)
    expect(bitmask.getHighest()).toBe(middle)

    bitmask.set(low)
    expect(bitmask.getHighest()).toBe(middle)

    bitmask.set(high)
    expect(bitmask.getHighest()).toBe(high)
  })

  it('supports very large bit positions', () => {
    const bitmask = new Bitmask()
    const big = Bitmask.practical_bits_limit
    bitmask.set(big)
    expect(bitmask.has(big)).toBe(true)
    expect(bitmask.has(big - 1n)).toBe(false)
    expect(bitmask.getHighest()).toBe(Number(big))
  })

  it('performs out of range checks', () => {
    const bitmask = new Bitmask()
    expect(() => bitmask.set(-1)).toThrow(RangeError)
    expect(() => bitmask.set(0)).not.toThrow(RangeError)
    expect(() => bitmask.has(Bitmask.practical_bits_limit)).not.toThrow(RangeError)
    expect(() => bitmask.has(Bitmask.practical_bits_limit + 1n)).toThrow(RangeError)
  })

  it('toString supports radix formatting', () => {
    const bitmask = new Bitmask()
    bitmask.set(2)
    expect(bitmask.toString()).toBe('4')
    expect(bitmask.toString(2)).toBe('100')
    expect(bitmask.toString(16)).toBe('4')
  })

  it('can write & read all set values', () => {
    const bitmask = new Bitmask()
    expect(bitmask.read()).toEqual([])
    expect(bitmask.values()).toEqual([]) // using alias

    const values = [100_000, 10_000, 1_000, 100, 10, 1]
    values.forEach(_ => expect(bitmask.has(_)).toBe(false))
    bitmask.write(values)
    values.forEach(_ => expect(bitmask.has(_)).toBe(true))
    expect(bitmask.read()).toEqual(values.sort())
  })

  it('can count the number of set values', () => {
    expect(new Bitmask().count()).toEqual(0)
    expect(new Bitmask().size()).toEqual(0) // using alias

    const values = [1, 10, 100, 10**3, 10**4, 10**5, 10**6, 10**7, 10**8, 10**9, Bitmask.practical_bits_limit]
    const bitmask = Bitmask.with(values)
    expect(bitmask.count()).toEqual(values.length)
  })
})

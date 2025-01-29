import {InMemoryStore} from '@leverj/lever.storage'
import {expect} from 'expect'
import {transfers} from './fixtures/transfers.js'

describe('InMemoryStore', () => {
  const size = transfers.length
  let store

  it('can set & get & find & delete a simple key', () => {
    const keyFrom = (from, txId) => `${from}@${txId}`

    store = new InMemoryStore()
    expect(Object.keys(store.toObject())).toHaveLength(0)
    for (let each of transfers) {
      const key = keyFrom(each.from, each.txId)
      expect(store.has(key)).toBe(false)
      store.set(key, each)
      expect(store.has(key)).toBe(true)
    }
    expect(Object.keys(store.toObject())).toHaveLength(size)

    expect(store.find('BNB')).toHaveLength(36)
    expect(store.find('Fantom')).toHaveLength(34)
    expect(store.find('Ethereum')).toHaveLength(30)
    for (let [i, each] of [11, 11, 2, 1, 1, 1, 1, 1, 1].entries()) {
      expect(store.find(keyFrom('Ethereum', i + 1))).toHaveLength(each)
    }

    for (let each of transfers) {
      const key = keyFrom(each.from, each.txId)
      expect(store.has(key)).toBe(true)
      store.delete(key)
      expect(store.has(key)).toBe(false)
    }
  })

  //fixme:values: assert about keys / values / entries
  it('can get size & keys & values & entries', () => {
    store = new InMemoryStore()
    for (let i = 0; i < size; i++) store.set(i, transfers[i])
    expect(Object.keys(store.toObject())).toHaveLength(size)
    expect(store.size()).toEqual(size)
    expect(store.keys()).toHaveLength(size)
    expect(store.values()).toHaveLength(size)
    expect(store.entries()).toHaveLength(size)
  })
})

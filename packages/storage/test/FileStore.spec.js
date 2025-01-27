import {JsonStore} from '@leverj/lever.storage'
import {expect} from 'expect'
import {existsSync, mkdtempSync, rmSync} from 'node:fs'
import {tmpdir} from 'node:os'
import {fixtures} from './fixtures.js'

describe('FileStore', () => {
  const storageDir = mkdtempSync(`${tmpdir()}/storage`)
  const size = fixtures.length
  let store

  beforeEach(() => { if (existsSync(storageDir)) rmSync(storageDir, {recursive: true, force: true}) })

  it('can set & get & find & delete a simple key', () => {
    const keyFrom = (from, txId) => `${from}_${txId}`

    store = new JsonStore(storageDir, 'simple')
    expect(Object.keys(store.toObject())).toHaveLength(0)
    for (let each of fixtures) {
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

    for (let each of fixtures) {
      const key = keyFrom(each.from, each.txId)
      expect(store.has(key)).toBe(true)
      store.delete(key)
      expect(store.has(key)).toBe(false)
    }
  })

  it('can set & get & find & delete a composite key', () => {
    store = new JsonStore(storageDir, 'composite')
    for (let each of fixtures) {
      const {account, from, txId} = each
      const key = [account, from, txId]
      expect(store.has(key)).toBe(false)
      store.set(key, each)
      expect(store.has(key)).toBe(true)
    }
    expect(store.keys()).toHaveLength(size)
    expect(store.values()).toHaveLength(size)

    expect(store.find('0x1')).toHaveLength(35)
    expect(store.find('0x14')).toHaveLength(11)
    expect(store.find('0x14dC79964da2C08b23698B3D3cc7Ca32193d9955')).toHaveLength(11)
    expect(store.find(['0x14dC79964da2C08b23698B3D3cc7Ca32193d9955', 'BNB'])).toHaveLength(6)
    expect(store.find(['0x14dC79964da2C08b23698B3D3cc7Ca32193d9955', 'Ethereum'])).toHaveLength(2)
    expect(store.find(['0x14dC79964da2C08b23698B3D3cc7Ca32193d9955', 'Fantom'])).toHaveLength(3)
    expect(store.find(['0x14dC79964da2C08b23698B3D3cc7Ca32193d9955', 'Polygon'])).toHaveLength(0)

    for (let each of fixtures) {
      const {account, from, txId} = each
      const key = [account, from, txId]
      expect(store.has(key)).toBe(true)
      store.delete(key)
      expect(store.has(key)).toBe(false)
    }
  })

  it('can get size & keys & values & entries', () => {
    store = new JsonStore(storageDir, 'whatever')
    for (let i = 0; i < size; i++) store.set(i, fixtures[i])
    expect(Object.keys(store.toObject())).toHaveLength(size)
    expect(store.size()).toEqual(size)
    expect(store.keys()).toHaveLength(size)
    expect(store.values()).toHaveLength(size)
    expect(store.entries()).toHaveLength(size)
  })
})

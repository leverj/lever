import {LevelStore} from '@leverj/lever.storage'
import {expect} from 'expect'
import {existsSync, mkdtempSync, rmSync} from 'node:fs'
import {tmpdir} from 'node:os'
import {transfers} from './fixtures/transfers.js'

describe('LevelStore', () => {
  const storageDir = mkdtempSync(`${tmpdir()}/storage`)
  const size = transfers.length
  let store

  beforeEach(() => { if (existsSync(storageDir)) rmSync(storageDir, {recursive: true, force: true}) })
  afterEach(async () => await store.close())

  it('can set & get & find & delete a simple key', async () => {
    const keyFrom = (from, txId) => `${from}/${txId}`

    store = new LevelStore(storageDir, 'simple')
    expect(Object.keys(await store.toObject())).toHaveLength(0)
    for (let each of transfers) {
      const key = keyFrom(each.from, each.txId)
      expect(await store.has(key)).toBe(false)
      await store.set(key, each)
      expect(await store.has(key)).toBe(true)
    }
    expect(Object.keys(await store.toObject())).toHaveLength(size)

    expect(await store.find('BNB')).toHaveLength(36)
    expect(await store.find('Fantom')).toHaveLength(34)
    expect(await store.find('Ethereum')).toHaveLength(30)
    for (let [i, each] of [11, 11, 2, 1, 1, 1, 1, 1, 1].entries()) {
      expect(await store.find(keyFrom('Ethereum', i + 1))).toHaveLength(each)
    }

    for (let each of transfers) {
      const key = keyFrom(each.from, each.txId)
      expect(await store.has(key)).toBe(true)
      await store.delete(key)
      expect(await store.has(key)).toBe(false)
    }
  })

  it('can set & get & find & delete a composite key', async () => {
    store = new LevelStore(storageDir, 'composite')
    for (let each of transfers) {
      const {account, from, txId} = each
      const key = [account, from, txId]
      expect(await store.has(key)).toBe(false)
      await store.set(key, each)
      expect(await store.has(key)).toBe(true)
    }
    expect(await store.keys()).toHaveLength(size)
    expect(await store.values()).toHaveLength(size)

    expect(await store.find('0x1')).toHaveLength(35)
    expect(await store.find('0x14')).toHaveLength(11)
    expect(await store.find('0x14dC79964da2C08b23698B3D3cc7Ca32193d9955')).toHaveLength(11)
    expect(await store.find(['0x14dC79964da2C08b23698B3D3cc7Ca32193d9955', 'BNB'])).toHaveLength(6)
    expect(await store.find(['0x14dC79964da2C08b23698B3D3cc7Ca32193d9955', 'Ethereum'])).toHaveLength(2)
    expect(await store.find(['0x14dC79964da2C08b23698B3D3cc7Ca32193d9955', 'Fantom'])).toHaveLength(3)
    expect(await store.find(['0x14dC79964da2C08b23698B3D3cc7Ca32193d9955', 'Polygon'])).toHaveLength(0)

    for (let each of transfers) {
      const {account, from, txId} = each
      const key = [account, from, txId]
      expect(await store.has(key)).toBe(true)
      await store.delete(key)
      expect(await store.has(key)).toBe(false)
    }
  })

  it('can store and get size & keys & values & entries (for simple & compound keys', async () => {
    {
      store = new LevelStore(storageDir, 'simple')
      for (let i = 0; i < size; i++) await store.set(i, transfers[i])
      expect(Object.keys(await store.toObject())).toHaveLength(size)
      expect(await store.size()).toEqual(size)
      expect(await store.keys()).toHaveLength(size)
      expect(await store.values()).toHaveLength(size)
      expect(await store.entries()).toHaveLength(size)
    }
    {
      store = new LevelStore(storageDir, 'composite')
      await Promise.all(transfers.map(_ => store.set([_.account, _.from, _.txId], _)))
      expect(Object.keys(await store.toObject())).toHaveLength(size)
      expect(await store.size()).toEqual(size)
      expect(await store.keys()).toHaveLength(size)
      expect(await store.values()).toHaveLength(size)
      expect(await store.entries()).toHaveLength(size)
    }
  })
})

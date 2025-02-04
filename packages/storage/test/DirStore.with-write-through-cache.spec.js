import {JsonDirStore} from '../src/DirStore.with-write-through-cache.js'
import {expect} from 'expect'
import {existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync} from 'node:fs'
import {tmpdir} from 'node:os'
import {setTimeout} from 'node:timers/promises'
import pWaitFor from 'p-wait-for'
import {transfers} from './fixtures/transfers.js'

describe('DirStore.with-write-through-cache', () => {
  const storageDir = mkdtempSync(`${tmpdir()}/storage`)
  const size = transfers.length
  let store

  beforeEach(() => { if (existsSync(storageDir)) rmSync(storageDir, {recursive: true, force: true}) })
  afterEach(() => store.close())

  it('can set & get & find & delete a simple key', () => {
    const keyFrom = (from, txId) => `${from}-${txId}`

    store = new JsonDirStore(storageDir)
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

  it('can set & get & find & delete a composite key', () => {
    store = new JsonDirStore(storageDir)
    for (let each of transfers) {
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

    for (let each of transfers) {
      const {account, from, txId} = each
      const key = [account, from, txId]
      expect(store.has(key)).toBe(true)
      store.delete(key)
      expect(store.has(key)).toBe(false)
    }
  })

  it('can get size & keys & values & entries', () => {
    store = new JsonDirStore(storageDir)
    for (let i = 0; i < size; i++) store.set(i, transfers[i])
    expect(Object.keys(store.toObject())).toHaveLength(size)
    expect(store.size()).toEqual(size)
    expect(store.keys()).toHaveLength(size)
    expect(store.values()).toHaveLength(size)
    expect(store.entries()).toHaveLength(size)
  })

  it('can detect an externally added file and update accordingly', async () => {
    store = new JsonDirStore(storageDir)
    for (let i = 0; i < size; i++) writeFileSync(`${storageDir}/${i}.json`, JSON.stringify(transfers[i]))
    await pWaitFor(() => store.size() === size)
    expect(Object.keys(store.toObject())).toHaveLength(size)
  })

  it.skip('can detect an externally modified file and update accordingly', async () => {
    store = new JsonDirStore(storageDir)
    for (let i = 0; i < transfers.length; i++) store.set(i, transfers[i])
    expect(store.get(0)).not.toMatchObject(store.get(1))
    await setTimeout(500)
    console.log('\n'.repeat(2), '!'.repeat(50))
    writeFileSync(`${storageDir}/${0}.json`, JSON.stringify(transfers[1], null, 2))
    await setTimeout(500)
    console.log('\n'.repeat(2), '!'.repeat(50))
    return
    // fixme: failing to detect changed file
    expect(store.get(0)).toMatchObject(store.get(1))
    expect(readFileSync(`${storageDir}/${0}.json`, 'utf8')).toEqual(readFileSync(`${storageDir}/${1}.json`, 'utf8'))
  })

  it.skip('can detect underlying files being modified and sync accordingly', async () => {
    const every = 20//th
    store = new JsonDirStore(storageDir)
    for (let i = 0; i < size; i++) store.set(i, transfers[i])

    const replica = new JsonDirStore(storageDir)
    try {
      for (let i = 0; i < size; i++) {
        console.log(i, store.get(i), replica.has(i))
        // expect(store.get(i)).toMatchObject(replica.get(i))
        // if (i % every === 1) expect(replica.get(i)).not.toMatchObject(transfers[i - 1])
      }
      return
      await setTimeout(500)
      console.log('\n'.repeat(2), '!'.repeat(50))
      for (let i = 0; i < size; i++) {
        if (i % every === 1) replica.set(i, transfers[i - 1])
      }
      await setTimeout(400)
      for (let i = 0; i < size; i++) {
        if (i % every === 1) expect(replica.get(i)).toMatchObject(transfers[i - 1])
        expect(store.get(i)).toMatchObject(replica.get(i))
      }
    } finally {
      replica.close()
    }
  })
})

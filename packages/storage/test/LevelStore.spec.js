import {LevelStore} from '@leverj/lever.storage'
import {expect} from 'expect'
import {ZeroAddress} from 'ethers'
import {cloneDeep} from 'lodash-es'
import {existsSync, mkdtempSync, rmSync} from 'node:fs'
import {tmpdir} from 'node:os'
import {transfers} from './fixtures/transfers.js'

describe('LevelStore', () => {
  const storageDir = mkdtempSync(`${tmpdir()}/storage`)
  const size = transfers.length
  let store

  beforeEach(() => { if (existsSync(storageDir)) rmSync(storageDir, {recursive: true, force: true}) })
  afterEach(async () => { if (store) await store.close() })

  it('can set & get & find & delete a simple key', async () => {
    const keyFrom = (from, txId) => `${from}/${txId}`

    store = new LevelStore(storageDir, 'simple')
    expect(Object.keys(await store.toObject())).toHaveLength(0)
    for (let each of transfers) {
      const key = keyFrom(each.from, each.txId)
      expect(store.has(key)).toBe(false)
      await store.set(key, each)
      expect(store.has(key)).toBe(true)
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
      expect(store.has(key)).toBe(true)
      await store.delete(key)
      expect(store.has(key)).toBe(false)
    }
  })

  it('can set & get & find & delete a composite key', async () => {
    store = new LevelStore(storageDir, 'composite')
    await store.open()
    for (let each of transfers) {
      const {account, from, txId} = each
      const key = [account, from, txId]
      expect(store.has(key)).toBe(false)
      await store.set(key, each)
      expect(store.has(key)).toBe(true)
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
      expect(store.has(key)).toBe(true)
      await store.delete(key)
      expect(store.has(key)).toBe(false)
    }
  })

  it('can store and get size & keys & values & entries (for simple & compound keys', async () => {
    try {
      store = new LevelStore(storageDir, 'simple')
      for (let i = 0; i < size; i++) await store.set(i, transfers[i])
      expect(Object.keys(await store.toObject())).toHaveLength(size)
      expect(await store.size()).toEqual(size)
      expect(await store.keys()).toHaveLength(size)
      expect(await store.values()).toHaveLength(size)
      expect(await store.entries()).toHaveLength(size)
    } finally {
      await store.close()
    }
    try {
      store = new LevelStore(storageDir, 'composite')
      await Promise.all(transfers.map(_ => store.set([_.account, _.from, _.txId], _)))
      expect(Object.keys(await store.toObject())).toHaveLength(size)
      expect(await store.size()).toEqual(size)
      expect(await store.keys()).toHaveLength(size)
      expect(await store.values()).toHaveLength(size)
      expect(await store.entries()).toHaveLength(size)
    } finally {
      await store.close()
    }
  })

  it('can update values within a deeply nested object', async () => {
    const {default: _networks_} = await import('./fixtures/networks.json', {with: {type: 'json'}})
    const networks = cloneDeep(_networks_)
    const chains = ['holesky', 'sepolia']
    const evms = chains.map(_ => networks[_]).map(_ => {
      _.id = parseInt(_.id)
      _.chainId = parseInt(_.id)
      return _
    })
    store = new LevelStore(storageDir, 'evms')
    for (let _ of evms) await store.set(_.label, _)
    expect(await store.size()).toEqual(chains.length)
    expect(await store.keys()).toHaveLength(chains.length)
    expect(await store.values()).toHaveLength(chains.length)
    expect(store.has('no-such-chain')).toBe(false)

    const contracts = ['multicall3', 'ensRegistry', 'ensUniversalResolver']
    const multicall3 = {address: ZeroAddress.replaceAll('0', 'f'), blockCreated: 911} // modify
    const new_kid_in_town = {address: ZeroAddress, blockCreated: 1_000_000_000}
    const updates = {
      multicall3,      // modify
      new_kid_in_town, // add
    }
    for (let chain of chains) {
      const before = cloneDeep((store.get(chain)).contracts)
      contracts.forEach(name => expect(before[name]).toBeDefined())
      await store.update(chain, {contracts: updates})
      const after = cloneDeep((store.get(chain)).contracts)
      expect(before.ensRegistry).toMatchObject(after.ensRegistry) // unchanged
      expect(before.ensUniversalResolver).toMatchObject(after.ensUniversalResolver) // unchanged
      expect(before.multicall3).not.toMatchObject(multicall3)// modified
      expect(after.multicall3).toMatchObject(multicall3)
      expect(before.new_kid_in_town).not.toBeDefined()
      expect(after.new_kid_in_town).toMatchObject(new_kid_in_town) // added
    }
  })

  it('cannot open more than one concurrently', async () => {
    store = new LevelStore(storageDir, 'shared')
    await store.set(0, transfers[0])

    const replica = new LevelStore(storageDir, 'shared')
    expect(() => replica.get(0)).toThrow(/Database is not open/)
    await expect(replica.open()).rejects.toThrow(/Database failed to open/)
  })
})

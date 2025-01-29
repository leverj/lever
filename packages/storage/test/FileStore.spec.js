import {existsSync, mkdtempSync, rmSync} from 'node:fs'
import {JsonStore} from '@leverj/lever.storage'
import {expect} from 'expect'
import {tmpdir} from 'node:os'
import {transfers} from './fixtures/transfers.js'
import {Map, Set} from 'immutable'

describe('FileStore', () => {
  const storageDir = mkdtempSync(`${tmpdir()}/storage`)
  const size = transfers.length
  let store

  beforeEach(() => { if (existsSync(storageDir)) rmSync(storageDir, {recursive: true, force: true}) })

  it('can set & get & find & delete a simple key', () => {
    const keyFrom = (from, txId) => `${from}_${txId}`

    store = new JsonStore(storageDir, 'simple')
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
    store = new JsonStore(storageDir, 'composite', true)
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

  it('can store and get size & keys & values & entries (for simple & compound keys', () => {
    {
      store = new JsonStore(storageDir, 'simple')
      for (let i = 0; i < size; i++) store.set(i, transfers[i])
      expect(Object.keys(store.toObject())).toHaveLength(size)
      expect(store.size()).toEqual(size)
      expect(store.keys()).toHaveLength(size)
      expect(store.values()).toHaveLength(size)
      expect(store.entries()).toHaveLength(size)
    }
    {
      store = new JsonStore(storageDir, 'composite', true)
      transfers.forEach(_ => store.set([_.account, _.from, _.txId], _))
      expect(Object.keys(store.toObject())).not.toHaveLength(size)
      expect(Object.keys(store.toObject())).toHaveLength(size / 10)
      expect(store.size()).toEqual(size)
      expect(store.keys()).toHaveLength(size)
      expect(store.values()).toHaveLength(size)
      expect(store.entries()).toHaveLength(size)
    }
  })

  it('can store and get the size & keys & values of deeply nested objects', () => {
    const contractTypesToTrack = Set([
      'multicall3',
      'ensRegistry',
      'ensUniversalResolver',
    ])
    const chains = [
      'hardhat',  // no contracts
      'arbitrum', // only multicall3 contract
      'holesky',
      'sepolia',
      'fantom',
    ]
    const fixtures_store = new JsonStore(`${import.meta.dirname}/fixtures`, 'networks')
    expect(fixtures_store.keys()).toHaveLength(518)

    const evms = fixtures_store.values().filter(_ => Set(chains.concat('no-such-chain')).has(_.label)).map(_ => {
      _.id = parseInt(_.id)
      _.chainId = parseInt(_.id)
      _.contracts = Map(_.contracts).filter((value, key) => contractTypesToTrack.has(key)).map(_ => _.address).toJS()
      return _
    })
    store = new JsonStore(storageDir, 'evms')
    evms.forEach(_ => store.set(_.label, _))
    expect(store.size()).toEqual(chains.length)
    expect(store.keys()).toHaveLength(chains.length)
    expect(store.values()).toHaveLength(chains.length)
    expect(store.has('no-such-chain')).toBe(false)
    store.values().filter(_ => _.label !== 'no-such-chain').forEach(
      _ => expect(store.get(_.label)).toMatchObject(fixtures_store.get(_.label))
    )
  })
})

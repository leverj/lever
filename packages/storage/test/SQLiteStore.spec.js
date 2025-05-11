import {SQLiteStore} from '@leverj/lever.storage'
import {expect} from 'expect'
import {ZeroAddress} from 'ethers'
import {cloneDeep} from 'lodash-es'
import {mkdtempSync} from 'node:fs'
import {tmpdir} from 'node:os'
import {DatabaseSync} from 'node:sqlite'
import {transfers} from './fixtures/transfers.js'

describe('SQLiteStore', () => {
  const size = transfers.length
  let db, store

  ['in-memory', 'file'].forEach(type => {
    describe(`type = ${type}`, () => {
      before(() => {
        const storageDir = mkdtempSync(`${tmpdir()}/storage`)
        db = new DatabaseSync(type === 'in-memory' ? ':memory:' : `${storageDir}/db`)
      })
      beforeEach(() => store = new SQLiteStore(db, 'transfers'))

      it('can set & get & find & delete a simple key', () => {
        const keyFrom = (from, txId) => `${from}_${txId}`
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

      describe('can store and get size & keys & values & entries (for simple & compound keys', () => {
        beforeEach(() => store.clear())
        it('simple', () => {
          for (let i = 0; i < size; i++) store.set(i, transfers[i])
          expect(Object.keys(store.toObject())).toHaveLength(size)
          expect(store.size()).toEqual(size)
          expect(store.keys()).toHaveLength(size)
          expect(store.values()).toHaveLength(size)
          expect(store.entries()).toHaveLength(size)
        })

        it('composite', () => {
          transfers.forEach(_ => store.set([_.account, _.from, _.txId], _))
          expect(Object.keys(store.toObject())).toHaveLength(size)
          expect(store.size()).toEqual(size)
          expect(store.keys()).toHaveLength(size)
          expect(store.values()).toHaveLength(size)
          expect(store.entries()).toHaveLength(size)
        })
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
        evms.forEach(_ => store.set(_.label, _))
        expect(store.size()).toEqual(chains.length)
        expect(store.keys()).toHaveLength(chains.length)
        expect(store.values()).toHaveLength(chains.length)
        expect(store.has('no-such-chain')).toBe(false)

        const contracts = ['multicall3', 'ensRegistry', 'ensUniversalResolver']
        const multicall3 = {address: ZeroAddress.replaceAll('0', 'f'), blockCreated: 911} // modify
        const new_kid_in_town = {address: ZeroAddress, blockCreated: 1_000_000_000}
        const updates = {
          multicall3,      // modify
          new_kid_in_town, // add
        }
        for (let chain of chains) {
          const before = cloneDeep(store.get(chain).contracts)
          contracts.forEach(name => expect(before[name]).toBeDefined())
          store.update(chain, {contracts: updates})
          const after = cloneDeep(store.get(chain).contracts)
          expect(before.ensRegistry).toMatchObject(after.ensRegistry) // unchanged
          expect(before.ensUniversalResolver).toMatchObject(after.ensUniversalResolver) // unchanged
          expect(before.multicall3).not.toMatchObject(multicall3)// modified
          expect(after.multicall3).toMatchObject(multicall3)
          expect(before.new_kid_in_town).not.toBeDefined()
          expect(after.new_kid_in_town).toMatchObject(new_kid_in_town) // added
        }
      })
    })
  })
})

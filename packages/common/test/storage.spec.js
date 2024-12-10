import {JsonDirStore, JsonStore} from '@leverj/lever.common'
import {expect} from 'expect'
import {existsSync, mkdtempSync, rmSync} from 'node:fs'
import {tmpdir} from 'node:os'

describe('storage', () => {
  const storageDir = mkdtempSync(`${tmpdir()}/storage`)
  const fixtures = {
    A: {
      int: 1,
      string: 'a',
      array: [1, 'a'],
      compound: {
        int: 1,
        string: 'a',
        array: [1, 'a'],
      }
    },
    B: {
      int: 2,
      string: 'b',
      array: [2, 'b'],
      compound: {
        int: 2,
        string: 'b',
        array: [2, 'b'],
      }
    }
  }

  beforeEach(() => { if (existsSync(storageDir)) rmSync(storageDir, {recursive: true, force: true}) })

  it('JsonStore', () => {
    const store = new JsonStore(storageDir, 'fixtures')
    for (let key of Object.keys(fixtures)) expect(store.get(key)).toBeUndefined()
    for (let [key, value] of Object.entries(fixtures)) store.set(key, value)
    for (let key of Object.keys(fixtures)) expect(store.get(key)).toMatchObject(fixtures[key])
    expect(store.toObject()).toMatchObject(fixtures)
  })

  it('JsonDirStore', () => {
    const store = new JsonDirStore(`${storageDir}/fixtures`)
    for (let key of Object.keys(fixtures)) expect(store.get(key)).toBeUndefined()
    for (let [key, value] of Object.entries(fixtures)) store.set(key, value)
    for (let key of Object.keys(fixtures)) expect(store.get(key)).toMatchObject(fixtures[key])
    expect(store.toObject()).toMatchObject(fixtures)
  })
})

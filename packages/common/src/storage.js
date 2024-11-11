import {Map} from 'immutable'
import {merge} from 'lodash-es'
import {existsSync, readdirSync, readFileSync, rmSync, writeFileSync} from 'node:fs'
import {basename, extname} from 'node:path'
import {ensureExistsSync} from './files.js'

export class InMemoryStore {
  constructor(prior = {}) { this.map = Map(prior).asMutable() }
  get(key, defaults) { return this.map.get(key, defaults) }
  set(key, value) { this.map.set(key, value) }
  update(key, value) { this.set(key, merge(this.get(key, {}), value)) }
  delete(key) { this.map.delete(key) }
  has(key) { return this.map.has(key) }
  entries() { return this.map.entrySeq() }
  keys() { return this.map.keySeq().toArray() }
  values() { return this.map.valueSeq().toArray() }
  clear() { this.map.clear() }
  toObject() { return this.map.toJS() }
}

export class JsonStore {
  constructor(path, type) {
    ensureExistsSync(path)
    this.file = `${path}/${type}.json`
    this.cache = this.exists ?
      new InMemoryStore(JSON.parse(readFileSync(this.file, 'utf8'))) :
      new InMemoryStore()
  }
  get(key, defaults) { return this.cache.get(key.toString(), defaults) }
  set(key, value) { this.cache.set(key.toString(), value); this.save() }
  update(key, value) { this.cache.update(key.toString(), value); this.save() }
  delete(key) { this.cache.delete(key.toString()); this.save() }
  has(key) { return this.cache.has(key.toString()) }
  entries() { return this.cache.entries() }
  keys() { return this.cache.keys() }
  values() { return this.cache.values() }
  clear() { this.cache.clear(); this.save() }
  toObject() { return this.cache.toObject() }
  save() { writeFileSync(this.file, JSON.stringify(this.toObject(), null, 2)) }
  get exists() { return existsSync(this.file) }
}

export class JsonDirStore {
  constructor(path, type) {
    this.path = `${path}/${type}`
    ensureExistsSync(this.path)
  }
  fileOf(key) { return `${this.path}/${key}.json` }
  get(key, defaults) { return existsSync(this.fileOf(key)) ? JSON.parse(readFileSync(this.fileOf(key), 'utf8')) : defaults }
  set(key, value) { writeFileSync(this.fileOf(key), JSON.stringify(value, null, 2)) }
  update(key, value) { this.set(key, merge(this.get(key, {}), value)) }
  delete(key) { rmSync(this.fileOf(key), {force: true}) }
  has(key) { return !!this.get(key) }
  entries() { return this.keys().map(_ => [_, this.get(_)]) }
  keys() { return readdirSync(this.path).filter(_ => extname(_) === '.json').map(_ => basename(_, '.json')) }
  values() { return this.keys().map(_ => this.get(_)) }
  clear() { this.keys().forEach(_ => this.delete(_)) }
  toObject() { return Map(this.entries()).toJS() }
}

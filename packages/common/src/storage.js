import {Map} from 'immutable'
import {merge} from 'lodash-es'
import {existsSync, readdirSync, readFileSync, rmSync, writeFileSync} from 'node:fs'
import {basename, extname} from 'node:path'
import {ensureExistsSync} from './files.js'

/** in-memory key/value store **/
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

/** file-based key/value store **/
export class FileStore {
  constructor(path, type, extension, deserializer, serializer) {
    ensureExistsSync(path)
    this.extension = extension
    this.deserializer = deserializer
    this.serializer = serializer
    this.file = `${path}/${type}${this.extension}`
    this.cache = this.exists ?
      new InMemoryStore(this.deserializer(readFileSync(this.file, 'utf8'))) :
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
  save() { writeFileSync(this.file, this.serializer(this.toObject(), null, 2)) }
  get exists() { return existsSync(this.file) }
}

export class JsonStore extends FileStore {
  constructor(path, type) {
    super(path, type, '.json', JSON.parse, JSON.stringify)
  }
}

/** key/value store where key = filename (without extension) and value = whole file contents **/
export class DirStore {
  constructor(path, type, extension, deserializer, serializer) {
    this.path = `${path}/${type}`
    ensureExistsSync(this.path)
    this.extension = extension
    this.deserializer = deserializer
    this.serializer = serializer
  }
  fileOf(key) { return `${this.path}/${key}${this.extension}` }
  get(key, defaults) { return existsSync(this.fileOf(key)) ? this.deserializer(readFileSync(this.fileOf(key), 'utf8')) : defaults }
  set(key, value) { writeFileSync(this.fileOf(key), this.serializer(value, null, 2)) }
  update(key, value) { this.set(key, merge(this.get(key, {}), value)) }
  delete(key) { rmSync(this.fileOf(key), {force: true}) }
  has(key) { return !!this.get(key) }
  entries() { return this.keys().map(_ => [_, this.get(_)]) }
  keys() { return readdirSync(this.path).filter(_ => extname(_) === this.extension).map(_ => basename(_, this.extension)) }
  values() { return this.keys().map(_ => this.get(_)) }
  clear() { this.keys().forEach(_ => this.delete(_)) }
  toObject() { return Map(this.entries()).toJS() }
}

export class JsonDirStore extends DirStore {
  constructor(path, type) {
    super(path, type, '.json', JSON.parse, JSON.stringify)
  }
}

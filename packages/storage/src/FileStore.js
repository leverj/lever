import {ensureExistsSync} from '@leverj/lever.common/files'
import {existsSync, readFileSync, writeFileSync} from 'node:fs'
import {InMemoryStore} from './InMemoryStore.js'
import {InMemoryCompoundKeyStore} from './InMemoryCompoundKeyStore.js'

/** file-based key/value store **/
export class FileStore {
  constructor(path, type, extension, deserializer, serializer, useCompoundKey) {
    ensureExistsSync(path)
    this.deserializer = deserializer
    this.serializer = serializer
    this.file = `${path}/${type}${extension}`
    this.useCompoundKey = useCompoundKey
    const StoreClass = useCompoundKey ? InMemoryCompoundKeyStore : InMemoryStore
    this.cache = existsSync(this.file) ?
      new StoreClass(this.deserializer(readFileSync(this.file, 'utf8'))) :
      new StoreClass()
  }

  save() { writeFileSync(this.file, this.serializer(this.toObject(), null, 2)) }
  clear() { this.cache.clear(); this.save() }
  toObject() { return this.cache.toObject() }
  toKey(key) { return this.useCompoundKey ? key : key.toString() } //fixme:values: check if array?

  /*** API ***/
  get(key) { return this.cache.get(this.toKey(key)) }
  set(key, value) { this.cache.set(this.toKey(key), value); this.save() }
  update(key, value) { this.cache.update(this.toKey(key), value); this.save() }
  delete(key) { this.cache.delete(this.toKey(key)); this.save() }
  has(key) { return this.cache.has(this.toKey(key)) }
  find(keyable) { return this.cache.find(keyable) }
  size() { return this.cache.size() }
  keys() { return this.cache.keys() }
  values() { return this.cache.values() }
  entries() { return this.cache.entries() }
}

export class JsonFileStore extends FileStore {
  constructor(path, type, useCompoundKey = false) {
    super(path, type, '.json', JSON.parse, JSON.stringify, useCompoundKey)
  }
}

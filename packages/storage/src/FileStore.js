import {ensureExistsSync} from '@leverj/lever.common/files'
import {existsSync, readFileSync, writeFileSync} from 'node:fs'
import {InMemoryStore} from './InMemoryStore.js'
import {InMemoryCompoundKeyStore} from './InMemoryCompoundKeyStore.js'
import {CachedStore} from './CachedStore.js'

/** file-based key/value store **/
export class FileStore extends CachedStore {
  constructor(path, type, extension, deserializer, serializer, useCompoundKey) {
    ensureExistsSync(path)
    const file = `${path}/${type}${extension}`
    const StoreClass = useCompoundKey ? InMemoryCompoundKeyStore : InMemoryStore
    const cache = existsSync(file) ? new StoreClass(deserializer(readFileSync(file, 'utf8'))) : new StoreClass()
    super(cache)
    this.deserializer = deserializer
    this.serializer = serializer
    this.file = file
    this.useCompoundKey = useCompoundKey
  }

  save() { writeFileSync(this.file, this.serializer(this.toObject(), null, 2)) }
  normalize(key) { return this.useCompoundKey ? key : key.toString() } //fixme:values: check if array?

  /*** API ***/
  get(key) { return super.get(this.normalize(key)) }
  set(key, value) { super.set(this.normalize(key), value); this.save() }
  update(key, value) { super.update(this.normalize(key), value); this.save() }
  delete(key) { super.delete(this.normalize(key)); this.save() }
  has(key) { return super.has(this.normalize(key)) }
  clear() { super.clear(); this.save() }
}

export class JsonFileStore extends FileStore {
  constructor(path, type, useCompoundKey = false) {
    super(path, type, '.json', JSON.parse, JSON.stringify, useCompoundKey)
  }
}

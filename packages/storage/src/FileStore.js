import {ensureExistsSync} from '@leverj/lever.common/files'
import {existsSync, readFileSync, writeFileSync} from 'node:fs'
import Watcher from 'watcher'
import {InMemoryStore} from './InMemoryStore.js'
import {InMemoryCompoundKeyStore} from './InMemoryCompoundKeyStore.js'
import {CachedStore} from './CachedStore.js'

/** file-based key/value store with write-through cache **/
export class FileStore extends CachedStore {
  constructor(path, type, extension, deserializer, serializer, useCompoundKey) {
    ensureExistsSync(path)
    super(useCompoundKey ? new InMemoryCompoundKeyStore() : new InMemoryStore())
    this.deserializer = deserializer
    this.serializer = serializer
    this.file = `${path}/${type}${extension}`
    this.useCompoundKey = useCompoundKey
    this.reload()
    this.watcher = new Watcher(this.file).
      on('change', _ => this.reload()). //fixme: does not seem to matter
      on('add', _ => this.reload())
  }

  save() { writeFileSync(this.file, this.serializer(this.toObject(), null, 2)) }
  reload() {
    const StoreClass = this.useCompoundKey ? InMemoryCompoundKeyStore : InMemoryStore
    this.cache = new StoreClass(existsSync(this.file) ? this.deserializer(readFileSync(this.file, 'utf8')) : {})
  }
  normalize(key) { return this.useCompoundKey ? key : key.toString() } //fixme:values: check if array?

  /*** API ***/
  get(key) { return super.get(this.normalize(key)) }
  set(key, value) { super.set(this.normalize(key), value); this.save() }
  update(key, value) { super.update(this.normalize(key), value); this.save() }
  delete(key) { super.delete(this.normalize(key)); this.save() }
  has(key) { return super.has(this.normalize(key)) }
  clear() { super.clear(); this.save() }
  close() { return this.watcher.close() }
}

export class JsonFileStore extends FileStore {
  constructor(path, type, useCompoundKey = false) {
    super(path, type, '.json', JSON.parse, JSON.stringify, useCompoundKey)
  }
}

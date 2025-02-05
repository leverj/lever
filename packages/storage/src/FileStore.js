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
    this.file = `${path}/${type}${extension}`
    this.deserializer = deserializer
    this.serializer = serializer
    this.useCompoundKey = useCompoundKey
    this.reload()
    this.watcher = new Watcher(this.file).
      on('change', _ => this.reload()). //fixme: does not seem to matter
      on('add', _ => this.reload())
  }

  reload() {
    const StoreClass = this.useCompoundKey ? InMemoryCompoundKeyStore : InMemoryStore
    this.cache = new StoreClass(existsSync(this.file) ? this.deserializer(readFileSync(this.file, 'utf8')) : {})
  }
  save() { writeFileSync(this.file, this.serializer(this.toObject())) }
  normalize(key) { return Array.isArray(key) ? key.map(_ => _.toString()) : key.toString() }
  // normalize(key) { return this.useCompoundKey ? key : key.toString() } //fixme:values: check if array?

  /*** API ***/
  delete(key) { super.delete(key); this.save() }
  close() { return this.watcher.close() }
}

export class JsonFileStore extends FileStore {
  constructor(path, type, useCompoundKey = false) {
    super(path, type, '.json', JSON.parse, _ => JSON.stringify(_, null, 2), useCompoundKey)
  }
}

import {ensureExistsSync} from '@leverj/lever.common/files'
import {existsSync, readFileSync, writeFileSync} from 'node:fs'
import {InMemoryStore} from './InMemoryStore.js'
import {InMemoryCompoundKeyStore} from './InMemoryCompoundKeyStore.js'
import {CachedStore} from './CachedStore.js'

/** file-based key/value store with write-through cache **/
export class FileStore extends CachedStore {
  constructor(path, type, extension, deserializer, serializer, useCompoundKey) {
    ensureExistsSync(path)
    const file = `${path}/${type}${extension}`
    const prior = existsSync(file) ? deserializer(readFileSync(file, 'utf8')) : {}
    super(new (useCompoundKey ? InMemoryCompoundKeyStore : InMemoryStore)(prior))
    this.file = `${path}/${type}${extension}`
    this.deserializer = deserializer
    this.serializer = serializer
  }

  save() { writeFileSync(this.file, this.serializer(this.toObject())) }
  normalize(key) { return Array.isArray(key) ? key.map(_ => _.toString()) : key.toString() }

  /*** API ***/
  delete(key) { super.delete(key); this.save() }
}

export class JsonFileStore extends FileStore {
  constructor(path, type, useCompoundKey = false) {
    super(path, type, '.json', JSON.parse, _ => JSON.stringify(_, null, 2), useCompoundKey)
  }
}

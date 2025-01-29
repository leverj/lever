import {ensureExistsSync} from '@leverj/lever.common/files'
import {existsSync, readFileSync, writeFileSync} from 'node:fs'
import {InMemoryStore} from './InMemoryStore.js'

/** file-based key/value store **/
export class FileStore {
  constructor(path, type, extension, deserializer, serializer) {
    ensureExistsSync(path)
    this.deserializer = deserializer
    this.serializer = serializer
    this.file = `${path}/${type}${extension}`
    this.cache = existsSync(this.file) ?
      new InMemoryStore(this.deserializer(readFileSync(this.file, 'utf8'))) :
      new InMemoryStore()
  }

  save() { writeFileSync(this.file, this.serializer(this.toObject(), null, 2)) }
  clear() { this.cache.clear(); this.save() }
  toObject() { return this.cache.toObject() }

  /*** API ***/
  get(key) { return this.cache.get(key) }
  set(key, value) { this.cache.set(key, value); this.save() }
  update(key, value) { this.cache.update(key, value); this.save() }
  delete(key) { this.cache.delete(key); this.save() }
  has(key) { return this.cache.has(key) }
  find(keyable) { return this.cache.find(keyable) }
  size() { return this.cache.size() }
  keys() { return this.cache.keys() }
  values() { return this.cache.values() }
  entries() { return this.cache.entries() }
}

export class JsonStore extends FileStore {
  constructor(path, type) {
    super(path, type, '.json', JSON.parse, JSON.stringify)
  }
}

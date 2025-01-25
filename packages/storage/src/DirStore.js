import {ensureExistsSync} from '@leverj/lever.common/files'
import {readdirSync, readFileSync, rmSync, writeFileSync} from 'node:fs'
import {basename, extname} from 'node:path'
import {InMemoryStore} from './InMemoryStore.js'

const keySeparator = '-'
const toKey = _ => Array.isArray(_) ? _.join(keySeparator) : _

/** key/value store where key = filename (without extension) and value = whole file contents **/
export class DirStore {
  constructor(path, extension, deserializer, serializer) {
    this.path = path
    this.extension = extension
    this.deserializer = deserializer
    this.serializer = serializer
    this.cache = new InMemoryStore()
    ensureExistsSync(path)
    readdirSync(path).filter(_ => extname(_) === extension).forEach(filename => {
      const key = basename(filename, extension)
      const value = this.deserializer(readFileSync(filename, 'utf8'))
      this.cache.set(key, value)
    })
  }
  fileOf(key) { return `${this.path}/${toKey(key)}${this.extension}` }
  save(key, value) { writeFileSync(this.fileOf(key), this.serializer(value, null, 2)) }
  clear() { this.keys().forEach(_ => this.delete(_)) }
  toObject() { return this.cache.toObject() }

  get(key) { return this.cache.get(key) }
  set(key, value) { this.cache.set(key, value); this.save(key, value) }
  update(key, value) { this.cache.update(key, value); this.save(key, value) }
  delete(key) { this.cache.delete(key); rmSync(this.fileOf(key), {force: true}) }
  has(key) { return this.cache.has(key) }
  find(keyable) { return this.cache.find(keyable) }
  size() { return this.cache.size() }
  keys() { return this.cache.keys() }
  values() { return this.cache.values() }
  entries() { return this.cache.entries() }
}

export class JsonDirStore extends DirStore {
  constructor(path) {
    super(path, '.json', JSON.parse, JSON.stringify)
  }
}

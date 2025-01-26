import {ensureExistsSync} from '@leverj/lever.common/files'
import {Map} from 'immutable'
import {merge} from 'lodash-es'
import {existsSync, readdirSync, readFileSync, rmSync, writeFileSync} from 'node:fs'
import {basename, extname} from 'node:path'

const keySeparator = '-'
const toKey = _ => Array.isArray(_) ? _.join(keySeparator) : _

/** key/value store where key = filename (without extension) and value = whole file contents **/
export class DirStore {
  constructor(path, extension, deserializer, serializer) {
    this.path = path
    this.extension = extension
    this.deserializer = deserializer
    this.serializer = serializer
    ensureExistsSync(this.path)
  }

  fileOf(key) { return `${this.path}/${toKey(key)}${this.extension}` }
  save(key, value) { writeFileSync(this.fileOf(key), this.serializer(value, null, 2)) }
  clear() { this.keys().forEach(_ => this.delete(_)) }
  toObject() { return Map(this.entries()).toJS() }

  /*** API ***/
  get(key) { return existsSync(this.fileOf(key)) ? this.deserializer(readFileSync(this.fileOf(key), 'utf8')) : undefined }
  set(key, value) { this.save(key, value) }
  update(key, value) { this.set(key, merge(this.get(key) || {}, value)) }
  delete(key) { rmSync(this.fileOf(key), {force: true}) }
  has(key) { return !!this.get(key) }
  find(keyable) {
    const prefix = toKey(keyable)
    return this.keys().filter(_ => _.startsWith(prefix)).map(_ => this.get(_))
  }
  size() { return this.keys().length }
  keys() { return readdirSync(this.path).filter(_ => extname(_) === this.extension).map(_ => basename(_, this.extension)) }
  values() { return this.keys().map(_ => this.get(_)) }
  entries() { return this.keys().map(_ => [_, this.get(_)]) }
  close() {  }
}

export class JsonDirStore extends DirStore {
  constructor(path) {
    super(path, '.json', JSON.parse, JSON.stringify)
  }
}

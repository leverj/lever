import {ensureExistsSync} from '@leverj/lever.common/files'
import {Map} from 'immutable'
import {merge} from 'lodash-es'
import {existsSync, readdirSync, readFileSync, rmSync, writeFileSync} from 'node:fs'
import {basename, extname} from 'node:path'
import {Store} from './Store.js'

/** key/value store where key = filename (without extension) and value = whole file contents **/
/*** deprecated: replaced by DirStore ***/
export class DirStore_WithoutChangeDetection extends Store {
  constructor(path, extension, deserializer, serializer) {
    ensureExistsSync(path)
    super()
    this.path = path
    this.extension = extension
    this.deserializer = deserializer
    this.serializer = serializer
  }

  fileOf(key) { return `${this.path}/${this.normalize(key)}${this.extension}` }
  normalize(key) { return Array.isArray(key) ? key.join(keySeparator) : key.toString() }

  /*** API ***/
  get(key) { return existsSync(this.fileOf(key)) ? this.deserializer(readFileSync(this.fileOf(key), 'utf8')) : undefined }
  set(key, value) { writeFileSync(this.fileOf(key), this.serializer(value)) }
  update(key, value) { this.set(key, merge(this.get(key) || {}, value)) }
  delete(key) { rmSync(this.fileOf(key), {force: true}) }
  find(keyable) {
    const prefix = this.normalize(keyable)
    return this.keys().filter(_ => _.startsWith(prefix)).map(_ => this.get(_))
  }
  keys() { return readdirSync(this.path).filter(_ => extname(_) === this.extension).map(_ => basename(_, this.extension)) }
  values() { return this.keys().map(_ => this.get(_)) }
  entries() { return this.keys().map(_ => [_, this.get(_)]) }
  toObject() { return Map(this.entries()).toJS() }
}

const keySeparator = '-'

/*** deprecated: replaced by JsonDirStore ***/
export class JsonDirStore_WithoutChangeDetection extends DirStore_WithoutChangeDetection {
  constructor(path) {
    super(path, '.json', JSON.parse,  _ => JSON.stringify(_, null, 2))
  }
}

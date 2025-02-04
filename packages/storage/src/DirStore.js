import {ensureExistsSync} from '@leverj/lever.common/files'
import {Map} from 'immutable'
import {merge} from 'lodash-es'
import {existsSync, readdirSync, readFileSync, rmSync, writeFileSync} from 'node:fs'
import {basename, extname} from 'node:path'
import {Store} from './Store.js'

/** key/value store where key = filename (without extension) and value = whole file contents **/
export class DirStore extends Store {
  constructor(path, extension, deserializer, serializer) {
    ensureExistsSync(path)
    super()
    this.path = path
    this.extension = extension
    this.deserializer = deserializer
    this.serializer = serializer
  }

  fileOf(key) { return `${this.path}/${normalize(key)}${this.extension}` }

  /*** API ***/
  get(key) { return existsSync(this.fileOf(key)) ? this.deserializer(readFileSync(this.fileOf(key), 'utf8')) : undefined }
  set(key, value) { writeFileSync(this.fileOf(key), this.serializer(value, null, 2)) }
  update(key, value) { this.set(key, merge(this.get(key) || {}, value)) }
  delete(key) { rmSync(this.fileOf(key), {force: true}) }
  find(keyable) {
    const prefix = normalize(keyable)
    return this.keys().filter(_ => _.startsWith(prefix)).map(_ => this.get(_))
  }
  keys() { return readdirSync(this.path).filter(_ => extname(_) === this.extension).map(_ => basename(_, this.extension)) }
  values() { return this.keys().map(_ => this.get(_)) }
  entries() { return this.keys().map(_ => [_, this.get(_)]) }
  toObject() { return Map(this.entries()).toJS() }
}

const keySeparator = '-'
const normalize = _ => Array.isArray(_) ? _.join(keySeparator) : _

export class JsonDirStore extends DirStore {
  constructor(path) {
    super(path, '.json', JSON.parse, JSON.stringify)
  }
}

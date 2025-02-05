import {ensureExistsSync} from '@leverj/lever.common/files'
import {readdirSync, readFileSync, rmSync, writeFileSync} from 'node:fs'
import {basename, extname} from 'node:path'
import Watcher from 'watcher'
import {CachedStore} from './CachedStore.js'
import {InMemoryStore} from './InMemoryStore.js'

/** key/value store where key = filename (without extension) and value = whole file contents **/
export class DirStore extends CachedStore {
  constructor(path, extension, deserializer, serializer) {
    ensureExistsSync(path)
    super(new InMemoryStore())
    this.path = path
    this.extension = extension
    this.deserializer = deserializer
    this.serializer = serializer
    readdirSync(path).map(_ => `${path}/${_}`).forEach(_ => this.reload(_))
    this.watcher = new Watcher(path, (event, file) => {
      if (event === 'add' || event === 'change') this.reload(file)
    })
  }

  reload(file) {
    // console.log('>'.repeat(50), file)
    if (extname(file) === this.extension) {
      const key = basename(file, this.extension)
      const value = this.deserializer(readFileSync(file, 'utf8'))
      this.cache.set(key, value)
    }
  }
  fileOf(key) { return `${this.path}/${this.normalize(key)}${this.extension}` }
  save(key, value) { writeFileSync(this.fileOf(key), this.serializer(value, null, 2)) }
  normalize(key) { return Array.isArray(key) ? key.join(keySeparator) : key.toString() }

  /*** API ***/
  delete(key) { super.delete(key); rmSync(this.fileOf(key), {force: true}) }
  close() { return this.watcher.close() }
}

const keySeparator = '-'

export class JsonDirStore extends DirStore {
  constructor(path) {
    super(path, '.json', JSON.parse, JSON.stringify)
  }
}

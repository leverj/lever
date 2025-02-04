import {ensureExistsSync} from '@leverj/lever.common/files'
import {readdirSync, readFileSync, rmSync, writeFileSync} from 'node:fs'
import {basename, extname} from 'node:path'
import Watcher from 'watcher'
import {InMemoryCompoundKeyStore} from './InMemoryCompoundKeyStore.js'
import {CachedStore} from './CachedStore.js'

/** key/value store where key = filename (without extension) and value = whole file contents **/
//fixme: not working, as modified detection (on 'change') for files in directory is not working
export class DirStore extends CachedStore {
  constructor(path, extension, deserializer, serializer) {
    ensureExistsSync(path)
    super(new InMemoryCompoundKeyStore())
    this.path = path
    this.extension = extension
    this.deserializer = deserializer
    this.serializer = serializer
    this.initializeCache(readdirSync(path))
    this.watcher = new Watcher(path, (event, file) => {
      if (event === 'add' || event === 'change') this.load(file)
    })
  }

  initializeCache(files) { files.forEach(_ => this.load(_)) }
  load(file) {
    if (extname(file) === this.extension) {
      const key = basename(file, this.extension)
      const value = this.deserializer(readFileSync(file, 'utf8'))
      this.cache.set(key, value)
    }
  }
  fileOf(key) { return `${this.path}/${toKey(key)}${this.extension}` }
  save(key, value) { writeFileSync(this.fileOf(key), this.serializer(value, null, 2)) }

  /*** API ***/
  set(key, value) { super.set(key, value); this.save(key, value) }
  update(key, value) { super.update(key, value); this.save(key, value) }
  delete(key) { super.delete(key); rmSync(this.fileOf(key), {force: true}) }
  close() { return this.watcher.close() }
}

const keySeparator = '-'
const toKey = _ => Array.isArray(_) ? _.join(keySeparator) : _

export class JsonDirStore extends DirStore {
  constructor(path) {
    super(path, '.json', JSON.parse, JSON.stringify)
  }
}

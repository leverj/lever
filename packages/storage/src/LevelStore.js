import {Level} from 'level'
import {merge} from 'lodash-es'
import {Map} from 'immutable'
import {Store} from './Store.js'
import waitFor from 'p-wait-for'

export class LevelStore extends Store {
  constructor(path, type) {
    super()
    this.db = new Level(`${path}/${type}`, {valueEncoding: 'json'})
  }

  /*** API ***/
  get(key) { return this.db.getSync(normalize(key)) }
  async set(key, value) { return this.db.put(normalize(key), value) }
  async update(key, value) { return this.set(key, merge(this.get(key, value), value)) }
  async delete(key) { return this.db.del(normalize(key)) }
  has(key) { return !!this.get(key) }
  async find(keyable) {
    const results = []
    const prefix = normalize(keyable)
    for await (const [key, value] of this.db.iterator({gte: prefix, lt: `${prefix}\xff`})) results.push(value)
    return results
  }
  async size() { return this.db.keys().all().then(_ => _.length) }
  async keys() { return this.db.keys().all() }
  async values() { return this.db.values().all() }
  async entries() { return this.db.iterator().all() }
  async toObject() { return Map(await this.db.iterator().all()).toJS() }
  async clear() { return this.db.clear() }
  async open() { await this.db.open().then(_ => waitFor(() => this.db.status === 'open')) }
  async close() { return this.db.close() }
}

const normalize = (key) => Array.isArray(key) ? key.join('::') : key

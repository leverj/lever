import {Level} from 'level'
import {merge} from 'lodash-es'
import {Map} from 'immutable'

const keySeparator = '::'
const toKey = _ => Array.isArray(_) ? _.join(keySeparator) : _

export class LevelStore {
  constructor(path, type) {
    this.db = new Level(`${path}/${type}`, {valueEncoding: 'json'})
  }

  async open(options = {passive: true}) { return this.db.open(options) }
  async clear() { return this.db.clear() }
  async toObject() { return Map(await this.db.iterator().all()).toJS() }

  /*** API ***/
  async get(key) { return this.db.get(toKey(key)) }
  async set(key, value) { return this.db.put(toKey(key), value) }
  async update(key, value) { return this.set(key, merge(await this.get(key, value), value)) }
  async delete(key) { return this.db.del(toKey(key)) }
  async has(key) { return this.get(toKey(key)).then(_ => !!_) }
  async find(keyable) {
    const results = []
    const prefix = toKey(keyable)
    for await (const [key, value] of this.db.iterator({gte: prefix, lt: `${prefix}\xff`})) results.push(value)
    return results
  }
  async size() { return this.db.keys().all().then(_ => _.length) }
  async keys() { return this.db.keys().all() }
  async values() { return this.db.values().all() }
  async entries() { return this.db.iterator().all() }
  async close() { return this.db.close() }
}

import {Map} from 'immutable'
import {merge} from 'lodash-es'
import {Store} from './Store.js'

export class SQLiteStore extends Store {
  constructor(db, type) {
    super()
    db.exec(`CREATE TABLE IF NOT EXISTS ${type} (key TEXT PRIMARY KEY, value TEXT NOT NULL);`)
    this.queries = {
      get: db.prepare(`SELECT value FROM ${type} WHERE key = ?`),
      set: db.prepare(`INSERT INTO ${type} (key, value) VALUES (?, ?)`),
      update: db.prepare(`UPDATE ${type} SET value = ? WHERE key = ?`),
      delete: db.prepare(`DELETE from ${type} WHERE key = ?`),
      find: db.prepare(`SELECT value FROM ${type} WHERE key LIKE CONCAT(?,'%')`),
      size: db.prepare(`SELECT COUNT(DISTINCT key) AS size FROM ${type}`),
      keys: db.prepare(`SELECT key FROM ${type}`),
      values: db.prepare(`SELECT value FROM ${type}`),
      entries: db.prepare(`SELECT * FROM ${type}`),
      clear: db.prepare(`DELETE FROM ${type}`),
    }
  }

  /*** API ***/
  get(key) {
    const found = this.queries.get.get(normalize(key))
    return found ? deserialize(found.value) : undefined
  }
  set(key, value) { this.queries.set.run(normalize(key), serialize(value)) }
  update(key, value) {
    const original = this.get(key) ?? {}
    const updated = serialize(merge(original, value))
    this.queries.update.run(updated, key)
  }
  delete(key) { this.queries.delete.run(normalize(key)) }
  has(key) { return !!this.get(key) }
  find(keyable) { return this.queries.find.all(normalize(keyable)).map(_ => deserialize(_.value)) }
  size() { return this.queries.size.get().size }
  keys() { return this.queries.keys.all().map(_ => _.key) }
  values() { return this.queries.values.all().map(_ => deserialize(_.value)) }
  entries() { return this.queries.entries.all().map(_ => [_.key, deserialize(_.value)]) }
  toObject() { return Map(this.entries()).toJS() }
  clear() { this.queries.clear.run() }
}


const normalize = (key) => (Array.isArray(key) ? key : [key]).join('::')
const deserialize = JSON.parse, serialize = _ => JSON.stringify(_, null, 2)


import {Map} from 'immutable'
import {merge} from 'lodash-es'
import {Store} from './Store.js'

/** in-memory simple-key/value store **/
export class InMemoryStore extends Store {
  constructor(prior = {}) {
    super()
    this.map = Map(prior).asMutable()
  }

  /*** API ***/
  get(key) { return this.map.get(key) }
  set(key, value) { this.map.set(key, value) }
  update(key, value) { this.set(key, merge(this.get(key, {}), value)) }
  delete(key) { this.map.delete(key) }
  has(key) { return this.map.has(key) }
  find(keyable) { return this.map.filter((value, key) => key.toString().startsWith(keyable.toString())).valueSeq().toArray() }
  size() { return this.map.size }
  keys() { return this.map.keySeq().toArray() }
  values() { return this.map.valueSeq().toArray() }
  entries() { return this.map.entrySeq().toArray() }
  toObject() { return this.map.toJS() }
  clear() { this.map.clear() }
}

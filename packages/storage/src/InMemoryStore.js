import {Map} from 'immutable'
import {first, last, merge} from 'lodash-es'

/** in-memory key/value store **/
export class InMemoryStore {
  constructor(prior = {}) { this.map = Map(prior).asMutable() }
  clear() { this.map.clear() }
  toObject() { return this.map.toJS() }

  get(key) { return Array.isArray(key) ? this.map.getIn(key) : this.map.get(key) }
  set(key, value) { Array.isArray(key) ? this.map.setIn(key, value) : this.map.set(key, value) }
  update(key, value) { this.set(key, merge(this.get(key, {}), value)) }
  delete(key) { Array.isArray(key) ? this.map.deleteIn(key) : this.map.delete(key) }
  has(key) { return Array.isArray(key) ? this.map.hasIn(key) : this.map.has(key) }
  find(keyable) { return findStartsWithInMap(keyable, this.map) }
  size() { return this.map.size }
  keys() { return this.map.keySeq().toArray() }
  values() { return this.map.valueSeq().toArray() }
  entries() { return this.map.entrySeq().toArray() }
}

const findStartsWithInMap = (keyable, map) => !Array.isArray(keyable) ?
  map.filter((value, key) => key.startsWith(keyable)).valueSeq().flatten().toArray() :
  keyable.length === 1 ?
    findStartsWithInMap(first(keyable), map) :
    findStartsWithInMap(last(keyable), map.getIn(keyable.slice(0, -1)) || Map())

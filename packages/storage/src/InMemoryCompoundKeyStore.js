import {Map, fromJS} from 'immutable'
import {first, last, merge} from 'lodash-es'

/** in-memory compound-key/value store **/
export class InMemoryCompoundKeyStore {
  constructor(prior = {}) {
    this.map = fromJS(prior).asMutable()
  }

  clear() { this.map.clear() }
  toObject() { return this.map.toJS() }

  /*** API ***/
  get(key) { return Array.isArray(key) ? this.map.getIn(key) : this.map.get(key) }
  set(key, value) { Array.isArray(key) ? this.map.setIn(key, value) : this.map.set(key, value) }
  update(key, value) { this.set(key, merge(this.get(key, {}), value)) }
  delete(key) { Array.isArray(key) ? this.map.deleteIn(key) : this.map.delete(key) }
  has(key) { return Array.isArray(key) ? this.map.hasIn(key) : this.map.has(key) }
  find(keyable) { return findStartsWithInMap(keyable, this.map) }
  size() { return this.keys().length }
  keys() { return flattenKeys(this.map) }
  values() { return flattenValues(this.map) }
  entries() { return this.map.entrySeq().toArray() }
}

const findStartsWithInMap = (keyable, map) => !Array.isArray(keyable) ?
  map.filter((value, key) => key.toString().startsWith(keyable.toString())).valueSeq().flatten().toArray() :
  keyable.length === 1 ?
    findStartsWithInMap(first(keyable), map) :
    findStartsWithInMap(last(keyable), map.getIn(keyable.slice(0, -1)) || Map())

const flattenKeys = (map, currentPath = []) => map.reduce((results, value, key) => {
  const newPath = [...currentPath, key]
  return results.concat(Map.isMap(value) ? flattenKeys(value, newPath) : [newPath])
}, [])

const flattenValues = (map) => map.reduce((results, value) =>
  results.concat(Map.isMap(value) ? flattenValues(value) : value), []
)

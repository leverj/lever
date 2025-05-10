import {Map} from 'immutable'
import {first, last, merge} from 'lodash-es'
import {Store} from './Store.js'

/** in-memory compound-key/value store **/
export class InMemoryCompoundKeyStore extends Store {
  constructor(prior = {}) {
    super()
    this.map = Map(prior).asMutable()
  }

  normalize(key) { return Array.isArray(key) ? key : [key] }

  /*** API ***/
  get(key) { return this.map.getIn(this.normalize(key)) }
  set(key, value) { this.map.setIn(this.normalize(key), value) }
  update(key, value) { this.set(key, merge(this.get(key, {}), value)) }
  delete(key) { this.map.deleteIn(this.normalize(key)) }
  has(key) { return this.map.hasIn(this.normalize(key)) }
  find(keyable) { return findStartsWithInMap(keyable, this.map) }
  keys() { return flattenKeys(this.map) }
  values() { return flattenValues(this.map) }
  entries() { return flattenEntries(this.map) }
  toObject() { return this.map.toJS() }
  clear() { this.map.clear() }
}

const findStartsWithInMap = (keyable, map) => !Array.isArray(keyable) ?
  map.filter((value, key) => key.toString().startsWith(keyable.toString())).valueSeq().flatten().toArray() :
  keyable.length === 1 ?
    findStartsWithInMap(first(keyable), map) :
    findStartsWithInMap(last(keyable), map.getIn(keyable.slice(0, -1)) ?? Map())

const flattenKeys = (map, currentPath = []) => map.reduce((results, value, key) => {
  const newPath = [...currentPath, key]
  return results.concat(Map.isMap(value) ? flattenKeys(value, newPath) : [newPath])
}, [])

const flattenValues = (map) => map.reduce((results, value) =>
  results.concat(Map.isMap(value) ? flattenValues(value) : value), []
)

const flattenEntries = (map, currentPath = []) => map.reduce((results, value, key) => {
  const newPath = [...currentPath, key]
  return results.concat(Map.isMap(value) ? flattenEntries(value, newPath) : [[newPath, value]])
}, [])

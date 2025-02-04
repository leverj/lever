import {Store} from './Store.js'

export class CachedStore extends Store {
  constructor(cache) {
    super()
    this.cache = cache
    //note: subclasses need to initialize the cache during construction
  }

  /*** API ***/
  get(key) { return this.cache.get(key) }
  set(key, value) { this.cache.set(key, value) }
  update(key, value) { this.cache.update(key, value) }
  delete(key) { this.cache.delete(key) }
  has(key) { return this.cache.has(key) }
  find(keyable) { return this.cache.find(keyable) }
  size() { return this.cache.size() }
  keys() { return this.cache.keys() }
  values() { return this.cache.values() }
  entries() { return this.cache.entries() }
  toObject() { return this.cache.toObject() }
}

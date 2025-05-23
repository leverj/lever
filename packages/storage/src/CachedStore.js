import {Store} from './Store.js'

export class CachedStore extends Store {
  constructor(cache) {
    super()
    this.cache = cache
    /* note: subclasses need to initialize the cache during construction */
  }

    /*** API ***/
  get(key) { return this.cache.get(this.normalize(key)) }
  set(key, value) { this.cache.set(this.normalize(key), value); this.save(key, value) }
  update(key, value) { this.cache.update(this.normalize(key), value); this.save(key, value) }
  delete(key) { this.cache.delete(this.normalize(key)) }
  has(key) { return this.cache.has(this.normalize(key)) }
  find(keyable) { return this.cache.find(this.normalize(keyable)) }
  size() { return this.cache.size() }
  keys() { return this.cache.keys() }
  values() { return this.cache.values() }
  entries() { return this.cache.entries() }
  toObject() { return this.cache.toObject() }
  clear() { super.clear(); this.save() }
}

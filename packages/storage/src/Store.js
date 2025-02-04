/** abstract API **/
export class Store {
  get(key) {  throw MustImplement()  }
  set(key, value) {  throw MustImplement()  }
  update(key, value) { throw MustImplement() }
  delete(key) { throw MustImplement() }
  has(key) { return !!this.get(key) }
  find(keyable) { throw MustImplement() }
  size() { return this.keys().length }
  keys() { throw MustImplement() }
  values() { throw MustImplement() }
  entries() { throw MustImplement() }
  toObject() { throw MustImplement() }
  clear() { this.keys().forEach(_ => this.delete(_)) }
  open() {/* do nothing */}
  close() {/* do nothing */}
}

const MustImplement = () => Error('subclasses must implement')

export * from './DirStore.js'
export * from './DirStore_WithoutChangeDetection.js'
export * from './FileStore.js'
export * from './InMemoryStore.js'
export * from './InMemoryCompoundKeyStore.js'
export * from './LevelStore.js'

import {DirStore, JsonDirStore} from './DirStore.js'
import {FileStore, JsonFileStore} from './FileStore.js'
import {InMemoryStore} from './InMemoryStore.js'
import {InMemoryCompoundKeyStore} from './InMemoryCompoundKeyStore.js'
import {LevelStore} from './LevelStore.js'

export const Store = {
  Dir: (path, extension, deserializer, serializer) => new DirStore(path, extension, deserializer, serializer),
  JsonDir: (path) => new JsonDirStore(path),
  File: (path, type, extension, deserializer, serializer, useCompoundKey) => new FileStore(path, type, extension, deserializer, serializer, useCompoundKey),
  JsonFile: (path, type, useCompoundKey) => new JsonFileStore(path, type, useCompoundKey),
  InMemory: (prior) => new InMemoryStore(prior),
  InMemoryCompoundKey: (prior) => new InMemoryCompoundKeyStore(prior),
  Level: (path, type) => new LevelStore(path, type),
}

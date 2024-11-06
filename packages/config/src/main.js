import convict from 'convict'
import convict_format_with_validator from 'convict-format-with-validator'
import dotenv from 'dotenv'
import {expand} from 'dotenv-expand'
import {get, set} from 'lodash-es'
import {existsSync} from 'node:fs'

convict.addFormats(convict_format_with_validator)
convict.addFormat({
  name: 'json',
  validate: (value) => { if (typeof value !== 'object') throw Error('must be a valid json string') },
  coerce: (value) => JSON.parse(value),
})
convict.addFormat(
  'derived',
  value => value /* validate proper path here */,
  (value, config) => value.replace(/\$\{([\w\.]+)}/g, (_, match) => config.get(match))
)
expand(dotenv.config())

export async function configure(schema, postLoad = _ => _, options = {}) {
  const configDir = `${options?.env?.PWD || process.env.PWD}/config`
  const config = convict(schema, options)
  const override = async (fileName) => {
    const path = `${configDir}/${fileName}`
    if (!existsSync(path)) return
    const {default: override} = await import(`${path}?update=${Date.now()}`) // note: cache invalidation for dynamic imports
    config.load(override || {})
  }

  const env = config.get('env')
  await override(`${env}.js`)
  await override(`local-${env}.js`)
  for (const each of schema.dependencies || []) inferDependency(config._instance, each)
  inferDeferredValues(config._instance)
  config.validate({allowed: 'strict'})
  return postLoad(config.getProperties())
}

function inferDependency(obj, path) {
  const value = get(obj, path)
  if (typeof value === 'function') set(obj, path, value.apply(obj))
}

function inferDeferredValues(obj, context = obj) {
  for (let [key, value] of Object.entries(obj)) {
    if (value && typeof value === 'object') inferDeferredValues(value, context)
    else if (typeof value === 'function') obj[key] = value.apply(context)
  }
}

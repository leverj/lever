import {configure} from '@leverj/lever.config'
import {ensureExistsSync} from '@leverj/lever.common'
import {expect} from 'expect'
import {schema} from './fixtures/override/config.schema.js'
import {rmSync, writeFileSync} from 'node:fs'

describe(`config override`, () => {
  const env = 'special'
  const PWD = `${import.meta.dirname}/fixtures/override`
  const configDir = `${PWD}/config`
  const local_override = `${configDir}/local-${env}.js`

  before(() => {
    ensureExistsSync(configDir)
    writeFileSync(
      local_override,
      `export default {
      all_props: function () { return this.prop_1.prop_1_2 + this.prop_2 + this.prop_3 },
      prop_1: {
        prop_1_2: function () { return 'prop_1_2' },
      },
      prop_2: function () { return this.prop_1.prop_1_2 + '_prop_2' },
      prop_3: function () { return this.prop_2 + 'prop_3' },
    }`)
  })
  after(() => rmSync(configDir, {recursive: true, force: true}))

  it('can override and infer dependencies', async () => {
    expect(await configure(schema, _ => _, {env: {NODE_ENV: env, PWD}})).toMatchObject({
      env,
      all_props: 'prop_1_2prop_1_2_prop_2prop_1_2_prop_2prop_3',
      prop_1: {
        prop_1_2: 'prop_1_2',
      },
      prop_2: 'prop_1_2_prop_2',
      prop_3: 'prop_1_2_prop_2prop_3',
      dependencies: ['prop_1.prop_1_2', 'prop_2', 'prop_3'],
    })
  })
})

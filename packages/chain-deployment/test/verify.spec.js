import {Deploy, networks} from '@leverj/lever.chain-deployment'
import {configure} from '@leverj/lever.config'
import {logger} from '@leverj/lever.common'
import {isAddress} from 'ethers'
import {expect} from 'expect'
import {cloneDeep} from 'lodash-es'
import {exec} from 'node:child_process'
import {rmSync} from 'node:fs'
import {setTimeout} from 'node:timers/promises'
import waitOn from 'wait-on'
import {postLoad, schema} from '../config.schema.js'

describe('verify', () => {
  const chain = 'hardhat'
  let config, evm

  before(async () => {
    config = await configure(schema, postLoad, {env: {NODE_ENV: 'test', CHAINS: [chain]}})
    config.contracts = {[chain]: {Bank: {params: [networks[chain].id, 'whatever']}}}
    evm = exec(`npx hardhat node`)
    await waitOn({resources: [config.networks[chain].providerURL], timeout: 10000})
  })

  after(async () => {
    evm.kill()
    while(!evm.killed) await setTimeout(10)
  })

  it('deploy & verify', async () => {
    rmSync(`${config.deploymentDir}/test`, {recursive: true, force: true})
    const deploy = Deploy.from(config, logger)
    const pre_deployed = deploy.store.get(chain).contracts
    expect(pre_deployed.Bank).not.toBeDefined()

    await deploy.to(chain, {reset: true, verify: true})
    const deployed_initial = cloneDeep(deploy.store.get(chain).contracts)
    expect(deployed_initial.Bank).toBeDefined()
    expect(isAddress(deployed_initial.Bank.address)).toBe(true)
  })
})

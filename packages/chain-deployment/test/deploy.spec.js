import {Deploy, networks} from '@leverj/lever.chain-deployment'
import {createHardhatConfig} from '@leverj/lever.chain-deployment/hardhat.help'
import {ensureExistsSync} from '@leverj/lever.common'
import {isAddress} from 'ethers'
import {expect} from 'expect'
import {cloneDeep} from 'lodash-es'
import {exec} from 'node:child_process'
import {rmSync, writeFileSync} from 'node:fs'
import {setTimeout} from 'node:timers/promises'
import waitOn from 'wait-on'
import config from '../config.js'

describe('deploy to multiple chains', () => {
  const chains = ['holesky', 'sepolia']
  const configDir = `${import.meta.dirname}/hardhat`
  const configFile = (chain) => `${configDir}/${chain}.config.cjs`
  let processes = []

  before(() => {
    config.createContractsConstructors = (chain) => ({
      ToyMath: {},
      Bank: {
        libraries: ['ToyMath'],
        params: [networks[chain].id, 'whatever'],
      },
    })
    ensureExistsSync(configDir)
    chains.forEach(_ => writeFileSync(configFile(_), createHardhatConfig(_, networks[_].id)))
  })

  beforeEach(async () => {
    rmSync(`${config.deploymentDir}/test`, {recursive: true, force: true})
    chains.forEach((each, i) => {
      const port = 8101 + i
      networks[each].providerURL = `http://localhost:${port}`
      processes.push(exec(`npx hardhat node --config ${configFile(each)} --port ${port}`))
    })
    for (let each of chains) await waitOn({resources: [networks[each].providerURL], timeout: 10_000})
  })

  afterEach(async () => {
    for (let each of processes) {
      each.kill()
      while(!each.killed) await setTimeout(10)
    }
  })

  after(() => rmSync(configDir, {recursive: true, force: true}))

  it('can deploy contracts to each chain', async () => {
    const deploy = Deploy.from(config)

    for (let chain of chains) {
      expect(deploy.store.get(chain)).not.toBeDefined()

      // first deploy; from scratch
      await deploy.to(chain)
      const deployed_initial = cloneDeep(deploy.store.get(chain).contracts)
      expect(deployed_initial.Bank).toBeDefined()
      expect(isAddress(deployed_initial.Bank.address)).toBe(true)
      expect(deployed_initial.Bank.blockCreated).toBeGreaterThan(0n)

      // deploy again, but not really; do not reset contract addresses!
      await deploy.to(chain, {reset: false})
      const redeployed_without_reset = cloneDeep(deploy.store.get(chain).contracts)
      expect(redeployed_without_reset.Bank).toMatchObject(deployed_initial.Bank)

      // redeploy again; force reset contract addresses!
      await deploy.to(chain, {reset: true})
      const redeployed_with_reset = cloneDeep(deploy.store.get(chain).contracts)
      expect(redeployed_with_reset.Bank).not.toMatchObject(deployed_initial.Bank)
    }
  })
})

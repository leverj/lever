import {Deploy, networks} from '@leverj/lever.chain-deployment'
import {isAddress, JsonRpcProvider, Wallet} from 'ethers'
import {expect} from 'expect'
import {Map} from 'immutable'
import {cloneDeep} from 'lodash-es'
import {exec} from 'node:child_process'
import {rmSync} from 'node:fs'
import {setTimeout} from 'node:timers/promises'
import waitOn from 'wait-on'
import {Create3Factory} from '../src/create3.js'
import config from '../config.js'
import {configDir, configFile, configureContracts, writeConfigFile} from './help.js'

describe('deploy to multiple chains', () => {
  const chains = ['holesky', 'sepolia']
  let deploy, processes = []

  before(() => {
    configureContracts(config)
    chains.forEach(_ => writeConfigFile(_, networks[_].id))
  })

  beforeEach(async () => {
    rmSync(`${config.deploymentDir}/test`, {recursive: true, force: true})
    chains.forEach((each, i) => {
      const port = 8101 + i
      networks[each].providerURL = `http://localhost:${port}`
      processes.push(exec(`npx hardhat node --config ${configFile(each)} --port ${port}`))
    })
    for (let each of chains) await waitOn({resources: [networks[each].providerURL], timeout: 10_000})
    deploy = Deploy.from(config)
  })

  afterEach(async () => {
    for (let each of processes) {
      each.kill()
      while(!each.killed) await setTimeout(10)
    }
  })

  after(() => rmSync(configDir, {recursive: true, force: true}))

  it('can deploy contracts to each chain', async () => {
    for (let chain of chains) {
      expect(deploy.store.get(chain)).not.toBeDefined()

      // first deploy; from scratch
      await deploy.to(chain)
      const initial = Map(cloneDeep(deploy.store.get(chain).contracts))
      expect(initial.size).toEqual(2) // [ToyMath, Bank]
      initial.forEach(_ => {
        expect(isAddress(_.address)).toBe(true)
        expect(_.blockCreated).toBeGreaterThan(0)
      })

      // deploy again, but not really; do not reset contract addresses!
      await deploy.to(chain, {reset: false})
      const redeployed_without_reset = Map(cloneDeep(deploy.store.get(chain).contracts))
      expect(redeployed_without_reset.toJS()).toMatchObject(initial.toJS())

      // redeploy again; force reset contract addresses!
      await deploy.to(chain, {reset: true})
      const redeployed_with_reset = Map(cloneDeep(deploy.store.get(chain).contracts))
      expect(redeployed_with_reset.toJS()).not.toMatchObject(initial.toJS())
    }
  })

  it('can deploy to each chain, using create3 deployment', async () => {
    const randomIn = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

    for (let chain of chains) {
      expect(deploy.store.get(chain)).not.toBeDefined()

      // introduce "noise" such that blockCreated would differ between chains
      const provider = new JsonRpcProvider(networks[chain].providerURL)
      const someone = Wallet.createRandom().address
      for (let i = 0; i < randomIn(1, 10); i++) {
        await deploy.deployer.connect(provider).sendTransaction({to: someone, value: 100}).then(_ => _.wait())
        await setTimeout(200) // note: must wait a bit to avoid "Error: nonce has already been used"
      }

      // first deploy; from scratch
      await deploy.to(chain, {create3: true})
      const initial = Map(cloneDeep(deploy.store.get(chain).contracts))
      expect(initial.size).toEqual(3) // [Create3Factory.contractName, ToyMath, Bank]
      initial.forEach(_ => {
        expect(isAddress(_.address)).toBe(true)
        expect(_.blockCreated).toBeGreaterThan(0)
      })

      // attempt to redeploy; should advise contracts already deployed, and "restore" them
      deploy.store.delete(chain)
      expect(deploy.store.get(chain)).not.toBeDefined()
      await deploy.to(chain, {create3: true})
      const restored = Map(cloneDeep(deploy.store.get(chain).contracts))
      expect(restored.toJS()).toMatchObject(initial.toJS())

      // attempt to reset; should throw
      await expect(deploy.to(chain, {create3: true, reset: true})).rejects.toThrow(/cannot reset when using create3 deployment/)

      // now deploy with a new salt; contracts would deploy into a new address
      await deploy.to(chain, {create3: true, salt: 'whatever you want'})
      const redeployed = Map(cloneDeep(deploy.store.get(chain).contracts))
      expect(redeployed.toJS()).not.toMatchObject(initial.toJS())
      redeployed.forEach((value, key) => {
        const other_value = initial.get(key)
        if (key === Create3Factory.contractName)
          expect(value).toMatchObject(other_value)
        else {
          expect(value.address).not.toEqual(other_value.address)
          expect(value.blockCreated).toBeGreaterThan(other_value.blockCreated)
        }
      })
    }

    // compare address across chains
    const [one, other] = chains.map(_ => Map(deploy.store.get(_).contracts))
    one.forEach((value, key) => expect(value.address).toEqual(other.get(key).address))
  })
})

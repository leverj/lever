import {Evms} from '@leverj/lever.chain-deployment/hardhat.evms'
import {isAddress} from 'ethers'
import {expect} from 'expect'
import {Create3Factory} from '../src/create3.js'
import config from '../config.js'
import {configureContracts} from './help.js'

configureContracts(config)

describe('evms', () => {
  const chains = ['chain-1', 'chain-2']
  let evms

  beforeEach(async () => evms = await Evms.start(chains, config))
  afterEach(async () => await evms.stop())

  it('can deploy to multiple chains', async () => {
    const contractNames = ['ToyMath', 'Bank']

    for (let chain of chains) {
      for (let each of contractNames) {
        expect(evms.deployed[chain]).not.toBeDefined()
      }
    }

    await evms.deploy()
    const initial = evms.deployed
    for (let chain of chains) {
      const {providerURL, contracts} = initial[chain]
      expect(providerURL.startsWith('http://localhost:')).toBe(true)
      expect(Object.keys(contracts)).toEqual(contractNames)
      for (let each of contractNames) {
        expect(isAddress(contracts[each].address)).toBe(true)
        expect(contracts[each].blockCreated).toBeGreaterThan(0)
      }
    }

    // deploy again, but not really; do not reset contract addresses!
    await evms.deploy({reset: false})
    const redeployed_without_reset = evms.deployed
    expect(redeployed_without_reset).toMatchObject(initial)

    // redeploy again; force reset contract addresses!
    await evms.deploy({reset: true})
    const redeployed_with_reset = evms.deployed
    expect(redeployed_with_reset).not.toMatchObject(initial)

    // deploy using create3 (which forces redeployment)
    await evms.deploy({create3: true})
    const redeployed_using_create3 = evms.deployed
    expect(redeployed_using_create3).not.toMatchObject(initial)
    expect(redeployed_using_create3).not.toMatchObject(redeployed_with_reset)
    for (let chain of chains) {
      const {contracts} = redeployed_using_create3[chain]
      expect(Object.keys(contracts)).toEqual(contractNames.concat(Create3Factory.contractName))
      for (let each of contractNames) {
        const initial_contract = initial[chain].contracts[each]
        const redeployed_contract = redeployed_using_create3[chain].contracts[each]
        expect(redeployed_contract.address).not.toEqual(initial_contract.address)
        expect(redeployed_contract.blockCreated).not.toEqual(initial_contract.blockCreated)
      }
    }

    // attempt to reset using create3; should throw
    await expect(evms.deploy({reset: true, create3: true})).rejects.toThrow(/cannot reset when using create3 deployment/)
    //fixme: this should reset too
    // await expect(evms.deploy({create3: true})).rejects.toThrow(/cannot reset when using create3 deployment/)
  })
})

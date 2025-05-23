import {accounts, chainId, provider} from '@leverj/lever.chain-deployment/hardhat.help'
import {ContractTracker, MultiContractTracker} from '@leverj/lever.chain-tracking'
import {ERC20, ERC721} from '@leverj/lever.chain-tracking/test'
import {logger} from '@leverj/lever.common'
import {InMemoryCompoundKeyStore, InMemoryStore} from '@leverj/lever.storage'
import {cloneDeep} from 'lodash-es'
import {setTimeout} from 'node:timers/promises'
import {expect} from 'expect'

describe('any ContractTracker / Store interaction', () => {
  const [_, account] = accounts
  const config = {logger, polling: {interval: 10, retries: 5}}
  let tracker

  afterEach(() => tracker.stop())

  it('maintain state for ContractTracker', async () => {
    const contract = await ERC20()
    const creationBlock = 0
    const store = new InMemoryCompoundKeyStore()
    tracker = ContractTracker.of(config, chainId, contract, 0, store, _ => _)
    const key = tracker.key
    const before = cloneDeep(store.get(key))
    expect(tracker.marker).toEqual(before.marker)
    expect(tracker.marker.block).toEqual(creationBlock)
    expect(tracker.marker.blockWasProcessed).toBe(false)

    await tracker.start()
    await setTimeout(10) // ... catchup
    expect(tracker.marker).toEqual(store.get(key).marker)
    expect(tracker.marker.blockWasProcessed).toBe(true)

    await contract.mint(account.address, 1000n)
    await contract.approve(contract.target, 5000n)
    await contract.mint(account.address, 2000n)
    await setTimeout(10)
    const after = cloneDeep(store.get(key))
    expect(after.marker.block).toEqual(tracker.marker.block)
    expect(after.marker.blockWasProcessed).toBe(true)
  })

  it('maintain state for MultiContractTracker', async () => {
    const contract1 = await ERC20('One', '111')
    const contract2 = await ERC20('Two', '222')
    const contract3 = await ERC721('Three', '333')

    const store = new InMemoryStore()
    tracker = MultiContractTracker.of(config, chainId, provider, store, _ => _)
    const before = cloneDeep(store.get(chainId))
    expect(before.abis).toHaveLength(0)
    expect(before.contracts).toHaveLength(0)
    expect(before.toOnboard).toHaveLength(0)

    await tracker.addContract(contract1, 'ERC20')
    await tracker.addContract(contract2, 'ERC20')
    const beforeStart_addContracts = cloneDeep(store.get(chainId))
    expect(beforeStart_addContracts.abis).toHaveLength(0)
    expect(beforeStart_addContracts.contracts).toHaveLength(0)
    expect(beforeStart_addContracts.toOnboard).toHaveLength(2)
    expect(tracker.marker).toEqual(before.marker)
    expect(tracker.marker.block).toEqual(0)
    expect(tracker.marker.blockWasProcessed).toBe(false)

    await tracker.start()
    await setTimeout(10) // ... onboard
    const afterOnboarding = cloneDeep(store.get(chainId))
    expect(afterOnboarding.abis).toHaveLength(1)
    expect(afterOnboarding.contracts).toHaveLength(2)
    expect(afterOnboarding.toOnboard).toHaveLength(0)
    expect(tracker.marker).toEqual(store.get(chainId).marker)
    expect(tracker.marker.block).toBeGreaterThan(before.marker.block)
    expect(tracker.marker.blockWasProcessed).toBe(true)

    await tracker.addContract(contract3, 'ERC721')
    await setTimeout(10) // ... catchup
    const afterStart_addContracts = cloneDeep(store.get(chainId))
    expect(afterStart_addContracts.abis).toHaveLength(2)
    expect(afterStart_addContracts.contracts).toHaveLength(3)
    expect(afterStart_addContracts.toOnboard).toHaveLength(0)
    expect(tracker.marker).toEqual(store.get(chainId).marker)
    expect(tracker.marker.block).toEqual(afterOnboarding.marker.block)
    expect(tracker.marker.blockWasProcessed).toBe(true)

    await contract1.mint(account.address, 100n)
    await contract1.approve(contract1.target, 10000n)
    await contract1.mint(account.address, 2000n)
    await contract2.mint(account.address, 200n)
    await contract2.approve(contract2.target, 20000n)
    await contract2.mint(account.address, 4000n)
    await contract3.mint(account.address, 3n)
    await contract3.connect(account).approve(contract1.target, 3n)
    await contract3.mint(account.address, 6n)
    await setTimeout(10)
    const after = cloneDeep(store.get(chainId))
    expect(after.marker.block).toEqual(tracker.marker.block)
    expect(after.marker.block).toBeGreaterThan(afterStart_addContracts.marker.block)
    expect(after.marker.blockWasProcessed).toBe(true)
    expect(after.abis).toMatchObject(afterStart_addContracts.abis)
    expect(after.contracts).toMatchObject(afterStart_addContracts.contracts)
    expect(after.toOnboard).toMatchObject(afterStart_addContracts.toOnboard)
  })
})

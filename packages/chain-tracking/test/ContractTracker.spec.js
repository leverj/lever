import {ContractTracker} from '@leverj/lever.chain-tracking'
import {logger} from '@leverj/lever.common'
import {InMemoryCompoundKeyStore} from '@leverj/lever.storage'
import {ZeroAddress as ETH} from 'ethers'
import {setTimeout} from 'node:timers/promises'
import {accounts, chainId, ERC20, expectEventsToMatch} from './help.js'

describe('ContractTracker - with InMemoryCompoundKeyStore', () => {
  const [deployer, account] = accounts
  const config = {logger, polling: {interval: 10, retries: 5}}
  let contract, tracker, events, store

  before(() => store = new InMemoryCompoundKeyStore())

  beforeEach(async () => {
    store.clear()
    events = []
    contract = await ERC20()
    tracker = ContractTracker.of(config, chainId, contract, 0, store, _ => events.push(_))
  })

  afterEach(() => tracker.stop())

  it('can track events when polling', async () => {
    const address = contract.target
    expectEventsToMatch(events, [])

    await contract.mint(account.address, 1000n) // => Transfer(from, to, value)
    await tracker.poll()
    expectEventsToMatch(events, [
      {address, name: 'Transfer', args: [ETH, account.address, 1000n]},
    ])

    await contract.mint(account.address, 2000n) // => Transfer(from, to, value)
    await contract.approve(contract.target, 5000n) // => Approval(owner, spender, value)
    await tracker.poll()
    expectEventsToMatch(events, [
      {address, name: 'Transfer', args: [ETH, account.address, 1000n]},
      {address, name: 'Transfer', args: [ETH, account.address, 2000n]},
      {address, name: 'Approval', args: [deployer.address, contract.target, 5000n]},
    ])
  })

  it('can catchup with events after start', async () => {
    const address = contract.target
    await contract.mint(account.address, 1000n) // => Transfer(from, to, value)
    await contract.approve(contract.target, 5000n) // => Approval(owner, spender, value)
    await contract.mint(account.address, 2000n) // => Transfer(from, to, value)
    await tracker.start()
    await setTimeout(10)
    expectEventsToMatch(events, [
      {address, name: 'Transfer', args: [ETH, account.address, 1000n]},
      {address, name: 'Approval', args: [deployer.address, contract.target, 5000n]},
      {address, name: 'Transfer', args: [ETH, account.address, 2000n]},
    ])
  })
})

import {accounts, chainId} from '@leverj/lever.chain-deployment/hardhat.help'
import {ContractTracker} from '@leverj/lever.chain-tracking'
import {ERC20, expectEventsToMatch} from '@leverj/lever.chain-tracking/test'
import {logger} from '@leverj/lever.common'
import {JsonFileStore} from '@leverj/lever.storage'
import {ZeroAddress as ETH} from 'ethers'
import {existsSync, mkdtempSync, rmSync} from 'node:fs'
import {tmpdir} from 'node:os'
import {setTimeout} from 'node:timers/promises'

describe('ContractTracker - using JsonFileStore', () => {
  const [deployer, account] = accounts
  const storageDir = mkdtempSync(`${tmpdir()}/storage`)
  const config = {logger, polling: {interval: 10, retries: 5}}
  let contract, tracker, events, store

  before(async () => {
    if (existsSync(storageDir)) rmSync(storageDir, {recursive: true, force: true})
    store = new JsonFileStore(storageDir, 'trackers', true)
  })

  beforeEach(async () => {
    await store.clear()
    events = []
    contract = await ERC20()
    tracker = await ContractTracker.of(config, chainId, contract, 0, store, _ => events.push(_))
  })

  afterEach(async () => await tracker.stop())

  after(async () => await store.close())

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

  it('can pickup after restart', async () => {
    await tracker.start()
    const address = contract.target
    await contract.mint(account.address, 1000n) // => Transfer(from, to, value)
    await contract.approve(contract.target, 5000n) // => Approval(owner, spender, value)
    await setTimeout(10)
    expectEventsToMatch(events, [
      {address, name: 'Transfer', args: [ETH, account.address, 1000n]},
      {address, name: 'Approval', args: [deployer.address, contract.target, 5000n]},
    ])

    await tracker.stop()
    await contract.mint(account.address, 1500n) // => Transfer(from, to, value)
    await contract.mint(account.address, 2000n) // => Transfer(from, to, value)
    tracker = await ContractTracker.of(config, chainId, contract, 0, store, _ => events.push(_))
    await tracker.start()
    await setTimeout(10)
    expectEventsToMatch(events, [
      {address, name: 'Transfer', args: [ETH, account.address, 1000n]},
      {address, name: 'Approval', args: [deployer.address, contract.target, 5000n]},
      {address, name: 'Transfer', args: [ETH, account.address, 1500n]},
      {address, name: 'Transfer', args: [ETH, account.address, 2000n]},
    ])
  })
})

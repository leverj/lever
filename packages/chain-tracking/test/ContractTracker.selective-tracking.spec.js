import {accounts, chainId} from '@leverj/lever.chain-deployment/hardhat.help'
import {ContractTracker} from '@leverj/lever.chain-tracking'
import {Bank, ERC20, expectEventsToMatch} from '@leverj/lever.chain-tracking/test'
import {logger} from '@leverj/lever.common'
import {InMemoryCompoundKeyStore} from '@leverj/lever.storage'
import {ZeroAddress as ETH} from 'ethers'
import {expect} from 'expect'
import {setTimeout} from 'node:timers/promises'

describe('ContractTracker - selective tracking', () => {
  const [, account] = accounts
  const config = {logger, polling: {interval: 10, retries: 5}}
  let token, contract, tracker, events, store

  before(() => store = new InMemoryCompoundKeyStore())

  beforeEach(async () => {
    store.clear()
    events = []
    contract = await Bank(chainId, '🥱')
    token = await ERC20()
    tracker = ContractTracker.of(config, chainId, token, 0, store, _ => events.push(_), [
      token.interface.fragments.filter(_ => _.type === 'event' && _.name === 'Transfer').map(_ => _.topicHash)
    ])
  })

  afterEach(() => tracker.stop())

  it('can track events when polling', async () => {
    await token.mint(account.address, 1000n) // => Transfer(from, to, value)
    await token.connect(account).approve(contract.target, 1000n).then(_ => _.wait())
    await tracker.poll()
    expect(await contract.balances(account, token.target)).toEqual(0n)
    // expectEventsToMatch(events, [])
    expectEventsToMatch(events, [
      {address: token.target, name: 'Transfer', args: [ETH, account.address, 1000n]},
    ])

    await contract.connect(account).deposit(token.target, 1000n).then(_ => _.wait()) // => Transfer(from, to, value)
    expect(await contract.balances(account, token.target)).toEqual(1000n)
    await tracker.poll()
    expectEventsToMatch(events, [
      {address: token.target, name: 'Transfer', args: [ETH, account.address, 1000n]},
      {address: token.target, name: 'Transfer', args: [account.address, contract.target, 1000n]},
    ])

    await contract.connect(account).withdraw(token.target, 1000n / 10n).then(_ => _.wait())
    expect(await contract.balances(account, token.target)).toEqual(1000n / 10n * 9n)
    await tracker.poll()
    expectEventsToMatch(events, [
      {address: token.target, name: 'Transfer', args: [ETH, account.address, 1000n]},
      {address: token.target, name: 'Transfer', args: [account.address, contract.target, 1000n]},
      {address: token.target, name: 'Transfer', args: [contract.target, account.address, 100n]},
    ])
  })

  it('can catchup with events after start', async () => {
    await token.mint(account.address, 1000n) // => Transfer(from, to, value)
    await token.connect(account).approve(contract.target, 1000n).then(_ => _.wait())
    await contract.connect(account).deposit(token.target, 1000n).then(_ => _.wait()) // => Transfer(from, to, value)
    expect(await contract.balances(account, token.target)).toEqual(1000n)
    await contract.connect(account).withdraw(token.target, 1000n / 10n).then(_ => _.wait())
    await tracker.start()
    await setTimeout(10)
    expectEventsToMatch(events, [
      {address: token.target, name: 'Transfer', args: [ETH, account.address, 1000n]},
      {address: token.target, name: 'Transfer', args: [account.address, contract.target, 1000n]},
      {address: token.target, name: 'Transfer', args: [contract.target, account.address, 100n]},
    ])
  })
})

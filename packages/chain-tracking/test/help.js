import {deployContract} from '@leverj/lever.chain-deployment/hardhat.help'
import {expect} from 'expect'
import {setTimeout} from 'node:timers/promises'

export const ERC20 = async (name = 'Crap', symbol = 'CRAP') => deployContract('ERC20Mock', [name, symbol])
export const ERC721 = async (name = 'Crap', symbol = 'CRAP') => deployContract('ERC721Mock', [name, symbol])
export const Bank = async (chainId, name) => deployContract('Bank', [chainId, name])

// events surface on the tracker's polling cycle, so a fixed sleep races the poller; wait for them to land instead
const waitForEventCount = async (events, count, timeout = 2000, interval = 5) => {
  for (let waited = 0; events.length < count && waited < timeout; waited += interval) await setTimeout(interval)
}

export async function expectEventsToMatch(events, expected) {
  await waitForEventCount(events, expected.length)
  expect(events.length).toEqual(expected.length)
  for (let [i, {address, name, args}] of events.entries()) {
    // console.log('>'.repeat(50), i, args)
    expect(address).toEqual(expected[i].address)
    expect(name).toEqual(expected[i].name)
    expect(args).toMatchObject(expected[i].args)
  }
}

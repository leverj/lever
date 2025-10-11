import {expect} from 'expect'

export * from '../../chain-deployment/test/help.js'
export * from '../../chain-deployment/test/network-connect.js'

export function expectEventsToMatch(events, expected) {
  expect(events.length).toEqual(expected.length)
  for (let [i, {address, name, args}] of events.entries()) {
    expect(address).toEqual(expected[i].address)
    expect(name).toEqual(expected[i].name)
    expect(args).toMatchObject(expected[i].args)
  }
}

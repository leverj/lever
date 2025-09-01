import {expect} from 'expect'
import {network} from 'hardhat'

export const {ethers, networkConfig: {chainId}} = await network.connect()
export const {deployContract, getSigners, provider} = ethers

export const accounts = await getSigners()

export const ERC20 = async (name = 'Crap', symbol = 'CRAP') => deployContract('ERC20Mock', [name, symbol])
export const ERC721 = async (name = 'Crap', symbol = 'CRAP') => deployContract('ERC721Mock', [name, symbol])
export const Bank = async (chainId, name) => deployContract('Bank', [chainId, name])

export function expectEventsToMatch(events, expected) {
  expect(events.length).toEqual(expected.length)
  for (let [i, {address, name, args}] of events.entries()) {
    expect(address).toEqual(expected[i].address)
    expect(name).toEqual(expected[i].name)
    expect(args).toMatchObject(expected[i].args)
  }
}

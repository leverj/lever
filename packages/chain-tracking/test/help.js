import {default as hardhat} from 'hardhat'
import {expect} from 'expect'

/** https://hardhat.org/hardhat-network-helpers/docs/reference */
export * as evm from '@nomicfoundation/hardhat-network-helpers'

export const {config, ethers, network} = hardhat

/** https://hardhat.org/hardhat-runner/plugins/nomicfoundation-hardhat-ethers#helpers */
export const {provider, deployContract, getSigners} = ethers

export const chainId = await provider.getNetwork().then(_ => _.chainId)
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

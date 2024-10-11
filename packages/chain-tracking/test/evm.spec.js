import {provider} from '@leverj/lever.chain-deployment/hardhat.help'
import {ERC20} from '@leverj/lever.chain-tracking/test'
import {expect} from 'expect'
import {getCreationBlock} from '../src/evm.js'

describe('evm', () => {
  it('getCreationBlock', async () => {
    const before = await provider.getBlockNumber()
    for (let i = 1; i <= 3; i++) {
      const contract = await ERC20()
      expect(await getCreationBlock(provider, contract.target)).toEqual(before + i)
    }
  })
})

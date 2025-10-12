import {getCreationBlock} from '@leverj/lever.common'
import {expect} from 'expect'
import {ERC20, provider} from './help.js'

describe('getCreationBlock', () => {
  it('can get the creation block of a contract', async () => {
    const before = await provider.getBlockNumber()
    for (let i = 1; i <= 3; i++) {
      const contract = await ERC20()
      expect(await getCreationBlock(provider, contract.target, 10)).toEqual(before + i)
    }
  })
})

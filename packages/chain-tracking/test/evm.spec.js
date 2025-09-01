import {provider, getBlockNumber} from '@leverj/lever.chain-deployment/hardhat.help'
import {getCreationBlock} from '@leverj/lever.common'
import {ERC20} from '@leverj/lever.chain-tracking/test'
import {expect} from 'expect'

//fixme: getBlockNumber() no longer works
describe.skip('evm', () => {
  it('getCreationBlock', async () => {
    const before = await getBlockNumber()
    for (let i = 0; i <= 3; i++) {
      const contract = await ERC20()
      expect(await getCreationBlock(provider, contract.target, 10)).toEqual(before + i)
    }
  })
})

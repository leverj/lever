import {expect} from 'expect'
import {accounts, Bank, chainId, ERC20} from '../help.js'

describe('Bank', () => {
  const [, account] = accounts
  const amount = 1000n

  it('can deposit & withdraw ERC20 Token', async () => {
    const bank = await Bank(chainId, '🥱')
    const token = await ERC20()
    await token.mint(account.address, amount)
    await token.connect(account).approve(bank.target, amount).then(_ => _.wait())

    expect(await bank.balances(account, token.target)).toEqual(0n)
    await bank.connect(account).deposit(token.target, amount).then(_ => _.wait())
    expect(await bank.balances(account, token.target)).toEqual(amount)

    await bank.connect(account).withdraw(token.target, amount / 10n).then(_ => _.wait())
    expect(await bank.balances(account, token.target)).toEqual(amount / 10n * 9n)
  })
})

import {accounts, chainId, deployContract} from '@leverj/lever.chain-deployment/hardhat.help'
import {expect} from 'expect'

const Bank = async (chainId, name) => deployContract('ToyMath', []).then(
  _ => deployContract('Bank', [chainId, name], {libraries: {ToyMath: _.target}})
)
const ERC20 = async (name, symbol, decimals) => deployContract('ERC20Token', [name, symbol, decimals])

describe('Bank', () => {
  const [, account] = accounts
  const amount = 1000n

  it('can deposit & withdraw ERC20 Token', async () => {
    const bank = await Bank(chainId, '🥱')
    const token = await ERC20('Crap', 'CRAP', 18)
    await token.mint(account.address, amount)
    await token.connect(account).approve(bank.target, amount).then(_ => _.wait())

    expect(await bank.balances(account, token.target)).toEqual(0n)
    await bank.connect(account).deposit(token.target, amount).then(_ => _.wait())
    expect(await bank.balances(account, token.target)).toEqual(amount)

    await bank.connect(account).withdraw(token.target, amount / 10n).then(_ => _.wait())
    expect(await bank.balances(account, token.target)).toEqual(amount / 10n * 9n)
  })
})

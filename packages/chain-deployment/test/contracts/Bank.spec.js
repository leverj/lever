import {accounts, chainId, deployContract} from '@leverj/lever.chain-deployment/hardhat.help'
import {expect} from 'expect'

const Bank = async (chainId, name) => deployContract('ToyMath', []).then(
  _ => deployContract('Bank', [chainId, name], {libraries: {ToyMath: _.target}})
)
const ERC20 = async (name, symbol) => deployContract('ERC20Mock', [name, symbol])

describe('Bank', () => {
  const [, account] = accounts
  const amount = 1000n
  //0x1090495C9bC80106a8E42D89E10fd58adbDA409b
  // for (let _ of accounts) console.log(_.address)

  it('can deposit & withdraw ERC20 Token', async () => {
    const bank = await Bank(chainId, '🥱')
    const token = await ERC20('Crap', 'CRAP')
    await token.mint(account.address, amount)
    await token.connect(account).approve(bank.target, amount).then(_ => _.wait())

    expect(await bank.balances(account, token.target)).toEqual(0n)
    await bank.connect(account).deposit(token.target, amount).then(_ => _.wait())
    expect(await bank.balances(account, token.target)).toEqual(amount)

    await bank.connect(account).withdraw(token.target, amount / 10n).then(_ => _.wait())
    expect(await bank.balances(account, token.target)).toEqual(amount / 10n * 9n)
  })
})

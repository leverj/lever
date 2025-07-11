import {accounts, chainId, deployContract} from '@leverj/lever.chain-deployment/hardhat.help'
import {Contract} from 'ethers'
import {expect} from 'expect'

const Bank = async (chainId, name) => deployContract('ToyMath', []).then(
  _ => deployContract('Bank', [chainId, name], {libraries: {ToyMath: _.target}})
)
const ERC20 = async (name, symbol) => deployContract('ERC20Mock', [name, symbol])

describe('Bank', () => {
  const [, account] = accounts
  const MAX_UINT256 = BigInt('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
  const amount = 1000n
  let bank, token

  beforeEach(async () => {
    bank = await Bank(chainId, '🥱')
    token = await ERC20('Crap', 'CRAP')
    await token.mint(account.address, amount)
    expect(await token.balanceOf(account.address)).toEqual(amount)
    console.log("test", {sender: account.address, token: token.target, bank: bank.target});
  })

  it('can deposit & withdraw ERC20 Token', async () => {
    expect(await token.allowance(account.address, bank.target)).toEqual(0n)
    await token.connect(account).approve(bank.target, MAX_UINT256).then(_ => _.wait())
    expect(await token.allowance(account.address, bank.target)).toEqual(MAX_UINT256)

    expect(await bank.balances(account, token.target)).toEqual(0n)
    await bank.connect(account).deposit(token.target, amount).then(_ => _.wait())
    expect(await bank.balances(account, token.target)).toEqual(amount)

    await bank.connect(account).withdraw(token.target, amount / 10n).then(_ => _.wait())
    expect(await bank.balances(account, token.target)).toEqual(amount / 10n * 9n)
  })

  it('can depositPlusApproval', async () => {
    expect(await token.allowance(account.address, bank.target)).toEqual(0n)
    bank.connect(account)

    expect(await bank.balances(account, token.target)).toEqual(0n)
    await bank.connect(account).depositPlusApproval(token.target, amount).then(_ => _.wait())
    expect(await bank.balances(account, token.target)).toEqual(amount)
  })

  it('can deposit via Multicall3', async () => {
    expect(await token.allowance(account.address, bank.target)).toEqual(0n)

    const proxy = await deployContract('Multicall3', [])
    const stub = new Contract(proxy.target, proxy.interface, account)
    const calls = [
      {
        target: token.target,
        allowFailure: true,
        callData: token.interface.encodeFunctionData('approve', [bank.target, MAX_UINT256]),
      },
      {
        target: bank.target,
        allowFailure: true,
        callData: bank.interface.encodeFunctionData('deposit', [token.target, amount]),
      },
    ]
    // await stub.aggregate3(calls).then(_ => _.wait())
    // expect(await token.allowance(account.address, bank.target)).toEqual(MAX_UINT256)
    // expect(await bank.balances(account, token.target)).toEqual(amount)

    const results = (await stub.aggregate3.staticCall(calls)).map(({success, returnData}, i) => ({success, returnData}))
    console.log('approve', results[0].success)
    console.log('deposit', results[1].success)
    // console.log('!'.repeat(5), results)
    // console.log('1'.repeat(5), token.interface.decodeFunctionResult('approve', results[0].returnData))
  })

  it('can deposit via AtomicDeposit', async () => {
    expect(await token.allowance(account.address, bank.target)).toEqual(0n)

    const proxy = await deployContract('AtomicDeposit', [])
    const stub = new Contract(proxy.target, proxy.interface, account)
    stub.connect(account)
    const results = (await stub.execute.staticCall(token.target, bank.target, amount))
    console.log('>'.repeat(50), results)
  })

  it('can deposit via DelegatedAtomicDeposit', async () => {
    expect(await token.allowance(account.address, bank.target)).toEqual(0n)

    const proxy = await deployContract('DelegatedAtomicDeposit', [])
    const stub = new Contract(proxy.target, proxy.interface, account)
    stub.connect(account)
    const results = (await stub.execute.staticCall(token.target, bank.target, amount))
    console.log('>'.repeat(50), results)
  })
})

import {Deploy, networks} from '@leverj/lever.chain-deployment'
import {ensureExistsSync} from '@leverj/lever.common'
import {encodeBytes32String, JsonRpcProvider, Wallet} from 'ethers'
import {expect} from 'expect'
import {exec} from 'node:child_process'
import {rmSync, writeFileSync} from 'node:fs'
import {setTimeout} from 'node:timers/promises'
import waitOn from 'wait-on'
import config from '../config.js'
import {
  Create3Factory,
  deployCreate3Factory,
  deriveAddressOfSignerFromSig,
  fundTransactionSigner,
  getCreate3Address,
  txData,
} from '../src/create3.js'
import {createHardhatConfig, provider} from './help.js'

const {contractName, contractAddress} = Create3Factory

describe('create3 utils', () => {
  it('deriveAddressOfSignerFromSig', async () => {
    expect(await deriveAddressOfSignerFromSig(txData)).toEqual('0x93AA019F0128e3C2338201C9d09a96A6bF48113b')
  })

  it('getCreate3Address', async () => {
    const deployer = new Wallet(config.deployer.privateKey, provider)
    const salt1 = encodeBytes32String('BlaBla.1'), address1 = await getCreate3Address(deployer.address, salt1)
    const salt2 = encodeBytes32String('BlaBla.2'), address2 = await getCreate3Address(deployer.address, salt2)
    expect(address2).not.toEqual(address1)
  })
})

describe('create3', () => {
  const chain = 'sepolia'
  const configDir = `${import.meta.dirname}/hardhat`
  const configFile = (chain) => `${configDir}/${chain}.config.cjs`
  let deploy, processes = []

  before(() => {
    config.createContractsConstructors = (chain) => ({
      ToyMath: {},
      Bank: {
        libraries: ['ToyMath'],
        params: [networks[chain].id, 'whatever'],
      },
    })
    ensureExistsSync(configDir)
    writeFileSync(configFile(chain), createHardhatConfig(chain, networks[chain].id))
  })

  beforeEach(async () => {
    rmSync(`${config.deploymentDir}/test`, {recursive: true, force: true})
    const port = 8101
    networks[chain].providerURL = `http://localhost:${port}`
    processes.push(exec(`npx hardhat node --config ${configFile(chain)} --port ${port}`))
    await waitOn({resources: [networks[chain].providerURL], timeout: 10_000})
    deploy = Deploy.from(config)
  })

  afterEach(async () => {
    for (let each of processes) {
      each.kill()
      while(!each.killed) await setTimeout(10)
    }
  })

  after(() => rmSync(configDir, {recursive: true, force: true}))

  it('deployCreate3Factory', async () => {
    const provider = new JsonRpcProvider(networks[chain].providerURL)
    const deployer = new Wallet(config.deployer.privateKey, provider)
    const {name, address, blockCreated} = await deployCreate3Factory(deployer)
    expect(name).toEqual(contractName)
    expect(address).toEqual(contractAddress)
    expect(blockCreated).toBeGreaterThan(0n)

    const deploy_record = await deployCreate3Factory(deployer)
    expect(deploy_record.address).toEqual(address)
    expect(deploy_record.blockCreated).toEqual(blockCreated)
  })

  it('fundTransactionSigner', async () => {
    const {gasPrice, gasLimit} = txData
    const transactionSigner = '0x93AA019F0128e3C2338201C9d09a96A6bF48113b'
    const provider = new JsonRpcProvider(networks[chain].providerURL)

    const penniless = Wallet.createRandom(provider)
    await expect(fundTransactionSigner(penniless, transactionSigner, gasPrice, gasLimit)).rejects.toThrow(/Insufficient Funds/)

    const deployer = new Wallet(config.deployer.privateKey, provider)
    const before = {
      deployer: await provider.getBalance(deployer.address),
      transactionSigner: await provider.getBalance(transactionSigner),
    }
    expect(before.deployer).toBeGreaterThan(0n)
    expect(before.transactionSigner).toEqual(0n)

    await fundTransactionSigner(deployer, transactionSigner, gasPrice, gasLimit)
    const after = {
      deployer: await provider.getBalance(deployer.address),
      transactionSigner: await provider.getBalance(transactionSigner),
    }
    expect(after.deployer).toBeLessThan(before.deployer)
    expect(after.transactionSigner).toBeGreaterThan(before.transactionSigner)
    expect(after.transactionSigner).toEqual(gasPrice * gasLimit)
  })
})

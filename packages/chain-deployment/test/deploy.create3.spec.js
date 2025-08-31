import {Deploy, networks} from '@leverj/lever.chain-deployment'
import {createHardhatConfig, provider} from '@leverj/lever.chain-deployment/hardhat.help'
import {ensureExistsSync} from '@leverj/lever.common'
import {encodeBytes32String, getCreateAddress, isAddress, JsonRpcProvider, Wallet} from 'ethers'
import {expect} from 'expect'
import {exec} from 'node:child_process'
import {rmSync, writeFileSync} from 'node:fs'
import {setTimeout} from 'node:timers/promises'
import waitOn from 'wait-on'
import config from '../config.js'
import {deriveAddressOfSignerFromSig, getCreate3Address, verifyNotDeployedAt} from '../src/create3/create3-utils.js'
import {Create3Factory, deployCreate3Factory, fundTransactionSigner, txData} from '../src/create3/Create3Factory.js'
import {cloneDeep} from 'lodash-es'

const {contractName, contractAddress} = Create3Factory

describe('deploy using create3 method to multiple chains', () => {
  const chains = ['holesky', 'sepolia']
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
    chains.forEach(_ => writeFileSync(configFile(_), createHardhatConfig(_, networks[_].id)))
  })

  beforeEach(async () => {
    rmSync(`${config.deploymentDir}/test`, {recursive: true, force: true})
    chains.forEach((each, i) => {
      const port = 8101 + i
      networks[each].providerURL = `http://localhost:${port}`
      processes.push(exec(`npx hardhat node --config ${configFile(each)} --port ${port}`))
    })
    for (let each of chains) await waitOn({resources: [networks[each].providerURL], timeout: 10_000})
    deploy = Deploy.from(config)
  })

  afterEach(async () => {
    for (let each of processes) {
      each.kill()
      while(!each.killed) await setTimeout(10)
    }
  })

  after(() => rmSync(configDir, {recursive: true, force: true}))

  it('can deploy create3 factory to each chain', async () => {
    for (let chain of chains) {
      expect(deploy.store.get(chain)).not.toBeDefined()

      // first deploy; from scratch
      await deploy.to(chain, {create3: true})
      const deployed_initial = cloneDeep(deploy.store.get(chain).contracts)
      expect(deployed_initial[contractName]).toBeDefined()
      expect(isAddress(deployed_initial[contractName].address)).toBe(true)
      expect(deployed_initial[contractName].blockCreated).toBeGreaterThan(0n)

      // attempt to reset; should have no effect
      await deploy.to(chain, {create3: true, reset: true})
      const attempt_to_reset = cloneDeep(deploy.store.get(chain).contracts)
      expect(attempt_to_reset[contractName]).toMatchObject(deployed_initial[contractName])

      // attempt to redeploy; should advise contracts already deployed and restore the store
      deploy.store.delete(chain)
      deploy.store.save()
      expect(deploy.store.get(chain)).not.toBeDefined()
      await deploy.to(chain, {create3: true})
      const redeployed = cloneDeep(deploy.store.get(chain).contracts)
      expect(redeployed[contractName]).toMatchObject(deployed_initial[contractName])
    }
  })

  describe('Create3Factory', () => {
    it('fundTransactionSigner', async () => {
      const {gasPrice, gasLimit} = txData
      const transactionSigner = '0x93AA019F0128e3C2338201C9d09a96A6bF48113b'
      for (let chain of chains) {
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
      }
    })

    it('deployCreate3Factory', async () => {
      for (let chain of chains) {
        const provider = new JsonRpcProvider(networks[chain].providerURL)
        const deployer = new Wallet(config.deployer.privateKey, provider)
        const {name, address, blockCreated} = await deployCreate3Factory(deployer)
        expect(name).toEqual(contractName)
        expect(address).toEqual(contractAddress)
        expect(blockCreated).toBeGreaterThan(0n)

        await expect(deployCreate3Factory(deployer)).rejects.toThrow(/Redeploy Attempt/)
      }
    })
  })
})

describe('create3-utils', () => {
  it('deriveAddressOfSignerFromSig', async () => {
    expect(await deriveAddressOfSignerFromSig(txData)).toEqual('0x93AA019F0128e3C2338201C9d09a96A6bF48113b')
  })

  it('getCreate3Address', async () => {
    const deployer = new Wallet(config.deployer.privateKey, provider)
    const salt = encodeBytes32String('SKYBIT.ASIA TESTERC20..........')
    const address = await getCreate3Address(contractAddress, deployer.address, salt)
    expect(address).toEqual('0x107b624AC0a1723053D029e936C6DB30fc65d9a6')
  })

  it('verifyNotDeployedAt', async () => {
    const transactionSignerAddress = await deriveAddressOfSignerFromSig(txData)
    const address = getCreateAddress({from: transactionSignerAddress, nonce: txData.nonce})
    await expect(verifyNotDeployedAt(contractName, address, provider)).resolves.toBeUndefined()
    // await expect(verifyNotDeployedAt(contractName, address, provider)).rejects.toThrow(/Redeploy Attempt/)
    //fixme: compute contract address via create2, verify, then deploy contract, then verify again => should throw
  })
})

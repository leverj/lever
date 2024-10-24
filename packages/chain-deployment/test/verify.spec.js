import {Deploy, networks} from '@leverj/lever.chain-deployment'
import {configure} from '@leverj/lever.config'
import {CapturingLogger} from '@leverj/lever.common'
import {getAddress, JsonRpcProvider, Wallet} from 'ethers'
import {expect} from 'expect'
import {default as hardhat} from 'hardhat'
import nock from 'nock'
import {exec} from 'node:child_process'
import {rmSync} from 'node:fs'
import {setTimeout} from 'node:timers/promises'
import waitOn from 'wait-on'
import {postLoad, schema} from '../config.schema.js'

describe('verify', () => {
  let config

  beforeEach(async () => {
    config = await configure(schema, postLoad, {env: {NODE_ENV: 'test'}})
    rmSync(`${config.deploymentDir}/test`, {recursive: true, force: true})
  })

  it('attempt to verify unsupported chain', async () => {
    const chain = 'hardhat'
    config.contracts = {[chain]: {Bank: {params: [networks[chain].id, 'whatever']}}}
    const evm = exec(`npx hardhat node`)
    await waitOn({resources: [networks[chain].providerURL], timeout: 10000})
    try {
      const logger = new CapturingLogger()
      const deploy = Deploy.from(config, logger)
      await deploy.to(chain, {verify: true})
      expect(logger.warnings[0]).toEqual('verifying on hardhat chain (31337) is not supported')
    } finally {
      evm.kill()
      while (!evm.killed) await setTimeout(10)
    }
  })

  it.skip('verify supported chain', async () => {
    const chain = 'sepolia', chainId = Number(networks[chain].id)
    config.contracts = {[chain]: {Bank: {params: [networks[chain].id, 'whatever']}}}

    const signer = new Wallet(config.deployer.privateKey)
    const provider = new JsonRpcProvider(networks[chain].providerURL)
    const balance = await provider.getBalance(signer.address)
    console.log(`${getAddress(signer.address)} must have sufficient funds to deploy contract.\nbalance on ${chain} [${chainId}] is: ${balance}`)

    const logger = new CapturingLogger()
    const deploy = Deploy.from(config, logger)

    await deploy.to(chain)
    const address = deploy.store.get(chain).contracts.Bank.address

    nock(hardhat.config.sourcify.apiUrl).get(`/check-all-by-addresses`).reply(200, [
      {address, status: false},
    ])
    nock(hardhat.config.sourcify.apiUrl).post(`/verify`).reply(200, [
      {
        result: [
          {
            address,
            chainId,
            status: 'perfect',
            libraryMap: {},
          },
        ],
      },
    ])
    logger.clear()
    await deploy.to(chain, {verify: true})
    console.log('>'.repeat(50), logger.toObject())

    nock(hardhat.config.sourcify.apiUrl).get(`/check-all-by-addresses?addresses=${address}&chainIds=${chainId}`).reply(200, [
      {
        address,
        chainIds: [{chainId, status: 'perfect'}],
      },
    ])
    logger.clear()
    await deploy.to(chain, {verify: true})
    console.log('>'.repeat(50), logger.toObject())
  })
})

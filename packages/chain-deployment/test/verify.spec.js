import {Deploy, networks, verifiableChains} from '@leverj/lever.chain-deployment'
import {configure} from '@leverj/lever.config'
import {CapturingLogger} from '@leverj/lever.common'
import {expect} from 'expect'
import {default as hardhat} from 'hardhat'
import nock from 'nock'
import {exec} from 'node:child_process'
import {rmSync} from 'node:fs'
import {setTimeout} from 'node:timers/promises'
import waitOn from 'wait-on'
import {postLoad, schema} from '../config.schema.js'

describe('verify', () => {
  const chain = 'hardhat', chainId = 31337
  let config, evm

  before(async () => {
    config = await configure(schema, postLoad, {env: {NODE_ENV: 'test', CHAINS: [chain]}})
    config.contracts = {[chain]: {Bank: {params: [networks[chain].id, 'whatever']}}}
    evm = exec(`npx hardhat node`)
    await waitOn({resources: [config.networks[chain].providerURL], timeout: 10000})
    rmSync(`${config.deploymentDir}/test`, {recursive: true, force: true})
  })

  after(async () => {
    evm.kill()
    while (!evm.killed) await setTimeout(10)
  })

  it('deploy & verify', async () => {
    const logger = new CapturingLogger()
    const deploy = Deploy.from(config, logger)
    await deploy.to(chain)
    const address = deploy.store.get(chain).contracts.Bank.address

    expect(verifiableChains.has(chainId)).toBe(false)
    await deploy.to(chain, {verify: true})
    expect(logger.warnings[0]).toEqual('verifying on hardhat chain (31337) is not supported')

    try {
      verifiableChains.add(chainId)
      logger.clear()
      // console.log('Endpoint URL: '+hardhat.config.sourcify.apiUrl+`/check-all-by-addresses?addresses=${address}&chainIds=${chainId}`)
      // nock(hardhat.config.sourcify.apiUrl).get(`/check-all-by-addresses`).reply(200, [
      nock(hardhat.config.sourcify.apiUrl).get(`/check-all-by-addresses?addresses=${address}&chainIds=${chainId}`).reply(200, [
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
      await deploy.to(chain, {verify: true})
      // console.error(logger.errors[0])

      // nock(hardhat.config.sourcify.apiUrl).get(`/check-all-by-addresses?addresses=${address}&chainIds=${chainId}`).reply(200, [
      //   {
      //     address,
      //     chainIds: [{chainId, status: 'perfect'}],
      //   },
      // ])
    } finally {
      verifiableChains.delete(chainId)
    }
  })
})

import {Deploy, networks} from '@leverj/lever.chain-deployment'
import {configure} from '@leverj/lever.config'
import {CapturingLogger} from '@leverj/lever.common'
import {getAddress, JsonRpcProvider, Wallet} from 'ethers'
import {expect} from 'expect'
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
    logger.clear()

    await deploy.to(chain, {verify: true})
    expect(logger.errors).toHaveLength(0)

    logger.clear()
    await deploy.to(chain, {verify: true})
    expect(logger.errors).toHaveLength(0)
    console.log('>'.repeat(50), logger.toObject())
  })
})

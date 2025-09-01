import {Deploy, networks} from '@leverj/lever.chain-deployment'
import {postLoad, schema} from '@leverj/lever.chain-deployment/config.schema'
import {configure} from '@leverj/lever.config'
import {CapturingLogger} from '@leverj/lever.common'
import {getAddress, JsonRpcProvider, Wallet} from 'ethers'
import {expect} from 'expect'
import {merge} from 'lodash-es'
import {exec} from 'node:child_process'
import {rmSync} from 'node:fs'
import {setTimeout} from 'node:timers/promises'
import waitOn from 'wait-on'

describe('verify', () => {
  let config

  before(async () => {
    config = await configure(schema, postLoad, {env: {NODE_ENV: 'test'}})
    config.createContractsConstructors = (chain) => ({
      ToyMath: {},
      Bank: {
        libraries: ['ToyMath'],
        params: [networks[chain].id, 'whatever']
      }
    })
  })

  beforeEach(() => rmSync(`${config.deploymentDir}/test`, {recursive: true, force: true}))

  //fixme: Error HHE900: There was an error while resolving the project file "./undefined":
  it('attempt to verify unsupported chain', async () => {
    const chain = 'hardhat'
    const evm = exec(`npx hardhat node`)
    const network = networks[chain]
    await waitOn({resources: [network.providerURL], timeout: 10000})
    try {
      const logger = new CapturingLogger()
      const deploy = Deploy.from(merge(config, {logger}))
      await deploy.to(chain, {verify: true})
      expect(logger.warnings[0]).toEqual('verifying on chain 31337 is not supported')
    } finally {
      evm.kill()
      while (!evm.killed) await setTimeout(10)
    }
  })

 /**
  to try out contract verification, establish a local-test file at:
    .../lever/packages/chain-deployment/config/local-test.js
  with the private key of an account that has sufficient funds to deploy on the desired chain, using this template:
    export default {
      deployer: {
        privateKey: '???',
      },
    }
  */
  describe.skip('testnets', () => {
    it('verify supported chain', async () => {
      const chain = 'sepolia'
      const chainId = Number(networks[chain].id)
      const signer = new Wallet(config.deployer.privateKey)
      const provider = new JsonRpcProvider(networks[chain].providerURL)
      const balance = await provider.getBalance(signer.address)
      console.log(`${getAddress(signer.address)} must have sufficient funds to deploy contract.\nbalance on ${chain} [${chainId}] is: ${balance}`)

      const logger = new CapturingLogger()
      const deploy = Deploy.from(merge(config, {logger}))
      await deploy.to(chain, {verify: true})
      expect(logger.errors).toHaveLength(0)
      expect(logger.logs.includes('OK: Smart-contract verification started')).toBe(true)
    })

    it('verify unsupported chain', async () => {
      const chain = 'fantomTestnet'
      const chainId = Number(networks[chain].id)
      const signer = new Wallet(config.deployer.privateKey)
      const provider = new JsonRpcProvider(networks[chain].providerURL)
      const balance = await provider.getBalance(signer.address)
      console.log(`${getAddress(signer.address)} must have sufficient funds to deploy contract.\nbalance on ${chain} [${chainId}] is: ${balance}`)

      const logger = new CapturingLogger()
      const deploy = Deploy.from(merge(config, {logger}))
      await deploy.to(chain, {verify: true})
      expect(logger.errors).toHaveLength(0)
      expect(logger.warnings.includes(`verifying on chain ${chainId} is not supported`)).toBe(true)
    })
  })
})

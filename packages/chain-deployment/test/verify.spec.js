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
import info from '../package.json' with {type: 'json'}
import blockscoutExplorerUrls from './../src/chainscout-chains.json' with {type: 'json'}

describe('verify', () => {
  let config

  beforeEach(async () => {
    config = await configure(schema, postLoad, {env: {NODE_ENV: 'test'}})
    config.createContractsConstructors = (chain) => ({Bank: {params: [networks[chain].id, info.name]}})
    rmSync(`${config.deploymentDir}/test`, {recursive: true, force: true})
  })

  it.skip('list non-verifiable chains', async () => {
    const blockscout = new Set(Object.keys(blockscoutExplorerUrls))
    const exluded = Object.values(networks).filter(_ => !blockscout.has(_.id.toString()) && _.testnet).map(({id, label, blockExplorer}) => ({id, label, explorer: blockExplorer.url}))
    console.log(JSON.stringify(exluded.filter(_ => !!_.explorer), null, 2))
  })

  it('attempt to verify unsupported chain', async () => {
    const chain = 'hardhat'
    const evm = exec(`npx hardhat node`)
    await waitOn({resources: [networks[chain].providerURL], timeout: 10000})
    try {
      const logger = new CapturingLogger()
      const deploy = Deploy.from(config, logger)
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
      // const chain = 'holesky'
      const chainId = Number(networks[chain].id)
      const signer = new Wallet(config.deployer.privateKey)
      const provider = new JsonRpcProvider(networks[chain].providerURL)
      const balance = await provider.getBalance(signer.address)
      console.log(`${getAddress(signer.address)} must have sufficient funds to deploy contract.\nbalance on ${chain} [${chainId}] is: ${balance}`)

      const logger = new CapturingLogger()
      const deploy = Deploy.from(config, logger)
      await deploy.to(chain, {verify: true})
      expect(logger.errors).toHaveLength(0)
      expect(logger.logs.includes('OK: Smart-contract verification started')).toBe(true)
    })

    it('verify unsupported chain', async () => {
      const chain = 'fantomTestnet'
      // const chain = 'arbitrumSepolia'
      // const chain = 'avalancheFuji'
      // const chain = 'cronosTestnet'
      const chainId = Number(networks[chain].id)
      const signer = new Wallet(config.deployer.privateKey)
      const provider = new JsonRpcProvider(networks[chain].providerURL)
      const balance = await provider.getBalance(signer.address)
      console.log(`${getAddress(signer.address)} must have sufficient funds to deploy contract.\nbalance on ${chain} [${chainId}] is: ${balance}`)

      const logger = new CapturingLogger()
      const deploy = Deploy.from(config, logger)
      await deploy.to(chain, {verify: true})
      expect(logger.errors).toHaveLength(0)
      expect(logger.warnings.includes(`verifying on chain ${chainId} is not supported`)).toBe(true)
    })
  })
})

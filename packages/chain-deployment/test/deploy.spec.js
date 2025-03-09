import {Deploy, networks} from '@leverj/lever.chain-deployment'
import {isAddress} from 'ethers'
import {expect} from 'expect'
import {cloneDeep, zip} from 'lodash-es'
import {exec} from 'node:child_process'
import {rmSync} from 'node:fs'
import {setTimeout} from 'node:timers/promises'
import waitOn from 'wait-on'
import config from '../config.js'
import info from '../package.json' with {type: 'json'}

describe('deploy to multiple chains', () => {
  const chains = ['holesky', 'sepolia']
  let processes = []

  beforeEach(async () => {
    config.createContractsConstructors = (chain) => ({
      ToyMath: {},
      Bank: {
        libraries: ['ToyMath'],
        params: [networks[chain].id, info.name]
      },
      Gold: {type: 'ERC20Token'},
      USDC: {type: 'ERC20Token'},
      USDT: {type: 'ERC20Token'},
      WBTC: {type: 'ERC20Token'},
    })
    const {ports, providerURLs} = configureDeployment()
    processes = await launchEvms(ports, providerURLs)
    rmSync(`${config.deploymentDir}/test`, {recursive: true, force: true})
  })

  afterEach(async () => {
    for (let each of processes) {
      each.kill()
      while(!each.killed) await setTimeout(10)
    }
  })

  const configureDeployment = () => {
    const ports = chains.map((chain, i) => 8101 + i)
    const providerURLs = ports.map(port => `http://localhost:${port}`)
    zip(chains, providerURLs).forEach(([chain, providerURL]) => networks[chain].providerURL = providerURL)
    return {ports, providerURLs}
  }

  const launchEvms = async (ports, providerURLs) => {
    const processes = []
    for (let [chain, port, providerURL] of zip(chains, ports, providerURLs)) {
      const evm = exec(`npx hardhat node --config ${import.meta.dirname}/hardhat/${chain}.config.cjs --port ${port}`)
      await waitOn({resources: [providerURL], timeout: 10_000})
      processes.push(evm)
    }
    return processes
  }

  it('can deploy contracts to each chain', async () => {
    const deploy = Deploy.from(config)

    for (let chain of chains) {
      expect(deploy.store.get(chain)).not.toBeDefined()

      // first deploy; from scratch
      await deploy.to(chain)
      const deployed_initial = cloneDeep(deploy.store.get(chain).contracts)
      expect(deployed_initial.Bank).toBeDefined()
      expect(isAddress(deployed_initial.Bank.address)).toBe(true)
      expect(deployed_initial.Bank.blockCreated).toBeGreaterThan(0n)

      // deploy again, but not really; do not reset contract addresses!
      await deploy.to(chain, {reset: false})
      const redeployed_without_reset = cloneDeep(deploy.store.get(chain).contracts)
      expect(redeployed_without_reset.Bank).toMatchObject(deployed_initial.Bank)

      // redeploy again; force reset contract addresses!
      await deploy.to(chain, {reset: true})
      const redeployed_with_reset = cloneDeep(deploy.store.get(chain).contracts)
      expect(redeployed_with_reset.Bank).not.toMatchObject(deployed_initial.Bank)
    }
  })

  it('can deploy typed contracts', async () => {
    const tokens = ['Gold', 'USDC', 'USDT', 'WBTC']
    const deploy = Deploy.from(config)
    for (let chain of chains) {
      await deploy.to(chain)
      const deployed = deploy.store.get(chain).contracts
      for (let each of tokens) {
        expect(isAddress(deployed[each].address)).toBe(true)
        expect(deployed[each].type).toEqual('ERC20Token')
      }
      expect(deployed.Bank.type).toBeUndefined()
    }
  })
})

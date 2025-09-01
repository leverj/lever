import {blockscoutExplorerUrls, Deploy, networks, registerCustomNetwork} from '@leverj/lever.chain-deployment'
import {createHardhatConfig} from '@leverj/lever.chain-deployment/hardhat.help'
import {ensureExistsSync} from '@leverj/lever.common'
import {expect} from 'expect'
import {exec} from 'node:child_process'
import {rmSync, writeFileSync} from 'node:fs'
import {setTimeout} from 'node:timers/promises'
import waitOn from 'wait-on'
import config from '../config.js'

describe('networks', () => {
  const chain = 'custom', chainId = 9110119
  const port = 8081
  const providerURL = `http://localhost:${port}`, blockExplorerURL = `http://localhost:${port + 200}`
  const network_definition = {
    blockExplorers: {
      default: {
        name: 'Blockscout',
        url: blockExplorerURL,
        apiUrl: '',
      }
    },
    id: chainId,
    name: 'Customise Galore',
    nativeCurrency: {
      name: 'The Best Ever',
      symbol: 'BLA',
      decimals: 18,
    },
    rpcUrls: {
      default: {
        http: [providerURL]
      }
    },
    testnet: true,
  }
  const configDir = `${import.meta.dirname}/hardhat`
  const configFile = `${configDir}/${chain}.config.js`
  let processes = []

  before(() => {
    config.createContractsConstructors = (chain) => ({
      ToyMath: {},
      Bank: {
        libraries: ['ToyMath'],
        params: [networks[chain].id, 'whatever'],
      },
    })
    ensureExistsSync(configDir)
    writeFileSync(configFile, createHardhatConfig(chain, chainId))
  })

  beforeEach(() => rmSync(`${config.deploymentDir}/test`, {recursive: true, force: true}))

  afterEach(async () => {
    for (let each of processes) {
      each.kill()
      while(!each.killed) await setTimeout(10)
    }
  })

  after(() => rmSync(configDir, {recursive: true, force: true}))

  it('can register custom network', () => {
    expect(networks[chain]).toBeUndefined()
    expect(blockscoutExplorerUrls[chainId]).toBeUndefined()

    registerCustomNetwork(chain, network_definition)
    expect(networks[chain].providerURL).toEqual(providerURL)
    expect(networks[chain].blockExplorer.url).toEqual(blockExplorerURL)
    expect(blockscoutExplorerUrls[chainId].explorers[0].url).toEqual(blockExplorerURL)
  })

  it('can deploy to registered custom network', async () => {
    registerCustomNetwork(chain, network_definition)
    processes.push(exec(`npx hardhat node --config ${configFile} --port ${port}`))
    await waitOn({resources: [providerURL], timeout: 10_000})
    const deploy = Deploy.from(config)
    await deploy.to(chain)
    const deployed = deploy.store.get(chain).contracts
    expect(deployed.Bank).toBeDefined()
    expect(deployed.Bank.blockCreated).toBeGreaterThan(0n)
  })
})

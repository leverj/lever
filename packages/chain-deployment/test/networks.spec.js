import {blockscoutExplorerUrls, Deploy, networks, registerCustomNetwork} from '@leverj/lever.chain-deployment'
import {killProcess} from '@leverj/lever.common'
import {expect} from 'expect'
import {last} from 'lodash-es'
import {rmSync} from 'node:fs'
import waitOn from 'wait-on'
import config from '../config.js'
import {configureContracts, startHardhatNode, writeHardhatConfigAt} from './help.js'

configureContracts(config)

describe('networks', () => {
  const port = 8081
  const chain = 'custom', chainId = port
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
  const deploymentDir = `${config.deploymentDir}/test`
  let processes = []

  beforeEach(() => rmSync(deploymentDir, {recursive: true, force: true}))
  afterEach(async () => { for (let each of processes) await killProcess(each) })

  it('can register custom network', () => {
    expect(networks[chain]).toBeUndefined()
    expect(blockscoutExplorerUrls[chainId]).toBeUndefined()

    registerCustomNetwork(chain, network_definition)
    expect(networks[chain].providerURL).toEqual(providerURL)
    expect(networks[chain].blockExplorer.url).toEqual(blockExplorerURL)
    expect(blockscoutExplorerUrls[chainId].explorers[0].url).toEqual(blockExplorerURL)
  })

  it('networks cardinality', async () => {
    {
      const mainnets = Object.values(networks).filter(_ => !_.testnet)
      expect(mainnets.length).toBeGreaterThanOrEqual(374)
      const highest = last(mainnets.map(_ => _.id).sort())
      expect(highest).toBeLessThan(BigInt(10 ** 9))
      expect(highest).toEqual(9999999n)
    }
    {
      const testnets = Object.values(networks).filter(_ => _.testnet)
      expect(testnets.length).toBeGreaterThanOrEqual(283)
      const highest = last(testnets.map(_ => _.id).sort())
      expect(highest).toBeLessThan(BigInt(10 ** 9))
      expect(highest).toEqual(999999999n)
    }
  })

  it('can deploy to registered custom network', async () => {
    registerCustomNetwork(chain, network_definition)
    const configFile = writeHardhatConfigAt([chain], deploymentDir)
    processes.push(startHardhatNode(chain, port, configFile))
    await waitOn({resources: [providerURL], timeout: 10_000})
    const deploy = Deploy.from(config)
    await deploy.to(chain)
    const deployed = deploy.store.get(chain).contracts
    expect(deployed.Bank).toBeDefined()
    expect(deployed.Bank.blockCreated).toBeGreaterThan(0n)
  })
})

import {Map} from 'immutable'
import {execSync} from 'node:child_process'
import {writeFileSync} from 'node:fs'
import {inspect} from 'util'
import * as chains from 'viem/chains'

const targetDir = `${import.meta.dirname}/../src`

const chainsById = Map(chains).mapEntries(([label, _]) => [_.id, label]).toJS()
delete chainsById.undefined
const networks = {}
for (const [label, network] of Object.entries(chains)) {
  const {id, name, nativeCurrency, rpcUrls, blockExplorers, testnet = false} = network
  const providerURL = rpcUrls.default.http[0]
  const blockExplorer = blockExplorers?.default || {}
  const contracts = {}
  networks[label] = {id: BigInt(id), label, name, nativeCurrency, providerURL, blockExplorer, contracts, testnet: testnet || label === 'hardhat' || label === 'localhost'}
}
writeFileSync(`${targetDir}/networks.js`,
`export const networks = ${inspect(networks, {showHidden: false, compact: false, depth: null})}\n
export const chainsById = ${inspect(chainsById, {showHidden: false, compact: false, depth: null})}\n`)

execSync('curl https://raw.githubusercontent.com/blockscout/chainscout/main/data/chains.json -o ../src/chainscout-chains.json')

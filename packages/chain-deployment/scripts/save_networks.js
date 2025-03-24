import {Map} from 'immutable'
import {execSync} from 'node:child_process'
import {writeFileSync} from 'node:fs'
import {inspect} from 'util'
import * as chains from 'viem/chains'

const targetDir = `${import.meta.dirname}/../src`

const chainsById = Map(chains).mapEntries(([chain, _]) => [_.id, chain]).toJS()
delete chainsById.undefined
const networks = {}
for (const [chain, network] of Object.entries(chains)) {
  const {id, name, rpcUrls, blockExplorers} = network
  const providerURL = rpcUrls.default.http[0]
  const blockExplorer = blockExplorers?.default || {}
  const contracts = {}
  const testnet = !!network.testnet || chain === 'hardhat' || chain === 'localhost'
  networks[chain] = {id: BigInt(id), chain, name, providerURL, blockExplorer, contracts, testnet}
}
//fixme: eliminate the need to generate networks.js
writeFileSync(`${targetDir}/networks.js`,
`export const networks = ${inspect(networks, {showHidden: false, compact: false, depth: null})}\n
export const chainsById = ${inspect(chainsById, {showHidden: false, compact: false, depth: null})}\n`)

execSync('curl https://raw.githubusercontent.com/blockscout/chainscout/main/data/chains.json -o ../src/chainscout-chains.json')

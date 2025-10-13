import {config, network} from 'hardhat'
import {networks, registerCustomNetwork} from '../Deploy.js'
import {ensureExistsSync} from '@leverj/lever.common'
import {writeFileSync} from 'node:fs'
import {exec} from 'node:child_process'

export {artifacts, config, network} from 'hardhat'

const {mnemonic, path} = config.networks.default.accounts, phrase = await mnemonic.get()

export const connectToNetwork = async (params) => {
  const {ethers, networkConfig: {chainId}, networkHelpers: evm} = params ?
    await network.connect({name: params.chain, url: params.providerURL, chainId: params.chainId}) :
    await network.connect()
  const {deployContract, getSigners, getContractAt, HDNodeWallet, Mnemonic, provider} = ethers
  const accounts = await getSigners()
  const wallets = accounts.map((value, i) => HDNodeWallet.fromMnemonic(Mnemonic.fromPhrase(phrase), `${path}/${i}`))
  return {
    ethers, chainId, evm,
    deployContract, getContractAt, provider,
    accounts, wallets,
  }
}

export const createCustomNetwork = (
  id,
  chain,
  name = chain.charAt(0).toUpperCase() + chain.slice(1).replaceAll('_', '-'),
  rpcUrl = `http://localhost:${id}`,
  blockExplorerUrl = `http://localhost:${id + 4000}`
) => ({
    id,
    name,
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: {
      default: {
        http: [rpcUrl],
      },
    },
    blockExplorers: {
      default: {
        name: `${name} Scout`,
        url: blockExplorerUrl,
        apiUrl: '',
      },
    },
    testnet: true,
  }
)

export const writeHardhatConfigAt = (chains, dir) => {
  ensureExistsSync(dir)
  const networks_source = chains.map(_ =>
    `    ${_}: {
    |      chainId: ${networks[_].id},
    |      type: 'edr-simulated',
    |      chainType: 'l1',
    |      gasPrice: 0,
    |      initialBaseFeePerGas: 0,
    |    },`.replaceAll(/[ \t]*\|/g, '')).join('\n')
  const source =
    `const {default: config} = await import(\`\${process.env.PWD}/hardhat.config.js\`)
    |export default Object.assign(config, {
    |  networks: {
    |${networks_source}
    |  }
    |})`.replaceAll(/[ \t]*\|/g, '')
  const file = `${dir}/hardhat.config.js`
  writeFileSync(file, source)
  return file
}

export const establishChainsAt = (chains, dir) => {
  chains.forEach((chain, i) => registerCustomNetwork(chain, createCustomNetwork(8101 + i, chain)))
  return writeHardhatConfigAt(chains, dir)
}

export const startHardhatNode = (chain, port, configFile, debug) => {
  const args = [
    '--network', chain,
    '--config', configFile,
    '--port', port,
    debug ? '--show-stack-traces' : '',
  ]
  const child = exec(`npx hardhat node ${args.join(' ')}`)
  if (debug) {
    child.stderr.setEncoding('utf8')
    child.stderr.on('data', _ => process.stderr.write(`[${chain}] ${_}`))
  }
  return child
}

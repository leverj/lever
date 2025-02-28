import blockscoutExplorerUrls_ from './chainscout-chains.json' with {type: 'json'}
import {networks as networks_} from './networks.js'

export const blockscoutExplorerUrls = Object.assign({}, blockscoutExplorerUrls_)
export const networks = Object.assign({}, networks_)
export const addBlockScoutExplorerUrl = (id, explorerUrl) => blockscoutExplorerUrls[id] = explorerUrl
export const addNetwork = (name, network) => networks[name] = network

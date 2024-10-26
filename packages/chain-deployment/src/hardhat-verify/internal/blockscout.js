import {HARDHAT_NETWORK_NAME} from 'hardhat/plugins'
import {ChainConfigNotFoundError, HardhatNetworkNotSupportedError} from './errors.js'
import {builtinChains} from './blockscout.chain-config.js'

/**
 * Blockscout verification provider for verifying smart contracts.
 */
export class Blockscout {

  /**
   * Create a new instance of the Blockscout verification provider.
   * @param apiUrl - The Blockscout API URL, e.g. https://eth.blockscout.com/api.
   * @param browserUrl - The Blockscout browser URL, e.g. https://eth.blockscout.com.
   */
  constructor(apiUrl, browserUrl) {
  }

  static async getCurrentChainConfig(
    networkName,
    ethereumProvider,
    customChains,
  ) {
    const currentChainId = parseInt(
      await ethereumProvider.send('eth_chainId'),
      16,
    )

    const currentChainConfig = [
      // custom chains has higher precedence than builtin chains
      ...[...customChains].reverse(), // the last entry has higher precedence
      ...builtinChains,
    ].find(({chainId}) => chainId === currentChainId)

    if (currentChainConfig === undefined) {
      if (networkName === HARDHAT_NETWORK_NAME) {
        throw new HardhatNetworkNotSupportedError()
      }

      throw new ChainConfigNotFoundError(currentChainId)
    }

    return currentChainConfig
  }

  static fromChainConfig(chainConfig) {
    const apiUrl = chainConfig.urls.apiURL
    const browserUrl = chainConfig.urls.browserURL.trim().replace(/\/$/, '')

    return new Blockscout(apiUrl, browserUrl)
  }

  /**
   * Get the Blockscout URL for viewing a contract's details.
   * @param address - The address of the smart contract.
   * @returns The URL to view the contract on Blockscout's website.
   */
  getContractUrl(address) {
    return `${this.browserUrl}/address/${address}#code`
  }
}

import {HARDHAT_NETWORK_NAME} from 'hardhat/plugins'

import {ChainConfigNotFoundError, HardhatNetworkNotSupportedError} from './errors.js'
import {builtinChains} from './blockscout.chain-config.js'

import {Etherscan} from './etherscan.js'

/**
 * Blockscout verification provider for verifying smart contracts.
 */
export class Blockscout {
  // private _etherscan;

  /**
   * Create a new instance of the Blockscout verification provider.
   * @param apiUrl - The Blockscout API URL, e.g. https://eth.blockscout.com/api.
   * @param browserUrl - The Blockscout browser URL, e.g. https://eth.blockscout.com.
   */
  constructor(apiUrl, browserUrl) {
    this._etherscan = new Etherscan('api_key', apiUrl, browserUrl)
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
   * Check if a smart contract is verified on Blockscout.
   * @link https://docs.blockscout.com/for-users/api/rpc-endpoints/contract#get-contract-source-code-for-a-verified-contract
   * @param address - The address of the smart contract.
   * @returns True if the contract is verified, false otherwise.
   * @throws {NetworkRequestError} if there is an error on the request.
   * @throws {ContractVerificationInvalidStatusCodeError} if the API returns an invalid status code.
   */
  async isVerified(address) {
    return this._etherscan.isVerified(address)
  }

  /**
   * Verify a smart contract on Blockscout.
   * @link https://docs.blockscout.com/for-users/api/rpc-endpoints/contract#verify-a-contract-with-standard-input-json-file
   * @param contractAddress - The address of the smart contract to verify.
   * @param sourceCode - The source code of the smart contract.
   * @param contractName - The name of the smart contract, e.g. "contracts/Sample.sol:MyContract"
   * @param compilerVersion - The version of the Solidity compiler used, e.g. `v0.8.19+commit.7dd6d404`
   * @returns A promise that resolves to an `BlockscoutResponse` object.
   * @throws {NetworkRequestError} if there is an error on the request.
   * @throws {ContractVerificationInvalidStatusCodeError} if the API returns an invalid status code.
   * @throws {ContractVerificationMissingBytecodeError} if the bytecode is not found on the block explorer.
   * @throws {ContractAlreadyVerifiedError} if the contract is already verified.
   * @throws {HardhatVerifyError} if the response status is not OK.
   */
  async verify(
    contractAddress,
    sourceCode,
    contractName,
    compilerVersion,
  ) {
    const etherscanResponse = await this._etherscan.verify(
      contractAddress,
      sourceCode,
      contractName,
      compilerVersion,
      '',
    )

    return new BlockscoutResponse(
      etherscanResponse.status,
      etherscanResponse.message,
    )
  }

  /**
   * Get the verification status of a smart contract from Blockscout.
   * This method performs polling of the verification status if it's pending.
   * @link https://docs.blockscout.com/for-users/api/rpc-endpoints/contract#return-status-of-a-verification-attempt
   * @param guid - The verification GUID to check.
   * @returns A promise that resolves to an `BlockscoutResponse` object.
   * @throws {NetworkRequestError} if there is an error on the request.
   * @throws {ContractStatusPollingInvalidStatusCodeError} if the API returns an invalid status code.
   * @throws {ContractStatusPollingResponseNotOkError} if the response status is not OK.
   */
  async getVerificationStatus(
    guid,
  ) {
    const etherscanResponse = await this._etherscan.getVerificationStatus(guid)

    return new BlockscoutResponse(
      etherscanResponse.status,
      etherscanResponse.message,
    )
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

class BlockscoutResponse {
  // readonly status;
  // readonly message;

  constructor(status, message) {
    this.status = status
    this.message = message
  }

  isPending() {
    return this.message === 'Pending in queue'
  }

  isFailure() {
    return this.message === 'Fail - Unable to verify'
  }

  isSuccess() {
    return this.message === 'Pass - Verified'
  }

  isAlreadyVerified() {
    return (
      // returned by blockscout
      this.message.startsWith('Smart-contract already verified') ||
      // returned by etherscan
      this.message.startsWith('Contract source code already verified') ||
      this.message.startsWith('Already Verified')
    )
  }

  isOk() {
    return this.status === 1
  }
}

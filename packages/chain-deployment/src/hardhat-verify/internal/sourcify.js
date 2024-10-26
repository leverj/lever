import {
  ContractVerificationInvalidStatusCodeError,
  NetworkRequestError,
  VerificationAPIUnexpectedMessageError,
} from './errors.js'
import {isSuccessStatusCode, sendGetRequest, sendPostRequest} from './undici.js'
import {ContractStatus} from './sourcify.types.js'

export class Sourcify {
  constructor(
    chainId,
    apiUrl,
    browserUrl,
  ) {
  }

  // https://sourcify.dev/server/api-docs/#/Repository/get_check_all_by_addresses
  async isVerified(address) {
    const parameters = new URLSearchParams({
      addresses: address,
      chainIds: `${this.chainId}`,
    })

    const url = new URL(`${this.apiUrl}/check-all-by-addresses`)
    url.search = parameters.toString()

    let response
    let json
    try {
      response = await sendGetRequest(url)
      json = await response.body.json()
    } catch (e) {
      throw new NetworkRequestError(e)
    }

    if (!isSuccessStatusCode(response.statusCode)) {
      throw new ContractVerificationInvalidStatusCodeError(
        url.toString(),
        response.statusCode,
        JSON.stringify(json),
      )
    }

    if (!Array.isArray(json)) {
      throw new VerificationAPIUnexpectedMessageError(
        `Unexpected response body: ${JSON.stringify(json)}`,
      )
    }

    const contract = json.find(
      (match) => match.address.toLowerCase() === address.toLowerCase(),
    )
    if (contract === undefined) {
      return false
    }

    if ('status' in contract && contract.status === ContractStatus.NOT_FOUND) {
      return false
    }

    if ('chainIds' in contract && contract.chainIds.length === 1) {
      const {status} = contract.chainIds[0]
      if (
        status === ContractStatus.PERFECT ||
        status === ContractStatus.PARTIAL
      ) {
        return status
      }
    }

    throw new VerificationAPIUnexpectedMessageError(
      `Unexpected response body: ${JSON.stringify(json)}`,
    )
  }

  // https://sourcify.dev/server/api-docs/#/Stateless%20Verification/post_verify
  async verify(address, files, chosenContract) {
    const parameters = {
      address,
      files,
      chain: `${this.chainId}`,
    }

    if (chosenContract !== undefined) {
      parameters.chosenContract = `${chosenContract}`
    }

    const url = new URL(this.apiUrl)

    let response
    let json
    try {
      response = await sendPostRequest(url, JSON.stringify(parameters), {'Content-Type': 'application/json'})
      json = await response.body.json()
    } catch (e) {
      throw new NetworkRequestError(e)
    }

    if (!isSuccessStatusCode(response.statusCode)) {
      throw new ContractVerificationInvalidStatusCodeError(
        url.toString(),
        response.statusCode,
        JSON.stringify(json),
      )
    }

    const sourcifyResponse = new SourcifyResponse(json)

    if (!sourcifyResponse.isOk()) {
      throw new VerificationAPIUnexpectedMessageError(
        `Verify response is not ok: ${JSON.stringify(json)}`,
      )
    }

    return sourcifyResponse
  }

  getContractUrl(
    address,
    contractStatus,
  ) {
    const matchType =
      contractStatus === ContractStatus.PERFECT
        ? 'full_match'
        : 'partial_match'
    return `${this.browserUrl}/contracts/${matchType}/${this.chainId}/${address}/`
  }
}

class SourcifyResponse {
  constructor(response) {
    if ('error' in response) {
      this.error = response.error
    } else if (response.result[0].status === ContractStatus.PERFECT) {
      this.status = ContractStatus.PERFECT
    } else if (response.result[0].status === ContractStatus.PARTIAL) {
      this.status = ContractStatus.PARTIAL
    }
  }

  isPending() {
    return false
  }

  isFailure() {
    return this.error !== undefined
  }

  isSuccess() {
    return this.error === undefined
  }

  isOk() {
    return (
      this.status === ContractStatus.PERFECT ||
      this.status === ContractStatus.PARTIAL
    )
  }
}

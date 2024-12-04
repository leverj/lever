import {logger} from '@leverj/lever.common/logger'
import axios from 'axios'
import {Authenticator} from './Authenticator.js'
import {calibrateREST, getNonce} from './nonce.js'

const methodMap = {
  GET: 'get',
  POST: 'post',
  DELETE: 'delete',
  PUT: 'put',
  OPTIONS: 'options',
  PATCH: 'patch',
}

function concat(headers = {}, loginlessHeaders = {}) {
  Object.keys(headers).forEach(_ => loginlessHeaders[_] = headers[_])
  return loginlessHeaders
}


export class Rest {
  constructor(baseURI, authType, account) {
    this.baseURI = baseURI
    this.account = account
    this.authenticator = new Authenticator(authType)
  }

  setAccount(account) { this.account = account }

  getAuthorization(method, url, data) {
    const nonce = getNonce()
    return {
      Nonce: nonce,
      Authorization: this.account && this.authenticator.getAuthorization(this.account.id, this.account.secret, method, url, data, nonce),
    }
  }

  computeHeaders(method, url, data) {
    return Object.assign(this.getAuthorization(method, url, data), {['Content-Type']: 'application/json'})
  }

  async rest(method, url, headers, data, retry) {
    const updated = concat(headers, this.computeHeaders(method, url, data))
    try {
      const params = data ? [this.baseURI + url, data, {headers: updated}] : [this.baseURI + url, {headers: updated}]
      const result = await axios[methodMap[method]](...params)
      calibrateREST(Date.now(), result.headers && result.headers['server-time'], method)
      return result.data
    } catch (e) {
      const status = e.response && e.response.status
      if ((status === 401) && this.account && !retry) {
        return this.handleNonceErrorWithOPTIONS(method, url, headers, data)
      } else {
        logger.error(e)
        throw (e.response ? Error(e.response.data.error) : e)
      }
    }
  }

  async handleNonceErrorWithOPTIONS(method, url, headers, data) {
    await this.rest('OPTIONS', url, headers, undefined)
    return this.rest(method, url, headers, data, true)
  }

  post(url, headers, data) { return this.rest('POST', url, headers, data) }

  put(url, headers, data) { return this.rest('PUT', url, headers, data) }

  get(url, headers) { return this.rest('GET', url, headers, undefined) }

  del(url, headers) { return this.rest('DELETE', url, headers, undefined) }

  patch(url, headers, data) { return this.rest('PATCH', url, headers, data) }
}

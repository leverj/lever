import {affirm, logger} from '@leverj/lever.common'
import Cache from 'ephemeral-cache'
import {assign} from 'lodash-es'
import {io} from 'socket.io-client'
import {Authenticator, SIGN} from './Authenticator.js'
import * as nonce from './nonce.js'

export class EnhancedSocket {
  constructor(baseUrl, account = undefined, errorHandler = () => {}, options = {}, authType = SIGN) {
    this.authenticator = new Authenticator(authType)
    this.cache = Cache()
    this.setAccount(account)
    this.baseUrl = baseUrl
    this.socket = io(baseUrl, Object.assign({rejectUnauthorized: true, transports: ['polling', 'websocket']}, options))
    this.socket.on('server-time', (serverTimestamp) => nonce.calibrate(Date.now(), serverTimestamp))
    this.errorHandler = errorHandler
  }

  emit(topic, message) { return this.socket.emit(topic, message) }
  on(topic, method) { return this.socket.on(topic, method) }
  removeAllListeners(topic) { return this.socket.removeAllListeners(topic) }

  setAccount(account) {
    if (account) {
      affirm(account.apiKey, 'Missing apiKey in account', 401)
      affirm(account.id, 'Missing accountId in account', 401)
      affirm(account.secret, 'Missing secret in account', 401)
      this.account = account
    }
  }

  reconnect() { this.socket = assign(this.socket, io(this.baseUrl, {rejectUnauthorized: true})) }

  send(request) {
    const {method, uri, body, retry} = request
    const headers = request.headers || {}
    const params = request.params || {}
    affirm(typeof method === 'string', 'Invalid method', 401)
    affirm(typeof uri === 'string', 'Invalid uri', 401)
    const requestNonce = nonce.getNonce()
    const {id, secret} = this.account
    const authorization = this.account && this.authenticator.getAuthorization(id, secret, method, uri, {body, params}, requestNonce)
    headers.Authorization = authorization
    headers.Nonce = requestNonce
    const data = {method, uri, headers, body, params, retry}
    this.cache.put(authorization, data)
    this.socket.emit(`${method} ${uri}`, data)
  }

  onAuthError(message) {
    if (!this.account) return
    if (! message?.data?.headers?.Authorization) return logger.warn('*** WARNING: Ignoring invalid server message: ', message)
    if (message.data.retry) return this.errorHandler(message.error)
    nonce.calibrate(Date.now(), message['server-time'])
    const auth = message.data.headers.Authorization
    const data = this.cache.get(auth)
    if (!data) return logger.warn('*** WARNING: Skipping retry for invalid Authorization', auth)
    this.socket.send({
      method: data.method,
      uri: data.uri,
      headers: data.headers,
      body: data.body,
      params: data.params,
      retry: true,
    })
  }

  register() { this.GET('/register') }
  unregister() { this.GET('/unregister') }
  GET(uri) {
    if (this.account) this.send({
      method: 'GET',
      uri,
      body: {accountId: this.account.id, apiKey: this.account.apiKey}
    })
  }
}

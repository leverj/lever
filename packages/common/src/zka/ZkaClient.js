import {EnhancedSocket} from './EnhancedSocket.js'
import {Rest} from './Rest.js'

/** usage:
 - create zka with base url and api.v1 path
 const baseUrl = 'https://your-domain'
 const apiPath = '/api.v1/v1'
 const zka = ZkaClient(baseUrl, apiPath, authType)

 - provide accountDd, apiKey and secret to support rest and socket communication with server
 zka.init(accountId, apiKey, secret)

 - use rest call
 zka.rest.get('/account')
 */

export function ZkaClient(origin, apiPath, authType, options) {
  return {
    rest: new Rest(origin + apiPath, authType),
    socket: new EnhancedSocket(origin, undefined, undefined, options, authType),
    init: function (accountId, apiKey, secret) {
      this.account = {id: accountId, apiKey, secret}
      this.rest.setAccount(this.account)
      this.socket.setAccount(this.account)
    },
  }
}

import {EnhancedSocket} from '@leverj/lever.zka'
import {expect} from 'expect'
import sinon from 'sinon'

describe('EnhancedSocket', () => {
  const account = {
    id: '0x4CCaeF6429A7809e3D3FF1F5E1480F0A815Ea646',
    secret: '0x06e0f6f2e4070376784bb74b1d84ae32e0bce1c2b7cb80cf60037938ebcdf7ba',
    apiKey: '0x4CCaeF6429A7809e3D3FF1F5E1480F0A815Ea645'
  }
  const socket = new EnhancedSocket('http://localhost', account)
  let stub

  afterEach(() => stub.restore())

  it('should send message with authorization headers', () => {
    stub = sinon.stub(socket, 'emit').callsFake(function (topic, message) {
      expect(message.headers.Authorization).toBeDefined()
      expect(message.headers.Nonce).toBeDefined()
    })
    socket.send({method: 'GET', uri: '/'})
  })

  it('should calibrate and re-send on socketError', () => {
    let auth
    stub = sinon.stub(socket, 'emit').callsFake(function (topic, message) {
      expect(auth = message.headers.Authorization).toBeDefined()
      expect(message.headers.Nonce).toBeDefined()
    })
    socket.send({method: 'GET', uri: '/'})
    socket.onAuthError({data: {method: 'GET', uri: '/', retry: false, headers: {Authorization: auth}}})
  })

  it('should ignore invalid server message', () => {
    stub = sinon.stub(socket, 'emit').callsFake(function (topic, message) {
      expect(message.headers.Authorization).toBeDefined()
      expect(message.headers.Nonce).toBeDefined()
    })
    expect(() => socket.onAuthError({})).not.toThrow()
    expect(() => socket.onAuthError({data: {}})).not.toThrow()
    expect(() => socket.onAuthError({data: {headers: {}}})).not.toThrow()
    expect(() => socket.onAuthError({data: {headers: {Authorization: true}}})).not.toThrow()
  })
})

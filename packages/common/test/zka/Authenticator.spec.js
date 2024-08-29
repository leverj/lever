import {expect} from 'expect'
import {authenticate, Authenticator} from '@leverj/common/zka'


describe('Authenticator', () => {

  describe('auth', () => {
    const auth = [
      {
        accountid: '0x4CCaeF6429A7809e3D3FF1F5E1480F0A815Ea645',
        method: 'POST',
        uri: '/api/greetings',
        body: { key: 'key', value: 'value'},
        nonce: 1452154049511,
        received: 1452154049599,
        result: 'SIGN 0x4CCaeF6429A7809e3D3FF1F5E1480F0A815Ea645',
      },
      {
        secret: '0x06e0f6f2e4070376784bb74b1d84ae32e0bce1c2b7cb80cf60037938ebcdf7ba',
        apiKey: '0x4CCaeF6429A7809e3D3FF1F5E1480F0A815Ea645',
        accountid: '0x4CCaeF6429A7809e3D3FF1F5E1480F0A815Ea646',
        method: 'POST',
        uri: '/api/greetings',
        body: { key: 'key', value: 'value'},
        nonce: 1452154049511,
        received: 1452154049599,
        result: 'SIGN 0x4CCaeF6429A7809e3D3FF1F5E1480F0A815Ea646.0x4CCaeF6429A7809e3D3FF1F5E1480F0A815Ea645.27.0x03ad7c5e860a5a9cc003e2e907388422ea98e443566869378b2e445402c83133.0x769b1ffa06c56d52244fb565d8420d059d834a9c36c96532c9bcb00c99d5e1b5',
      },
    ]
    const authenticator = new Authenticator()
    auth.forEach(function (test, index) {
      const {accountid, secret, method, uri, body, nonce, result} = test
      it(`${index}: should able to generate AUTH header`, () => {
        const signature = authenticator.getAuthorization(accountid, secret, method, uri, body, nonce)
        expect(signature).toEqual(result)
      })
    })
    auth.forEach(function (test, index) {
      const {apiKey, result, method, uri, body, nonce, received} = test
      it(`${index}: Requests with proper Authorization should pass`, () => {
        authenticate(apiKey, result, method, uri, body, nonce, received)
      })
    })
  })

  it('Requests without Authorization should fail', () => {
    const apiKey = '0x4CCaeF6429A7809e3D3FF1F5E1480F0A815Ea645'
    const method = 'POST'
    const uri = '/api/greetings'
    const body = {key: 'key', value: 'value'}
    const nonce = 1452154049511
    const received = 1452154049599
    const result = 'SIGN 0x4CCaeF6429A7809e3D3FF1F5E1480F0A815Ea645.0x4CCaeF6429A7809e3D3FF1F5E1480F0A815Ea645'
    expect(() => authenticate(apiKey, result, method, uri, body, nonce, received))
      .toThrow(/Invalid auth header/)
  })

  it('Requests with improper Authorization should fail', () => {
    const apiKey = '0x4CCaeF6429A7809e3D3FF1F5E1480F0A815Ea645'
    const method = 'POST'
    const uri = '/api/greetings'
    const body = {key: 'key', value: 'value'}
    const nonce = 1452154049511
    const received = 1452154049599
    const result = 'SIGN 0x4CCaeF6429A7809e3D3FF1F5E1480F0A815Ea646.0x4CCaeF6429A7809e3D3FF1F5E1480F0A815Ea645.27.0x03ad7c5e860a5a9cc003e2e907388422ea98e443566869378b2e445402c83133.0x769b1ffa06c56d52244fb565d8420d059d834a9c36c96532c9bcb00c99d5e1b4'
    expect(() => authenticate(apiKey, result, method, uri, body, nonce, received))
      .toThrow(/Authentication failed. SIGN mismatch/)
  })

  it('Requests that are outside nonce tolerance should fail', () => {
    const apiKey = '0x4CCaeF6429A7809e3D3FF1F5E1480F0A815Ea645'
    const method = 'POST'
    const uri = '/api/greetings'
    const body = {key: 'key', value: 'value'}
    const nonce = 1452154049511
    const received = 1472154049599
    const result = 'SIGN 0x4CCaeF6429A7809e3D3FF1F5E1480F0A815Ea646.0x4CCaeF6429A7809e3D3FF1F5E1480F0A815Ea645.27.0x03ad7c5e860a5a9cc003e2e907388422ea98e443566869378b2e445402c83133.0x769b1ffa06c56d52244fb565d8420d059d834a9c36c96532c9bcb00c99d5e1b5'
    expect(() => authenticate(apiKey, result, method, uri, body, nonce, received))
      .toThrow(/Authentication failed. Nonce 1452154049511 stale by 20000000088ms/)
  })
})

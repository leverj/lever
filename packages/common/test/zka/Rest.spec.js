import axios from 'axios'
import {expect} from 'expect'
import sinon from 'sinon'
import {Rest, SIGN} from '@leverj/common/zka'


describe('Rest', () => {
  const account = {
    id: '0x4CCaeF6429A7809e3D3FF1F5E1480F0A815Ea646',
    secret: '0x06e0f6f2e4070376784bb74b1d84ae32e0bce1c2b7cb80cf60037938ebcdf7ba'
  }

  it('should make call with Authorization and Nonce', async () => {
    const stub = sinon.stub(axios, 'get').callsFake(async function (uri, {headers}) {
      expect(headers.Authorization).toBeDefined()
      expect(headers.Nonce).toBeDefined()
      return {data: true}
    })
    const rest = new Rest('http://localhost', SIGN, account)
    expect(await rest.get('/')).toBe(true)
    expect(stub.called).toBe(true)
    stub.restore()
  })

  it('should call OPTIONS method when encountering 401', async () => {
    let first = true
    const opts = sinon.stub(axios, 'options').callsFake(async function (uri, headers) {
      return {data: true}
    })
    const stub = sinon.stub(axios, 'put').callsFake(async function (uri, headers) {
      if (first) {
        first = false
        const e = Error()
        e.response = {status: 401, data: {error: 'some error'}}
        throw e
      } else {
        return {data: true}
      }
    })
    const rest = new Rest('http://localhost', SIGN, account)
    await rest.put('/')
    expect(opts.called).toBe(true)
    stub.restore()
    opts.restore()
  })
})

import * as nonce from '@leverj/zka'
import {expect} from 'expect'

describe('nonce', () => {
  afterEach(() => nonce.reset())

  it('Nonce should use current time by default', () => {
    expect(Math.abs(nonce.getNonce() - Date.now()) < 100).toBe(true)
  })

  it('Nonce should use adjusted clock when clocks out of sync', () => {
    {
      const clientTimestamp = Date.now()
      const serverTimestamp = clientTimestamp - 2000
      nonce.calibrateREST(clientTimestamp, serverTimestamp, 'PUT')
      expect(Math.abs(nonce.getNonce() - serverTimestamp) < 100).toBe(true)
    }
    {
      const clientTimestamp = Date.now()
      const serverTimestamp = clientTimestamp + 2000
      nonce.calibrateREST(clientTimestamp, serverTimestamp, 'PUT')
      expect(Math.abs(nonce.getNonce() - serverTimestamp) < 100).toBe(true)
    }
  })

  it('Should calibrate for first call', () => {
    const clientTimestamp = Date.now()
    const serverTimestamp = clientTimestamp - 2000
    nonce.calibrateREST(clientTimestamp, serverTimestamp, 'GET')
    expect(Math.abs(nonce.getNonce() - serverTimestamp) < 100).toBe(true)
  })
})

import {NONCE, ZkaClient} from '@leverj/lever.zka'
import {expect} from 'expect'

describe('ZkaClient', () => {
  it('can creat a zka client', () => {
    const account = {id: 'xyz', apiKey: 'whatever', secret: 'shhh!'}
    const zka = ZkaClient('', '/api/v1', NONCE, {path: '/socket.io'})
    zka.init(account.id, account.apiKey, account.secret)
    expect(zka.account).toMatchObject(account)
    expect(zka.rest.account).toMatchObject(account)
    expect(zka.socket.account).toMatchObject(account)
  })
})

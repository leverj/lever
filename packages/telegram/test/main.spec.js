import {Telegram, telegram} from '@leverj/lever.telegram'
import sinon from 'sinon'
import {expect} from 'expect'
import axios from 'axios'

describe('Telegram', () => {
  afterEach(() => { sinon.restore() })
  it('should be able to send message on telegram with a new instance', async () => {
    let stubCount = 0
    sinon.stub(axios, 'post').callsFake((url, data, config) => {
      stubCount++
      expect(data.text).toEqual('Test message')
      expect(data.chat_id).toEqual('123456789')
      return Promise.resolve({data: {ok: true, result: {message_id: 1}}})
    })
    const telegram = new Telegram('123456789', '123456789:ABCDEFghijklmnopQRStuvWXYZ', 'Test App')
    await telegram.sendText('Test message')
    expect(stubCount).toBe(1)
  })
  it('should be able to send message on telegram on environment set config with a new instance, when chat is is ot provided in constructor', async () => {
    let stubCount = 0
    sinon.stub(axios, 'post').callsFake((url, data, config) => {
      stubCount++
      expect(data.text).toEqual('Test message with env')
      expect(data.chat_id).toEqual(process.env.TELEGRAM_CHAT_ID)
      return Promise.resolve({data: {ok: true, result: {message_id: 1}}})
    })
    const telegram = new Telegram()
    await telegram.sendText('Test message with env')
    expect(stubCount).toBe(1)
  })
})

describe('Telegram singleton', () => {
  after(() => {
    sinon.restore()
  })
  it('should be able to send message on telegram with the singleton instance', async () => {
    let stubCount = 0
    sinon.stub(axios, 'post').callsFake((url, data, config) => {
      stubCount++
      expect(data.text).toEqual('Singleton test message')
      return Promise.resolve({data: {ok: true, result: {message_id: 1}}})
    })
    await telegram.sendText('Singleton test message')
    expect(stubCount).toBe(1)
  })
})

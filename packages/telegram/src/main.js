import axios from 'axios'
import {logger} from '@leverj/lever.common/logger'

const CHAT_ID = typeof process !== 'undefined' && process.env.TELEGRAM_CHAT_ID
const TOKEN_ID = typeof process !== 'undefined' && process.env.TELEGRAM_BOT_TOKEN
const APP_INFO = typeof process !== 'undefined' && process.env.TELEGRAM_APP_INFO


export class Telegram {
  constructor(chatId = CHAT_ID, tokenId = TOKEN_ID, appInfo = APP_INFO) {
    this.chatId = chatId
    this.tokenId = tokenId
    this.appInfo = appInfo
    if (!this.chatId || !this.tokenId) logger.warn('Telegram bot is not configured, messages will not be sent')
  }

  /**
   * Sends a message to the configured Telegram chat.
   * @deprecated use `logError` instead
   * @param {string} message - The message to send.
   * @param {Error} [error] - An optional error object to include in the message.
   */
  async post(message, error) { await this.logError(message, error) }

  async logError(message, error) {
    const text = `${this.appInfo}\n ${message}\n${error ? error.stack : ''}`
    await this.sendText(text).catch(logger.error)
  }

  async sendText(text) {
    if (!this.chatId || !this.tokenId) throw Error('TELEGRAM MESSAGE:' + text)
    const url = `https://api.telegram.org/bot${this.tokenId}/sendMessage`
    const headers = {'content-type': 'application/json'}
    const data = {chat_id: this.chatId, text, parse_mode: 'MarkdownV2'}
    return await axios.post(url, data, {headers})
  }
}

export const telegram = new Telegram()
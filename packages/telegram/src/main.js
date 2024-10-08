import axios from 'axios'
import {logger} from '@leverj/common'

const CHAT_ID = typeof process !== 'undefined' && process.env.TELEGRAM_CHAT_ID
const TOKEN_ID = typeof process !== 'undefined' && process.env.TELEGRAM_BOT_TOKEN
const APP_INFO = typeof process !== 'undefined' && process.env.TELEGRAM_APP_INFO
const msg = (message, error) => `${APP_INFO}\n ${message}\n${error ? error.stack : ''}`


export const main = {
  post: async (message, error) => {
    if (!CHAT_ID || !TOKEN_ID) return logger.log('TELEGRAM MESSAGE', msg(message, error))
    const url = `https://api.telegram.org/bot${TOKEN_ID}/sendMessage`
    const headers = {'content-type': 'application/json'}
    const data = {chat_id: CHAT_ID, text: msg(message, error)}
    await axios.post(url, data, {headers}).catch(logger.error)
  }
}

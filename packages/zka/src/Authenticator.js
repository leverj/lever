import {affirm} from '@leverj/lever.common/affirm'
import {computeAddress, getBytes, hashMessage, recoverAddress, SigningKey} from 'ethers'

export const SIGN = 'SIGN'
export const NONCE = 'NONCE'

const defaultLatencyTolerance = 10

const authTypes = {
  SIGN: true,
  NONCE: true,
}

const hashedMessage = {
  SIGN: (method, uri, body, nonce) => JSON.stringify({method, uri, body, nonce}),
  NONCE: (method, uri, body, nonce) => nonce.toString(),
}

function hashPayload(method, uri, body, nonce, authType) {
  const message = hashedMessage[authType](method, uri, body, nonce)
  return hashMessage(message)
}

export function parseAuth(auth) {
  affirm(auth, 'Invalid auth header', 401)
  const authParts = auth.split(' ')
  affirm(authTypes[authParts[0]] && authParts.length === 2, 'Invalid auth header', 401)
  const auths = authParts[1].split('.')
  affirm(auths.length === 5, 'Invalid auth header', 401)
  return [authParts[0], auths[0], auths[1], auths[2], auths[3], auths[4]]
}

export function authenticateSignature(apiKey, auth, method, uri, body, nonce) {
  const [authType, , authApiKey, v, r, s] = parseAuth(auth)
  affirm(authApiKey === apiKey, 'Authentication failed. SIGN mismatch', 401)
  const digest = hashPayload(method, uri, body, nonce, authType)
  const recoveredApiKey = recoverAddress(getBytes(digest), {v, r, s})
  affirm(recoveredApiKey === apiKey, 'Authentication failed. SIGN mismatch', 401)
  return true
}

export function validateNonce(receivedTime, nonce, nonceLatencyTolerance) {
  affirm(nonce && !isNaN(nonce), 'Authentication failed. Invalid Nonce ' + nonce, 401)
  affirm(!nonceLatencyTolerance || typeof nonceLatencyTolerance === 'number', `Nonce tolerance should be numeric: ${nonceLatencyTolerance}`, 401)
  const diff = receivedTime - nonce
  const nonceWithInGracePeriod = Math.abs(receivedTime - nonce) <= (nonceLatencyTolerance ?? defaultLatencyTolerance) * 1000
  affirm(nonceWithInGracePeriod, `Authentication failed. Nonce ${nonce} stale by ${diff}ms`, 401)
}

export function authenticate(apiKey, auth, method, uri, body, nonce, receivedTime, nonceLatencyTolerance) {
  if (!apiKey) return true
  authenticateSignature(apiKey, auth, method, uri, body, nonce)
  validateNonce(receivedTime, nonce, nonceLatencyTolerance)
}

export class Authenticator {
  constructor(authType = SIGN) {
    affirm(authTypes[authType], 'Invalid auth type.', 401)
    this.authType = authType
  }
  getAuthorization(accountId, secret, method, uri, body, nonce) {
    affirm(accountId, 'Need accountId to generate authorization token', 401)
    if (!secret) return `${this.authType} ${accountId}`
    const digest = hashPayload(method, uri, body, nonce, this.authType)
    const {v, r, s} = new SigningKey(secret).sign(digest)
    const apiKey = computeAddress(secret)
    return `${this.authType} ${accountId}.${apiKey}.${v}.${r}.${s}`
  }
}

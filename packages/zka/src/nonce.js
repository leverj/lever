const forNonce = {
  POST: true,
  PUT: true,
  DELETE: true,
  OPTIONS: true,
  TRACE: true,
}

let offset = undefined

export function calibrateREST(clientTimestamp, serverTimestamp, method) {
  if (forNonce[method] || offset === undefined) calibrate(clientTimestamp, serverTimestamp)
}

export function calibrate(clientTimestamp, serverTimestamp) {
  if (clientTimestamp && serverTimestamp) offset = clientTimestamp - serverTimestamp
}

export function getNonce() {
  return Date.now() - (offset ?? 0)
}

export function reset() {
  offset = undefined
}

export async function sendGetRequest(
  url,
) {
  const {request} = await import('undici')
  const dispatcher = getDispatcher()

  return request(url, {
    dispatcher,
    method: 'GET',
  })
}

export async function sendPostRequest(
  url,
  body,
  headers = {},
) {
  const {request} = await import('undici')
  const dispatcher = getDispatcher()

  return request(url, {
    dispatcher,
    method: 'POST',
    headers,
    body,
  })
}

function getDispatcher() {
  const {ProxyAgent, getGlobalDispatcher} =
    require('undici')
  if (process.env.http_proxy !== undefined) {
    return new ProxyAgent(process.env.http_proxy)
  }

  return getGlobalDispatcher()
}

export function isSuccessStatusCode(statusCode) {
  return statusCode >= 200 && statusCode <= 299
}

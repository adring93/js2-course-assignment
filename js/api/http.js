import { getToken, getApiKey } from '../utils/storage.js'

/**
 * Make an HTTP request with authentication and API key headers.
 * @param {string} url - The endpoint to call.
 * @param {RequestInit} [options] - Fetch options (method, body, headers, etc).
 * @returns {Promise<any>} The parsed JSON response.
 * @throws {Error} If the response is not ok.
 */
export async function http(url, options = {}) {
  const headers = new Headers(options.headers || {})
  headers.set('Accept', 'application/json')
  if (options.body && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json')
  }

  const token = getToken()
  if (token) headers.set('Authorization', `Bearer ${token}`)

  const apiKey = getApiKey()
  if (apiKey) headers.set('X-Noroff-API-Key', apiKey)

  const res = await fetch(url, { ...options, headers })
  let data = null
  try { data = await res.json() } catch {}

  if (!res.ok) {
    const msg = data?.errors?.[0]?.message || data?.message || `HTTP ${res.status}`
    throw Object.assign(new Error(msg), { status: res.status, data })
  }
  return data
}

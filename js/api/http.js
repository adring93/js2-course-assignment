import { getToken, getApiKey } from '../utils/storage.js'

/**
 * JSON fetch with JWT + API-key headers and normalized errors.
 * @param {string} url
 * @param {RequestInit} [options]
 * @returns {Promise<any>}
 */
export async function http(url, options = {}) {
  const headers = new Headers(options.headers || {})
  headers.set('Accept', 'application/json')
  if (options.body && !headers.has('Content-Type')) headers.set('Content-Type', 'application/json')

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

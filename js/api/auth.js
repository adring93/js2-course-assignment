import { AUTH_URL } from './config.js'
import { http } from './http.js'
import { saveAuth, clearAuth, saveApiKey, getApiKey } from '../utils/storage.js'

export async function registerUser(payload) {
  return await http(`${AUTH_URL}/register`, { method: 'POST', body: JSON.stringify(payload) })
}

/**
 * @param {{email:string,password:string}} payload
 * @returns {Promise<any>}
 */
export async function loginUser(payload) {
  const data = await http(`${AUTH_URL}/login`, { method: 'POST', body: JSON.stringify(payload) })
  const accessToken = data?.data?.accessToken
  const name = data?.data?.name || data?.data?.user?.name
  saveAuth({ accessToken, name })
  await ensureApiKey()
  return data
}

export function logoutUser() {
  clearAuth()
  localStorage.removeItem('apiKey')
  location.href = '/pages/login.html'
}

export async function ensureApiKey() {
  if (getApiKey()) return
  const res = await http(`${AUTH_URL}/create-api-key`, { method: 'POST' })
  const key = res?.data?.key
  if (key) saveApiKey(key)
}

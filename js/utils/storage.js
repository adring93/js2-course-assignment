const TOKEN_KEY = 'token'
const NAME_KEY = 'profileName'
const API_KEY = 'apiKey'

export function saveAuth({ accessToken, name }) {
  if (accessToken) localStorage.setItem(TOKEN_KEY, accessToken)
  if (name) localStorage.setItem(NAME_KEY, name)
}

export function getToken() { return localStorage.getItem(TOKEN_KEY) }
export function getProfileName() { return localStorage.getItem(NAME_KEY) }

export function clearAuth() {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(NAME_KEY)
}

export function saveApiKey(key) { localStorage.setItem(API_KEY, key) }
export function getApiKey() { return localStorage.getItem(API_KEY) }

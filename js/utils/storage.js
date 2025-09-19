const TOKEN_KEY = 'token';
const NAME_KEY = 'profileName';

export function saveAuth({ accessToken, name }) {
  if (accessToken) localStorage.setItem(TOKEN_KEY, accessToken);
  if (name) localStorage.setItem(NAME_KEY, name);
}
export function getToken() { return localStorage.getItem(TOKEN_KEY); }
export function getProfileName() { return localStorage.getItem(NAME_KEY); }
export function clearAuth() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(NAME_KEY);
}

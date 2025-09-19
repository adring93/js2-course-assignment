import { AUTH_URL } from './config.js';
import { http } from './http.js';

export async function registerUser(payload) {
  return http(`${AUTH_URL}/register`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function loginUser(payload) {
  return http(`${AUTH_URL}/login`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

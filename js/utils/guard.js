import { getToken } from './storage.js'

export function requireAuth() {
  if (!getToken()) location.href = '/pages/login.html'
}

export function redirectIfAuthed(to = '/pages/feed.html') {
  if (getToken()) location.href = to
}

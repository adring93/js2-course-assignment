import { PROFILES_URL } from './config.js'
import { http } from './http.js'

export function getProfile(name) {
  const sp = new URLSearchParams({ _followers:'true', _following:'true' })
  return http(`${PROFILES_URL}/${encodeURIComponent(name)}?${sp.toString()}`)
}

export function listUserPosts(name) {
  const sp = new URLSearchParams({ _author:'true', _comments:'true', _reactions:'true' })
  return http(`${PROFILES_URL}/${encodeURIComponent(name)}/posts?${sp.toString()}`)
}

export function followProfile(name) {
  return http(`${PROFILES_URL}/${encodeURIComponent(name)}/follow`, { method:'POST' })
}

export function unfollowProfile(name) {
  return http(`${PROFILES_URL}/${encodeURIComponent(name)}/follow`, { method:'DELETE' })
}

export function updateAvatar(name, url) {
  return http(`${PROFILES_URL}/${encodeURIComponent(name)}`, {
    method:'PUT',
    body: JSON.stringify({ avatar: { url } })
  })
}

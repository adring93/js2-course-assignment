import { POSTS_URL } from './config.js'
import { http } from './http.js'

/**
 * List posts with optional text search.
 * @param {string} [query]
 * @returns {Promise<{data:Array}>}
 */
export async function listPosts(query = '') {
  const sp = new URLSearchParams({
    _author: 'true',
    _reactions: 'true',
    _comments: 'true',
  })
  if (query) sp.set('q', query)
  return await http(`${POSTS_URL}?${sp.toString()}`)
}

export async function getPost(id) {
  return await http(`${POSTS_URL}/${id}?_author=true&_reactions=true&_comments=true`)
}

export async function createPost(payload) {
  return await http(POSTS_URL, {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export async function updatePost(id, payload) {
  return await http(`${POSTS_URL}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  })
}

export async function deletePost(id) {
  return await http(`${POSTS_URL}/${id}`, {
    method: 'DELETE',
  })
}

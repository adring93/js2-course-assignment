import { POSTS_URL } from './config.js'
import { http } from './http.js'

/**
 * Get all posts with optional search query.
 * @param {string} [query] - Search text
 * @returns {Promise<object>} API response with posts
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

/**
 * Get a single post by ID.
 * @param {number|string} id - Post ID
 * @returns {Promise<object>} API response with the post
 */
export async function getPost(id) {
  return await http(`${POSTS_URL}/${id}?_author=true&_reactions=true&_comments=true`)
}

/**
 * Update an existing post.
 * @param {number|string} id - Post ID
 * @param {object} payload - Updated post data
 * @returns {Promise<object>} API response with updated post
 */
export async function updatePost(id, payload) {
  return await http(`${POSTS_URL}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  })
}

export async function createPost(payload) {
  return await http(POSTS_URL, {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export async function deletePost(id) {
  return await http(`${POSTS_URL}/${id}`, {
    method: 'DELETE',
  })
}

import { listPosts, createPost } from '../api/post.js'
import { requireAuth } from '../utils/guard.js'
import { setupNav } from './setupNav.js'
import { getProfileName } from '../utils/storage.js'

requireAuth()
setupNav()

const postList = document.querySelector('#post-list')
const msg = document.querySelector('#msg')
const search = document.querySelector('#search')
const createForm = document.querySelector('#create-post')
const me = getProfileName()

async function renderPosts(query = '') {
  msg.textContent = 'Loading...'
  try {
    const res = await listPosts('')
    const posts = res.data || []
    const q = (query || '').toLowerCase()

    const filtered = q
      ? posts.filter(({ title, body, author }) =>
          (title || '').toLowerCase().includes(q) ||
          (body || '').toLowerCase().includes(q) ||
          ((author?.name) || '').toLowerCase().includes(q)
        )
      : posts

    postList.innerHTML = filtered.length
      ? filtered.map(p => {
          const { id, title, body, media, author, created } = p
          const authorName = author?.name || ''
          const isOwner = authorName.toLowerCase() === (me || '').toLowerCase()
          return `
            <li class="post-card">
              <h3><a href="post.html?id=${id}">${escapeHtml(title || 'Untitled')}</a></h3>
              ${imageTag(media)}
              ${body ? `<p>${escapeHtml(body)}</p>` : ''}
              <div style="display:flex;gap:.5rem;align-items:center;margin-top:.4rem">
                <small>by <a href="profile.html?name=${encodeURIComponent(authorName)}">${authorName || 'unknown'}</a> • ${new Date(created).toLocaleString()}</small>
                ${isOwner ? `<a class="btn" href="post.html?id=${id}">Edit</a>` : ''}
              </div>
            </li>
          `
        }).join('')
      : '<li>No posts match your search.</li>'

    msg.textContent = ''
  } catch (e) {
    msg.textContent = e.message
  }
}

createForm?.addEventListener('submit', async (e) => {
  e.preventDefault()
  const fd = new FormData(createForm)
  const mediaUrl = fd.get('mediaUrl')?.trim()
  const mediaAlt = fd.get('mediaAlt')?.trim()
  const payload = { title: fd.get('title'), body: fd.get('body') }
  if (mediaUrl) payload.media = { url: mediaUrl, alt: mediaAlt || '' }
  try {
    await createPost(payload)
    createForm.reset()
    renderPosts(search?.value.trim() || '')
  } catch (e) {
    msg.textContent = e.message
  }
})

search?.addEventListener('input', (e) => renderPosts(e.target.value.trim()))
document.addEventListener('DOMContentLoaded', () => renderPosts())

function imageTag(m){
  const url = m?.url?.trim()
  if(!url) return ''
  return `<img src="${url}" alt="${escapeHtml(m?.alt || '')}" referrerpolicy="no-referrer" onerror="this.remove()">`
}
function escapeHtml(s) {
  return String(s||'').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))
}

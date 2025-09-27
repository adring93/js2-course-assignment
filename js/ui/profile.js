import { requireAuth } from '../utils/guard.js'
import { getProfileName } from '../utils/storage.js'
import { getProfile, listUserPosts, followProfile, unfollowProfile, updateAvatar } from '../api/profile.js'
import { setupNav } from './setupNav.js'

requireAuth()
setupNav()

const info = document.querySelector('#profile-info')
const list = document.querySelector('#profile-posts')
const msg = document.querySelector('#msg')
const avatarForm = document.querySelector('#avatar-form')

const paramName = new URLSearchParams(location.search).get('name')
const myName = getProfileName()
const name = paramName || myName
if (!name) location.href = 'login.html'

render()

async function render() {
  msg.textContent = 'Loading...'
  try {
    const [pRes, postsRes] = await Promise.all([getProfile(name), listUserPosts(name)])
    const p = pRes.data
    const posts = Array.isArray(postsRes?.data) ? postsRes.data : []
    const isMe = name === myName
    const iFollow = !isMe && !!p.followers?.find(f => f.name === myName)

    info.innerHTML = `
      <h2>${p.name}</h2>
      ${p.avatar?.url ? `<img src="${p.avatar.url}" alt="${escapeHtml(p.avatar.alt || p.name)}" width="120" />` : ''}
      <p>Followers: ${p._count?.followers ?? 0} • Following: ${p._count?.following ?? 0}</p>
      ${p.bio ? `<p>${escapeHtml(p.bio)}</p>` : ''}
      ${isMe ? '' : `<div style="margin-top:.6rem"><button id="follow">${iFollow ? 'Unfollow' : 'Follow'}</button></div>`}
    `

    avatarForm.style.display = isMe ? '' : 'none'

    list.innerHTML = posts.length
      ? posts.map(postItem).join('')
      : '<li>No posts yet</li>'

    if (!isMe) {
      document.querySelector('#follow')?.addEventListener('click', async (ev) => {
        const btn = ev.currentTarget
        try {
          if (btn.textContent === 'Follow') { await followProfile(p.name); btn.textContent = 'Unfollow' }
          else { await unfollowProfile(p.name); btn.textContent = 'Follow' }
        } catch (e) { msg.textContent = e.message }
      })
    }

    msg.textContent = ''
  } catch (e) { msg.textContent = e.message }
}

avatarForm.addEventListener('submit', async (e) => {
  e.preventDefault()
  const fd = new FormData(avatarForm)
  const url = fd.get('avatarUrl')?.trim()
  if (!url) return
  try {
    await updateAvatar(myName, url)
    msg.textContent = '✅ Avatar updated'
    render()
  } catch (e) {
    msg.textContent = e.message
  }
})

function postItem(p) {
  return `
    <li class="post-card">
      <h3><a href="post.html?id=${p.id}">${escapeHtml(p.title || 'Untitled')}</a></h3>
      <small>${new Date(p.created).toLocaleString()}</small>
    </li>
  `
}

function escapeHtml(s){
  return String(s||'').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))
}

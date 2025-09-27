import { getPost, updatePost, deletePost } from '../api/post.js'
import { getProfile, followProfile, unfollowProfile } from '../api/profile.js'
import { requireAuth } from '../utils/guard.js'
import { getProfileName } from '../utils/storage.js'
import { setupNav } from './setupNav.js'

requireAuth()
setupNav()

const container = document.querySelector('#post-container')
const msg = document.querySelector('#msg')
const id = new URLSearchParams(location.search).get('id')
const me = getProfileName()

let state = { post:null, isOwner:false, author:'', iFollow:false, saved:false }

if (!id) { container.innerHTML = '<p>No post id in URL</p>'; throw new Error('no id') }
init()

async function init() {
  msg.textContent = 'Loading...'
  try {
    const { data: p } = await getPost(id)
    const author = p.author?.name || 'unknown'
    const isOwner = (author || '').toLowerCase() === (me || '').toLowerCase()
    let iFollow = false
    if (!isOwner && author !== 'unknown') {
      const prof = await getProfile(author)
      iFollow = !!prof?.data?.followers?.find(f => f.name === me)
    }
    state = { post: p, isOwner, author, iFollow, saved: isSaved(id) }
    paint(false)
    msg.textContent = ''
  } catch (e) {
    msg.textContent = e.message
  }
}

function paint(editing){
  const p = state.post
  const author = state.author
  const isOwner = state.isOwner
  const saved = state.saved
  const iFollow = state.iFollow

  container.innerHTML = editing ? `
    <form id="edit-form" class="container" style="display:grid;gap:.6rem">
      <label>Title <input id="title" value="${escapeAttr(p.title || '')}" /></label>
      <label>Body <textarea id="body">${escapeHtml(p.body || '')}</textarea></label>
      <label>Image URL <input id="mediaUrl" value="${p.media?.url ? escapeAttr(p.media.url) : ''}" placeholder="https://..." /></label>
      <label>Image alt <input id="mediaAlt" value="${p.media?.alt ? escapeAttr(p.media.alt) : ''}" placeholder="Alt text" /></label>
      <div style="display:flex;gap:.5rem;flex-wrap:wrap">
        <button type="submit" id="save-edit">Save</button>
        <button type="button" id="cancel-edit">Cancel</button>
        <button type="button" id="delete">Delete</button>
      </div>
    </form>
  ` : `
    <h1>${escapeHtml(p.title || 'Untitled')}</h1>
    <small>by <a href="profile.html?name=${encodeURIComponent(author)}">${author}</a> • ${new Date(p.created).toLocaleString()}</small>
    ${imageTag(p.media)}
    ${p.body ? `<p>${escapeHtml(p.body)}</p>` : ''}
    <div style="margin-top:.8rem;display:flex;gap:.5rem;flex-wrap:wrap">
      ${isOwner ? `<button id="edit-btn">Edit</button><button id="delete">Delete</button>` :
      `<button id="follow">${iFollow ? 'Unfollow' : 'Follow'}</button>
       <button id="save-post">${saved ? 'Saved ✓' : 'Save'}</button>`}
    </div>
  `

  if (editing) {
    document.querySelector('#edit-form').onsubmit = async (e) => {
      e.preventDefault()
      try {
        const title = document.querySelector('#title').value.trim()
        const body = document.querySelector('#body').value.trim()
        const mediaUrl = document.querySelector('#mediaUrl').value.trim()
        const mediaAlt = document.querySelector('#mediaAlt').value.trim()
        const payload = { title, body }
        if (mediaUrl) payload.media = { url: mediaUrl, alt: mediaAlt || '' }
        await updatePost(id, payload)
        msg.textContent = '✅ Updated'
        await init()
      } catch (e) { msg.textContent = e.message }
    }
    document.querySelector('#cancel-edit').onclick = () => paint(false)
    document.querySelector('#delete').onclick = onDelete
  } else {
    if (state.isOwner) {
      document.querySelector('#edit-btn').onclick = () => paint(true)
      document.querySelector('#delete').onclick = onDelete
    } else {
      document.querySelector('#follow').onclick = async (ev) => {
        const btn = ev.currentTarget
        try {
          if (btn.textContent === 'Follow') { await followProfile(author); btn.textContent = 'Unfollow'; state.iFollow = true }
          else { await unfollowProfile(author); btn.textContent = 'Follow'; state.iFollow = false }
        } catch (e) { msg.textContent = e.message }
      }
      document.querySelector('#save-post').onclick = (ev) => {
        state.saved = toggleSave(id, state.post)
        ev.currentTarget.textContent = state.saved ? 'Saved ✓' : 'Save'
      }
    }
  }
}

async function onDelete(){
  if (!confirm('Delete this post?')) return
  try { await deletePost(id); location.href = 'feed.html' }
  catch (e) { msg.textContent = e.message }
}

function imageTag(m){
  const url = m?.url?.trim()
  if(!url) return ''
  return `<img src="${url}" alt="${escapeHtml(m?.alt || '')}" referrerpolicy="no-referrer" onerror="this.remove()">`
}

function escapeHtml(s){ return String(s||'').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])) }
function escapeAttr(s){ return String(s||'').replace(/"/g,'&quot;') }
function getSaved(){ try { return JSON.parse(localStorage.getItem('savedPosts')||'[]') } catch { return [] } }
function isSaved(pid){ return getSaved().some(x => String(x.id) === String(pid)) }
function toggleSave(pid, post){
  const list = getSaved()
  const idx = list.findIndex(x => String(x.id) === String(pid))
  if (idx >= 0) { list.splice(idx,1); localStorage.setItem('savedPosts', JSON.stringify(list)); return false }
  list.push({ id: pid, title: post.title, author: post.author?.name || '' })
  localStorage.setItem('savedPosts', JSON.stringify(list))
  return true
}

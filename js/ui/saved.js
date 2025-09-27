import { requireAuth } from '../utils/guard.js'
import { setupNav } from './setupNav.js'

requireAuth()
setupNav()

const list = document.querySelector('#saved-list')
const msg = document.querySelector('#msg')
const countEl = document.querySelector('#count')
const clearBtn = document.querySelector('#clear')

render()

clearBtn.onclick = () => {
  if (!confirm('Remove all saved posts?')) return
  localStorage.removeItem('savedPosts')
  render()
}

function getSaved(){
  try { return JSON.parse(localStorage.getItem('savedPosts') || '[]') }
  catch { return [] }
}

function render(){
  const items = getSaved()
  countEl.textContent = items.length ? `${items.length} saved` : ''
  if(!items.length){
    list.innerHTML = ''
    msg.textContent = 'No saved posts yet.'
    return
  }
  msg.textContent = ''
  list.innerHTML = items.map(p => `
    <li class="post-card saved-card" data-id="${p.id}">
      <h3><a href="post.html?id=${p.id}">${escapeHtml(p.title || 'Untitled')}</a></h3>
      <small>${p.author ? `by ${escapeHtml(p.author)}` : ''}</small>
      <div style="margin-top:.6rem">
        <button class="remove">Remove</button>
      </div>
    </li>
  `).join('')

  list.querySelectorAll('.remove').forEach(btn => {
    btn.onclick = () => remove(btn.closest('li')?.dataset.id)
  })
}

function remove(id){
  const items = getSaved().filter(x => String(x.id) !== String(id))
  localStorage.setItem('savedPosts', JSON.stringify(items))
  render()
}

function escapeHtml(s){
  return String(s||'').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))
}

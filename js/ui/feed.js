import { SOCIAL_URL } from '../api/config.js';
import { http } from '../api/http.js';
import { getToken } from '../utils/storage.js';
import { requireAuth } from '../utils/guard.js';
requireAuth();

function auth() {
  const t = getToken();
  return t ? { Authorization: `Bearer ${t}` } : {};
}

async function loadPosts() {
  const main = document.querySelector('main');
  main.innerHTML = '<h2>Loading posts…</h2>';
  try {
    const posts = await http(`${SOCIAL_URL}/posts`, { headers: auth() });

    if (!Array.isArray(posts) || posts.length === 0) {
      main.innerHTML = '<p>No posts yet.</p>';
      return;
    }

    const html = posts.map(p => `
      <article class="post">
        <h3>${p.title || 'Untitled'}</h3>
        <p>${p.body ? p.body.slice(0, 160) + (p.body.length > 160 ? '…' : '') : ''}</p>
        <p><small>By ${p.owner?.name || 'unknown'} • ${new Date(p.created).toLocaleString()}</small></p>
        <a href="post.html?id=${p.id}">Open</a>
      </article>
    `).join('');

    main.innerHTML = `<h1>Feed</h1><div id="posts">${html}</div>`;
  } catch (e) {
    console.error(e);
    main.innerHTML = '<h2>Failed to load posts</h2>';
  }
}

document.addEventListener('DOMContentLoaded', loadPosts);

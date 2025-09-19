import { SOCIAL_URL } from '../api/config.js';
import { http } from '../api/http.js';
import { getToken } from '../utils/storage.js';

document.addEventListener('DOMContentLoaded', async () => {
  const main = document.querySelector('main');
  main.innerHTML = '<h2>Loading posts...</h2>';

  try {
    const token = getToken();
    const posts = await http(`${SOCIAL_URL}/posts`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log(posts); // Debug: see the posts in DevTools

    if (!Array.isArray(posts)) {
      main.innerHTML = '<h2>No posts found</h2>';
      return;
    }
    const list = posts
      .map(
        (p) => `
        <article class="post">
          <h3>${p.title || 'Untitled'}</h3>
          <p>${
            p.body
              ? p.body.slice(0, 150) + (p.body.length > 150 ? '…' : '')
              : ''
          }</p>
          <p><small>By ${p.owner?.name || p.owner} • ${new Date(
          p.created
        ).toLocaleString()}</small></p>
          <a href="post.html?id=${p.id}">Open</a>
        </article>
      `
      )
      .join('');

    main.innerHTML = `<h2>Feed</h2><div id="posts">${list}</div>`;
  } catch (error) {
    console.error(error);
    main.innerHTML = '<h2>Failed to load posts</h2>';
  }
});

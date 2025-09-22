import { SOCIAL_URL } from '../api/config.js';
import { http } from '../api/http.js';
import { getToken } from '../utils/storage.js';
import { requireAuth } from '../utils/guard.js';
requireAuth();

function getQueryParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

document.addEventListener('DOMContentLoaded', async () => {
  const main = document.querySelector('main');
  const id = getQueryParam('id');

  if (!id) {
    main.innerHTML = '<h2>No post id provided in URL</h2>';
    return;
  }

  main.innerHTML = '<h2>Loading post...</h2>';

  try {
    const token = getToken();
    const post = await http(`${SOCIAL_URL}/posts/${id}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });

    console.log(post); 

    main.innerHTML = `
      <article>
        <h1>${post.title || 'Untitled'}</h1>
        <p><small>By ${post.owner?.name || post.owner} • ${new Date(
      post.created
    ).toLocaleString()}</small></p>
        <div>${post.body || ''}</div>
      </article>
    `;
  } catch (error) {
    console.error(error);
    main.innerHTML = '<h2>Failed to load post</h2>';
  }
});

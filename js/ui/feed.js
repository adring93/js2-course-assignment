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

    console.log(posts); // use debugging: see the posts in DevTools!!!!!!!!!!!!!!!!!!!
    main.innerHTML = `<h2>Feed loaded</h2><p>Found ${posts.length} posts</p>`;
  } catch (error) {
    console.error(error);
    main.innerHTML = '<h2>Failed to load posts</h2>';
  }
});

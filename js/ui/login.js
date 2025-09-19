import { loginUser } from '../api/auth.js';
import { saveAuth } from '../utils/storage.js';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#loginForm');
  const message = document.querySelector('#message');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const credentials = {
      email: formData.get('email'),
      password: formData.get('password'),
    };

    try {
      const result = await loginUser(credentials);
      saveAuth(result); // store token + username
      message.textContent = `✅ Logged in as ${result.name}`;
      window.location.href = 'feed.html';
    } catch (error) {
      console.error(error);
      message.textContent = `❌ Login failed: ${error.data?.errors?.[0]?.message || error}`;
    }
  });
});

import { loginUser } from '../api/auth.js';
import { saveAuth } from '../utils/storage.js';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#loginForm');
  const message = document.querySelector('#message');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    message.textContent = 'Logging in...';

    const formData = new FormData(form);
    const payload = {
      email: formData.get('email'),
      password: formData.get('password'),
    };

    try {
      const response = await loginUser(payload);

      if (response.errors) {
        message.textContent = response.errors[0].message;
        return;
      }

      saveAuth(response);
      message.textContent = 'Login successful! Redirecting...';
      setTimeout(() => {
        window.location.href = 'feed.html';
      }, 1000);
    } catch (error) {
      console.error(error);
      message.textContent = 'Something went wrong. Please try again.';
    }
  });
});

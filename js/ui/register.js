import { registerUser } from '../api/auth.js';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#registerForm');
  const message = document.querySelector('#message');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const newUser = {
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
    };

    try {
      const result = await registerUser(newUser);
      message.textContent = `✅ Registered as ${result.name}`;
      // My plan is for this to: Redirect straight to login - test it properly
      window.location.href = 'login.html';
    } catch (error) {
      console.error(error);
      message.textContent = `❌ Registration failed: ${error.data?.errors?.[0]?.message || error}`;
    }
  });
});

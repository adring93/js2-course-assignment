import { redirectIfAuthed } from '../utils/guard.js'
redirectIfAuthed()
import { loginUser } from '../api/auth.js'
import { setupNav } from './setupNav.js'

setupNav()

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#loginForm')
  const message = document.querySelector('#message')

  form.addEventListener('submit', async (e) => {
    e.preventDefault()
    message.textContent = 'Logging in...'

    const formData = new FormData(form)
    const payload = {
      email: formData.get('email'),
      password: formData.get('password'),
    }

    try {
      await loginUser(payload)
      message.textContent = 'Login successful! Redirecting...'
      setTimeout(() => (window.location.href = 'feed.html'), 600)
    } catch (error) {
      message.textContent = error.message || 'Something went wrong. Please try again.'
    }
  })
})

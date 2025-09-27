import { registerUser } from '../api/auth.js'
import { setupNav } from './setupNav.js'
setupNav()

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#register-form')
  const message = document.querySelector('#message')

  form.addEventListener('submit', async (e) => {
    e.preventDefault()
    message.textContent = 'Registering...'

    const formData = new FormData(form)
    const newUser = {
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
    }

    try {
      const result = await registerUser(newUser)
      const name = result?.data?.name || 'user'
      message.textContent = `✅ Registered as ${name}`
      window.location.href = 'login.html'
    } catch (error) {
      message.textContent = error.message || 'Registration failed'
    }
  })
})

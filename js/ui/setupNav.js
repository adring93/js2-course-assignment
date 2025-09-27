import { logoutUser } from '../api/auth.js'
import { getToken } from '../utils/storage.js'

export function setupNav() {
  const authed = !!getToken()
  document.querySelectorAll('[data-auth="in"]').forEach(el => el.style.display = authed ? '' : 'none')
  document.querySelectorAll('[data-auth="out"]').forEach(el => el.style.display = authed ? 'none' : '')
  const btn = document.querySelector('#logout')
  if (btn) btn.onclick = () => logoutUser()

  const here = location.pathname.split('/').pop()
  document.querySelectorAll('nav a[href]').forEach(a => {
    a.removeAttribute('aria-current')
    if (a.getAttribute('href')?.endsWith(here)) a.setAttribute('aria-current', 'page')
  })
}

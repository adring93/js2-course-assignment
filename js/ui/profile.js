import { SOCIAL_URL } from '../api/config.js';
import { http } from '../api/http.js';
import { getName, getToken } from '../utils/storage.js';

document.addEventListener('DOMContentLoaded', async () => {
  const main = document.querySelector('main');
  main.innerHTML = '<h2>Loading profile...</h2>';

  try {
    const name = getName();
    const token = getToken();

    if (!name || !token) {
      main.innerHTML = '<h2>You must be logged in to view your profile.</h2>';
      return;
    }

    const profile = await http(`${SOCIAL_URL}/profiles/${name}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log(profile);

    main.innerHTML = `
      <section>
        <h1>${profile.name}</h1>
        <p>Email: ${profile.email}</p>
        <p>Posts: ${profile._count?.posts ?? 0}</p>
        <p>Followers: ${profile._count?.followers ?? 0}</p>
        <p>Following: ${profile._count?.following ?? 0}</p>
      </section>
    `;
  } catch (error) {
    console.error(error);
    main.innerHTML = '<h2>Failed to load profile</h2>';
  }
});

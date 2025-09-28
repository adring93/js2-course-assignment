# JavaScript 2 Course Assignment

Frontend client for a social media app using the Noroff Social API v2.  
Built with Vite, ES modules, and basic CSS.

## Live Demo
[Netlify Link](https://js2-ca-adrian.netlify.app/pages/feed.html)

## Pages
- `/pages/login.html` – Login
- `/pages/register.html` – Register
- `/pages/feed.html` – Feed (all posts + search + create)
- `/pages/post.html?id=…` – Single post (view/edit/delete)
- `/pages/profile.html` – My profile
- `/pages/saved.html` – Locally saved posts *(bonus feature)*

## Features
- Register / Login / Logout
- Create, read, update, delete posts
- Search posts
- Profile view with posts & follow/unfollow
- Persistent auth with localStorage

### Bonus
- Saved posts stored locally in browser

## Requirements Met
- ES6 modules
- JSDoc on 3+ functions
- Deployed to Netlify
- Basic styling
- Public GitHub repo

## Learning & Resources
This project was completed as part of my second-year JavaScript course at Noroff.  
Along the way, I made use of:
- A few YouTube tutorials (to refresh my memory on fetch and modular code structure).
- AI tools (used for debugging help, quick explanations, and small fixes — similar to how youd use StackOverflow or documentation I guess).
- Feedback from my girlfriend, who is a professional developer, especially on code readability and CSS structure.
- Re-used css from my js1 resit after asking Mr Kruger's permission.

These outside perspectives helped me understand the material better and apply it more confidently in my own code.

## Development
```bash
git clone https://github.com/adring93/js2-course-assignment.git
cd js2-course-assignment
npm install
npm run dev

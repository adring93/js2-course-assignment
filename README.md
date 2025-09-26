# JavaScript 2 Course Assignment

Frontend client for a social media app using the Noroff Social API v2.  
Built with Vite, ES modules, and basic CSS.

## Live Demo
[Netlify Link](https://your-netlify-link.netlify.app)

## Pages
- `/pages/login.html` – Login
- `/pages/register.html` – Register
- `/pages/feed.html` – Feed (all posts + search + create)
- `/pages/post.html?id=…` – Single post (view/edit/delete)
- `/pages/profile.html` – My profile

## Features
- Register / Login / Logout
- Create, read, update, delete posts
- Search posts
- Profile view with posts & follow/unfollow
- Persistent auth with localStorage

## Requirements Met
- ES6 modules
- JSDoc on 3+ functions
- Deployed to Netlify
- Basic styling
- Public GitHub repo

## Run Locally
```bash
git clone https://github.com/adring93/js2-course-assignment.git
cd js2-course-assignment
npm install
npm run dev
# open http://localhost:5173/pages/login.html

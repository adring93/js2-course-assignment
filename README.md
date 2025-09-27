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
- `/pages/saved.html` – Locally saved posts

## Features
- Register / Login / Logout
- Create, read, update, delete posts
- Search posts
- Profile view with posts & follow/unfollow
- Persistent auth with localStorage
- Saved posts (bonus feature)

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
- AI tools (to help me debug, restructure, and explain code in smaller steps, also used ai to turn my readme page into a more readable page).
- Occasional feedback from my girlfriend, who is a professional developer, especially on code readability and CSS structure.

These outside perspectives helped me understand the material better and apply it more confidently in my own code.

## Run Locally
```bash
git clone https://github.com/adring93/js2-course-assignment.git
cd js2-course-assignment
npm install
npm run dev
# open http://localhost:5173/pages/login.html

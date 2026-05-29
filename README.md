# Quiz Master

Quiz Master is a learning platform where users practice quizzes across subjects
and classes, track their progress, and compete on a leaderboard.

- Live app: https://quiz-master-wp32.onrender.com
- Backend API: https://quiz-master-backend-1a1s.onrender.com

---

## Features

- **Guest access** — browse the quiz library without an account.
- **Quizzes** — multiple formats: MCQ (single), MCQ (multiple), True/False, and
  Fill in the Blank, across difficulty levels.
- **Progress tracking** — scores, accuracy, highest/lowest score, and full quiz
  history on your profile.
- **Leaderboard** — ranked by accuracy, filterable by class.
- **Profile management** — edit username, email, class, bio, password, and
  profile picture.

---

## Tech stack

- **Frontend:** React, React Router, Tailwind CSS, lucide-react icons
- **Backend:** Node.js, Express
- **Database:** MongoDB (Mongoose)
- **Media:** Cloudinary (profile pictures)

---

## Project structure

```
backend/    Express API, Mongoose models, JWT auth
frontend/   React app (Create React App)
```

Key frontend conventions after the refactor:

- All API calls go through `src/config/api.js` (`apiFetch`) using the base URL in
  `REACT_APP_API_BASE_URL`. No backend URLs are hardcoded in pages.
- Shared UI primitives live in `src/components/ui/` (Button, Card, Select, Modal,
  Input, Badge, …). Design tokens (the dark + amber theme) are defined in
  `tailwind.config.js` and `src/index.css`.
- One `Navbar` serves both guest and signed-in states.

---

## Local setup

### Backend

```bash
cd backend
cp .env.example .env      # then fill in the values
npm install
npm run dev               # starts on PORT (default 8000)
```

Set `CORS_ORIGIN` to your frontend origin (localhost is allowed automatically).
Cookies are `Secure`/`SameSite=None` only when `NODE_ENV=production`, so local
HTTP development works out of the box.

### Frontend

```bash
cd frontend
cp .env.example .env      # set REACT_APP_API_BASE_URL (e.g. http://localhost:8000/api)
npm install
npm start                 # starts on http://localhost:3000
```

---

## Deployment (SPA routing)

This is a single-page app using client-side routing. The static host **must
rewrite all paths to `index.html`**, otherwise refreshing a deep link like
`/leaderboard` returns 404.

- A `render.yaml` blueprint and `frontend/public/_redirects` (`/* → /index.html`)
  are included.
- For an **existing Render static site**, also set it in the dashboard:
  *Settings → Redirects/Rewrites → Add Rule* →
  Source `/*`, Destination `/index.html`, Action **Rewrite**.

---

Start learning with **Quiz Master**.

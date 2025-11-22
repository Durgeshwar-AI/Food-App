<div align="center">

# 🍽️ Foodie — Full-stack Food Ordering App

Built with React + TypeScript (Vite) on the front end and Express + MongoDB on the backend. This repo contains a responsive UI, user authentication, cart/order flows, and Razorpay checkout integration.

<br/>

<img alt="React" src="https://img.shields.io/badge/React-18-61DAFB?logo=react"> 
<img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript"> 
<img alt="Vite" src="https://img.shields.io/badge/Vite-%5E6-646CFF?logo=vite"> 
<img alt="Express" src="https://img.shields.io/badge/Express-4-000?logo=express&logoColor=fff"> 
<img alt="MongoDB" src="https://img.shields.io/badge/MongoDB-6-47A248?logo=mongodb&logoColor=fff"> 
<img alt="JWT" src="https://img.shields.io/badge/JWT-Auth-orange"> 

</div>

Short summary: a small full-stack food ordering app demonstrating a production-like flow (auth, OTP, cart, create/verify payments).

## Quick Overview

- Frontend: `client/` — React 18 + TypeScript, Vite, Tailwind (UI components live in `client/src/Components`).
- Backend: `server/` — Express API with Mongoose models and controllers.
- Monorepo scripts: root `package.json` provides a `dev` script to run both client and server concurrently.

## Prerequisites

- Node.js v16+ (recommended v18+)
- MongoDB (local or Atlas)
- A terminal (PowerShell on Windows works fine)

## Setup & Run

1) Clone the repo

```powershell
git clone https://github.com/Durgeshwar-AI/Food-App.git
cd Food-App
```

2) Install dependencies (root uses `concurrently` to run both services)

```powershell
npm install
cd client && npm install
cd ../server && npm install
cd ../
```

3) Run development servers

- Option A — run both client & server from root (recommended):

```powershell
npm run dev
```

- Option B — run individually in two terminals:

```powershell
# Terminal A
cd server
npm run dev

# Terminal B
cd client
npm run dev
```

Notes:
- Root `npm run dev` uses `concurrently "cd client && npm run dev" "cd server && npm run dev"`.
- Server `npm run dev` uses `nodemon index.js`; `npm start` runs `node index.js`.

## Environment Variables

Create a `.env` file for the server (in `server/`) with at least:

- `PORT` — server port (e.g., `5000`)
- `MONGO_URI` — MongoDB connection string
- `JWT_SECRET` — secret for signing JWTs
- `CORS_APPROVED` — allowed origin (client URL)
- `RAZORPAY_KEY_ID` and `RAZORPAY_SECRET` — for payments (if used)
- SMTP configuration for email OTPs (e.g., `SMTP_HOST`, `SMTP_USER`, `SMTP_PASS`)

Client-side envs (if needed) go in `client/.env`, e.g.:

- `VITE_API_URL` — base API url (e.g., `http://localhost:5000/api`)

Keep secrets out of source control.

## Available Scripts

- Root:
  - `npm run dev` — runs both client and server concurrently
- Client (`client/package.json`):
  - `npm run dev` — start Vite dev server
  - `npm run build` — build production bundle
  - `npm run preview` — preview built app
- Server (`server/package.json`):
  - `npm run dev` — start server with `nodemon`
  - `npm start` — run server with `node`

## API Endpoints (high level)

- Food routes: `/api/food` — get all, search, popular, add/update/delete (admin)
- User routes: `/api/user` — register, login, send-otp, verify-otp, refresh token, update profile
- Cart routes: `/api/cart` — manage cart, create order, verify payment
- Order routes: `/api/order` — create orders, history, change status

Look in `server/Routes/` and `server/Controllers/` for concrete handlers.

## Project Structure

```
Food-App/
├─ client/        # React + TS (Vite)
│  └─ src/        # Components, pages, hooks, data
├─ server/        # Express API
│  ├─ Controllers/
│  ├─ Models/
│  ├─ Routes/
│  └─ DB/
└─ package.json   # root dev script (concurrently)
```

## Contributing

- Fork, create a branch, add changes, open a PR.
- Keep commits focused and include tests or screenshots when relevant.

## Screenshots

Add screenshots to `docs/screenshots/` and reference them here (optional).

## License

MIT — see `LICENSE`.

---

Made with ❤️ by Durgeshwar

<div align="center">

# 🍽️ Foodie — Modern Food Ordering App

Full‑stack food ordering built with React + TypeScript, Express, and MongoDB. Smooth animations, responsive UI, secure auth, and a delightful ordering flow.

<br>

<img alt="Foodie" src="https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=061a23&labelColor=061a23"> 
<img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=fff"> 
<img alt="Vite" src="https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=fff"> 
<img alt="Express" src="https://img.shields.io/badge/Express-4-000?logo=express&logoColor=fff"> 
<img alt="MongoDB" src="https://img.shields.io/badge/MongoDB-6-47A248?logo=mongodb&logoColor=fff"> 
<img alt="JWT" src="https://img.shields.io/badge/JWT-secure-000?logo=jsonwebtokens&logoColor=fff"> 
<a href="https://github.com/Durgeshwar-AI/Food-App/stargazers"><img alt="GitHub stars" src="https://img.shields.io/github/stars/Durgeshwar-AI/Food-App?style=social"></a>

</div>

## � Visual overview

```mermaid
flowchart LR
   A[Client • React + Vite] -- REST / cookies --> B[API • Express]
   B --> C[(MongoDB • Mongoose)]
   B -.-> D[JWT Auth]
   B -.-> E[Nodemailer • OTP]
   B -.-> F[Razorpay • Payments]
```

> Tip: Search uses case‑insensitive partial matching across name, description, and category fields.

## ✨ Highlights

- 🔐 Auth with JWT, OTP email verification
- 🍕 Rich menu with categories, offers, and popular items
- 🛒 Cart + order flow (Razorpay integration)
- 🎨 Smooth animations, responsive layout, mouse‑trail effect
- ⚙️ Type‑safe React 18 + TS + Vite

## 🚀 Quick start

Prereqs: Node >= 16, MongoDB running, two `.env` files (`client`, `server`).

```powershell
# 1) Clone
git clone https://github.com/Durgeshwar-AI/Food-App.git 
cd Food-App

# 2) Install
npm i
cd client
npm i
cd ../server
npm i

# 3) Run (two terminals)
# Terminal A
cd server
npm start
# Terminal B
cd client
npm run dev

# Or 3) Run
npm run dev
```

Environment

- server/.env: PORT, MONGO_URI, CORS_APPROVED, JWT_SECRET, RAZORPAY_KEY_ID, RAZORPAY_SECRET, SMTP creds
- client/.env: Vite envs as needed (e.g., VITE_API_URL)

## 🧭 API at a glance

Base URL: `/api`

```mermaid
flowchart TD
   subgraph Food
      F1[GET /food/getFood]
      F2[GET /food/popular]
      F3[GET /food/search?q=]
      F4[POST /food/addFood]
      F5[PATCH /food/updateFood/:id]
      F6[DEL /food/deleteFood/:id]
   end
   subgraph User
      U1[POST /user/register]
      U2[POST /user/login]
      U3[POST /user/send-otp]
      U4[POST /user/verify-otp]
      U5[GET  /user/refreshToken]
      U6[PUT  /user/updateProfile • auth]
   end
   subgraph Order
      O1[GET  /order/history • auth]
      O2[POST /order/new • auth]
      O3[PUT  /order/deliverd • auth]
      O4[PUT  /order/cancelOrder • auth]
   end
   subgraph Cart
      C1[GET  /cart • auth]
      C2[POST /cart • auth]
      C3[DEL  /cart/:id • auth]
      C4[POST /cart/create-order]
      C5[POST /cart/verify-payment]
   end
```

Search behavior

- Endpoint: `GET /api/food/search?q=<term>`
- Match: case‑insensitive, partial across `name | description | category`
- Limit: up to 50 results

## 🖼️ Screenshots

Add screenshots to `docs/screenshots/` and they’ll render here.

<div align="center">

<!-- Replace with real screenshots -->
<img alt="Home" src="docs/screenshots/home.png" width="45%" />
<img alt="Menu" src="docs/screenshots/menu.png" width="45%" />
<br/>
<img alt="Cart" src="docs/screenshots/cart.png" width="45%" />
<img alt="Checkout" src="docs/screenshots/checkout.png" width="45%" />

</div>

## 📁 Project structure

```
Food-App/
├── client/                 # React + TS (Vite)
│   └── src/                # Components, pages, hooks, data
└── server/                 # Express API
      ├── Controllers/        # Route handlers
      ├── Models/             # Mongoose models
      ├── Routes/             # API routes
      └── DB/                 # DB connection
```

## �️ Tech stack

Frontend

- React 18 + TypeScript, Vite, Tailwind CSS
- React Router, Axios, Framer Motion, React Icons

Backend

- Express, Mongoose (MongoDB)
- JWT, Bcrypt, CORS, Helmet, Cookie‑Parser
- Express‑Validator, Multer, Nodemailer
- Razorpay integration

## 🤝 Contributing

Contributions welcome!

1. Fork ➜ create branch ➜ commit ➜ PR
2. Keep commits descriptive, include tests/docs when relevant
3. Follow existing code style and linting

<a href="https://github.com/Durgeshwar-AI/Food-App/issues"><img alt="PRs welcome" src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg"></a>

## � License

MIT — see `LICENSE`.

---

Made with ❤️ by Durgeshwar

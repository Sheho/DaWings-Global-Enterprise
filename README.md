# 👑 DA-WINGS GLOBAL — Premier Digitizing & Fashion Technology Platform

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-v20+-339933?logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-v5.0-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Paystack](https://img.shields.io/badge/Paystack-Integrated-09A5DB?logo=paystack&logoColor=white)](https://paystack.com/)

> **DA-WINGS GLOBAL** is an luxury fashion technology marketplace and multi-vendor platform dedicated to African digitizing designs, embroidery machine engineering, custom metal tag laser marking, and digitizer agent onboarding.

---

## 🌟 Key Features

### 💻 1. Multi-Vendor Digitizing Marketplace
- **Signature & Community Catalog**: Browse, search, and filter premium embroidery design files (EMB, DST, PES, VP3) for Agbada, Cap, Flap Pocket, Logo, and Monogram embroidery.
- **Agent / Digitizer Onboarding**: Allows independent embroidery digitizers to register (`/register`) as agents to publish and monetize their own designs.
- **Designer Dashboard (`/dashboard`)**: Vendor panel tracking sales earnings, downloadable files, active designs, and payout stats.

### 💳 2. Direct Paystack Payment Architecture
- **Seamless Gateway Checkout**: Paystack REST API integration for Card, USSD, and Bank Transfers.
- **HMAC Verification**: Server-side verification and webhook handling for safe order processing.
- **Verified Purchases (`/my-purchases`)**: Persistent order history tracking with direct download links for purchased embroidery design packages.

### ⚙️ 3. Fashion Engineering & Laser Marking Services
- **Embroidery Machine Engineering (`/engineers`)**: Technical maintenance and repair booking for multi-head embroidery machines (Tajima, Barudan, Feiya, etc.).
- **Laser Metal Tag Marking (`/metal-tags`)**: Custom laser engraved metal tags, luxury neck labels, and brand hardware for fashion designers.

### 🌗 4. Luxury Dual Theme System
- **Onyx Dark Mode**: Deep `#050505` onyx backdrop with metallic gold accents (`#C49A45`).
- **Warm Luxury Ivory Light Mode**: `#FFFDF8` to `#F5EFE4` warm ivory gradient with `#0F172A` high-contrast typography.
- **Mobile First & Zero Overflow**: Tested on 360px–480px viewports with fluid responsive typography and zero horizontal x-axis overflow.

---

## 🛠️ Architecture & Tech Stack

```text
Dawings-Global/
├── frontend/               # React 19 + Tailwind v4 + Framer Motion
│   ├── src/
│   │   ├── components/     # UI Components (Navbar, CartDrawer, Hero, Services, etc.)
│   │   ├── context/        # Cart & Theme Global State Providers
│   │   ├── pages/          # 16 Responsive Views (Shop, Admin, Dashboard, Cart, etc.)
│   │   └── services/       # Dynamic API service endpoints
│   └── vercel.json         # SPA fallback routes for Vercel deployment
└── backend/                # Node.js + Express 5 + MongoDB
    ├── config/             # Mongoose database connection
    ├── controllers/        # Agent & Payment gateway controllers
    ├── models/             # User, Agent, Design schemas
    ├── routes/             # RESTful API routes (/api/v1/agents, /api/v1/payments)
    └── render.yaml         # Render cloud deployment specification
```

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js `v18.0.0` or higher
- MongoDB Atlas database URI or local MongoDB instance

### 1. Clone Repository
```bash
git clone https://github.com/<YOUR_USERNAME>/Dawings-Global.git
cd Dawings-Global
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
*Frontend dev server will launch at `http://localhost:5173`*

### 3. Backend Setup
```bash
cd ../backend
npm install
npm run dev
```
*Backend API server will launch at `http://localhost:5000`*

---

## ☁️ Deployment

- **Frontend**: Configured for **Vercel** with SPA rewrite support (`frontend/vercel.json`).
- **Backend**: Configured for **Render / Railway / VPS** (`backend/render.yaml`).

---

## 📜 License

Distributed under the **ISC License**. Developed for **DA-WINGS GLOBAL**.

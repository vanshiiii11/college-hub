# CollegeHub 🎓

A full-stack college discovery and decision-making platform built with Next.js, TypeScript, and PostgreSQL.

## Live Demo
[college-hub-uawh.vercel.app](https://college-hub-uawh.vercel.app)

## Features
- 🔍 College listing with real-time search and state filtering
- 📄 Detailed college pages with courses, fees, and placement stats
- ⚖️ Side-by-side college comparison (up to 3 colleges)
- 🔐 Authentication with login/signup (NextAuth + bcrypt)
- 💾 Save colleges to your profile

## Tech Stack
- **Frontend:** Next.js 16, React, TypeScript, TailwindCSS
- **Backend:** Next.js API Routes, NextAuth
- **Database:** PostgreSQL (Neon) + Prisma ORM
- **Deployment:** Vercel

## Getting Started

```bash
git clone https://github.com/vanshiiii11/college-hub.git
cd college-hub
npm install
npx prisma generate
npx prisma migrate dev
npx prisma db seed
npm run dev
```

## Environment Variables
```env
DATABASE_URL=your_neon_postgresql_url
NEXTAUTH_SECRET=your_secret
NEXTAUTH_URL=http://localhost:3000
```

## Architecture
- `app/` — Next.js app router pages and API routes
- `lib/` — Prisma client and NextAuth configuration
- `prisma/` — Database schema, migrations, and seed data

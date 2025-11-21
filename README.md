# Peer-to-Peer Learning & Mentorship Platform

Monorepo starter for a full-stack platform using Next.js (App Router + Tailwind) for the client and Express + MongoDB + JWT for the API.

## Apps

- `web` – Next.js 15 app with Tailwind, ready for public landing pages, dashboards, and mentorship flows.
- `api` – Express + TypeScript REST API with MongoDB, JWT auth, and a starter auth module.

## Getting Started

### Prerequisites
- Node.js 20+
- npm 10+
- MongoDB instance (local or Atlas)

### Environment
1. Copy `api/.env.example` to `api/.env` and update secrets + Mongo URI.
2. (Optional) create `web/.env.local` with `NEXT_PUBLIC_API_URL` (defaults to `http://localhost:5000/api`).

### Run the API
```bash
cd api
npm run dev
```

### Run the Web App
```bash
cd web
npm run dev
```

Visit `http://localhost:3000` for the UI and `http://localhost:5000/api/health` to verify the API.

## Next Steps
- Flesh out domain models (mentorship sessions, resources, messaging).
- Implement protected Next.js routes and connect to the API.
- Add real-time messaging (Socket.io) and scheduling integrations.
- Set up tests (Jest for API, Playwright/RTL for web) and CI.

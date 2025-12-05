# HealthPal

HealthPal is a full-stack health-care project (demo/prototype) that provides patient management, consultations, alerts, donations and mental-support features. This repository contains an Express + Sequelize backend and a Next.js frontend. The work includes a centralized API client, custom React hooks, tests, and Postman collection for API testing.

This README covers how to set up, run, test, and use the project locally.

---

## Table of Contents
- Project overview
- Prerequisites
- Quick start
- Development (backend & frontend)
- Testing
- API overview
- Postman collection
- Environment variables
- Troubleshooting
- Contributing
- License

---

## Project overview

- Backend: Node.js (Express), Sequelize ORM. Uses SQLite for tests and MySQL/other for production (configurable in `src/config/env.js`).
- Frontend: Next.js, React, Tailwind CSS. Centralized API client in `frontend/lib/apiClient.js` and hooks in `frontend/hooks/useAPI.js`.
- Tests: Jest with in-memory SQLite for fast unit/integration tests.

This repository contains both backend and frontend code. Top-level server lives in `src/` and frontend app in `frontend/`.

## Prerequisites

- Node.js 18+ (Node 20 tested here)
- npm (or yarn)
- Optional: MySQL for production usage (the default development uses local DB configs or in-memory for tests)

## Quick start (development)

Open two terminals.

Terminal 1 — Backend
```bash
cd /home/muath-hassoun/PhpstormProjects/HealthPal
npm install
npm start
```

Terminal 2 — Frontend
```bash
cd /home/muath-hassoun/PhpstormProjects/HealthPal/frontend
npm install
npm run dev
```

Frontend URL: http://localhost:3000
Backend API base: http://localhost:5000/api

If Next.js chooses an alternate port because 3000 is busy, the terminal output will show the actual URL (e.g. `http://localhost:3001`).

## Development details

Backend
- Entry point: `src/server.js` (starts the Express app after DB connect)
- App: `src/app.js` (routes & middleware)
- Routes: `src/routes/` (users, consultations, alerts, mental-support, etc.)
- Models: `src/models/` (Sequelize models)

Frontend
- Entry: `frontend/pages/` (Next.js pages)
- Layout: `frontend/components/Layout.js`
- API client: `frontend/lib/apiClient.js`
- Hooks: `frontend/hooks/useAPI.js`

## Tests

Run backend tests from the project root:
```bash
npm test
```

This runs Jest. The test suite is configured to use a shared in-memory SQLite instance to avoid concurrency issues during tests.

## API overview (common endpoints)

Base: `http://localhost:5000/api`

- Auth
	- POST `/api/users/signup` — register (body: `{ full_name, email, password, role? }`)
	- POST `/api/users/login` — login (body: `{ email, password }`)
	- GET `/api/users/profile` — profile (requires auth JWT)

- Users / Patients
	- GET `/api/users/patients` — list patients
	- GET `/api/users/patients/:id` — patient detail

- Consultations
	- GET `/api/consultations`
	- POST `/api/consultations` — create (body sample: `{ doctor_id, patient_id, type, scheduled_at, notes }`)

- Alerts
	- GET `/api/alerts`

- Mental Support
	- GET `/api/mental-support`
	- POST `/api/mental-support` — create support request

- Donations
	- GET `/api/donations`

Note: See `src/routes/` and `src/controllers/` for full route list and payload examples.

## Postman collection

There is a Postman collection included that you can import for manual testing and documentation: `src/postman/postman_collection.json`.

Recommended Postman environment variables (create an environment named `HealthPal Local`):
- `base_url` = `http://localhost:5000/api`
- `auth_token` = (leave blank initially)

To import in Postman
1. Open Postman → Import → Choose Files → select `src/postman/postman_collection.json`.
2. Create environment and set `base_url`.
3. Use the `auth_token` variable to set `Authorization: Bearer {{auth_token}}` where needed.

## Environment variables

Backend (`.env` or system env):
- `PORT` — server port (default: 5000)
- `JWT_SECRET` — secret key used to sign JWT tokens (change in production)
- DB configuration is controlled in `src/config/env.js`.

Frontend `.env.local` (frontend root):
- `NEXT_PUBLIC_API_BASE_URL` — API base URL (default: `http://localhost:5000/api`)

## Troubleshooting

- NetworkError / JSON.parse error: If the frontend fails with `unexpected character` while parsing JSON, check the API URL (must point to backend) and verify the endpoint returns JSON. Use `curl` to verify:
	```bash
	curl -i -X GET http://localhost:5000/api/users/patients
	```
- CORS issues: Backend includes CORS middleware; ensure `FRONTEND_URL` or `http://localhost:3000` is allowed.
- Port conflicts: If port 3000 or 5000 are in use, either stop the conflicting process or let Next.js choose an alternate port. For port cleanup:
	```bash
	# Kill process listening on 3000
	lsof -i :3000 | awk 'NR>1 {print $2}' | xargs -r kill -9
	```
- DB connection issues: Check `src/config/env.js` and confirm credentials for production DB. For tests, Jest uses in-memory SQLite.

## Contributing

If you'd like to contribute:
1. Fork the repo
2. Create a feature branch
3. Open a pull request with description and tests

Coding standards: Follow existing code style. Many files use ES Modules (import/export) and modern JS.

## Useful commands

```bash
# Backend
npm install
npm start

# Frontend (from repo root)
cd frontend
npm install
npm run dev

# Tests
npm test
```

## Where to look next

- API routes & controllers: `src/routes/`, `src/controllers/`
- Frontend pages: `frontend/pages/`
- API client & hooks: `frontend/lib/apiClient.js`, `frontend/hooks/useAPI.js`
- Postman collection: `src/postman/postman_collection.json`

---

If you'd like, I can also add a Postman environment file, expand the collection to include example bodies for each endpoint, or generate an OpenAPI (Swagger) spec from routes.

---

© 2025 HealthPal

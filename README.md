# HealthPal

HealthPal is a **full-stack health-care prototype** that provides essential features for patient management, consultations, alerts, donations, and mental-support services.

This repository contains:

- A **Backend API**: Built with **Node.js (Express)** and **Sequelize ORM**.
- A **Frontend Application**: Built with **Next.js**, **React**, and **Tailwind CSS**.

The project includes a centralized API client, custom React hooks, extensive Jest test suite, and a ready-to-use Postman collection.

---

## Table of Contents

- [1. Project Overview](#1-project-overview)
- [2. Prerequisites](#2-prerequisites)
- [3. Quick Start (Local Development)](#3-quick-start-local-development)
- [4. API Overview](#4-api-overview)
- [5. Testing](#5-testing)
- [6. Environment Variables](#6-environment-variables)
- [7. Postman Collection](#7-postman-collection)
- [8. Troubleshooting & Useful Commands](#8-troubleshooting--useful-commands)
- [9. Contribution](#9-contribution)
- [10. License](#10-license)

---

## 1. Project Overview

The project is structured into two main directories, reflecting the decoupled architecture.

| Component | Directory | Technology Stack | Details |
|:----------|:----------|:-----------------|:--------|
| **Backend API** | `src/` | Node.js (Express), Sequelize ORM | Entry point: `src/server.js`. Uses SQLite for development/tests. |
| **Frontend UI** | `frontend/` | Next.js, React, Tailwind CSS | Client in `frontend/lib/apiClient.js`. Hooks in `frontend/hooks/useAPI.js`. |

---

## 2. Prerequisites

You must have the following installed to run the project locally:

- **Node.js 18+** (Node 20 is tested and recommended)
- **npm** (or yarn)
- **Git**

---

## 3. Quick Start (Local Development)

Follow these steps in two separate terminals to start the full application.

### Terminal 1: Backend API

1. Navigate to the project root and install dependencies:
   ```bash
   npm install
   ```

2. Start the Express server:
   ```bash
   npm start
   ```
   
   The Backend API should be running at: **`http://localhost:5000/api`**

### Terminal 2: Frontend UI

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   npm install
   ```

2. Start the Next.js development server:
   ```bash
   npm run dev
   ```
   
   The Frontend application should be accessible at: **`http://localhost:3000`**

---

## 4. API Overview

The API is the central hub for all application data. Base URL for all endpoints is `http://localhost:5000/api`.

| Module | Endpoint | Method | Access | Description |
|:-------|:---------|:-------|:-------|:------------|
| **Auth** | `/users/signup` | `POST` | Public | Register new user (`full_name`, `email`, `password`, `role?`). |
| **Auth** | `/users/login` | `POST` | Public | Authenticate and receive **JWT token**. |
| **Auth** | `/users/profile` | `GET` | **Auth** | Get user profile (requires **JWT**). |
| **Users** | `/users/patients` | `GET` | **Auth** | List all patient profiles. |
| **Consultations** | `/consultations` | `POST` | **Auth** | Create a new consultation. |
| **Alerts** | `/alerts` | `GET` | Public | Retrieve active health alerts. |
| **Donations** | `/donations` | `GET` | Public | List active donation campaigns. |
| **Support** | `/mental-support` | `POST` | **Auth** | Create a new mental support request. |

> **For full details** on request bodies and payloads, see the documentation in `src/routes/` and `src/controllers/`.

---

## 5. Testing

The project uses **Jest** for all testing, configured to use a fast, **in-memory SQLite database** to isolate tests and prevent conflicts.

- Run all backend tests from the project root:
  ```bash
  npm test
  ```

---

## 6. Environment Variables

Configuration is handled via environment variables.

| Variable | Location | Default Value | Purpose |
|:---------|:---------|:--------------|:--------|
| `PORT` | Backend (`.env` or system) | `5000` | Server port. |
| `JWT_SECRET` | Backend (`.env` or system) | *Required* | Secret key for signing and verifying JWTs (**MUST be changed in production**). |
| `NEXT_PUBLIC_API_BASE_URL` | Frontend (`frontend/.env.local`) | `http://localhost:5000/api` | API endpoint for the frontend client. |

> Database configuration (for production/staging) is handled within `src/config/env.js`.

---

## 7. Postman Collection

A Postman collection is provided for easy manual testing and exploration of the API endpoints.

1. **Import:** Import the file `src/postman/postman_collection.json` into Postman.

2. **Environment Setup:** Create a new Postman environment named `HealthPal Local` and set these variables:
   - `base_url` = `http://localhost:5000/api`
   - `auth_token` = (leave blank; this will be set dynamically after logging in)

3. **Usage:** Endpoints requiring authorization use the `Authorization: Bearer {{auth_token}}` header. Run the `/users/login` endpoint first to obtain the token.

---

## 8. Troubleshooting & Useful Commands

| Issue | Solution / Check | Command (If Applicable) |
|:------|:-----------------|:------------------------|
| **CORS Error** | Ensure both Frontend (`http://localhost:3000`) and Backend (`http://localhost:5000`) are running correctly. | N/A |
| **JSON Error** | Verify the API endpoint returns valid JSON. Check the network status code. | `curl -i http://localhost:5000/api/users/patients` |
| **Port Conflict** | Kill the process running on the conflicted port (e.g., 3000 or 5000). | `lsof -i :5000 \| awk 'NR>1 {print $2}' \| xargs -r kill -9` |
| **DB Issues (Prod)** | Check `src/config/env.js` and production credentials. Local development uses SQLite. | N/A |

### Useful Commands

| Command | Purpose | Location |
|:--------|:--------|:---------|
| `npm start` | Starts the Express Backend server. | Project Root |
| `npm run dev` | Starts the Next.js Frontend server. | `frontend/` |
| `npm test` | Runs all Jest unit and integration tests. | Project Root |

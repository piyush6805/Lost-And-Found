# Lost And Found

> Web application to report, search, and reclaim lost items — React frontend, Express API, MongoDB storage.

Table of Contents
- Project Overview
- Features
- Tech Stack
- Quick Demo / Screenshots
- Getting Started
  - Prerequisites
  - Installation
  - Environment variables
  - Running locally
- Usage
  - Creating reports
  - Searching
  - Claims & verification
- API (endpoints & examples)
- Database schema (example)
- Testing
- Deployment
- Contributing
- License
- Contact

---

## Project Overview

Lost And Found is a full-stack web application for reporting lost and found items, enabling finders and owners to connect, and allowing admins to moderate reports. This README is tailored for a React frontend, Express (Node.js) backend, and MongoDB database.

---

## Features

- Post lost or found reports with photos, timestamps, and location (address or coordinates)
- Full-text search and location-radius filtering
- Claim workflow with owner verification and finder confirmation
- Email and in-app notifications
- Role-based access: user, moderator, admin
- Image uploads (local or S3)
- Admin dashboard for moderation and analytics

---

## Tech Stack

- Frontend: React (Create React App or Vite)
- Backend: Node.js + Express
- Database: MongoDB (Mongoose)
- Auth: JSON Web Tokens (JWT)
- File storage: local uploads or AWS S3
- Dev tools: nodemon, concurrently, eslint, prettier

---

## Quick Demo / Screenshots

Add screenshots or GIFs to /docs or /assets and reference them here:
- Submit report
- Search & filter
- Report details & claim flow
- Admin dashboard

---

## Getting Started

### Prerequisites

- Node.js (>= 16)
- npm or yarn
- MongoDB (local or Atlas)
- Optional: AWS account for S3

### Installation

Clone repository:

```bash
git clone https://github.com/piyush6805/Lost-And-Found.git
cd Lost-And-Found
```

Install dependencies for server and client (assuming directories `server/` and `client/`):

```bash
# Backend
cd server
npm install

# Frontend
cd ../client
npm install
```

If your repo is a single app, run install from the root instead.

### Environment variables

Create `.env` in `server/` (backend) with:

```
PORT=4000
MONGO_URI=mongodb+srv://<user>:<pass>@cluster0.mongodb.net/lost-and-found?retryWrites=true&w=majority
JWT_SECRET=super_secret_jwt_key
JWT_EXPIRES_IN=7d

# Email (optional)
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=you@example.com
SMTP_PASS=yourpassword
EMAIL_FROM="Lost & Found <no-reply@example.com>"

# File storage (optional S3)
S3_BUCKET_NAME=your-bucket
S3_REGION=us-east-1
S3_ACCESS_KEY_ID=AKIA...
S3_SECRET_ACCESS_KEY=...

# Frontend origin (for CORS)
FRONTEND_URL=http://localhost:3000
```

Create `.env` in `client/` if needed (REACT_APP_API_URL etc.):

```
REACT_APP_API_URL=http://localhost:4000/api
```

### Running locally

Start backend (from /server):

```bash
npm run dev      # commonly runs nodemon or ts-node-dev
```

Start frontend (from /client):

```bash
npm start
```

Or run both concurrently from repo root if scripts are provided:

```bash
npm run dev:all  # example that runs client+server
```

Open the frontend (most likely at http://localhost:3000).

---

## Usage

### Creating reports
- Click "Report Lost Item" or "Report Found Item".
- Fill: title, description, category, date/time, approximate location, contact preference, and attach photos.
- Submit to create a report. Optionally mark contact info as masked until verification.

### Searching & filtering
- Use search bar for keywords.
- Filter by category, date range, and location radius (e.g., within 5 km).
- Sort by newest, closest, or relevance.

### Claims & verification
- Owner files a claim on a report and provides proof (photo, description).
- Finder verifies handover via confirmation or uploading proof.
- Admins can close a report after verification or mediate disputes.

---

## API (endpoints & examples)

Note: update these endpoints to match your backend implementation.

Base: GET/POST/PUT to http://localhost:4000/api

Authentication
- POST /api/auth/register
  - Body: { name, email, password }
- POST /api/auth/login
  - Body: { email, password }
  - Response: { token }

Reports
- GET /api/reports
  - Query: q, category, status, lat, lng, radius, page, limit
- GET /api/reports/:id
- POST /api/reports
  - Headers: Authorization: Bearer <token>
  - Body (multipart/form-data): title, description, category, date, location{lat,lng,address}, contact, images[]
- PUT /api/reports/:id
  - Update report (owner or admin)
- DELETE /api/reports/:id
  - Admin only

Claims
- POST /api/reports/:id/claims
  - Body: { claimantName, message, evidence[] }
- PUT /api/reports/:reportId/claims/:claimId/accept
  - Admin or reporter can accept/reject

Example: create report (JSON variant)

```http
POST /api/reports
Content-Type: application/json
Authorization: Bearer <token>

{
  "title": "Black wallet near Central Library",
  "description": "Leather wallet containing student ID and 2 cards",
  "category": "Wallet",
  "date": "2025-10-23T14:00:00Z",
  "location": { "address": "123 Main St", "lat": 37.7749, "lng": -122.4194 },
  "contact": { "method": "email", "value": "finder@example.com" }
}
```

Authentication middleware should validate JWT and attach user info to req.user.

---

## Database schema (example)

Using MongoDB + Mongoose (example models):

Report (reports collection)
```js
{
  _id: ObjectId,
  title: String,
  description: String,
  category: String,
  status: String, // 'open' | 'claimed' | 'closed'
  location: {
    type: { type: String, default: 'Point' },
    coordinates: [Number], // [lng, lat]
    address: String
  },
  images: [String], // URLs or file paths
  reporter: ObjectId, // ref users
  claims: [{ type: ObjectId, ref: 'Claim' }],
  createdAt: Date,
  updatedAt: Date
}
```

User (users collection)
```js
{
  _id: ObjectId,
  name: String,
  email: String,
  passwordHash: String,
  role: String, // 'user' | 'moderator' | 'admin'
  createdAt: Date
}
```

Claim (claims collection)
```js
{
  _id: ObjectId,
  report: ObjectId,
  claimer: ObjectId, // optional if registered
  name: String,
  message: String,
  evidence: [String],
  status: String, // 'pending' | 'accepted' | 'rejected'
  createdAt: Date
}
```

Add a geospatial index on reports.location for radius queries.

---

## Testing

- Backend unit tests: Jest + supertest
  - Run: `npm run test` in /server
- Frontend tests: React Testing Library
  - Run: `npm run test` in /client
- E2E: Cypress / Playwright
  - Run: `npx cypress open` or `npx playwright test`

Add a GitHub Actions workflow to run tests on push/PR.

---

## Deployment

Example deployment flow:
- Build frontend: `cd client && npm run build`
- Serve static build via Express or host on Netlify/Vercel and point API to deployed backend.
- Containerize backend with Docker and deploy to AWS ECS / Heroku / DigitalOcean App Platform.
- Use managed MongoDB (Atlas) in production, set environment variables securely.
- Use S3 for image storage and CloudFront or CDN for caching.

Provide a sample `docker-compose.yml` for local dev (backend + mongo + optional frontend).

---

## Contributing

1. Fork
2. Create branch: `git checkout -b feat/your-feature`
3. Commit: `git commit -m "Add feature"`
4. Push & open PR

Please include tests, follow linting rules, and document changes. Consider adding CODE_OF_CONDUCT.md and CONTRIBUTING.md.

---

## License

Add a LICENSE file (MIT recommended for open source). Example:

```
MIT License
© 2025 piyush6805
```

---

## Contact

Maintainer: @piyush6805  
Email: (add your contact email)

---

## Notes

This file assumes a React + Express + MongoDB setup. If your repo uses a different stack, or if you want me to detect the exact stack from repository files, tell me which stack to use or paste the repository's package.json / requirements.txt / pyproject.toml and I will regenerate the README to match.
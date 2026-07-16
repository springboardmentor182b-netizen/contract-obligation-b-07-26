# ContractIQ — Auth Module

Contract Obligation Tracking & Compliance Management Platform.  
This document covers **how to run** the authentication module (Login + Registration).

---

## Prerequisites

| Tool | Version |
|------|---------|
| Python | 3.11+ |
| PostgreSQL | 14+ |
| Node.js | 18+ |
| npm | 9+ |

---

## 1 — Backend (FastAPI)

### 1.1 Create & activate a virtual environment

```bash
cd backend
python -m venv venv

# Windows
venv\Scripts\activate

# macOS / Linux
source venv/bin/activate
```

### 1.2 Install dependencies

```bash
pip install -r requirements.txt
```

### 1.3 Set up PostgreSQL

Create the database (run in psql or pgAdmin):

```sql
CREATE DATABASE contractiq;
```

### 1.4 Configure environment variables

Copy the example file and update the values:

```bash
cp .env.example .env
```

Edit `backend/.env`:

```env
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/contractiq
SECRET_KEY=your-super-secret-key-min-32-characters-long
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
REFRESH_TOKEN_EXPIRE_DAYS=7
```

### 1.5 Run database migrations

```bash
# Generate the initial migration
alembic revision --autogenerate -m "create users table"

# Apply it
alembic upgrade head
```

### 1.6 Start the API server

```bash
uvicorn app.main:app --reload --port 8000
```

The API is now running at **http://localhost:8000**

- Swagger UI → http://localhost:8000/api/docs  
- ReDoc     → http://localhost:8000/api/redoc  
- Health    → http://localhost:8000/

---

## 2 — Frontend (Angular)

### 2.1 Install dependencies

```bash
cd frontend
npm install
```

### 2.2 Start the development server

```bash
# Option A — use npm start (recommended, works if npm scripts are allowed)
npm start

# Option B — if PowerShell script execution is blocked on Windows
node node_modules/@angular/cli/bin/ng.js serve --port 4200
```

Angular dev server starts at **http://localhost:4200**  
API requests to `/api/*` are proxied to `http://localhost:8000` via `src/proxy.conf.json`.

---

## 3 — Auth API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/v1/auth/register` | Public | Register new user (Employee role) |
| POST | `/api/v1/auth/login` | Public | Login, returns JWT tokens |
| POST | `/api/v1/auth/refresh` | Public | Refresh access token |
| GET  | `/api/v1/auth/me` | Bearer | Get current user profile |
| POST | `/api/v1/auth/logout` | Bearer | Revoke refresh token |
| POST | `/api/v1/auth/password-reset/request` | Public | Request password reset |
| POST | `/api/v1/auth/password-reset/confirm` | Public | Confirm password reset |
| POST | `/api/v1/auth/admin/register` | Bearer (Admin only) | Register user with any role |

---

## 4 — Roles

| Role | Value |
|------|-------|
| Administrator | `administrator` |
| Legal Manager | `legal_manager` |
| Compliance Officer | `compliance_officer` |
| Contract Manager | `contract_manager` |
| Department Head | `department_head` |
| Employee | `employee` |

Public registration is locked to `employee`. An Administrator uses `POST /api/v1/auth/admin/register` to assign elevated roles.

---

## 5 — Quick test with curl

```bash
# Register
curl -X POST http://localhost:8000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"alice@company.com","full_name":"Alice Smith","password":"Secret@123"}'

# Login
curl -X POST http://localhost:8000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"alice@company.com","password":"Secret@123"}'

# Get profile (replace TOKEN)
curl http://localhost:8000/api/v1/auth/me \
  -H "Authorization: Bearer TOKEN"
```

---

## 6 — Frontend Pages

| Route | Component |
|-------|-----------|
| `/auth/login` | Login page |
| `/auth/register` | Registration page |
| `/dashboard` | Protected dashboard (requires login) |
| `/forbidden` | 403 page (wrong role) |

---

## 7 — Password Requirements

- Minimum 8 characters  
- At least one uppercase letter  
- At least one digit  
- At least one special character (`!@#$%^&*` etc.)

---

## 8 — Project Structure

```
backend/
├── app/
│   ├── core/           # Config, JWT, password hashing
│   ├── db/             # SQLAlchemy engine & session
│   ├── dependencies/   # FastAPI auth dependencies
│   ├── models/         # User ORM model + roles enum
│   ├── routers/        # auth.py — all auth routes
│   ├── schemas/        # Pydantic request/response schemas
│   ├── services/       # AuthService business logic
│   └── main.py         # FastAPI app entry point
├── alembic/            # DB migrations
├── .env                # Environment variables (git-ignored)
└── requirements.txt

frontend/src/app/
├── auth/
│   ├── components/
│   │   ├── login/      # Login form component
│   │   └── register/   # Registration form component
│   ├── guards/         # authGuard, roleGuard
│   ├── interceptors/   # JWT injection + auto-refresh
│   ├── models/         # TypeScript interfaces
│   └── services/       # AuthService (signals + RxJS)
├── dashboard/          # Post-login landing (placeholder)
├── shared/forbidden/   # 403 page
├── app.component.ts    # Root component
├── app.config.ts       # Angular providers
└── app.routes.ts       # Top-level routes
```

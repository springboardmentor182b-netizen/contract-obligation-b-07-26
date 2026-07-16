# ContractIQ Backend

FastAPI backend for contract obligation tracking, compliance monitoring, renewal reminders, notifications, reports, and audit activity.

## Run locally

```powershell
cd server
.\venv\Scripts\Activate.ps1
uvicorn src.main:app --reload
```

The API will be available at `http://127.0.0.1:8000`.

Interactive docs:

```text
http://127.0.0.1:8000/docs
```

## Demo login

```json
{
  "email": "admin@contractiq.local",
  "password": "Admin@123"
}
```

Use the returned `access_token` as a bearer token for protected endpoints.

## Storage


User registration and login use PostgreSQL.

Local database:

```text
contractiq_db
```

Default local connection:

```text
postgresql://postgres:<password>@localhost:5432/contractiq_db
```

You can override it with:

```powershell
$env:DATABASE_URL="postgresql://postgres:<password>@localhost:5432/contractiq_db"
```

Contract, obligation, renewal, report, notification, and activity demo data still use `server/data/contractiq.json`.

This starter uses `server/data/contractiq.json` for local persistence so it can run with the packages already present in the project virtual environment. The module boundaries are intentionally close to a future PostgreSQL/SQLAlchemy migration.

# Contract Obligation Tracking Assistant - Backend

## Overview

The backend is built using **FastAPI** and provides REST APIs for managing contractual obligations, dashboard analytics, and compliance tracking. It connects with a PostgreSQL database using SQLAlchemy ORM.

---

## Features

- CRUD Operations for Obligations
- Dashboard KPI APIs
- Weekly Performance Data
- Calendar Events API
- Upcoming Deadlines API
- PostgreSQL Integration
- SQLAlchemy ORM
- Swagger Documentation
- RESTful API Design

---

## Technology Stack

- FastAPI
- Python
- SQLAlchemy
- PostgreSQL
- Pydantic
- Uvicorn

---

## Folder Structure

```
server/
│
├── src/
│   │
│   ├── config/
│   │     └── database.py
│   │
│   ├── models/
│   │     └── obligation.py
│   │
│   ├── schemas/
│   │     └── obligation_schema.py
│   │
│   ├── routes/
│   │     ├── obligation_routes.py
│   │     └── dashboard_routes.py
│   │
│   ├── services/
│   │     ├── obligation_service.py
│   │     └── dashboard_service.py
│   │
│   └── main.py
│
├── requirements.txt
├── venv/
└── README.md
```

---

## Installation

Clone the repository

```bash
git clone <repository-url>
```

Navigate to the backend folder

```bash
cd server
```

Create Virtual Environment

```bash
python -m venv venv
```

Activate Virtual Environment

Windows

```bash
venv\Scripts\activate
```

Install dependencies

```bash
pip install -r requirements.txt
```

Run FastAPI Server

```bash
uvicorn app.main:app --reload
```

Backend URL

```
http://127.0.0.1:8000
```

Swagger Documentation

```
http://127.0.0.1:8000/docs
```

---

## Database

Database

```
PostgreSQL
```

Main Table

```
obligations
```

Columns

- id
- title
- department
- owner
- due_date
- priority
- status

---

## REST API Endpoints

### Obligation APIs

| Method | Endpoint |
|----------|----------|
| GET | /obligations |
| POST | /obligations |
| PUT | /obligations/{id} |
| DELETE | /obligations/{id} |

---

### Dashboard APIs

| Method | Endpoint |
|----------|----------|
| GET | /dashboard/kpis |
| GET | /dashboard/deadlines |
| GET | /dashboard/calendar |
| GET | /dashboard/weekly-chart |

---

## API Testing

Swagger UI

```
http://127.0.0.1:8000/docs
```



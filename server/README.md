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


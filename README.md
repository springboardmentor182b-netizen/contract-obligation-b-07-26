# Authentication Module

## Project Overview

This is a full-stack Authentication Module developed using React and FastAPI. It includes Login, Registration, Forgot Password, JWT Authentication, and SQLite database integration.

## Features

- User Registration
- User Login
- Forgot Password UI
- JWT Authentication
- Password Hashing using bcrypt
- SQLite Database
- React Frontend
- FastAPI Backend
- Protected Dashboard
- Logout

## Technologies Used

### Frontend
- React
- Vite
- Bootstrap
- React Router

### Backend
- FastAPI
- SQLAlchemy
- SQLite
- Passlib (bcrypt)
- Python-JOSE (JWT)

## Project Structure

```text
auth-module/
├── client/
├── server/
├── README.md
└── .gitignore
```

## Run Frontend

```bash
cd client
npm install
npm run dev
```

## Run Backend

```bash
cd server
pip install -r requirements.txt
python -m uvicorn app.main:app --reload --port 8001
```

## API Endpoints

- POST /register
- POST /login

## Developed By

Mahesh Ingale
Infosys Springboard Virtual Internship Project
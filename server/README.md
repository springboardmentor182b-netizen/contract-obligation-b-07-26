# ContractIQ - Backend

FastAPI backend for the ContractIQ application following Clean Architecture principles.

## Features

- User Registration & Authentication
- JWT Token-based Security
- Role-Based Access Control
- RESTful API Design
- SQLAlchemy ORM
- Clean Architecture Pattern

## Tech Stack

- FastAPI
- SQLAlchemy
- PostgreSQL / SQLite
- JWT (python-jose)
- Bcrypt (passlib)
- Pydantic

## Getting Started

### Prerequisites

- Python 3.9 or higher
- pip
- virtualenv (recommended)

### Installation

1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Create a `.env` file:
```bash
cp .env.example .env
```

4. Update the `.env` file with your configuration

5. Run the server:
```bash
uvicorn main:app --reload
```

The API will be available at `http://localhost:8000`

## API Documentation

Once the server is running, visit:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## Project Structure

```
server/
├── app/
│   ├── config/
│   │   ├── database.py      # Database configuration
│   │   └── security.py      # Security utilities
│   ├── middleware/
│   │   └── auth_middleware.py  # Authentication middleware
│   └── modules/
│       ├── auth/
│       │   ├── controller.py   # Auth endpoints
│       │   ├── models.py       # User model
│       │   ├── schemas.py      # Pydantic schemas
│       │   └── service.py      # Business logic
│       └── users/
│           ├── controller.py   # User CRUD endpoints
│           ├── models.py       # User models
│           ├── schemas.py      # Pydantic schemas
│           └── service.py      # Business logic
├── main.py              # Application entry point
├── requirements.txt     # Python dependencies
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user

### Users
- `GET /api/users` - Get all users (Admin only)
- `GET /api/users/{id}` - Get user by ID
- `PUT /api/users/{id}` - Update user
- `DELETE /api/users/{id}` - Delete user (Admin only)

## User Roles

- Administrator
- Legal Manager
- Compliance Officer
- Contract Manager
- Department Head
- Employee

## Database

The application uses SQLite by default for development. For production, configure PostgreSQL in the `.env` file:

```
DATABASE_URL=postgresql://user:password@localhost/contractiq
```

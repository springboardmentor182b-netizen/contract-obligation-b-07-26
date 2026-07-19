# Contract Management System

Enterprise Contract Management System with obligation tracking, compliance monitoring, and automated renewals.

## Project Structure

```
├── client/          # Angular frontend application
├── server/          # FastAPI backend application
└── database/        # Database schema and ER diagrams
```

## Quick Start

### Backend (FastAPI)

1. Install dependencies:
```bash
cd server
pip install -r requirements.txt
```

2. Configure environment:
```bash
cp .env.example .env
# Edit .env with your PostgreSQL credentials (port 3702)
```

3. Run the server:
```bash
python run.py
```

Backend runs on: `http://localhost:8000`
API Documentation: `http://localhost:8000/api/docs`

### Frontend (Angular)

```bash
cd client
npm install
ng serve
```

Frontend runs on: `http://localhost:4200`

### Database Setup

1. PostgreSQL must be running on port 3702
2. Create database: `contract_mgmt`
3. Apply schema: `psql -U postgres -d contract_mgmt -f database/schema.sql -p 3702`

## Features

- **User Management**: Role-based access control (6 roles)
- **Contract Management**: Full lifecycle tracking
- **Obligation Tracking**: Monitor deliverables and milestones
- **Renewal Management**: Automated renewal workflows
- **Compliance Tracking**: Risk assessment and audit trails
- **Reports & Analytics**: Customizable dashboards
- **Document Management**: Secure file storage
- **Notifications**: Email and in-app alerts
- **Audit Logging**: Complete activity history

## Database Schema

- 26 tables
- 14 enum types
- 40+ indexes
- 4 views
- Audit triggers

See `database/er_diagram.png` for visual representation.

## Tech Stack

**Backend:**
- FastAPI
- SQLAlchemy (async)
- PostgreSQL
- JWT Authentication
- Pydantic

**Frontend:**
- Angular
- TypeScript
- RxJS

## API Endpoints

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/users` - List users
- `GET /api/reports` - Reports dashboard
- `GET /api/health` - Health check

## Configuration

### Backend (.env)
```
DATABASE_URL=postgresql+asyncpg://postgres:postgres@localhost:3702/contract_mgmt
SECRET_KEY=your-secret-key
DEBUG=True
```

## Development

- Backend hot-reload enabled
- Frontend live reload with `ng serve`
- PostgreSQL on custom port 3702

## License

See LICENSE file.

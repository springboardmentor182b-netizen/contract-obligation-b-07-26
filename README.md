# Contract Management Platform

A full-stack web application for contract management built with Angular and FastAPI. This platform enables organizations to securely manage contracts, track contractual obligations, monitor renewal dates, analyze compliance status, and receive proactive notifications for important legal milestones.

## Features

### Core Modules

1. **Contract Repository Module**
   - Contract Upload & Storage
   - Document Categorization (Employment, Vendor, Service, Lease, Purchase, Partnership, NDA)
   - Document Search & Filtering
   - Version Management
   - Document Archive

2. **Contract Management Module**
   - Contract Creation & Editing
   - Contract Approval Workflow
   - Contract Review & Assignment
   - Contract Status Management (Draft, Under Review, Approved, Active, Expired, Terminated)

3. **Obligation Tracking**
   - Create and manage contractual obligations
   - Track obligation priority (Low, Medium, High, Critical)
   - Monitor obligation status (Pending, In Progress, Completed, Overdue)
   - Assign obligations to users

4. **Compliance Monitoring**
   - Track compliance levels for obligations
   - Record compliance checks
   - Generate compliance reports

5. **Renewal Management**
   - Track contract renewal dates
   - Set renewal reminders
   - Manage renewal approval process
   - Monitor upcoming renewals

6. **Notification System**
   - Real-time notifications for important events
   - Mark notifications as read/unread
   - User-specific notification feeds

7. **Dashboard & Analytics**
   - Overview of contract statistics
   - Recent contracts display
   - Overdue obligations tracking
   - Upcoming renewals monitoring

8. **Authentication & Authorization**
   - Secure user authentication with JWT
   - Role-based access control (Admin, Legal Manager, Employee)
   - User management

## Technology Stack

### Backend
- **FastAPI** - Modern Python web framework
- **SQLAlchemy** - ORM for database operations
- **PostgreSQL** - Relational database
- **JWT** - Authentication tokens
- **Pydantic** - Data validation

### Frontend
- **Angular 18** - TypeScript-based web framework
- **RxJS** - Reactive programming
- **SCSS** - Styling

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **Nginx** - Reverse proxy

## Project Structure

```
contract-obligation-b-07-26/
├── server/                      # FastAPI Backend
│   ├── src/
│   │   ├── auth/              # Authentication module
│   │   ├── contracts/         # Contract management
│   │   ├── obligations/       # Obligation tracking
│   │   ├── renewals/          # Renewal management
│   │   ├── compliance/        # Compliance monitoring
│   │   ├── notifications/     # Notification system
│   │   ├── entities/          # Database models
│   │   ├── database/          # Database configuration
│   │   ├── tests/             # End-to-end tests
│   │   ├── todos/             # Todo management
│   │   └── users/             # User management
│   ├── main.py                # Application entry point
│   └── requirements.txt       # Python dependencies
├── Client/                     # Angular Frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/   # Angular components
│   │   │   │   ├── contract-repository/
│   │   │   │   ├── dashboard/
│   │   │   │   └── login/
│   │   │   ├── models/        # TypeScript interfaces
│   │   │   ├── services/      # API services
│   │   │   ├── app.config.ts  # App configuration
│   │   │   ├── app.routes.ts  # Routing configuration
│   │   │   └── app.component.ts
│   │   ├── index.html         # Entry HTML
│   │   ├── main.ts            # Entry TypeScript
│   │   └── styles.scss        # Global styles
│   ├── angular.json           # Angular configuration
│   ├── tsconfig.json          # TypeScript configuration
│   ├── package.json           # Node dependencies
│   └── Dockerfile             # Frontend Docker configuration
├── Dockerfile                  # Backend Docker configuration
├── docker-compose.yml          # Multi-container setup
└── README.md                   # This file
```

## Setup Instructions

### Prerequisites

- Docker and Docker Compose
- Node.js 18+ (for local development)
- Python 3.11+ (for local development)
- PostgreSQL 15+ (for local development)

### Quick Start with Docker

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd contract-obligation-b-07-26
   ```

2. **Start the application**
   ```bash
   docker-compose up --build
   ```

3. **Access the application**
   - Frontend: http://localhost
   - Backend API: http://localhost:8000
   - API Documentation: http://localhost:8000/docs

### Local Development Setup

#### Backend Setup

1. **Navigate to server directory**
   ```bash
   cd server
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up PostgreSQL database**
   - Create a database named `contract_management`
   - Update `DATABASE_URL` in `src/database/core.py` if needed

5. **Run the server**
   ```bash
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

#### Frontend Setup

1. **Navigate to Client directory**
   ```bash
   cd Client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   ng serve
   ```

4. **Access the application**
   - Frontend: http://localhost:4200

## API Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - User login

### Contracts
- `GET /contracts` - List all contracts
- `GET /contracts/{id}` - Get contract by ID
- `POST /contracts` - Create new contract
- `PUT /contracts/{id}` - Update contract
- `DELETE /contracts/{id}` - Delete contract
- `POST /contracts/{id}/upload` - Upload contract document
- `GET /contracts/{id}/versions` - Get contract versions

### Obligations
- `GET /obligations` - List all obligations
- `GET /obligations/{id}` - Get obligation by ID
- `POST /obligations` - Create new obligation
- `PUT /obligations/{id}` - Update obligation
- `DELETE /obligations/{id}` - Delete obligation

### Renewals
- `GET /renewals` - List all renewals
- `GET /renewals/{id}` - Get renewal by ID
- `POST /renewals` - Create new renewal
- `PUT /renewals/{id}` - Update renewal
- `DELETE /renewals/{id}` - Delete renewal

### Compliance
- `GET /compliance` - List all compliance records
- `GET /compliance/{id}` - Get compliance record by ID
- `POST /compliance` - Create compliance record
- `PUT /compliance/{id}` - Update compliance record
- `DELETE /compliance/{id}` - Delete compliance record

### Notifications
- `GET /notifications` - List all notifications
- `GET /notifications/{id}` - Get notification by ID
- `POST /notifications` - Create notification
- `PUT /notifications/{id}` - Update notification
- `POST /notifications/mark-all-read/{user_id}` - Mark all as read
- `DELETE /notifications/{id}` - Delete notification

## Database Schema

The application uses PostgreSQL with the following main tables:

- **users User accounts and roles
- **contracts** - Contract information and metadata
- **contract_versions** - Document version history
- **obligations** - Contractual obligations
- **renewals** - Contract renewal tracking
- **compliance_records** - Compliance monitoring
- **notifications** - User notifications
- **activities** - Activity logging
- **reports** - Generated reports
- **audit_logs** - Audit trail

## Security Features

- JWT-based authentication
- Password hashing with bcrypt
- CORS configuration
- Role-based access control
- SQL injection prevention via ORM

## Deployment

### Docker Deployment

The application is containerized and can be deployed using Docker Compose:

```bash
docker-compose up -d
```

### Environment Variables

Configure the following environment variables:

- `DATABASE_URL` - PostgreSQL connection string
- `SECRET_KEY` - JWT secret key (change in production)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please open an issue in the repository.
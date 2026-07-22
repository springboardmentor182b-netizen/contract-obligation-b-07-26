# User Dashboard (React + FastAPI)

A modern **User Dashboard** developed using **React.js** and **FastAPI** for managing user information, contracts, activities, notifications, and dashboard analytics. The application provides users with a centralized platform to monitor important metrics, upcoming tasks, and account activities through an intuitive and responsive interface.



# Structure


user-dashboard/
│
├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── models/
│   │   ├── schemas/
│   │   ├── services/
│   │   ├── database.py
│   │   └── main.py
│   │
│   ├── requirements.txt
│   └── README.md
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── hooks/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
└── README.md


# Backend

## Requirements

- Python 3.10+
- FastAPI
- SQLAlchemy
- Pydantic
- Uvicorn

### Install Dependencies

bash
pip install -r requirements.txt


### Run Backend

bash
uvicorn app.main:app --reload


Backend Server


http://localhost:8000


Swagger Documentation


http://localhost:8000/docs




# Frontend

## Requirements

- Node.js
- React.js
- Vite
- Axios
- React Router

### Install Dependencies

bash
npm install


### Run Frontend

bash
npm run dev


Frontend Server


http://localhost:5173




# Dashboard Components

## Sidebar

The sidebar contains:

- Dashboard
- Profile
- Contracts
- Compliance
- Obligation Tracker
- Reports
- Notifications
- Settings
- Logout



## Top Navigation

The top navigation includes:

- Dashboard Title
- Search Bar
- Notifications
- User Profile
- Settings



## Dashboard Cards

The dashboard displays the following KPI cards:

- Active Contracts
- Pending Obligations
- Upcoming Renewals
- Compliance Score
- Expiring Contracts

Each card contains

- Icon
- Count
- Status
- Description



## Contract Activity Chart

Displays monthly contract statistics.

Shows

- Created Contracts
- Renewed Contracts
- Terminated Contracts



## Portfolio Distribution

Displays contract distribution by category.

Categories

- Vendor
- Employment
- Lease
- Software
- NDA
- Others



## Recent Activities

Displays user activities including

- Contract Created
- Contract Updated
- Approval Submitted
- Profile Updated
- Notification Received



## Upcoming Deadlines

Shows

- Contract Renewals
- Compliance Reports
- Insurance Renewal
- Audit Completion
- License Renewal

Status badges

- Pending
- In Progress
- Completed
- Overdue

---

# User Profile

Displays

- User Name
- Email
- Role
- Department
- Profile Picture

---

# Search

Users can search for

- Contracts
- Obligations
- Reports
- Notifications

---

# API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | /api/dashboard | Dashboard Summary |
| GET | /api/contracts | Fetch Contracts |
| GET | /api/activities | Recent Activities |
| GET | /api/deadlines | Upcoming Deadlines |
| GET | /api/profile | User Profile |
| GET | /api/notifications | Notifications |

---

# Sample API Responses

### GET /api/dashboard

```json
{
    "activeContracts": 247,
    "pendingObligations": 41,
    "renewals": 23,
    "complianceScore": 94.2
}
```

### GET /api/profile

```json
{
    "name": "Sarah Chen",
    "role": "Legal Manager",
    "department": "Legal"
}
```

### GET /api/activities

```json
[
    {
        "title": "Created New Contract",
        "time": "10 minutes ago"
    }
]
```

### GET /api/deadlines

```json
[
    {
        "title": "Compliance Report",
        "status": "Pending"
    }
]
```

---

# Technologies Used

## Frontend

- React.js
- Vite
- Axios
- React Router
- CSS / Tailwind CSS
- Chart.js / Recharts

## Backend

- FastAPI
- Python
- SQLAlchemy
- Pydantic
- Uvicorn

## Database

- MySQL / PostgreSQL / SQLite



# Features

 Responsive Dashboard

 Modern UI

Sidebar Navigation

 Search Functionality

 User Profile

 Dashboard Analytics

 Contract Overview

 Activity Timeline

Upcoming Deadlines

Notifications

 REST API Integration



# Future Enhancements

- JWT Authentication
- Role-Based Access Control
- Dark Mode
- Email Notifications
- PDF Report Export
- Excel Export
- Real-Time Dashboard
- Audit Logs


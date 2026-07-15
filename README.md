
Compliance Dashboard — React + FastAPI

Feature-branch code for the Compliance Dashboard page of the Contract Obligation Tracking & Compliance Management platform (Infosys Springboard internship group project).

This reproduces the Compliance Dashboard exactly as designed in the Figma file: same KPI cards, department compliance chart, risk trend chart, audit summary, audit table, risk indicators panel, sidebar navigation, top navigation, search bar, notification badge, user profile, and role badge.
## Structure

```text
compliance-dashboard/
├── backend/                          # FastAPI service
│   ├── main.py                       # App entrypoint + CORS
│   ├── requirements.txt
│   └── app/
│       ├── models.py                 # Pydantic models
│       ├── data.py                   # Dashboard seed data
│       └── routers/
│           └── dashboard.py          # Dashboard API routes
│
└── frontend/                         # React (Vite)
    ├── index.html
    ├── vite.config.js                # Proxy /api → localhost:8000
    └── src/
        ├── App.jsx
        ├── api.js
        ├── index.css
        ├── pages/
        │   └── ComplianceDashboard.jsx
        ├── components/
        │   ├── layout/
        │   │   ├── Sidebar.jsx
        │   │   ├── Topbar.jsx
        │   │   └── DashboardLayout.jsx
        │   ├── cards/
        │   │   ├── MetricCard.jsx
        │   │   ├── SummaryCard.jsx
        │   │   └── RiskCard.jsx
        │   ├── charts/
        │   │   ├── DepartmentChart.jsx
        │   │   └── RiskTrendChart.jsx
        │   ├── tables/
        │   │   └── AuditTable.jsx
        │   └── common/
        │       ├── Avatar.jsx
        │       ├── Badge.jsx
        │       └── SearchBar.jsx
        └── assets/
## Running Locally

### Backend

```bash
cd backend

python -m venv venv

# Windows
venv\Scripts\activate

# Linux/macOS
source venv/bin/activate

pip install -r requirements.txt

uvicorn main:app --reload --port 8000
```

FastAPI Swagger documentation is available at:

```text
http://localhost:8000/docs
```

---

### Frontend

```bash
cd frontend

npm install

npm run dev
```

The application runs at:

```text
http://localhost:5173
```

The Vite development server automatically proxies all `/api/*` requests to the FastAPI backend running on **http://localhost:8000**, so no additional `.env` configuration is required during development.

---

# Dashboard Components

## Sidebar

The sidebar includes:

- ContractIQ Logo
- User Profile
- Dashboard
- Compliance (Active)
- Contract Repository
- Obligation Tracker
- Reports & Export
- Notification Center

---

## Top Navigation

The top navigation bar contains:

- Search Contracts & Obligations
- Notification Bell
- User Avatar
- Username
- Role Badge

---

## KPI Cards

The dashboard displays four key metrics:

- Overall Compliance
- Missed Deadlines
- Risk Flags
- Audits Completed

Each card contains:

- Icon
- Current Value
- Trend Indicator
- Description

---

## Department Compliance Chart

A horizontal bar chart displays compliance scores for:

- Legal
- Finance
- HR
- IT
- Operations
- Procurement

---

## Risk Trend Chart

A line chart visualizes compliance risk trends across the first half of 2024:

- January
- February
- March
- April
- May
- June

---

## Audit Summary

The dashboard displays:

- Total Audits: **22**
- Completed: **18**
- In Progress: **3**
- Failed: **1**

---

## Audit Table

The audit table contains the following columns:

- Audit
- Department
- Auditor
- Status
- Score

Supported status badges:

- Completed
- In Progress
- Terminated

---

## Risk Indicators

Displays:

- Expired Contracts with Active Obligations
- Contracts Without Designated Owner
- Obligations Past Due Date
- Missing Compliance Documentation
- Unreviewed Renewal Notices

Each indicator displays:

- Severity Badge
- Number of Affected Items

---

# API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/dashboard/metrics` | Retrieve KPI metrics |
| GET | `/api/dashboard/departments` | Retrieve department compliance scores |
| GET | `/api/dashboard/risk-trend` | Retrieve monthly risk trend |
| GET | `/api/dashboard/audits` | Retrieve audit table data |
| GET | `/api/dashboard/risks` | Retrieve risk indicators |

---

# Sample API Responses

### GET `/api/dashboard/metrics`

```json
{
  "overallCompliance": 94.2,
  "missedDeadlines": 3,
  "riskFlags": 5,
  "auditsCompleted": "18/22"
}
```

### GET `/api/dashboard/departments`

```json
[
  {
    "department": "Legal",
    "score": 98
  },
  {
    "department": "Finance",
    "score": 91
  },
  {
    "department": "HR",
    "score": 87
  },
  {
    "department": "IT",
    "score": 95
  },
  {
    "department": "Operations",
    "score": 80
  },
  {
    "department": "Procurement",
    "score": 89
  }
]
```

### GET `/api/dashboard/audits`

```json
[
  {
    "audit": "Q2 Vendor Contracts Audit",
    "department": "Procurement",
    "auditor": "David Park",
    "status": "Completed",
    "score": 97
  }
]
```

### GET `/api/dashboard/risks`

```json
[
  {
    "title": "Expired Contracts with Active Obligations",
    "level": "High",
    "count": 2
  }
]
```

---

# Technologies Used

## Frontend

- React
- Vite
- Axios
- React Router
- Recharts
- React Icons

## Backend

- FastAPI
- Pydantic
- Uvicorn
- Python 3.11+

---

# Notes

This implementation recreates the **Compliance Dashboard** from the approved Figma design.

### Features Included

- Responsive dashboard layout
- Sidebar navigation
- Top navigation bar
- KPI metric cards
- Department compliance chart
- Risk trend line chart
- Audit summary cards
- Audit table with status badges
- Risk indicators panel
- FastAPI backend with mock data
- Modular and reusable React components

The current implementation uses mock data stored in `backend/app/data.py`. During backend integration, these mock values can be replaced with live database data without requiring changes to the frontend components.

# contract-obligation-b-07-26
## 🎨 Figma Design

View the UI Design here:

https://www.figma.com/design/NyML0FgGMeOIo1pqKsUR4N/Contract-Obligation-Tracking-Assistant?node-id=0-1&t=qm7Vdw4owmwsovpw-1


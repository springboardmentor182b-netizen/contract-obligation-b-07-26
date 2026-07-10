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
```
 Running locally
 Backend
cd backend

python -m venv venv

# Windows
venv\Scripts\activate

# Linux/macOS
source venv/bin/activate

pip install -r requirements.txt

uvicorn main:app --reload --port 8000
Swagger documentation

http://localhost:8000/docs
Frontend
cd frontend

npm install

npm run dev

Runs on

http://localhost:5173

The Vite development server proxies every

/api/*

request to

http://localhost:8000

No .env configuration is required during development.

Dashboard Components
Sidebar

Contains

ContractIQ Logo
User Profile
Dashboard
Compliance (Active)
Contract Repository
Obligation Tracker
Reports & Export
Notification Center
Top Navigation

Contains

Search contracts & obligations
Notification Bell
User Avatar
Username
Role Badge
KPI Cards

Displays

Overall Compliance

Missed Deadlines

Risk Flags

Audits Completed

Each card displays

Icon
Current Value
Trend
Description
Department Compliance Chart

Horizontal bar chart

Departments

Legal

Finance

HR

IT

Operations

Procurement

Displays compliance percentage.

Risk Trend Chart

Line chart showing

Jan

Feb

Mar

Apr

May

Jun

Risk trend across H1 2024.

Audit Summary

Displays

22 Total Audits

18 Completed

3 In Progress

1 Failed
Audit Table

Columns

Audit

Department

Auditor

Status

Score

Supports

Completed
In Progress
Terminated

status badges.

Risk Indicators

Displays

Expired Contracts

Contracts without Owner

Past Due Obligations

Missing Documentation

Renewal Notices

Each card contains

Severity badge
Number of affected items
API Endpoints
Method	Endpoint	Purpose
GET	/api/dashboard/metrics	KPI cards
GET	/api/dashboard/departments	Department compliance chart
GET	/api/dashboard/risk-trend	Risk trend chart
GET	/api/dashboard/audits	Audit summary table
GET	/api/dashboard/risks	Risk indicator panel
Sample Responses
GET /api/dashboard/metrics
{
  "overallCompliance": 94.2,
  "missedDeadlines": 3,
  "riskFlags": 5,
  "auditsCompleted": "18/22"
}
GET /api/dashboard/departments
[
  { "department":"Legal","score":98 },
  { "department":"Finance","score":91 },
  { "department":"HR","score":87 },
  { "department":"IT","score":95 },
  { "department":"Operations","score":80 },
  { "department":"Procurement","score":89 }
]
GET /api/dashboard/audits
[
  {
    "audit":"Q2 Vendor Contracts Audit",
    "department":"Procurement",
    "auditor":"David Park",
    "status":"Completed",
    "score":97
  }
]
GET /api/dashboard/risks
[
  {
    "title":"Expired contracts with active obligations",
    "level":"High",
    "count":2
  }
]
Libraries
Frontend
React

Vite

Axios

React Router

Recharts

React Icons
Backend
FastAPI

Pydantic

Uvicorn

Python 3.11+
Notes

This implementation recreates the Compliance Dashboard directly from the approved Figma design.

Current version includes:

Pixel-matched page layout
Responsive sidebar and top navigation
KPI metric cards
Department compliance chart
Risk trend line chart
Audit summary cards
Audit table with status badges
Risk indicators panel
FastAPI backend with mock seed data
Fully separated React components for maintainability

The current implementation uses mock data stored in backend/app/data.py. When backend integration is complete, these seed values can be replaced with data from your database or business logic without requiring changes to the frontend components.

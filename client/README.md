# Contract Obligation Tracking Assistant - Frontend

## Overview

The frontend of the Contract Obligation Tracking Assistant is developed using **React.js**. It provides an interactive dashboard for managing contractual obligations, monitoring compliance, and visualizing key performance metrics.

---

## Features

- Dashboard Overview
- KPI Cards
- Search Obligations
- Filter by Status
- Filter by Priority
- View Obligation Details
- Add New Obligation
- Edit Obligation
- Delete Obligation
- Weekly Performance Chart
- Calendar View
- Upcoming Deadlines
- PDF Export
- Responsive Design
- REST API Integration

---

## Technology Stack

- React.js
- JavaScript (ES6)
- HTML5
- CSS3
- Hero Icons
- Recharts
- jsPDF
- html2canvas

---

## Folder Structure
client/
│
├── public/
│
├── src/
│ │
│ ├── api/
│ │ └── api.js
│ │
│ ├── assets/
│ │
│ ├── components/
│ │ │
│ │ ├── Header/
│ │ ├── KPI/
│ │ ├── SearchFilters/
│ │ ├── Table/
│ │ ├── Calendar/
│ │ ├── Charts/
│ │ ├── UpcomingDeadlines/
│ │ ├── Loader/
│ │ ├── AddObligationModal.jsx
│ │ └── EditObligationModal.jsx
│ │
│ ├── pages/
│ │ ├── ObligationTracker.jsx
│ │ └── ObligationTracker.css
│ │
│ ├── utils/
│ │ └── exportPDF.js
│ │
│ ├── App.js
│ └── index.js
│
├── package.json
└── README.md

---

## Installation

### Clone the repository

```bash
git clone <repository-url>
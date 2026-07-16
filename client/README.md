# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
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

```
client/
│
├── public/
│
├── src/
│   │
│   ├── api/
│   │     └── api.js
│   │
│   ├── assets/
│   │
│   ├── components/
│   │     │
│   │     ├── Header/
│   │     ├── KPI/
│   │     ├── SearchFilters/
│   │     ├── Table/
│   │     ├── Calendar/
│   │     ├── Charts/
│   │     ├── UpcomingDeadlines/
│   │     ├── Loader/
│   │     ├── AddObligationModal.jsx
│   │     └── EditObligationModal.jsx
│   │
│   ├── pages/
│   │     ├── ObligationTracker.jsx
│   │     └── ObligationTracker.css
│   │
│   ├── utils/
│   │     └── exportPDF.js
│   │
│   ├── App.js
│   └── index.js
│
├── package.json
└── README.md
```

---

## Installation

Clone the repository

```bash
git clone <repository-url>
```

Move to the client folder

```bash
cd client
```

Install dependencies

```bash
npm install
```

Start the development server

```bash
npm start
```

Application runs at

```
http://localhost:3000
```

---

## Main Components

- Header
- KPI Cards
- Search Filters
- Obligation Table
- Calendar
- Weekly Chart
- Upcoming Deadlines
- Add Obligation Modal
- Edit Obligation Modal
- Loader


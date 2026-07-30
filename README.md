# Compliance Monitoring Dashboard (`/compliance`)

## Overview
The **Compliance Monitoring Dashboard** provides real-time visibility into organization-wide compliance health across contracts, departments, and obligations. Built for enterprise scale, the dashboard connects directly to FastAPI backend services to replace static mock data with dynamic database-driven metrics, interactive risk indicators, and historical audit tracking.

---

## Key Features & Components

### 1. Header & Quick Actions
* **Global Search Bar:** Real-time text filtering for contracts, obligations, and involved parties.
* **Action Buttons:**
  * `+ New Contract` modal/action entry.
  * `Export Dashboard` for compliance reporting.
  * `+ Log Finding` for quick audit log entries.
* **User Profile & Notifications:** Displays current authenticated role (`CCO - Nexora Group`) and system alert status.

---

### 2. Live KPI Summary Strip
Top-level metrics calculating active status across all obligations:
* **Compliance Score:** Overall percentage score (`71% - Moderate Risk`).
* **Open Risks:** Total active risk flags requiring review (`4 Open Risks`).
* **Audit Findings:** Logged findings in the last 30 days (`0 Audit Findings`).
* **Missed Obligations:** Overdue compliance tasks (`3 Missed Obligations`).
* **Dept Avg Score:** Aggregated department score (`58%`).
* **Reports Ready:** Downloadable reports available (`0`).

---

### 3. Interactive Tab Views
A multi-tab view switcher with enhanced spacing and contrast:
* **Compliance Overview:** Primary executive view showing ring gauges, trend charts, and active widgets.
* **Risk Indicators:** Detailed breakdown of high and critical severity risks.
* **Audit Summary:** Stats on completed audits, findings raised, resolved findings, and open items.
* **Dept Performance:** Progress bar breakdown across Marketing, Finance, HR, IT, Operations, and Legal.
* **Missed Obligations:** Track overdue items with calculated late days (e.g., *68d late*).
* **Compliance History:** Audit log table displaying inspection checks (`Checked On`, `Contract`, `Obligation`, `Level`, `Checked By`, `Remarks`).
* **Compliance Docs:** Repository access for compliance documents.

---

### 4. Data Visualizations & Analytics
* **Overall Compliance Score Gauge:** Interactive ring gauge highlighting moderate vs. high risk.
* **Status Breakdown Donut Chart:** Categorizes contracts into **Compliant**, **Non-Compliant**, and **Partially Compliant**.
* **Compliance Score Trend Chart:** Monthly compliance tracking over time (`+11 pts YTD`).

---

## Technical Stack & API Integration

* **Frontend:** React, Tailwind CSS (Custom navigation styling, CSS grid/flex layout handling).
* **Backend:** FastAPI, PostgreSQL (`psycopg2-binary`).
* **Data Fetching:** Custom `useFetch` hooks consuming endpoints defined in `/services/complianceApi.js`.

---

## UI & UX Enhancements

* **Navigation Contrast:** Increased sidebar link font weight (`text-sm font-bold`) and active tab highlights.
* **Layout Spacing:** Added vertical margins and flex gaps (`my-8`, `gap-4`) around navigation tabs to eliminate visual clutter.
* **Overflow Fixes:** Constrained the main page wrapper to eliminate horizontal scrollbars on wide screens.
* **Table UI Adjustments:** Fixed layout overlapping between search input fields and table headers.
* **State Handling:** Integrated error boundary cards and skeleton loading states for asynchronous API requests.

---

## Testing & Verification Instructions
 
### 1. Checkout Branch
```bash
git checkout Group-D/feature/compliance_dashboard-isra
```
### 2. Start FastAPI backend service
```bash
python main.py
```
### 3. Start Vite development server
```bash
npm run dev
``` 
### 4. Verification
1. Navigate to `http://localhost:5173/compliance` in your browser.
2. Confirm live KPI metrics load successfully from the database.
3. Test tab switching between **Compliance Overview**, **Risk Indicators**, and **Compliance History**.
4. Verify table text query search and sorting functionality.

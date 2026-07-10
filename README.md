# Obligation Tracker — React + FastAPI

Feature-branch code for the **Obligation Tracker** page of the Contract Obligation
Tracking & Compliance Management platform (Infosys Springboard internship group project).

This reproduces the List view and Kanban view exactly as designed in Figma:
same 10 obligations, same columns/fields, same priority/status labels, same
layout structure (header, search + toolbar, view toggle, status dot counters,
Add Obligation button).

## Structure

```
obligation-tracker/
├── backend/                  FastAPI service
│   ├── main.py                app entrypoint + CORS
│   ├── requirements.txt
│   └── app/
│       ├── models.py          Pydantic models (Obligation, Priority, Status, Assignee)
│       ├── data.py             seed data — the exact 10 obligations from the design
│       └── routers/
│           └── obligations.py  GET/POST/PATCH/DELETE + /summary counts
└── frontend/                  React (Vite) app
    ├── index.html
    ├── vite.config.js          dev proxy: /api -> http://localhost:8000
    └── src/
        ├── App.jsx             page logic, wires UI to the API
        ├── api.js               fetch helpers
        ├── index.css            all styling (colors, badges, layout)
        └── components/
            ├── Header.jsx        top bar (title, search, bell, user)
            ├── Toolbar.jsx       search, Kanban/List toggle, dot counters, Add button
            ├── ListView.jsx      table view
            ├── KanbanView.jsx    5-column board (Pending/In Progress/Under Review/Completed/Overdue)
            ├── Badges.jsx        Priority + Status pill components
            └── Avatar.jsx        colored initials avatar
```

## Running locally

**Backend**
```bash
cd backend
python -m venv venv && source venv/bin/activate   # optional
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```
API docs available at `http://localhost:8000/docs`.

**Frontend**
```bash
cd frontend
npm install
npm run dev
```
Opens at `http://localhost:5173`. The Vite dev server proxies `/api/*` calls to
the FastAPI backend on port 8000, so no `.env` / base-URL config is needed.

## Endpoints

| Method | Path                        | Purpose                                   |
|--------|-----------------------------|--------------------------------------------|
| GET    | `/api/obligations`          | list all obligations (supports `?search=`, `?status=`) |
| GET    | `/api/obligations/summary`  | counts per status (drives the toolbar dots) |
| GET    | `/api/obligations/{id}`     | single obligation                          |
| POST   | `/api/obligations`          | create obligation                          |
| PATCH  | `/api/obligations/{id}`     | update obligation                          |
| DELETE | `/api/obligations/{id}`     | delete obligation                          |

## A couple of honest notes

I rebuilt this from your screenshots, not from the original Figma file or its
design tokens/exported CSS, so two things are my best visual match rather than
exact pixel values:

1. **Exact hex colors** for the badges/backgrounds — I matched them as closely
   as I could read from the screenshots (standard blue/purple/orange/green/red
   pill colors), but if you have the Figma color styles or an exported CSS/
   design-token file, swap the values at the top of `src/index.css` (the
   `:root` block) and everything updates automatically.
2. **Fonts** — I used Inter (loaded via Google Fonts in `index.html`) since it's
   the closest common match to what's shown. If your Figma file specifies a
   different family, change the `font-family` in `index.css` and the Google
   Fonts `<link>` in `index.html`.

Everything else (page structure, all 10 obligations' data, column layout,
table columns, toggle behavior, dot counts per status, badge groupings) is
built to match your screenshots exactly.

Wire the "Add Obligation" button up to whatever modal/form your team designs
for that flow — it currently just calls a placeholder `alert()` so the rest of
the page is fully functional in the meantime.

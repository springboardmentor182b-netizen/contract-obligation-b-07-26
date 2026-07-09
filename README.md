# Obligation Tracker

Full-stack implementation of the Obligation Tracker page (React + FastAPI), matching the team's Figma design.

## Folder structure

```
obligation-tracker/
├── backend/                        # FastAPI
│   └── app/
│       ├── main.py                 # app entrypoint, CORS
│       ├── models/obligation.py    # Pydantic schemas
│       ├── routers/obligations.py  # /obligations endpoints
│       └── services/obligation_service.py  # in-memory data + logic
└── frontend/                       # React (Vite)
    └── src/
        ├── App.jsx
        └── features/obligationTracker/
            ├── ObligationTrackerPage.jsx
            ├── constants.js
            ├── api/obligationApi.js
            ├── hooks/useObligations.js
            └── components/
                ├── KanbanBoard.jsx
                ├── KanbanColumn.jsx
                ├── ObligationCard.jsx
                └── AddObligationModal.jsx
```

## Running the backend

```bash
cd backend
python -m venv venv
source venv/bin/activate        # venv\Scripts\activate on Windows
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

Check it's up: open http://localhost:8000/docs to see the interactive Swagger UI for all endpoints.

## Running the frontend

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:5173 — it will fetch obligations from `http://localhost:8000/obligations`.

**Important:** start the backend first, or the frontend will show a connection error banner.

## API endpoints

| Method | Path                          | Description                        |
|--------|-------------------------------|-------------------------------------|
| GET    | `/obligations/`               | List all (optional `?status=` `?priority=` filters) |
| GET    | `/obligations/{id}`           | Get one obligation                 |
| POST   | `/obligations/`               | Create a new obligation             |
| PUT    | `/obligations/{id}`           | Update an obligation                |
| PATCH  | `/obligations/{id}/status`    | Move to a new status (used by the ← → arrows on cards) |
| DELETE | `/obligations/{id}`           | Delete an obligation                |

## What's implemented vs. what's mocked

- Data currently lives **in memory** in `obligation_service.py` (a Python list) — restarts will reset it. Swap in SQLAlchemy + SQLite/Postgres when you're ready to persist data; the router/service layers are already split out to make that swap isolated to `obligation_service.py`.
- Moving cards between statuses is done via hover-arrow buttons on each card (← →) rather than full drag-and-drop, to keep the scope manageable — this can be upgraded to `react-dnd` or `dnd-kit` later if your task requires true drag-and-drop.
- The "List" view toggle renders a simple table as a starting point; expand it if your task calls for more detail there.

## Next steps for your feature branch

```bash
git checkout main
git pull origin main
git checkout -b feature/obligation-tracker
# copy backend/ and frontend/ contents into your group's folder structure
git add .
git commit -m "Add Obligation Tracker page (React + FastAPI)"
git push origin feature/obligation-tracker
```

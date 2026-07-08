# ContractIQ Backend

FastAPI backend for contract obligation tracking, compliance monitoring, renewal reminders, notifications, reports, and audit activity.

## Run locally

```powershell
cd server
.\venv\Scripts\Activate.ps1
uvicorn src.main:app --reload
```

The API will be available at `http://127.0.0.1:8000`.

Interactive docs:

```text
http://127.0.0.1:8000/docs
```

## Demo login

```json
{
  "email": "admin@contractiq.local",
  "password": "Admin@123"
}
```

Use the returned `access_token` as a bearer token for protected endpoints.

## Storage

This starter uses `server/data/contractiq.json` for local persistence so it can run with the packages already present in the project virtual environment. The module boundaries are intentionally close to a future PostgreSQL/SQLAlchemy migration.

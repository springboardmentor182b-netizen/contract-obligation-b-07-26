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

User registration and login use PostgreSQL.

Local database:

```text
contractiq_db
```

Default local connection:

```text
postgresql://postgres:<password>@localhost:5432/contractiq_db
```

You can override it with:

```powershell
$env:DATABASE_URL="postgresql://postgres:<password>@localhost:5432/contractiq_db"
```

Contract, obligation, renewal, report, notification, and activity demo data still use `server/data/contractiq.json`.

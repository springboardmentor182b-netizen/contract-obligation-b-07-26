# ContractIQ Database Schema

This folder contains the initial PostgreSQL schema for the ContractIQ project.

Files:
- `schema.sql` — the full DDL for tables, indexes and triggers.

Notes:
- I could not access the PDF you referenced (it appears to be outside the workspace). I created this schema based on common contract-management concepts and the existing minimal server code in `server/src` (there were no detailed entity definitions in the repo). If you want the schema to match your diagram exactly, please add the PDF into the repo or paste the diagram contents here and I will adapt the schema.
- The schema targets PostgreSQL and uses UUID primary keys for main entities.

How to apply:
```bash
psql -d your_database -f db/schema.sql
```

Next steps I can take:
- Update schema to match your PDF precisely if you provide it in the repo.
- Add SQLAlchemy models or Alembic migrations in `server/`.
- Create sample seed data and tests.

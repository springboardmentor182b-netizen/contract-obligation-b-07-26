# Database Tables — ContractIQ

This file lists the database tables included in `db/schema.sql` and links the diagram.

- Diagram: [db/diagram.pdf](db/diagram.pdf#L1)
- Schema DDL: [db/schema.sql](db/schema.sql#L1)

Tables (CREATE TABLE statements present in `db/schema.sql`):

- `users` — application users (UUID primary key, email, password_hash, metadata, timestamps)
- `roles` — role definitions
- `user_roles` — user-to-role assignment (many-to-many)
- `organizations` — tenants / organizations
- `organization_members` — users belonging to organizations
- `parties` — contractual parties (could be individuals or organizations)
- `contracts` — main contract records (title, status, dates, value, metadata)
- `contract_versions` — historical versions of a contract
- `contract_parties` — mapping between contracts and parties
- `clauses` — contract clause hierarchy and text
- `obligations` — obligations / action items derived from clauses
- `obligation_actions` — actions taken on obligations (history)
- `documents` — uploaded documents/attachments related to contracts
- `signatures` — stored signature records for contracts/parties
- `comments` — comments attached to contracts
- `tags` — tag dictionary
- `contract_tags` — many-to-many mapping of contracts to tags
- `audit_log` — generic audit trail for actions
- `todos` — simple todos (matching existing app tests)

How to view locally:

1. Open the diagram: open `db/diagram.pdf` in your local file explorer or click the file in GitHub after pushing.
2. View SQL: open `db/schema.sql` to see the full `CREATE TABLE` statements.

Apply schema (PostgreSQL):
```bash
psql -d your_database -f db/schema.sql
```

If you want: I can also generate individual per-table SQL files under `db/tables/`, or produce SQLAlchemy models / Alembic migrations. Tell me which format you prefer.

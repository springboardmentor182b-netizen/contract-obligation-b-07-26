# Database Schema — Contract Management System

## Files

| File | Description | Visibility |
|------|-------------|------------|
| `schema.sql` | Full PostgreSQL DDL — tables, indexes, views, triggers | Internal |
| `er_diagram.mermaid` | Standalone Mermaid ER diagram (import into any Mermaid renderer) | Internal |
| `er_diagram.private.md` | **Private** — full ER diagram + field reference, relationship map, design decisions | **Private** |

## Quick Start

```bash
# Create database
createdb contract_mgmt

# Apply schema
psql -d contract_mgmt -f schema.sql
```

## Table Count: 21 Tables

| # | Table | Module |
|---|-------|--------|
| 1 | `users` | Auth |
| 2 | `departments` | Auth |
| 3 | `user_sessions` | Auth |
| 4 | `password_reset_tokens` | Auth |
| 5 | `permissions` | RBAC |
| 6 | `role_permissions` | RBAC |
| 7 | `contracts` | Contracts |
| 8 | `contract_versions` | Contract Repository |
| 9 | `approval_workflows` | Contract Management |
| 10 | `approval_workflow_steps` | Contract Management |
| 11 | `contract_approvals` | Contract Management |
| 12 | `contract_comments` | Contract Management |
| 13 | `tags` | Contract Repository |
| 14 | `contract_tag_map` | Contract Repository |
| 15 | `document_archives` | Contract Repository |
| 16 | `obligations` | Obligation Tracking |
| 17 | `obligation_progress` | Obligation Tracking |
| 18 | `renewals` | Renewal Management |
| 19 | `renewal_approvals` | Renewal Management |
| 20 | `compliance_records` | Compliance Monitoring |
| 21 | `notifications` | Notifications |
| 22 | `notification_templates` | Notifications |
| 23 | `reports` | Reports |
| 24 | `audit_logs` | Audit |
| 25 | `activities` | Audit / Dashboard |
| 26 | `system_settings` | Admin |

## Views

| View | Used By |
|------|---------|
| `vw_active_contracts` | Legal Dashboard |
| `vw_upcoming_renewals` | Renewal Dashboard |
| `vw_overdue_obligations` | Compliance Dashboard |
| `vw_compliance_summary` | Compliance Dashboard |

## Tech Stack
- **Database:** PostgreSQL 15+
- **ORM:** SQLAlchemy (Python / FastAPI backend)
- **Migrations:** Alembic
- **Cache:** Redis (session tokens, notification queues)

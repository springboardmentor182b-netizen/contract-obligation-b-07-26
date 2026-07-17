# ContractIQ Database

## Overview

This directory contains the PostgreSQL database design for the **ContractIQ – Contract Obligation Tracking & Compliance Management Platform**.

The database is designed using normalization principles and supports:

- User Authentication
- Contract Management
- Contract Versioning
- Obligation Tracking
- Renewal Management
- Compliance Monitoring
- Notifications
- Reports
- Audit Logging
- Activity Tracking

---

## Database

**Database:** PostgreSQL

---

## Tables

| Table             |      Description |
|-------------------|-------------|
| users             |   Stores application users |
| contracts         |   Stores contract information |
| contract_versions |   Stores version history of contracts |
| obligations       |   Stores obligations associated with contracts |
| renewals          |   Stores renewal schedules |
| compliance_records |  Stores compliance tracking records |
| notifications     |   Stores user notifications |
| activities        |   Stores user activity logs |
| reports           |   Stores generated reports |
| audit_logs        |   Stores system audit logs |

---

## Relationships

- One User can own multiple Contracts.
- One Contract can have multiple Versions.
- One Contract can have multiple Obligations.
- One Contract can have multiple Renewals.
- One Contract can generate multiple Notifications.
- One Contract can generate multiple Activities.
- One Obligation can have multiple Compliance Records.

---

## Files

| File       |    Description |
|------------|-------------|
| schema.sql | PostgreSQL schema |
| DIAGRAM.md | Entity Relationship Diagram |

---

## Technologies

- PostgreSQL
- SQL
- Entity Relationship Modeling
- Database Normalization
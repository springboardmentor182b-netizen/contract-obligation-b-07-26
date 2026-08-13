"""Schema for the PostgreSQL-backed ContractIQ core modules.

These tables intentionally use the field names consumed by ``main.py``.  It
prevents a fresh database from receiving the older SQLAlchemy demo schema.
"""

from .users import get_connection


CREATE_CORE_TABLES = """
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS contracts (
    contract_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    contract_number VARCHAR(100) UNIQUE,
    category VARCHAR(100),
    description TEXT,
    start_date DATE,
    end_date DATE,
    status VARCHAR(50) NOT NULL DEFAULT 'Draft',
    uploaded_by UUID REFERENCES users(user_id) ON DELETE SET NULL,
    assigned_to UUID REFERENCES users(user_id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS obligations (
    obligation_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    contract_id UUID REFERENCES contracts(contract_id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    obligation_type VARCHAR(100),
    assigned_to UUID REFERENCES users(user_id) ON DELETE SET NULL,
    due_date DATE,
    completion_date DATE,
    status VARCHAR(50) NOT NULL DEFAULT 'Pending',
    compliance_level VARCHAR(50) DEFAULT 'Medium',
    remarks TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS renewals (
    renewal_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    contract_id UUID REFERENCES contracts(contract_id) ON DELETE CASCADE,
    renewal_date DATE NOT NULL,
    reminder_date DATE,
    status VARCHAR(50) NOT NULL DEFAULT 'upcoming',
    approved_by UUID REFERENCES users(user_id) ON DELETE SET NULL,
    remarks TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS audit_logs (
    audit_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(user_id) ON DELETE SET NULL,
    action VARCHAR(255) NOT NULL,
    module VARCHAR(100),
    old_value JSONB,
    new_value JSONB,
    ip_address VARCHAR(64),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS activities (
    activity_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(user_id) ON DELETE SET NULL,
    activity TEXT NOT NULL,
    activity_time TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS contracts_created_at_idx ON contracts (created_at DESC);
CREATE INDEX IF NOT EXISTS obligations_due_date_idx ON obligations (due_date);
CREATE INDEX IF NOT EXISTS renewals_renewal_date_idx ON renewals (renewal_date);
CREATE INDEX IF NOT EXISTS audit_logs_created_at_idx ON audit_logs (created_at DESC);
CREATE INDEX IF NOT EXISTS activities_user_time_idx ON activities (user_id, activity_time DESC);
"""


def initialize_core_tables() -> None:
    with get_connection() as connection:
        with connection.cursor() as cursor:
            cursor.execute(CREATE_CORE_TABLES)

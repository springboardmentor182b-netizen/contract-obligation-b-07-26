"""PostgreSQL persistence helpers for the Reports module."""

from __future__ import annotations

from typing import Any

from psycopg.rows import dict_row
from psycopg.types.json import Jsonb

from .users import get_connection


CREATE_REPORTS_TABLE = """
CREATE TABLE IF NOT EXISTS reports (
    report_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    report_name VARCHAR(200) NOT NULL,
    name VARCHAR(200) NOT NULL,
    report_type VARCHAR(100) NOT NULL,
    department VARCHAR(100),
    status VARCHAR(50) NOT NULL DEFAULT 'Generated',
    value NUMERIC(14, 2) NOT NULL DEFAULT 0,
    due_date DATE,
    filters JSONB NOT NULL DEFAULT '{}'::jsonb,
    generated_by UUID REFERENCES users(user_id) ON DELETE SET NULL,
    generated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS reports_generated_at_idx ON reports (generated_at DESC);
CREATE INDEX IF NOT EXISTS reports_status_idx ON reports (status);
"""

REPORT_PROJECTION = """
    report_id::text AS id,
    name,
    report_type,
    department,
    status,
    value,
    due_date,
    filters,
    generated_by::text,
    generated_at,
    created_at,
    updated_at
"""


def initialize_reports_table() -> None:
    with get_connection() as connection:
        with connection.cursor() as cursor:
            cursor.execute(CREATE_REPORTS_TABLE)


def _record(record: dict[str, Any] | None) -> dict[str, Any] | None:
    return dict(record) if record else None


def list_reports() -> list[dict[str, Any]]:
    with get_connection() as connection:
        with connection.cursor(row_factory=dict_row) as cursor:
            cursor.execute(f"SELECT {REPORT_PROJECTION} FROM reports ORDER BY generated_at DESC, report_id")
            return [dict(record) for record in cursor.fetchall()]


def get_report(report_id: str) -> dict[str, Any] | None:
    with get_connection() as connection:
        with connection.cursor(row_factory=dict_row) as cursor:
            cursor.execute(f"SELECT {REPORT_PROJECTION} FROM reports WHERE report_id = %s", (report_id,))
            return _record(cursor.fetchone())


def create_report(payload: dict[str, Any], generated_by: str) -> dict[str, Any]:
    with get_connection() as connection:
        with connection.cursor(row_factory=dict_row) as cursor:
            cursor.execute(
                f"""
                INSERT INTO reports (report_name, name, report_type, department, status, value, due_date, filters, generated_by)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
                RETURNING {REPORT_PROJECTION}
                """,
                (
                    payload["name"],
                    payload["name"],
                    payload["report_type"],
                    payload.get("department"),
                    payload.get("status") or "Generated",
                    payload.get("value", 0),
                    payload.get("due_date"),
                    Jsonb(payload.get("filters") or {}),
                    generated_by,
                ),
            )
            return dict(cursor.fetchone())


def delete_report(report_id: str) -> bool:
    with get_connection() as connection:
        with connection.cursor() as cursor:
            cursor.execute("DELETE FROM reports WHERE report_id = %s", (report_id,))
            return cursor.rowcount > 0

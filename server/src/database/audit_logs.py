"""PostgreSQL read access for audit-log records."""

from __future__ import annotations

from typing import Any

from psycopg.rows import dict_row

from .users import get_connection


def list_audit_logs() -> list[dict[str, Any]]:
    """Return database audit entries in the frontend API shape."""
    with get_connection() as connection:
        with connection.cursor(row_factory=dict_row) as cursor:
            cursor.execute(
                """
                SELECT
                    a.audit_id::text AS id,
                    a.user_id::text AS actor_id,
                    a.action,
                    COALESCE(a.module, 'system') AS entity_type,
                    NULL::text AS entity_id,
                    COALESCE(a.new_value, a.old_value, '{}'::jsonb) AS metadata,
                    a.ip_address,
                    a.created_at
                FROM audit_logs AS a
                ORDER BY a.created_at DESC, a.audit_id DESC
                """
            )
            return [dict(record) for record in cursor.fetchall()]

"""PostgreSQL read access for contract obligations."""

from __future__ import annotations

from typing import Any

from psycopg.rows import dict_row

from .users import get_connection


def list_obligations() -> list[dict[str, Any]]:
    """Return obligations in the shape expected by the frontend tracker."""
    with get_connection() as connection:
        with connection.cursor(row_factory=dict_row) as cursor:
            cursor.execute(
                """
                SELECT
                    o.obligation_id::text AS id,
                    o.contract_id::text AS contract_id,
                    o.title,
                    COALESCE(c.contract_number, '—') AS contract_number,
                    COALESCE(c.category, 'Unassigned') AS department,
                    COALESCE(u.full_name, 'Unassigned') AS owner,
                    o.due_date,
                    o.completion_date,
                    o.status,
                    COALESCE(o.compliance_level, 'Normal') AS priority,
                    o.compliance_level,
                    o.remarks AS notes,
                    o.created_at
                FROM obligations AS o
                LEFT JOIN contracts AS c ON c.contract_id = o.contract_id
                LEFT JOIN users AS u ON u.user_id = o.assigned_to
                ORDER BY o.due_date NULLS LAST, o.obligation_id
                """
            )
            return [dict(record) for record in cursor.fetchall()]

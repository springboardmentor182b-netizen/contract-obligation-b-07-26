"""PostgreSQL persistence helpers for in-app notifications."""

from __future__ import annotations

from typing import Any

from psycopg.rows import dict_row

from .users import get_connection, CREATE_USERS_TABLE


CREATE_NOTIFICATIONS_TABLE = """
CREATE TABLE IF NOT EXISTS notifications (
    notification_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
    contract_id UUID,
    title VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    notification_type VARCHAR(50) NOT NULL DEFAULT 'system',
    is_read BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS notifications_user_created_idx
    ON notifications (user_id, created_at DESC);
"""

NOTIFICATION_PROJECTION = """
    notification_id AS id,
    user_id AS recipient_user_id,
    contract_id AS related_id,
    notification_type AS related_type,
    notification_type,
    title,
    message,
    is_read AS read,
    created_at
"""


def initialize_notifications_table() -> None:
    with get_connection() as connection:
        with connection.cursor() as cursor:
            # First ensure users table exists
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS users (
                    user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                    full_name VARCHAR(100) NOT NULL,
                    email VARCHAR(150) NOT NULL UNIQUE,
                    password_hash TEXT NOT NULL,
                    role TEXT NOT NULL,
                    phone VARCHAR(15),
                    department VARCHAR(100),
                    status BOOLEAN NOT NULL DEFAULT TRUE,
                    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
                    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
                );
            """)
            # Then create notifications table
            cursor.execute(CREATE_NOTIFICATIONS_TABLE)


def _serialize(record: dict[str, Any] | None) -> dict[str, Any] | None:
    if not record:
        return None
    result = dict(record)
    for key in ("id", "recipient_user_id", "related_id"):
        if result.get(key) is not None:
            result[key] = str(result[key])
    return result


def list_notifications(user_id: str, is_administrator: bool) -> list[dict[str, Any]]:
    visibility = "TRUE" if is_administrator else "user_id IS NULL OR user_id = %s"
    parameters: tuple[str, ...] = () if is_administrator else (user_id,)
    with get_connection() as connection:
        with connection.cursor(row_factory=dict_row) as cursor:
            cursor.execute(
                f"SELECT {NOTIFICATION_PROJECTION} FROM notifications WHERE {visibility} ORDER BY created_at DESC",
                parameters,
            )
            return [_serialize(item) for item in cursor.fetchall()]


def create_notification(payload: dict[str, Any]) -> dict[str, Any]:
    with get_connection() as connection:
        with connection.cursor(row_factory=dict_row) as cursor:
            cursor.execute(
                f"""
                INSERT INTO notifications (user_id, contract_id, title, message, notification_type)
                VALUES (%s, %s, %s, %s, %s)
                RETURNING {NOTIFICATION_PROJECTION}
                """,
                (
                    payload.get("recipient_user_id"),
                    payload.get("related_id"),
                    payload["title"],
                    payload["message"],
                    payload.get("related_type") or "system",
                ),
            )
            return _serialize(cursor.fetchone())


def mark_notification_read(notification_id: str, user_id: str, is_administrator: bool) -> dict[str, Any] | None:
    visibility = "TRUE" if is_administrator else "user_id IS NULL OR user_id = %s"
    parameters: tuple[str, ...] = (notification_id,) if is_administrator else (notification_id, user_id)
    with get_connection() as connection:
        with connection.cursor(row_factory=dict_row) as cursor:
            cursor.execute(
                f"""
                UPDATE notifications SET is_read = TRUE
                WHERE notification_id = %s AND ({visibility})
                RETURNING {NOTIFICATION_PROJECTION}
                """,
                parameters,
            )
            return _serialize(cursor.fetchone())


def mark_all_notifications_read(user_id: str, is_administrator: bool) -> int:
    visibility = "TRUE" if is_administrator else "user_id IS NULL OR user_id = %s"
    parameters: tuple[str, ...] = () if is_administrator else (user_id,)
    with get_connection() as connection:
        with connection.cursor() as cursor:
            cursor.execute(f"UPDATE notifications SET is_read = TRUE WHERE NOT is_read AND ({visibility})", parameters)
            return cursor.rowcount

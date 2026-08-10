"""Persistent login-session support for the Security settings page."""

from __future__ import annotations

from typing import Any

from psycopg.rows import dict_row

from .users import get_connection


CREATE_SESSIONS_TABLE = """
CREATE TABLE IF NOT EXISTS user_sessions (
    session_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    token_id TEXT NOT NULL UNIQUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    last_active_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    revoked_at TIMESTAMPTZ
);
CREATE INDEX IF NOT EXISTS user_sessions_user_idx ON user_sessions (user_id, last_active_at DESC);
"""


def initialize_sessions_table() -> None:
    with get_connection() as connection:
        with connection.cursor() as cursor:
            cursor.execute(CREATE_SESSIONS_TABLE)


def create_session(user_id: str, token_id: str) -> None:
    with get_connection() as connection:
        with connection.cursor() as cursor:
            cursor.execute("INSERT INTO user_sessions (user_id, token_id) VALUES (%s, %s)", (user_id, token_id))


def session_is_active(token_id: str) -> bool:
    with get_connection() as connection:
        with connection.cursor() as cursor:
            cursor.execute("SELECT 1 FROM user_sessions WHERE token_id = %s AND revoked_at IS NULL", (token_id,))
            return cursor.fetchone() is not None


def touch_session(token_id: str) -> None:
    with get_connection() as connection:
        with connection.cursor() as cursor:
            cursor.execute("UPDATE user_sessions SET last_active_at = NOW() WHERE token_id = %s AND revoked_at IS NULL", (token_id,))


def list_sessions(user_id: str) -> list[dict[str, Any]]:
    with get_connection() as connection:
        with connection.cursor(row_factory=dict_row) as cursor:
            cursor.execute(
                """SELECT session_id::text AS id, created_at, last_active_at
                   FROM user_sessions WHERE user_id = %s AND revoked_at IS NULL
                   ORDER BY last_active_at DESC""",
                (user_id,),
            )
            return [dict(row) for row in cursor.fetchall()]


def revoke_session(user_id: str, session_id: str) -> bool:
    with get_connection() as connection:
        with connection.cursor() as cursor:
            cursor.execute(
                "UPDATE user_sessions SET revoked_at = NOW() WHERE session_id = %s AND user_id = %s AND revoked_at IS NULL",
                (session_id, user_id),
            )
            return cursor.rowcount > 0

"""PostgreSQL persistence for per-user settings."""

from __future__ import annotations

from typing import Any

from psycopg.rows import dict_row
from psycopg.types.json import Jsonb

from .users import get_connection


CREATE_USER_SETTINGS_TABLE = """
CREATE TABLE IF NOT EXISTS user_settings (
    user_id UUID PRIMARY KEY REFERENCES users(user_id) ON DELETE CASCADE,
    preferences JSONB NOT NULL DEFAULT '{}'::jsonb,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
"""

CREATE_API_KEYS_TABLE = """
CREATE TABLE IF NOT EXISTS api_keys (
    api_key_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    label VARCHAR(100) NOT NULL,
    environment VARCHAR(30) NOT NULL DEFAULT 'Production',
    key_prefix VARCHAR(24) NOT NULL,
    key_hash TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    revoked_at TIMESTAMPTZ
);
CREATE INDEX IF NOT EXISTS api_keys_user_id_idx ON api_keys (user_id, created_at DESC);
"""


def initialize_settings_table() -> None:
    with get_connection() as connection:
        with connection.cursor() as cursor:
            cursor.execute(CREATE_USER_SETTINGS_TABLE)
            cursor.execute(CREATE_API_KEYS_TABLE)


def get_preferences(user_id: str) -> dict[str, Any]:
    with get_connection() as connection:
        with connection.cursor(row_factory=dict_row) as cursor:
            cursor.execute("SELECT preferences FROM user_settings WHERE user_id = %s", (user_id,))
            record = cursor.fetchone()
            return dict(record["preferences"]) if record else {}


def update_preferences(user_id: str, section: str, values: dict[str, Any]) -> dict[str, Any]:
    preferences = get_preferences(user_id)
    existing = preferences.get(section, {})
    preferences[section] = {**existing, **values}
    with get_connection() as connection:
        with connection.cursor(row_factory=dict_row) as cursor:
            cursor.execute(
                """
                INSERT INTO user_settings (user_id, preferences)
                VALUES (%s, %s)
                ON CONFLICT (user_id) DO UPDATE
                SET preferences = EXCLUDED.preferences, updated_at = NOW()
                RETURNING preferences
                """,
                (user_id, Jsonb(preferences)),
            )
            return dict(cursor.fetchone()["preferences"])


def list_api_keys(user_id: str) -> list[dict[str, Any]]:
    with get_connection() as connection:
        with connection.cursor(row_factory=dict_row) as cursor:
            cursor.execute(
                """SELECT api_key_id::text AS id, label, environment, key_prefix, created_at
                   FROM api_keys WHERE user_id = %s AND revoked_at IS NULL ORDER BY created_at DESC""",
                (user_id,),
            )
            return [dict(row) for row in cursor.fetchall()]


def create_api_key(user_id: str, label: str, environment: str, key_prefix: str, key_hash: str) -> dict[str, Any]:
    with get_connection() as connection:
        with connection.cursor(row_factory=dict_row) as cursor:
            cursor.execute(
                """INSERT INTO api_keys (user_id, label, environment, key_prefix, key_hash)
                   VALUES (%s, %s, %s, %s, %s)
                   RETURNING api_key_id::text AS id, label, environment, key_prefix, created_at""",
                (user_id, label, environment, key_prefix, key_hash),
            )
            return dict(cursor.fetchone())


def revoke_api_key(user_id: str, key_id: str) -> bool:
    with get_connection() as connection:
        with connection.cursor() as cursor:
            cursor.execute(
                "UPDATE api_keys SET revoked_at = NOW() WHERE api_key_id = %s AND user_id = %s AND revoked_at IS NULL",
                (key_id, user_id),
            )
            return cursor.rowcount > 0

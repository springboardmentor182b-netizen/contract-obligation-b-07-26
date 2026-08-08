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


def initialize_settings_table() -> None:
    with get_connection() as connection:
        with connection.cursor() as cursor:
            cursor.execute(CREATE_USER_SETTINGS_TABLE)


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

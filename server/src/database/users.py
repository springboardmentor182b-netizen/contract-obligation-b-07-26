from __future__ import annotations

from typing import Any

import psycopg
from psycopg.rows import dict_row

from ..config import DATABASE_URL


CREATE_USERS_TABLE = """
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    role TEXT NOT NULL,
    department TEXT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
"""


def get_connection():
    return psycopg.connect(DATABASE_URL, row_factory=dict_row)


def initialize_database() -> None:
    with get_connection() as connection:
        with connection.cursor() as cursor:
            cursor.execute("CREATE EXTENSION IF NOT EXISTS pgcrypto;")
            cursor.execute(CREATE_USERS_TABLE)


def normalize_user(user: dict[str, Any] | None) -> dict[str, Any] | None:
    if not user:
        return None
    normalized = dict(user)
    normalized["id"] = str(normalized["id"])
    return normalized


def find_user_by_email(email: str) -> dict[str, Any] | None:
    with get_connection() as connection:
        with connection.cursor() as cursor:
            cursor.execute(
                """
                SELECT id, name, email, password_hash, role, department, is_active, created_at, updated_at
                FROM users
                WHERE lower(email) = lower(%s)
                """,
                (email,),
            )
            return normalize_user(cursor.fetchone())


def find_user_by_id(user_id: str) -> dict[str, Any] | None:
    with get_connection() as connection:
        with connection.cursor() as cursor:
            cursor.execute(
                """
                SELECT id, name, email, password_hash, role, department, is_active, created_at, updated_at
                FROM users
                WHERE id = %s
                """,
                (user_id,),
            )
            return normalize_user(cursor.fetchone())


def create_user(payload: dict[str, Any]) -> dict[str, Any]:
    with get_connection() as connection:
        with connection.cursor() as cursor:
            cursor.execute(
                """
                INSERT INTO users (name, email, password_hash, role, department)
                VALUES (%s, lower(%s), %s, %s, %s)
                RETURNING id, name, email, password_hash, role, department, is_active, created_at, updated_at
                """,
                (
                    payload["name"],
                    payload["email"],
                    payload["password_hash"],
                    payload["role"],
                    payload.get("department"),
                ),
            )
            return normalize_user(cursor.fetchone())


def list_users() -> list[dict[str, Any]]:
    with get_connection() as connection:
        with connection.cursor() as cursor:
            cursor.execute(
                """
                SELECT id, name, email, password_hash, role, department, is_active, created_at, updated_at
                FROM users
                ORDER BY created_at DESC
                """
            )
            return [normalize_user(user) for user in cursor.fetchall()]


def update_user_password(email: str, password_hash: str) -> dict[str, Any] | None:
    with get_connection() as connection:
        with connection.cursor() as cursor:
            cursor.execute(
                """
                UPDATE users
                SET password_hash = %s, updated_at = NOW()
                WHERE lower(email) = lower(%s)
                RETURNING id, name, email, password_hash, role, department, is_active, created_at, updated_at
                """,
                (password_hash, email),
            )
            return normalize_user(cursor.fetchone())

from __future__ import annotations

from typing import Any

import psycopg
from psycopg.rows import dict_row

from ..config import DATABASE_URL


def psycopg_database_url() -> str:
    """Convert SQLAlchemy's psycopg URL into a libpq-compatible URL."""
    return DATABASE_URL.replace(
        "postgresql+psycopg://",
        "postgresql://",
        1,
    )


CREATE_USERS_TABLE = """
CREATE TABLE IF NOT EXISTS users (
    user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    role TEXT NOT NULL,
    phone VARCHAR(15),
    department VARCHAR(100),
    status BOOLEAN NOT NULL DEFAULT TRUE,
    deleted_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
"""

USER_PROJECTION = """
    user_id AS id,
    full_name AS name,
    email,
    password_hash,
    role,
    department,
    status AS is_active,
    created_at,
    updated_at,
    deleted_at
"""


def get_connection():
    return psycopg.connect(
        psycopg_database_url(),
        row_factory=dict_row,
    )


def initialize_database() -> None:
    with get_connection() as connection:
        with connection.cursor() as cursor:
            cursor.execute("CREATE EXTENSION IF NOT EXISTS pgcrypto;")
            cursor.execute(CREATE_USERS_TABLE)
            cursor.execute("ALTER TABLE users ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMPTZ;")


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
                f"""
                SELECT {USER_PROJECTION}
                FROM users
                WHERE lower(email) = lower(%s) AND deleted_at IS NULL
                """,
                (email,),
            )
            return normalize_user(cursor.fetchone())


def find_user_by_id(user_id: str) -> dict[str, Any] | None:
    with get_connection() as connection:
        with connection.cursor() as cursor:
            cursor.execute(
                f"""
                SELECT {USER_PROJECTION}
                FROM users
                WHERE user_id = %s
                """,
                (user_id,),
            )
            return normalize_user(cursor.fetchone())


def create_user(payload: dict[str, Any]) -> dict[str, Any]:
    with get_connection() as connection:
        with connection.cursor() as cursor:
            cursor.execute(
                f"""
                INSERT INTO users (
                    full_name,
                    email,
                    password_hash,
                    role,
                    department
                )
                VALUES (%s, lower(%s), %s, %s, %s)
                RETURNING {USER_PROJECTION}
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


def list_users(include_deleted: bool = False) -> list[dict[str, Any]]:
    with get_connection() as connection:
        with connection.cursor() as cursor:
            cursor.execute(
                f"""
                SELECT {USER_PROJECTION}
                FROM users
                {"" if include_deleted else "WHERE deleted_at IS NULL"}
                ORDER BY created_at DESC
                """
            )
            return [normalize_user(user) for user in cursor.fetchall()]


def update_user_password(email: str, password_hash: str) -> dict[str, Any] | None:
    with get_connection() as connection:
        with connection.cursor() as cursor:
            cursor.execute(
                f"""
                UPDATE users
                SET password_hash = %s, updated_at = NOW()
                WHERE lower(email) = lower(%s)
                RETURNING {USER_PROJECTION}
                """,
                (password_hash, email),
            )
            return normalize_user(cursor.fetchone())


def update_user(user_id: str, payload: dict[str, Any]) -> dict[str, Any] | None:
    fields = {
        "name": "full_name = %s",
        "email": "email = lower(%s)",
        "role": "role = %s",
        "department": "department = %s",
        "is_active": "status = %s",
        "password_hash": "password_hash = %s",
    }
    keys = [key for key in payload if key in fields]
    if not keys:
        return find_user_by_id(user_id)

    with get_connection() as connection:
        with connection.cursor() as cursor:
            cursor.execute(
                f"""
                UPDATE users
                SET {", ".join(fields[key] for key in keys)}, updated_at = NOW()
                WHERE user_id = %s
                RETURNING {USER_PROJECTION}
                """,
                (*[payload[key] for key in keys], user_id),
            )
            return normalize_user(cursor.fetchone())


def delete_user(user_id: str) -> bool:
    with get_connection() as connection:
        with connection.cursor() as cursor:
            cursor.execute(
                """
                UPDATE users
                SET status = FALSE, deleted_at = NOW(), updated_at = NOW()
                WHERE user_id = %s AND deleted_at IS NULL
                RETURNING user_id
                """,
                (user_id,),
            )
            return cursor.fetchone() is not None


def restore_user(user_id: str) -> dict[str, Any] | None:
    with get_connection() as connection:
        with connection.cursor() as cursor:
            cursor.execute(
                f"""
                UPDATE users
                SET status = TRUE, deleted_at = NULL, updated_at = NOW()
                WHERE user_id = %s AND deleted_at IS NOT NULL
                RETURNING {USER_PROJECTION}
                """,
                (user_id,),
            )
            return normalize_user(cursor.fetchone())

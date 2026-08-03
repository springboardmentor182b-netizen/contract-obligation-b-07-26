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
    return psycopg.connect(
        psycopg_database_url(),
        row_factory=dict_row,
    )


def user_columns(cursor) -> set[str]:
    cursor.execute(
        """
        SELECT column_name
        FROM information_schema.columns
        WHERE table_name = 'users'
        """
    )
    return {row["column_name"] for row in cursor.fetchall()}


def user_projection(columns: set[str]) -> str:
    id_column = "user_id" if "user_id" in columns else "id"
    name_column = "full_name" if "full_name" in columns else "name"
    active_column = "status" if "status" in columns else "is_active"
    return f"""
        {id_column} AS id,
        {name_column} AS name,
        email,
        password_hash,
        role,
        department,
        {active_column} AS is_active,
        created_at,
        updated_at
    """


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
            columns = user_columns(cursor)
            cursor.execute(
                f"""
                SELECT {user_projection(columns)}
                FROM users
                WHERE lower(email) = lower(%s)
                """,
                (email,),
            )
            return normalize_user(cursor.fetchone())


def find_user_by_id(user_id: str) -> dict[str, Any] | None:
    with get_connection() as connection:
        with connection.cursor() as cursor:
            columns = user_columns(cursor)
            id_column = "user_id" if "user_id" in columns else "id"
            cursor.execute(
                f"""
                SELECT {user_projection(columns)}
                FROM users
                WHERE {id_column} = %s
                """,
                (user_id,),
            )
            return normalize_user(cursor.fetchone())


def create_user(payload: dict[str, Any]) -> dict[str, Any]:
    with get_connection() as connection:
        with connection.cursor() as cursor:
            columns = user_columns(cursor)
            name_column = "full_name" if "full_name" in columns else "name"
            cursor.execute(
                f"""
                INSERT INTO users (
                    {name_column},
                    email,
                    password_hash,
                    role,
                    department
                )
                VALUES (%s, lower(%s), %s, %s, %s)
                RETURNING {user_projection(columns)}
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
            columns = user_columns(cursor)
            cursor.execute(
                f"""
                SELECT {user_projection(columns)}
                FROM users
                ORDER BY created_at DESC
                """
            )
            return [normalize_user(user) for user in cursor.fetchall()]


def update_user_password(email: str, password_hash: str) -> dict[str, Any] | None:
    with get_connection() as connection:
        with connection.cursor() as cursor:
            columns = user_columns(cursor)
            cursor.execute(
                f"""
                UPDATE users
                SET password_hash = %s, updated_at = NOW()
                WHERE lower(email) = lower(%s)
                RETURNING {user_projection(columns)}
                """,
                (password_hash, email),
            )
            return normalize_user(cursor.fetchone())

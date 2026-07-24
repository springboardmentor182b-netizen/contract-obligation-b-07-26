import math
from sqlalchemy import text
from app.database import engine


def get_users(
    search=None,
    role=None,
    status=None,
    department=None,
    sort_by="name",
    sort_order="asc",
    page=1,
    per_page=10,
):
    query = """
        SELECT
            id,
            full_name,
            email,
            role,
            department,
            status,
            last_login
        FROM users
    """

    conditions = []
    params = {}

    if search:
        conditions.append(
            "(LOWER(full_name) LIKE :search OR LOWER(email) LIKE :search)"
        )
        params["search"] = f"%{search.lower()}%"

    if role and role.lower() != "all":
        conditions.append("role = :role")
        params["role"] = role

    if status and status.lower() != "all":
        conditions.append("status = :status")
        params["status"] = status

    if department and department.lower() != "all":
        conditions.append("department = :department")
        params["department"] = department

    if conditions:
        query += " WHERE " + " AND ".join(conditions)

    sort_columns = {
        "name": "full_name",
        "email": "email",
        "role": "role",
        "department": "department",
        "status": "status",
    }

    column = sort_columns.get(sort_by, "full_name")
    direction = "DESC" if sort_order.lower() == "desc" else "ASC"

    query += f" ORDER BY {column} {direction}"

    with engine.connect() as conn:
        rows = conn.execute(text(query), params).fetchall()

    users = []

    for row in rows:
        users.append(
            {
                "id": row.id,
                "name": row.full_name,
                "email": row.email,
                "role": row.role,
                "department": row.department,
                "status": row.status,
                "last_login": row.last_login,
            }
        )

    total = len(users)

    start = (page - 1) * per_page
    end = start + per_page

    return {
        "users": users[start:end],
        "total": total,
        "page": page,
        "per_page": per_page,
        "total_pages": math.ceil(total / per_page) if total else 1,
    }


def get_user_stats():
    with engine.connect() as conn:
        total = conn.execute(
            text("SELECT COUNT(*) FROM users")
        ).scalar()

        active = conn.execute(
            text("SELECT COUNT(*) FROM users WHERE status='Active'")
        ).scalar()

        blocked = conn.execute(
            text("SELECT COUNT(*) FROM users WHERE status='Blocked'")
        ).scalar()

    return {
        "total_users": total,
        "active_users": active,
        "blocked_users": blocked,
        "new_registrations": total,
        "active_percentage": round((active / total) * 100, 1) if total else 0,
        "blocked_percentage": round((blocked / total) * 100, 1) if total else 0,
        "new_vs_last_month": 0,
    }


def get_role_distribution():
    with engine.connect() as conn:
        rows = conn.execute(
            text(
                """
                SELECT role, COUNT(*) AS total
                FROM users
                GROUP BY role
                ORDER BY COUNT(*) DESC
                """
            )
        ).fetchall()

    colors = {
        "Admin": "#2563EB",
        "Manager": "#8B5CF6",
        "Editor": "#22C55E",
        "Viewer": "#F59E0B",
    }

    return [
        {
            "name": row.role,
            "value": row.total,
            "color": colors.get(row.role, "#CBD5E1"),
        }
        for row in rows
    ]


def get_registration_trend():
    with engine.connect() as conn:
        rows = conn.execute(
            text(
                """
                SELECT
                    TO_CHAR(created_at, 'Mon') AS month,
                    COUNT(*) AS users
                FROM users
                GROUP BY
                    EXTRACT(MONTH FROM created_at),
                    TO_CHAR(created_at, 'Mon')
                ORDER BY
                    EXTRACT(MONTH FROM created_at)
                """
            )
        ).fetchall()

    return [
        {
            "month": row.month,
            "users": row.users,
        }
        for row in rows
    ]
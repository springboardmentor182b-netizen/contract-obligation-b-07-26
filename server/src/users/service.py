"""
Users Service - Business Logic
"""

from ..database.core import get_db


async def get_demo_users():
    """Get list of demo users"""
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('SELECT email, role FROM users ORDER BY id')
    rows = cursor.fetchall()
    conn.close()
    # Convert sqlite3.Row objects to dict
    users = [{"email": dict(row)["email"], "role": dict(row)["role"]} for row in rows]
    return users

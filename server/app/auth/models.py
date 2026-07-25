"""
No new tables here. `User` already lives in app.users.models — this file
exists only so the `auth/` folder isn't empty and so anything importing
`app.auth.models` doesn't break, but the canonical model is imported from
users. See app/users/models.py for the actual User table definition.
"""
from app.users.models import User  # re-exported for convenience

__all__ = ["User"]

"""
Central app configuration. Pulls from environment variables where possible
so secrets aren't hardcoded — falls back to dev defaults if unset.

IMPORTANT: change SECRET_KEY before deploying anywhere real. Generate one
with: python -c "import secrets; print(secrets.token_hex(32))"
"""
import os

SECRET_KEY = os.getenv("SECRET_KEY", "dev-only-secret-change-me")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30
REFRESH_TOKEN_EXPIRE_DAYS = 7

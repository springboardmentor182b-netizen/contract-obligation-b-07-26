"""Application configuration loaded from server/.env."""

import os
from pathlib import Path

from dotenv import load_dotenv


BASE_DIR = Path(__file__).resolve().parents[1]
load_dotenv(BASE_DIR / ".env")

APP_NAME = os.getenv("APP_NAME", "ContractIQ API")

DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    raise RuntimeError(
        "DATABASE_URL is not configured. Add it to server/.env."
    )

# Older deployment files may use ``postgresql://``.  SQLAlchemy maps that
# scheme to psycopg2 by default, while ContractIQ installs Psycopg 3.
if DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql+psycopg://", 1)
elif DATABASE_URL.startswith("postgresql://"):
    DATABASE_URL = DATABASE_URL.replace("postgresql://", "postgresql+psycopg://", 1)

TOKEN_SECRET = os.getenv(
    "TOKEN_SECRET",
    "replace-this-secret-in-production",
)
TOKEN_TTL_SECONDS = int(os.getenv("TOKEN_TTL_SECONDS", "28800"))

# Optional server-side AI configuration. Never expose this key to the React app.
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "").strip()
OPENAI_MODEL = os.getenv("OPENAI_MODEL", "gpt-5.4-nano").strip()

# Compatibility settings used by older modules in the project. Defaults allow
# local development to start when these optional environment variables are absent.
SECRET_KEY = os.getenv("SECRET_KEY", TOKEN_SECRET)
ALGORITHM = os.getenv("ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "480"))

# Retained for teammate modules that still use the legacy JSON store.
DATA_DIR = BASE_DIR / "data"
DATA_FILE = DATA_DIR / "contractiq.json"

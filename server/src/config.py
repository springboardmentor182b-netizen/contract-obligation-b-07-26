"""Application configuration loaded from server/.env."""

import os
from pathlib import Path

from dotenv import load_dotenv
from sqlalchemy.engine import URL


BASE_DIR = Path(__file__).resolve().parents[1]
load_dotenv(BASE_DIR / ".env")

APP_NAME = os.getenv("APP_NAME", "ContractIQ API")
TOKEN_SECRET = os.getenv("TOKEN_SECRET", "replace-this-secret-in-production")
TOKEN_TTL_SECONDS = int(os.getenv("TOKEN_TTL_SECONDS", "28800"))

# Retained for teammate modules that still use the legacy JSON store.
DATA_DIR = BASE_DIR / "data"
DATA_FILE = DATA_DIR / "contractiq.json"



def env_value(*names: str, default: str | None = None) -> str | None:
    for name in names:
        value = os.getenv(name)
        if value:
            return value
    return default


DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    DATABASE_URL = URL.create(
        drivername="postgresql",
        username=env_value("DATABASE_USER", "DB_USER", default="postgres"),
        password=env_value("DATABASE_PASSWORD", "DB_PASSWORD", default="postgres"),
        host=env_value("DATABASE_HOST", "DB_HOST", default="127.0.0.1"),
        port=int(env_value("DATABASE_PORT", "DB_PORT", default="5432")),
        database=env_value("DATABASE_NAME", "DB_NAME", default="contractiq_db"),
    ).render_as_string(hide_password=False)

import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")
ACCESS_TOKEN_EXPIRE_MINUTES = int(
    os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES")
)


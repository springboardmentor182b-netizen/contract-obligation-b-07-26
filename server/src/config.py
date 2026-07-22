from pathlib import Path
import os

from dotenv import load_dotenv


# =========================================================
# PATH CONFIGURATION
# =========================================================

# config.py -> server/src/config.py
# parents[1] -> server/
BASE_DIR = Path(__file__).resolve().parents[1]

# server/.env
ENV_FILE = BASE_DIR / ".env"

# Load environment variables
load_dotenv(dotenv_path=ENV_FILE)


# =========================================================
# APPLICATION CONFIGURATION
# =========================================================

APP_NAME = os.getenv(
    "APP_NAME",
    "ContractIQ API",
)


# =========================================================
# DATABASE CONFIGURATION
# =========================================================

DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    raise RuntimeError(
        "DATABASE_URL is not configured. "
        "Add DATABASE_URL to server/.env"
    )


# =========================================================
# AUTHENTICATION CONFIGURATION
# =========================================================

TOKEN_SECRET = os.getenv(
    "TOKEN_SECRET",
    "replace-this-secret-in-production",
)

TOKEN_TTL_SECONDS = int(
    os.getenv(
        "TOKEN_TTL_SECONDS",
        "28800",
    )
)


# =========================================================
# LEGACY JSON DATA CONFIGURATION
# =========================================================
# Keep these only if some existing code still imports
# DATA_DIR or DATA_FILE.

DATA_DIR = BASE_DIR / "data"

DATA_FILE = DATA_DIR / "contractiq.json"
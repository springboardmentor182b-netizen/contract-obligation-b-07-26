from pathlib import Path
import os


BASE_DIR = Path(__file__).resolve().parents[1]
DATA_DIR = BASE_DIR / "data"
DATA_FILE = DATA_DIR / "contractiq.json"

APP_NAME = "ContractIQ API"
TOKEN_SECRET = "replace-this-secret-in-production"
TOKEN_TTL_SECONDS = 60 * 60 * 8
DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql://postgres:postgres@localhost:5432/contractiq_db",
)

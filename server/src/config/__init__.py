from pathlib import Path

DATABASE_URL = "postgresql://postgres:postgres@localhost:5432/contract_obligation"

TOKEN_SECRET = "my_secret_key_12345"

TOKEN_TTL_SECONDS = 3600

DATA_DIR = Path(__file__).resolve().parent.parent / "data"
DATA_FILE = DATA_DIR / "data.json"
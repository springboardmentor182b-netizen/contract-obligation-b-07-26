import os

from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.engine import URL
from sqlalchemy.orm import declarative_base, sessionmaker

load_dotenv()


def env_value(*names: str, default: str | None = None) -> str | None:
    for name in names:
        value = os.getenv(name)
        if value:
            return value
    return default


DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    DATABASE_URL = URL.create(
        drivername="postgresql+psycopg2",
        username=env_value("DATABASE_USER", "DB_USER", default="postgres"),
        password=env_value("DATABASE_PASSWORD", "DB_PASSWORD", default="postgres"),
        host=env_value("DATABASE_HOST", "DB_HOST", default="127.0.0.1"),
        port=int(env_value("DATABASE_PORT", "DB_PORT", default="5432")),
        database=env_value("DATABASE_NAME", "DB_NAME", default="contractiq_db"),
    )

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)
Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker
import psycopg2

DATABASE_URL = "postgresql://postgres:2006@localhost:5432/contractiq"

engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine,
)

Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def get_connection():
    return psycopg2.connect(
        host="localhost",
        database="contract_obligations",
        user="eureka",
        password="9896224545",
        port="5432",
    )
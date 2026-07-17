from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# 🚨 CHANGE "your_password_here" to your actual pgAdmin password!
# We are connecting to the default "postgres" database.
SQLALCHEMY_DATABASE_URL = "postgresql://postgres:postgres@localhost:5432/postgres"

# PostgreSQL doesn't need the check_same_thread argument that SQLite used
engine = create_engine(SQLALCHEMY_DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
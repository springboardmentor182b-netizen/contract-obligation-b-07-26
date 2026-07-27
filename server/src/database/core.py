import os
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# 1. Load the environment variables from your local .env file
load_dotenv()

# 2. Fetch the database URL dynamically from the .env file
SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL")

# Safety check: throw an error if the .env file is missing
if not SQLALCHEMY_DATABASE_URL:
    raise ValueError("🚨 DATABASE_URL is missing! Please create a .env file.")

# PostgreSQL connection
engine = create_engine(SQLALCHEMY_DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
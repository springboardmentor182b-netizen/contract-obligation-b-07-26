import os
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Load environment variables from the .env file
load_dotenv()

# Fetch the database URL from the environment.
# (Includes a fallback just in case the .env file is missing)
SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./fallback.db")

engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()





from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Database URL configuration
SQLALCHEMY_DATABASE_URL = "postgresql://postgres:25072006@localhost:5432/contractiq_db"

engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

# This is the missing function!
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    # Database
    DATABASE_URL: str = "sqlite:///./contractiq.db"
    
    # JWT
    SECRET_KEY: str = "your-secret-key-change-in-production-09af8sd7f98asdf"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # Application
    APP_NAME: str = "ContractIQ"
    DEBUG: bool = True
    
    # Email Configuration
    MAIL_USERNAME: str = ""
    MAIL_PASSWORD: str = ""
    MAIL_FROM: str = ""
    MAIL_PORT: int = 587
    MAIL_SERVER: str = "smtp.gmail.com"
    MAIL_FROM_NAME: str = "ContractIQ"
    
    class Config:
        env_file = ".env"

settings = Settings()

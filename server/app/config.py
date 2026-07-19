"""
Application Configuration
"""
from pydantic_settings import BaseSettings
from pydantic import Field


class Settings(BaseSettings):
    """Application settings"""
    
    # Application
    APP_NAME: str = Field(default="Contract Management System")
    VERSION: str = Field(default="1.0.0")
    DEBUG: bool = Field(default=True)
    ENVIRONMENT: str = Field(default="development")
    
    # Database (port 3702 for PostgreSQL)
    DATABASE_URL: str = Field(
        default="postgresql+asyncpg://postgres:postgres@localhost:3702/contract_mgmt"
    )
    
    # Security
    SECRET_KEY: str = Field(
        default="09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
    )
    ALGORITHM: str = Field(default="HS256")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = Field(default=30)
    REFRESH_TOKEN_EXPIRE_DAYS: int = Field(default=7)
    
    # CORS
    CORS_ORIGINS: str = Field(
        default='["http://localhost:4200","http://localhost:3000","http://localhost:8000"]'
    )
    
    # File Upload
    MAX_FILE_SIZE: int = Field(default=10485760)  # 10MB
    ALLOWED_EXTENSIONS: str = Field(default='[".pdf",".docx",".xlsx",".jpg",".png"]')
    
    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()

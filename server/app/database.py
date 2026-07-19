"""
Database Configuration
"""
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy.orm import declarative_base
from sqlalchemy.pool import NullPool

from app.config import settings

# Create async engine with NullPool for development
engine = create_async_engine(
    settings.DATABASE_URL,
    echo=settings.DEBUG,
    poolclass=NullPool
)

# Create async session factory
AsyncSessionLocal = async_sessionmaker(
    engine,
    class_=AsyncSession,
    expire_on_commit=False,
    autocommit=False,
    autoflush=False
)

# Base class for models
Base = declarative_base()


async def get_db() -> AsyncSession:
    """
    Dependency to get database session
    """
    async with AsyncSessionLocal() as session:
        try:
            yield session
        finally:
            await session.close()


async def init_db():
    """
    Initialize database tables
    """
    async with engine.begin() as conn:
        # Import all models here to ensure they're registered
        from app.auth import models as auth_models
        from app.users import models as user_models
        from app.reports import models as report_models
        
        # Create tables (if they don't exist)
        # await conn.run_sync(Base.metadata.create_all)
        pass  # Tables already created via schema.sql

"""
Database migration script for settings_profiles table.

This migration adds a user_id column to store the UUID from the users table,
allowing the settings profile to be linked to the actual authenticated user.
"""

from sqlalchemy import text
from src.database.session import engine


def migrate_settings_profiles():
    """
    Add user_id column to settings_profiles table if it doesn't exist.
    This is a safe migration that preserves existing data.
    """
    with engine.connect() as conn:
        # First check if settings_profiles table exists
        result = conn.execute(text("""
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_name = 'settings_profiles'
        """))
        
        if not result.fetchone():
            print("Migration: settings_profiles table does not exist, skipping migration")
            conn.commit()
            return
        
        # Check if user_id column already exists
        result = conn.execute(text("""
            SELECT column_name 
            FROM information_schema.columns 
            WHERE table_name = 'settings_profiles' 
            AND column_name = 'user_id'
        """))
        
        if not result.fetchone():
            # Add user_id column
            conn.execute(text("""
                ALTER TABLE settings_profiles 
                ADD COLUMN user_id VARCHAR(255) UNIQUE
            """))
            print("Migration: Successfully added user_id column to settings_profiles")
        else:
            print("Migration: user_id column already exists in settings_profiles")
        
        conn.commit()


def run_migrations():
    """Run all pending migrations."""
    try:
        migrate_settings_profiles()
    except Exception as e:
        print(f"Migration error (non-critical): {e}")
        # Continue even if migration fails

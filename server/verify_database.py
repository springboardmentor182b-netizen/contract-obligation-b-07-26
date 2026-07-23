"""
Database Verification Script
Run this to check if your PostgreSQL database is set up correctly
"""

import os
from sqlalchemy import create_engine, inspect, text
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://postgres:Jananikp_37@localhost:3702/contractiq")

def verify_database():
    print("=" * 60)
    print("DATABASE VERIFICATION")
    print("=" * 60)
    
    try:
        # Create engine
        engine = create_engine(DATABASE_URL, pool_pre_ping=True)
        
        # Test connection
        print("\n✅ Step 1: Testing database connection...")
        with engine.connect() as conn:
            result = conn.execute(text("SELECT version();"))
            version = result.fetchone()[0]
            print(f"   Connected to PostgreSQL!")
            print(f"   Version: {version[:50]}...")
        
        # Check if tables exist
        print("\n✅ Step 2: Checking database tables...")
        inspector = inspect(engine)
        tables = inspector.get_table_names()
        
        if tables:
            print(f"   Found {len(tables)} table(s):")
            for table in tables:
                print(f"   - {table}")
                
            # Check users table structure
            if 'users' in tables:
                print("\n✅ Step 3: Checking 'users' table structure...")
                columns = inspector.get_columns('users')
                print(f"   Found {len(columns)} columns:")
                for col in columns:
                    print(f"   - {col['name']}: {col['type']}")
                
                # Count users
                with engine.connect() as conn:
                    result = conn.execute(text("SELECT COUNT(*) FROM users;"))
                    count = result.fetchone()[0]
                    print(f"\n   Total users in database: {count}")
                    
                    if count > 0:
                        result = conn.execute(text("SELECT email, role FROM users LIMIT 5;"))
                        print("\n   Sample users:")
                        for row in result:
                            print(f"   - {row[0]} ({row[1]})")
            else:
                print("\n❌ 'users' table NOT FOUND!")
                print("   Run the backend server to create tables automatically.")
        else:
            print("   ❌ No tables found!")
            print("   The database exists but tables haven't been created yet.")
            print("   Run the backend server to create tables automatically.")
        
        print("\n" + "=" * 60)
        print("✅ DATABASE VERIFICATION COMPLETE!")
        print("=" * 60)
        
    except Exception as e:
        print(f"\n❌ ERROR: {str(e)}")
        print("\nPossible issues:")
        print("1. PostgreSQL is not running")
        print("2. Database 'contractiq' doesn't exist")
        print("3. Wrong credentials in .env file")
        print("4. PostgreSQL is not listening on port 3702")
        print("\nTo create the database, run in PostgreSQL:")
        print("   CREATE DATABASE contractiq;")
        return False
    
    return True

if __name__ == "__main__":
    verify_database()

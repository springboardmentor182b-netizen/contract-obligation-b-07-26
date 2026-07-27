"""
Check for Dummy Data in Database
"""

import os
from sqlalchemy import create_engine, text
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://postgres:Jananikp_37@localhost:3702/contractiq")

def check_dummy_data():
    print("=" * 60)
    print("CHECKING FOR DUMMY DATA")
    print("=" * 60)
    
    try:
        engine = create_engine(DATABASE_URL, pool_pre_ping=True)
        
        with engine.connect() as conn:
            # Check users table
            result = conn.execute(text("SELECT email, first_name, last_name, role, created_at FROM users ORDER BY id;"))
            users = result.fetchall()
            
            print(f"\n📊 Total users in database: {len(users)}\n")
            
            if len(users) == 0:
                print("✅ NO DATA - Database is empty!")
                print("   No dummy data found.")
            else:
                print("📋 All users in database:")
                print("-" * 60)
                for i, user in enumerate(users, 1):
                    email, first_name, last_name, role, created_at = user
                    print(f"\n{i}. Email: {email}")
                    print(f"   Name: {first_name} {last_name}")
                    print(f"   Role: {role}")
                    print(f"   Created: {created_at}")
                
                print("\n" + "=" * 60)
                print("⚠️  REAL USER DATA FOUND")
                print("=" * 60)
                print("\nThese are real users who signed up through your app.")
                print("They are NOT dummy data or seed data.")
                print("\nIf you want to remove them:")
                print("  DELETE FROM users WHERE email = 'user@email.com';")
                print("\nOr to clear all users:")
                print("  TRUNCATE TABLE users RESTART IDENTITY CASCADE;")
        
    except Exception as e:
        print(f"\n❌ ERROR: {str(e)}")
    
    print("\n" + "=" * 60)

if __name__ == "__main__":
    check_dummy_data()

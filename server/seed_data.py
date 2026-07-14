from sqlalchemy.orm import Session
from src.database.core import engine, Base, SessionLocal
from src.entities.user import User
from src.entities.contract import Contract
from src.entities.renewal import Renewal
from datetime import date, datetime, timedelta
import random

def seed_database():
    # Create tables
    Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    
    try:
        # Check if users already exist
        existing_users = db.query(User).all()
        if not existing_users:
            print("Creating users...")
            users = [
                User(
                    first_name="Tom",
                    last_name="Weston",
                    email="tom.weston@company.com",
                    password_hash="$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYhWqF5ZqWm",  # password123
                    role="Legal Manager",
                    department="Legal"
                ),
                User(
                    first_name="James",
                    last_name="Park",
                    email="james.park@company.com",
                    password_hash="$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYhWqF5ZqWm",
                    role="Admin",
                    department="Operations"
                ),
                User(
                    first_name="Marcus",
                    last_name="Reid",
                    email="marcus.reid@company.com",
                    password_hash="$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYhWqF5ZqWm",
                    role="Employee",
                    department="Finance"
                ),
                User(
                    first_name="Sarah",
                    last_name="Chen",
                    email="sarah.chen@company.com",
                    password_hash="$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYhWqF5ZqWm",
                    role="Employee",
                    department="IT"
                ),
                User(
                    first_name="Lisa",
                    last_name="Tran",
                    email="lisa.tran@company.com",
                    password_hash="$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYhWqF5ZqWm",
                    role="Employee",
                    department="Marketing"
                ),
                User(
                    first_name="Priya",
                    last_name="Nair",
                    email="priya.nair@company.com",
                    password_hash="$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYhWqF5ZqWm",
                    role="Employee",
                    department="HR"
                )
            ]
            
            for user in users:
                db.add(user)
            db.commit()
            print(f"Created {len(users)} users")
        else:
            print(f"Users already exist: {len(existing_users)}")
        
        # Get users for assignment
        users = db.query(User).all()
        
        # Check if contracts already exist
        existing_contracts = db.query(Contract).all()
        if not existing_contracts:
            print("Creating contracts...")
            
            contract_data = [
                {
                    "contract_no": "CTR-2024-001",
                    "title": "Office Lease - Floor 12 & 13",
                    "description": "Commercial office space lease agreement",
                    "category": "Lease",
                    "status": "Active",
                    "start_date": date(2024, 1, 1),
                    "end_date": date(2024, 12, 31),
                    "owner_id": users[1].id,  # James Park
                    "created_by": users[1].id,
                    "starred": True,
                    "version": "v1.0",
                    "size": "2.5 MB"
                },
                {
                    "contract_no": "CTR-2024-002",
                    "title": "IT Services Agreement",
                    "description": "Managed IT services and support contract",
                    "category": "Service",
                    "status": "Active",
                    "start_date": date(2024, 2, 1),
                    "end_date": date(2025, 1, 31),
                    "owner_id": users[3].id,  # Sarah Chen
                    "created_by": users[3].id,
                    "starred": False,
                    "version": "v2.0",
                    "size": "1.8 MB"
                },
                {
                    "contract_no": "CTR-2024-003",
                    "title": "Software License Agreement",
                    "description": "Enterprise software licensing contract",
                    "category": "Vendor",
                    "status": "Active",
                    "start_date": date(2024, 3, 1),
                    "end_date": date(2025, 2, 28),
                    "owner_id": users[3].id,  # Sarah Chen
                    "created_by": users[3].id,
                    "starred": True,
                    "version": "v1.0",
                    "size": "0.9 MB"
                },
                {
                    "contract_no": "CTR-2024-004",
                    "title": "Employment Agreement - John Smith",
                    "description": "Senior developer employment contract",
                    "category": "Employment",
                    "status": "Active",
                    "start_date": date(2024, 1, 15),
                    "end_date": date(2025, 1, 14),
                    "owner_id": users[5].id,  # Priya Nair
                    "created_by": users[5].id,
                    "starred": False,
                    "version": "v1.0",
                    "size": "0.5 MB"
                },
                {
                    "contract_no": "CTR-2024-005",
                    "title": "NDA - Strategic Partnership",
                    "description": "Non-disclosure agreement for partnership",
                    "category": "NDA",
                    "status": "Active",
                    "start_date": date(2024, 4, 1),
                    "end_date": date(2026, 3, 31),
                    "owner_id": users[0].id,  # Tom Weston
                    "created_by": users[0].id,
                    "starred": False,
                    "version": "v1.0",
                    "size": "0.3 MB"
                },
                {
                    "contract_no": "CTR-2024-006",
                    "title": "Marketing Services Contract",
                    "description": "Digital marketing and advertising services",
                    "category": "Service",
                    "status": "Active",
                    "start_date": date(2024, 5, 1),
                    "end_date": date(2024, 11, 30),
                    "owner_id": users[4].id,  # Lisa Tran
                    "created_by": users[4].id,
                    "starred": True,
                    "version": "v1.0",
                    "size": "1.2 MB"
                },
                {
                    "contract_no": "CTR-2024-007",
                    "title": "Partnership Agreement - TechCorp",
                    "description": "Strategic business partnership agreement",
                    "category": "Partnership",
                    "status": "Under Review",
                    "start_date": date(2024, 6, 1),
                    "end_date": date(2027, 5, 31),
                    "owner_id": users[1].id,  # James Park
                    "created_by": users[1].id,
                    "starred": False,
                    "version": "v1.0",
                    "size": "3.1 MB"
                },
                {
                    "contract_no": "CTR-2024-008",
                    "title": "Compliance Audit Contract",
                    "description": "Annual compliance and audit services",
                    "category": "Compliance",
                    "status": "Active",
                    "start_date": date(2024, 1, 1),
                    "end_date": date(2024, 12, 31),
                    "owner_id": users[2].id,  # Marcus Reid
                    "created_by": users[2].id,
                    "starred": False,
                    "version": "v1.0",
                    "size": "2.0 MB"
                },
                {
                    "contract_no": "CTR-2024-009",
                    "title": "Insurance Policy - Property",
                    "description": "Commercial property insurance coverage",
                    "category": "Insurance",
                    "status": "Active",
                    "start_date": date(2024, 3, 1),
                    "end_date": date(2025, 2, 28),
                    "owner_id": users[2].id,  # Marcus Reid
                    "created_by": users[2].id,
                    "starred": True,
                    "version": "v1.0",
                    "size": "1.5 MB"
                },
                {
                    "contract_no": "CTR-2024-010",
                    "title": "Equipment Lease Agreement",
                    "description": "Office equipment and furniture lease",
                    "category": "Lease",
                    "status": "Expired",
                    "start_date": date(2023, 1, 1),
                    "end_date": date(2024, 1, 31),
                    "owner_id": users[1].id,  # James Park
                    "created_by": users[1].id,
                    "starred": False,
                    "version": "v1.0",
                    "size": "0.8 MB"
                },
                {
                    "contract_no": "CTR-2024-011",
                    "title": "Vendor Agreement - Office Supplies",
                    "description": "Office supplies procurement contract",
                    "category": "Vendor",
                    "status": "Active",
                    "start_date": date(2024, 2, 1),
                    "end_date": date(2025, 1, 31),
                    "owner_id": users[1].id,  # James Park
                    "created_by": users[1].id,
                    "starred": False,
                    "version": "v1.0",
                    "size": "0.4 MB"
                },
                {
                    "contract_no": "CTR-2024-012",
                    "title": "Consulting Services Agreement",
                    "description": "Business consulting and advisory services",
                    "category": "Service",
                    "status": "Draft",
                    "start_date": date(2024, 7, 1),
                    "end_date": date(2024, 12, 31),
                    "owner_id": users[0].id,  # Tom Weston
                    "created_by": users[0].id,
                    "starred": False,
                    "version": "v1.0",
                    "size": "1.0 MB"
                }
            ]
            
            contracts = []
            for data in contract_data:
                contract = Contract(**data)
                db.add(contract)
                contracts.append(contract)
            
            db.commit()
            print(f"Created {len(contracts)} contracts")
            
            # Create some renewal records
            print("Creating renewal records...")
            renewal_data = [
                {
                    "contract_id": contracts[0].id,
                    "renewal_date": date(2024, 12, 31),
                    "reminder_date": date(2024, 11, 30),
                    "renewal_status": "Pending",
                    "notes": "Annual lease renewal"
                },
                {
                    "contract_id": contracts[1].id,
                    "renewal_date": date(2025, 1, 31),
                    "reminder_date": date(2024, 12, 31),
                    "renewal_status": "Pending",
                    "notes": "IT services renewal"
                },
                {
                    "contract_id": contracts[2].id,
                    "renewal_date": date(2025, 2, 28),
                    "reminder_date": date(2025, 1, 28),
                    "renewal_status": "Pending",
                    "notes": "Software license renewal"
                }
            ]
            
            for data in renewal_data:
                renewal = Renewal(**data)
                db.add(renewal)
            
            db.commit()
            print(f"Created {len(renewal_data)} renewal records")
            
        else:
            print(f"Contracts already exist: {len(existing_contracts)}")
        
        print("\n✅ Database seeded successfully!")
        print("\nSample users created (password: password123):")
        for user in db.query(User).all():
            print(f"  - {user.first_name} {user.last_name} ({user.email}) - {user.role}")
        
        print(f"\nTotal contracts: {db.query(Contract).count()}")
        print(f"Total users: {db.query(User).count()}")
        
    except Exception as e:
        print(f"Error seeding database: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_database()

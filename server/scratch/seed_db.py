import os
import sys
from datetime import datetime, date

# Add parent directory to sys.path to import src modules
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from src.database.core import engine, Base, SessionLocal
from src.entities import User, Contract, ContractVersion, Renewal
from src.auth.service import get_password_hash

def seed():
    # Remove existing db
    db_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "contract_management.db"))
    if os.path.exists(db_path):
        try:
            os.remove(db_path)
            print("Removed existing database.")
        except Exception as e:
            print(f"Error removing existing database: {e}")

    # Create tables
    Base.metadata.create_all(bind=engine)
    print("Created database tables.")

    db = SessionLocal()
    try:
        # Clear existing tables to reset the database state safely
        db.query(Renewal).delete()
        db.query(ContractVersion).delete()
        db.query(Contract).delete()
        db.query(User).delete()
        db.commit()
        print("Cleared existing records.")
        # Create users
        hashed_password = get_password_hash("password")
        
        users_data = [
            ("Tom", "Weston", "tom.weston@example.com", "Employee", "Operations"),
            ("James", "Park", "james.park@example.com", "Legal Manager", "Legal"),
            ("Marcus", "Reid", "marcus.reid@example.com", "Employee", "Finance"),
            ("Sarah", "Chen", "sarah.chen@example.com", "Employee", "IT"),
            ("Lisa", "Tran", "lisa.tran@example.com", "Employee", "Marketing"),
            ("Priya", "Nair", "priya.nair@example.com", "Employee", "HR"),
            ("Nia", "Foster", "nia.foster@example.com", "Employee", "Legal"),
            ("Dana", "Kim", "dana.kim@example.com", "Employee", "Procurement"),
            ("Alex", "Ruiz", "alex.ruiz@example.com", "Employee", "Sales"),
            ("Admin", "User", "admin@example.com", "Admin", "Legal")
        ]
        
        db_users = {}
        for fn, ln, email, role, dept in users_data:
            user = User(
                first_name=fn,
                last_name=ln,
                email=email,
                password_hash=hashed_password,
                role=role,
                department=dept,
                phone="123-456-7890",
                is_active=True
            )
            db.add(user)
            db.commit()
            db.refresh(user)
            db_users[f"{fn} {ln}"] = user
            print(f"Created user: {fn} {ln} (ID: {user.id})")
            
        admin_user = db_users["Admin User"]
        
        # 12 contracts matching mockup exactly
        contracts_data = [
            {
                "contract_no": "CTR-2024-001",
                "title": "Goldman Sachs Advisory Services",
                "description": "Advisory · Finance · M&A",
                "category": "Service",
                "status": "Under Review",
                "start_date": date(2024, 6, 22),
                "end_date": date(2025, 6, 22),
                "owner_name": "Marcus Reid",
                "starred": False,
                "version": "v1.0",
                "size": "1.1 MB"
            },
            {
                "contract_no": "CTR-2024-002",
                "title": "Strategic Partnership - Deloitte",
                "description": "Consulting · Strategy · Multi-year",
                "category": "Partnership",
                "status": "Draft",
                "start_date": date(2025, 3, 30),
                "end_date": date(2026, 3, 30),
                "owner_name": "Nia Foster",
                "starred": False,
                "version": "v0.3",
                "size": "0.9 MB"
            },
            {
                "contract_no": "CTR-2024-003",
                "title": "Logistics Framework Agreement",
                "description": "Logistics · Supply Chain · Global",
                "category": "Vendor",
                "status": "Under Review",
                "start_date": date(2024, 8, 1),
                "end_date": date(2025, 8, 1),
                "owner_name": "Tom Weston",
                "starred": False,
                "version": "v1.0",
                "size": "1.9 MB"
            },
            {
                "contract_no": "CTR-2024-004",
                "title": "Microsoft Azure Enterprise Agreement",
                "description": "Cloud · Infrastructure · Annual",
                "category": "Vendor",
                "status": "Active",
                "start_date": date(2024, 3, 15),
                "end_date": date(2025, 3, 15),
                "owner_name": "Sarah Chen",
                "starred": False,
                "version": "v3.1",
                "size": "2.4 MB"
            },
            {
                "contract_no": "CTR-2024-005",
                "title": "Supplier NDA - TechParts Ltd",
                "description": "NDA · Supplier · Hardware",
                "category": "NDA",
                "status": "Active",
                "start_date": date(2024, 9, 1),
                "end_date": date(2025, 9, 1),
                "owner_name": "Dana Kim",
                "starred": False,
                "version": "v1.0",
                "size": "0.3 MB"
            },
            {
                "contract_no": "CTR-2024-006",
                "title": "SaaS Platform License - Salesforce",
                "description": "CRM · SaaS · Sales",
                "category": "Vendor",
                "status": "Active",
                "start_date": date(2024, 7, 15),
                "end_date": date(2025, 7, 15),
                "owner_name": "Alex Ruiz",
                "starred": False,
                "version": "v4.0",
                "size": "1.7 MB"
            },
            {
                "contract_no": "CTR-2024-007",
                "title": "Corporate Office Lease - Floor 12",
                "description": "Real Estate · Facilities · NYC",
                "category": "Lease",
                "status": "Expired",
                "start_date": date(2023, 12, 31),
                "end_date": date(2024, 12, 31),
                "owner_name": "Tom Weston",
                "starred": True,
                "version": "v1.1",
                "size": "2.1 MB"
            },
            {
                "contract_no": "CTR-2024-008",
                "title": "Data Processing Addendum - EU",
                "description": "GDPR · Privacy · EU",
                "category": "Compliance",
                "status": "Active",
                "start_date": date(2024, 5, 20),
                "end_date": date(2025, 5, 20),
                "owner_name": "James Park",
                "starred": True,
                "version": "v2.0",
                "size": "1.5 MB"
            },
            {
                "contract_no": "CTR-2024-009",
                "title": "Cyber Insurance Policy - AIG",
                "description": "Insurance · Cyber · Risk",
                "category": "Insurance",
                "status": "Active",
                "start_date": date(2024, 4, 15),
                "end_date": date(2025, 4, 15),
                "owner_name": "Marcus Reid",
                "starred": False,
                "version": "v1.2",
                "size": "1.2 MB"
            },
            {
                "contract_no": "CTR-2024-010",
                "title": "Marketing Agency Retainer",
                "description": "Marketing · Agency · Retainer",
                "category": "Service",
                "status": "Active",
                "start_date": date(2024, 2, 28),
                "end_date": date(2025, 2, 28),
                "owner_name": "Lisa Tran",
                "starred": False,
                "version": "v2.2",
                "size": "1.8 MB"
            },
            {
                "contract_no": "CTR-2024-011",
                "title": "Executive Employment Agreement",
                "description": "Employment · Executive · HR",
                "category": "Employment",
                "status": "Active",
                "start_date": date(2025, 1, 10),
                "end_date": date(2026, 1, 10),
                "owner_name": "Priya Nair",
                "starred": True,
                "version": "v2.0",
                "size": "1.0 MB"
            },
            {
                "contract_no": "CTR-2024-012",
                "title": "Joint Venture Venture Agreement",
                "description": "Partnership · Business Dev · Global",
                "category": "Partnership",
                "status": "Active",
                "start_date": date(2024, 7, 1),
                "end_date": date(2026, 7, 1),
                "owner_name": "Nia Foster",
                "starred": False,
                "version": "v1.0",
                "size": "2.0 MB"
            }
        ]

        for cdata in contracts_data:
            owner = db_users[cdata["owner_name"]]
            contract = Contract(
                contract_no=cdata["contract_no"],
                title=cdata["title"],
                description=cdata["description"],
                category=cdata["category"],
                status=cdata["status"],
                start_date=cdata["start_date"],
                end_date=cdata["end_date"],
                starred=cdata["starred"],
                archived=False,
                version=cdata["version"],
                size=cdata["size"],
                owner_id=owner.id,
                created_by=admin_user.id
            )
            db.add(contract)
            db.commit()
            db.refresh(contract)
            
            # Create a mock version version log
            version = ContractVersion(
                contract_id=contract.id,
                version_number=1,
                document_path=f"uploads/contract_{contract.id}_v1.pdf",
                uploaded_by=admin_user.id,
                notes="Initial seeding."
            )
            db.add(version)
            
            # Create renewal record if active/expired
            if cdata["status"] in ["Active", "Expired"]:
                renewal = Renewal(
                    contract_id=contract.id,
                    renewal_date=cdata["end_date"],
                    reminder_date=cdata["end_date"],
                    renewal_status="Pending",
                    notes="Automatic renewal record."
                )
                db.add(renewal)
                
            db.commit()
            print(f"Created contract: {contract.contract_no} - {contract.title}")
            
    finally:
        db.close()

if __name__ == "__main__":
    seed()

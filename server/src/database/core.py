"""
Database Core - Connection and Initialization
"""

import sqlite3
import bcrypt

DATABASE = "contractiq.db"


def get_db():
    """Get database connection"""
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    """Initialize database tables and demo data"""
    conn = get_db()
    cursor = conn.cursor()
    
    # Create users table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            first_name TEXT NOT NULL,
            last_name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            role TEXT DEFAULT 'Employee',
            department TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)
    
    # Create contracts table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS contracts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            contract_number TEXT UNIQUE NOT NULL,
            title TEXT NOT NULL,
            vendor TEXT NOT NULL,
            contract_type TEXT,
            start_date DATE,
            end_date DATE,
            value REAL,
            status TEXT DEFAULT 'Active',
            owner_id INTEGER,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (owner_id) REFERENCES users (id)
        )
    """)
    
    # Create obligations table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS obligations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            contract_id INTEGER NOT NULL,
            obligation_type TEXT NOT NULL,
            description TEXT NOT NULL,
            due_date DATE,
            status TEXT DEFAULT 'Pending',
            priority TEXT DEFAULT 'Medium',
            assigned_to INTEGER,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (contract_id) REFERENCES contracts (id),
            FOREIGN KEY (assigned_to) REFERENCES users (id)
        )
    """)
    
    # Check if demo users exist
    cursor.execute("SELECT COUNT(*) FROM users")
    count = cursor.fetchone()[0]
    
    if count == 0:
        # Insert demo users
        demo_users = [
            ("Admin", "User", "admin@contractiq.com", "admin123", "Administrator", "IT"),
            ("John", "Doe", "legal@contractiq.com", "legal123", "Legal Manager", "Legal"),
            ("Jane", "Smith", "compliance@contractiq.com", "compliance123", "Compliance Officer", "Compliance"),
            ("Mike", "Johnson", "contract@contractiq.com", "contract123", "Contract Manager", "Procurement"),
            ("Sarah", "Williams", "dept.head@contractiq.com", "dept123", "Department Head", "Finance"),
            ("Tom", "Brown", "employee@contractiq.com", "employee123", "Employee", "Operations")
        ]
        
        for first_name, last_name, email, password, role, department in demo_users:
            # Hash password using bcrypt
            password_bytes = password.encode('utf-8')
            if len(password_bytes) > 72:
                password_bytes = password_bytes[:72]
            hashed_password = bcrypt.hashpw(password_bytes, bcrypt.gensalt()).decode('utf-8')
            cursor.execute(
                "INSERT INTO users (first_name, last_name, email, password, role, department) VALUES (?, ?, ?, ?, ?, ?)",
                (first_name, last_name, email, hashed_password, role, department)
            )
        
        conn.commit()
        print("✅ Demo users created successfully")
        
        # Insert sample contracts
        sample_contracts = [
            ("CNT-2024-001", "Cloud Infrastructure Services", "AWS", "Service Agreement", "2024-01-01", "2025-12-31", 150000.00, "Active", 1),
            ("CNT-2024-002", "Software Licensing Agreement", "Microsoft", "License", "2024-03-01", "2025-02-28", 75000.00, "Active", 2),
            ("CNT-2024-003", "Consulting Services", "Deloitte", "Professional Services", "2024-06-01", "2024-12-31", 200000.00, "Active", 3),
        ]
        
        for contract in sample_contracts:
            cursor.execute(
                "INSERT INTO contracts (contract_number, title, vendor, contract_type, start_date, end_date, value, status, owner_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
                contract
            )
        
        conn.commit()
        print("✅ Sample contracts created successfully")
        
        # Insert sample obligations
        sample_obligations = [
            (1, "Payment", "Monthly payment due for cloud services", "2024-09-01", "Pending", "High", 4),
            (1, "Compliance", "Security audit required", "2024-09-15", "Pending", "High", 3),
            (2, "Renewal", "License renewal decision needed", "2025-01-01", "Pending", "Medium", 2),
        ]
        
        for obligation in sample_obligations:
            cursor.execute(
                "INSERT INTO obligations (contract_id, obligation_type, description, due_date, status, priority, assigned_to) VALUES (?, ?, ?, ?, ?, ?, ?)",
                obligation
            )
        
        conn.commit()
        print("✅ Sample obligations created successfully")
    
    conn.close()

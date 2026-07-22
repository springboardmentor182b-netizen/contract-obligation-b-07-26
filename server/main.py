from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Optional
import datetime

app = FastAPI(title="ContractIQ User Management API")

# Configure CORS so React client (port 5173) can talk to FastAPI (port 8000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic Schemas
class UserProfile(BaseModel):
    employee_id: str
    name: str
    email: str
    phone: str
    department: str
    designation: str
    role: str
    status: str
    last_login: str

class UserCreate(BaseModel):
    name: str
    email: str
    phone: str
    department: str
    designation: str
    role: str
    status: str = "Active"

class UserUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    department: Optional[str] = None
    designation: Optional[str] = None
    role: Optional[str] = None
    status: Optional[str] = None

class ActiveSession(BaseModel):
    id: str
    device: str
    location: str
    login_time: str
    expires_time: str
    is_current: bool = False

# Mock Database In-Memory
users_db = [
    {
        "employee_id": "EMP-001",
        "name": "Sarah Chen",
        "email": "sarah.chen@contractiq.com",
        "phone": "+1 (555) 010-2345",
        "department": "Legal",
        "designation": "Senior Legal Manager",
        "role": "Legal Manager",
        "status": "Active",
        "last_login": "Jun 3, 2024 9:14 AM"
    },
    {
        "employee_id": "EMP-002",
        "name": "David Park",
        "email": "david.park@contractiq.com",
        "phone": "+1 (555) 010-6789",
        "department": "Compliance",
        "designation": "Compliance Officer",
        "role": "Compliance Officer",
        "status": "Active",
        "last_login": "Jun 3, 2024 8:52 AM"
    },
    {
        "employee_id": "EMP-003",
        "name": "Lisa Torres",
        "email": "lisa.torres@contractiq.com",
        "phone": "+1 (555) 010-4321",
        "department": "Operations",
        "designation": "Operations Director",
        "role": "Legal Manager",
        "status": "Active",
        "last_login": "Jun 2, 2024 4:31 PM"
    },
    {
        "employee_id": "EMP-004",
        "name": "Mark Johnson",
        "email": "mark.johnson@contractiq.com",
        "phone": "+1 (555) 010-1122",
        "department": "Procurement",
        "designation": "Procurement Lead",
        "role": "Contract Manager",
        "status": "Active",
        "last_login": "Jun 1, 2024 11:07 AM"
    },
    {
        "employee_id": "EMP-005",
        "name": "James Lee",
        "email": "james.lee@contractiq.com",
        "phone": "+1 (555) 010-9988",
        "department": "Procurement",
        "designation": "Contract Analyst",
        "role": "Contract Manager",
        "status": "Inactive",
        "last_login": "May 28, 2024 2:45 PM"
    },
    {
        "employee_id": "EMP-006",
        "name": "Alexandra Ross",
        "email": "admin@contractiq.com",
        "phone": "+1 (555) 010-5566",
        "department": "Administration",
        "designation": "Sysadmin",
        "role": "Administrator",
        "status": "Active",
        "last_login": "Jun 3, 2024 10:01 AM"
    },
    {
        "employee_id": "EMP-007",
        "name": "Michael Grant",
        "email": "rm.grant@contractiq.com",
        "phone": "+1 (555) 010-8877",
        "department": "Finance",
        "designation": "Finance VP",
        "role": "Department Head",
        "status": "Active",
        "last_login": "Jun 2, 2024 3:22 PM"
    },
    {
        "employee_id": "EMP-008",
        "name": "Jennifer Walsh",
        "email": "j.walsh@contractiq.com",
        "phone": "+1 (555) 010-3344",
        "department": "Executive",
        "designation": "CEO",
        "role": "Department Head",
        "status": "Active",
        "last_login": "Jun 1, 2024 9:00 AM"
    }
]

sessions_db = [
    {
        "id": "sess-01",
        "device": "Chrome 124 / Windows 11",
        "location": "New York, US",
        "login_time": "Jun 3, 2024 9:14 AM",
        "expires_time": "Jun 3, 2024 5:14 PM",
        "is_current": True
    },
    {
        "id": "sess-02",
        "device": "Safari 17 / macOS Sonoma",
        "location": "Remote - VPN",
        "login_time": "Jun 3, 2024 8:00 AM",
        "expires_time": "Jun 3, 2024 4:00 PM",
        "is_current": False
    }
]

# Helper to generate employee IDs
def get_next_employee_id():
    max_id = 0
    for u in users_db:
        try:
            num = int(u["employee_id"].split("-")[1])
            if num > max_id:
                max_id = num
        except (IndexError, ValueError):
            pass
    return f"EMP-{max_id + 1:03d}"

# Endpoints
@app.get('/')
def root():
    return {"status": "ok", "message": "ContractIQ backend is running"}

@app.get('/api/profile', response_model=UserProfile)
def get_profile():
    # Returns Sarah Chen's profile (as logged in user)
    for u in users_db:
        if u["employee_id"] == "EMP-001":
            return u
    raise HTTPException(status_code=404, detail="Profile user not found")

@app.get('/api/users', response_model=List[UserProfile])
def get_users():
    return users_db

@app.post('/api/users', response_model=UserProfile)
def create_user(user: UserCreate):
    # Check if email already exists
    for u in users_db:
        if u["email"].lower() == user.email.lower():
            raise HTTPException(status_code=400, detail="User with this email already exists")
    
    new_user = {
        "employee_id": get_next_employee_id(),
        "name": user.name,
        "email": user.email,
        "phone": user.phone,
        "department": user.department,
        "designation": user.designation,
        "role": user.role,
        "status": user.status,
        "last_login": datetime.datetime.now().strftime("%b %d, %Y %I:%M %p")
    }
    users_db.append(new_user)
    return new_user

@app.put('/api/users/{employee_id}', response_model=UserProfile)
def update_user(employee_id: str, payload: UserUpdate):
    for u in users_db:
        if u["employee_id"] == employee_id:
            if payload.name is not None:
                u["name"] = payload.name
            if payload.email is not None:
                u["email"] = payload.email
            if payload.phone is not None:
                u["phone"] = payload.phone
            if payload.department is not None:
                u["department"] = payload.department
            if payload.designation is not None:
                u["designation"] = payload.designation
            if payload.role is not None:
                u["role"] = payload.role
            if payload.status is not None:
                u["status"] = payload.status
            return u
    raise HTTPException(status_code=404, detail="User not found")

@app.delete('/api/users/{employee_id}')
def delete_user(employee_id: str):
    global users_db
    initial_len = len(users_db)
    users_db = [u for u in users_db if u["employee_id"] != employee_id]
    if len(users_db) < initial_len:
        return {"status": "success", "message": "User deleted"}
    raise HTTPException(status_code=404, detail="User not found")

@app.get('/api/sessions', response_model=List[ActiveSession])
def get_sessions():
    return sessions_db

@app.delete('/api/sessions/{session_id}')
def delete_session(session_id: str):
    global sessions_db
    initial_len = len(sessions_db)
    sessions_db = [s for s in sessions_db if s["id"] != session_id]
    if len(sessions_db) < initial_len:
        return {"status": "success", "message": "Session terminated"}
    raise HTTPException(status_code=404, detail="Session not found")

@app.post('/api/sessions/logout-all')
def logout_all_sessions():
    global sessions_db
    # Keep only the current session
    sessions_db = [s for s in sessions_db if s["is_current"]]
    return {"status": "success", "message": "All other sessions logged out"}

@app.get('/api/metrics')
def get_metrics():
    total_users = len(users_db)
    active_users = sum(1 for u in users_db if u["status"] == "Active")
    
    # Calculate unique roles defined
    roles = set(u["role"] for u in users_db)
    roles_defined = len(roles)
    
    # Unique departments
    depts = set(u["department"] for u in users_db)
    departments_count = len(depts)
    
    # Permissions is hardcoded to 42 in the design, let's keep it close or let it reflect roles
    permissions_count = len(roles) * 7  # e.g. 7 permissions per role, 6 roles -> 42 permissions
    
    active_sessions = len(sessions_db)
    
    return {
        "total_users": total_users,
        "active_users": active_users,
        "roles_defined": roles_defined,
        "permissions_count": permissions_count,
        "departments_count": departments_count,
        "active_sessions": active_sessions
    }
"""
Authentication Service - Business Logic
"""

from fastapi import HTTPException
import bcrypt
from jose import jwt
from datetime import datetime, timedelta
from typing import Optional
import random

from ..database.core import get_db
from .models import UserRegister, UserLogin, ResetPasswordRequest

# Configuration
SECRET_KEY = "your-secret-key-change-this-in-production"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_HOURS = 24

# OTP storage (in production, use Redis)
otp_store = {}

# Password hashing - Simple bcrypt without strict limits
import bcrypt

def get_password_hash(password: str) -> str:
    """Hash password using bcrypt - automatically truncates to 72 bytes"""
    # Convert to bytes
    password_bytes = password.encode('utf-8')
    # Bcrypt automatically handles the 72-byte limit
    # Just truncate beforehand to be safe
    if len(password_bytes) > 72:
        password_bytes = password_bytes[:72]
    # Hash with bcrypt
    hashed = bcrypt.hashpw(password_bytes, bcrypt.gensalt())
    return hashed.decode('utf-8')

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify password against hash"""
    password_bytes = plain_password.encode('utf-8')
    if len(password_bytes) > 72:
        password_bytes = password_bytes[:72]
    hashed_bytes = hashed_password.encode('utf-8')
    return bcrypt.checkpw(password_bytes, hashed_bytes)


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(hours=ACCESS_TOKEN_EXPIRE_HOURS)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def generate_otp() -> str:
    return str(random.randint(100000, 999999))


def get_user_by_email(email: str):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users WHERE email = ?", (email,))
    row = cursor.fetchone()
    conn.close()
    if row:
        # Convert sqlite3.Row to dict
        return dict(row)
    return None


async def register_user(user: UserRegister):
    """Register new user"""
    try:
        # Check if user exists
        existing_user = get_user_by_email(user.email)
        if existing_user:
            raise HTTPException(status_code=400, detail="User already exists")
        
        # Hash password
        hashed_password = get_password_hash(user.password)
        
        # Insert user
        conn = get_db()
        cursor = conn.cursor()
        try:
            cursor.execute(
                "INSERT INTO users (first_name, last_name, email, password, role, department) VALUES (?, ?, ?, ?, ?, ?)",
                (user.firstName, user.lastName, user.email, hashed_password, user.role or "Employee", user.department)
            )
            conn.commit()
            user_id = cursor.lastrowid
            
            # Create token
            access_token = create_access_token(
                data={"sub": user.email, "id": user_id, "role": user.role or "Employee"}
            )
            
            return {
                "message": "User created successfully",
                "token": access_token,
                "user": {
                    "id": user_id,
                    "firstName": user.firstName,
                    "lastName": user.lastName,
                    "email": user.email,
                    "role": user.role or "Employee",
                    "department": user.department
                }
            }
        except Exception as e:
            conn.rollback()
            print(f"❌ Database error: {str(e)}")
            raise HTTPException(status_code=500, detail=f"Failed to create user: {str(e)}")
        finally:
            conn.close()
    except HTTPException:
        raise
    except Exception as e:
        print(f"❌ Unexpected error in register_user: {str(e)}")
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")


async def login_user(credentials: UserLogin):
    """Login user"""
    user = get_user_by_email(credentials.email)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    if not verify_password(credentials.password, user["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    access_token = create_access_token(
        data={"sub": user["email"], "id": user["id"], "role": user["role"]}
    )
    
    return {
        "message": "Login successful",
        "token": access_token,
        "user": {
            "id": user["id"],
            "firstName": user["first_name"],
            "lastName": user["last_name"],
            "email": user["email"],
            "role": user["role"],
            "department": user["department"]
        }
    }


async def request_password_reset(email: str):
    """Send OTP for password reset"""
    user = get_user_by_email(email)
    if not user:
        return {"message": "If this email exists, a reset code has been sent"}
    
    otp = generate_otp()
    otp_store[email] = {
        "otp": otp,
        "expires_at": datetime.now() + timedelta(minutes=15),
        "attempts": 0
    }
    
    # Send email (simulated)
    print(f"\n{'='*50}")
    print(f"📧 EMAIL TO: {email}")
    print(f"🔐 OTP CODE: {otp}")
    print(f"⏰ VALID FOR: 15 minutes")
    print(f"{'='*50}\n")
    
    # 🎯 DEMO MODE: Return the OTP in the response for testing
    return {
        "message": "Reset code sent to your email", 
        "email": email,
        "demo_otp": otp  # This will show the code in the UI for demo purposes
    }


async def verify_otp(email: str, otp: str):
    """Verify OTP code"""
    if email not in otp_store:
        raise HTTPException(status_code=400, detail="Invalid or expired code")
    
    otp_data = otp_store[email]
    
    if datetime.now() > otp_data["expires_at"]:
        del otp_store[email]
        raise HTTPException(status_code=400, detail="Code has expired. Please request a new one")
    
    if otp_data["attempts"] >= 5:
        del otp_store[email]
        raise HTTPException(status_code=400, detail="Too many failed attempts. Please request a new code")
    
    if otp != otp_data["otp"]:
        otp_data["attempts"] += 1
        raise HTTPException(status_code=400, detail="Invalid code. Please try again")
    
    return {"message": "Code verified successfully", "email": email}


async def reset_password(request: ResetPasswordRequest):
    """Reset password with OTP"""
    if request.newPassword != request.confirmPassword:
        raise HTTPException(status_code=400, detail="Passwords do not match")
    
    if request.email not in otp_store:
        raise HTTPException(status_code=400, detail="Invalid or expired code")
    
    otp_data = otp_store[request.email]
    
    if datetime.now() > otp_data["expires_at"]:
        del otp_store[request.email]
        raise HTTPException(status_code=400, detail="Code has expired. Please request a new one")
    
    if request.otp != otp_data["otp"]:
        raise HTTPException(status_code=400, detail="Invalid code")
    
    user = get_user_by_email(request.email)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    hashed_password = get_password_hash(request.newPassword)
    
    conn = get_db()
    cursor = conn.cursor()
    try:
        cursor.execute(
            "UPDATE users SET password = ?, updated_at = CURRENT_TIMESTAMP WHERE email = ?",
            (hashed_password, request.email)
        )
        conn.commit()
        del otp_store[request.email]
        return {"message": "Password reset successfully"}
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=f"Failed to reset password: {str(e)}")
    finally:
        conn.close()

from fastapi import Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.config.database import get_db
from app.config.security import oauth2_scheme, decode_token
from app.modules.auth.models import User

def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
) -> User:
    """Get current authenticated user from token"""
    payload = decode_token(token)
    email: str = payload.get("sub")
    
    if email is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials"
        )
    
    user = db.query(User).filter(User.email == email).first()
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found"
        )
    
    return user

def require_role(user: User, allowed_roles: list):
    """Check if user has required role"""
    user_role = user.role.value if hasattr(user.role, 'value') else user.role
    
    if user_role not in allowed_roles:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=f"Access denied. Required roles: {', '.join(allowed_roles)}"
        )

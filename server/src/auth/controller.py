from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from src.database.core import get_db
from src.entities.user import User, UserRole
from src.auth.models import (
    UserCreate, UserLogin, Token, UserResponse,
    ForgotPasswordRequest, ResetPasswordRequest, ResetPasswordResponse
)
from src.auth.service import AuthService

# Try to import email service, but don't fail if not available
try:
    from src.email_service import send_password_reset_email
    EMAIL_AVAILABLE = True
except ImportError:
    EMAIL_AVAILABLE = False
    print("Warning: Email service not available. Running in demo mode only.")

router = APIRouter()

@router.post("/signup", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def signup(user_data: UserCreate, db: Session = Depends(get_db)):
    """
    Register a new user. Role will be set to Employee by default.
    Only administrators can change user roles.
    """
    auth_service = AuthService(db)
    return auth_service.register_user(user_data)

@router.post("/login", response_model=Token)
async def login(user_credentials: UserLogin, db: Session = Depends(get_db)):
    """
    Authenticate user and return JWT token
    """
    auth_service = AuthService(db)
    return auth_service.authenticate_user(user_credentials)

@router.post("/forgot-password")
async def forgot_password(request: ForgotPasswordRequest, db: Session = Depends(get_db)):
    """
    Request password reset. Sends a unique 6-digit code to user's email.
    Code is valid for 15 minutes and can only be used once.
    """
    auth_service = AuthService(db)
    
    try:
        # Generate reset code
        result = auth_service.request_password_reset(request.email)
        
        # Check if email library is available and configured
        from src.config import settings
        email_configured = (
            EMAIL_AVAILABLE and
            settings.MAIL_USERNAME != "" and 
            settings.MAIL_USERNAME != "your-email@gmail.com" and
            settings.MAIL_PASSWORD != "your-app-password"
        )
        
        if email_configured:
            # Send email with reset code
            try:
                await send_password_reset_email(
                    email=result["email"],
                    reset_code=result["reset_code"],
                    user_name=result["user_name"]
                )
                
                return {
                    "message": "A reset code has been sent to your email",
                    "success": True,
                    "email_sent": True
                }
            except Exception as email_error:
                print(f"Email sending failed: {str(email_error)}")
                # Email sending failed - return code in response for demo
                return {
                    "message": "Email sending failed. Using demo mode.",
                    "success": True,
                    "email_sent": False,
                    "reset_code": result["reset_code"],
                    "demo_note": "Email service error. Check backend logs."
                }
        else:
            # Email not configured or not available - demo mode
            return {
                "message": "Demo Mode: Reset code generated",
                "success": True,
                "email_sent": False,
                "reset_code": result["reset_code"],
                "demo_note": "Install fastapi-mail and configure Gmail to send real emails"
            }
        
    except HTTPException as e:
        # User not found - still return success for security
        return {
            "message": "If the email exists, a reset code would be sent",
            "success": True,
            "email_sent": False
        }
    except Exception as e:
        # Unexpected error
        print(f"Error in forgot_password: {str(e)}")
        import traceback
        traceback.print_exc()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to process request: {str(e)}"
        )

@router.post("/reset-password", response_model=ResetPasswordResponse)
async def reset_password(request: ResetPasswordRequest, db: Session = Depends(get_db)):
    """
    Reset password using the reset code from email
    """
    auth_service = AuthService(db)
    return auth_service.reset_password(request.email, request.reset_code, request.new_password)

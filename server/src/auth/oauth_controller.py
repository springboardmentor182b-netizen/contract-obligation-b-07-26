from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.responses import RedirectResponse
from sqlalchemy.orm import Session
from authlib.integrations.base_client import OAuthError
import requests
from src.database.core import SessionLocal
from src.auth.models import User
from src.auth.oauth_config import OAuthConfig
from src.auth.jwt import create_access_token

router = APIRouter(prefix="/auth", tags=["OAuth"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def create_or_update_oauth_user(db: Session, provider: str, provider_id: str, email: str, name: str):
    # Check if user exists by provider ID
    provider_field = f"{provider}_id"
    user = db.query(User).filter(getattr(User, provider_field) == provider_id).first()
    
    if user:
        return user
    
    # Check if user exists by email
    user = db.query(User).filter(User.email == email).first()
    if user:
        # Update existing user with provider ID
        setattr(user, provider_field, provider_id)
        user.is_oauth_user = True
        db.commit()
        db.refresh(user)
        return user
    
    # Create new user
    new_user = User(
        username=name,
        email=email,
        password=None,  # OAuth users don't have passwords
        is_oauth_user=True
    )
    setattr(new_user, provider_field, provider_id)
    
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

# Google OAuth
@router.get("/google/login")
async def google_login():
    if not OAuthConfig.GOOGLE_CLIENT_ID or not OAuthConfig.GOOGLE_CLIENT_SECRET:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Google OAuth not configured"
        )
    
    google_auth_url = (
        f"https://accounts.google.com/o/oauth2/v2/auth?"
        f"client_id={OAuthConfig.GOOGLE_CLIENT_ID}&"
        f"redirect_uri={OAuthConfig.GOOGLE_REDIRECT_URI}&"
        f"response_type=code&"
        f"scope=openid email profile"
    )
    return RedirectResponse(google_auth_url)

@router.get("/google/callback")
async def google_callback(code: str, db: Session = Depends(get_db)):
    if not OAuthConfig.GOOGLE_CLIENT_ID or not OAuthConfig.GOOGLE_CLIENT_SECRET:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Google OAuth not configured"
        )
    
    # Exchange code for access token
    token_url = "https://oauth2.googleapis.com/token"
    data = {
        "code": code,
        "client_id": OAuthConfig.GOOGLE_CLIENT_ID,
        "client_secret": OAuthConfig.GOOGLE_CLIENT_SECRET,
        "redirect_uri": OAuthConfig.GOOGLE_REDIRECT_URI,
        "grant_type": "authorization_code"
    }
    
    response = requests.post(token_url, data=data)
    if response.status_code != 200:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Failed to exchange code for token"
        )
    
    token_data = response.json()
    access_token = token_data.get("access_token")
    
    # Get user info
    user_info_url = "https://www.googleapis.com/oauth2/v2/userinfo"
    headers = {"Authorization": f"Bearer {access_token}"}
    user_info_response = requests.get(user_info_url, headers=headers)
    
    if user_info_response.status_code != 200:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Failed to get user info"
        )
    
    user_info = user_info_response.json()
    
    # Create or update user
    user = create_or_update_oauth_user(
        db=db,
        provider="google",
        provider_id=str(user_info.get("id")),
        email=user_info.get("email"),
        name=user_info.get("name", user_info.get("given_name", ""))
    )
    
    # Generate JWT token
    jwt_token = create_access_token(data={"sub": user.email})
    
    # Redirect to frontend with token
    redirect_url = f"{OAuthConfig.FRONTEND_URL}/home?token={jwt_token}"
    return RedirectResponse(redirect_url)

# Facebook OAuth
@router.get("/facebook/login")
async def facebook_login():
    if not OAuthConfig.FACEBOOK_CLIENT_ID or not OAuthConfig.FACEBOOK_CLIENT_SECRET:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Facebook OAuth not configured"
        )
    
    facebook_auth_url = (
        f"https://www.facebook.com/v18.0/dialog/oauth?"
        f"client_id={OAuthConfig.FACEBOOK_CLIENT_ID}&"
        f"redirect_uri={OAuthConfig.FACEBOOK_REDIRECT_URI}&"
        f"response_type=code&"
        f"scope=email public_profile"
    )
    return RedirectResponse(facebook_auth_url)

@router.get("/facebook/callback")
async def facebook_callback(code: str, db: Session = Depends(get_db)):
    if not OAuthConfig.FACEBOOK_CLIENT_ID or not OAuthConfig.FACEBOOK_CLIENT_SECRET:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Facebook OAuth not configured"
        )
    
    # Exchange code for access token
    token_url = "https://graph.facebook.com/v18.0/oauth/access_token"
    params = {
        "client_id": OAuthConfig.FACEBOOK_CLIENT_ID,
        "client_secret": OAuthConfig.FACEBOOK_CLIENT_SECRET,
        "redirect_uri": OAuthConfig.FACEBOOK_REDIRECT_URI,
        "code": code
    }
    
    response = requests.get(token_url, params=params)
    if response.status_code != 200:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Failed to exchange code for token"
        )
    
    token_data = response.json()
    access_token = token_data.get("access_token")
    
    # Get user info
    user_info_url = f"https://graph.facebook.com/v18.0/me?fields=id,name,email&access_token={access_token}"
    user_info_response = requests.get(user_info_url)
    
    if user_info_response.status_code != 200:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Failed to get user info"
        )
    
    user_info = user_info_response.json()
    
    # Create or update user
    user = create_or_update_oauth_user(
        db=db,
        provider="facebook",
        provider_id=str(user_info.get("id")),
        email=user_info.get("email"),
        name=user_info.get("name", "")
    )
    
    # Generate JWT token
    jwt_token = create_access_token(data={"sub": user.email})
    
    # Redirect to frontend with token
    redirect_url = f"{OAuthConfig.FRONTEND_URL}/home?token={jwt_token}"
    return RedirectResponse(redirect_url)

# GitHub OAuth
@router.get("/github/login")
async def github_login():
    if not OAuthConfig.GITHUB_CLIENT_ID or not OAuthConfig.GITHUB_CLIENT_SECRET:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="GitHub OAuth not configured"
        )
    
    github_auth_url = (
        f"https://github.com/login/oauth/authorize?"
        f"client_id={OAuthConfig.GITHUB_CLIENT_ID}&"
        f"redirect_uri={OAuthConfig.GITHUB_REDIRECT_URI}&"
        f"scope=user:email"
    )
    return RedirectResponse(github_auth_url)

@router.get("/github/callback")
async def github_callback(code: str, db: Session = Depends(get_db)):
    if not OAuthConfig.GITHUB_CLIENT_ID or not OAuthConfig.GITHUB_CLIENT_SECRET:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="GitHub OAuth not configured"
        )
    
    # Exchange code for access token
    token_url = "https://github.com/login/oauth/access_token"
    data = {
        "client_id": OAuthConfig.GITHUB_CLIENT_ID,
        "client_secret": OAuthConfig.GITHUB_CLIENT_SECRET,
        "code": code
    }
    headers = {"Accept": "application/json"}
    
    response = requests.post(token_url, data=data, headers=headers)
    if response.status_code != 200:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Failed to exchange code for token"
        )
    
    token_data = response.json()
    access_token = token_data.get("access_token")
    
    # Get user info
    user_info_url = "https://api.github.com/user"
    headers = {"Authorization": f"Bearer {access_token}"}
    user_info_response = requests.get(user_info_url, headers=headers)
    
    if user_info_response.status_code != 200:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Failed to get user info"
        )
    
    user_info = user_info_response.json()
    
    # Get user email (GitHub requires separate API call for email)
    email_url = "https://api.github.com/user/emails"
    email_response = requests.get(email_url, headers=headers)
    if email_response.status_code == 200:
        emails = email_response.json()
        primary_email = next((e["email"] for e in emails if e["primary"]), user_info.get("email"))
    else:
        primary_email = user_info.get("email")
    
    if not primary_email:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email is required but not provided by GitHub"
        )
    
    # Create or update user
    user = create_or_update_oauth_user(
        db=db,
        provider="github",
        provider_id=str(user_info.get("id")),
        email=primary_email,
        name=user_info.get("name", user_info.get("login", ""))
    )
    
    # Generate JWT token
    jwt_token = create_access_token(data={"sub": user.email})
    
    # Redirect to frontend with token
    redirect_url = f"{OAuthConfig.FRONTEND_URL}/home?token={jwt_token}"
    return RedirectResponse(redirect_url)

# Apple OAuth (Simplified version - requires JWT generation for client secret)
@router.get("/apple/login")
async def apple_login():
    if not OAuthConfig.APPLE_CLIENT_ID:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Apple OAuth not configured"
        )
    
    # Apple OAuth requires more complex setup with JWT generation
    # This is a simplified version that redirects to Apple's auth URL
    apple_auth_url = (
        f"https://appleid.apple.com/auth/authorize?"
        f"client_id={OAuthConfig.APPLE_CLIENT_ID}&"
        f"redirect_uri={OAuthConfig.APPLE_REDIRECT_URI}&"
        f"response_type=code&"
        f"scope=name email&"
        f"response_mode=form_post"
    )
    return RedirectResponse(apple_auth_url)

@router.get("/apple/callback")
async def apple_callback(code: str, db: Session = Depends(get_db)):
    # Apple OAuth callback handling
    # Note: This requires JWT generation for client secret which is complex
    # For now, return an error message
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="Apple OAuth requires additional setup with JWT generation. Please use Google, Facebook, or GitHub for now."
    )

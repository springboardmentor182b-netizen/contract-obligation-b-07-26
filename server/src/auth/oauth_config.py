import os
from dotenv import load_dotenv

load_dotenv()

class OAuthConfig:
    FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:5173")
    
    # Google OAuth
    GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")
    GOOGLE_CLIENT_SECRET = os.getenv("GOOGLE_CLIENT_SECRET")
    GOOGLE_REDIRECT_URI = f"http://localhost:8000/auth/google/callback"
    
    # Facebook OAuth
    FACEBOOK_CLIENT_ID = os.getenv("FACEBOOK_CLIENT_ID")
    FACEBOOK_CLIENT_SECRET = os.getenv("FACEBOOK_CLIENT_SECRET")
    FACEBOOK_REDIRECT_URI = f"http://localhost:8000/auth/facebook/callback"
    
    # GitHub OAuth
    GITHUB_CLIENT_ID = os.getenv("GITHUB_CLIENT_ID")
    GITHUB_CLIENT_SECRET = os.getenv("GITHUB_CLIENT_SECRET")
    GITHUB_REDIRECT_URI = f"http://localhost:8000/auth/github/callback"
    
    # Apple OAuth
    APPLE_CLIENT_ID = os.getenv("APPLE_CLIENT_ID")
    APPLE_CLIENT_SECRET = os.getenv("APPLE_CLIENT_SECRET")
    APPLE_TEAM_ID = os.getenv("APPLE_TEAM_ID")
    APPLE_KEY_ID = os.getenv("APPLE_KEY_ID")
    APPLE_REDIRECT_URI = f"http://localhost:8000/auth/apple/callback"

# OAuth Setup Guide

This guide provides step-by-step instructions for setting up OAuth authentication with Google, Facebook, GitHub, and Apple for your FastAPI backend.

## Prerequisites

1. Ensure you have developer accounts with each OAuth provider
2. Have your backend running on `http://localhost:8000`
3. Have your frontend running on `http://localhost:5173`

## Environment Variables

Copy the `.env.example` file to `.env` and fill in your credentials:

```bash
cp .env.example .env
```

## Google OAuth Setup

### 1. Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a project" → "New Project"
3. Enter project name (e.g., "Contract Obligation App")
4. Click "Create"

### 2. Enable Google+ API

1. In Google Cloud Console, go to "APIs & Services" → "Library"
2. Search for "Google+ API" or "Google Identity"
3. Click on it and click "Enable"

### 3. Create OAuth 2.0 Credentials

1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "OAuth client ID"
3. Configure consent screen if prompted:
   - Choose "External" user type
   - Fill in required fields (App name, User support email)
   - Add your email as test user
   - Save and continue
4. Select "Web application" as application type
5. Name: "Contract Obligation Web Client"
6. **Authorized redirect URIs**: Add `http://localhost:8000/auth/google/callback`
7. Click "Create"

### 4. Get Credentials

1. After creation, you'll see a popup with:
   - **Client ID**: Copy this to `GOOGLE_CLIENT_ID` in `.env`
   - **Client Secret**: Copy this to `GOOGLE_CLIENT_SECRET` in `.env`

### 5. Environment Variables

```env
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

## Facebook OAuth Setup

### 1. Create Facebook App

1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Click "Create App" → "Select an App Type"
3. Choose "Consumer" or "Business" (depending on your use case)
4. Enter app name (e.g., "Contract Obligation App")
5. Click "Create App"

### 2. Configure Facebook Login

1. In App Dashboard, find "Add a Product" → "Facebook Login"
2. Click "Set Up"
3. In Facebook Login settings:
   - **Valid OAuth Redirect URIs**: Add `http://localhost:8000/auth/facebook/callback`
   - Save changes

### 3. Get App Credentials

1. In App Dashboard, go to "Settings" → "Basic"
2. Copy:
   - **App ID**: Copy this to `FACEBOOK_CLIENT_ID` in `.env`
   - **App Secret**: Copy this to `FACEBOOK_CLIENT_SECRET` in `.env`

### 4. Environment Variables

```env
FACEBOOK_CLIENT_ID=your-facebook-app-id
FACEBOOK_CLIENT_SECRET=your-facebook-app-secret
```

## GitHub OAuth Setup

### 1. Create GitHub OAuth App

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click "New OAuth App"
3. Fill in:
   - **Application name**: Contract Obligation App
   - **Homepage URL**: `http://localhost:5173`
   - **Application description**: Contract obligation management app
   - **Authorization callback URL**: `http://localhost:8000/auth/github/callback`
4. Click "Register application"

### 2. Get Credentials

1. After registration, you'll see:
   - **Client ID**: Copy this to `GITHUB_CLIENT_ID` in `.env`
   - Click "Generate a new client secret"
   - **Client Secret**: Copy this to `GITHUB_CLIENT_SECRET` in `.env`

### 3. Environment Variables

```env
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
```

## Apple OAuth Setup

### 1. Create Apple Developer Account

1. Go to [Apple Developer](https://developer.apple.com/)
2. Sign in with your Apple ID
3. Enroll in Apple Developer Program (requires $99/year fee)

### 2. Create App ID

1. Go to "Certificates, Identifiers & Profiles"
2. Click "Identifiers" → "+" → "App IDs"
3. Select "App IDs" and click "Continue"
4. Enter:
   - **Description**: Contract Obligation App
   - **Bundle ID**: com.yourcompany.contract-obligation
5. Under "Capabilities", check "Sign in with Apple"
6. Click "Continue" → "Register"

### 3. Create Service ID

1. Go to "Identifiers" → "+" → "Services ID"
2. Enter:
   - **Description**: Contract Obligation Web Service
   - **Identifier**: com.yourcompany.contract-obligation.web
3. Click "Continue" → "Register"

### 4. Configure Service ID

1. Click on your Service ID
2. Check "Sign in with Apple"
3. Click "Configure"
4. Add your domain and return URLs:
   - **Domains and Subdomains**: localhost
   - **Return URLs**: `http://localhost:8000/auth/apple/callback`
5. Click "Next" → "Done" → "Save"

### 5. Create Key

1. Go to "Keys" → "+" → "Create a new key"
2. Enter:
   - **Key Name**: Contract Obligation Key
   - Check "Sign in with Apple"
3. Click "Continue" → "Register"
4. **Important**: Download the key file (`.p8`) - you can only download it once!

### 6. Get Credentials

1. From the key file, note:
   - **Key ID**: 10-character alphanumeric string (top of file)
2. From Apple Developer account:
   - **Team ID**: Found in "Membership" section
   - **Client ID**: Your Service ID identifier
3. Generate client secret (requires JWT signing - complex process)

### 7. Environment Variables

```env
APPLE_CLIENT_ID=com.yourcompany.contract-obligation.web
APPLE_CLIENT_SECRET=your-apple-client-secret
APPLE_TEAM_ID=your-apple-team-id
APPLE_KEY_ID=your-apple-key-id
```

**Note**: Apple OAuth requires JWT generation for the client secret, which is complex. The current implementation includes Apple OAuth endpoints but they require additional setup. For now, use Google, Facebook, or GitHub OAuth.

## Testing OAuth

### 1. Restart Backend

After updating `.env`, restart your FastAPI backend:

```bash
cd server
python -m uvicorn main:app --reload
```

### 2. Test OAuth Flow

1. Navigate to `http://localhost:5173/` (React frontend)
2. Click on any OAuth button (Google, Facebook, GitHub)
3. You'll be redirected to the OAuth provider's login page
4. After authentication, you'll be redirected back to your app
5. The JWT token will be stored in localStorage
6. You'll be redirected to the home page

### 3. Verify User Creation

Check your PostgreSQL database to verify OAuth users are created:

```sql
SELECT * FROM users WHERE is_oauth_user = true;
```

## Troubleshooting

### Google OAuth Issues

- **Error: redirect_uri_mismatch**: Ensure `http://localhost:8000/auth/google/callback` is added to authorized redirect URIs
- **Error: invalid_client**: Verify Client ID and Client Secret are correct

### Facebook OAuth Issues

- **Error: redirect_uri_mismatch**: Ensure redirect URI matches exactly in Facebook Login settings
- **Error: invalid_client**: Verify App ID and App Secret are correct

### GitHub OAuth Issues

- **Error: redirect_uri_mismatch**: Ensure callback URL matches exactly in OAuth app settings
- **Error: bad_client_id**: Verify Client ID is correct

### General Issues

- **CORS errors**: Ensure CORS is configured in FastAPI (already done in main.py)
- **Database errors**: Ensure PostgreSQL is running and DATABASE_URL is correct
- **Environment variables not loading**: Ensure `.env` file is in the server directory

## Security Notes

1. **Never commit `.env` file** to version control
2. Use different redirect URIs for production (e.g., `https://yourdomain.com/auth/google/callback`)
3. Keep Client Secrets secure
4. Enable app verification in production for OAuth providers
5. Consider using a secrets manager for production deployments

## Production Deployment

For production deployment:

1. Update redirect URIs to your production domain
2. Use HTTPS for all OAuth callbacks
3. Update `FRONTEND_URL` in `.env` to production URL
4. Enable app verification in OAuth provider dashboards
5. Consider using environment-specific configuration files

## Additional Resources

- [Google OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Facebook Login Documentation](https://developers.facebook.com/docs/facebook-login)
- [GitHub OAuth Apps Documentation](https://docs.github.com/en/developers/apps/building-oauth-apps)
- [Apple Sign In Documentation](https://developer.apple.com/sign-in-with-apple/)

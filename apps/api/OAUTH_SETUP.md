# OAuth Setup Guide

This guide explains how to set up Google and GitHub OAuth authentication for the Flowin API.

## 🔧 Environment Variables

Copy `.env.example` to `.env` and fill in the OAuth credentials:

```bash
cp .env.example .env
```

## 🔑 Google OAuth Setup

### 1. Create Google OAuth Application

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client IDs"
5. Choose "Web application"
6. Add authorized redirect URIs:
   - Development: `http://localhost:4000/auth/google/callback`
   - Production: `https://your-domain.com/auth/google/callback`

### 2. Configure Environment Variables

```env
GOOGLE_CLIENT_ID="your-google-client-id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
GOOGLE_CALLBACK_URL="http://localhost:4000/auth/google/callback"
```

## 🐙 GitHub OAuth Setup

### 1. Create GitHub OAuth Application

1. Go to [GitHub Settings](https://github.com/settings/applications/new)
2. Fill in the application details:
   - Application name: "Flowin"
   - Homepage URL: `http://localhost:3000` (your frontend URL)
   - Authorization callback URL: `http://localhost:4000/auth/github/callback`

### 2. Configure Environment Variables

```env
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"
GITHUB_CALLBACK_URL="http://localhost:4000/auth/github/callback"
```

## 🚀 OAuth Flow

### Google OAuth Flow

1. **Initiate**: `GET /auth/google`
   - Redirects user to Google consent screen
   
2. **Callback**: `GET /auth/google/callback`
   - Google redirects back with authorization code
   - Server exchanges code for user profile
   - Creates or finds user in database
   - Redirects to frontend with JWT token

### GitHub OAuth Flow

1. **Initiate**: `GET /auth/github`
   - Redirects user to GitHub consent screen
   
2. **Callback**: `GET /auth/github/callback`
   - GitHub redirects back with authorization code
   - Server exchanges code for user profile
   - Creates or finds user in database
   - Redirects to frontend with JWT token

## 🔗 Frontend Integration

### Redirect URLs

After successful OAuth authentication, users are redirected to:

```
{FRONTEND_URL}/auth/callback?token={JWT_TOKEN}&provider={google|github}
```

After failed OAuth authentication:

```
{FRONTEND_URL}/auth/callback?error=oauth_failed&provider={google|github}
```

### Frontend Implementation Example

```javascript
// Handle OAuth callback
const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get('token');
const error = urlParams.get('error');
const provider = urlParams.get('provider');

if (token) {
  // Store token and redirect to dashboard
  localStorage.setItem('auth_token', token);
  window.location.href = '/dashboard';
} else if (error) {
  // Handle error
  console.error(`${provider} OAuth failed:`, error);
}
```

## 🔒 Security Considerations

1. **HTTPS in Production**: Always use HTTPS for OAuth callbacks in production
2. **Environment Variables**: Never commit OAuth secrets to version control
3. **Callback URL Validation**: Ensure callback URLs match exactly
4. **Token Expiration**: JWT tokens expire based on `JWT_EXPIRES_IN` setting

## 🧪 Testing OAuth

### Development Testing

1. Start the API server: `npm run dev`
2. Navigate to: `http://localhost:4000/auth/google`
3. Complete OAuth flow
4. Check redirect to frontend with token

### Production Testing

1. Update callback URLs to production domains
2. Update `FRONTEND_URL` environment variable
3. Test complete OAuth flow

## 📝 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/auth/google` | Initiate Google OAuth |
| GET | `/auth/google/callback` | Google OAuth callback |
| GET | `/auth/github` | Initiate GitHub OAuth |
| GET | `/auth/github/callback` | GitHub OAuth callback |

## 🐛 Troubleshooting

### Common Issues

1. **"redirect_uri_mismatch"**
   - Check callback URLs match exactly in OAuth app settings
   - Ensure no trailing slashes

2. **"invalid_client"**
   - Verify client ID and secret are correct
   - Check environment variables are loaded

3. **"access_denied"**
   - User denied permission
   - Check OAuth scopes are appropriate

4. **No email in profile**
   - GitHub users might have private emails
   - Request additional scopes if needed

### Debug Mode

Enable debug logging in development:

```env
NODE_ENV=development
```

Check server logs for detailed OAuth flow information.

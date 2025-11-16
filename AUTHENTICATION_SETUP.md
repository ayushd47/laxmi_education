# JWT Authentication Setup

## Overview
The admin dashboard is now protected with JWT token-based authentication. Only authenticated users can access admin routes.

## Admin Credentials

**Email:** `laxmieducationconsultancy1@gmail.com`  
**Default Password:** `admin123`

⚠️ **Important:** Change the default password after first login for security.

## Features Implemented

### 1. JWT Authentication
- All admin routes are protected with JWT tokens
- Tokens are stored in HTTP-only cookies for security
- Token expiration: 24 hours
- Middleware automatically redirects unauthenticated users to login

### 2. Password Reset Functionality
- **Forgot Password:** Users can request a password reset link via email
- **Reset Password:** Users can set a new password using the reset link
- Reset tokens expire after 1 hour
- Password must be at least 8 characters long

### 3. Security Features
- Passwords are hashed using bcrypt
- JWT tokens are verified on every admin route access
- HTTP-only cookies prevent XSS attacks
- Secure password reset flow with time-limited tokens

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# JWT Secret (generate a strong random string)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Email Configuration (for password reset)
EMAIL_USER=laxmieducationconsultancy1@gmail.com
EMAIL_PASSWORD=your-gmail-app-password
EMAIL_FROM=laxmieducationconsultancy1@gmail.com

# Base URL (for password reset links)
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### Setting up Gmail App Password

1. Go to your Google Account settings
2. Navigate to Security > 2-Step Verification
3. Scroll down to "App passwords"
4. Generate a new app password for "Mail"
5. Use this app password (not your regular Gmail password) in `EMAIL_PASSWORD`

## API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `GET /api/auth/verify` - Verify JWT token
- `POST /api/auth/logout` - Admin logout
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password with token

## Routes

### Public Routes
- `/admin/login` - Login page
- `/admin/reset-password?token=...` - Password reset page

### Protected Routes
- `/admin/*` - All admin dashboard routes require authentication

## How It Works

1. **Login Flow:**
   - User enters email and password
   - Server verifies credentials
   - JWT token is generated and stored in HTTP-only cookie
   - User is redirected to admin dashboard

2. **Password Reset Flow:**
   - User clicks "Forgot password?" on login page
   - User enters email address
   - System generates a secure reset token
   - Reset link is sent to user's email
   - User clicks link and sets new password
   - Token is invalidated after use

3. **Route Protection:**
   - Middleware checks for valid JWT token on all `/admin/*` routes
   - Invalid or missing tokens redirect to login
   - Valid tokens allow access to admin routes

## Default Password

The default password is `admin123`. This is hashed using bcrypt and stored in `src/lib/admin-users.ts`.

**To change the default password:**
1. Login with the default credentials
2. Use the password reset feature to set a new password
3. Or manually update the password hash in the code (not recommended for production)

## Production Considerations

1. **Database:** Move admin users to a proper database (currently in-memory)
2. **Password Reset Tokens:** Use Redis or database instead of in-memory Map
3. **Email Service:** Consider using a dedicated email service (SendGrid, Mailgun, etc.)
4. **JWT Secret:** Use a strong, randomly generated secret
5. **HTTPS:** Always use HTTPS in production
6. **Rate Limiting:** Add rate limiting to login and password reset endpoints
7. **Logging:** Add proper logging for security events

## Troubleshooting

### Email not sending
- Check that `EMAIL_PASSWORD` is set correctly
- Verify you're using a Gmail App Password (not regular password)
- Check email service logs for errors

### Can't access admin routes
- Clear browser cookies
- Verify JWT_SECRET is set
- Check browser console for errors

### Password reset link not working
- Verify `NEXT_PUBLIC_BASE_URL` is set correctly
- Check that the token hasn't expired (1 hour limit)
- Ensure the token in the URL matches what was sent




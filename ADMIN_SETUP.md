# Admin System Setup

## Overview
This document describes the admin system implementation for Laxmi Education, including JWT authentication and university management.

## Features Implemented

### 1. JWT Authentication System
- **Login Page**: `/admin/login`
- **Authentication**: JWT-based with HTTP-only cookies
- **Protected Routes**: All admin routes require authentication
- **Auto-redirect**: Unauthenticated users are redirected to login

### 2. University Management (CRUD Operations)
- **View Universities**: List all universities with filtering and search
- **Add University**: Create new university entries
- **Edit University**: Update existing university information
- **Delete University**: Remove universities from the system
- **API Endpoints**: RESTful API for university management

### 3. Institution Page (Frontend)
- **University Selection**: Browse and select universities
- **Detailed View**: Modal with comprehensive university information
- **Filtering**: Search by name, country, programs, type
- **Sorting**: Sort by name, country, ranking, establishment year

## Admin Credentials

### Demo Accounts
1. **Admin User**
   - Email: `admin@laxmieducation.com`
   - Password: `admin123`

2. **Super Admin**
   - Email: `superadmin@laxmieducation.com`
   - Password: `superadmin123`

## API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `GET /api/auth/verify` - Verify JWT token
- `POST /api/auth/logout` - Admin logout

### Universities
- `GET /api/universities` - Get all universities (public)
- `POST /api/universities` - Create university (admin only)
- `GET /api/universities/[id]` - Get single university
- `PUT /api/universities/[id]` - Update university (admin only)
- `DELETE /api/universities/[id]` - Delete university (admin only)

## File Structure

```
src/
├── lib/
│   ├── auth.ts              # JWT authentication utilities
│   └── types.ts            # TypeScript interfaces
├── store/
│   └── useAuthStore.ts     # Zustand auth store
├── app/
│   ├── api/
│   │   ├── auth/           # Authentication endpoints
│   │   └── universities/   # University CRUD endpoints
│   ├── (admin)/
│   │   └── admin/
│   │       ├── login/      # Admin login page
│   │       ├── universities/ # University management
│   │       └── components/ # Admin components
│   └── (frontend)/
│       └── institution/    # Public university page
```

## Security Features

1. **JWT Tokens**: Secure authentication with expiration
2. **HTTP-Only Cookies**: Prevents XSS attacks
3. **Route Protection**: All admin routes require authentication
4. **Input Validation**: Server-side validation for all inputs
5. **Error Handling**: Comprehensive error handling and user feedback

## Usage Instructions

### For Admins
1. Navigate to `/admin/login`
2. Use provided credentials to log in
3. Access university management at `/admin/universities`
4. Use CRUD operations to manage universities
5. Log out using the profile dropdown

### For Users
1. Visit `/institution` to browse universities
2. Use filters to find specific universities
3. Click on university cards to view detailed information
4. Use the modal to see comprehensive university details

## Development Notes

- All authentication is handled client-side with Zustand store
- JWT tokens are stored in HTTP-only cookies for security
- University data is currently stored in memory (mock database)
- In production, implement proper database integration
- Add proper password hashing for production use
- Implement rate limiting for API endpoints
- Add comprehensive logging and monitoring

## Next Steps

1. **Database Integration**: Replace mock data with real database
2. **Password Hashing**: Implement bcrypt for password security
3. **Email Verification**: Add email verification for admin accounts
4. **Role-Based Access**: Implement different permission levels
5. **Audit Logging**: Track all admin actions
6. **Backup System**: Implement data backup and recovery
7. **Performance Optimization**: Add caching and optimization

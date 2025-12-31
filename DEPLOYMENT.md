# Deployment Guide

## MongoDB Setup for Production

This application uses MongoDB for data storage. To deploy successfully, you need to configure your MongoDB connection string.

### Required Environment Variables

Add these environment variables in your hosting platform (Render, Vercel, etc.):

#### 1. MongoDB Connection
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database-name
```
OR
```env
DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/database-name
```

**Note:** The application supports both `MONGODB_URI` and `DATABASE_URL` environment variables.

#### 2. Authentication (Required for Admin)
```env
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

#### 3. Email Configuration (Required for Password Reset)
```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-gmail-app-password
EMAIL_FROM=your-email@gmail.com
```

#### 4. Base URL (Required for Password Reset Links)
```env
NEXT_PUBLIC_BASE_URL=https://your-domain.com
```

### Setting Up MongoDB

1. **Create a MongoDB Atlas Account** (if using MongoDB Atlas):
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create a free cluster
   - Create a database user
   - Whitelist your IP address (or use `0.0.0.0/0` for all IPs in production)
   - Get your connection string

2. **Connection String Format**:
   ```
   mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database-name>?retryWrites=true&w=majority
   ```

3. **Alternative: Use MongoDB Compass or Local MongoDB**:
   - For local development: `mongodb://localhost:27017/database-name`
   - For production, use a managed MongoDB service

### Setting Up on Render

1. Go to your Render dashboard
2. Select your service
3. Go to **Environment** tab
4. Click **Add Environment Variable**
5. Add all the required variables listed above

### Setting Up on Vercel

1. Go to your Vercel project settings
2. Navigate to **Environment Variables**
3. Add all the required variables listed above
4. Make sure to add them for **Production**, **Preview**, and **Development** environments

### Verifying Database Connection

After deployment, check your application logs for:
- ✅ `MongoDB connected successfully` (if connection succeeds)
- ❌ `MongoDB connection error` (if connection fails)

### Troubleshooting

#### Issue: Data not being fetched
- **Check:** Is `MONGODB_URI` or `DATABASE_URL` set in your environment variables?
- **Check:** Is your MongoDB cluster accessible from your hosting platform?
- **Check:** Are your IP addresses whitelisted in MongoDB Atlas?

#### Issue: Connection timeout
- **Check:** Your MongoDB connection string is correct
- **Check:** Your database user has proper permissions
- **Check:** Network connectivity between your hosting platform and MongoDB

#### Issue: Authentication errors
- **Check:** `JWT_SECRET` is set and is a strong random string
- **Check:** Email credentials are correct for password reset functionality

### Database Collections

The application automatically creates these collections when first used:
- `colleges` - University/College data
- `blogs` - Blog posts
- `enquiries` - Contact form submissions
- `settings` - Application settings (single document)

### Initial Data

After deployment:
1. Log in to the admin panel at `/admin/login`
2. Default credentials are in `AUTHENTICATION_SETUP.md`
3. Add your first college/university, blog post, etc.
4. Data will be stored in MongoDB

### Backup

The application includes backup functionality in the admin settings panel. You can:
- Create backups of settings
- Restore from backups
- Export/import data through the admin interface
















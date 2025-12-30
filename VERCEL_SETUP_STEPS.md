# Vercel Dashboard Setup - Step by Step

## ✅ Code Changes (Already Done)
All code changes are complete! You just need to configure Vercel now.

## 🔧 What to Do in Vercel Dashboard

### Step 1: Connect Your Repository
1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"Add New Project"**
3. Import your GitHub/GitLab repository
4. Vercel will auto-detect Next.js

### Step 2: Configure Environment Variables
**This is the most important step!**

Go to: **Project Settings → Environment Variables**

Add these variables for **Production**, **Preview**, and **Development**:

#### Required Variables:

```env
# 1. MongoDB Connection (REQUIRED)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database-name
# OR use DATABASE_URL instead
DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/database-name

# 2. JWT Secret (REQUIRED for admin login)
JWT_SECRET=your-super-secret-random-string-min-32-characters

# 3. Base URL (REQUIRED for SEO and password reset)
# For initial deployment, use your Vercel URL:
NEXT_PUBLIC_BASE_URL=https://your-project-name.vercel.app
# After adding custom domain, update to:
# NEXT_PUBLIC_BASE_URL=https://yourdomain.com

# 4. Email Configuration (REQUIRED for password reset)
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-gmail-app-password
EMAIL_FROM=your-email@gmail.com
```

### Step 3: Deploy Settings (Optional)
Vercel auto-detects Next.js, but you can verify:

- **Framework Preset**: Next.js (auto-detected)
- **Build Command**: `npm run build` (auto-detected)
- **Output Directory**: `.next` (auto-detected)
- **Install Command**: `npm install` (auto-detected)

**Note**: The `output: 'standalone'` in `next.config.js` is fine - Vercel handles it.

### Step 4: Deploy
1. Click **"Deploy"**
2. Wait for build to complete
3. Your app will be live at `https://your-project-name.vercel.app`

### Step 5: After First Deployment

#### Update NEXT_PUBLIC_BASE_URL
1. Get your actual Vercel URL from the deployment
2. Go to **Environment Variables**
3. Update `NEXT_PUBLIC_BASE_URL` to your actual Vercel URL
4. Redeploy (or it will auto-deploy on next push)

#### If Using Custom Domain:
1. Go to **Project Settings → Domains**
2. Add your custom domain
3. Update `NEXT_PUBLIC_BASE_URL` to your custom domain
4. Redeploy

## 📋 Environment Variables Checklist

- [ ] `MONGODB_URI` or `DATABASE_URL` - Your MongoDB connection string
- [ ] `JWT_SECRET` - Random secret key (generate with: `openssl rand -base64 32`)
- [ ] `NEXT_PUBLIC_BASE_URL` - Your Vercel URL (update after first deploy)
- [ ] `EMAIL_USER` - Your Gmail address
- [ ] `EMAIL_PASSWORD` - Gmail app password (not regular password)
- [ ] `EMAIL_FROM` - Same as EMAIL_USER

## 🔐 Generating JWT_SECRET

Run this command in your terminal:
```bash
openssl rand -base64 32
```

Or use an online generator: https://generate-secret.vercel.app/32

## 📧 Gmail App Password Setup

1. Go to [Google Account Settings](https://myaccount.google.com/)
2. **Security** → **2-Step Verification** (enable if not enabled)
3. Scroll to **App passwords**
4. Select **Mail** and **Other (Custom name)**
5. Name it "Vercel" or "Laxmi Education"
6. Copy the 16-character password
7. Use this in `EMAIL_PASSWORD` (not your regular Gmail password)

## ⚠️ Important Notes

1. **Add variables to all environments**: Production, Preview, and Development
2. **NEXT_PUBLIC_BASE_URL**: Must start with `https://` (not `http://`)
3. **MongoDB Atlas**: Make sure to whitelist `0.0.0.0/0` (all IPs) in MongoDB Atlas Network Access
4. **After adding variables**: You may need to redeploy for changes to take effect

## 🧪 Testing After Deployment

1. Visit your Vercel URL
2. Check if the site loads
3. Try admin login: `/admin/login`
4. Test contact form
5. Check browser console for any errors

## 🎯 Quick Reference

- **Vercel Dashboard**: https://vercel.com/dashboard
- **Project Settings**: Project → Settings → Environment Variables
- **Deployments**: Project → Deployments tab
- **Logs**: Click on any deployment → View Function Logs

## ✅ That's It!

Once you've added the environment variables, Vercel will:
- ✅ Automatically build your app
- ✅ Deploy to production
- ✅ Use the correct URLs from environment variables
- ✅ Handle all SEO metadata correctly

No additional code changes needed - everything is already set up! 🚀













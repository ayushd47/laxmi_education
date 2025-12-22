# Laxmi Education - Education Consultancy Website

This is a [Next.js](https://nextjs.org) project for an education consultancy website with admin dashboard.

## Features

- 🎓 University/College listings and management
- 📝 Blog system with categories and tags
- 📧 Contact form and enquiry management
- 🔐 Secure admin authentication with JWT
- ⚙️ Settings management
- 🎨 Customizable appearance

## Getting Started

### Prerequisites

- Node.js 18+ 
- MongoDB database (local or MongoDB Atlas)

### Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory:
```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/laxmi-education
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database-name

# JWT Secret (generate a strong random string)
JWT_SECRET=your-super-secret-jwt-key-change-this

# Email Configuration (for password reset)
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-gmail-app-password
EMAIL_FROM=your-email@gmail.com

# Base URL
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser

## Documentation

- [Deployment Guide](./DEPLOYMENT.md) - How to deploy to production
- [Admin Setup](./ADMIN_SETUP.md) - Admin dashboard setup
- [Authentication Setup](./AUTHENTICATION_SETUP.md) - Authentication configuration
- [Settings Guide](./SETTINGS_GUIDE.md) - Settings management

## Database

This application uses MongoDB for data storage. Collections:
- `colleges` - University/College data
- `blogs` - Blog posts
- `enquiries` - Contact form submissions
- `settings` - Application settings

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

**Important:** Make sure to set the `MONGODB_URI` or `DATABASE_URL` environment variable in your hosting platform!

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [MongoDB Documentation](https://docs.mongodb.com/)

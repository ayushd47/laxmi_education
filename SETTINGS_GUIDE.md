# Settings Guide - Laxmi Education Admin Panel

## Overview

The Settings section in the admin panel allows you to configure various aspects of your Laxmi Education application. This guide covers all available settings and how to use them effectively.

## Accessing Settings

1. Log in to the admin panel
2. Navigate to the Settings section from the sidebar
3. Use the tabbed interface to access different setting categories

## Settings Categories

### 1. General Settings

Configure your site's basic information and contact details.

#### Site Information
- **Site Name**: The name of your educational institution
- **Site Description**: A brief description of your services
- **Site URL**: Your website's main URL
- **Contact Email**: Primary contact email address
- **Contact Phone**: Primary contact phone number
- **Address**: Physical address of your institution

#### Social Media Links
- **Facebook**: Link to your Facebook page
- **Twitter**: Link to your Twitter profile
- **LinkedIn**: Link to your LinkedIn company page
- **Instagram**: Link to your Instagram profile

### 2. Admin Settings

Manage admin account and permissions.

#### Admin Information
- **Admin Name**: Display name for the admin user
- **Admin Email**: Email address for admin notifications

#### Password Management
- **Current Password**: Enter your current password to change it
- **New Password**: Set a new secure password

### 3. Appearance Settings

Customize your site's visual appearance and branding.

#### Color Scheme
- **Primary Color**: Main brand color used throughout the site
- **Secondary Color**: Secondary brand color for accents
- Use the color picker to select from predefined colors or enter custom hex codes

#### Branding
- **Logo URL**: Path to your site's logo image
- **Favicon URL**: Path to your site's favicon
- **Theme**: Choose between Light, Dark, or Auto themes

### 4. Notification Settings

Configure how and when you receive notifications.

#### Email Notifications
- **Email Notifications**: Enable/disable email notifications
- **New Application Alerts**: Get notified when new applications are submitted
- **Blog Publish Alerts**: Get notified when blog posts are published
- **System Alerts**: Get notified about system updates and maintenance

### 5. Security Settings

Manage security settings and access controls.

#### Authentication
- **Two-Factor Authentication**: Add an extra layer of security
- **Session Timeout**: Set how long admin sessions remain active (in minutes)

#### Password Policy
- **Weak**: 6+ characters
- **Medium**: 8+ characters, mixed case
- **Strong**: 12+ characters, mixed case, numbers, symbols

### 6. Backup & Data Management

Manage data backups and system maintenance.

#### Backup Status
- View information about your last backup
- Check backup size and next scheduled backup
- See total number of backups

#### Quick Actions
- **Create Backup Now**: Manually create a new backup
- **Download Backup**: Download the latest backup file
- **Restore from Backup**: Upload and restore from a backup file

#### Backup Schedule
- **Automatic Backups**: Enable/disable automatic backups
- **Backup Frequency**: Set how often backups are created (Daily, Weekly, Monthly)
- **Retention Period**: How long to keep backup files

## Best Practices

### General Settings
- Keep your contact information up to date
- Use a professional email address for contact
- Ensure your social media links are active and relevant

### Appearance Settings
- Choose colors that reflect your brand identity
- Test your logo and favicon to ensure they display correctly
- Consider your target audience when selecting themes

### Security Settings
- Enable two-factor authentication for enhanced security
- Use strong password policies
- Set appropriate session timeouts for your workflow

### Backup Management
- Enable automatic backups for data protection
- Test backup restoration periodically
- Keep multiple backup copies in different locations

## API Integration

The settings system includes a RESTful API for programmatic access:

### Endpoints
- `GET /api/settings` - Retrieve all settings
- `PUT /api/settings` - Update specific settings
- `POST /api/settings` - Perform actions (backup, restore, reset)

### Example Usage
```javascript
// Get all settings
const response = await fetch('/api/settings');
const settings = await response.json();

// Update site settings
await fetch('/api/settings', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    section: 'site',
    data: {
      siteName: 'New Site Name',
      contactEmail: 'new@email.com'
    }
  })
});
```

## Troubleshooting

### Common Issues

1. **Settings not saving**: Check your internet connection and try again
2. **Color picker not working**: Ensure you're using a modern browser
3. **Backup creation fails**: Check available disk space
4. **Email notifications not working**: Verify your email settings

### Getting Help

If you encounter issues with the settings:
1. Check the browser console for error messages
2. Verify your admin permissions
3. Contact your system administrator
4. Review the application logs

## Security Considerations

- Always use strong passwords
- Enable two-factor authentication
- Regularly backup your data
- Keep your admin credentials secure
- Monitor access logs regularly

## Updates and Maintenance

- Settings are automatically saved when you click "Save Changes"
- Changes take effect immediately
- Regular backups ensure you can restore settings if needed
- Monitor system alerts for important updates

---

For additional support or questions about the settings system, please contact your system administrator or refer to the main documentation.

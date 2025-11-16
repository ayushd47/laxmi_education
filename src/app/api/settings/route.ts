import { NextRequest, NextResponse } from 'next/server';

// Mock data - in a real application, this would come from a database
let settings = {
  site: {
    siteName: 'Laxmi Education',
    siteDescription: 'Your gateway to global education opportunities',
    siteUrl: 'https://laxmieducation.com',
    contactEmail: 'info@laxmieducation.com',
    contactPhone: '+1 (555) 123-4567',
    address: '123 Education Street, Learning City, LC 12345',
    socialMedia: {
      facebook: 'https://facebook.com/laxmieducation',
      twitter: 'https://twitter.com/laxmieducation',
      linkedin: 'https://linkedin.com/company/laxmieducation',
      instagram: 'https://instagram.com/laxmieducation'
    }
  },
  admin: {
    adminEmail: 'admin@laxmieducation.com',
    adminName: 'Admin User',
    notifications: {
      emailNotifications: true,
      newApplicationAlerts: true,
      blogPublishAlerts: true,
      systemAlerts: true
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: 30,
      passwordPolicy: 'strong'
    }
  },
  appearance: {
    primaryColor: '#1e40af',
    secondaryColor: '#dc2626',
    logoUrl: '/assets/logo.png',
    faviconUrl: '/favicon.ico',
    theme: 'light'
  }
};

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json({
      success: true,
      data: settings
    });
  } catch (error) {
    console.error('Error fetching settings:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch settings' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { section, data } = body;

    if (!section || !data) {
      return NextResponse.json(
        { success: false, error: 'Section and data are required' },
        { status: 400 }
      );
    }

    // Update the specific section
    if (section === 'site') {
      settings.site = { ...settings.site, ...data };
    } else if (section === 'admin') {
      settings.admin = { ...settings.admin, ...data };
    } else if (section === 'appearance') {
      settings.appearance = { ...settings.appearance, ...data };
    } else {
      return NextResponse.json(
        { success: false, error: 'Invalid section' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `${section} settings updated successfully`,
      data: settings
    });
  } catch (error) {
    console.error('Error updating settings:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update settings' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action } = body;

    if (action === 'reset') {
      const { section } = body;
      
      // Reset to default values
      if (section === 'site') {
        settings.site = {
          siteName: 'Laxmi Education',
          siteDescription: 'Your gateway to global education opportunities',
          siteUrl: 'https://laxmieducation.com',
          contactEmail: 'info@laxmieducation.com',
          contactPhone: '+1 (555) 123-4567',
          address: '123 Education Street, Learning City, LC 12345',
          socialMedia: {
            facebook: 'https://facebook.com/laxmieducation',
            twitter: 'https://twitter.com/laxmieducation',
            linkedin: 'https://linkedin.com/company/laxmieducation',
            instagram: 'https://instagram.com/laxmieducation'
          }
        };
      } else if (section === 'admin') {
        settings.admin = {
          adminEmail: 'admin@laxmieducation.com',
          adminName: 'Admin User',
          notifications: {
            emailNotifications: true,
            newApplicationAlerts: true,
            blogPublishAlerts: true,
            systemAlerts: true
          },
          security: {
            twoFactorAuth: false,
            sessionTimeout: 30,
            passwordPolicy: 'strong'
          }
        };
      } else if (section === 'appearance') {
        settings.appearance = {
          primaryColor: '#1e40af',
          secondaryColor: '#dc2626',
          logoUrl: '/assets/logo.png',
          faviconUrl: '/favicon.ico',
          theme: 'light'
        };
      }

      return NextResponse.json({
        success: true,
        message: `${section} settings reset to defaults`,
        data: settings
      });
    }

    if (action === 'backup') {
      // Create a backup of current settings
      const backup = {
        timestamp: new Date().toISOString(),
        settings: { ...settings }
      };

      return NextResponse.json({
        success: true,
        message: 'Backup created successfully',
        data: backup
      });
    }

    if (action === 'restore') {
      const { backupData } = body;
      
      if (!backupData) {
        return NextResponse.json(
          { success: false, error: 'Backup data is required' },
          { status: 400 }
        );
      }

      settings = { ...backupData };
      
      return NextResponse.json({
        success: true,
        message: 'Settings restored from backup',
        data: settings
      });
    }

    return NextResponse.json(
      { success: false, error: 'Invalid action' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Error processing settings action:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process action' },
      { status: 500 }
    );
  }
}

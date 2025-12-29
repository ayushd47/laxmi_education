// Database store for settings using MongoDB
// Settings are stored as a single document

import { getCollection } from '@/lib/db';
import { ObjectId } from 'mongodb';

export interface SettingsData {
  _id?: ObjectId;
  id?: string;
  site: {
    siteName: string;
    siteDescription: string;
    siteUrl: string;
    contactEmail: string;
    contactPhone: string;
    address: string;
    socialMedia: {
      facebook: string;
      twitter: string;
      linkedin: string;
      instagram: string;
    };
  };
  admin: {
    adminEmail: string;
    adminName: string;
    notifications: {
      emailNotifications: boolean;
      newApplicationAlerts: boolean;
      blogPublishAlerts: boolean;
      systemAlerts: boolean;
    };
    security: {
      twoFactorAuth: boolean;
      sessionTimeout: number;
      passwordPolicy: string;
    };
  };
  appearance: {
    primaryColor: string;
    secondaryColor: string;
    logoUrl: string;
    faviconUrl: string;
    theme: string;
  };
  updatedAt?: string;
}

const COLLECTION_NAME = 'settings';
const SETTINGS_ID = 'main'; // Single document ID

// Default settings
const defaultSettings: Omit<SettingsData, '_id' | 'id' | 'updatedAt'> = {
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

// Get the settings collection
async function getSettingsCollection() {
  return getCollection<SettingsData>(COLLECTION_NAME);
}

// Get settings (or create default if not exists)
export async function getSettings(): Promise<SettingsData> {
  try {
    const collection = await getSettingsCollection();
    let settings = await collection.findOne({ id: SETTINGS_ID });
    
    if (!settings) {
      // Create default settings
      const now = new Date().toISOString();
      const defaultDoc = {
        ...defaultSettings,
        id: SETTINGS_ID,
        updatedAt: now,
      };
      const result = await collection.insertOne(defaultDoc);
      settings = { ...defaultDoc, _id: result.insertedId };
    }
    
    return settings;
  } catch (error) {
    console.error('Error fetching settings from database:', error);
    // Return default settings if database fails
    return {
      ...defaultSettings,
      id: SETTINGS_ID,
      updatedAt: new Date().toISOString(),
    };
  }
}

// Update settings
export async function updateSettings(
  section: 'site' | 'admin' | 'appearance',
  data: Partial<SettingsData['site'] | SettingsData['admin'] | SettingsData['appearance']>
): Promise<SettingsData> {
  try {
    const collection = await getSettingsCollection();
    const now = new Date().toISOString();
    
    // Get current settings
    let currentSettings = await getSettings();
    
    // Update the specific section
    const updatedSettings: SettingsData = {
      ...currentSettings,
      [section]: {
        ...currentSettings[section],
        ...data,
      },
      updatedAt: now,
    };
    
    // Upsert the settings
    await collection.findOneAndUpdate(
      { id: SETTINGS_ID },
      { $set: updatedSettings },
      { upsert: true, returnDocument: 'after' }
    );
    
    return updatedSettings;
  } catch (error) {
    console.error('Error updating settings:', error);
    throw error;
  }
}

// Reset settings section to defaults
export async function resetSettingsSection(
  section: 'site' | 'admin' | 'appearance'
): Promise<SettingsData> {
  try {
    const collection = await getSettingsCollection();
    const now = new Date().toISOString();
    
    // Get current settings
    let currentSettings = await getSettings();
    
    // Reset the specific section
    const updatedSettings: SettingsData = {
      ...currentSettings,
      [section]: defaultSettings[section],
      updatedAt: now,
    };
    
    // Update the settings
    await collection.findOneAndUpdate(
      { id: SETTINGS_ID },
      { $set: updatedSettings },
      { upsert: true, returnDocument: 'after' }
    );
    
    return updatedSettings;
  } catch (error) {
    console.error('Error resetting settings:', error);
    throw error;
  }
}

// Create backup
export async function createBackup(): Promise<{ timestamp: string; settings: SettingsData }> {
  try {
    const settings = await getSettings();
    return {
      timestamp: new Date().toISOString(),
      settings,
    };
  } catch (error) {
    console.error('Error creating backup:', error);
    throw error;
  }
}

// Restore from backup
export async function restoreFromBackup(backupData: SettingsData): Promise<SettingsData> {
  try {
    const collection = await getSettingsCollection();
    const now = new Date().toISOString();
    
    const restoredSettings: SettingsData = {
      ...backupData,
      id: SETTINGS_ID,
      updatedAt: now,
    };
    
    await collection.findOneAndUpdate(
      { id: SETTINGS_ID },
      { $set: restoredSettings },
      { upsert: true, returnDocument: 'after' }
    );
    
    return restoredSettings;
  } catch (error) {
    console.error('Error restoring from backup:', error);
    throw error;
  }
}














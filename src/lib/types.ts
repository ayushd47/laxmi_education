// ... existing code ...

// Settings Types
export interface SiteSettings {
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
}

export interface AdminSettings {
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
    passwordPolicy: 'weak' | 'medium' | 'strong';
  };
}

export interface AppearanceSettings {
  primaryColor: string;
  secondaryColor: string;
  logoUrl: string;
  faviconUrl: string;
  theme: 'light' | 'dark' | 'auto';
}

export interface SettingsResponse {
  success: boolean;
  data?: {
    site: SiteSettings;
    admin: AdminSettings;
    appearance: AppearanceSettings;
  };
  message?: string;
  error?: string;
}

export interface BackupData {
  timestamp: string;
  settings: {
    site: SiteSettings;
    admin: AdminSettings;
    appearance: AppearanceSettings;
  };
}

// University/College Types
export interface University {
  id: string;
  name: string;
  country: string;
  city: string;
  ranking: number;
  type: 'public' | 'private';
  established: number;
  students: number;
  tuitionFee: {
    undergraduate: number;
    graduate: number;
  };
  programs: string[];
  requirements: string[];
  applicationDeadline: string;
  imageUrl: string;
  website: string;
  description: string;
  status: 'active' | 'inactive';
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  createdAt: string;
  updatedAt: string;
}

export type CreateUniversityData = Omit<University, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateUniversityData = Partial<Omit<University, 'id' | 'createdAt' | 'updatedAt'>>;
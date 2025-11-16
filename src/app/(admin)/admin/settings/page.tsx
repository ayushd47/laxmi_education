'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import SettingsForm from './components/SettingsForm';
import ColorPicker from './components/ColorPicker';
import ToggleSwitch from './components/ToggleSwitch';
import BackupManager from './components/BackupManager';
import {
  Settings,
  Globe,
  Mail,
  Phone,
  MapPin,
  Shield,
  Database,
  Palette,
  Bell,
  Users,
  Save,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  Eye,
  EyeOff
} from 'lucide-react';
import { SiteSettings, AdminSettings, AppearanceSettings } from '@/lib/types';


export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general');
  const [loading, setLoading] = useState(false);
  const [showPasswords, setShowPasswords] = useState(false);
  
  const [siteSettings, setSiteSettings] = useState<SiteSettings>({
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
  });

  const [adminSettings, setAdminSettings] = useState<AdminSettings>({
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
  });

  const [appearanceSettings, setAppearanceSettings] = useState<AppearanceSettings>({
    primaryColor: '#1e40af',
    secondaryColor: '#dc2626',
    logoUrl: '/assets/logo.png',
    faviconUrl: '/favicon.ico',
    theme: 'light'
  });

  const tabs = [
    { id: 'general', name: 'General', icon: Globe },
    { id: 'admin', name: 'Admin', icon: Shield },
    { id: 'appearance', name: 'Appearance', icon: Palette },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'backup', name: 'Backup', icon: Database }
  ];

  const handleSave = async (section: string) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success(`${section} settings saved successfully!`);
    } catch (error) {
      toast.error('Failed to save settings');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = (section: string) => {
    toast.info(`${section} settings reset to defaults`);
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-royal-blue/5 via-blue-50/50 to-royal-blue/5 rounded-2xl p-6 sm:p-8 border border-royal-blue/10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Settings
            </h1>
            <p className="text-gray-600 mt-2 text-base sm:text-lg">
              Manage your application settings and preferences
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm text-gray-500">Last updated</p>
              <p className="text-sm font-semibold text-gray-900">2 hours ago</p>
            </div>
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Settings Navigation */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <nav className="space-y-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                        activeTab === tab.id
                          ? 'bg-royal-blue text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      {tab.name}
                    </button>
                  );
                })}
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          {/* General Settings */}
          {activeTab === 'general' && (
            <SettingsForm
              title="General Settings"
              description="Configure your site's basic information and contact details"
              onSave={async () => {
                setLoading(true);
                try {
                  const response = await fetch('/api/settings', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ section: 'site', data: siteSettings })
                  });
                  if (!response.ok) throw new Error('Failed to save settings');
                } finally {
                  setLoading(false);
                }
              }}
              onReset={() => {
                setSiteSettings({
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
                });
              }}
              loading={loading}
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Site Name
                    </label>
                    <Input
                      value={siteSettings.siteName}
                      onChange={(e) => setSiteSettings({...siteSettings, siteName: e.target.value})}
                      placeholder="Enter site name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Site URL
                    </label>
                    <Input
                      value={siteSettings.siteUrl}
                      onChange={(e) => setSiteSettings({...siteSettings, siteUrl: e.target.value})}
                      placeholder="https://yoursite.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Site Description
                  </label>
                  <textarea
                    value={siteSettings.siteDescription}
                    onChange={(e) => setSiteSettings({...siteSettings, siteDescription: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-royal-blue focus:border-transparent"
                    rows={3}
                    placeholder="Enter site description"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contact Email
                    </label>
                    <Input
                      value={siteSettings.contactEmail}
                      onChange={(e) => setSiteSettings({...siteSettings, contactEmail: e.target.value})}
                      placeholder="contact@yoursite.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contact Phone
                    </label>
                    <Input
                      value={siteSettings.contactPhone}
                      onChange={(e) => setSiteSettings({...siteSettings, contactPhone: e.target.value})}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address
                  </label>
                  <textarea
                    value={siteSettings.address}
                    onChange={(e) => setSiteSettings({...siteSettings, address: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-royal-blue focus:border-transparent"
                    rows={2}
                    placeholder="Enter full address"
                  />
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Social Media Links</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Facebook
                      </label>
                      <Input
                        value={siteSettings.socialMedia.facebook}
                        onChange={(e) => setSiteSettings({
                          ...siteSettings, 
                          socialMedia: {...siteSettings.socialMedia, facebook: e.target.value}
                        })}
                        placeholder="https://facebook.com/yourpage"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Twitter
                      </label>
                      <Input
                        value={siteSettings.socialMedia.twitter}
                        onChange={(e) => setSiteSettings({
                          ...siteSettings, 
                          socialMedia: {...siteSettings.socialMedia, twitter: e.target.value}
                        })}
                        placeholder="https://twitter.com/yourhandle"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        LinkedIn
                      </label>
                      <Input
                        value={siteSettings.socialMedia.linkedin}
                        onChange={(e) => setSiteSettings({
                          ...siteSettings, 
                          socialMedia: {...siteSettings.socialMedia, linkedin: e.target.value}
                        })}
                        placeholder="https://linkedin.com/company/yourcompany"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Instagram
                      </label>
                      <Input
                        value={siteSettings.socialMedia.instagram}
                        onChange={(e) => setSiteSettings({
                          ...siteSettings, 
                          socialMedia: {...siteSettings.socialMedia, instagram: e.target.value}
                        })}
                        placeholder="https://instagram.com/yourhandle"
                      />
                    </div>
                  </div>
                </div>

            </SettingsForm>
          )}

          {/* Admin Settings */}
          {activeTab === 'admin' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Admin Settings
                </CardTitle>
                <CardDescription>
                  Manage admin account and permissions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Admin Name
                    </label>
                    <Input
                      value={adminSettings.adminName}
                      onChange={(e) => setAdminSettings({...adminSettings, adminName: e.target.value})}
                      placeholder="Enter admin name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Admin Email
                    </label>
                    <Input
                      value={adminSettings.adminEmail}
                      onChange={(e) => setAdminSettings({...adminSettings, adminEmail: e.target.value})}
                      placeholder="admin@yoursite.com"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Change Password</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Current Password
                      </label>
                      <div className="relative">
                        <Input
                          type={showPasswords ? "text" : "password"}
                          placeholder="Enter current password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPasswords(!showPasswords)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2"
                        >
                          {showPasswords ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        New Password
                      </label>
                      <div className="relative">
                        <Input
                          type={showPasswords ? "text" : "password"}
                          placeholder="Enter new password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPasswords(!showPasswords)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2"
                        >
                          {showPasswords ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button 
                    onClick={() => handleSave('Admin')}
                    disabled={loading}
                    className="flex items-center gap-2"
                  >
                    <Save className="h-4 w-4" />
                    Save Changes
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => handleReset('Admin')}
                    className="flex items-center gap-2"
                  >
                    <RefreshCw className="h-4 w-4" />
                    Reset
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Appearance Settings */}
          {activeTab === 'appearance' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Appearance Settings
                </CardTitle>
                <CardDescription>
                  Customize your site's appearance and branding
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ColorPicker
                    value={appearanceSettings.primaryColor}
                    onChange={(color) => setAppearanceSettings({...appearanceSettings, primaryColor: color})}
                    label="Primary Color"
                    description="Main brand color used throughout the site"
                  />
                  <ColorPicker
                    value={appearanceSettings.secondaryColor}
                    onChange={(color) => setAppearanceSettings({...appearanceSettings, secondaryColor: color})}
                    label="Secondary Color"
                    description="Secondary brand color for accents"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Logo URL
                    </label>
                    <Input
                      value={appearanceSettings.logoUrl}
                      onChange={(e) => setAppearanceSettings({...appearanceSettings, logoUrl: e.target.value})}
                      placeholder="/assets/logo.png"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Favicon URL
                    </label>
                    <Input
                      value={appearanceSettings.faviconUrl}
                      onChange={(e) => setAppearanceSettings({...appearanceSettings, faviconUrl: e.target.value})}
                      placeholder="/favicon.ico"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Theme
                  </label>
                  <select
                    value={appearanceSettings.theme}
                    onChange={(e) => setAppearanceSettings({...appearanceSettings, theme: e.target.value as 'light' | 'dark' | 'auto'})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-royal-blue focus:border-transparent"
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="auto">Auto</option>
                  </select>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button 
                    onClick={() => handleSave('Appearance')}
                    disabled={loading}
                    className="flex items-center gap-2"
                  >
                    <Save className="h-4 w-4" />
                    Save Changes
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => handleReset('Appearance')}
                    className="flex items-center gap-2"
                  >
                    <RefreshCw className="h-4 w-4" />
                    Reset
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Notifications Settings */}
          {activeTab === 'notifications' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notification Settings
                </CardTitle>
                <CardDescription>
                  Configure your notification preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <ToggleSwitch
                    checked={adminSettings.notifications.emailNotifications}
                    onChange={(checked) => setAdminSettings({
                      ...adminSettings,
                      notifications: {...adminSettings.notifications, emailNotifications: checked}
                    })}
                    label="Email Notifications"
                    description="Receive notifications via email"
                  />

                  <ToggleSwitch
                    checked={adminSettings.notifications.newApplicationAlerts}
                    onChange={(checked) => setAdminSettings({
                      ...adminSettings,
                      notifications: {...adminSettings.notifications, newApplicationAlerts: checked}
                    })}
                    label="New Application Alerts"
                    description="Get notified when new applications are submitted"
                  />

                  <ToggleSwitch
                    checked={adminSettings.notifications.blogPublishAlerts}
                    onChange={(checked) => setAdminSettings({
                      ...adminSettings,
                      notifications: {...adminSettings.notifications, blogPublishAlerts: checked}
                    })}
                    label="Blog Publish Alerts"
                    description="Get notified when blog posts are published"
                  />

                  <ToggleSwitch
                    checked={adminSettings.notifications.systemAlerts}
                    onChange={(checked) => setAdminSettings({
                      ...adminSettings,
                      notifications: {...adminSettings.notifications, systemAlerts: checked}
                    })}
                    label="System Alerts"
                    description="Get notified about system updates and maintenance"
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <Button 
                    onClick={() => handleSave('Notifications')}
                    disabled={loading}
                    className="flex items-center gap-2"
                  >
                    <Save className="h-4 w-4" />
                    Save Changes
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => handleReset('Notifications')}
                    className="flex items-center gap-2"
                  >
                    <RefreshCw className="h-4 w-4" />
                    Reset
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Security Settings */}
          {activeTab === 'security' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Security Settings
                </CardTitle>
                <CardDescription>
                  Manage security settings and access controls
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">Two-Factor Authentication</h3>
                      <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={adminSettings.security.twoFactorAuth}
                        onChange={(e) => setAdminSettings({
                          ...adminSettings,
                          security: {...adminSettings.security, twoFactorAuth: e.target.checked}
                        })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-royal-blue/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-royal-blue"></div>
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Session Timeout (minutes)
                    </label>
                    <Input
                      type="number"
                      value={adminSettings.security.sessionTimeout}
                      onChange={(e) => setAdminSettings({
                        ...adminSettings,
                        security: {...adminSettings.security, sessionTimeout: parseInt(e.target.value)}
                      })}
                      placeholder="30"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Password Policy
                    </label>
                    <select
                      value={adminSettings.security.passwordPolicy}
                      onChange={(e) => setAdminSettings({
                        ...adminSettings,
                        security: {...adminSettings.security, passwordPolicy: e.target.value as 'weak' | 'medium' | 'strong'}
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-royal-blue focus:border-transparent"
                    >
                      <option value="weak">Weak (6+ characters)</option>
                      <option value="medium">Medium (8+ characters, mixed case)</option>
                      <option value="strong">Strong (12+ characters, mixed case, numbers, symbols)</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button 
                    onClick={() => handleSave('Security')}
                    disabled={loading}
                    className="flex items-center gap-2"
                  >
                    <Save className="h-4 w-4" />
                    Save Changes
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => handleReset('Security')}
                    className="flex items-center gap-2"
                  >
                    <RefreshCw className="h-4 w-4" />
                    Reset
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Backup Settings */}
          {activeTab === 'backup' && (
            <BackupManager
              onCreateBackup={async () => {
                const response = await fetch('/api/settings', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ action: 'backup' })
                });
                if (!response.ok) throw new Error('Failed to create backup');
              }}
              onRestoreBackup={async (file) => {
                const formData = new FormData();
                formData.append('backup', file);
                const response = await fetch('/api/settings', {
                  method: 'POST',
                  body: formData
                });
                if (!response.ok) throw new Error('Failed to restore backup');
              }}
              onDownloadBackup={async () => {
                const response = await fetch('/api/settings?action=download');
                if (!response.ok) throw new Error('Failed to download backup');
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `backup-${new Date().toISOString().split('T')[0]}.json`;
                a.click();
                window.URL.revokeObjectURL(url);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

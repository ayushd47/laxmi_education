'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import {
  Database,
  Download,
  Upload,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Clock,
  HardDrive
} from 'lucide-react';

interface BackupInfo {
  lastBackup: string;
  backupSize: string;
  nextBackup: string;
  totalBackups: number;
}

interface BackupManagerProps {
  onCreateBackup: () => Promise<void>;
  onRestoreBackup: (file: File) => Promise<void>;
  onDownloadBackup: () => Promise<void>;
}

export default function BackupManager({ 
  onCreateBackup, 
  onRestoreBackup, 
  onDownloadBackup 
}: BackupManagerProps) {
  const [loading, setLoading] = useState(false);
  const [backupInfo] = useState<BackupInfo>({
    lastBackup: '2 hours ago',
    backupSize: '2.4 GB',
    nextBackup: 'In 22 hours',
    totalBackups: 7
  });

  const handleCreateBackup = async () => {
    setLoading(true);
    try {
      await onCreateBackup();
      toast.success('Backup created successfully!');
    } catch (error) {
      toast.error('Failed to create backup');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadBackup = async () => {
    setLoading(true);
    try {
      await onDownloadBackup();
      toast.success('Backup download started!');
    } catch (error) {
      toast.error('Failed to download backup');
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setLoading(true);
    try {
      await onRestoreBackup(file);
      toast.success('Backup restored successfully!');
    } catch (error) {
      toast.error('Failed to restore backup');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Backup Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Backup Status
          </CardTitle>
          <CardDescription>
            Current backup information and status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">Last Backup</p>
                <p className="text-sm text-gray-600">{backupInfo.lastBackup}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
              <HardDrive className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">Backup Size</p>
                <p className="text-sm text-gray-600">{backupInfo.backupSize}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
              <Clock className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">Next Backup</p>
                <p className="text-sm text-gray-600">{backupInfo.nextBackup}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
              <Database className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">Total Backups</p>
                <p className="text-sm text-gray-600">{backupInfo.totalBackups}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Manage your backups with these quick actions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button 
              onClick={handleCreateBackup}
              disabled={loading}
              className="flex items-center gap-2 h-auto p-4"
            >
              <Database className="h-4 w-4" />
              <div className="text-left">
                <div className="font-medium">Create Backup</div>
                <div className="text-xs opacity-80">Create a new backup now</div>
              </div>
            </Button>
            
            <Button 
              onClick={handleDownloadBackup}
              disabled={loading}
              variant="outline"
              className="flex items-center gap-2 h-auto p-4"
            >
              <Download className="h-4 w-4" />
              <div className="text-left">
                <div className="font-medium">Download Backup</div>
                <div className="text-xs opacity-80">Download latest backup</div>
              </div>
            </Button>
            
            <label className="flex items-center gap-2 h-auto p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
              <Upload className="h-4 w-4" />
              <div className="text-left">
                <div className="font-medium">Restore Backup</div>
                <div className="text-xs opacity-80">Upload and restore backup</div>
              </div>
              <input
                type="file"
                accept=".json,.zip"
                onChange={handleFileUpload}
                className="hidden"
                disabled={loading}
              />
            </label>
          </div>
        </CardContent>
      </Card>

      {/* Backup Schedule */}
      <Card>
        <CardHeader>
          <CardTitle>Backup Schedule</CardTitle>
          <CardDescription>
            Configure automatic backup settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-900">Automatic Backups</h3>
              <p className="text-sm text-gray-500">Enable automatic daily backups</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-royal-blue/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-royal-blue"></div>
            </label>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Backup Frequency
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-royal-blue focus:border-transparent">
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Retention Period
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-royal-blue focus:border-transparent">
              <option value="7">7 days</option>
              <option value="30">30 days</option>
              <option value="90">90 days</option>
              <option value="365">1 year</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Recent Backups */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Backups</CardTitle>
          <CardDescription>
            View and manage your recent backups
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { name: 'Backup_2024-01-15_14-30.json', size: '2.4 GB', date: '2 hours ago', status: 'success' },
              { name: 'Backup_2024-01-14_14-30.json', size: '2.3 GB', date: '1 day ago', status: 'success' },
              { name: 'Backup_2024-01-13_14-30.json', size: '2.2 GB', date: '2 days ago', status: 'success' },
            ].map((backup, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <Database className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{backup.name}</p>
                    <p className="text-xs text-gray-500">{backup.size} • {backup.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    backup.status === 'success' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {backup.status}
                  </span>
                  <Button size="sm" variant="outline">
                    <Download className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Bell, Settings, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuthStore } from '@/store/useAuthStore';

export default function AdminHeader() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/admin/login');
  };

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-lg border-b border-gray-200/50 sticky top-0 z-30">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Search */}
          <div className="flex-1 max-w-lg">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search students, applications, universities..."
                className="pl-12 pr-4 py-3 w-full bg-gray-50/50 border-gray-200/50 rounded-xl focus:bg-white focus:border-royal-blue/50 focus:ring-2 focus:ring-royal-blue/10 transition-all duration-200"
              />
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-3">
            {/* Notifications */}
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="relative w-12 h-12 rounded-xl hover:bg-gray-100/50 transition-all duration-200"
              >
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-semibold shadow-lg">
                  3
                </span>
              </Button>

              {/* Notifications dropdown */}
              {isNotificationsOpen && (
                <div className="absolute right-0 mt-3 w-80 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-200/50 z-50 overflow-hidden">
                  <div className="p-5 border-b border-gray-200/50 bg-gradient-to-r from-gray-50/50 to-white">
                    <h3 className="text-lg font-bold text-gray-900">Notifications</h3>
                    <p className="text-sm text-gray-500">You have 3 new notifications</p>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    <div className="p-4 border-b border-gray-100/50 hover:bg-gradient-to-r hover:from-royal-blue/5 hover:to-blue-600/5 transition-all duration-200">
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-gray-900">New Application</p>
                          <p className="text-xs text-gray-500">John Doe applied for Computer Science at MIT</p>
                          <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 border-b border-gray-100/50 hover:bg-gradient-to-r hover:from-royal-blue/5 hover:to-blue-600/5 transition-all duration-200">
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-gray-900">Test Score Update</p>
                          <p className="text-xs text-gray-500">Sarah Wilson submitted IELTS score</p>
                          <p className="text-xs text-gray-400 mt-1">4 hours ago</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 hover:bg-gradient-to-r hover:from-royal-blue/5 hover:to-blue-600/5 transition-all duration-200">
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-gray-900">Document Upload</p>
                          <p className="text-xs text-gray-500">Mike Johnson uploaded transcripts</p>
                          <p className="text-xs text-gray-400 mt-1">6 hours ago</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 border-t border-gray-200/50 bg-gradient-to-r from-gray-50/50 to-white">
                    <Button variant="ghost" className="w-full rounded-xl hover:bg-royal-blue/10 hover:text-royal-blue transition-all duration-200">
                      View All Notifications
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Settings */}
            <Button variant="ghost" size="icon" className="w-12 h-12 rounded-xl hover:bg-gray-100/50 transition-all duration-200">
              <Settings className="w-5 h-5 text-gray-600" />
            </Button>

            {/* Profile */}
            <div className="relative">
              <Button
                variant="ghost"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-3 p-2 rounded-xl hover:bg-gray-100/50 transition-all duration-200"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-royal-blue to-blue-600 rounded-xl flex items-center justify-center shadow-md">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div className="hidden sm:block text-left">
                  <span className="text-sm font-semibold text-gray-900 block">
                    {user?.name || 'Admin User'}
                  </span>
                  <span className="text-xs text-gray-500">Administrator</span>
                </div>
              </Button>

              {/* Profile dropdown */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-3 w-56 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-200/50 z-50 overflow-hidden">
                  <div className="p-5 border-b border-gray-200/50 bg-gradient-to-r from-gray-50/50 to-white">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-royal-blue to-blue-600 rounded-xl flex items-center justify-center shadow-md">
                        <User className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900">{user?.name || 'Admin User'}</p>
                        <p className="text-xs text-gray-500">{user?.email || 'admin@laxmieducation.com'}</p>
                      </div>
                    </div>
                  </div>
                  <div className="py-2">
                    <button className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-royal-blue/5 hover:to-blue-600/5 transition-all duration-200">
                      <User className="w-4 h-4 mr-3" />
                      Profile Settings
                    </button>
                    <button className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-royal-blue/5 hover:to-blue-600/5 transition-all duration-200">
                      <Settings className="w-4 h-4 mr-3" />
                      Preferences
                    </button>
                    <hr className="my-2 border-gray-200/50" />
                    <button 
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-3 text-sm text-red-600 hover:bg-gradient-to-r hover:from-red-50 hover:to-red-50/50 transition-all duration-200"
                    >
                      <LogOut className="w-4 h-4 mr-3" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}


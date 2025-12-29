'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Bell, Settings, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuthStore } from '@/store/useAuthStore';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'application' | 'score' | 'document' | 'other';
  createdAt: string;
  read: boolean;
}

export default function AdminHeader() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoadingNotifications, setIsLoadingNotifications] = useState(false);
  const { user, logout } = useAuthStore();
  const router = useRouter();

  // Fetch notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setIsLoadingNotifications(true);
        // TODO: Replace with actual API endpoint when available
        // const response = await fetch('/api/notifications');
        // if (response.ok) {
        //   const data = await response.json();
        //   setNotifications(data);
        // }
        // For now, set empty array
        setNotifications([]);
      } catch (error) {
        console.error('Error fetching notifications:', error);
        setNotifications([]);
      } finally {
        setIsLoadingNotifications(false);
      }
    };

    fetchNotifications();
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

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
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-semibold shadow-lg">
                    {unreadCount}
                  </span>
                )}
              </Button>

              {/* Notifications dropdown */}
              {isNotificationsOpen && (
                <div className="absolute right-0 mt-3 w-80 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-200/50 z-50 overflow-hidden">
                  <div className="p-5 border-b border-gray-200/50 bg-gradient-to-r from-gray-50/50 to-white">
                    <h3 className="text-lg font-bold text-gray-900">Notifications</h3>
                    <p className="text-sm text-gray-500">
                      {unreadCount > 0 
                        ? `You have ${unreadCount} new notification${unreadCount > 1 ? 's' : ''}`
                        : 'No new notifications'}
                    </p>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {isLoadingNotifications ? (
                      <div className="p-8 text-center">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-royal-blue mx-auto"></div>
                        <p className="text-xs text-gray-500 mt-2">Loading notifications...</p>
                      </div>
                    ) : notifications.length === 0 ? (
                      <div className="p-8 text-center">
                        <Bell className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                        <p className="text-sm text-gray-500">No notifications available</p>
                      </div>
                    ) : (
                      notifications.map((notification) => {
                        const getTypeColor = (type: string) => {
                          switch (type) {
                            case 'application':
                              return 'bg-green-500';
                            case 'score':
                              return 'bg-blue-500';
                            case 'document':
                              return 'bg-yellow-500';
                            default:
                              return 'bg-gray-500';
                          }
                        };

                        const formatTimeAgo = (dateString: string) => {
                          const date = new Date(dateString);
                          const now = new Date();
                          const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
                          
                          if (diffInSeconds < 60) return 'Just now';
                          if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
                          if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
                          return `${Math.floor(diffInSeconds / 86400)} days ago`;
                        };

                        return (
                          <div
                            key={notification.id}
                            className={`p-4 border-b border-gray-100/50 hover:bg-gradient-to-r hover:from-royal-blue/5 hover:to-blue-600/5 transition-all duration-200 ${!notification.read ? 'bg-blue-50/30' : ''}`}
                          >
                            <div className="flex items-start space-x-3">
                              <div className={`w-2 h-2 ${getTypeColor(notification.type)} rounded-full mt-2`}></div>
                              <div className="flex-1">
                                <p className="text-sm font-semibold text-gray-900">{notification.title}</p>
                                <p className="text-xs text-gray-500">{notification.message}</p>
                                <p className="text-xs text-gray-400 mt-1">{formatTimeAgo(notification.createdAt)}</p>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                  {notifications.length > 0 && (
                    <div className="p-4 border-t border-gray-200/50 bg-gradient-to-r from-gray-50/50 to-white">
                      <Button variant="ghost" className="w-full rounded-xl hover:bg-royal-blue/10 hover:text-royal-blue transition-all duration-200">
                        View All Notifications
                      </Button>
                    </div>
                  )}
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


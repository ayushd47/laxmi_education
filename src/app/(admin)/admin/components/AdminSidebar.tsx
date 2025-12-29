'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  FileText,
  Settings,
  BarChart3,
  Globe,
  MessageSquare,
  UserCheck,
  Building2,
  Calendar,
  LogOut,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Home,
  TrendingUp,
  Bell,
  Shield,
  Star
} from 'lucide-react';
import { useState, useEffect } from 'react';

const navigation = [
  {
    name: 'Dashboard',
    href: '/admin',
    icon: LayoutDashboard,
    badge: null,
  },
  {
    name: 'Enquiries',
    href: '/admin/enquiries',
    icon: MessageSquare,
    badge: null,
  },
  {
    name: 'Universities',
    href: '/admin/universities',
    icon: Building2,
    badge: null,
  },
  {
    name: 'Blog Posts',
    href: '/admin/blog',
    icon: FileText,
    badge: null,
  },
  {
    name: 'Testimonials',
    href: '/admin/testimonials',
    icon: Star,
    badge: null,
  },
  {
    name: 'Settings',
    href: '/admin/settings',
    icon: Settings,
    badge: null,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="bg-white p-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-royal-blue/20"
        >
          {isMobileMenuOpen ? (
            <X className="h-5 w-5 text-gray-700" />
          ) : (
            <Menu className="h-5 w-5 text-gray-700" />
          )}
        </button>
      </div>

      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-40 bg-gradient-to-b from-slate-50 to-white shadow-2xl transform transition-all duration-300 ease-in-out border-r border-gray-200/50",
        isCollapsed ? "w-16" : "w-72",
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className="flex items-center justify-between h-20 px-4 border-b border-gray-200/50">
            <div className={cn(
              "flex items-center space-x-3 transition-all duration-300",
              isCollapsed && "justify-center"
            )}>
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-royal-blue to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              {!isCollapsed && (
                <div className="transition-all duration-300">
                  <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                    Laxmi Admin
                  </span>
                  <p className="text-xs text-gray-500">Education Portal</p>
                </div>
              )}
            </div>
            
            {/* Collapse Toggle - Desktop Only */}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden lg:flex items-center justify-center w-8 h-8 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              {isCollapsed ? (
                <ChevronRight className="w-4 h-4 text-gray-600" />
              ) : (
                <ChevronLeft className="w-4 h-4 text-gray-600" />
              )}
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <div key={item.name} className="relative">
                  <Link
                    href={item.href}
                    className={cn(
                      "group flex items-center px-3 py-3 text-sm font-medium rounded-xl transition-all duration-200 relative overflow-hidden",
                      isActive
                        ? "bg-gradient-to-r from-royal-blue to-blue-600 text-white shadow-lg shadow-royal-blue/25"
                        : "text-gray-700 hover:bg-gray-100 hover:text-gray-900 hover:shadow-md"
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                    onMouseEnter={() => setHoveredItem(item.name)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    {/* Active indicator */}
                    {isActive && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-white rounded-r-full"></div>
                    )}
                    
                    {/* Icon */}
                    <div className={cn(
                      "flex-shrink-0 transition-all duration-200",
                      isActive ? "text-white" : "text-gray-500 group-hover:text-gray-700"
                    )}>
                      <item.icon className="w-5 h-5" />
                    </div>
                    
                    {/* Text and Badge */}
                    {!isCollapsed && (
                      <div className="flex items-center justify-between flex-1 ml-3">
                        <span className="transition-all duration-200">{item.name}</span>
                        {item.badge && (
                          <span className={cn(
                            "px-2 py-1 text-xs font-medium rounded-full transition-all duration-200",
                            isActive 
                              ? "bg-white/20 text-white" 
                              : "bg-royal-blue/10 text-royal-blue group-hover:bg-royal-blue/20"
                          )}>
                            {item.badge}
                          </span>
                        )}
                      </div>
                    )}
                    
                    {/* Hover effect */}
                    {hoveredItem === item.name && !isActive && (
                      <div className="absolute inset-0 bg-gradient-to-r from-royal-blue/5 to-blue-600/5 rounded-xl"></div>
                    )}
                  </Link>
                  
                  {/* Tooltip for collapsed state */}
                  {isCollapsed && (
                    <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
                      {item.name}
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 rotate-45"></div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* User Section */}
          <div className="p-4 border-t border-gray-200/50">
            <div className={cn(
              "flex items-center space-x-3 p-3 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100/50 transition-all duration-200 hover:from-gray-100 hover:to-gray-200/50",
              isCollapsed && "justify-center"
            )}>
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-royal-blue to-blue-600 rounded-xl flex items-center justify-center shadow-md">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                </div>
              </div>
              
              {!isCollapsed && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">
                    Admin User
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    admin@laxmieducation.com
                  </p>
                </div>
              )}
              
              <button className={cn(
                "p-2 text-gray-400 hover:text-gray-600 hover:bg-white/50 rounded-lg transition-all duration-200",
                isCollapsed && "mx-auto"
              )}>
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
}


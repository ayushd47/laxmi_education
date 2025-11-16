'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';

interface AdminAuthProviderProps {
  children: React.ReactNode;
}

export default function AdminAuthProvider({ children }: AdminAuthProviderProps) {
  const { isAuthenticated, isLoading } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  const [hasChecked, setHasChecked] = useState(false);

  useEffect(() => {
    // Only redirect if we're not on the login page and not authenticated
    if (!hasChecked && !isLoading) {
      setHasChecked(true);
      if (!isAuthenticated && !pathname.includes('/admin/login')) {
        router.push('/admin/login');
      }
    }
  }, [isAuthenticated, isLoading, router, hasChecked, pathname]);

  // Show loading only if we're actually loading
  if (isLoading && !hasChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-royal-blue mx-auto mb-4"></div>
          <p className="text-gray-600">Verifying authentication...</p>
        </div>
      </div>
    );
  }

  // If not authenticated and not on login page, don't render anything
  if (!isAuthenticated && !pathname.includes('/admin/login')) {
    return null;
  }

  return <>{children}</>;
}

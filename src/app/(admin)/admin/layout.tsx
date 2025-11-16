import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AdminSidebar from './components/AdminSidebar';
import AdminHeader from './components/AdminHeader';
import { Toaster } from "@/components/ui/sonner";
import ErrorBoundary from '@/components/ErrorBoundary';
import AdminAuthProvider from './components/AdminAuthProvider';
import "../../globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Admin Dashboard - Laxmi Education",
  description: "Admin panel for managing Laxmi Education content and applications",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased bg-gradient-to-br from-gray-50 via-white to-gray-50`}
      >
        <ErrorBoundary>
          <AdminAuthProvider>
            <div className="min-h-screen flex">
              {/* Sidebar */}
              <AdminSidebar />
              
              {/* Main Content */}
              <div className="flex-1 flex flex-col transition-all duration-300 lg:ml-72">
                <AdminHeader />
                <main className="flex-1 p-4 sm:p-6 lg:p-8">
                  <div className="max-w-7xl mx-auto w-full">
                    {children}
                  </div>
                </main>
              </div>
            </div>
          </AdminAuthProvider>
          <Toaster richColors={true} />
        </ErrorBoundary>
      </body>
    </html>
  );
}

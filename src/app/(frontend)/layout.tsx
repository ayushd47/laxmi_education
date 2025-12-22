import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ConsultationBanner from '@/components/ConsultationBanner';
import { Toaster } from "@/components/ui/sonner";
import ErrorBoundary from '@/components/ErrorBoundary';
import "../globals.css";
import { getBaseUrl } from "@/lib/metadata";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const baseUrl = getBaseUrl();

export const metadata: Metadata = {
  title: "Laxmi Education - Your Gateway to International Education",
  description: "Expert guidance for study abroad programs, test preparation (IELTS, TOEFL, GRE, GMAT), and university applications. Achieve your dreams of international education with Laxmi Education.",
  keywords: "study abroad, IELTS preparation, TOEFL preparation, GRE preparation, GMAT preparation, university applications, visa assistance, international education",
  authors: [{ name: "Laxmi Education" }],
  creator: "Laxmi Education",
  publisher: "Laxmi Education",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(baseUrl),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Laxmi Education - Your Gateway to International Education",
    description: "Expert guidance for study abroad programs, test preparation, and university applications.",
    url: baseUrl,
    siteName: 'Laxmi Education',
    images: [
      {
        url: '/assets/logo.png', // Using logo as fallback until og-image.jpg is created
        width: 1200,
        height: 630,
        alt: 'Laxmi Education - International Education Services',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Laxmi Education - Your Gateway to International Education",
    description: "Expert guidance for study abroad programs, test preparation, and university applications.",
    images: ['/assets/logo.png'], // Using logo as fallback until og-image.jpg is created
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function FrontendLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ErrorBoundary>
      {/* Top Contact Bar */}
      <div className="bg-royal-blue text-white text-sm py-2 relative z-[60]" style={{color: 'white'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center">
          {/* Left side - Kathmandu Contact */}
          <div className="flex items-center mb-1 sm:mb-0" style={{color: 'white'}}>
            <span className="mr-2" style={{color: 'white'}}>📞</span>
            <span style={{color: 'white'}}>Contact No: Kathmandu 9823727770</span>
          </div>
          {/* Right side - Jhapa Contact & Email */}
          <div className="flex items-center space-x-4">
            <span className="flex items-center" style={{color: 'white'}}>
              <span className="mr-2" style={{color: 'white'}}>📞</span>
              <span style={{color: 'white'}}>Jhapa 9804904835</span>
            </span>
            <span className="flex items-center" style={{color: 'white'}}>
              <span className="mr-2" style={{color: 'white'}}>✉️</span>
              <span style={{color: 'white'}}>collegeadmissionnp@gmail.com</span>
            </span>
          </div>
        </div>
      </div>
      <Header />
      <main className="min-h-screen">
        {children}
      </main>
      <Footer />
      <ConsultationBanner />
      <Toaster richColors={true} />
    </ErrorBoundary>
  );
}


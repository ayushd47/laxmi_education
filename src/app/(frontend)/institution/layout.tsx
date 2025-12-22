import type { Metadata } from "next";
import { getBaseUrl } from "@/lib/metadata";

const baseUrl = getBaseUrl();

export const metadata: Metadata = {
  title: "Top Universities & Colleges in India | Laxmi Education",
  description: "Discover the best universities, colleges, and research institutes in India. Find detailed information about IITs, IIMs, AIIMS, and other premier educational institutions.",
  keywords: "universities in India, colleges in India, IIT, IIM, AIIMS, JNU, Delhi University, top universities, higher education India, engineering colleges, medical colleges, business schools",
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
    canonical: '/institution',
  },
  openGraph: {
    title: "Top Universities & Colleges in India | Laxmi Education",
    description: "Discover the best universities, colleges, and research institutes in India. Find detailed information about IITs, IIMs, AIIMS, and other premier educational institutions.",
    url: `${baseUrl}/institution`,
    siteName: 'Laxmi Education',
    images: [
      {
        url: '/assets/logo.png', // Using logo as fallback until og-institution.jpg is created
        width: 1200,
        height: 630,
        alt: 'Top Universities & Colleges in India - Laxmi Education',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Top Universities & Colleges in India | Laxmi Education",
    description: "Discover the best universities, colleges, and research institutes in India. Find detailed information about IITs, IIMs, AIIMS, and other premier educational institutions.",
    images: ['/assets/logo.png'], // Using logo as fallback until og-institution.jpg is created
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

export default function InstitutionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}


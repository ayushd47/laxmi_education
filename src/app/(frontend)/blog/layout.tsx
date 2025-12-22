import { Metadata } from 'next';
import { getBaseUrl } from '@/lib/metadata';

const baseUrl = getBaseUrl();

export const metadata: Metadata = {
  title: 'Blog - Study Abroad Tips & Test Preparation | Laxmi Education',
  description: 'Read our latest articles on study abroad, test preparation, university applications, and international education tips.',
  metadataBase: new URL(baseUrl),
  openGraph: {
    title: 'Blog - Study Abroad Tips & Test Preparation | Laxmi Education',
    description: 'Read our latest articles on study abroad, test preparation, university applications, and international education tips.',
    url: `${baseUrl}/blog`,
    siteName: 'Laxmi Education',
    images: [
      {
        url: '/assets/logo.png', // Using logo as fallback until og-image.jpg is created
        width: 1200,
        height: 630,
        alt: 'Laxmi Education Blog',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog - Study Abroad Tips & Test Preparation | Laxmi Education',
    description: 'Read our latest articles on study abroad, test preparation, university applications, and international education tips.',
    images: ['/assets/logo.png'],
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}



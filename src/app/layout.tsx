import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              "name": "Laxmi Education",
              "description": "Expert guidance for study abroad programs, test preparation, and university applications",
              "url": baseUrl,
              "logo": `${baseUrl}/assets/logo.png`,
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+977-1-5333088",
                "contactType": "customer service",
                "email": "collegeadmissionnp@gmail.com"
              },
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Kathmandu",
                "addressLocality": "Kathmandu",
                "addressRegion": "Bagmati",
                "postalCode": "44600",
                "addressCountry": "NP"
              },
              "sameAs": [
                "https://www.facebook.com/laxmieducation",
                "https://www.twitter.com/laxmieducation",
                "https://www.linkedin.com/company/laxmieducation"
              ],
              "offers": {
                "@type": "Offer",
                "name": "Free Educational Consultation",
                "description": "Get expert guidance for study abroad programs, test preparation, and university applications",
                "price": "0",
                "priceCurrency": "USD",
                "availability": "https://schema.org/InStock",
                "validFrom": "2025-01-01",
                "seller": {
                  "@type": "EducationalOrganization",
                  "name": "Laxmi Education"
                }
              }
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              "name": "Free Educational Consultation",
              "description": "Expert guidance for study abroad programs, test preparation (IELTS, TOEFL, GRE, GMAT), and university applications",
              "provider": {
                "@type": "EducationalOrganization",
                "name": "Laxmi Education",
                "url": baseUrl
              },
              "serviceType": "EducationalConsulting",
              "areaServed": "Nepal",
              "availableChannel": {
                "@type": "ServiceChannel",
                "serviceUrl": baseUrl,
                "serviceSmsNumber": "+977-1-5333088",
                "servicePhone": "+977-1-5333088"
              },
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD",
                "availability": "https://schema.org/InStock"
              }
            })
          }}
        />
      </head>
      <body
        className={`${inter.variable} antialiased bg-white`}
      >
        {children}
      </body>
    </html>
  );
}
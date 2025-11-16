import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us - Laxmi Education',
  description: 'Get in touch with our expert counselors for free consultation. Contact Laxmi Education for study abroad and test preparation guidance.',
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}



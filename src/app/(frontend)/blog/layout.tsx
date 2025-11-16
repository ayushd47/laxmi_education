import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog - Study Abroad Tips & Test Preparation | Laxmi Education',
  description: 'Read our latest articles on study abroad, test preparation, university applications, and international education tips.',
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}



'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname?.startsWith(path);
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Image
                src="/assets/logo.png"
                alt="Laxmi Education Logo"
                width={50}
                height={50}
                className="h-12 w-auto"
                priority
              />
              <span className="ml-3 text-2xl font-bold text-navbar-blue">
                Laxmi Education
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link
              href="/"
              className={`font-medium transition-colors duration-200 pb-1 ${
                isActive('/')
                  ? 'text-gray-900 border-b-2'
                  : 'text-gray-700'
              }`}
              style={isActive('/') ? { borderColor: '#E79B47' } : {}}
              onMouseEnter={(e) => !isActive('/') && (e.currentTarget.style.color = '#E79B47')}
              onMouseLeave={(e) => !isActive('/') && (e.currentTarget.style.color = '')}
            >
              Home
            </Link>
            <Link
              href="/about-us"
              className={`font-medium transition-colors duration-200 pb-1 ${
                isActive('/about-us')
                  ? 'text-gray-900 border-b-2'
                  : 'text-gray-700'
              }`}
              style={isActive('/about-us') ? { borderColor: '#E79B47' } : {}}
              onMouseEnter={(e) => !isActive('/about-us') && (e.currentTarget.style.color = '#E79B47')}
              onMouseLeave={(e) => !isActive('/about-us') && (e.currentTarget.style.color = '')}
            >
              About Us
            </Link>
            <Link
              href="/institution"
              className={`font-medium transition-colors duration-200 pb-1 ${
                isActive('/institution')
                  ? 'text-gray-900 border-b-2'
                  : 'text-gray-700'
              }`}
              style={isActive('/institution') ? { borderColor: '#E79B47' } : {}}
              onMouseEnter={(e) => !isActive('/institution') && (e.currentTarget.style.color = '#E79B47')}
              onMouseLeave={(e) => !isActive('/institution') && (e.currentTarget.style.color = '')}
            >
              Institutions
            </Link>
            <Link
              href="/blog"
              className={`font-medium transition-colors duration-200 pb-1 ${
                isActive('/blog')
                  ? 'text-gray-900 border-b-2'
                  : 'text-gray-700'
              }`}
              style={isActive('/blog') ? { borderColor: '#E79B47' } : {}}
              onMouseEnter={(e) => !isActive('/blog') && (e.currentTarget.style.color = '#E79B47')}
              onMouseLeave={(e) => !isActive('/blog') && (e.currentTarget.style.color = '')}
            >
              Blog
            </Link>
            <Link
              href="/contact-us"
              className={`font-medium transition-colors duration-200 pb-1 ${
                isActive('/contact-us')
                  ? 'text-gray-900 border-b-2'
                  : 'text-gray-700'
              }`}
              style={isActive('/contact-us') ? { borderColor: '#E79B47' } : {}}
              onMouseEnter={(e) => !isActive('/contact-us') && (e.currentTarget.style.color = '#E79B47')}
              onMouseLeave={(e) => !isActive('/contact-us') && (e.currentTarget.style.color = '')}
            >
              Contact
            </Link>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex">
            <Link
              href="/contact-us"
              className="text-white font-semibold px-6 py-2 rounded-lg transition-colors duration-200"
              style={{ backgroundColor: '#E79B47' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d68935'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#E79B47'}
            >
              Get Free Consultation
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-cta-red focus:outline-none focus:text-cta-red"
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <Link
                href="/"
                className="block px-3 py-2 text-gray-700 hover:text-cta-red font-medium transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/about-us"
                className="block px-3 py-2 text-gray-700 hover:text-cta-red font-medium transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
              <Link
                href="/institution"
                className="block px-3 py-2 text-gray-700 hover:text-cta-red font-medium transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Institutions
              </Link>
              <Link
                href="/blog"
                className="block px-3 py-2 text-gray-700 hover:text-cta-red font-medium transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
              <Link
                href="/contact-us"
                className="block px-3 py-2 text-gray-700 hover:text-cta-red font-medium transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="pt-4">
                <Link
                  href="/contact-us"
                  className="block w-full text-white font-semibold px-6 py-3 rounded-lg text-center transition-colors duration-200"
                  style={{ backgroundColor: '#E79B47' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d68935'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#E79B47'}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Get Free Consultation
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}


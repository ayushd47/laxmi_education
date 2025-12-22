import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white lec-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center">
              <Image
                src="/assets/logo.png"
                alt="Laxmi Education Logo"
                width={40}
                height={40}
                className="h-10 w-auto"
              />
              <span className="ml-2 text-xl font-bold text-gray-300">Laxmi Education</span>
            </div>
            <p className="text-white text-sm leading-relaxed" style={{color: 'white !important'}}>
              Your trusted partner for international education. We provide expert guidance for study abroad programs, test preparation, and university applications.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.014 5.367 18.647.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.718-1.297c-.875.807-2.026 1.297-3.323 1.297s-2.448-.49-3.323-1.297c-.807-.875-1.297-2.026-1.297-3.323s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about-us" className="text-white hover:text-yellow-400 transition-colors duration-200" style={{color: 'white !important'}}>
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/study-abroad" className="text-white hover:text-yellow-400 transition-colors duration-200" style={{color: 'white !important'}}>
                  Study Abroad
                </Link>
              </li>
              <li>
                <Link href="/test-preparation" className="text-white hover:text-yellow-400 transition-colors duration-200" style={{color: 'white !important'}}>
                  Test Preparation
                </Link>
              </li>
              <li>
                <Link href="/institution" className="text-white hover:text-yellow-400 transition-colors duration-200" style={{color: 'white !important'}}>
                  Institutions
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-white hover:text-yellow-400 transition-colors duration-200" style={{color: 'white !important'}}>
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Study Destinations */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Study Destinations</h3>
            <ul className="space-y-2">
              <li>
                <Link href="institution" className="text-white hover:text-yellow-400 transition-colors duration-200" style={{color: 'white !important'}}>
                  Study in India
                </Link>
              </li>
              <li>
                <Link href="institution" className="text-white hover:text-yellow-400 transition-colors duration-200" style={{color: 'white !important'}}>
                  Study in USA
                </Link>
              </li>
              <li>
                <Link href="institution" className="text-white hover:text-yellow-400 transition-colors duration-200" style={{color: 'white !important'}}>
                  Study in Canada
                </Link>
              </li>
              <li>
                <Link href="institutionk" className="text-white hover:text-yellow-400 transition-colors duration-200" style={{color: 'white !important'}}>
                  Study in UK
                </Link>
              </li>
              <li>
                <Link href="institution" className="text-white hover:text-yellow-400 transition-colors duration-200" style={{color: 'white !important'}}>
                  Study in Australia
                </Link>
              </li>
              <li>
                <Link href="institution" className="text-white hover:text-yellow-400 transition-colors duration-200" style={{color: 'white !important'}}>
                  Study in New Zealand
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <span className="text-cta-red mt-1">📞</span>
                <div>

                  <p className="text-white text-sm" style={{color: 'white !important'}}>Jhapa: 9804904835</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-cta-red mt-1">✉️</span>
                <p className="text-white text-sm" style={{color: 'white !important'}}>collegeadmissionnp@gmail.com</p>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-cta-red mt-1">📍</span>
                <p className="text-white text-sm" style={{color: 'white !important'}}>Kakarvitta, Nepal</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white text-sm" style={{color: 'white !important'}}>
              © 2024 Laxmi Education. All rights reserved.
            </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <Link href="/privacy-policy" className="text-white hover:text-yellow-400 text-sm transition-colors duration-200" style={{color: 'white !important'}}>
                  Privacy Policy
                </Link>
                <Link href="/terms-of-service" className="text-white hover:text-yellow-400 text-sm transition-colors duration-200" style={{color: 'white !important'}}>
                  Terms of Service
                </Link>
              </div>
            </div>
            <div className="text-center">
              <p className="text-white text-xs" style={{color: 'white !important'}}>
                Developed By Sanskriti Khanal
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}


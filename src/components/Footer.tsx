import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 lec-footer">
      {/* Decorative top border */}
      <div className="h-1 bg-gradient-to-r from-yellow-400 via-red-500 to-yellow-400"></div>
      
      {/* Main Footer Content */}
      <div className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat'
          }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Top Section - Brand and Description */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-white rounded-2xl p-4 shadow-xl border-2 border-yellow-400/20">
                <div className="w-16 h-16 flex items-center justify-center">
                  <Image 
                    src="/assets/logo.png" 
                    alt="Laxmi International Education Logo" 
                    width={64} 
                    height={64}
                    className="object-contain"
                    priority
                  />
                </div>
              </div>
            </div>
            <h2 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">Laxmi Education</h2>
            <p className="text-gray-100 text-lg max-w-3xl mx-auto leading-relaxed font-medium">
              Your trusted partner for international education. We provide expert guidance for study abroad programs, test preparation, and university applications.
            </p>
          </div>

          {/* Navigation Links Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* About Us */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white mb-6 relative">
                About Us
                <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-yellow-400 rounded-full"></div>
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/about-us" className="text-gray-200 hover:text-yellow-400 transition-colors duration-200 flex items-center group">
                    <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full mr-3 group-hover:scale-125 transition-transform"></span>
                    Our Story
                  </Link>
                </li>
                <li>
                  <Link href="/contact-us" className="text-gray-200 hover:text-yellow-400 transition-colors duration-200 flex items-center group">
                    <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full mr-3 group-hover:scale-125 transition-transform"></span>
                    Book an Appointment
                  </Link>
                </li>
                <li>
                  <Link href="/about-us" className="text-gray-200 hover:text-yellow-400 transition-colors duration-200 flex items-center group">
                    <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full mr-3 group-hover:scale-125 transition-transform"></span>
                    Achievements
                  </Link>
                </li>
                <li>
                  <Link href="/about-us" className="text-gray-200 hover:text-yellow-400 transition-colors duration-200 flex items-center group">
                    <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full mr-3 group-hover:scale-125 transition-transform"></span>
                    Testimonials
                  </Link>
                </li>
              </ul>
            </div>

            {/* Our Services */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white mb-6 relative">
                Our Services
                <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-yellow-400 rounded-full"></div>
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/study-abroad" className="text-gray-200 hover:text-yellow-400 transition-colors duration-200 flex items-center group">
                    <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full mr-3 group-hover:scale-125 transition-transform"></span>
                    Study Abroad
                  </Link>
                </li>
                <li>
                  <Link href="/test-preparation" className="text-gray-200 hover:text-yellow-400 transition-colors duration-200 flex items-center group">
                    <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full mr-3 group-hover:scale-125 transition-transform"></span>
                    Test Preparation
                  </Link>
                </li>
                <li>
                  <Link href="/study-abroad" className="text-gray-200 hover:text-yellow-400 transition-colors duration-200 flex items-center group">
                    <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full mr-3 group-hover:scale-125 transition-transform"></span>
                    Scholarship Guidance
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-gray-200 hover:text-yellow-400 transition-colors duration-200 flex items-center group">
                    <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full mr-3 group-hover:scale-125 transition-transform"></span>
                    Resources & Blog
                  </Link>
                </li>
              </ul>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white mb-6 relative">
                Quick Links
                <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-yellow-400 rounded-full"></div>
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/about-us" className="text-gray-200 hover:text-yellow-400 transition-colors duration-200 flex items-center group">
                    <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full mr-3 group-hover:scale-125 transition-transform"></span>
                    Meet the Experts
                  </Link>
                </li>
                <li>
                  <Link href="/contact-us" className="text-gray-200 hover:text-yellow-400 transition-colors duration-200 flex items-center group">
                    <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full mr-3 group-hover:scale-125 transition-transform"></span>
                    Career Opportunities
                  </Link>
                </li>
                <li>
                  <Link href="/contact-us" className="text-gray-200 hover:text-yellow-400 transition-colors duration-200 flex items-center group">
                    <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full mr-3 group-hover:scale-125 transition-transform"></span>
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link href="/contact-us" className="text-gray-200 hover:text-yellow-400 transition-colors duration-200 flex items-center group">
                    <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full mr-3 group-hover:scale-125 transition-transform"></span>
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white mb-6 relative">
                Get in Touch
                <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-yellow-400 rounded-full"></div>
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-5 h-5 mt-1">
                    <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-white font-semibold">Phone</p>
                    <p className="text-gray-100 text-sm">Kathmandu: 9816969646</p>
                    <p className="text-gray-100 text-sm">Jhapa: 9804904835</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-5 h-5 mt-1">
                    <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-white font-semibold">Email</p>
                    <p className="text-gray-100 text-sm">collegeadmissionnp@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-5 h-5 mt-1">
                    <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-white font-semibold">Location</p>
                    <p className="text-gray-100 text-sm">Kathmandu, Nepal</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Social Media Links */}
          <div className="border-t border-blue-800 pt-8 mb-8">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
              <div className="flex space-x-6">
                <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors duration-200">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors duration-200">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors duration-200">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors duration-200">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                </a>
              </div>
              
              <div className="text-center sm:text-right">
                <p className="text-white text-sm font-medium">Established 2020</p>
                <p className="text-gray-100 text-xs mt-1">Empowering Dreams, Building Futures</p>
              </div>
            </div>
          </div>

          {/* Bottom Copyright */}
          <div className="border-t border-blue-800 pt-6">
            <div className="flex flex-col space-y-3">
              <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
                <p className="text-gray-100 text-sm font-medium">
                  © 2024 Laxmi International Education. All rights reserved.
                </p>
                <div className="flex space-x-6 text-sm">
                  <Link href="/privacy" className="text-gray-200 hover:text-yellow-400 transition-colors duration-200">
                    Privacy Policy
                  </Link>
                  <Link href="/terms" className="text-gray-200 hover:text-yellow-400 transition-colors duration-200">
                    Terms of Service
                  </Link>
                  <Link href="/cookies" className="text-gray-200 hover:text-yellow-400 transition-colors duration-200">
                    Cookie Policy
                  </Link>
                </div>
              </div>
              <div className="text-center">
                <p className="text-gray-100 text-xs">
                  Developed By Sanskriti Khanal
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}


import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Counter } from './components/Counter';

export const metadata: Metadata = {
  title: 'About Us - Laxmi Education',
  description: 'Learn about Laxmi Education\'s mission, team, and commitment to helping students achieve their international education dreams.',
};

export default function AboutUs() {
  return (
    <div className="bg-white">
      {/* Breadcrumb Navigation */}
      <section className="bg-[#d3e0ea] py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center text-sm text-gray-700">
            <Link href="/" className="hover:text-royal-blue transition-colors">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-royal-blue font-medium">About Us</span>
          </div>
        </div>
      </section>

      {/* Hero Section - Who We Are */}
      <section className="relative pt-12 pb-20 md:pt-16 md:pb-24 lg:pt-20 lg:pb-32" style={{ backgroundColor: '#d3e0ea' }}>
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <div className="absolute top-10 left-10 w-16 h-16">
            <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-royal-blue">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
          </div>
          <div className="absolute top-20 right-20 w-12 h-12">
            <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-royal-blue">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
          </div>
          <div className="absolute bottom-20 left-1/4 w-10 h-10">
            <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-royal-blue">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left side - Text content */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-royal-blue leading-tight">
                  Who We Are
                </h1>
                <p className="text-lg md:text-xl text-royal-blue leading-relaxed font-medium">
                  Guiding students toward the right education journey in India
                </p>
              </div>
              
              {/* Our Story */}
              <div className="space-y-4 pt-6">
                <h2 className="text-2xl md:text-3xl font-bold text-royal-blue">Our Story</h2>
                <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                  Established in 2008, Laxmi Education has been a beacon for thousands of students seeking quality education guidance. With over 15 years of experience, we have been committed to investing in lasting partnerships and fostering relationships that help students achieve their academic dreams. Our journey has been marked by dedication, expertise, and an unwavering commitment to student success.
                </p>
                <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                  We understand that choosing the right educational path is one of the most important decisions a student can make. That's why we provide comprehensive guidance, from course selection to university applications, ensuring every student finds their perfect fit.
                </p>
              </div>
            </div>

            {/* Right side - Illustration */}
            <div className="relative h-full flex items-center justify-center">
              <div className="relative z-10 w-full">
                {/* Placeholder for students illustration - you'll need to add the actual image */}
                <div className="w-full h-auto bg-white rounded-lg shadow-lg p-8 flex items-center justify-center" style={{ minHeight: '400px' }}>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-4 mb-4">
                      {/* Student 1 */}
                      <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center">
                        <svg className="w-12 h-12 text-royal-blue" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                        </svg>
                      </div>
                      {/* Student 2 */}
                      <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center">
                        <svg className="w-12 h-12 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                        </svg>
                      </div>
                      {/* Student 3 */}
                      <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center">
                        <svg className="w-12 h-12 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                        </svg>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500">Students Illustration Placeholder</p>
                    <p className="text-xs text-gray-400 mt-2">Replace with actual illustration image</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
            {/* Mission */}
            <div className="space-y-4">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-8 h-8 text-royal-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-royal-blue">MISSION</h2>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed">
                Be India's leading education guide, empowering students to make informed decisions about their academic future.
              </p>
            </div>

            {/* Values */}
            <div className="space-y-4">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-8 h-8 text-royal-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-royal-blue">VALUES</h2>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed">
                Be helpful in leading education guidance, ensuring transparency, integrity, and excellence in every interaction.
              </p>
            </div>
          </div>

          {/* Four Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 - Expert Counselors */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-royal-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg font-bold text-royal-blue text-center mb-2">Expert Counselors</h3>
              <p className="text-sm text-gray-600 text-center leading-relaxed">Experienced professionals providing expert guidance</p>
              <div className="flex justify-center gap-1 mt-4">
                <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                <div className="w-2 h-2 rounded-full bg-gray-300"></div>
              </div>
            </div>

            {/* Card 2 - Expert Counselors (duplicate - adjust as needed) */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-royal-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg font-bold text-royal-blue text-center mb-2">Expert Counselors</h3>
              <p className="text-sm text-gray-600 text-center leading-relaxed">Experienced professionals, confident and dedicated service</p>
              <div className="flex justify-center gap-1 mt-4">
                <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                <div className="w-2 h-2 rounded-full bg-gray-300"></div>
              </div>
            </div>

            {/* Card 3 - Transparent Network */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-royal-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg font-bold text-royal-blue text-center mb-2">Transparent Network</h3>
              <p className="text-sm text-gray-600 text-center leading-relaxed">Clear processes and transparent guidelines</p>
              <div className="flex justify-center gap-1 mt-4">
                <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                <div className="w-2 h-2 rounded-full bg-gray-300"></div>
              </div>
            </div>

            {/* Card 4 - Strong Network */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-royal-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg font-bold text-royal-blue text-center mb-2">Strong Network</h3>
              <p className="text-sm text-gray-600 text-center leading-relaxed">Top universities and trusted partnerships</p>
              <div className="flex justify-center gap-1 mt-4">
                <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                <div className="w-2 h-2 rounded-full bg-gray-300"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-royal-blue mb-4">Why Choose Us</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1 - Team Member */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 bg-gray-200 rounded-full mb-4 flex items-center justify-center overflow-hidden">
                  <svg className="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-royal-blue mb-1">Ananya Singh</h3>
                <p className="text-sm text-gray-600 mb-4">Senior Counselor</p>
                <div className="flex justify-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                </div>
              </div>
            </div>

            {/* Card 2 - Statistic */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex flex-col items-center justify-center h-full">
                <div className="text-4xl md:text-5xl font-bold text-royal-blue mb-2">
                  <Counter end={1000} duration={2000} suffix="+" />
                </div>
                <p className="text-lg text-gray-700 font-medium">Students Guided</p>
                <div className="flex justify-center gap-1 mt-4">
                  <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                </div>
              </div>
            </div>

            {/* Card 3 - Statistic */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex flex-col items-center justify-center h-full">
                <div className="text-4xl md:text-5xl font-bold text-royal-blue mb-2">
                  <Counter end={500} duration={2000} suffix="+" />
                </div>
                <p className="text-lg text-gray-700 font-medium">Top Universities & Specialists</p>
                <div className="flex justify-center gap-1 mt-4">
                  <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                </div>
              </div>
            </div>

            {/* Card 4 - Statistic */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex flex-col items-center justify-center h-full">
                <div className="text-4xl md:text-5xl font-bold text-royal-blue mb-2">
                  <Counter end={15} duration={2000} suffix="+" />
                </div>
                <p className="text-lg text-gray-700 font-medium">Partner Experience</p>
                <div className="flex justify-center gap-1 mt-4">
                  <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                </div>
              </div>
            </div>

            {/* Card 5 - Team Member */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 bg-gray-200 rounded-full mb-4 flex items-center justify-center overflow-hidden">
                  <svg className="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-royal-blue mb-1">Manpa Contocis</h3>
                <p className="text-sm text-gray-600 mb-4">Senior Counselor</p>
                <div className="flex justify-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                </div>
              </div>
            </div>

            {/* Card 6 - Placeholder */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex flex-col items-center justify-center h-full">
                <div className="w-24 h-24 bg-gray-100 rounded-full mb-4 flex items-center justify-center">
                  <svg className="w-16 h-16 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
                <div className="flex justify-center gap-1 mt-4">
                  <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-Action Banner */}
      <section className="py-12 md:py-16" style={{ backgroundColor: '#E79B47' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight">
                Let Us Help You Shape the Free Academic Future
              </h2>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact-us"
                className="px-6 py-3 rounded-lg font-bold text-white border-2 border-white hover:bg-white hover:text-[#E79B47] transition-colors duration-200 text-center"
                style={{ backgroundColor: '#E79B47' }}
              >
                Book Free Consultation
              </Link>
              <Link
                href="/contact-us"
                className="px-6 py-3 rounded-lg font-bold border-2 border-white bg-white hover:bg-transparent hover:text-white transition-colors duration-200 text-center"
                style={{ color: '#E79B47' }}
              >
                Contact Our Team
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

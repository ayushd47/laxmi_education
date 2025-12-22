'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import TestimonialSection from '@/components/TestimonialSection';
import type { University } from '@/lib/types';

export default function Home() {
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [universities, setUniversities] = useState<University[]>([]);
  const [universitiesLoading, setUniversitiesLoading] = useState(true);
  const [universitiesError, setUniversitiesError] = useState<string | null>(null);

  // Fetch top institutions data (shared with Institution page)
  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        setUniversitiesLoading(true);
        setUniversitiesError(null);

        const response = await fetch('/api/colleges?public=true');
        if (!response.ok) {
          throw new Error('Failed to fetch universities');
        }

        const data = await response.json();
        setUniversities(data);
      } catch (err) {
        console.error('Error fetching universities for home page:', err);
        setUniversitiesError('Unable to load top institutions right now.');
      } finally {
        setUniversitiesLoading(false);
      }
    };

    fetchUniversities();
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedCourse && selectedCity) {
      setShowResults(true);
    }
  };
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 to-pink-50 pt-4 pb-12 md:pt-6 md:pb-16 lg:pt-8 lg:pb-24">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 right-10 md:top-20 md:right-20 w-20 h-20 md:w-32 md:h-32 bg-royal-blue rounded-full opacity-10"></div>
          <div className="absolute bottom-10 left-10 md:bottom-20 md:left-20 w-32 h-32 md:w-48 md:h-48 bg-cta-red rounded-full opacity-10"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 md:w-24 md:h-24 bg-pink-300 rounded-full opacity-20"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left side - Text content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Your Journey to Study in{' '}
                  <span className="text-cta-red">India</span> Begins Here
                </h1>
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                  Explore top universities, diverse cultures, and endless opportunities — we'll guide you every step of the way.
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                <Link
                  href="/contact-us"
                  className="bg-cta-red hover:bg-red-600 text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors duration-200"
                >
                  Our Package
                </Link>
                <div className="flex items-center space-x-2 text-cta-red">
                  <div className="w-8 h-8 bg-cta-red rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">🏆</span>
                  </div>
                  <span className="text-sm font-medium">Trusted by 1000+ Students</span>
                </div>
              </div>
            </div>

            {/* Right side - Hero image */}
            <div className="relative h-full flex items-center justify-center">
              <div className="relative z-10 w-full h-full">
                <Image
                  src="/hero-graduate.webp"
                  alt="Graduate student with certificate - Success in international education through Educo consultancy"
                  width={600}
                  height={900}
                  className="w-full h-full object-cover rounded-lg"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                  quality={90}
                />
              </div>
              
              {/* Decorative background shapes */}
              <div className="absolute top-4 left-4 w-24 h-24 bg-royal-blue rounded-full opacity-20 -z-10"></div>
              <div className="absolute bottom-4 right-4 w-32 h-32 bg-pink-300 rounded-full opacity-20 -z-10"></div>
              
              {/* Decorative lines */}
              <div className="absolute top-1/2 -left-6 w-12 h-0.5 bg-pink-300 transform -rotate-12"></div>
              <div className="absolute top-1/3 -right-6 w-8 h-0.5 bg-cta-red transform rotate-12"></div>
            </div>
          </div>
        </div>

        {/* Filter Form Overlay */}
        <div className="absolute bottom-0 left-0 right-0 z-20 transform translate-y-3/4">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100">
              <div className="text-center mb-6 md:mb-8">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-2">
                  Find Your Perfect Course & Institution
                </h2>
                <p className="text-sm md:text-base text-gray-600">
                  Discover the best educational opportunities tailored to your goals
                </p>
              </div>
              
              <form onSubmit={handleFormSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
                {/* Course Selection */}
                <div className="relative">
                  <select 
                    className="w-full px-3 md:px-4 py-3 md:py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue focus:border-transparent appearance-none bg-white text-gray-700 text-sm md:text-base"
                    required
                    value={selectedCourse}
                    onChange={(e) => setSelectedCourse(e.target.value)}
                  >
                    <option value="" disabled>Select Course</option>
                    <option value="engineering">Engineering</option>
                    <option value="medicine">Medicine</option>
                    <option value="management">Management</option>
                    <option value="arts">Arts & Humanities</option>
                    <option value="science">Science</option>
                    <option value="commerce">Commerce</option>
                    <option value="law">Law</option>
                    <option value="pharmacy">Pharmacy</option>
                    <option value="nursing">Nursing</option>
                    <option value="diploma">Diploma Courses</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="w-4 h-4 md:w-5 md:h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                {/* City Selection */}
                <div className="relative">
                  <select 
                    className="w-full px-3 md:px-4 py-3 md:py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue focus:border-transparent appearance-none bg-white text-gray-700 text-sm md:text-base"
                    required
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                  >
                    <option value="" disabled>Select City</option>
                    <option value="delhi">New Delhi</option>
                    <option value="mumbai">Mumbai</option>
                    <option value="bangalore">Bangalore</option>
                    <option value="chennai">Chennai</option>
                    <option value="kolkata">Kolkata</option>
                    <option value="pune">Pune</option>
                    <option value="hyderabad">Hyderabad</option>
                    <option value="ahmedabad">Ahmedabad</option>
                    <option value="jaipur">Jaipur</option>
                    <option value="lucknow">Lucknow</option>
                    <option value="kanpur">Kanpur</option>
                    <option value="nagpur">Nagpur</option>
                    <option value="indore">Indore</option>
                    <option value="kochi">Kochi</option>
                    <option value="coimbatore">Coimbatore</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="w-4 h-4 md:w-5 md:h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-cta-red hover:bg-red-600 text-white font-bold py-3 md:py-4 px-4 md:px-6 rounded-lg text-base md:text-lg transition-colors duration-200"
                >
                  Find Courses
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section (placeholder without dummy data) */}
      {showResults && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Your Search Results
              </h2>
              <p className="text-lg text-gray-600">
                Results for <span className="font-semibold text-cta-red">{selectedCourse}</span> in{" "}
                <span className="font-semibold text-cta-red">{selectedCity}</span> will appear here.
              </p>
            </div>
            <div className="text-center">
              <button
                onClick={() => setShowResults(false)}
                className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
              >
                New Search
              </button>
            </div>
          </div>
        </section>
      )}

      {/* About Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="order-1">
              <Image
                src="/assets/team.webp"
                alt="Laxmi Educational Consultancy professional team - Expert education consultants in Nepal with years of combined expertise in management, consulting, education, and training"
                width={600}
                height={400}
                className="w-full h-auto rounded-lg shadow-lg mt-12 md:mt-16 lg:mt-20"
                priority={false}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                quality={90}
              />
            </div>
            <div className="order-2">
              <h2 className="text-3xl md:text-4xl font-bold text-navbar-blue mb-4">
                Education Consultancy in Nepal
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                Laxmi Educational Consultancy consists of a dedicated team of professionals with years of combined expertise in management, consulting, education, and training who are committed to providing high-quality services.
              </p>
              <Link
                href="/about-us"
                className="inline-block bg-navbar-blue text-white font-semibold px-6 py-3 rounded-md hover:bg-blue-700 transition-colors duration-200"
              >
                Know More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-light-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-navbar-blue mb-4">Our Services</h2>
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
              At Laxmi Educational Consultancy (LEC), we are committed to guiding students toward the right academic path with trust, care, and expertise.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* 1. Educational Counseling */}
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200">
              <div className="text-4xl mb-4" aria-hidden>🎓</div>
              <h3 className="text-2xl font-bold text-navbar-blue mb-3">1. Educational Counseling</h3>
              <p className="text-gray-600 mb-3">Personalized guidance to help students choose the right course, university, and country.</p>
              <p className="text-gray-600">Expert advice for both Nepali and Non-Resident Nepali students.</p>
            </div>

            {/* 2. Admission Assistance */}
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200">
              <div className="text-4xl mb-4" aria-hidden>🏛️</div>
              <h3 className="text-2xl font-bold text-navbar-blue mb-3">2. Admission Assistance</h3>
              <p className="text-gray-600 mb-3">Complete support for hassle-free admissions in top universities and colleges in India and abroad.</p>
              <p className="text-gray-600">Assistance with documentation, application forms, and seat confirmation.</p>
            </div>

            {/* 3. Overseas Education Consulting */}
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200">
              <div className="text-4xl mb-4" aria-hidden>🌍</div>
              <h3 className="text-2xl font-bold text-navbar-blue mb-3">3. Overseas Education Consulting</h3>
              <p className="text-gray-600 mb-3">Professional consulting for students aiming to study in top-grade institutions worldwide.</p>
              <p className="text-gray-600">Special expertise in securing placements in renowned medical and professional colleges.</p>
            </div>

            {/* 4. Course Placement Support */}
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 md:col-span-2 lg:col-span-2">
              <div className="text-4xl mb-4" aria-hidden>📚</div>
              <h3 className="text-2xl font-bold text-navbar-blue mb-4">4. Course Placement Support</h3>
              <p className="text-gray-600 mb-4">We assist students in gaining admission to a wide range of disciplines, including:</p>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>BSc Nursing</li>
                <li>Pharmacy</li>
                <li>Engineering</li>
                <li>Allied Health Sciences</li>
                <li>Science & Paramedical</li>
                <li>Humanities & Social Science</li>
                <li>Commerce & Management</li>
              </ul>
            </div>

            {/* 5. Student-Centered Approach */}
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200">
              <div className="text-4xl mb-4" aria-hidden>🤝</div>
              <h3 className="text-2xl font-bold text-navbar-blue mb-3">5. Student-Centered Approach</h3>
              <p className="text-gray-600 mb-3">We focus on understanding each student’s interests, goals, and background to find the perfect fit.</p>
              <p className="text-gray-600">Our mission is to deliver better education opportunities with respect and integrity.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Top Courses */}
      <section className="py-24 bg-gradient-to-b from-white to-blue-50/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-royal-blue/10 text-royal-blue">
              ⭐ Student favorites
            </span>
            <h2 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">Top Courses</h2>
            <p className="mt-3 text-base md:text-lg text-gray-600 max-w-2xl mx-auto">Handpicked, high-placement programs students most often succeed in.</p>
          </div>
          
          {/* Top institutions pulled from Institution page data (first 5) */}
          <div className="min-h-[120px]">
            {universitiesLoading && (
              <div className="flex justify-center items-center py-8 text-gray-500 text-sm">
                Loading top institutions...
              </div>
            )}
            {!universitiesLoading && universitiesError && (
              <div className="flex justify-center items-center py-8 text-red-600 text-sm">
                {universitiesError}
              </div>
            )}
            {!universitiesLoading && !universitiesError && universities.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8">
                {universities.slice(0, 4).map((university) => (
                  <div
                    key={university.id}
                    className="group relative rounded-xl border border-gray-200 bg-white/90 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
                  >
                    {/* Image or fallback */}
                    {university.imageUrl ? (
                      <div className="w-full h-32 sm:h-36 md:h-40 bg-gray-200 overflow-hidden">
                        <img
                          src={university.imageUrl}
                          alt={university.name}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            const parent = target.parentElement;
                            if (parent) {
                              parent.className = 'w-full h-32 sm:h-36 md:h-40 bg-gradient-to-br from-royal-blue to-deep-red flex items-center justify-center';
                              parent.innerHTML = `<span class="text-white font-bold text-3xl">${university.name.charAt(0)}</span>`;
                            }
                          }}
                        />
                      </div>
                    ) : (
                      <div className="w-full h-32 sm:h-36 md:h-40 bg-gradient-to-br from-royal-blue to-deep-red flex items-center justify-center">
                        <span className="text-white font-bold text-3xl">
                          {university.name.charAt(0)}
                        </span>
                      </div>
                    )}
                    <div className="p-6 flex flex-col h-full">
                      <h3 className="text-lg font-semibold text-gray-900 leading-snug mb-2 line-clamp-2">
                        {university.name}
                      </h3>
                      {university.country && (
                        <p className="text-xs font-medium text-royal-blue mb-2">
                          {university.country}
                        </p>
                      )}
                      <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-4 flex-1">
                        {university.description}
                      </p>
                      <div className="mt-2 flex items-center justify-between text-sm">
                        <span className="inline-flex items-center text-royal-blue font-medium">
                          View details
                        </span>
                        <Link
                          href="/institution"
                          className="text-cta-red font-semibold hover:text-red-600"
                        >
                          Explore
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-10 text-center">
            <Link href="/institution" className="inline-flex items-center gap-2 rounded-lg bg-royal-blue px-5 py-3 text-white font-semibold hover:bg-blue-700 transition-colors">
              Browse all courses
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialSection />




    </div>
  );
}


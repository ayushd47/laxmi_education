'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import TestimonialSection from '@/components/TestimonialSection';
import type { University } from '@/lib/types';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage: string;
  publishedAt?: string;
}

export default function Home() {
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [universities, setUniversities] = useState<University[]>([]);
  const [universitiesLoading, setUniversitiesLoading] = useState(true);
  const [universitiesError, setUniversitiesError] = useState<string | null>(null);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [currentUniversityIndex, setCurrentUniversityIndex] = useState(0);
  
  // Extract unique values from universities
  const uniqueCountries = [...new Set(universities.map(uni => uni.country))].sort();
  const uniqueCities = [...new Set(universities.map(uni => uni.city))].sort();
  const uniquePrograms = [...new Set(universities.flatMap(uni => uni.programs))].sort();

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

  // Fetch blog posts
  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await fetch('/api/blogs?status=published');
        if (response.ok) {
          const data = await response.json();
          const sorted = data.sort((a: BlogPost, b: BlogPost) => {
            const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
            const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
            return dateB - dateA;
          });
          setBlogPosts(sorted.slice(0, 3));
        }
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      }
    };

    fetchBlogPosts();
  }, []);

  // Auto-rotate university carousel
  useEffect(() => {
    if (universities.length > 0) {
      const interval = setInterval(() => {
        setCurrentUniversityIndex((prev) => (prev + 1) % Math.min(universities.length, 3));
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [universities]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedCourse && selectedCity) {
      setShowResults(true);
    }
  };

  const nextUniversity = () => {
    setCurrentUniversityIndex((prev) => (prev + 1) % Math.min(universities.length, 3));
  };

  const prevUniversity = () => {
    setCurrentUniversityIndex((prev) => (prev - 1 + Math.min(universities.length, 3)) % Math.min(universities.length, 3));
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative pt-8 pb-20 md:pt-12 md:pb-24 lg:pt-16 lg:pb-32" style={{ backgroundColor: '#d3e0ea' }}>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left side - Text content */}
              <div className="space-y-6">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Your Journey to Study in{' '}
                  <span className="text-royal-blue">Starts Here</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                  Discover the best educational opportunities for your future
                </p>
              </div>
              
              {/* Search Form */}
              <form onSubmit={handleFormSubmit} className="space-y-4 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {/* Course Selection */}
                  <div className="relative">
                    <select
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue focus:border-transparent appearance-none bg-white text-gray-700 text-sm md:text-base"
                      value={selectedCourse}
                      onChange={(e) => setSelectedCourse(e.target.value)}
                    >
                      <option value="">Select Course</option>
                      {uniquePrograms.map((program) => (
                        <option key={program} value={program}>
                          {program}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>

                  {/* City Selection */}
                  <div className="relative">
                    <select
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue focus:border-transparent appearance-none bg-white text-gray-700 text-sm md:text-base"
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.target.value)}
                    >
                      <option value="">Select City</option>
                      {uniqueCities.map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    className="flex-1 text-white font-bold py-3 px-6 rounded-lg text-base md:text-lg transition-colors duration-200"
                    style={{ backgroundColor: '#E79B47' }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d68935'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#E79B47'}
                  >
                    Apply Now
                  </button>
                  <Link
                    href="/contact-us"
                    className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg text-base md:text-lg transition-colors duration-200 text-center"
                  >
                    Book Consultation
                  </Link>
              </div>
              </form>
            </div>

            {/* Right side - Banner image */}
            <div className="relative h-full flex items-center justify-center">
              <div className="relative z-10 w-full">
                <img
                  src="/assets/images/home_banner.webp"
                  alt="Students studying abroad - International education journey"
                  className="w-full h-auto object-contain rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-royal-blue mb-4">Why Choose Us</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {/* Admission - Highlighted Card */}
            <div className="bg-white p-6 rounded-lg shadow-lg transition-all duration-200 hover:shadow-xl">
              <div className="flex justify-center mb-4">
                <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-sm">
              <Image
                    src="/assets/icons/admission.png"
                    alt="Admission"
                    width={60}
                    height={60}
                    className="w-12 h-12 object-contain"
              />
            </div>
              </div>
              <h3 className="text-lg font-bold text-royal-blue text-center mb-2">Admission</h3>
              <p className="text-sm text-gray-600 text-center leading-relaxed">Expert guidance for university admissions</p>
            </div>

            {/* Test Prep */}
            <div className="bg-gray-100 p-6 rounded-lg transition-all duration-200 hover:bg-white hover:shadow-lg">
              <div className="flex justify-center mb-4">
                <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-sm">
                  <Image
                    src="/assets/icons/testprep.png"
                    alt="Test Prep"
                    width={60}
                    height={60}
                    className="w-12 h-12 object-contain"
                  />
          </div>
        </div>
              <h3 className="text-lg font-bold text-royal-blue text-center mb-2">Test Prep</h3>
              <p className="text-sm text-gray-600 text-center leading-relaxed">Comprehensive test preparation support</p>
            </div>

            {/* Visa */}
            <div className="bg-gray-100 p-6 rounded-lg transition-all duration-200 hover:bg-white hover:shadow-lg">
              <div className="flex justify-center mb-4">
                <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-sm">
                  <Image
                    src="/assets/icons/visasupport.png"
                    alt="Visa"
                    width={60}
                    height={60}
                    className="w-12 h-12 object-contain"
                  />
                </div>
              </div>
              <h3 className="text-lg font-bold text-royal-blue text-center mb-2">Visa</h3>
              <p className="text-sm text-gray-600 text-center leading-relaxed">Complete visa assistance and support</p>
            </div>

            {/* Scholarship */}
            <div className="bg-gray-100 p-6 rounded-lg transition-all duration-200 hover:bg-white hover:shadow-lg">
              <div className="flex justify-center mb-4">
                <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-sm">
                  <Image
                    src="/assets/icons/services.png"
                    alt="Scholarship"
                    width={60}
                    height={60}
                    className="w-12 h-12 object-contain"
                  />
                </div>
              </div>
              <h3 className="text-lg font-bold text-royal-blue text-center mb-2">Scholarship</h3>
              <p className="text-sm text-gray-600 text-center leading-relaxed">Scholarship opportunities and guidance</p>
            </div>

            {/* Partnership */}
            <div className="bg-gray-100 p-6 rounded-lg transition-all duration-200 hover:bg-white hover:shadow-lg">
              <div className="flex justify-center mb-4">
                <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-sm">
                  <Image
                    src="/assets/icons/services.png"
                    alt="Partnership"
                    width={60}
                    height={60}
                    className="w-12 h-12 object-contain"
                  />
                </div>
            </div>
              <h3 className="text-lg font-bold text-royal-blue text-center mb-2">Partnership</h3>
              <p className="text-sm text-gray-600 text-center leading-relaxed">Trusted partnerships with top institutions</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Simple 4-Step Process Section */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-royal-blue mb-4">Our Simple 4-Step Process</h2>
          </div>
          
          {/* Process Steps with Connecting Lines */}
          <div className="relative mb-8">
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
              {/* Step 1 */}
              <div className="flex flex-col items-center relative z-10">
                <div className="w-20 h-20 rounded-full bg-blue-100 border-2 border-blue-200 flex items-center justify-center mb-3">
                  <Image
                    src="/assets/icons/consultation.png"
                    alt="Free Consultation"
                    width={50}
                    height={50}
                    className="w-12 h-12 object-contain"
                  />
                </div>
                <h3 className="text-base font-bold text-royal-blue mb-1 text-center">Free Consultation</h3>
                <p className="text-xs text-gray-600 text-center max-w-[150px]">Get expert advice on your study abroad journey</p>
              </div>

              {/* Connecting Line 1 */}
              <div className="hidden md:block w-16 h-0.5 bg-gray-300 -mx-4"></div>

              {/* Step 2 */}
              <div className="flex flex-col items-center relative z-10">
                <div className="w-20 h-20 rounded-full bg-blue-100 border-2 border-blue-200 flex items-center justify-center mb-3">
                  <Image
                    src="/assets/icons/apllication&sop.png"
                    alt="Application & SOP/Docs"
                    width={50}
                    height={50}
                    className="w-12 h-12 object-contain"
                  />
                </div>
                <h3 className="text-base font-bold text-royal-blue mb-1 text-center">Application & SOP/Docs.</h3>
                <p className="text-xs text-gray-600 text-center max-w-[150px]">Complete application and document preparation</p>
              </div>

              {/* Connecting Line 2 */}
              <div className="hidden md:block w-16 h-0.5 bg-gray-300 -mx-4"></div>

              {/* Step 3 */}
              <div className="flex flex-col items-center relative z-10">
                <div className="w-20 h-20 rounded-full bg-blue-100 border-2 border-blue-200 flex items-center justify-center mb-3">
                  <Image
                    src="/assets/icons/visasupport.png"
                    alt="Visa Support & Arrival"
                    width={50}
                    height={50}
                    className="w-12 h-12 object-contain"
                  />
                </div>
                <h3 className="text-base font-bold text-royal-blue mb-1 text-center">Visa Support & Arrival</h3>
                <p className="text-xs text-gray-600 text-center max-w-[150px]">Visa processing and arrival assistance</p>
              </div>

              {/* Connecting Line 3 */}
              <div className="hidden md:block w-16 h-0.5 bg-gray-300 -mx-4"></div>

              {/* Step 4 */}
              <div className="flex flex-col items-center relative z-10">
                <div className="w-20 h-20 rounded-full bg-blue-100 border-2 border-blue-200 flex items-center justify-center mb-3">
                  <Image
                    src="/assets/icons/services.png"
                    alt="Ongoing Support"
                    width={50}
                    height={50}
                    className="w-12 h-12 object-contain"
                  />
                </div>
                <h3 className="text-base font-bold text-royal-blue mb-1 text-center">Ongoing Support</h3>
                <p className="text-xs text-gray-600 text-center max-w-[150px]">Continuous support throughout your journey</p>
              </div>

              {/* Arrow pointing to university carousel - positioned to the right */}
              <div className="hidden md:flex items-center justify-center ml-4 -mt-4">
                <Image
                  src="/assets/images/arrow.png"
                  alt="Arrow pointing to universities"
                  width={120}
                  height={80}
                  className="w-32 h-20 object-contain"
                />
              </div>
            </div>
          </div>

          {/* University Carousel */}
          {!universitiesLoading && universities.length > 0 && (
            <div className="relative">
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={prevUniversity}
                  className="absolute left-0 z-10 bg-gray-200 rounded-full p-3 shadow-md hover:bg-gray-300 transition-colors"
                  aria-label="Previous university"
                >
                  <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full px-16">
                  {universities.slice(currentUniversityIndex, currentUniversityIndex + 3).map((university) => (
                  <div
                    key={university.id}
                      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
                  >
                    {university.imageUrl ? (
                        <div className="w-full h-48 bg-gray-200 overflow-hidden relative">
                        <img
                          src={university.imageUrl}
                          alt={university.name}
                            className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                          }}
                        />
                      </div>
                    ) : (
                        <div className="w-full h-48 bg-gradient-to-br from-royal-blue to-deep-red flex items-center justify-center">
                        <span className="text-white font-bold text-3xl">
                          {university.name.charAt(0)}
                        </span>
                      </div>
                    )}
                      <div className="p-5">
                        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                        {university.name}
                      </h3>
                      {university.country && (
                          <p className="text-sm font-medium text-blue-400">
                          {university.country}
                        </p>
                      )}
                      </div>
                    </div>
                  ))}
                  </div>

                <button
                  onClick={nextUniversity}
                  className="absolute right-0 z-10 bg-gray-200 rounded-full p-3 shadow-md hover:bg-gray-300 transition-colors"
                  aria-label="Next university"
                >
                  <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              </div>
            )}
        </div>
      </section>

      {/* Testimonials Section with Banner */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-royal-blue mb-4">Our Student Testimonials</h2>
          </div>

          {/* Consultation Banner with Overlapping Testimonial Card */}
          <div className="relative mb-12">
            <div className="rounded-lg shadow-lg p-6 md:p-8 flex items-center" style={{ backgroundColor: '#E79B47' }}>
              <h3 className="text-xl md:text-2xl font-bold text-white text-center md:text-left w-full">
                Ready To Start? Get Your Free Consultation Today!
              </h3>
            </div>
            
            {/* Static Testimonial Card - Overlapping on the right */}
            <div className="absolute top-0 right-0 md:right-8 -mt-4 md:-mt-8 z-10">
              <div className="bg-gray-50 rounded-lg shadow-2xl p-6 w-96 border border-gray-200">
                <div className="flex items-start gap-4 mb-4">
                  {/* Profile Picture */}
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-full overflow-hidden bg-white">
                      <Image
                        src="https://i.pravatar.cc/150?img=68"
                        alt="Student testimonial"
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  {/* Quote */}
                  <div className="flex-1">
                    <p className="text-gray-700 text-sm leading-relaxed italic">
                      "Your guidance helped me achieve my dream of studying abroad. The entire process was smooth and professional."
                    </p>
                  </div>
                </div>
                {/* Get Started Now Button */}
                <div className="mb-4">
                  <Link
                    href="/contact-us"
                    className="text-white font-bold py-2.5 px-6 rounded-lg text-sm transition-colors duration-200 inline-block w-full text-center"
                    style={{ backgroundColor: '#E79B47' }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d68935'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#E79B47'}
                  >
                    Get Started Now
            </Link>
                </div>
                {/* Pagination Dots */}
                <div className="flex justify-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonials */}
          <TestimonialSection hideTitle={true} hideCTA={true} />
        </div>
      </section>

      {/* Latest Blog & Insights Section */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-royal-blue mb-4">Latest Blog & Insights</h2>
          </div>

          {blogPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {blogPosts.map((post) => (
                <article key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="h-48 relative overflow-hidden bg-gradient-to-br from-blue-500 to-blue-700">
                    {post.featuredImage && post.featuredImage !== '/blog/default.jpg' ? (
                      <img
                        src={post.featuredImage}
                        alt={post.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-white text-5xl">📚</span>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 leading-tight">
                      {post.title}
                    </h3>
                    <p className="text-gray-700 mb-4 line-clamp-3 leading-relaxed text-sm">
                      {post.excerpt}
                    </p>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="font-semibold transition-colors duration-200 flex items-center gap-1 text-sm"
                      style={{ color: '#E79B47' }}
                      onMouseEnter={(e) => e.currentTarget.style.color = '#d68935'}
                      onMouseLeave={(e) => e.currentTarget.style.color = '#E79B47'}
                    >
                      Read More
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">No blog posts available at the moment. Check back soon!</p>
            </div>
          )}
        </div>
      </section>




    </div>
  );
}


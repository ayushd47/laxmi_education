'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { University } from '@/lib/types';

export default function InstitutionPage() {
  const [universities, setUniversities] = useState<University[]>([]);
  const [filteredUniversities, setFilteredUniversities] = useState<University[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Filter states
  const [universityName, setUniversityName] = useState('');
  const [courseLevel, setCourseLevel] = useState('');
  const [stream, setStream] = useState('');
  const [location, setLocation] = useState('');
  
  // Carousel state
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  
  // Modal state
  const [selectedUniversity, setSelectedUniversity] = useState<University | null>(null);

  // Fetch data from the API route
  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch('/api/colleges?public=true');
        if (!response.ok) {
          throw new Error('Failed to fetch universities');
        }
        
        const data = await response.json();
        setUniversities(data);
        setFilteredUniversities(data);
      } catch (err) {
        setError('Failed to fetch universities data');
        console.error('Error fetching universities:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUniversities();
  }, []);

  // Apply filters
  const applyFilters = () => {
    let filtered = universities.filter(university => {
      const matchesName = !universityName || 
        university.name.toLowerCase().includes(universityName.toLowerCase());
      const matchesLevel = !courseLevel || courseLevel === 'all' || 
        (courseLevel === 'UG' && university.programs.some(p => p.toLowerCase().includes('undergraduate') || p.toLowerCase().includes('bachelor'))) ||
        (courseLevel === 'PG' && university.programs.some(p => p.toLowerCase().includes('graduate') || p.toLowerCase().includes('master')));
      const matchesStream = !stream || stream === 'all' || 
        university.programs.some(p => p.toLowerCase().includes(stream.toLowerCase()));
      const matchesLocation = !location || location === 'all' || 
        university.city.toLowerCase().includes(location.toLowerCase()) ||
        university.country.toLowerCase().includes(location.toLowerCase());
      
      return matchesName && matchesLevel && matchesStream && matchesLocation;
    });

    setFilteredUniversities(filtered);
    setCurrentIndex(0);
  };

  // Get unique values for dropdowns
  const uniqueStreams = Array.from(new Set(
    universities.flatMap(uni => uni.programs)
  )).filter(Boolean).slice(0, 10);

  const uniqueLocations = Array.from(new Set(
    universities.map(uni => `${uni.city}, ${uni.country}`)
  )).sort();

  // Carousel navigation
  const nextSlide = () => {
    if (filteredUniversities.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % Math.ceil(filteredUniversities.length / 3));
  };

  const prevSlide = () => {
    if (filteredUniversities.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + Math.ceil(filteredUniversities.length / 3)) % Math.ceil(filteredUniversities.length / 3));
  };

  // Get visible universities for carousel
  const getVisibleUniversities = () => {
    const start = currentIndex * 3;
    return filteredUniversities.slice(start, start + 3);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-royal-blue mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading universities...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-red-600 text-xl mb-4">⚠️</div>
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
                Explore Partner Universities in India
              </h1>
              <p className="text-xl text-gray-600 mb-4">
                Discover top institutions across India
              </p>
              <nav className="flex items-center text-sm text-gray-500">
                <Link href="/" className="hover:text-royal-blue transition-colors">
                  Home
                </Link>
                <span className="mx-2">/</span>
                <span className="text-gray-900 font-medium">Universities</span>
              </nav>
            </div>
            <div className="hidden lg:block">
              <div className="relative w-64 h-64">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-48 h-48 text-blue-200" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label htmlFor="university-name" className="block text-sm font-medium text-gray-700 mb-2">
                University name
              </label>
              <input
                type="text"
                id="university-name"
                value={universityName}
                onChange={(e) => setUniversityName(e.target.value)}
                placeholder="Search university..."
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-royal-blue focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="course-level" className="block text-sm font-medium text-gray-700 mb-2">
                Course Level (UG/PG)
              </label>
              <select
                id="course-level"
                value={courseLevel}
                onChange={(e) => setCourseLevel(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-royal-blue focus:border-transparent bg-white"
              >
                <option value="">All Levels</option>
                <option value="UG">Undergraduate (UG)</option>
                <option value="PG">Postgraduate (PG)</option>
              </select>
            </div>

            <div>
              <label htmlFor="stream" className="block text-sm font-medium text-gray-700 mb-2">
                Stream
              </label>
              <select
                id="stream"
                value={stream}
                onChange={(e) => setStream(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-royal-blue focus:border-transparent bg-white"
              >
                <option value="">All Streams</option>
                {uniqueStreams.map((s, idx) => (
                  <option key={idx} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <select
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-royal-blue focus:border-transparent bg-white"
              >
                <option value="">All Locations</option>
                {uniqueLocations.map((loc, idx) => (
                  <option key={idx} value={loc}>{loc}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={applyFilters}
              className="px-8 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              Apply Filters
            </button>
          </div>

          {filteredUniversities.length > 0 && (
            <div className="mt-4 text-sm text-gray-600">
              Showing {filteredUniversities.length} of {universities.length} universities
            </div>
          )}
        </div>
      </div>

      {/* University Carousel Section */}
      {filteredUniversities.length > 0 ? (
        <div className="bg-gray-50 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative">
              {/* Carousel Container */}
              <div className="relative overflow-hidden">
                <div 
                  ref={carouselRef}
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                  {Array.from({ length: Math.ceil(filteredUniversities.length / 3) }).map((_, slideIndex) => (
                    <div key={slideIndex} className="min-w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-2">
                      {filteredUniversities.slice(slideIndex * 3, slideIndex * 3 + 3).map((university) => (
                        <div
                          key={university.id}
                          className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer"
                          onClick={() => setSelectedUniversity(university)}
                        >
                          {/* Image */}
                          <div className="relative h-48 bg-gray-200 overflow-hidden">
                            {university.imageUrl ? (
                              <img
                                src={university.imageUrl}
                                alt={university.name}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.style.display = 'none';
                                }}
                              />
                            ) : (
                              <div className="w-full h-full bg-gradient-to-br from-royal-blue to-blue-600 flex items-center justify-center">
                                <span className="text-white font-bold text-4xl">
                                  {university.name.charAt(0)}
                                </span>
                              </div>
                            )}
                            <div className="absolute top-3 left-3 bg-white rounded-full p-1.5 shadow-md">
                              <svg className="w-5 h-5 text-royal-blue" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M3.5 2.75a.75.75 0 00-1.5 0v14.5a.75.75 0 001.5 0v-4.392l1.657-.348a6.449 6.449 0 014.271.572 7.948 7.948 0 005.965.524l2.078-.64A.75.75 0 0018 12.25v-8.5a.75.75 0 00-.904-.734l-2.38.501a7.25 7.25 0 01-4.186-.363l-.502-.2a8.75 8.75 0 00-5.053-.439l-1.475.31V2.75z" clipRule="evenodd" />
                              </svg>
                            </div>
                          </div>

                          {/* Content */}
                          <div className="p-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                              {university.name}
                            </h3>
                            
                            <div className="flex flex-wrap gap-2 mb-4">
                              {university.ranking && (
                                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
                                  NIRF Top {university.ranking}
                                </span>
                              )}
                              {university.type === 'public' && (
                                <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                                  UGC Approved
                                </span>
                              )}
                            </div>

                            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                              {university.description || `${university.name} offers quality education in ${university.city}, ${university.country}.`}
                            </p>

                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedUniversity(university);
                              }}
                              className="w-full px-4 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors duration-200"
                            >
                              View University
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Arrows */}
              {filteredUniversities.length > 3 && (
                <>
                  <button
                    onClick={prevSlide}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-shadow z-10 border border-gray-200"
                    aria-label="Previous"
                  >
                    <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={nextSlide}
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-shadow z-10 border border-gray-200"
                    aria-label="Next"
                  >
                    <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-gray-50 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No universities found</h3>
              <p className="text-gray-500">Try adjusting your search criteria</p>
            </div>
          </div>
        </div>
      )}

      {/* Admission by Location Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
            Your Admission by Location
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Delhi */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center justify-center w-16 h-16 bg-white rounded-full mb-4 mx-auto">
                <svg className="w-8 h-8 text-royal-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">Delhi</h3>
              <p className="text-gray-600 text-center">
                {universities.filter(u => u.city.toLowerCase().includes('delhi')).length}+ Universities
              </p>
            </div>

            {/* Mumbai */}
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center justify-center w-16 h-16 bg-white rounded-full mb-4 mx-auto">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">Mumbai</h3>
              <p className="text-gray-600 text-center">
                {universities.filter(u => u.city.toLowerCase().includes('mumbai')).length}+ Universities
              </p>
            </div>

            {/* Document Verification */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center justify-center w-16 h-16 bg-white rounded-full mb-4 mx-auto">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">Document Verification</h3>
              <p className="text-gray-600 text-center text-sm">
                Scholarship & Travel Aid
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Support System Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
              Your Admission Support System
            </h2>
            <p className="text-xl text-gray-600 mb-8 text-center">
              Not Sure Which University Is Right for You?
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
              <div className="flex flex-col items-center">
                <div className="bg-blue-50 rounded-lg p-4 mb-2">
                  <span className="text-2xl font-bold text-royal-blue">AICTE</span>
                </div>
                <p className="text-sm text-gray-600">Approved</p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="bg-green-50 rounded-lg p-4 mb-2">
                  <span className="text-2xl font-bold text-green-700">UGC</span>
                </div>
                <p className="text-sm text-gray-600">Recognized</p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="bg-purple-50 rounded-lg p-4 mb-2">
                  <span className="text-2xl font-bold text-purple-700">NAAC</span>
                </div>
                <p className="text-sm text-gray-600">Accredited</p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="bg-orange-50 rounded-lg p-4 mb-2">
                  <span className="text-2xl font-bold text-orange-700">NIRF</span>
                </div>
                <p className="text-sm text-gray-600">Ranked</p>
              </div>
            </div>

            <div className="mt-12 text-center">
              <Link
                href="/contact-us"
                className="inline-flex items-center px-8 py-3 bg-royal-blue hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
              >
                Get Free Consultation
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* University Details Modal */}
      {selectedUniversity && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" 
          onClick={() => setSelectedUniversity(null)}
        >
          <div 
            className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto" 
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image */}
            {selectedUniversity.imageUrl ? (
              <div className="w-full h-64 bg-gray-200 overflow-hidden">
                <img 
                  src={selectedUniversity.imageUrl} 
                  alt={selectedUniversity.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.parentElement!.className = 'w-full h-64 bg-gradient-to-br from-royal-blue to-blue-600 flex items-center justify-center';
                    target.parentElement!.innerHTML = `<span class="text-white font-bold text-5xl">${selectedUniversity.name.charAt(0)}</span>`;
                  }}
                />
              </div>
            ) : (
              <div className="w-full h-64 bg-gradient-to-br from-royal-blue to-blue-600 flex items-center justify-center">
                <span className="text-white font-bold text-5xl">
                  {selectedUniversity.name.charAt(0)}
                </span>
              </div>
            )}
            
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    {selectedUniversity.name}
                  </h2>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                      {selectedUniversity.city}, {selectedUniversity.country}
                    </span>
                    {selectedUniversity.ranking && (
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                        NIRF Rank: {selectedUniversity.ranking}
                      </span>
                    )}
                    {selectedUniversity.type && (
                      <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                        {selectedUniversity.type === 'public' ? 'Public' : 'Private'}
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => setSelectedUniversity(null)}
                  className="text-gray-400 hover:text-gray-600 text-3xl leading-none"
                >
                  ×
                </button>
              </div>

              {/* Details */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4 text-gray-900">About</h3>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {selectedUniversity.description || `Located in ${selectedUniversity.city}, ${selectedUniversity.country}, ${selectedUniversity.name} is a premier educational institution offering quality education.`}
                </p>
              </div>

              {selectedUniversity.programs && selectedUniversity.programs.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-4 text-gray-900">Programs Offered</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedUniversity.programs.map((program, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                      >
                        {program}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-4 pt-6 border-t border-gray-200">
                {selectedUniversity.website && (
                  <a
                    href={selectedUniversity.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center px-6 py-3 bg-royal-blue text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Visit Website
                  </a>
                )}
                <Link
                  href="/contact-us"
                  className="flex-1 text-center px-6 py-3 border border-royal-blue text-royal-blue rounded-lg hover:bg-royal-blue hover:text-white transition-colors font-medium"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

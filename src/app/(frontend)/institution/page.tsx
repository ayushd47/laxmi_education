'use client';

import { useState, useEffect } from 'react';
import InstitutionCard from '@/components/InstitutionCard';
import { University } from '@/lib/types';

export default function InstitutionPage() {
  const [universities, setUniversities] = useState<University[]>([]);
  const [filteredUniversities, setFilteredUniversities] = useState<University[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [sortBy, setSortBy] = useState('name');
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

  // Filter and sort universities
  useEffect(() => {
    let filtered = universities.filter(university => {
      const matchesSearch = university.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           university.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = selectedType === 'all' || university.type === selectedType;
      const matchesCountry = selectedCountry === 'all' || university.country === selectedCountry;
      
      return matchesSearch && matchesType && matchesCountry;
    });

    // Sort universities
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    setFilteredUniversities(filtered);
  }, [universities, searchTerm, selectedType, selectedCountry, sortBy]);

  const uniqueTypes = Array.from(new Set(universities.map(uni => uni.type)));
  const uniqueCountries = Array.from(new Set(universities.map(uni => uni.country)));

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
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-royal-blue to-deep-red text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Top Universities & Colleges Worldwide
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-100">
              Discover the best educational institutions across the globe
            </p>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 max-w-4xl mx-auto">
              <p className="text-lg">
                Explore our comprehensive list of top universities, colleges, and research institutes worldwide. 
                Find the perfect institution for your academic journey.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-white shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                Search Universities
              </label>
              <input
                type="text"
                id="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name or details..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-royal-blue focus:border-transparent"
              />
            </div>

            {/* Type Filter */}
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
                University Type
              </label>
              <select
                id="type"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-royal-blue focus:border-transparent"
              >
                <option value="all">All Types</option>
                {uniqueTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* Country Filter */}
            <div>
              <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
                Country
              </label>
              <select
                id="country"
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-royal-blue focus:border-transparent"
              >
                <option value="all">All Countries</option>
                {uniqueCountries.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div>
              <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-2">
                Sort By
              </label>
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-royal-blue focus:border-transparent"
              >
                <option value="name">Name</option>
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredUniversities.length} of {universities.length} universities
          </div>
        </div>
      </div>

      {/* Universities Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {filteredUniversities.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No universities found</h3>
            <p className="text-gray-500">Try adjusting your search criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredUniversities.map((university) => (
              <div 
                key={university.id} 
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
              >
                {/* Image */}
                {university.imageUrl ? (
                  <div className="w-full h-48 bg-gray-200 overflow-hidden">
                    <img 
                      src={university.imageUrl} 
                      alt={university.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        target.parentElement!.className = 'w-full h-48 bg-gradient-to-br from-royal-blue to-deep-red flex items-center justify-center';
                        target.parentElement!.innerHTML = `<span class="text-white font-bold text-2xl">${university.name.charAt(0)}</span>`;
                      }}
                    />
                  </div>
                ) : (
                  <div className="w-full h-48 bg-gradient-to-br from-royal-blue to-deep-red flex items-center justify-center">
                    <span className="text-white font-bold text-4xl">
                      {university.name.charAt(0)}
                    </span>
                  </div>
                )}
                
                <div className="p-6">
                  {/* Title */}
                  <h3 
                    className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 cursor-pointer hover:text-royal-blue transition-colors"
                    onClick={() => setSelectedUniversity(university)}
                  >
                    {university.name}
                  </h3>
                  
                  {/* Details */}
                  <p className="text-gray-600 text-sm mb-3 line-clamp-4">
                    {university.description}
                  </p>
                  
                  {/* Read More Link */}
                  {university.description && university.description.length > 150 && (
                    <button
                      onClick={() => setSelectedUniversity(university)}
                      className="text-royal-blue hover:text-blue-700 text-sm font-medium mb-4 transition-colors"
                    >
                      Read More →
                    </button>
                  )}
                  
                  {/* Actions */}
                  <div className="flex gap-3 pt-4 border-t border-gray-200">
                    {university.website && (
                      <a
                        href={university.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 text-center px-4 py-2 bg-royal-blue text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Visit Website
                      </a>
                    )}
                    <button
                      onClick={() => setSelectedUniversity(university)}
                      className="flex-1 px-4 py-2 border border-royal-blue text-royal-blue rounded-md hover:bg-royal-blue hover:text-white transition-colors text-sm font-medium"
                    >
                      Contact
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* University Details Modal */}
      {selectedUniversity && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={() => setSelectedUniversity(null)}>
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
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
                    target.parentElement!.className = 'w-full h-64 bg-gradient-to-br from-royal-blue to-deep-red flex items-center justify-center';
                    target.parentElement!.innerHTML = `<span class="text-white font-bold text-5xl">${selectedUniversity.name.charAt(0)}</span>`;
                  }}
                />
              </div>
            ) : (
              <div className="w-full h-64 bg-gradient-to-br from-royal-blue to-deep-red flex items-center justify-center">
                <span className="text-white font-bold text-5xl">
                  {selectedUniversity.name.charAt(0)}
                </span>
              </div>
            )}
            
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div className="flex-1">
                  {/* Title */}
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    {selectedUniversity.name}
                  </h2>
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
                <h3 className="text-xl font-semibold mb-4 text-gray-900">Details</h3>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {selectedUniversity.description}
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-4 pt-6 border-t border-gray-200">
                {selectedUniversity.website && (
                  <a
                    href={selectedUniversity.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center px-6 py-3 bg-royal-blue text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
                  >
                    Visit Website
                  </a>
                )}
                <a
                  href="/contact-us"
                  className="flex-1 text-center px-6 py-3 border border-royal-blue text-royal-blue rounded-md hover:bg-royal-blue hover:text-white transition-colors font-medium"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-royal-blue to-deep-red text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Need Help Choosing the Right University?
          </h2>
          <p className="text-xl mb-8 text-gray-100">
            Our expert counselors can help you find the perfect university for your academic goals.
          </p>
          <a
            href="/contact-us"
            className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-royal-blue bg-white hover:bg-gray-100 transition-colors duration-200"
          >
            Get Free Consultation
          </a>
        </div>
      </div>
    </div>
  );
}

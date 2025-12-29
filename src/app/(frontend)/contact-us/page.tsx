'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage: string;
  publishedAt?: string;
}

export default function ContactUs() {
  const [formData, setFormData] = useState({
    fullName: '',
    courseLevel: '',
    cityUniversity: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/enquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.fullName,
          email: '',
          phone: '',
          phoneCountryCode: '+977',
          nearestOffice: 'Kathmandu',
          message: formData.message
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit enquiry');
      }

      // Reset form
      setFormData({
        fullName: '',
        courseLevel: '',
        cityUniversity: '',
        message: ''
      });
      alert('Thank you! Your consultation request has been submitted.');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white">
      {/* Breadcrumbs */}
      <section className="bg-[#d3e0ea] py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center text-sm text-gray-700">
            <Link href="/" className="hover:text-royal-blue transition-colors">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-royal-blue font-medium">Contact / Consultation</span>
          </div>
        </div>
      </section>

      {/* Hero Section with Form */}
      <section className="relative py-12 md:py-20" style={{ backgroundColor: '#d3e0ea' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left Side - Title and Description */}
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-royal-blue leading-tight">
                Get Free Study in India Consultation
              </h1>
              <p className="text-lg text-gray-700">
                Talk to our experts and get personalized guidance for your study journey
              </p>

              {/* Free No-Obligation Section */}
              <div className="mt-8 space-y-3">
                <h3 className="text-xl font-semibold text-royal-blue">Free No-Obligation</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <svg className="w-6 h-6 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Free, No Obligation</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-6 h-6 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">For Personalized Guidance</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-6 h-6 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Expert Guidance</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Illustration and Form */}
            <div className="relative">
              {/* Student Illustration */}
              <div className="hidden lg:block absolute -right-12 -top-12 w-96 h-96 z-0">
                <div className="relative w-full h-full">
                  <img
                    src="/assets/images/blog_banner.png"
                    alt="Students illustration"
                    className="w-full h-full object-contain opacity-30"
                    onError={(e) => {
                      // Hide image on error
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                </div>
              </div>

              {/* Consultation Form */}
              <div className="bg-white rounded-xl shadow-xl p-6 md:p-8 relative z-10">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue focus:border-transparent"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label htmlFor="courseLevel" className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Course Level
                    </label>
                    <select
                      id="courseLevel"
                      name="courseLevel"
                      value={formData.courseLevel}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue focus:border-transparent"
                    >
                      <option value="">Select Course Level</option>
                      <option value="undergraduate">Undergraduate</option>
                      <option value="graduate">Graduate</option>
                      <option value="postgraduate">Postgraduate</option>
                      <option value="diploma">Diploma</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="cityUniversity" className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred City / University
                    </label>
                    <input
                      type="text"
                      id="cityUniversity"
                      name="cityUniversity"
                      value={formData.cityUniversity}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue focus:border-transparent"
                      placeholder="Enter city or university"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message / Query
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue focus:border-transparent"
                      placeholder="Tell us about your query..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ backgroundColor: '#E79B47' }}
                  >
                    {isSubmitting ? 'Submitting...' : 'Book Free Consultation'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Methods Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-royal-blue mb-8 text-center">
            Contact Methods
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Location Card */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
              <div className="h-48 bg-gray-100 flex items-center justify-center">
                <div className="text-center">
                  <div className="relative inline-block mb-3">
                    {/* Location Pin with Target */}
                    <svg className="w-20 h-20 text-royal-blue" viewBox="0 0 24 24" fill="none">
                      {/* Outer location pin */}
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="currentColor"/>
                      {/* Target circles inside */}
                      <circle cx="12" cy="9" r="6" stroke="white" strokeWidth="1.5" fill="none"/>
                      <circle cx="12" cy="9" r="3.5" stroke="white" strokeWidth="1.5" fill="none"/>
                      <circle cx="12" cy="9" r="1.5" fill="white"/>
                    </svg>
                  </div>
                  <p className="text-sm text-gray-700 font-medium">Kakarvitta, Jhapa, Nepal</p>
                </div>
              </div>
            </div>

            {/* Phone Card */}
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-royal-blue rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 mb-2 text-lg">Phone</h3>
                  <p className="text-gray-600 text-sm mb-1">Kathmandu: 9823727770</p>
                  <p className="text-gray-600 text-sm">Jhapa: 9804904835</p>
                </div>
              </div>
            </div>

            {/* Email Card */}
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-royal-blue rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 mb-2 text-lg">Email</h3>
                  <p className="text-gray-600 text-sm">collegeadmissionnp@gmail.com</p>
                </div>
              </div>
            </div>

            {/* Office Card */}
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-royal-blue rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 mb-2 text-lg">Office</h3>
                  <p className="text-gray-600 text-sm mb-1">Kakarvitta, Jhapa</p>
                  <p className="text-gray-600 text-sm">Nepal</p>
                </div>
              </div>
            </div>
          </div>

          {/* Service Icons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-royal-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Experienced Counselors</h3>
              <p className="text-gray-600 text-sm">Expert guidance from experienced professionals</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-royal-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Email Support Callback</h3>
              <p className="text-gray-600 text-sm">Quick response via email support</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-royal-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Request 24 Hours</h3>
              <p className="text-gray-600 text-sm">Get responses within 24 hours</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-12 bg-gradient-to-r from-orange-500 to-orange-600" style={{ backgroundColor: '#E79B47' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
            <div className="lg:col-span-2">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Your Education Starts Here! Start Your Free Consultation Today!
              </h2>
            </div>
            <div className="flex flex-col sm:flex-row lg:flex-col gap-4">
              <button
                className="bg-white text-orange-600 font-bold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                style={{ color: '#E79B47' }}
              >
                Get Started Now
              </button>
              {/* Testimonial Card */}
              <div className="bg-white rounded-lg p-4 shadow-lg">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-2xl">👩</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 italic">
                      "Excellent guidance and support throughout my application process. Highly recommended!"
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
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

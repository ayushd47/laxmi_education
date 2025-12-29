'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  tags: string[];
  status: 'draft' | 'published' | 'archived';
  featuredImage: string;
  publishedAt?: string;
  createdAt: string;
  views: number;
}

const categories = [
  'All Posts',
  'Admissions',
  'Scholarships',
  'Exams',
  'Visa Student Life',
  'Visa & Guidelines',
];

const categoryMap: { [key: string]: string } = {
  'All Posts': 'all',
  'Admissions': 'University Guide',
  'Scholarships': 'Scholarships',
  'Exams': 'Test Preparation',
  'Visa Student Life': 'Study Abroad',
  'Visa & Guidelines': 'Visa Information',
};

export default function Blog() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All Posts');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchBlogPosts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/blogs?status=published');
        if (!response.ok) {
          throw new Error('Failed to fetch blogs');
        }
        const data = await response.json();
        const sorted = data.sort((a: BlogPost, b: BlogPost) => {
          const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
          const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
          return dateB - dateA;
        });
        setBlogPosts(sorted);
        setFilteredPosts(sorted);
      } catch (error) {
        console.error('Error fetching blogs:', error);
        setBlogPosts([]);
        setFilteredPosts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  useEffect(() => {
    let filtered = [...blogPosts];

    // Filter by category
    if (selectedCategory !== 'All Posts') {
      const categoryValue = categoryMap[selectedCategory];
      filtered = filtered.filter((post) => post.category === categoryValue);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          post.author.toLowerCase().includes(query) ||
          post.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    setFilteredPosts(filtered);
  }, [selectedCategory, searchQuery, blogPosts]);

  const featuredPost = blogPosts.length > 0 ? blogPosts[0] : null;
  const regularPosts = filteredPosts.filter((post) => post.id !== featuredPost?.id);

  const getUniqueCategories = () => {
    return [...new Set(blogPosts.map((post) => post.category))];
  };

  const getRecentPosts = () => {
    return blogPosts.slice(0, 5);
  };

  const getPopularPosts = () => {
    return [...blogPosts]
      .sort((a, b) => b.views - a.views)
      .slice(0, 5);
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-blue-100 to-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Text Content */}
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-royal-blue mb-6 leading-tight">
                Study in India - Scholarships & Resources
              </h1>
              <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
                Discover expert insights, scholarship opportunities, and comprehensive guides to help you navigate your educational journey in India. From admissions to visa support, we've got you covered.
              </p>
              {featuredPost && (
                <Link
                  href={`/blog/${featuredPost.slug}`}
                  className="inline-block bg-brand-orange hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Read Article
            </Link>
              )}
            </div>

            {/* Right Side - Illustration */}
            <div className="relative hidden lg:block">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/assets/images/blog_banner.png"
                  alt="Students studying abroad with world map - International education journey"
                  width={600}
                  height={600}
                  className="w-full h-auto object-contain"
                  priority
                  sizes="(max-width: 1024px) 0vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Article Section */}
      {featuredPost && (
        <section className="py-12 bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Featured Article</h2>
            <div className="bg-gradient-to-r from-blue-50 to-white rounded-xl p-6 md:p-8 border border-blue-100">
              <h3 className="text-2xl md:text-3xl font-bold text-royal-blue mb-4">
                {featuredPost.title}
              </h3>
              <p className="text-gray-700 text-lg leading-relaxed mb-4">
                {featuredPost.excerpt}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Category Filter Bar */}
      <section className="bg-gray-50 py-6 border-b border-gray-200 sticky top-0 z-10 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 items-center">
            <div className="flex items-center text-gray-600 mr-4">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <span className="font-medium">All Posts</span>
            </div>
            {categories.slice(1).map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-royal-blue text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-blue-50 border border-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
            </div>
          </div>
        </section>

      {/* Main Content Area */}
      <section className="py-12 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content Grid */}
            <div className="lg:col-span-3">
              {isLoading ? (
                <div className="text-center py-20">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-royal-blue mx-auto"></div>
                  <p className="mt-4 text-gray-600">Loading blog posts...</p>
                        </div>
              ) : regularPosts.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-lg text-gray-600">No blog posts found. Check back soon!</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {regularPosts.map((post) => (
                    <article
                      key={post.id}
                      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 group"
                    >
                      {/* Flag Icon and Image */}
                      <div className="relative h-48 bg-gradient-to-br from-blue-500 to-blue-600 overflow-hidden">
                        {post.featuredImage && post.featuredImage !== '/blog/default.jpg' ? (
                          <>
                            <img
                              src={post.featuredImage}
                              alt={post.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                              }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                          </>
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-white text-5xl">📚</span>
                          </div>
                        )}
                        {/* Flag Icon */}
                        <div className="absolute top-3 left-3 bg-white rounded-full p-2 shadow-lg">
                          <span className="text-2xl">🇮🇳</span>
                        </div>
                      </div>

                      {/* Card Content */}
                      <div className="p-5">
                        <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 leading-tight group-hover:text-royal-blue transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                          <div className="text-xs text-gray-500">
                            {post.publishedAt && (
                              <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                            )}
                            {post.author && (
                              <>
                                <span className="mx-1">•</span>
                                <span>By {post.author}</span>
                              </>
                            )}
                          </div>
                          <Link
                            href={`/blog/${post.slug}`}
                            className="text-royal-blue font-bold hover:text-blue-700 transition-colors text-sm flex items-center gap-1"
                          >
                            Read More
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </Link>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Search Bar */}
                <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-royal-blue focus:border-transparent"
                    />
                    <svg
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>

                {/* Navigation Links */}
                <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
                  <h3 className="font-bold text-gray-800 mb-4">Navigation</h3>
                  <ul className="space-y-2">
                    <li>
                      <Link href="/blog" className="text-gray-600 hover:text-royal-blue transition-colors">
                        All Posts
                      </Link>
                    </li>
                    <li>
                      <Link href="/blog" className="text-gray-600 hover:text-royal-blue transition-colors">
                        Popular Posts
                      </Link>
                    </li>
                    <li>
                      <Link href="/blog" className="text-gray-600 hover:text-royal-blue transition-colors">
                        Categories
                      </Link>
                    </li>
                    <li>
                      <Link href="/blog" className="text-gray-600 hover:text-royal-blue transition-colors">
                        Recent Posts
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Popular Posts */}
                {getPopularPosts().length > 0 && (
                  <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
                    <h3 className="font-bold text-gray-800 mb-4">Popular Posts</h3>
                    <ul className="space-y-3">
                      {getPopularPosts().map((post) => (
                        <li key={post.id}>
                          <Link
                            href={`/blog/${post.slug}`}
                            className="text-sm text-gray-600 hover:text-royal-blue transition-colors line-clamp-2"
                          >
                            {post.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Categories */}
                {getUniqueCategories().length > 0 && (
                  <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
                    <h3 className="font-bold text-gray-800 mb-4">Categories</h3>
                    <ul className="space-y-2">
                      {getUniqueCategories().map((category) => (
                        <li key={category}>
                          <button
                            onClick={() => {
                              const categoryKey = Object.keys(categoryMap).find(
                                (key) => categoryMap[key] === category
                              );
                              if (categoryKey) {
                                setSelectedCategory(categoryKey);
                              }
                            }}
                            className="text-sm text-gray-600 hover:text-royal-blue transition-colors text-left"
                          >
                            {category}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Recent Posts */}
                {getRecentPosts().length > 0 && (
                  <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
                    <h3 className="font-bold text-gray-800 mb-4">Recent Posts</h3>
                    <ul className="space-y-3">
                      {getRecentPosts().map((post) => (
                        <li key={post.id}>
                          <Link
                            href={`/blog/${post.slug}`}
                            className="text-sm text-gray-600 hover:text-royal-blue transition-colors line-clamp-2"
                          >
                            {post.title}
                          </Link>
                          {post.publishedAt && (
                            <p className="text-xs text-gray-400 mt-1">
                              {new Date(post.publishedAt).toLocaleDateString()}
                            </p>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
                </div>
              </div>
            </section>
    </div>
  );
}

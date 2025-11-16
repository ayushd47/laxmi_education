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

export default function Blog() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      setIsLoading(true);
      try {
        // Fetch only published blogs for user side
        const response = await fetch('/api/blogs?status=published');
        if (!response.ok) {
          throw new Error('Failed to fetch blogs');
        }
        const data = await response.json();
        // Sort by published date, most recent first
        const sorted = data.sort((a: BlogPost, b: BlogPost) => {
          const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
          const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
          return dateB - dateA;
        });
        setBlogPosts(sorted);
      } catch (error) {
        console.error('Error fetching blogs:', error);
        setBlogPosts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white py-20 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Link href="/" className="inline-block mb-8">
              <Image
                src="/assets/logo.png"
                alt="Laxmi Educational Consultancy Logo"
                width={200}
                height={60}
                className="h-12 md:h-16 w-auto mx-auto filter brightness-0 invert"
                priority
              />
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white drop-shadow-md">Our Blog</h1>
            <p className="text-xl md:text-2xl text-blue-50 font-medium">
              Expert insights and tips for your international education journey
            </p>
          </div>
        </div>
      </section>

      {isLoading ? (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-navbar-blue mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading blog posts...</p>
            </div>
          </div>
        </section>
      ) : blogPosts.length === 0 ? (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-lg text-gray-600">No blog posts available at the moment. Check back soon!</p>
            </div>
          </div>
        </section>
      ) : (
        <>
          {/* Featured Post */}
          {blogPosts.length > 0 && (
            <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200 mb-16">
                  {/* Featured Image */}
                  {blogPosts[0].featuredImage && blogPosts[0].featuredImage !== '/blog/default.jpg' ? (
                    <div className="relative h-64 md:h-80 w-full overflow-hidden">
                      <img
                        src={blogPosts[0].featuredImage}
                        alt={blogPosts[0].title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 right-0 px-8 pb-6">
                        <div className="flex items-center mb-4">
                          <span className="bg-yellow-400 text-blue-900 px-4 py-1.5 rounded-full text-sm font-bold shadow-md">
                            Featured
                          </span>
                          <span className="ml-4 text-white font-medium text-sm bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                            {blogPosts[0].category}
                          </span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white leading-tight drop-shadow-lg">{blogPosts[0].title}</h2>
                        <p className="text-lg text-white mb-4 leading-relaxed drop-shadow-md line-clamp-2">{blogPosts[0].excerpt}</p>
                        <div className="flex items-center text-white mb-4 text-sm">
                          {blogPosts[0].publishedAt && (
                            <>
                              <span className="font-medium">{new Date(blogPosts[0].publishedAt).toLocaleDateString()}</span>
                              <span className="mx-2">•</span>
                            </>
                          )}
                          <span className="font-medium">{blogPosts[0].views} views</span>
                        </div>
                        <Link
                          href={`/blog/${blogPosts[0].slug}`}
                          className="bg-cta-red hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition-all duration-200 inline-block shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                        >
                          Read Article
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 px-8 py-6">
                        <div className="flex items-center mb-4">
                          <span className="bg-yellow-400 text-blue-900 px-4 py-1.5 rounded-full text-sm font-bold shadow-md">
                            Featured
                          </span>
                          <span className="ml-4 text-white font-medium text-sm bg-white/20 px-3 py-1 rounded-full">
                            {blogPosts[0].category}
                          </span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white leading-tight">{blogPosts[0].title}</h2>
                        <p className="text-lg text-blue-50 mb-6 leading-relaxed">{blogPosts[0].excerpt}</p>
                        <div className="flex items-center text-blue-100 mb-6 text-sm">
                          {blogPosts[0].publishedAt && (
                            <>
                              <span className="font-medium">{new Date(blogPosts[0].publishedAt).toLocaleDateString()}</span>
                              <span className="mx-2">•</span>
                            </>
                          )}
                          <span className="font-medium">{blogPosts[0].views} views</span>
                        </div>
                      </div>
                      <div className="px-8 py-6 bg-white">
                        <Link
                          href={`/blog/${blogPosts[0].slug}`}
                          className="bg-cta-red hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition-all duration-200 inline-block shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                        >
                          Read Article
                        </Link>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </section>
          )}

          {/* Blog Posts Grid */}
          {blogPosts.length > 1 && (
            <section className="py-20 bg-gradient-to-b from-white to-gray-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {blogPosts.slice(1).map((post) => (
                    <article key={post.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-blue-200">
                      <div className="h-48 relative overflow-hidden bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700">
                        {post.featuredImage && post.featuredImage !== '/blog/default.jpg' ? (
                          <>
                            <img
                              src={post.featuredImage}
                              alt={post.title}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                              }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                          </>
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-white text-5xl">📚</span>
                          </div>
                        )}
                      </div>
                      <div className="p-6">
                        <div className="flex items-center mb-3 flex-wrap gap-2">
                          <span className="bg-yellow-400 text-blue-900 px-3 py-1 rounded-full text-xs font-bold">
                            {post.category}
                          </span>
                          {post.publishedAt && (
                            <span className="text-sm text-gray-600 font-medium">
                              {new Date(post.publishedAt).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 leading-tight">
                          {post.title}
                        </h3>
                        <p className="text-gray-700 mb-4 line-clamp-3 leading-relaxed">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                          <span className="text-sm text-gray-600 font-medium">{post.views} views</span>
                          <Link
                            href={`/blog/${post.slug}`}
                            className="text-cta-red font-bold hover:text-red-700 transition-colors duration-200 flex items-center gap-1"
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
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}

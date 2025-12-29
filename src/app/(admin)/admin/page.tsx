'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  GraduationCap,
  FileText,
  Globe,
  BookOpen,
  TrendingUp,
  Eye,
  Edit,
  Plus,
  MessageSquare,
  Clock,
  CheckCircle
} from 'lucide-react';

interface DashboardStats {
  totalUniversities: number;
  totalBlogPosts: number;
  publishedBlogs: number;
  draftBlogs: number;
  totalViews: number;
  totalCountries: number;
  totalEnquiries: number;
  newEnquiries: number;
  resolvedEnquiries: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalUniversities: 0,
    totalBlogPosts: 0,
    publishedBlogs: 0,
    draftBlogs: 0,
    totalViews: 0,
    totalCountries: 0,
    totalEnquiries: 0,
    newEnquiries: 0,
    resolvedEnquiries: 0,
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      
      try {
        // Fetch universities, blogs, and enquiries data
        const [universitiesResponse, blogsResponse, enquiriesResponse] = await Promise.all([
          fetch('/api/colleges'),
          fetch('/api/blogs'),
          fetch('/api/enquiries')
        ]);

        const universities = await universitiesResponse.json();
        const blogs = await blogsResponse.json();
        const enquiries = await enquiriesResponse.json();

        // Calculate stats
        const publishedBlogs = blogs.filter((blog: any) => blog.status === 'published').length;
        const draftBlogs = blogs.filter((blog: any) => blog.status === 'draft').length;
        const totalViews = blogs.reduce((sum: number, blog: any) => sum + (blog.views || 0), 0);
        const uniqueCountries = new Set(universities.map((uni: any) => uni.country)).size;
        const newEnquiries = enquiries.filter((enquiry: any) => enquiry.status === 'new').length;
        const resolvedEnquiries = enquiries.filter((enquiry: any) => enquiry.status === 'resolved').length;

        setStats({
          totalUniversities: universities.length,
          totalBlogPosts: blogs.length,
          publishedBlogs,
          draftBlogs,
          totalViews,
          totalCountries: uniqueCountries,
          totalEnquiries: enquiries.length,
          newEnquiries,
          resolvedEnquiries,
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        // Set default values on error
        setStats({
          totalUniversities: 0,
          totalBlogPosts: 0,
          publishedBlogs: 0,
          draftBlogs: 0,
          totalViews: 0,
          totalCountries: 0,
          totalEnquiries: 0,
          newEnquiries: 0,
          resolvedEnquiries: 0,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);


  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-royal-blue"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-royal-blue/5 via-blue-50/50 to-royal-blue/5 rounded-2xl p-6 sm:p-8 border border-royal-blue/10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Content Management Dashboard
            </h1>
            <p className="text-gray-600 mt-2 text-base sm:text-lg">Manage your blog content and university listings.</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm text-gray-500">Last updated</p>
              <p className="text-sm font-semibold text-gray-900">Just now</p>
            </div>
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100/50 border-blue-200/50 hover:shadow-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-blue-900">Universities</CardTitle>
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <GraduationCap className="h-5 w-5 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-900">{stats.totalUniversities}</div>
            <p className="text-sm text-blue-600 font-medium">
              {stats.totalCountries} countries
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100/50 border-green-200/50 hover:shadow-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-green-900">Blog Posts</CardTitle>
            <div className="p-2 bg-green-500/20 rounded-lg">
              <FileText className="h-5 w-5 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-900">{stats.totalBlogPosts}</div>
            <p className="text-sm text-green-600 font-medium">
              {stats.publishedBlogs} published, {stats.draftBlogs} drafts
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100/50 border-orange-200/50 hover:shadow-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-orange-900">Enquiries</CardTitle>
            <div className="p-2 bg-orange-500/20 rounded-lg">
              <MessageSquare className="h-5 w-5 text-orange-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-900">{stats.totalEnquiries}</div>
            <p className="text-sm text-orange-600 font-medium">
              {stats.newEnquiries} new, {stats.resolvedEnquiries} resolved
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-royal-blue/10 border-royal-blue/20 hover:shadow-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-royal-blue">Total Views</CardTitle>
            <div className="p-2 bg-royal-blue/20 rounded-lg">
              <Eye className="h-5 w-5 text-royal-blue" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-royal-blue">{stats.totalViews.toLocaleString()}</div>
            <p className="text-sm text-royal-blue font-medium">
              Across all blog posts
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Enquiries Management */}
        <Card className="bg-gradient-to-br from-white to-gray-50/50 border-gray-200/50 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-gray-50 to-white border-b border-gray-200/50">
            <CardTitle className="text-xl font-bold text-gray-900">Enquiries Management</CardTitle>
            <CardDescription className="text-gray-600">
              View and manage customer enquiries
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <MessageSquare className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-orange-900">Total Enquiries</p>
                    <p className="text-sm text-orange-600">All time</p>
                  </div>
                </div>
                <div className="text-2xl font-bold text-orange-700">{stats.totalEnquiries}</div>
              </div>

              <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <Clock className="h-5 w-5 text-yellow-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-yellow-900">New Enquiries</p>
                    <p className="text-sm text-yellow-600">Require attention</p>
                  </div>
                </div>
                <div className="text-2xl font-bold text-yellow-700">{stats.newEnquiries}</div>
              </div>

              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-green-900">Resolved</p>
                    <p className="text-sm text-green-600">Completed</p>
                  </div>
                </div>
                <div className="text-2xl font-bold text-green-700">{stats.resolvedEnquiries}</div>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <Button 
                className="w-full bg-royal-blue hover:bg-blue-700"
                onClick={() => window.location.href = '/admin/enquiries'}
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Manage Enquiries
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Blog Management */}
        <Card className="bg-gradient-to-br from-white to-gray-50/50 border-gray-200/50 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-gray-50 to-white border-b border-gray-200/50">
            <CardTitle className="text-xl font-bold text-gray-900">Blog Management</CardTitle>
            <CardDescription className="text-gray-600">
              Create and manage your blog content
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <FileText className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-green-900">Published Posts</p>
                    <p className="text-sm text-green-600">{stats.publishedBlogs} articles live</p>
                  </div>
                </div>
                <div className="text-2xl font-bold text-green-700">{stats.publishedBlogs}</div>
              </div>

              <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <Edit className="h-5 w-5 text-yellow-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-yellow-900">Draft Posts</p>
                    <p className="text-sm text-yellow-600">{stats.draftBlogs} in progress</p>
                  </div>
                </div>
                <div className="text-2xl font-bold text-yellow-700">{stats.draftBlogs}</div>
              </div>

              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-blue-900">Total Views</p>
                    <p className="text-sm text-blue-600">Across all posts</p>
                  </div>
                </div>
                <div className="text-2xl font-bold text-blue-700">{stats.totalViews.toLocaleString()}</div>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <Button 
                className="w-full bg-royal-blue hover:bg-blue-700"
                onClick={() => window.location.href = '/admin/blog'}
              >
                <FileText className="w-4 h-4 mr-2" />
                Manage Blog Posts
              </Button>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => window.location.href = '/admin/blog'}
              >
                <Plus className="w-4 h-4 mr-2" />
                Create New Post
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* University Management */}
        <Card className="bg-gradient-to-br from-white to-gray-50/50 border-gray-200/50 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-gray-50 to-white border-b border-gray-200/50">
            <CardTitle className="text-xl font-bold text-gray-900">University Management</CardTitle>
            <CardDescription className="text-gray-600">
              Manage your university and college listings
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <GraduationCap className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-blue-900">Total Universities</p>
                    <p className="text-sm text-blue-600">In your database</p>
                  </div>
                </div>
                <div className="text-2xl font-bold text-blue-700">{stats.totalUniversities}</div>
              </div>

              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Globe className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-green-900">Countries Covered</p>
                    <p className="text-sm text-green-600">Global reach</p>
                  </div>
                </div>
                <div className="text-2xl font-bold text-green-700">{stats.totalCountries}</div>
              </div>

              <div className="flex items-center justify-between p-4 bg-royal-blue/5 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-royal-blue/10 rounded-lg">
                    <BookOpen className="h-5 w-5 text-royal-blue" />
                  </div>
                  <div>
                    <p className="font-semibold text-royal-blue">Programs Available</p>
                    <p className="text-sm text-royal-blue/70">Across all universities</p>
                  </div>
                </div>
                <div className="text-2xl font-bold text-royal-blue">500+</div>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <Button 
                className="w-full bg-royal-blue hover:bg-blue-700"
                onClick={() => window.location.href = '/admin/universities'}
              >
                <GraduationCap className="w-4 h-4 mr-2" />
                Manage Universities
              </Button>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => window.location.href = '/admin/universities'}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add New University
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="bg-gradient-to-br from-white to-gray-50/50 border-gray-200/50 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-gray-50 to-white border-b border-gray-200/50">
          <CardTitle className="text-xl font-bold text-gray-900">Quick Actions</CardTitle>
          <CardDescription className="text-gray-600">
            Common content management tasks
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button 
              className="w-full justify-start rounded-xl hover:bg-orange-50 hover:text-orange-700 hover:border-orange-200 transition-all duration-200" 
              variant="outline"
              onClick={() => window.location.href = '/admin/enquiries'}
            >
              <MessageSquare className="w-4 h-4 mr-3" />
              Manage Enquiries
            </Button>
            <Button 
              className="w-full justify-start rounded-xl hover:bg-green-50 hover:text-green-700 hover:border-green-200 transition-all duration-200" 
              variant="outline"
              onClick={() => window.location.href = '/admin/universities'}
            >
              <GraduationCap className="w-4 h-4 mr-3" />
              Manage Universities
            </Button>
            <Button 
              className="w-full justify-start rounded-xl hover:bg-royal-blue/5 hover:text-royal-blue hover:border-royal-blue/20 transition-all duration-200" 
              variant="outline"
              onClick={() => window.location.href = '/admin/blog'}
            >
              <FileText className="w-4 h-4 mr-3" />
              Manage Blog Posts
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
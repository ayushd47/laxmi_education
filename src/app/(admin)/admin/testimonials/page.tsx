'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Star,
  User,
  Plus,
  AlertCircle,
  Globe,
  Eye
} from 'lucide-react';
import TestimonialForm from './components/TestimonialForm';

interface Testimonial {
  id: string;
  name: string;
  university: string;
  country: string;
  program: string;
  rating: number;
  text: string;
  image?: string;
  status: 'published' | 'draft';
  createdAt: string;
  updatedAt: string;
}

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [filteredTestimonials, setFilteredTestimonials] = useState<Testimonial[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/admin/login');
      return;
    }
    fetchTestimonials();
  }, [isAuthenticated, router]);

  const fetchTestimonials = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/testimonials');
      if (!response.ok) {
        throw new Error('Failed to fetch testimonials');
      }
      const data = await response.json();
      setTestimonials(data);
      setFilteredTestimonials(data);
    } catch (err) {
      setError('Failed to fetch testimonials');
      console.error('Error fetching testimonials:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let filtered = testimonials;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(testimonial =>
        testimonial.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        testimonial.university.toLowerCase().includes(searchTerm.toLowerCase()) ||
        testimonial.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
        testimonial.program.toLowerCase().includes(searchTerm.toLowerCase()) ||
        testimonial.text.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(testimonial => testimonial.status === statusFilter);
    }

    setFilteredTestimonials(filtered);
  }, [testimonials, searchTerm, statusFilter]);

  const getStatusBadge = (status: string) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    switch (status) {
      case 'published':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'draft':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  const getStatusCounts = () => {
    return {
      total: testimonials.length,
      published: testimonials.filter(t => t.status === 'published').length,
      draft: testimonials.filter(t => t.status === 'draft').length,
    };
  };

  const statusCounts = getStatusCounts();

  const handleCreateTestimonial = () => {
    setEditingTestimonial(null);
    setIsFormOpen(true);
  };

  const handleEditTestimonial = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    setIsFormOpen(true);
  };

  const handleSaveTestimonial = async (testimonialData: any) => {
    try {
      if (editingTestimonial) {
        // Update existing testimonial
        const response = await fetch(`/api/testimonials/${editingTestimonial.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(testimonialData),
        });

        if (!response.ok) {
          throw new Error('Failed to update testimonial');
        }

        await fetchTestimonials();
      } else {
        // Create new testimonial
        const response = await fetch('/api/testimonials', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(testimonialData),
        });

        if (!response.ok) {
          throw new Error('Failed to create testimonial');
        }

        await fetchTestimonials();
      }

      setIsFormOpen(false);
      setEditingTestimonial(null);
      setError('');
    } catch (error) {
      console.error('Error saving testimonial:', error);
      setError('Failed to save testimonial. Please try again.');
    }
  };

  const handleDeleteTestimonial = async (testimonialId: string) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) {
      return;
    }

    try {
      const response = await fetch(`/api/testimonials/${testimonialId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete testimonial');
      }

      await fetchTestimonials();
    } catch (error) {
      console.error('Error deleting testimonial:', error);
      setError('Failed to delete testimonial. Please try again.');
    }
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingTestimonial(null);
  };

  if (!isAuthenticated) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-royal-blue"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Testimonials</h1>
          <p className="text-gray-600 mt-2">Manage student testimonials displayed on the homepage</p>
        </div>
        <Button className="bg-royal-blue hover:bg-blue-700" onClick={handleCreateTestimonial}>
          <Plus className="w-4 h-4 mr-2" />
          New Testimonial
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-gray-900">{statusCounts.total}</div>
            <div className="text-sm text-gray-500">Total Testimonials</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">{statusCounts.published}</div>
            <div className="text-sm text-gray-500">Published</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-600">{statusCounts.draft}</div>
            <div className="text-sm text-gray-500">Drafts</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search testimonials by name, university, country, or program..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-royal-blue focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                More Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Testimonials Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Testimonials ({filteredTestimonials.length})</CardTitle>
          <CardDescription>
            Complete list of student testimonials
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>University</TableHead>
                  <TableHead>Country</TableHead>
                  <TableHead>Program</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Testimonial</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTestimonials.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-12">
                      <div className="flex flex-col items-center justify-center">
                        <User className="w-12 h-12 text-gray-400 mb-4" />
                        <p className="text-gray-500 text-lg font-medium">No testimonials found</p>
                        <p className="text-gray-400 text-sm mt-2">Click "New Testimonial" to get started</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredTestimonials.map((testimonial) => (
                    <TableRow key={testimonial.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-royal-blue to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                            {testimonial.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div className="font-medium">{testimonial.name}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{testimonial.university}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center text-sm">
                          <Globe className="w-3 h-3 mr-2 text-gray-400" />
                          {testimonial.country}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{testimonial.program}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          {renderStars(testimonial.rating)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm text-gray-600 line-clamp-2 max-w-xs">
                          {testimonial.text}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className={getStatusBadge(testimonial.status)}>
                          {testimonial.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => handleEditTestimonial(testimonial)}>
                              <Edit className="w-4 h-4 mr-2" />
                              Edit Testimonial
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              className="text-red-600"
                              onClick={() => handleDeleteTestimonial(testimonial.id)}
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete Testimonial
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Error Message */}
      {error && (
        <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-4 rounded-md">
          <AlertCircle className="h-4 w-4" />
          <span>{error}</span>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setError('')}
            className="ml-auto"
          >
            Dismiss
          </Button>
        </div>
      )}

      {/* Testimonial Form Modal */}
      <TestimonialForm
        testimonial={editingTestimonial ?? undefined}
        onSave={handleSaveTestimonial}
        onCancel={handleCloseForm}
        isOpen={isFormOpen}
      />
    </div>
  );
}








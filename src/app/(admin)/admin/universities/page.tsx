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
  Eye,
  Edit,
  Trash2,
  Building2,
  MapPin,
  Star,
  Users,
  DollarSign,
  Calendar,
  Globe,
  Plus,
  AlertCircle
} from 'lucide-react';
import { University, CreateUniversityData } from '@/lib/types';
import CollegeForm from './components/CollegeForm';

export default function UniversitiesPage() {
  const [universities, setUniversities] = useState<University[]>([]);
  const [filteredUniversities, setFilteredUniversities] = useState<University[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [countryFilter, setCountryFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingUniversity, setEditingUniversity] = useState<University | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  
  const { isAuthenticated, logout } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/admin/login');
      return;
    }
    fetchUniversities();
  }, [isAuthenticated, router]);

  const fetchUniversities = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/colleges');
      if (!response.ok) {
        throw new Error('Failed to fetch universities');
      }
      const data = await response.json();
      setUniversities(data);
      setFilteredUniversities(data);
    } catch (err) {
      setError('Failed to fetch universities');
      console.error('Error fetching universities:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let filtered = universities;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(uni =>
        uni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        uni.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
        uni.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        uni.programs.some(program => 
          program.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Country filter
    if (countryFilter !== 'all') {
      filtered = filtered.filter(uni => uni.country === countryFilter);
    }

    setFilteredUniversities(filtered);
  }, [universities, searchTerm, countryFilter]);

  const getStatusBadge = (status: string) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    switch (status) {
      case 'active':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'inactive':
        return `${baseClasses} bg-gray-100 text-gray-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const getRankingBadge = (ranking: number) => {
    if (ranking <= 10) {
      return "bg-yellow-100 text-yellow-800";
    } else if (ranking <= 50) {
      return "bg-blue-100 text-blue-800";
    } else {
      return "bg-gray-100 text-gray-800";
    }
  };

  const getUniqueCountries = () => {
    return [...new Set(universities.map(uni => uni.country))];
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this university?')) return;
    
    try {
      const response = await fetch(`/api/colleges/${id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        await fetchUniversities();
      } else {
        setError('Failed to delete university');
      }
    } catch (err) {
      setError('Failed to delete university');
      console.error('Error deleting university:', err);
    }
  };

  const handleAddUniversity = () => {
    setEditingUniversity(null);
    setIsFormOpen(true);
  };

  const handleEditUniversity = (university: University) => {
    setEditingUniversity(university);
    setIsFormOpen(true);
  };

  const handleSaveCollege = async (collegeData: any) => {
    try {
      if (editingUniversity) {
        // Update existing college
        const response = await fetch(`/api/colleges/${editingUniversity.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(collegeData),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ error: 'Failed to update college' }));
          throw new Error(errorData.error || 'Failed to update college');
        }

        const updatedCollege = await response.json();
        // Refresh the list to ensure data is in sync
        await fetchUniversities();
      } else {
        // Create new college
        const response = await fetch('/api/colleges', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(collegeData),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ error: 'Failed to create college' }));
          throw new Error(errorData.error || 'Failed to create college');
        }

        // Refresh the list to ensure data is in sync
        await fetchUniversities();
      }

      setIsFormOpen(false);
      setEditingUniversity(null);
      setError('');
    } catch (error: any) {
      console.error('Error saving college:', error);
      setError(error.message || 'Failed to save college. Please try again.');
    }
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingUniversity(null);
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
          <h1 className="text-3xl font-bold text-gray-900">Universities</h1>
          <p className="text-gray-600 mt-2">Manage partner universities and their programs</p>
        </div>
        <Button 
          className="bg-royal-blue hover:bg-blue-700"
          onClick={handleAddUniversity}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add University
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-gray-900">{universities.length}</div>
            <div className="text-sm text-gray-500">Total Universities</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">
              {universities.filter(uni => uni.status === 'active').length}
            </div>
            <div className="text-sm text-gray-500">Active</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">
              {getUniqueCountries().length}
            </div>
            <div className="text-sm text-gray-500">Countries</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-royal-blue">
              {universities.reduce((total, uni) => total + uni.programs.length, 0)}
            </div>
            <div className="text-sm text-gray-500">Total Programs</div>
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
                  placeholder="Search universities by name, country, or programs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select
                value={countryFilter}
                onChange={(e) => setCountryFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-royal-blue focus:border-transparent"
              >
                <option value="all">All Countries</option>
                {getUniqueCountries().map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                More Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Universities Table */}
      <Card>
        <CardHeader>
          <CardTitle>
            {filteredUniversities.length === 0 
              ? 'All Universities' 
              : `All Universities (${filteredUniversities.length})`}
          </CardTitle>
          <CardDescription>
            {filteredUniversities.length === 0 
              ? 'No universities added yet. Click "Add New University" to get started.'
              : 'Complete list of partner universities'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>University</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Ranking</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Programs</TableHead>
                  <TableHead>Tuition Fee</TableHead>
                  <TableHead>Students</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Deadline</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUniversities.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={10} className="text-center py-12">
                      <div className="flex flex-col items-center justify-center">
                        <Building2 className="w-12 h-12 text-gray-400 mb-4" />
                        <p className="text-gray-500 text-lg font-medium">No universities found</p>
                        <p className="text-gray-400 text-sm mt-2">Click "Add New University" to get started</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUniversities.map((university) => (
                  <TableRow key={university.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                          <Building2 className="w-5 h-5 text-gray-600" />
                        </div>
                        <div>
                          <div className="font-medium">{university.name}</div>
                          <div className="text-sm text-gray-500">{university.website}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center text-sm">
                        <MapPin className="w-3 h-3 mr-2 text-gray-400" />
                        {university.city}, {university.country}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRankingBadge(university.ranking)}`}>
                        #{university.ranking}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        university.type === 'public' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-royal-blue/10 text-royal-blue'
                      }`}>
                        {university.type}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {university.programs.slice(0, 2).join(', ')}
                        {university.programs.length > 2 && (
                          <span className="text-gray-500"> +{university.programs.length - 2} more</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>UG: ${university.tuitionFee.undergraduate.toLocaleString()}</div>
                        <div>G: ${university.tuitionFee.graduate.toLocaleString()}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center text-sm">
                        <Users className="w-3 h-3 mr-2 text-gray-400" />
                        {university.students.toLocaleString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={getStatusBadge(university.status)}>
                        {university.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="w-3 h-3 mr-2" />
                        {new Date(university.applicationDeadline).toLocaleDateString()}
                      </div>
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
                          <DropdownMenuItem>
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEditUniversity(university)}>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit University
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => window.open(university.website, '_blank')}>
                            <Globe className="w-4 h-4 mr-2" />
                            Visit Website
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            className="text-red-600"
                            onClick={() => handleDelete(university.id)}
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete University
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

      {/* College Form Modal */}
      <CollegeForm
        college={editingUniversity ?? undefined}
        onSave={handleSaveCollege}
        onCancel={handleCloseForm}
        isOpen={isFormOpen}
      />
    </div>
  );
}


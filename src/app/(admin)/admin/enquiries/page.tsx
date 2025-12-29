'use client';

import { useState, useEffect } from 'react';
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
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from '@/components/ui/dropdown-menu';
import {
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Mail,
  Phone,
  MapPin,
  MessageSquare,
  Clock,
  CheckCircle,
  XCircle,
  User,
  Calendar,
  RefreshCw
} from 'lucide-react';

interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  phoneCountryCode: string;
  nearestOffice: string;
  message: string;
  status: 'new' | 'read' | 'contacted' | 'resolved';
  createdAt: string;
  updatedAt: string;
}

export default function EnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [filteredEnquiries, setFilteredEnquiries] = useState<Enquiry[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/enquiries?sort=newest');
      if (!response.ok) {
        throw new Error('Failed to fetch enquiries');
      }
      const data = await response.json();
      setEnquiries(data);
      setFilteredEnquiries(data);
    } catch (error) {
      console.error('Error fetching enquiries:', error);
      setEnquiries([]);
      setFilteredEnquiries([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let filtered = enquiries;

    // Filter by search term
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(enquiry =>
        enquiry.name.toLowerCase().includes(searchLower) ||
        enquiry.email.toLowerCase().includes(searchLower) ||
        enquiry.phone?.toLowerCase().includes(searchLower) ||
        enquiry.message?.toLowerCase().includes(searchLower)
      );
    }

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(enquiry => enquiry.status === statusFilter);
    }

    setFilteredEnquiries(filtered);
  }, [searchTerm, statusFilter, enquiries]);

  const updateEnquiryStatus = async (id: string, newStatus: Enquiry['status']) => {
    try {
      // Update optimistically
      setEnquiries(prev => 
        prev.map(enquiry => 
          enquiry.id === id 
            ? { ...enquiry, status: newStatus, updatedAt: new Date().toISOString() }
            : enquiry
        )
      );
      
      // Call API to update status
      const response = await fetch(`/api/enquiries/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        // Revert on error
        await fetchEnquiries();
        throw new Error('Failed to update enquiry status');
      }
      
      // Refresh to ensure sync
      await fetchEnquiries();
    } catch (error) {
      console.error('Error updating enquiry status:', error);
      // Refresh to get correct state
      await fetchEnquiries();
    }
  };

  const getStatusColor = (status: Enquiry['status']) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'read':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'contacted':
        return 'bg-royal-blue/10 text-royal-blue border-royal-blue/20';
      case 'resolved':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: Enquiry['status']) => {
    switch (status) {
      case 'new':
        return <Clock className="w-4 h-4" />;
      case 'read':
        return <Eye className="w-4 h-4" />;
      case 'contacted':
        return <MessageSquare className="w-4 h-4" />;
      case 'resolved':
        return <CheckCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const newEnquiriesCount = enquiries.filter(e => e.status === 'new').length;
  const totalEnquiries = enquiries.length;

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
      <div className="bg-gradient-to-r from-royal-blue/5 via-blue-50/50 to-royal-blue/5 rounded-2xl p-6 sm:p-8 border border-royal-blue/10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Enquiries Management
            </h1>
            <p className="text-gray-600 mt-2 text-base sm:text-lg">
              View and manage all customer enquiries and consultation requests
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={fetchEnquiries}
              className="flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100/50 border-blue-200/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-blue-900">Total Enquiries</CardTitle>
            <MessageSquare className="h-5 w-5 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-900">{totalEnquiries}</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100/50 border-yellow-200/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-yellow-900">New Enquiries</CardTitle>
            <Clock className="h-5 w-5 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-900">{newEnquiriesCount}</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-royal-blue/10 border-royal-blue/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-royal-blue">Contacted</CardTitle>
            <MessageSquare className="h-5 w-5 text-royal-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-royal-blue">
              {enquiries.filter(e => e.status === 'contacted').length}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100/50 border-green-200/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-green-900">Resolved</CardTitle>
            <CheckCircle className="h-5 w-5 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-900">
              {enquiries.filter(e => e.status === 'resolved').length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Enquiries List</CardTitle>
          <CardDescription>Manage and track all customer enquiries</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search by name, email, phone, or message..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full sm:w-auto gap-2">
                  <Filter className="w-4 h-4" />
                  {statusFilter === 'all' ? 'All Enquiries' : statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52">
                <DropdownMenuLabel className="px-3 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Filter by Status
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="my-1" />
                <DropdownMenuRadioGroup value={statusFilter} onValueChange={setStatusFilter}>
                  <DropdownMenuRadioItem value="all" className="cursor-pointer">
                    <div className="flex items-center gap-2.5">
                      <MessageSquare className="w-4 h-4 text-gray-400" />
                      <span>All Enquiries</span>
                    </div>
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="new" className="cursor-pointer">
                    <div className="flex items-center gap-2.5">
                      <Clock className="w-4 h-4 text-blue-500" />
                      <span>New</span>
                    </div>
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="read" className="cursor-pointer">
                    <div className="flex items-center gap-2.5">
                      <Eye className="w-4 h-4 text-yellow-500" />
                      <span>Read</span>
                    </div>
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="contacted" className="cursor-pointer">
                    <div className="flex items-center gap-2.5">
                      <MessageSquare className="w-4 h-4 text-royal-blue" />
                      <span>Contacted</span>
                    </div>
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="resolved" className="cursor-pointer">
                    <div className="flex items-center gap-2.5">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Resolved</span>
                    </div>
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Enquiries Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Office</TableHead>
                  <TableHead>Message</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEnquiries.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                      No enquiries found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredEnquiries.map((enquiry) => (
                    <TableRow key={enquiry.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-gray-400" />
                          <span className="font-medium">{enquiry.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm">
                            <Mail className="w-3 h-3 text-gray-400" />
                            <span>{enquiry.email}</span>
                          </div>
                          {enquiry.phone && (
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Phone className="w-3 h-3 text-gray-400" />
                              <span>{enquiry.phoneCountryCode} {enquiry.phone}</span>
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span>{enquiry.nearestOffice}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="max-w-xs">
                          {enquiry.message ? (
                            <p className="text-sm text-gray-600 truncate" title={enquiry.message}>
                              {enquiry.message}
                            </p>
                          ) : (
                            <span className="text-sm text-gray-400">No message</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(enquiry.status)}`}>
                          {getStatusIcon(enquiry.status)}
                          {enquiry.status.charAt(0).toUpperCase() + enquiry.status.slice(1)}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span>{formatDate(enquiry.createdAt)}</span>
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
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => setSelectedEnquiry(enquiry)}>
                              <Eye className="w-4 h-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => updateEnquiryStatus(enquiry.id, 'read')}>
                              <Eye className="w-4 h-4 mr-2" />
                              Mark as Read
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => updateEnquiryStatus(enquiry.id, 'contacted')}>
                              <MessageSquare className="w-4 h-4 mr-2" />
                              Mark as Contacted
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => updateEnquiryStatus(enquiry.id, 'resolved')}>
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Mark as Resolved
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

      {/* Enquiry Detail Modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setSelectedEnquiry(null)}>
          <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto bg-white" onClick={(e) => e.stopPropagation()}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Enquiry Details</CardTitle>
                <Button variant="ghost" size="sm" onClick={() => setSelectedEnquiry(null)}>
                  <XCircle className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Name</label>
                  <p className="text-sm font-semibold">{selectedEnquiry.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Email</label>
                  <p className="text-sm">{selectedEnquiry.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Phone</label>
                  <p className="text-sm">{selectedEnquiry.phoneCountryCode} {selectedEnquiry.phone || 'N/A'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Nearest Office</label>
                  <p className="text-sm">{selectedEnquiry.nearestOffice}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Status</label>
                  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(selectedEnquiry.status)}`}>
                    {getStatusIcon(selectedEnquiry.status)}
                    {selectedEnquiry.status.charAt(0).toUpperCase() + selectedEnquiry.status.slice(1)}
                  </span>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Date</label>
                  <p className="text-sm">{formatDate(selectedEnquiry.createdAt)}</p>
                </div>
              </div>
              {selectedEnquiry.message && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Message</label>
                  <p className="text-sm mt-1 p-3 bg-gray-50 rounded-lg">{selectedEnquiry.message}</p>
                </div>
              )}
              <div className="flex gap-2 pt-4 border-t">
                <Button onClick={() => updateEnquiryStatus(selectedEnquiry.id, 'read')} variant="outline" size="sm">
                  Mark as Read
                </Button>
                <Button onClick={() => updateEnquiryStatus(selectedEnquiry.id, 'contacted')} variant="outline" size="sm">
                  Mark as Contacted
                </Button>
                <Button onClick={() => updateEnquiryStatus(selectedEnquiry.id, 'resolved')} variant="outline" size="sm">
                  Mark as Resolved
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}


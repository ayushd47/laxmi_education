import { NextRequest, NextResponse } from 'next/server';
import { enquiriesStore, EnquiryData } from './data';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const search = searchParams.get('search');
    const sort = searchParams.get('sort') || 'newest';

    let filteredEnquiries = [...enquiriesStore];

    // Filter by status
    if (status && status !== 'all') {
      filteredEnquiries = filteredEnquiries.filter(enquiry => enquiry.status === status);
    }

    // Search filter
    if (search) {
      const searchLower = search.toLowerCase();
      filteredEnquiries = filteredEnquiries.filter(enquiry =>
        enquiry.name.toLowerCase().includes(searchLower) ||
        enquiry.email.toLowerCase().includes(searchLower) ||
        enquiry.phone?.toLowerCase().includes(searchLower) ||
        enquiry.message?.toLowerCase().includes(searchLower)
      );
    }

    // Sort enquiries
    if (sort === 'newest') {
      filteredEnquiries.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else if (sort === 'oldest') {
      filteredEnquiries.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    }

    return NextResponse.json(filteredEnquiries);
  } catch (error) {
    console.error('Error fetching enquiries:', error);
    return NextResponse.json({ error: 'Failed to fetch enquiries' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.name || !body.email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
    }

    const newEnquiry: EnquiryData = {
      id: Date.now().toString(),
      name: body.name,
      email: body.email,
      phone: body.phone || '',
      phoneCountryCode: body.phoneCountryCode || '+977',
      nearestOffice: body.nearestOffice || 'Kathmandu',
      message: body.message || '',
      status: 'new' as const, // new, read, contacted, resolved
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    enquiriesStore.push(newEnquiry);

    return NextResponse.json(newEnquiry, { status: 201 });
  } catch (error) {
    console.error('Error creating enquiry:', error);
    return NextResponse.json({ error: 'Failed to create enquiry' }, { status: 500 });
  }
}


import { NextRequest, NextResponse } from 'next/server';
import { enquiriesStore, EnquiryData } from './data';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const search = searchParams.get('search');
    const sort = searchParams.get('sort') || 'newest';

    // Get filtered enquiries from database
    let filteredEnquiries = await enquiriesStore.filter({
      status: status || undefined,
      search: search || undefined,
      sort: sort || 'newest',
    });

    console.log('GET /api/enquiries - Found enquiries:', filteredEnquiries.length);

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

    // Create enquiry data (without id, createdAt, updatedAt - these are handled by DB)
    const enquiryData = {
      name: body.name,
      email: body.email,
      phone: body.phone || '',
      phoneCountryCode: body.phoneCountryCode || '+977',
      nearestOffice: body.nearestOffice || 'Kathmandu',
      message: body.message || '',
      status: 'new' as const, // new, read, contacted, resolved
    };

    const newEnquiry = await enquiriesStore.create(enquiryData);

    return NextResponse.json(newEnquiry, { status: 201 });
  } catch (error) {
    console.error('Error creating enquiry:', error);
    return NextResponse.json({ error: 'Failed to create enquiry' }, { status: 500 });
  }
}


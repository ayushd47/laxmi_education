import { NextRequest, NextResponse } from 'next/server';
import { collegesDB, CollegeData } from './data';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const type = searchParams.get('type');
    const country = searchParams.get('country');
    const search = searchParams.get('search');
    const isPublic = searchParams.get('public'); // For user-side filtering

    // Build filters for database query
    const filters: any = {};
    
    // For public/user-side access, only show active public universities
    if (isPublic === 'true') {
      filters.status = 'active';
      filters.type = 'public';
    } else {
      // For admin-side, filter by status if provided
      if (status && status !== 'all') {
        filters.status = status;
      }
      
      // Filter by type (only if not public access)
      if (type && type !== 'all') {
        filters.type = type;
      }
    }

    // Filter by country
    if (country && country !== 'all') {
      filters.country = country;
    }

    // Search filter
    if (search) {
      filters.search = search;
    }

    // Get filtered colleges from database
    let filteredColleges = await collegesDB.filter(filters);

    console.log('GET /api/colleges - Found colleges:', filteredColleges.length);

    return NextResponse.json(filteredColleges);
  } catch (error) {
    console.error('Error fetching colleges:', error);
    return NextResponse.json({ error: 'Failed to fetch colleges' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    // Validate country must be India (default to India if not provided)
    const country = body.country || 'India';
    if (country !== 'India') {
      return NextResponse.json({ error: 'Country must be India' }, { status: 400 });
    }

    // Create college data (without id, createdAt, updatedAt - these are handled by DB)
    const collegeData = {
      name: body.name,
      country: country,
      city: body.city || '',
      ranking: body.ranking || 999,
      type: body.type || 'public',
      established: body.established || new Date().getFullYear(),
      students: body.students || 0,
      tuitionFee: {
        undergraduate: body.tuitionFee?.undergraduate || 0,
        graduate: body.tuitionFee?.graduate || 0
      },
      programs: body.programs || [],
      requirements: body.requirements || [],
      applicationDeadline: body.applicationDeadline || new Date().toISOString().split('T')[0],
      imageUrl: body.imageUrl || '/universities/default.jpg',
      website: body.website || '',
      description: body.description || '',
      status: body.status || 'active',
    };

    const newCollege = await collegesDB.create(collegeData);
    
    console.log('POST /api/colleges - Created college with ID:', newCollege.id);

    return NextResponse.json(newCollege, { status: 201 });
  } catch (error) {
    console.error('Error creating college:', error);
    return NextResponse.json({ error: 'Failed to create college' }, { status: 500 });
  }
}

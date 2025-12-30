import { NextRequest, NextResponse } from 'next/server';
import { getTokenFromRequest, verifyToken } from '@/lib/auth';
import { University, CreateUniversityData } from '@/lib/types';

// Force dynamic rendering - POST uses request headers for auth
export const dynamic = 'force-dynamic';

// Mock database - in production, this would be a real database
let universities: University[] = [];

// GET /api/universities - Get all universities (public)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const country = searchParams.get('country');
    const type = searchParams.get('type');
    const status = searchParams.get('status') || 'active';
    const search = searchParams.get('search');

    let filteredUniversities = universities.filter(uni => uni.status === status);

    // Apply filters
    if (country && country !== 'all') {
      filteredUniversities = filteredUniversities.filter(uni => uni.country === country);
    }

    if (type && type !== 'all') {
      filteredUniversities = filteredUniversities.filter(uni => uni.type === type);
    }

    if (search) {
      const searchLower = search.toLowerCase();
      filteredUniversities = filteredUniversities.filter(uni =>
        uni.name.toLowerCase().includes(searchLower) ||
        uni.country.toLowerCase().includes(searchLower) ||
        uni.city.toLowerCase().includes(searchLower) ||
        uni.programs.some(program => program.toLowerCase().includes(searchLower))
      );
    }

    return NextResponse.json(filteredUniversities);
  } catch (error) {
    console.error('Error fetching universities:', error);
    return NextResponse.json(
      { error: 'Failed to fetch universities' },
      { status: 500 }
    );
  }
}

// POST /api/universities - Create new university (admin only)
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const token = getTokenFromRequest(request);
    if (!token) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const user = verifyToken(token);
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    const data: CreateUniversityData = await request.json();
    
    // Validate required fields
    if (!data.name || !data.country || !data.city) {
      return NextResponse.json(
        { error: 'Name, country, and city are required' },
        { status: 400 }
      );
    }

    // Validate country must be India
    if (data.country !== 'India') {
      return NextResponse.json(
        { error: 'Country must be India' },
        { status: 400 }
      );
    }

    // Create new university
    const newUniversity: University = {
      id: Date.now().toString(),
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    universities.push(newUniversity);

    return NextResponse.json(newUniversity, { status: 201 });
  } catch (error) {
    console.error('Error creating university:', error);
    return NextResponse.json(
      { error: 'Failed to create university' },
      { status: 500 }
    );
  }
}

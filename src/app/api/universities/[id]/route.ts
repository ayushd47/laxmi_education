import { NextRequest, NextResponse } from 'next/server';
import { getTokenFromRequest, verifyToken } from '@/lib/auth';
import { University, UpdateUniversityData } from '@/lib/types';

// Force dynamic rendering - PUT/DELETE use request headers for auth
export const dynamic = 'force-dynamic';

// Mock database - in production, this would be a real database
let universities: University[] = [];

// GET /api/universities/[id] - Get single university
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const university = universities.find(uni => uni.id === id);
    
    if (!university) {
      return NextResponse.json(
        { error: 'University not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(university);
  } catch (error) {
    console.error('Error fetching university:', error);
    return NextResponse.json(
      { error: 'Failed to fetch university' },
      { status: 500 }
    );
  }
}

// PUT /api/universities/[id] - Update university (admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
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

    const data: UpdateUniversityData = await request.json();
    
    // Validate country must be India if provided
    if (data.country && data.country !== 'India') {
      return NextResponse.json(
        { error: 'Country must be India' },
        { status: 400 }
      );
    }
    
    const universityIndex = universities.findIndex(uni => uni.id === id);
    
    if (universityIndex === -1) {
      return NextResponse.json(
        { error: 'University not found' },
        { status: 404 }
      );
    }

    // Update university
    universities[universityIndex] = {
      ...universities[universityIndex],
      ...data,
      updatedAt: new Date().toISOString()
    };

    return NextResponse.json(universities[universityIndex]);
  } catch (error) {
    console.error('Error updating university:', error);
    return NextResponse.json(
      { error: 'Failed to update university' },
      { status: 500 }
    );
  }
}

// DELETE /api/universities/[id] - Delete university (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
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

    const universityIndex = universities.findIndex(uni => uni.id === id);
    
    if (universityIndex === -1) {
      return NextResponse.json(
        { error: 'University not found' },
        { status: 404 }
      );
    }

    // Delete university
    universities.splice(universityIndex, 1);

    return NextResponse.json({ message: 'University deleted successfully' });
  } catch (error) {
    console.error('Error deleting university:', error);
    return NextResponse.json(
      { error: 'Failed to delete university' },
      { status: 500 }
    );
  }
}

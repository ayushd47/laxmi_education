import { NextRequest, NextResponse } from 'next/server';
import { collegesDB, CollegeData } from '../data';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const college = await collegesDB.findById(id);
    
    if (!college) {
      return NextResponse.json({ error: 'College not found' }, { status: 404 });
    }

    return NextResponse.json(college);
  } catch (error) {
    console.error('Error fetching college:', error);
    return NextResponse.json({ error: 'Failed to fetch college' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    // Validate country must be India if provided
    if (body.country && body.country !== 'India') {
      return NextResponse.json({ error: 'Country must be India' }, { status: 400 });
    }
    
    const updatedCollege = await collegesDB.update(id, body);
    
    if (!updatedCollege) {
      return NextResponse.json({ error: `College not found with ID: ${id}` }, { status: 404 });
    }

    return NextResponse.json(updatedCollege);
  } catch (error) {
    console.error('Error updating college:', error);
    return NextResponse.json({ error: 'Failed to update college' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const deleted = await collegesDB.delete(id);
    
    if (!deleted) {
      return NextResponse.json({ error: 'College not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'College deleted successfully' });
  } catch (error) {
    console.error('Error deleting college:', error);
    return NextResponse.json({ error: 'Failed to delete college' }, { status: 500 });
  }
}

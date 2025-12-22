import { NextRequest, NextResponse } from 'next/server';
import { enquiriesStore } from '../data';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const body = await request.json();
    const { status } = body;
    const { id } = await params;

    if (!status) {
      return NextResponse.json({ error: 'Status is required' }, { status: 400 });
    }

    const validStatuses = ['new', 'read', 'contacted', 'resolved'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
    }

    // Find and update the enquiry
    const existingEnquiry = await enquiriesStore.findById(id);
    
    if (!existingEnquiry) {
      return NextResponse.json({ error: 'Enquiry not found' }, { status: 404 });
    }

    // Update the enquiry
    const updatedEnquiry = await enquiriesStore.update(id, {
      status: status as 'new' | 'read' | 'contacted' | 'resolved',
    });

    if (!updatedEnquiry) {
      return NextResponse.json({ error: 'Failed to update enquiry' }, { status: 500 });
    }
    
    return NextResponse.json({
      success: true,
      message: 'Enquiry status updated',
      data: updatedEnquiry
    });
  } catch (error) {
    console.error('Error updating enquiry:', error);
    return NextResponse.json({ error: 'Failed to update enquiry' }, { status: 500 });
  }
}


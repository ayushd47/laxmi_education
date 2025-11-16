import { NextRequest, NextResponse } from 'next/server';
import { enquiriesStore } from '../data';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { status } = body;
    const { id } = params;

    if (!status) {
      return NextResponse.json({ error: 'Status is required' }, { status: 400 });
    }

    const validStatuses = ['new', 'read', 'contacted', 'resolved'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
    }

    // Find and update the enquiry
    const enquiryIndex = enquiriesStore.findIndex(e => e.id === id);
    
    if (enquiryIndex === -1) {
      return NextResponse.json({ error: 'Enquiry not found' }, { status: 404 });
    }

    // Update the enquiry
    enquiriesStore[enquiryIndex] = {
      ...enquiriesStore[enquiryIndex],
      status: status as 'new' | 'read' | 'contacted' | 'resolved',
      updatedAt: new Date().toISOString(),
    };
    
    return NextResponse.json({
      success: true,
      message: 'Enquiry status updated',
      data: enquiriesStore[enquiryIndex]
    });
  } catch (error) {
    console.error('Error updating enquiry:', error);
    return NextResponse.json({ error: 'Failed to update enquiry' }, { status: 500 });
  }
}


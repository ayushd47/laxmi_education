import { NextRequest, NextResponse } from 'next/server';
import { testimonialsStore } from '../data';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const testimonial = await testimonialsStore.findById(params.id);
    
    if (!testimonial) {
      return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 });
    }

    return NextResponse.json(testimonial);
  } catch (error) {
    console.error('Error fetching testimonial:', error);
    return NextResponse.json({ error: 'Failed to fetch testimonial' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    
    // Validate rating if provided
    if (body.rating !== undefined) {
      const rating = parseInt(body.rating);
      if (rating < 1 || rating > 5) {
        return NextResponse.json({ error: 'Rating must be between 1 and 5' }, { status: 400 });
      }
    }

    const updatedTestimonial = await testimonialsStore.update(params.id, body);
    
    if (!updatedTestimonial) {
      return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 });
    }

    console.log('PUT /api/testimonials/[id] - Updated testimonial with ID:', params.id);

    return NextResponse.json(updatedTestimonial);
  } catch (error) {
    console.error('Error updating testimonial:', error);
    return NextResponse.json({ error: 'Failed to update testimonial' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const deleted = await testimonialsStore.delete(params.id);
    
    if (!deleted) {
      return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 });
    }

    console.log('DELETE /api/testimonials/[id] - Deleted testimonial with ID:', params.id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting testimonial:', error);
    return NextResponse.json({ error: 'Failed to delete testimonial' }, { status: 500 });
  }
}








import { NextRequest, NextResponse } from 'next/server';
import { testimonialsStore } from './data';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const publicOnly = searchParams.get('public') === 'true';

    // Get testimonials from database
    let testimonials;
    if (publicOnly) {
      testimonials = await testimonialsStore.findPublished();
    } else {
      testimonials = await testimonialsStore.findAll();
    }

    console.log(`GET /api/testimonials - Found ${testimonials.length} testimonials`);

    return NextResponse.json(testimonials);
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return NextResponse.json({ error: 'Failed to fetch testimonials' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.name || !body.text || !body.university || !body.country || !body.program) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Validate rating
    const rating = parseInt(body.rating) || 5;
    if (rating < 1 || rating > 5) {
      return NextResponse.json({ error: 'Rating must be between 1 and 5' }, { status: 400 });
    }

    // Create testimonial data
    const testimonialData = {
      name: body.name,
      university: body.university,
      country: body.country,
      program: body.program,
      rating: rating,
      text: body.text,
      image: body.image || '',
      status: body.status || 'published',
    };

    const newTestimonial = await testimonialsStore.create(testimonialData);
    
    console.log('POST /api/testimonials - Created testimonial with ID:', newTestimonial.id);

    return NextResponse.json(newTestimonial, { status: 201 });
  } catch (error) {
    console.error('Error creating testimonial:', error);
    return NextResponse.json({ error: 'Failed to create testimonial' }, { status: 500 });
  }
}







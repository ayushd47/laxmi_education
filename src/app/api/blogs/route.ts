import { NextRequest, NextResponse } from 'next/server';
import { blogsStore, BlogData } from './data';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const category = searchParams.get('category');
    const search = searchParams.get('search');

    // Get filtered blogs from database
    let filteredBlogs = await blogsStore.filter({
      status: status || undefined,
      category: category || undefined,
      search: search || undefined,
    });

    console.log('GET /api/blogs - Found blogs:', filteredBlogs.length);

    return NextResponse.json(filteredBlogs);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.title || !body.content || !body.author) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Generate slug from title
    const slug = body.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    // Create blog data (without id, createdAt, updatedAt - these are handled by DB)
    const blogData = {
      title: body.title,
      slug,
      excerpt: body.excerpt || body.content.substring(0, 200) + '...',
      content: body.content,
      author: body.author,
      authorId: body.authorId || 'admin',
      category: body.category || 'General',
      tags: body.tags || [],
      status: body.status || 'draft',
      featuredImage: body.featuredImage || '/blog/default.jpg',
      publishedAt: body.status === 'published' ? new Date().toISOString().split('T')[0] : undefined,
      views: 0,
      likes: 0,
      comments: 0,
      seoTitle: body.seoTitle || body.title,
      seoDescription: body.seoDescription || body.excerpt,
      seoKeywords: body.seoKeywords || []
    };

    const newBlog = await blogsStore.create(blogData);
    
    console.log('POST /api/blogs - Created blog with ID:', newBlog.id);

    return NextResponse.json(newBlog, { status: 201 });
  } catch (error) {
    console.error('Error creating blog:', error);
    return NextResponse.json({ error: 'Failed to create blog' }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { blogsStore, BlogData } from '../data';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const blog = blogsStore.find(b => b.id === id);
    
    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    return NextResponse.json(blog);
  } catch (error) {
    console.error('Error fetching blog:', error);
    return NextResponse.json({ error: 'Failed to fetch blog' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const blogIndex = blogsStore.findIndex(b => b.id === id);
    
    if (blogIndex === -1) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    // Update blog
    const updatedBlog: BlogData = {
      ...blogsStore[blogIndex],
      ...body,
      id: id,
      updatedAt: new Date().toISOString(),
      publishedAt: body.status === 'published' && !blogsStore[blogIndex].publishedAt 
        ? new Date().toISOString().split('T')[0] 
        : blogsStore[blogIndex].publishedAt
    };

    blogsStore[blogIndex] = updatedBlog;

    return NextResponse.json(updatedBlog);
  } catch (error) {
    console.error('Error updating blog:', error);
    return NextResponse.json({ error: 'Failed to update blog' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const blogIndex = blogsStore.findIndex(b => b.id === id);
    
    if (blogIndex === -1) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    blogsStore.splice(blogIndex, 1);

    return NextResponse.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    console.error('Error deleting blog:', error);
    return NextResponse.json({ error: 'Failed to delete blog' }, { status: 500 });
  }
}

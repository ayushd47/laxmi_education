import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';

// Force dynamic rendering - this route uses request headers
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const revalidate = 0;

export async function GET(request: NextRequest) {
  try {
    // Access headers directly in the handler to avoid static analysis issues
    const authHeader = request.headers.get('authorization');
    let token: string | null = null;
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7);
    } else {
      // Also check cookies
      const cookieToken = request.cookies.get('admin-token')?.value;
      token = cookieToken || null;
    }
    
    if (!token) {
      return NextResponse.json(
        { success: false, message: 'No token provided' },
        { status: 401 }
      );
    }

    const user = verifyToken(token);
    
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Invalid token' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      user
    });
  } catch (error) {
    console.error('Token verification error:', error);
    return NextResponse.json(
      { success: false, message: 'Token verification failed' },
      { status: 500 }
    );
  }
}

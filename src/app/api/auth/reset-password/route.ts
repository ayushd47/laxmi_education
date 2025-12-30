import { NextRequest, NextResponse } from 'next/server';
import { passwordResetTokens, findAdminByEmail, updateAdminPassword, hashPassword } from '@/lib/admin-users';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const { token, password } = await request.json();

    if (!token || !password) {
      return NextResponse.json(
        { success: false, message: 'Token and password are required' },
        { status: 400 }
      );
    }

    // Validate password strength
    if (password.length < 8) {
      return NextResponse.json(
        { success: false, message: 'Password must be at least 8 characters long' },
        { status: 400 }
      );
    }

    // Check if token exists and is valid
    const resetData = passwordResetTokens.get(token);
    
    if (!resetData) {
      return NextResponse.json(
        { success: false, message: 'Invalid or expired reset token' },
        { status: 400 }
      );
    }

    // Check if token has expired
    if (Date.now() > resetData.expiresAt) {
      passwordResetTokens.delete(token);
      return NextResponse.json(
        { success: false, message: 'Reset token has expired. Please request a new one.' },
        { status: 400 }
      );
    }

    // Find user
    const user = findAdminByEmail(resetData.email);
    
    if (!user) {
      passwordResetTokens.delete(token);
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    // Hash new password
    const newPasswordHash = await hashPassword(password);

    // Update password
    const updated = updateAdminPassword(resetData.email, newPasswordHash);
    
    if (!updated) {
      return NextResponse.json(
        { success: false, message: 'Failed to update password' },
        { status: 500 }
      );
    }

    // Delete used token
    passwordResetTokens.delete(token);

    return NextResponse.json({
      success: true,
      message: 'Password has been reset successfully. You can now login with your new password.'
    });
  } catch (error) {
    console.error('Reset password error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}




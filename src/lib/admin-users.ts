import bcrypt from 'bcryptjs';

export interface AdminUserData {
  id: string;
  email: string;
  passwordHash: string;
  name: string;
  role: 'admin' | 'super-admin';
}

// In production, this should be stored in a database
// For now, we'll use an in-memory store
// Default password is 'admin123' - should be changed on first login
const DEFAULT_PASSWORD = 'admin123';

// Hash the default password
const defaultPasswordHash = bcrypt.hashSync(DEFAULT_PASSWORD, 10);

export const ADMIN_USERS: AdminUserData[] = [
  {
    id: '1',
    email: 'laxmieducationconsultancy1@gmail.com',
    passwordHash: defaultPasswordHash,
    name: 'Admin User',
    role: 'admin'
  }
];

// Password reset tokens (in production, use Redis or database)
export const passwordResetTokens = new Map<string, { email: string; expiresAt: number }>();

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export function findAdminByEmail(email: string): AdminUserData | undefined {
  return ADMIN_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
}

export function updateAdminPassword(email: string, newPasswordHash: string): boolean {
  const user = findAdminByEmail(email);
  if (user) {
    user.passwordHash = newPasswordHash;
    return true;
  }
  return false;
}




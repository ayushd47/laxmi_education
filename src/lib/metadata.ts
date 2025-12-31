/**
 * Get the base URL for the application
 * Uses NEXT_PUBLIC_BASE_URL environment variable or falls back to localhost in development
 */
export function getBaseUrl(): string {
  // In production, use the environment variable
  if (process.env.NEXT_PUBLIC_BASE_URL) {
    return process.env.NEXT_PUBLIC_BASE_URL;
  }
  
  // In development, use localhost
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:3000';
  }
  
  // Fallback for Vercel preview deployments
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  
  // During build time, return a safe fallback
  if (typeof window === 'undefined' && !process.env.VERCEL && !process.env.NEXT_PUBLIC_BASE_URL) {
    return 'https://laxmieducation.com';
  }
  
  // Final fallback
  return 'https://laxmieducation.com';
}

/**
 * Get the full URL for a path
 */
export function getUrl(path: string): string {
  const baseUrl = getBaseUrl();
  return `${baseUrl}${path.startsWith('/') ? path : `/${path}`}`;
}
















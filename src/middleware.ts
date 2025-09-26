import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Odoo proxy middleware
  if (request.nextUrl.pathname.startsWith('/odoo/')) {
    // In production, this would proxy to actual Odoo server
    // For demo purposes, we'll return a placeholder response
    const odooUrl = process.env.ODOO_URL || 'https://demo.odoo.com';
    const targetUrl = new URL(request.nextUrl.pathname.replace('/odoo', ''), odooUrl);
    
    // Copy search params
    request.nextUrl.searchParams.forEach((value, key) => {
      targetUrl.searchParams.set(key, value);
    });

    // Security headers for Odoo integration
    const response = NextResponse.rewrite(targetUrl);
    response.headers.set('X-Frame-Options', 'SAMEORIGIN');
    response.headers.set('Content-Security-Policy', "frame-ancestors 'self'");
    response.headers.set('X-Content-Type-Options', 'nosniff');
    
    return response;
  }

  // API routes for Odoo integration
  if (request.nextUrl.pathname.startsWith('/api/odoo/')) {
    return NextResponse.next();
  }

  // Default CSP for the app
  const response = NextResponse.next();
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self';"
  );

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
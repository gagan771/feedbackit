


import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export const config = {
  matcher: ['/dashboard/:path*', '/sign-in', '/sign-up', '/', '/verify/:path*'], // Define routes where middleware should be applied
};

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;

  // Redirect authenticated users away from sign-in, sign-up, or verify pages to dashboard
  if (
    token &&
    ['/sign-in', '/sign-up', '/verify', '/'].some((path) => url.pathname.startsWith(path))
  ) {
    return NextResponse.redirect(new URL('/dashboard', url.origin));
  }

  // Redirect unauthenticated users trying to access protected routes to sign-in
  if (!token && url.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/sign-in', url.origin));
  }

  return NextResponse.next(); // Allow access if none of the conditions are met
}

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  // Add a new header x-current-path which passes the path to downstream components
  const protectedPaths = ['kru']
  const session = request.cookies.get('session')

  if (protectedPaths.includes(request.nextUrl.pathname.split('/')[1]!) && !session) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  // if (request.nextUrl.pathname === '/sign-out' && !session) {
  //   return NextResponse.redirect(new URL('/sign-in', request.url));
  // }

  // if (request.nextUrl.pathname === '/sign-in' && session) {
  //   return NextResponse.redirect(new URL('/dashboard', request.url));
  // }
}

export const config = {
  matcher: [
    // match all routes except static files and APIs
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};

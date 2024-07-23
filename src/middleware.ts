import {type JWTPayload, jwtVerify } from 'jose';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { env } from './env';
import type { Role } from '@prisma/client';

const key = new TextEncoder().encode(env.AUTH_SECRET);
async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, key, {
      algorithms: ["HS256"],
    });
    return payload as JWTPayload & {
      userId: string;
      role: Role;
      division: string;
      uname: string;
      name?: string;
    };
  } catch (err) {
    console.log("Error decrypting session");
    return null;
  }
}

export async function middleware(request: NextRequest) {
  // Add a new header x-current-path which passes the path to downstream components
  const protectedPaths = ['kru']
  const session = request.cookies.get('session')?.value;
  const data = await decrypt(session);

  if (protectedPaths.includes(request.nextUrl.pathname.split('/')[1]!) && !(data?.role === 'KRU')) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  if (request.nextUrl.pathname.split('/')[1] === 'cakru' && !(data?.role === 'CAKRU')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (request.nextUrl.pathname === '/sign-out' && !data) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  if (request.nextUrl.pathname === '/sign-in' && data?.role === "CAKRU") {
    return NextResponse.redirect(new URL('/cakru/' + data.userId, request.url));
  }
  if (request.nextUrl.pathname === '/sign-in' && data?.role === "KRU") {
    return NextResponse.redirect(new URL('/kru/' + data.userId, request.url));
  }

}

export const config = {
  matcher: [
    // match all routes except static files and APIs
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};

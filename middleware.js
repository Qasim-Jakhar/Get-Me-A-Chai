// middleware.js
import { NextResponse } from 'next/server'

export default function middleware(req) {
  const sessionCookie =
    req.cookies.get('next-auth.session-token') ||
    req.cookies.get('__Secure-next-auth.session-token') // used in production (https)

  if (req.nextUrl.pathname === '/login' && sessionCookie) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/login', '/dashboard', '/[username]'],
}
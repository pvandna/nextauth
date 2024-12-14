
// src/middleware.js
import { NextResponse } from 'next/server';
import * as cookie from 'cookie';

export function middleware(request) {
  const cookies = cookie.parse(request.headers.get('cookie') || '');
  const token = cookies.token;

//   console.log("Middleware - token:", token); // Debugging: log the token

  // If no token exists, redirect to home page
  if (!token) {
    console.log("Middleware - No token, redirecting to home");
    return NextResponse.redirect(new URL('/', request.url));  // Redirect to login/home
  }

  // If token exists, pass the request to the next step
  console.log("Middleware - Token found, allowing request");
  return NextResponse.next();
}

// Apply this middleware only to the `/dashboard` route
export const config = {
  matcher: ['/api', '/dashboard'], // Apply middleware to these routes
};













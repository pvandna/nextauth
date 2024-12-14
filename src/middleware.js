
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








// import { NextResponse } from 'next/server';
// import * as cookie from 'cookie';
// import { verifyToken } from './lib/auth';  // Assuming verifyToken is a function that verifies and decodes the JWT

// export function middleware(request) {
//   // Parse cookies from the request
//   const cookies = cookie.parse(request.headers.get('cookie') || '');
//   const token = cookies.token;

//   // Debugging: Log the token to see its value
//   console.log("Middleware - token:", token); // Log the token for debugging

//   // If no token exists, redirect to the home page (login page)
//   if (!token) {
//     console.log("Middleware - No token, redirecting to home");

//     // Clear the token cookie (if exists) by setting it with an expired date
//     const response = NextResponse.redirect(new URL('/', request.url));

//     // Set the cookie with an expired date to clear it
//     response.headers.append('Set-Cookie', cookie.serialize('token', '', {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === 'production',
//       maxAge: 0,  // Set to 0 to immediately expire the cookie
//       path: '/',
//       sameSite: 'strict',
//     }));

//     return response;
//   }

//   // Verify the token if it exists
//   const decodedToken = verifyToken(token);

//   // If the token is invalid or expired, clear the cookie and redirect to login
//   if (!decodedToken) {
//     console.log("Middleware - Token expired or invalid, redirecting to home");

//     // Clear the token cookie by setting it with an expired date
//     const response = NextResponse.redirect(new URL('/', request.url));

//     // Set the cookie with an expired date to clear it
//     response.headers.append('Set-Cookie', cookie.serialize('token', '', {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === 'production',
//       maxAge: 0,  // Set to 0 to immediately expire the cookie
//       path: '/',
//       sameSite: 'strict',
//     }));

//     return response;
//   }

//   // If token exists and is valid, allow the request to pass through
//   console.log("Middleware - Token found and valid, allowing request");
//   return NextResponse.next();  // Allow the request to continue
// }

// // Apply this middleware only to specific routes like `/api` and `/dashboard`
// export const config = {
//   matcher: ['/api', '/dashboard'], // Apply the middleware to these routes only
// };




import { NextResponse } from 'next/server';
import * as  cookie from 'cookie';

export async function POST() {
  // Clear the 'token' cookie

  const response = NextResponse.json({ message: 'Logged out successfully' });

  // Set cookie expiration to 0 to delete it
  response.headers.append('Set-Cookie', cookie.serialize('token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',  // Ensure only over HTTPS in production
    maxAge: 0,  // Expire the cookie immediately
    path: '/',
    sameSite: 'strict',  // CSRF protection
  }));

  return response;
}

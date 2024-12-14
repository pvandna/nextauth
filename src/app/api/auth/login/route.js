// app/api/auth/login/route.js
import { NextResponse } from 'next/server';
import { generateToken } from '../../../../lib/auth';
import * as cookie from 'cookie';

export async function POST(request) {
  const { username, password } = await request.json();

  // Dummy user for simplicity
  const user = {
    id: 1,
    username: 'admin',
    password: '1234', // In production, compare securely (hash passwords)
  };

  if (username === user.username && password === user.password) {
    // Generate JWT token
    const token = generateToken(user);

    // console.log("tokenmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm",token)

    // Set token as HTTP-only cookie
    const response = NextResponse.json({ message: 'Login successful' });
    response.headers.append('Set-Cookie', cookie.serialize('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 5 * 60, // 1 hour
      path: '/',
      sameSite: 'strict',  
    }));

    // console.log("respnose",response)

    return response;
  } else {
    return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
  }
}

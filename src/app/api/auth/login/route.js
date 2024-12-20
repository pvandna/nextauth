import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { generateToken } from '@/lib/auth';
import * as cookie from 'cookie';
import connectToDatabase from '../../../../lib/db';
import User from '../../../../lib/models/user';

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key'; // Use a secure environment variable

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { message: 'Username and password are required.' },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const user = await User.findOne({ username });

    if (!user) {
      return NextResponse.json(
        { message: 'Username not found. Please sign up first.' },
        { status: 404 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: 'Invalid credentials.' },
        { status: 401 }
      );
    }

    const token =generateToken(user)

    const response = NextResponse.json({
      message: 'Login successful',
      user: { username: user.username, role: user.role },
    });

    response.headers.append(
      'Set-Cookie',
      cookie.serialize('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60, // 1 hour
        path: '/',
        sameSite: 'strict',
      })
    );

    return response;
  } catch (error) {
    console.error('Error during login:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

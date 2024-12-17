//// with mongo db  with bycrpt
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { generateToken } from '../../../../lib/auth';
import * as cookie from 'cookie';
import connectToDatabase from '../../../../lib/db';
import User from '../../../../lib/models/user';

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    // Connect to the database
    await connectToDatabase();

    // Find user in the database by username
    const user = await User.findOne({ username });

    if (!user) {
      // If user doesn't exist
      return NextResponse.json(
        { message: 'Username not found. Please sign up first.' },
        { status: 404 }
      );
    }

    // Compare input password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      // If password doesn't match
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Generate JWT token if credentials are correct
    const token = generateToken(user);

    // Set token as HTTP-only cookie
    const response = NextResponse.json({ message: 'Login successful' });
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











// //// with mongo db  without bycrpt
// import { NextResponse } from 'next/server';
// import { generateToken } from '../../../../lib/auth';
// import * as cookie from 'cookie';
// import connectToDatabase from '../../../../lib/db';
// import User from '../../../../lib/models/user';

// export async function POST(request) {
//   const { username, password } = await request.json();

//   // Connect to the database
//   await connectToDatabase();

//   // Find user in the database by username
//   const user = await User.findOne({ username });

//   if (!user) {
//     // If user doesn't exist, return a message to sign up
//     return NextResponse.json(
//       { message: 'Username not found. Please sign up first.' },
//       { status: 404 }
//     );
//   }

//   // If the user exists, check if the password matches
//   if (user.password !== password) {
//     // If password doesn't match, return "Invalid credentials"
//     return NextResponse.json(
//       { message: 'Invalid credentials' },
//       { status: 401 }
//     );
//   }

//   // Generate JWT token if credentials are correct
//   const token = generateToken(user);

//   // Set token as HTTP-only cookie
//   const response = NextResponse.json({ message: 'Login successful' });
//   response.headers.append(
//     'Set-Cookie',
//     cookie.serialize('token', token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === 'production',
//       maxAge: 5 * 60, // 5 minutes
//       path: '/',
//       sameSite: 'strict',
//     })
//   );

//   return response;
// }











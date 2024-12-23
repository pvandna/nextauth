//if i dont want to verfy cookie
// import { NextResponse } from 'next/server';

// export async function GET(request) {
//   // If you reach here, the token has already been verified in the middleware.
//   // Now you can access the protected data

//   return NextResponse.json({ message: 'You are authorized to see this message.' });
// }



//if i want only very cookie and decline requrst
// import { NextResponse } from 'next/server';
// import * as cookie from 'cookie';
// import { verifyToken } from '../../../../lib/auth'; // Adjust the path to your `verifyToken` function

// export async function GET(request) {
//   // Parse cookies from the request
//   const cookies = cookie.parse(request.headers.get('cookie') || '');
//   const token = cookies.token;

//   if (!token) {
//     // If no token is present, return an unauthorized response
//     return NextResponse.json({ message: 'Unauthorized: No token provided' }, { status: 401 });
//   }

//   // Verify the token
//   const decodedToken = verifyToken(token);

//   if (!decodedToken) {
//     // If the token is invalid or expired, return an unauthorized response
//     return NextResponse.json({ message: 'Unauthorized: Invalid or expired token' }, { status: 401 });
//   }

//   // If the token is valid, return the protected data
//   return NextResponse.json({ message: 'You are authorized to see this message.', user: decodedToken });
// }






//if i want only very cookie and decline request and also clear cookie from browser
import { NextResponse } from 'next/server';
import * as cookie from 'cookie';
import { verifyToken } from '../../../../lib/auth'; // Adjust the path to your `verifyToken` function

export async function GET(request) {
  // Parse cookies from the request
  // console.log("ghgcghcghhggggggggggggggggggggggggggggggggggggggggggg",request)
  const cookies = cookie.parse(request.headers.get('cookie') || '');
  const token = cookies.token;

  if (!token) {
    // If no token is present, return an unauthorized response
    return NextResponse.json({ message: 'Unauthorized: No token provided' }, { status: 401 });
  }

  // Verify the token
  const decodedToken = verifyToken(token);

  if (!decodedToken) {
    // If the token is invalid or expired, clear the cookie and return an unauthorized response
    const response = NextResponse.json({ message: 'Unauthorized: Invalid or expired token' }, { status: 401 });

    // Clear the token cookie
    response.headers.append(
      'Set-Cookie',
      cookie.serialize('token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 0, // Expire the cookie immediately
        path: '/',
        sameSite: 'strict',
      })
    );

    return response;
  }

  // If the token is valid, return the protected data
  return NextResponse.json({ message: 'You are authorized to see this message.', user: decodedToken });
}

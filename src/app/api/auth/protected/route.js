// app/api/auth/protected/route.js
// import { NextResponse } from 'next/server';
// import { verifyToken } from '../../../../lib/auth';

// export async function GET(request) {

//   const cookies = request.cookies;
//   const token = cookies.get('token');
// //   console.log("van token",token)

//   if (!token) {
//     return NextResponse.json({ message: 'Authentication required' }, { status: 401 });
//   }

//   // Verify the token
//   const decoded = verifyToken(token.value);

//   if (!decoded) {
//     return NextResponse.json({ message: 'Invalid or expired token' }, { status: 401 });
//   }

//   // If token is valid
//   return NextResponse.json({ message: 'You are authorized', user: decoded });
// }




import { NextResponse } from 'next/server';

export async function GET(request) {
  // If you reach here, the token has already been verified in the middleware.
  // Now you can access the protected data

  return NextResponse.json({ message: 'You are authorized to see this message.' });
}

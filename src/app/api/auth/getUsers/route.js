// app/api/auth/getUsers/route.js
import { NextResponse } from 'next/server';
import { verifyToken } from '../../../../lib/auth'; // Token verification function
import User from '@/lib/models/user'; // User model
import * as cookie from 'cookie'; // Cookie parsing library

export async function GET(req) {
  try {
    // Extract token from cookies
     const cookies = cookie.parse(req.headers.get('cookie') || ''); // Parse cookies from the request
    const token = cookies.token;  // Retrieve token from the cookie
    console.log("getUsersssssssss token",token)
    if (!token) {
     
      return NextResponse({message:'Authorization token is required'}, { status: 401 });
    }

    // Verify the token and decode it
    const decoded =  verifyToken(token);

    if (!decoded) {
      return NextResponse({message:'Invalid or expired token'}, { status: 401 });
    }

    const { username, role } = decoded;  // Extract user data from token

    // Fetch users based on the role
    let users;
    if (role === 'admin') {
      // Admin can see all users
      users = await User.find({}).select('username role');
    } else {
      // Regular user can only see their own data
      users = await User.find({ username }).select('username role');
    }

    // Return the users' data
    return new Response(JSON.stringify(users), { status: 200 });
  } catch (error) {
    return NextResponse({message:'Error fetching data from MongoDB: ' + error.message}, { status: 500 });
  }
}





// // app/api/getUsers/route.js  directly from db

// import connectToDatabase from '@/lib/db';
// import User from '@/lib/models/user';
// import { verifyToken } from '../../../../lib/auth';
 

// export async function GET() {
//   try {
//     // Connect to the database
//     await connectToDatabase();

//     // Query users from the 'admin_login' collection
//     const users = await User.find({}).select('username role'); // Select the username and role fields

//     return new Response(JSON.stringify(users), { status: 200 });
//   } catch (error) {
//     return new Response('Error fetching data from MongoDB', { status: 500 });
//   }
// }

import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
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

    const usersCount = await User.countDocuments();
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return NextResponse.json(
        { message: 'Username already exists.' },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const role = usersCount === 0 ? 'admin' : 'user';

    const newUser = new User({ username, password: hashedPassword, role });
    await newUser.save();

    return NextResponse.json(
      { message: 'Signup successful', user: { username, role } },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error during signup:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}













// import { NextResponse } from 'next/server';
// import bcrypt from 'bcrypt';
// import { generateToken } from '@/lib/auth';
// import * as cookie from 'cookie';
// import connectToDatabase from '../../../../lib/db';
// import User from '../../../../lib/models/user';

// const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key'; // Use a secure environment variable

// export async function POST(request) {
//   try {
//     const { username, password } = await request.json();

//     // Check if username and password are provided
//     if (!username || !password) {
//       return NextResponse.json(
//         { message: 'Username and password are required.' },
//         { status: 400 }
//       );
//     }

//     // Connect to the database
//     await connectToDatabase();

//     // Check if the user already exists
//     const existingUser = await User.findOne({ username });

//     if (existingUser) {
//       return NextResponse.json(
//         { message: 'Username already exists.' },
//         { status: 409 } // Conflict (user already exists)
//       );
//     }

//     // Hash the password before saving
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create a new user with the hashed password
//     const newUser = new User({ username, password: hashedPassword, role: 'user' });
//     await newUser.save();

//     // Generate JWT token after user is created
//     const token = generateToken(newUser);

//     // Prepare the response
//     const response = NextResponse.json({
//       message: 'Signup successful',
//       user: { username: newUser.username, role: newUser.role },
//     });

//     // Set the JWT token in an HTTP-only cookie
//     response.headers.append(
//       'Set-Cookie',
//       cookie.serialize('token', token, {
//         httpOnly: true, // Prevent JavaScript access to the cookie
//         secure: process.env.NODE_ENV === 'production', // Only set cookie over HTTPS in production
//         maxAge: 60 * 60, // Set the cookie expiration to 1 hour
//         path: '/', // The cookie is accessible for the whole app
//         sameSite: 'strict', // Protect against cross-site request forgery
//       })
//     );

//     return response; // Return the response with the cookie set
//   } catch (error) {
//     console.error('Error during signup:', error);
//     return NextResponse.json(
//       { message: 'Internal Server Error' },
//       { status: 500 }
//     );
//   }
// }










// import { NextResponse } from 'next/server';
// import bcrypt from 'bcrypt';
// import { generateToken } from '@/lib/auth';
// import * as cookie from 'cookie';
// import connectToDatabase from '../../../../lib/db';
// import User from '../../../../lib/models/user';

// const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key'; // Use a secure environment variable

// export async function POST(request) {
//   try {
//     const { username, password } = await request.json();

//     // Check if username and password are provided
//     if (!username || !password) {
//       return NextResponse.json(
//         { message: 'Username and password are required.' },
//         { status: 400 }
//       );
//     }

//     // Connect to the database
//     await connectToDatabase();

//     // Check if the user already exists
//     const existingUser = await User.findOne({ username });

//     if (existingUser) {
//       return NextResponse.json(
//         { message: 'Username already exists.' },
//         { status: 409 } // Conflict (user already exists)
//       );
//     }

//     // Hash the password before saving
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create a new user with the hashed password
//     const newUser = new User({ username, password: hashedPassword, role: 'user' });
//     await newUser.save();

//     // Generate JWT token after user is created
//     const token = generateToken(newUser);

//     // Prepare the response
//     const response = NextResponse.json({
//       message: 'Signup successful',
//       user: { username: newUser.username, role: newUser.role },
//     });

//     // Set the JWT token in an HTTP-only cookie
//     response.headers.append(
//       'Set-Cookie',
//       cookie.serialize('token', token, {
//         httpOnly: true, // Prevent JavaScript access to the cookie
//         secure: process.env.NODE_ENV === 'production', // Only set cookie over HTTPS in production
//         maxAge: 60 * 60, // Set the cookie expiration to 1 hour
//         path: '/', // The cookie is accessible for the whole app
//         sameSite: 'strict', // Protect against cross-site request forgery
//       })
//     );

//     // Redirect to the login page after successful signup
//     return NextResponse.redirect('/login'); // Change this to the path of your login page

//   } catch (error) {
//     console.error('Error during signup:', error);
//     return NextResponse.json(
//       { message: 'Internal Server Error' },
//       { status: 500 }
//     );
//   }
// }

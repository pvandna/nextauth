////with bcrypt
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import connectToDatabase from '../../../../lib/db';
import User from '../../../../lib/models/user';

export async function POST(request) {
  try {
    // Parse incoming JSON data
    const { username, password } = await request.json();

    // Input validation
    if (!username || !password) {
      return NextResponse.json(
        { message: 'Username and password are required.' },
        { status: 400 }
      );
    }

    // Connect to the database
    await connectToDatabase();

    // Check if the user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return NextResponse.json(
        { message: 'User already exists with this username.' },
        { status: 409 }
      );
    }

    // Hash the password
    const saltRounds = 10; // Number of salt rounds for bcrypt
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create and save the new user
    const newUser = new User({
      username,
      password: hashedPassword, // Store the hashed password
    });

    await newUser.save();

    // Return success response
    return NextResponse.json(
      { message: 'User registered successfully.', user: { username } },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error saving user:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}




////without bycrypt

// import { NextResponse } from 'next/server';
// import connectToDatabase from '../../../../lib/db';
// import User from '../../../../lib/models/user'; // Existing Users model

// export async function POST(request) {
//   try {
//     // Parse incoming JSON data
//     const { username,  password } = await request.json();

//     // Input validation
//     if (!username  || !password) {
//       return NextResponse.json(
//         { message: 'Username and password are required.' },
//         { status: 400 }
//       );
//     }

//     // Connect to the database
//     await connectToDatabase();

//     // Check if the user already exists by email
//     const existingUser = await User.findOne({ username });
//     if (existingUser) {
//       return NextResponse.json(
//         { message: 'User already exists with this usename.' },
//         { status: 409 }
//       );
//     }

//     // Create and save the new user
//     const newUser = new User({
//       username,
//       password, // Plain text for now (not recommended for production)
//     });
    


//     await newUser.save();
    
//     // Return success response
//     return NextResponse.json(
//       { message: 'User registered successfully.', user: { username } },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error('Error saving user:', error);
//     return NextResponse.json(
//       { message: 'Internal Server Error' },
//       { status: 500 }
//     );
//   }
// }












import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import connectToDatabase from '../../../../lib/db';
import User from '../../../../lib/models/user';

export async function POST(request) {
  const { token, newPassword } = await request.json();

  await connectToDatabase();

  try {
    // Verify the token and extract the user ID
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const userId = decoded.userId;

    // Find the user in the database
    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json(
        { message: 'Invalid or expired reset token.' },
        { status: 400 }
      );
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password and clear the reset token
    user.password = hashedPassword;
    await user.save();

    return NextResponse.json({ message: 'Password reset successfully.' });
  } catch (error) {
    console.error('Error verifying token:', error);
    return NextResponse.json(
      { message: 'Invalid or expired reset token.' },
      { status: 400 }
    );
  }
}






// import { NextResponse } from 'next/server';
// import connectToDatabase from '../../../../lib/db';
// import User from '../../../../lib/models/user';

// export async function POST(request) {
//   const { token, newPassword } = await request.json();

//   await connectToDatabase();

//   const user = await User.findOne({ resetToken: token });

//   if (!user) {
//     return NextResponse.json(
//       { message: 'Invalid or expired reset token.' },
//       { status: 400 }
//     );
//   }

//   // Update password and clear reset token
//   user.password = newPassword; // Use bcrypt in production
//   user.resetToken = undefined;
//   await user.save();

//   return NextResponse.json({ message: 'Password reset successfully.' });
// }

////this code clear mongo atlash reset token only when user succesfully reset password
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
    const { userId, username } = decoded;

    // Find the user in the database
    const user = await User.findById(userId);

    if (!user || user.username !== username) {
      return NextResponse.json(
        { message: 'Invalid or expired reset token.' },
        { status: 400 }
      );
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password and clear the reset token
    user.password = hashedPassword;
    user.resetToken = undefined;
    await user.save();

    return NextResponse.json({ message: 'Password reset successfully.' });
  } catch (error) {
    console.error('Error verifying token:', error);
    return NextResponse.json(
      { message: 'Invalid or expired reset token please regenerate email link again.' },
      { status: 400 }
    );
  }
}









////this code clear mongo atlash reset token after invalid expire to
// import { NextResponse } from 'next/server';
// import jwt from 'jsonwebtoken';
// import bcrypt from 'bcrypt';
// import connectToDatabase from '../../../../lib/db';
// import User from '../../../../lib/models/user';

// export async function POST(request) {
//   const { token, newPassword } = await request.json();

//   await connectToDatabase();

//   try {
//     // Verify the token and extract the user ID
//     const decoded = jwt.verify(token, process.env.SECRET_KEY);
//     const userId = decoded.userId;

//     // Find the user in the database
//     const user = await User.findById(userId);

//     if (!user) {
//       return NextResponse.json(
//         { message: 'Invalid or expired reset token.' },
//         { status: 400 }
//       );
//     }

//     // Hash the new password
//     const hashedPassword = await bcrypt.hash(newPassword, 10);

//     // Update the user's password and clear the reset token
//     user.password = hashedPassword;
//     user.resetToken = undefined; // Clear token only on successful reset
//     await user.save();

//     return NextResponse.json({ message: 'Password reset successfully.' });
//   } catch (error) {
//     if (error.name === 'TokenExpiredError') {
//       console.error('Reset token expired:', error);

//       // Find the user by the resetToken and clear it from the database
//       const user = await User.findOne({ resetToken: token });
//       if (user) {
//         user.resetToken = undefined;
//         await user.save();
//       }

//       return NextResponse.json(
//         { message: 'Reset token has expired. Please request a new one.' },
//         { status: 400 }
//       );
//     } else {
//       console.error('Error verifying token:', error);

//       // Find the user by the resetToken and clear it from the database
//       const user = await User.findOne({ resetToken: token });
//       if (user) {
//         user.resetToken = undefined;
//         await user.save();
//       }

//       return NextResponse.json(
//         { message: 'Invalid or expired reset token.' },
//         { status: 400 }
//       );
//     }
//   }
// }


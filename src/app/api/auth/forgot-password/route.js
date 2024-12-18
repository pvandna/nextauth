import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import connectToDatabase from '../../../../lib/db';
import User from '../../../../lib/models/user';

export async function POST(request) {
  const { username } = await request.json();

  await connectToDatabase();

  const user = await User.findOne({ username });

  if (!user) {
    return NextResponse.json(
      { message: 'User not found.' },
      { status: 404 }
    );
  }

  // Generate a secure reset token
  const resetToken = jwt.sign(
    { userId: user._id },
    process.env.SECRET_KEY, // Store this secret securely in your environment
    { expiresIn: '15m' } // Token expires in 15 minutes
  );

  // Configure Nodemailer
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Email content
  const resetLink = `http://localhost:3000/resetPassword?token=${resetToken}`;
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: user.username, // Assuming username is the email
    subject: 'Password Reset Request',
    html: `
      <h1>Password Reset Request</h1>
      <p>Hi ${user.username},</p>
      <p>We received a request to reset your password. You can reset it using the link below:</p>
      <a href="${resetLink}" target="_blank">${resetLink}</a>
      <p>If you did not request a password reset, you can ignore this email.</p>
    `,
  };

  try {
    // Send the email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      message: 'Password reset link has been sent to your email.',
    });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { message: 'Failed to send email. Please try again later.' },
      { status: 500 }
    );
  }
}

















// import { NextResponse } from 'next/server';
// import nodemailer from 'nodemailer';
// import connectToDatabase from '../../../../lib/db';
// import User from '../../../../lib/models/user';

// export async function POST(request) {
//   const { username } = await request.json();

//   await connectToDatabase();

//   const user = await User.findOne({ username });

//   if (!user) {
//     return NextResponse.json(
//       { message: 'User not found.' },
//       { status: 404 }
//     );
//   }

//   // Generate a reset token (mock example)
//   const resetToken = `token-${Math.random().toString(36).substring(2)}`;

//   // Save reset token to the database (you can add token expiration logic here)
//   user.resetToken = resetToken;
//   await user.save();

//   // Configure Nodemailer
//   const transporter = nodemailer.createTransport({
//     service: 'Gmail', // or another service like Outlook, Yahoo, etc.
//     auth: {
//       user: process.env.EMAIL_USER, // Your email address
//       pass: process.env.EMAIL_PASS, // Your email password or app-specific password
//     },
//   });
// console.log("gmail ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;; ",transporter)
//   // Email content
//   const resetLink = `http://localhost:3000/resetPassword?token=${resetToken}`;
//   console.log("reset token............",resetLink)
//   const mailOptions = {
//     from: process.env.EMAIL_USER,
//     to: user.username, // Assuming username is an email
//     subject: 'Password Reset Request',
//     html: `
//       <h1>Password Reset Request</h1>
//       <p>Hi ${user.username},</p>
//       <p>We received a request to reset your password. You can reset it using the link below:</p>
//       <a href="${resetLink}" target="_blank">${resetLink}</a>
//       <p>If you did not request a password reset, you can ignore this email.</p>
//     `,
//   };

//   try {
//     // Send the email
//     await transporter.sendMail(mailOptions);

//     return NextResponse.json({
//       message: 'Password reset link has been sent to your email.',
//     });
//   } catch (error) {
//     console.error('Error sending email:', error);
//     return NextResponse.json(
//       { message: 'Failed to send email. Please try again later.' },
//       { status: 500 }
//     );
//   }
// }

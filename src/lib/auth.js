// lib/auth.js
import jwt from 'jsonwebtoken';
// Generate JWT token
export const generateToken = (user) => {
  return jwt.sign({ id: user.id, username: user.username }, process.env.SECRET_KEY, {
    expiresIn: '1h', // Set expiration time
  });
};

export const verifyToken = (token) => {
    // console.log("vanauthtoken---------",token)
  try {
    // Replace 'your-secret-key' with the actual secret key you use for JWT
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    return decoded; // Return decoded token if valid
  } catch (error) {
    return null; // Return null if token is invalid or expired
  }
};

// Verify JWT token
// export const verifyToken = (token) => {
//   try {
//     return jwt.verify(token, process.env.SECRET_KEY);
//   } catch (error) {
//     return null; // Token is invalid or expired
//   }
// };








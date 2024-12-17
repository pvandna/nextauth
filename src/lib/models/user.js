

import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // In production, store hashed passwords
}, {
  collection: 'admin_login' ,// Replace 'users' with your desired collection name
  timestamps:true
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
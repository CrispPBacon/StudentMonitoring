import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
      lowercase: true,
      trim: true,
    },
    first_name: {
      type: String,
      required: [true, 'First name is required'],
      lowercase: true,
      trim: true,
    },
    last_name: {
      type: String,
      required: [true, 'Last name is required'],
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      required: [true, 'Email is required'],
    },
    password: { type: String, required: [true, 'Password is required'] },
  },
  { timestamps: true }
);

UserSchema.index({ username: 1 });

const User = new mongoose.model('User', UserSchema, 'users');

export default User;

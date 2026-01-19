import mongoose from 'mongoose';

// NOTE: Define the ObjectId type for use in the schema
// const { Types } = mongoose;
// const { ObjectId } = Types;

const user__schema = new mongoose.Schema(
  {
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
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: [true, 'Password is required'] },
    role: { type: String, trim: true, lowercase: true },
  },
  { timestamps: true }
);

user__schema.index({ username: 1 });

const User = new mongoose.model('User', user__schema, 'users');

export default User;

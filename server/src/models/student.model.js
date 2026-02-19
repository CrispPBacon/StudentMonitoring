import mongoose from 'mongoose';

const StudentSchema = new mongoose.Schema(
  {
    display_photo: {
      type: String,
      trim: true,
      default: 'default.webp',
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
    },
    student_id: {
      type: String,
      lowercase: true,
      trim: true,
      required: [true, 'Student ID is required'],
    },
    card_id: {
      type: String,
      uppercase: true,
      trim: true,
    },
    education: {
      category: {
        type: String,
        lowercase: true,
        trim: true,
        enum: ['basic', 'college'],
        required: [true, 'Education category is required'],
      },
      program: {
        type: String,
        lowercase: true,
        trim: true,
        required: [true, 'Education program is required'],
      },
      year: {
        type: String,
        lowercase: true,
        trim: true,
        required: [true, 'Education year is required'],
      },
    },
    guardian: {
      first_name: {
        type: String,
        lowercase: true,
        trim: true,
      },
      last_name: {
        type: String,
        lowercase: true,
        trim: true,
      },
      email: {
        type: String,
        lowercase: true,
        trim: true,
      },
      phone_number: {
        type: Number,
      },
      notification: {
        type: String,
        enum: ['off', 'sms', 'email'],
        default: 'off',
      },
    },
  },
  { timestamps: true }
);

const Student = new mongoose.model('Student', StudentSchema, 'students');

export default Student;

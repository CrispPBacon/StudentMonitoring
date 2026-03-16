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
    card: {
      id: {
        type: String,
        uppercase: true,
        trim: true,
      },
      status: {
        type: String,
        lowercase: true,
        trim: true,
        enum: ['active', 'inactive', 'graduated', 'suspended'],
      },
    },
    card_id: {
      type: String,
      uppercase: true,
      trim: true,
    },
    finger_id: {
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
        required: [true, 'Program is required'],
      },
      year: {
        type: String,
        lowercase: true,
        trim: true,
        required: [true, 'Year level is required'],
      },
      schoolYear: {
        type: String,
        lowercase: true,
        trim: true,
      },
      status: {
        type: String,
        lowercase: true,
        trim: true,
        default: 'enrolled',
        enum: ['enrolled', 'not_enrolled', 'alumni', 'dropped'],
      },
      remarks: {
        type: String,
        trim: true,
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
        type: String,
        lowercase: true,
        trim: true,
      },
      notification: {
        type: String,
        enum: ['off', 'sms', 'email', 'both'],
        default: 'off',
      },
    },
  },
  { timestamps: true }
);

const Student = new mongoose.model('Student', StudentSchema, 'students');

export default Student;

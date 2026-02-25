import mongoose from 'mongoose';

const { Types } = mongoose;
const { ObjectId } = Types;

const AttendanceSchema = new mongoose.Schema(
  {
    student: {
      type: ObjectId,
      required: true,
      ref: 'Student',
    },
    type: {
      type: String,
      enum: ['entry', 'exit'],
      default: 'entry',
      required: true,
    },
    result: {
      type: String,
      enum: ['granted', 'denied'],
      lowercase: true,
      trim: true,
    },
    identity: {
      type: String,
      enum: ['verified', 'no_id', 'visitor', 'unrecognized'],
      default: 'verified',
    },
  },
  { timestamps: true }
);

const Attendance = new mongoose.model(
  'Attendance',
  AttendanceSchema,
  'attendance'
);

export default Attendance;

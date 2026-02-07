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

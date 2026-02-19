import Student from '../models/student.model.js';
import mongoose from 'mongoose';

/* <--- ADD STUDENT ---> 
    NOTE: Register Student to Database
*/
export async function addStudent(student_data) {
  const { first_name, last_name, student_id, education, display_photo } =
    student_data || {};
  const student = new Student({
    first_name,
    last_name,
    student_id,
    education,
    display_photo,
  });
  student.save();
  return student;
}

/* <--- GET STUDENT INFORMATION ---> 
    NOTE: Fetch Student Information From the Database.
*/
export async function getStudent(identifier) {
  const query = mongoose.Types.ObjectId.isValid(identifier)
    ? { _id: identifier }
    : { student_id: identifier };

  const student = await Student.findOne(query)
    .select('-createdAt -updatedAt -__v')
    .lean();

  return student || null;
}

export async function getStudentByCardId(card_id) {
  const student = await Student.findOne({ card_id }).select(
    '-guardian -updatedAt -__v'
  );
  return student || null;
}
export async function getStudents() {
  const students = await Student.find({}).select('-updatedAt -__v');
  return students;
}

/* <--- UPDATE STUDENT INFORMATION ---> 
    NOTE: Student ID Cards
*/
export async function updateStudentCard(student_id, card_id) {
  const student = await Student.findByIdAndUpdate(student_id, { card_id });
  return student;
}

/* <--- DELETE STUDENT INFORMATION ---> 
    NOTE: Delete Student ID Card Record.
*/
export async function deleteStudentCard(student_id) {
  return student_id;
}

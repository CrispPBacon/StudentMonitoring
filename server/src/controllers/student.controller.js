import { addStudent } from '../services/student.service.js';

export async function CreateStudent(req, res, next) {
  try {
    const student_data = await addStudent(req.body);
    return res.status(200).json(student_data);
  } catch (error) {
    next(error);
  }
}

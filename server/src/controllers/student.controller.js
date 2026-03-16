import {
  addStudent,
  deleteStudentByID,
  getStudents,
  updateStudentByID,
} from '#services/student.service.js';
import { BadRequestError, NotFoundError } from '#utils/errors.js';

export async function deleteStudent(req, res, next) {
  try {
    const id = req.params.id;
    if (!id) throw new BadRequestError('Invalid student object ID');

    const result = await deleteStudentByID(id);

    if (!result) throw new NotFoundError('Student Record not found');
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function updateStudent(req, res, next) {
  try {
    const { id } = req.params || {};
    const data = req.body || {};
    const { _id, ...update } = data;

    const education = JSON.parse(data?.education);
    const guardian = JSON.parse(data?.guardian);

    const file = req.file;
    let student_data;
    student_data = { ...update, education, guardian };
    if (file) {
      const display_photo = file.filename;
      student_data = { ...student_data, display_photo };
    }

    const student = await updateStudentByID(id == _id ? id : '', student_data);
    return res.status(200).json(student);
  } catch (error) {
    next(error);
  }
}

export async function createStudent(req, res, next) {
  try {
    const finger_id = 0;
    // const { first_name, last_name, student_id, card_id } = req.body;
    const education = JSON.parse(req.body.education);
    const data = { ...req.body, education, finger_id };

    if (req?.file) data['display_photo'] = req.file.filename;

    console.log(data);

    const result = await addStudent(data);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function getAllStudents(req, res, next) {
  try {
    const students = await getStudents();
    res.status(200).json(students);
  } catch (error) {
    next(error);
  }
}

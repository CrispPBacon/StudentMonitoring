import { getStudents } from '../services/student.service.js';
import { BadRequestError } from '../utils/errors.js';

export async function CreateStudent(req, res, next) {
  try {
    const finger_id = 0;
    // const { first_name, last_name, student_id, card_id } = req.body;
    const education = JSON.parse(req.body.education);
    const data = { ...req.body, education, finger_id };

    if (req?.file) data['display_photo'] = req.file.filename;

    console.log(data);

    // const result = await addStudent(data);
    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
}

export async function GetAllStudents(req, res, next) {
  try {
    const students = await getStudents();
    res.status(200).json(students);
  } catch (error) {
    next(error);
  }
}

export async function UploadDisplayPhoto(req, res, next) {
  try {
    const { student_id } = req.body || {};
    const file = req.file;

    console.log(student_id);

    if (!file)
      throw new BadRequestError('File not found or file type not allowed.');

    // console.log(file);
    return res.sendStatus(200);
  } catch (error) {
    next(error);
  }
}

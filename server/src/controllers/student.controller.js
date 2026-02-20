import { addStudent, getStudents } from '../services/student.service.js';
import { BadRequestError } from '../utils/errors.js';

export async function CreateStudent(req, res, next) {
  try {
    const { firstName, lastName, studentID, program, year, card_id } =
      req.body || {};
    const finger_id = 0;
    const data = {
      first_name: firstName,
      last_name: lastName,
      student_id: studentID,
      education: {
        category: program == 'grade' ? 'basic' : 'college',
        program,
        year,
      },
      finger_id,
      card_id,
    };

    if (req?.file) data['display_photo'] = req.file.filename;

    const result = await addStudent(data);

    return res.status(200).json(result);
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

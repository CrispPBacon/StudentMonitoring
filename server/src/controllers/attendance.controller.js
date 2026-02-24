import {
  getAllAttendanceLog,
  logStudentEntry,
} from '../services/attendance.service.js';
import {
  getStudentByCardId,
  getStudentByStudentId,
} from '../services/student.service.js';
import { getIO } from '../socket/index.js';
import { getTodayDateRange } from '../utils/dateRange.js';

/* <--- Attendance Controller ---> */
export async function EntryLog(req, res, next) {
  try {
    let { card_id, finger_id } = req.body ?? {};
    if (card_id.includes(' ')) card_id = card_id.replaceAll(' ', '_');
    if (!card_id) return res.sendStatus(401);
    // if (finger_id <= 0) return res.sendStatus(401);
    console.log('CARD ID:', card_id, finger_id);

    const student = await getStudentByCardId(card_id);
    if (!student) return res.sendStatus(401);
    // if (!student?.finger_id) return res.sendStatus(401);
    // if (student.finger_id != finger_id) return res.sendStatus(401);

    // Silent ignore for double tap
    const { log, ignored } = await logStudentEntry(student._id);
    if (ignored) {
      return res.sendStatus(429);
    }

    const { display_photo } = student;

    const { type, createdAt, _id } = log;
    const attendanceData = {
      _id,
      student: { ...student._doc, display_photo },
      type,
      createdAt,
    };

    getIO().emit('attendance', attendanceData);
    return res.sendStatus(200);
  } catch (error) {
    next(error);
  }
}

export async function EntryLogByStudentID(req, res, next) {
  try {
    const student_id = req.params.student_id;

    if (!student_id) return res.sendStatus(401);
    const student = await getStudentByStudentId(student_id);
    if (!student) return res.sendStatus(401);

    const { log, ignored } = await logStudentEntry(student._id);
    if (ignored) return res.sendStatus(429);

    const { display_photo } = student;

    const { type, createdAt, _id } = log;
    const attendanceData = {
      _id,
      student: { ...student._doc, display_photo },
      type,
      createdAt,
    };
    // console.log(attendanceData);

    getIO().emit('attendance', attendanceData);
    return res.status(200).json(attendanceData);
  } catch (error) {
    next(error);
  }
}

export async function GetAttendanceLog(req, res, next) {
  try {
    let query = {};

    const filter = req.query.filter;
    const page = req.query.page;
    const ITEMS_PER_PAGE = req.query.limit || 20;

    // console.log(page, filter);

    if (filter == 'today') {
      const { startOfDayPH, endOfDayPH } = getTodayDateRange();
      query = { createdAt: { $gte: startOfDayPH, $lte: endOfDayPH } };
    }

    const { attendance, count } = await getAllAttendanceLog(
      query,
      ITEMS_PER_PAGE,
      page
    );
    const pageCount = Math.ceil(count / ITEMS_PER_PAGE);

    const data = {
      pagination: {
        pageCount,
        count,
      },
      attendance,
    };
    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
}

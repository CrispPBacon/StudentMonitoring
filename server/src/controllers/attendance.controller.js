import {
  getAllAttendanceLog,
  logStudentEntry,
} from '#services/attendance.service.js';
import {
  sendNotificationToParent,
  sendSMS,
} from '#services/notification.service.js';
import { getStudent } from '#services/student.service.js';
import { getIO } from '#socket/index.js';
import { getTodayDateRange } from '#utils/dateRange.js';

/* <--- Attendance Controller ---> */
/**
 * NOTE: FLOW
 * *1. GET INPUT FIELDS (card_id, finger_id, student_id)
 * *2. Replace card_id spaces with underscores
 * *3. GET Student from database by card or student ID
 * *4. Return undefined student object and access denied.
 * *5. Validate fingerprint
 * *6. 3 seconds delay for card taps
 * *7. attendanceData object formation
 * *8. Send SMS and Email
 * *9. Send response back to client.
 */
export async function logExitAndEntry(req, res, next) {
  const CHECK_FINGERPRINT = true;
  let { card_id, finger_id } = req.body || {};
  const { student_id } = req.params || {};
  try {
    console.log(student_id);
    // REVIEW: GET Fields || VALIDATES IF THESE FIELDS EXISTS
    if ((!card_id && !student_id) || (card_id && !finger_id))
      return res.sendStatus(401);
    if (finger_id <= 0 && !student_id && CHECK_FINGERPRINT)
      return res.sendStatus(401);

    // REVIEW: CARD ID REPLACES SPACES WITH UNDERSCORES (_)
    if (card_id)
      if (card_id.includes(' ')) card_id = card_id.replaceAll(' ', '_');
    console.log('CARD ID:', card_id, finger_id);

    // REVIEW: GET Student by student_id or card_id
    let student;
    if (student_id) student = await getStudent({ student_id });
    if (card_id) student = await getStudent({ card_id });

    // REVIEW: Return attendance Data Object if student not found
    if (!student_id)
      if (!student || student?.finger_id != finger_id) {
        const attendanceData = {
          _id: undefined,
          student: {},
          type: undefined,
          result: 'denied',
          createdAt: new Date(),
        };
        getIO().emit('attendance', attendanceData);

        return res.sendStatus(401);
      }

    // REVIEW: Return if finger_id not registered and not equal.
    if (!student?.finger_id && CHECK_FINGERPRINT) return res.sendStatus(401);
    if (student.finger_id != finger_id && !student_id && CHECK_FINGERPRINT)
      return res.sendStatus(401);

    // Silent ignore for double tap
    const { log, ignored } = await logStudentEntry(student._id);
    if (ignored) return res.sendStatus(429);

    // REVIEW: attendanceData object formation
    const { display_photo, guardian } = student;
    const { type, createdAt, _id } = log;
    const attendanceData = {
      _id,
      student: { ...student, display_photo },
      type,
      createdAt,
    };
    const { email, notification, phone_number } = guardian || {};
    const { first_name, last_name } = student || {};
    // console.log({ ...student, display_photo });

    // REVIEW: SEND EMAIL & SMS
    if (email && email.toUpperCase() != 'N/A' && notification == 'on') {
      sendNotificationToParent(attendanceData);
    }
    if (notification == 'on' && phone_number) {
      await sendSMS(phone_number, { type, createdAt, first_name, last_name });
    }

    // REVIEW: Send back response
    getIO().emit('attendance', attendanceData);
    return res.sendStatus(200);
  } catch (error) {
    next(error);
  }
}

export async function getAttendanceLog(req, res, next) {
  try {
    let query = {};
    const { filter, page, limit } = req.query || {};
    const ITEMS_PER_PAGE = limit || 20;

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

import Attendance from '../models/attendance.model.js';

async function addAttendanceLog(student, type) {
  const attendance = new Attendance({ student, type });
  return attendance.save();
}

async function getAttendanceLog(student) {
  const attendance = await Attendance.findOne({ student }).sort({
    createdAt: -1,
  });
  return attendance || {};
}

export async function getAllAttendanceLog(query = null) {
  const attendance = await Attendance.find(query || {})
    .sort({ createdAt: -1 })
    .populate('student');
  return attendance || [];
}

export async function logStudentEntry(student_id) {
  // NOTE: GET COOLDOWN
  const last_log = await getAttendanceLog(student_id);
  if (isWithinCooldown(last_log)) {
    return { ignored: true };
  }

  // NOTE: GET ATTENDANCE LOG
  const type = getNextAttendanceType(last_log);
  const log = await addAttendanceLog(student_id, type);

  return { ignored: false, log };
}

/* <--- HELPERS ---> 
  NOTE: Utilities for attendance services.
*/

function isWithinCooldown(lastLog) {
  const TAP_COOLDOWN_MS = 3 * 1000; // NOTE: 5 seconds.
  if (!lastLog?.createdAt) return false;

  return Date.now() - lastLog.createdAt.getTime() < TAP_COOLDOWN_MS;
}

function getNextAttendanceType(lastLog) {
  if (!lastLog) return 'entry';

  return lastLog.type === 'entry' ? 'exit' : 'entry';
}

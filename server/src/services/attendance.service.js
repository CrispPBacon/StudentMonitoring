import Attendance from '../models/attendance.model.js';

async function addAttendanceLog(student, type) {
  const attendance = new Attendance({ student, type });
  attendance.save();
  return attendance;
}

async function getAttendanceLog(student) {
  const attendance = await Attendance.findOne({ student }).sort({
    createdAt: -1,
  });
  return attendance || {};
}

export async function getAllAttendanceLog(query = null) {
  const attendance = await Attendance.find(query || {}).sort({ createdAt: -1 });
  return attendance || [];
}

export async function logStudentEntry(student_id) {
  const last_log = await getAttendanceLog(student_id);

  if (isWithinCooldown(last_log)) {
    return { ignored: true };
  }

  const type = getNextAttendanceType(last_log);

  const log = await addAttendanceLog(student_id, type);

  console.log(log);
  return { ignored: false, type };
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

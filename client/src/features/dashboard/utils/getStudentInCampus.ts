import type { AttendanceProps, StudentProps } from '@/lib/types';

type groupedLogsProps = {
  [key: string]: {
    student: StudentProps;
    logs: AttendanceProps[];
  };
};

export function getStudentInCampus(data: AttendanceProps[]) {
  const groupedLogs = data.reduce((acc: groupedLogsProps, log) => {
    const { _id } = log.student || {};
    const student_id = _id || '';

    if (!acc[student_id])
      acc[student_id] = {
        student: { ...log.student },
        logs: [],
      };

    acc[student_id].logs.push(log);
    return acc;
  }, {});
  const resultArray = Object.values(groupedLogs);

  const studentInCampus: AttendanceProps[] = [];
  for (const val of resultArray) {
    if (val.logs[0].type == 'entry') studentInCampus.push(val.logs[0]);
  }

  // console.log(studentInCampus);
  return studentInCampus;
}

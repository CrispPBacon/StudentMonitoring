/*
    NOTE: Error Types 
*/
export type ErrorProps = {
  message: string;
  name: string;
};

/*
    NOTE: User Types 
*/
export type User = {
  _id: string;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
};

export interface StudentProps {
  _id: string;
  first_name: string;
  last_name: string;
  education: { category: string; program: string };
  guardian: { notification: 'on' | 'off' };
  card_id: string;
  student_id: string;
}

export interface AttendanceProps {
  _id?: string;
  student: StudentProps;
  type: 'entry' | 'exit';
  createdAt: string;
}

export interface studentData extends AttendanceProps {
  student_id: string;
  program: string;
  display_photo: string;
}

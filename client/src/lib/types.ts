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
  _id?: string;
  first_name: string;
  last_name: string;
  email?: string;
  education: {
    category: string;
    program: string;
    year: string;
    status?: 'enrolled' | 'not_enrolled' | 'alumni' | 'dropped';
  };
  card_id: string;
  student_id: string;
  finger_id?: string;
  display_photo?: File | string;
  guardian?: {
    notification: 'on' | 'off';
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
  };
  remarks?: string | undefined;
}

export interface AttendanceProps {
  _id?: string;
  student: StudentProps;
  type: 'entry' | 'exit';
  createdAt: string;
}

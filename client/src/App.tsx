/* -<--- NORMAL IMPORTS --->- */
import { Route, Routes } from "react-router-dom"

import React, { useEffect } from 'react';
import ProtectedRoute from "./components/layout/ProtectedRoute"
import PublicRoute from "./components/layout/PublicRoute"
import { useAppDispatch } from "./hooks/reduxHooks";
import { useSocket } from "./hooks/useSocket";
import { addAttendanceLog } from "./features/AttendanceLog/attendanceSlice";
import type { AttendanceProps } from "./lib/types";

/* -<--- LAZY LOAD IMPORTS --->- */
const AppWrapper = React.lazy(() => import("./components/layout/AppWrapper"));

const Attendance = React.lazy(() => import("./pages/Attendance"));
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const DisplayLog = React.lazy(() => import("./pages/DisplayLog"));
const Login = React.lazy(() => import("./pages/Login"));
const StudentList = React.lazy(() => import("./pages/StudentList"));
/* -<--- END OF LAZY LOAD IMPORTS --->- */

export default function App() {
  const dispatch = useAppDispatch()
  const { socket } = useSocket();

  useEffect(() => {
    const handleAttendance = (data: AttendanceProps) => {
      if (!data.type) return;
      dispatch(addAttendanceLog(data))
    }
    socket.on("attendance", handleAttendance);

    return () => {
      socket.off("attendance", handleAttendance);
    }
  }, [socket, dispatch])

  return (
    <Routes>
      {/* -<--- ACCESSIBLE IF LOGGED IN --->- */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AppWrapper />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/students" element={<StudentList />} />
        </Route>
      </Route>

      {/* -<--- ACCESSIBLE REGARDLESS OF AUTH --->- */}
      <Route path="/display" element={<DisplayLog />} />

      {/* -<--- ACCESSIBLE IF NOT LOGGED IN --->- */}
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>

  )
}

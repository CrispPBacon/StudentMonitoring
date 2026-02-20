import { useEffect, } from "react"


import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";

import { Chart, Overview, QuickAccess, StudentTable } from "@/features/dashboard";
import { fetchStudents } from "@/features/students_list";
import { fetchAttendanceLog } from "@/features/attendance";
import type { studentData } from "@/lib/types";
import { useSocket } from "@/hooks/useSocket";
import { addAttendanceLog } from "@/features/attendance/attendanceSlice";
import { getHourlyChartData } from "@/features/dashboard/utils/getHourlyChartData";


export default function Dashboard() {
    const { students } = useAppSelector((state) => state.student)
    const { exitToday, entryToday, attendanceLog } = useAppSelector((state) => state.attendanceLog)

    const dispatch = useAppDispatch()
    const { socket } = useSocket();


    useEffect(() => {
        dispatch(fetchStudents())
        dispatch(fetchAttendanceLog())
    }, [dispatch])

    useEffect(() => {
        const handleAttendance = (data: studentData) => {
            if (!data) return;
            const { student_id, createdAt, type } = data
            const student = students.find(s => s._id === student_id);
            if (!student) return;
            const attendanceLog = { student, type, createdAt, }
            dispatch(addAttendanceLog(attendanceLog))
        }
        socket.on("attendance", handleAttendance);

        return () => {
            socket.off("attendance", handleAttendance);
        }
    }, [socket, dispatch, students])


    return (
        <main className="p-8 overflow-y-auto rounded-2xl bg-slate-50/95">
            <div className="mb-6">
                <h1 className="font-bold text-3xl">Dashboard</h1>
            </div>
            {/* <--- Components ---> */}
            <Overview totalStudents={students.length} entry={exitToday} exit={entryToday} totalTaps={exitToday + entryToday} />
            <QuickAccess />

            <div className=" bg-white p-5 rounded-xl shadow-md">
                <div className="items-start gap-10 grid grid-cols-1 lg:grid-cols-2">
                    {/* <--- Components ---> */}
                    <Chart chartData={getHourlyChartData(attendanceLog)} />
                    <StudentTable />
                </div>
            </div>

        </main >
    )
}



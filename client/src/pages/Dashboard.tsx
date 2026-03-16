import { useEffect, } from "react"
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { Chart, Overview, QuickAccess, StudentTable } from "@/features/Dashboard";
import { fetchStudents } from "@/features/StudentsLog";
import { fetchAttendanceLog } from "@/features/AttendanceLog";
import { getHourlyChartData } from "@/features/Dashboard/utils/getHourlyChartData";


export default function Dashboard() {
    const { students, isRequestSent: studentRequestSent } = useAppSelector((state) => state.student)
    const { exitToday, entryToday, attendanceLog, } = useAppSelector((state) => state.attendanceLog)
    const dispatch = useAppDispatch()


    useEffect(() => {
        if (students.length == 0 && !studentRequestSent) dispatch(fetchStudents())
    }, [dispatch, students, studentRequestSent])

    useEffect(() => {
        dispatch(fetchAttendanceLog({ filter: "today" }))
    }, [dispatch])




    return (
        <main className="p-8 overflow-y-auto rounded-2xl bg-slate-50/95 animate-entry">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
                <p className="text-sm text-slate-500">Realtime Students Monitoring</p>
            </div>
            {/* <--- Components ---> */}
            <Overview attendanceLog={attendanceLog} totalStudents={students.length} entry={entryToday} exit={exitToday} />
            <QuickAccess />

            <div className=" bg-white p-5 rounded-xl shadow-md">
                <div className="items-start gap-10 grid grid-cols-1 lg:grid-cols-[1.2fr_1fr]">
                    {/* <--- Components ---> */}
                    <Chart chartData={getHourlyChartData(attendanceLog)} />
                    <StudentTable attendanceLog={attendanceLog} />
                </div>
            </div>
        </main >
    )
}



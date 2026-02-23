import { useEffect, } from "react"


import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";

import { Chart, Overview, QuickAccess, StudentTable } from "@/features/dashboard";
import { fetchStudents } from "@/features/students_list";
import { fetchAttendanceLog } from "@/features/attendance";
import { getHourlyChartData } from "@/features/dashboard/utils/getHourlyChartData";


export default function Dashboard() {
    const { students, isRequestSent: studentRequestSent } = useAppSelector((state) => state.student)
    const { exitToday, entryToday, attendanceLog, } = useAppSelector((state) => state.attendanceLog)
    const dispatch = useAppDispatch()


    useEffect(() => {
        if (students.length == 0 && !studentRequestSent) dispatch(fetchStudents())
        // console.log(students)
    }, [dispatch, students, studentRequestSent])

    useEffect(() => {
        // if (attendanceLog.length == 0 && !attendanceRequestSent)
        dispatch(fetchAttendanceLog({ filter: "today" }))
        // console.log(attendanceLog)
    }, [dispatch])




    return (
        <main className="p-8 overflow-y-auto rounded-2xl bg-slate-50/95 animate-entry">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
                <p className="text-sm text-slate-500">Realtime Students Monitoring</p>
            </div>
            {/* <--- Components ---> */}            {/* <--- Components ---> */}
            <Overview totalStudents={students.length} entry={exitToday} exit={entryToday} totalTaps={exitToday + entryToday} />
            <QuickAccess />

            <div className=" bg-white p-5 rounded-xl shadow-md">
                <div className="items-start gap-10 grid grid-cols-1 lg:grid-cols-[1.2fr_1fr]">
                    {/* <--- Components ---> */}
                    <Chart chartData={getHourlyChartData(attendanceLog)} />
                    <StudentTable />
                </div>
            </div>
        </main >
    )
}



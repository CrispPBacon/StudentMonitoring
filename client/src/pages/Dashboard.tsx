import { useEffect } from "react"


import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";

import { Chart, Overview, QuickAccess, StudentTable } from "@/features/dashboard";
import { fetchStudents } from "@/features/students_list";
import { fetchAttendanceLog } from "@/features/attendance";


export default function Dashboard() {

    const { students } = useAppSelector((state) => state.student)
    const { attendanceLog } = useAppSelector((state) => state.attendanceLog)

    const entry = attendanceLog.filter(r => r.type === "entry").length;
    const exit = attendanceLog.filter(r => r.type === "exit").length;

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchStudents())
        dispatch(fetchAttendanceLog())
    }, [dispatch])


    return (
        <main className="p-8 overflow-y-auto rounded-2xl bg-slate-50/95">
            <div className="mb-6">
                <h1 className="font-bold text-3xl">Dashboard</h1>
            </div>
            {/* <--- Components ---> */}
            <Overview totalStudents={students.length} entry={entry} exit={exit} totalTaps={attendanceLog.length} />
            <QuickAccess />

            <div className=" bg-white p-5 rounded-xl shadow-md">
                <div className="items-start gap-10 grid grid-cols-1 lg:grid-cols-2">
                    {/* <--- Components ---> */}
                    <Chart />
                    <StudentTable />
                </div>
            </div>

        </main >
    )
}



import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { getStudentInCampus } from "../utils/getStudentInCampus"
import ButtonDialog from "./ButtonDialog"
import type { AttendanceProps } from "@/lib/types"
import { StudentData } from "./StudentData"

interface OverviewProps {
    totalStudents: number
    entry: number
    exit: number
    totalTaps?: number
    attendanceLog: AttendanceProps[]
}
export default function Overview({ totalStudents, entry, exit, attendanceLog }: OverviewProps) {
    const [openStudentInCampus, setOpenStudentInCampus] = useState(false);
    const navigate = useNavigate()

    const studentInCampus = (() => {
        if (attendanceLog.length < 1) return []
        if (!attendanceLog[0].student) return []
        return getStudentInCampus(attendanceLog)
    })()

    return (
        <div className="mb-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1">
            <div className="text-left bg-slate-50 hover:bg-white rounded-xl shadow-sm p-4 sm:p-5 hover:-translate-y-0.5" onClick={() => navigate("/students")}>
                <span className="font-medium">Total Students</span>
                <p className="mt-5 font-bold text-2xl">{totalStudents}</p>
            </div>
            <ButtonDialog
                open={openStudentInCampus}
                onOpenChange={studentInCampus.length > 0 || openStudentInCampus ? setOpenStudentInCampus : () => { }}
                placeholder={
                    <div className="text-left bg-slate-50 hover:bg-white rounded-xl shadow-sm p-4 sm:p-5 hover:-translate-y-0.5" onClick={() => console.log("HELLO WORLD")}>
                        <span className="font-medium">Student In Campus</span>
                        <p className="mt-5 font-bold text-2xl">{studentInCampus.length}</p>
                    </div>
                }
                title="Current Students inside the campus"
                description="List of the current students inside the campus"
                cardClassName="max-w-200"
            >
                <h1>List of students</h1>
                <div className=" text-sm mt-4 overflow-y-auto h-80 ">
                    {studentInCampus.length > 0 ? studentInCampus.map(val => {
                        const { createdAt, type, student } = val
                        const { first_name, last_name, student_id } = student || {}
                        return <StudentData key={val._id} first_name={first_name} last_name={last_name} student_id={student_id} createdAt={createdAt} type={type} />
                    }) : null}
                </div>
            </ButtonDialog>
            <div className="bg-slate-50 hover:bg-white rounded-xl shadow-sm p-4 sm:p-5 hover:-translate-y-0.5">
                <span className="font-medium">Entry Today</span>
                <p className="mt-5 font-bold text-2xl">{entry}</p>
            </div>
            <div className="bg-slate-50 hover:bg-white rounded-xl shadow-sm p-4 sm:p-5 hover:-translate-y-0.5">
                <span className="font-medium">Exit Today</span>
                <p className="mt-5 font-bold text-2xl">{`${exit}`}</p>
            </div>
        </div>
    )
}
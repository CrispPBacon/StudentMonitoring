import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks"
import { MoreHoriz } from "@mui/icons-material"
import { useEffect } from "react"
import { fetchAttendanceLog } from "../attendanceThunks"
import type { AttendanceProps } from "@/lib/types"
import { formatPHDate, months } from "@/utils/formatDate"
import { toTitleCase } from "@/utils/formatString"
import { backendUrl } from "@/lib/api"

export default function AttendanceList() {

    const { page, attendanceLog } = useAppSelector((state) => state.attendanceLog)
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(fetchAttendanceLog({ page }))
    }, [dispatch, page])



    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead className="sticky top-0 bg-slate-50 border-b border-slate-200">
                    <tr>
                        <th className="p-4 text-sm font-semibold text-slate-600">Student</th>
                        <th className="p-4 text-sm font-semibold text-slate-600">
                            Student ID
                        </th>
                        <th className="p-4 text-sm font-semibold text-slate-600">Card ID</th>
                        <th className="p-4 text-sm font-semibold text-slate-600">Status</th>
                        <th className="p-4 text-sm font-semibold text-slate-600">Date Time</th>
                        <th className="p-4 text-sm font-semibold text-slate-600">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                    {attendanceLog.map((val) => (<AttendanceRow key={val._id} {...val} />))}
                </tbody>
            </table>
        </div>

    )
}


export function AttendanceRow({ student, type, createdAt }: AttendanceProps) {
    const { first_name, last_name, email, student_id, card_id, display_photo } = student || {}
    const { hour, minute, unit, month, year, day } = formatPHDate(createdAt)
    // console.log({ student, type, createdAt }, { first_name, last_name, education, student_id, card_id, display_photo })

    return (
        <tr>
            <td className="p-4 flex items-center gap-3">
                <div
                    className="overflow-hidden w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-semibold text-slate-600">
                    {/* {`${first_name[0]}${last_name[0]}`.toUpperCase()} */}
                    <img src={`${backendUrl}/display_photo/${display_photo}`} alt="student_profile" />
                </div>
                <div>
                    <p className="font-semibold text-slate-800">
                        {toTitleCase(`${first_name} ${last_name}`)}
                    </p>
                    <p className="text-sm text-slate-500">{email}</p>
                </div>
            </td>
            <td className="p-4 text-slate-600">{student_id}</td>
            <td className="p-4 text-slate-600">{card_id}</td>
            <td className="p-4">
                <span className={`px-3 py-1 text-sm rounded-full ${type === 'entry' ? "text-emerald-600 bg-emerald-100" : "text-red-600 bg-red-100"}`}>{type == 'entry' ? "Entered" : "Left"} the campus</span>
            </td>
            <td className="p-4 text-slate-600">{months[parseInt(month) - 1]} {day} {year} - {`${hour}:${minute}:${unit}`}</td>
            <td className="p-4 space-x-2 hover:animate-entry">
                <MoreHoriz />
            </td>
        </tr>

    )
}
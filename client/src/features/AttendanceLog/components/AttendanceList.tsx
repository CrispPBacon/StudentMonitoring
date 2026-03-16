import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks"
import { MoreHoriz } from "@mui/icons-material"
import { useEffect, useState, } from "react"
import { fetchAttendanceLog } from "../attendanceThunks"
import type { AttendanceProps, StudentProps } from "@/lib/types"
import { formatPHDate, months } from "@/utils/formatDate"
import { toTitleCase } from "@/utils/formatString"
import { backendUrl } from "@/lib/api"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import ButtonDialog from "@/features/Dashboard/components/ButtonDialog"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"

export default function AttendanceList() {

    const { page, attendanceLog } = useAppSelector((state) => state.attendanceLog)
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(fetchAttendanceLog({ page }))
    }, [dispatch, page])



    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead className="z-20 sticky top-0 bg-slate-50 border-b border-slate-200">
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
        <tr className="animate-entry">
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
                <PopOver {...student} />
            </td>
        </tr>

    )
}


export function PopOver(student: StudentProps) {
    const [view, setView] = useState(false)
    return (
        <Popover>
            <PopoverTrigger asChild>
                <MoreHoriz />
            </PopoverTrigger>
            <PopoverContent className="w-25 p-0">
                <div className='grid grid-cols-1'>
                    <ButtonDialog
                        open={view}
                        onOpenChange={setView}
                        placeholder="View"
                        title="Student Profile"
                        description="View essential details and information about the student"
                        className='hover:bg-slate-100 text-left p-4'
                    >
                        <div className='grid grid-cols-[.4fr_1fr]'>
                            <div className='flex flex-col gap-5'>
                                <span className='flex w-20 h-20 overflow-hidden border-slate-800 rounded-full border-4'>
                                    <img src={`${backendUrl}/display_photo/${student.display_photo}`} alt="profile" />
                                </span>
                                <span className='text-sm tracking-wide text-slate-800'>ID•{student.student_id}</span>
                            </div>
                            <div className='flex flex-col gap-5 '>
                                <div className='flex justify-between'>
                                    <span className='text-sm tracking-wide text-slate-500'>FULL NAME</span>
                                    <span className='text-sm tracking-wide text-slate-950'>{`${student.first_name} ${student.last_name}`.toUpperCase()}</span>
                                </div>
                                <div className='flex justify-between'>
                                    <span className='text-sm tracking-wide text-slate-500'>EMAIL</span>
                                    <span className="text-sm tracking-wide text-slate-950">{`${student.email || "N/A"}`}</span>
                                </div>
                                <div className='flex justify-between'>
                                    <span className='text-sm tracking-wide text-slate-500'>{student.education ? student.education.category == "college" ? "COURSE & YEAR" : "GRADE" : null}</span>
                                    <span className="text-sm tracking-wide text-slate-950">{student.education ? student.education.category == "college" ? `${student.education.program} ${student.education.year}`.toUpperCase() : student.education.year : null}</span>
                                </div>
                                <div className='flex justify-between'>
                                    <span className='text-sm tracking-wide text-slate-500'>CARD ID</span>
                                    <span className="text-sm tracking-wide text-slate-950">{`${student.card_id}`}</span>
                                </div>
                                <div className='flex justify-between mt-5'>
                                    <span className='text-sm tracking-tighter text-slate-600 font-bold'>GUARDIAN</span>
                                </div>
                                <div className='flex justify-between'>
                                    <span className='text-sm tracking-wide text-slate-500'>NAME</span>
                                    <span className="text-sm tracking-wide text-slate-950">{`${student.guardian?.first_name || 'N/A'} ${student.guardian?.last_name || "N/A"}`}</span>
                                </div>
                                <div className='flex justify-between'>
                                    <span className='text-sm tracking-wide text-slate-500'>EMAIL</span>
                                    <span className="text-sm tracking-wide text-slate-950">{`${student.guardian?.email || "N/A"}`}</span>
                                </div>
                                <div className='flex justify-between'>
                                    <span className='text-sm tracking-wide text-slate-500'>PHONE NUMBER</span>
                                    <span className="text-sm tracking-wide text-slate-950">{`${student.guardian?.phone_number || "N/A"}`}</span>
                                </div>
                                <div className='flex justify-between'>
                                    <span className='text-sm tracking-wide text-slate-500'>NOTIFICATION</span>
                                    <Switch disabled checked={student.guardian?.notification == "on" ? true : false} className="data-[state=checked]:bg-green-950 data-[state=unchecked]:bg-slate-400" />
                                </div>
                                <Button className='mt-5' onClick={() => setView(false)}>Close</Button>
                            </div>

                        </div>
                    </ButtonDialog>
                </div>
            </PopoverContent>
        </Popover>)
}
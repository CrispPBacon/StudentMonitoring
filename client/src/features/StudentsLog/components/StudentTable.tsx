import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks'
import type { StudentProps } from '@/lib/types'
import { toTitleCase } from '@/utils/formatString'
import { MoreHoriz } from '@mui/icons-material'
import { useEffect, useState } from 'react'
import { fetchStudents } from '../studentThunks'

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import ButtonDialog from '@/features/Dashboard/components/ButtonDialog'
import { UpdateStudentForm } from '@/components/forms/UpdateStudentForm'
import { DeleteStudentForm } from '@/components/forms/DeleteStudentForm'
import { backendUrl } from '@/lib/api'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'

export default function StudentTable() {
    const { students } = useAppSelector(state => state.student)
    const dispatch = useAppDispatch()
    useEffect(() => {
        if (students.length > 0) return;
        dispatch(fetchStudents())
    }, [dispatch, students])

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead className="sticky top-0 bg-slate-50 border-b border-slate-200">
                    <tr>
                        <th className="p-4 text-sm font-semibold text-slate-600">Student</th>
                        <th className="p-4 text-sm font-semibold text-slate-600">
                            Student ID
                        </th>
                        <th className="p-4 text-sm font-semibold text-slate-600">Course</th>
                        <th className="p-4 text-sm font-semibold text-slate-600">Year</th>
                        <th className="p-4 text-sm font-semibold text-slate-600">Status</th>
                        <th className="p-4 text-sm font-semibold text-slate-600">Remarks</th>
                        <th className="p-4 text-sm font-semibold text-slate-600">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                    {students.map(val => (<StudentRow key={val._id} {...val} />))}
                </tbody>
            </table>
        </div>
    )
}


export function StudentRow(student: StudentProps) {
    const { first_name, last_name, email, education, student_id, _id, display_photo, remarks } = student || {}
    const { program, year, status } = education || {}
    const enrollment_status = {
        enrolled: "bg-green-100 text-green-600",
        not_enrolled: "bg-red-100 text-red-600",
        alumni: "bg-blue-100 text-blue-600",
        dropped: "bg-yellow-100 text-yellow-600",
    }
    return (
        <tr>
            <td className="p-4 flex items-center gap-3">
                <div
                    className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-semibold text-slate-600 overflow-hidden">
                    {display_photo ? <img src={`${backendUrl}/display_photo/${display_photo}`} alt={_id} /> : `${first_name[0]}${last_name[0]}`.toUpperCase()}
                </div>
                <div>
                    <p className="font-semibold text-slate-800">
                        {toTitleCase(`${first_name} ${last_name}`)}
                    </p>
                    <p className="text-sm text-slate-500">{email}</p>
                </div>
            </td>
            <td className="p-4 text-slate-600">{student_id}</td>
            <td className="p-4 text-slate-600">{program ? program.toUpperCase() : null}</td>
            <td className="p-4 text-slate-600">{year ? year : null}</td>
            <td className="p-4">
                <span
                    className={`px-3 py-1 text-sm rounded-full ${status ? enrollment_status[status] : "bg-red-100 text-red-600"}`}>
                    {toTitleCase(status ? status.replace("_", " ") : "Not Enrolled")}
                </span>
            </td>
            <td className="p-4 text-slate-600 truncate min-w-5 max-w-60">
                {remarks ? remarks : ""}
            </td>
            <td className="p-4 space-x-2 hover:animate-entry">
                <PopOver {...student} />
            </td>
        </tr>

    )
}


export function PopOver(student: StudentProps) {
    const [openStudentForm, setOpenStudentForm] = useState(false);
    const [openDeleteStudentForm, setOpenDeleteStudentForm] = useState(false);
    const [view, setView] = useState(false);

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
                                    <span className='text-sm tracking-wide text-slate-500'>{student.education.category == "college" ? "COURSE & YEAR" : "GRADE"}</span>
                                    <span className="text-sm tracking-wide text-slate-950">{`${student.education.program}-${student.education.year}`.toUpperCase()}</span>
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
                    <ButtonDialog
                        open={openStudentForm}
                        onOpenChange={setOpenStudentForm}
                        placeholder="Edit"
                        title="Edit Student Details"
                        description="Fill in the student's detail you want to update."
                        className='hover:bg-slate-100 text-left p-4'
                    >
                        <UpdateStudentForm setOpen={setOpenStudentForm} {...student} />
                    </ButtonDialog>
                    <ButtonDialog
                        open={openDeleteStudentForm}
                        placeholder="Delete"
                        onOpenChange={setOpenDeleteStudentForm}
                        title="Are you sure to delete student data?"
                        description="Permanent deletion of student data from the database."
                        className=' text-red-400 hover:bg-slate-100 text-left p-4'
                    >
                        <DeleteStudentForm id={student._id || ''} setOpen={setOpenDeleteStudentForm} />
                    </ButtonDialog>
                </div>
            </PopoverContent>
        </Popover>)
}
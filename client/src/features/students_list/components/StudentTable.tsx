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
import ButtonDialog from '@/features/dashboard/components/ButtonDialog'
import { UpdateStudentForm } from './forms/UpdateStudentForm'
import { DeleteStudentForm } from './forms/DeleteStudentForm'

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
                        <th className="p-4 text-sm font-semibold text-slate-600">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                    {students.map(val => (<StudentRow key={val._id} _id={val._id} finger_id={val.finger_id} card_id={val.card_id} first_name={val.first_name} last_name={val.last_name} email={val.email} education={val.education} student_id={val.student_id} />))}
                </tbody>
            </table>
        </div>
    )
}


export function StudentRow({ first_name, last_name, email, education, student_id, card_id, finger_id, _id }: StudentProps) {
    const student = { first_name, last_name, email, education, student_id, card_id, finger_id, _id }
    return (
        <tr>
            <td className="p-4 flex items-center gap-3">
                <div
                    className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-semibold text-slate-600">
                    {`${first_name[0]}${last_name[0]}`.toUpperCase()}
                </div>
                <div>
                    <p className="font-semibold text-slate-800">
                        {toTitleCase(`${first_name} ${last_name}`)}
                    </p>
                    <p className="text-sm text-slate-500">{email}</p>
                </div>
            </td>
            <td className="p-4 text-slate-600">{student_id}</td>
            <td className="p-4 text-slate-600">{education.program.toUpperCase()}</td>
            <td className="p-4 text-slate-600">{education.year}</td>
            <td className="p-4">
                <span
                    className="px-3 py-1 text-sm rounded-full bg-green-100 text-green-600">
                    Enrolled
                </span>
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

    return (
        <Popover>
            <PopoverTrigger asChild>
                <MoreHoriz />
            </PopoverTrigger>
            <PopoverContent className="w-25">
                <div className='grid grid-cols-1'>

                    <ButtonDialog
                        open={openStudentForm}
                        onOpenChange={setOpenStudentForm}
                        placeholder="Edit"
                        title="Edit Student Details"
                        description="Fill in the student's detail you want to update."
                        className='p-2 hover:bg-slate-100'
                    >
                        <UpdateStudentForm setOpen={setOpenStudentForm} {...student} />
                    </ButtonDialog>
                    <ButtonDialog
                        open={openDeleteStudentForm}
                        placeholder="Delete"
                        onOpenChange={setOpenDeleteStudentForm}
                        title="Are you sure to delete student data?"
                        description="Permanent deletion of student data from the database."
                        className=' text-red-400 p-2 hover:bg-slate-100'
                    >
                        <DeleteStudentForm id={student._id || ''} setOpen={setOpenDeleteStudentForm} />
                    </ButtonDialog>
                </div>
            </PopoverContent>
        </Popover>)
}
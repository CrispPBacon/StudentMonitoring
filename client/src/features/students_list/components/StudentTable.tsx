import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks'
import type { StudentProps } from '@/lib/types'
import { toTitleCase } from '@/utils/formatString'
import { MoreHoriz } from '@mui/icons-material'
import { useEffect } from 'react'
import { fetchStudents } from '../studentThunks'

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
                    {students.map(val => (<StudentRow key={val._id} card_id={val.card_id} first_name={val.first_name} last_name={val.last_name} email={val.email} education={val.education} student_id={val.student_id} />))}
                </tbody>
            </table>
        </div>
    )
}


export function StudentRow({ first_name, last_name, email, education, student_id }: StudentProps) {
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
                <MoreHoriz />
            </td>
        </tr>

    )
}
import { fetchStudents } from "@/features/StudentsLog";
import StudentTable from "@/features/StudentsLog/components/StudentTable";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { useEffect, } from "react";

export default function StudentList() {
    const { students } = useAppSelector(state => state.student)

    const dispatch = useAppDispatch()

    useEffect(() => {
        if (students.length == 0)
            dispatch(fetchStudents())
    }, [dispatch, students])




    return (
        <main className="p-8 overflow-y-auto rounded-2xl bg-slate-50/95 animate-entry grid grid-rows-[5rem_1fr_2.5rem]">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-slate-800">Student Management</h1>
                <p className="text-sm text-slate-500">List of registered students</p>
            </div>
            {/* <--- Components ---> */}
            <StudentTable />
            {/* <!-- Footer / Pagination Placeholder --> */}
            {/* <div className="p-4 border-t border-slate-200 flex items-center justify-between text-sm text-slate-500">
                <span>Showing 1–2 of 200 students</span>
                <div className="space-x-2">
                    <Button variant="default">Previous</Button>
                    <button className="px-3 py-1 bg-slate-200 rounded hover:bg-slate-300">Previous</button>
                    <button className="px-3 py-1 bg-slate-800 text-white rounded">1</button>
                    <button className="px-3 py-1 bg-slate-200 rounded hover:bg-slate-300">2</button>
                    <Button variant="default">Next</Button>
                </div>
            </div> */}
        </main >)
}

import StudentTable from "@/features/students_list/components/StudentTable";

export default function StudentList() {
    return (
        <main className="p-8 overflow-y-auto rounded-2xl bg-slate-50/95 animate-entry">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-slate-800">Student Management</h1>
                <p className="text-sm text-slate-500">List of registered students</p>
            </div>
            {/* <--- Components ---> */}
            <StudentTable />
        </main >)
}

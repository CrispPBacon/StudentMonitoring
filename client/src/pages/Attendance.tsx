import { Button } from "@/components/ui/button";
import { nextPage, previousPage } from "@/features/attendance";
import AttendanceList from "@/features/attendance/components/AttendanceList";
import { useAppDispatch, useAppSelector, } from "@/hooks/reduxHooks";

export default function Attendance() {
    const { page, pageCount } = useAppSelector(state => state.attendanceLog)
    const dispatch = useAppDispatch()


    return (
        <main className="p-8 overflow-y-auto rounded-2xl bg-slate-50/95 animate-entry grid grid-rows-[5rem_1fr_2.5rem]">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-slate-800">Attendance Logs</h1>
                <p className="text-sm text-slate-500">School Campus Entrance Monitoring Logs</p>
            </div>
            {/* <--- Components ---> */}
            <AttendanceList />

            {/* <!-- Footer / Pagination Placeholder --> */}
            <div className="p-4 border-t border-slate-200 flex items-center justify-between text-sm text-slate-500">
                <span>Showing {page} of {pageCount} pages.</span>
                <div className="space-x-2">
                    <Button onClick={() => dispatch(previousPage())} variant="default" disabled={page == 1}>Previous</Button>
                    {/* <button className="px-3 py-1 bg-slate-200 rounded hover:bg-slate-300">Previous</button> */}
                    {/* <button className="px-3 py-1 bg-slate-800 text-white rounded">1</button>
                    <button className="px-3 py-1 bg-slate-200 rounded hover:bg-slate-300">2</button> */}
                    <Button onClick={() => dispatch(nextPage())} variant="default" disabled={page == pageCount}>Next</Button>
                </div>
            </div>

        </main >
    )
}

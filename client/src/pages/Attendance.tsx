import { Button } from "@/components/ui/button";
import { nextPage, previousPage } from "@/features/AttendanceLog";
import { setPage } from "@/features/AttendanceLog/attendanceSlice";
import AttendanceList from "@/features/AttendanceLog/components/AttendanceList";
import { useAppDispatch, useAppSelector, } from "@/hooks/reduxHooks";

export default function Attendance() {
    const { page, pageCount } = useAppSelector(state => state.attendanceLog)
    const dispatch = useAppDispatch()


    const pageNumbers = [];

    // Always show first page
    if (page > 3) pageNumbers.push(1);

    // Ellipsis if far from first page
    if (page > 4) pageNumbers.push("...");

    // Pages around current
    for (let i = page - 1; i <= page + 1; i++) {
        if (i > 0 && i <= pageCount) pageNumbers.push(i);
    }

    // Ellipsis if far from last page
    if (page < pageCount - 3) pageNumbers.push("...");

    // Always show last page
    if (page < pageCount - 2) pageNumbers.push(pageCount);


    return (
        <main className="p-8 overflow-y-auto rounded-2xl bg-slate-50/95 animate-entry grid grid-rows-[5rem_1fr_3.5rem]">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-slate-800">Attendance Logs</h1>
                <p className="text-sm text-slate-500">School Campus Entrance Monitoring Logs</p>
            </div>
            {/* <--- Components ---> */}
            <AttendanceList />

            {/* <!-- Footer / Pagination Placeholder --> */}
            {
                pageCount > 1 ? <>
                    <div className="p-4 border-t overflow-hidden border-slate-200 flex flex-col items-center justify-between text-sm text-slate-500">
                        <div className="w-full flex justify-between ">
                            <Button onClick={() => dispatch(previousPage())} variant="default" disabled={page == 1}>Previous</Button>
                            <span>
                                {pageNumbers.map((num, idx) => {
                                    const isEllipsis = num === "...";

                                    return (
                                        <div key={idx} className="inline-flex w-12 justify-center">
                                            {isEllipsis ? (
                                                <span className="text-slate-400 select-none">…</span>
                                            ) : (
                                                <Button
                                                    onClick={() => dispatch(setPage(num as number))}
                                                    variant={page === num ? "default" : "ghost"}
                                                    className="w-full"
                                                >
                                                    {num}
                                                </Button>
                                            )}
                                        </div>
                                    );
                                })}
                            </span>
                            <Button onClick={() => dispatch(nextPage())} variant="default" disabled={page == pageCount}>Next</Button>
                        </div>
                    </div>
                    <span className=" w-full text-center mt-1 text-sm text-slate-500">Page {page} of {pageCount} </span>
                </>
                    : null
            }
        </main >
    )
}

import type { AttendanceProps } from "@/lib/types"
import { formatPHDate, months } from "@/utils/formatDate"

export default function StudentTable() {
    return (
        <div className="p-4">
            {/* <!-- Filters --> */}
            <strong>Recent Entry Logs</strong>
            {/* <div className="mb-4 mt-4 flex flex-wrap gap-2">
                <button
                    className="px-4 sm:px-5 py-2 rounded-full bg-slate-900 text-white text-sm shadow"
                >
                    Daily
                </button>
                <button
                    className="px-4 sm:px-5 py-2 rounded-full bg-white text-slate-600 text-sm shadow-sm hover:bg-slate-50"
                >
                    Weekly
                </button>
                <button
                    className="px-4 sm:px-5 py-2 rounded-full bg-white text-slate-600 text-sm shadow-sm hover:bg-slate-50"
                >
                    Monthly
                </button>
            </div> */}
            {/* <!-- End of Filters --> */}

            {/* <!-- Student Table List --> */}
            <div className="grid grid-cols-4 text-sm mt-4 ">
                {/* <!-- Header --> */}
                <div className="font-bold p-2 text-slate-600 border-b-2">Student ID</div>
                <div className="font-bold p-2 text-slate-600 border-b-2">Student Name</div>
                <div className="font-bold p-2 text-slate-600 border-b-2">Time In</div>
                <div className="font-bold p-2 text-slate-600 border-b-2">Date</div>

                {/* <!-- Row 1 --> */}
                <div className="p-2">17-02919</div>
                <div className="p-2">Allan Soriano</div>
                <div className="p-2">07:30 AM</div>
                <div className="p-2">January 12, 2026</div>

                {/* {attendanceLogs.slice(attendanceLogs.length - 5, attendanceLogs.length).map(((val) => (<StudentData key={val._id} student={val.student} createdAt={val.createdAt} type={"entry"} />)))} */}
            </div>
            {/* <!-- End of Student Table List --> */}
        </div>
    )
}

export function StudentData({ student, createdAt }: AttendanceProps) {
    const { month, day, year, hour, minute, unit } = formatPHDate(createdAt)
    return (<>
        <div className="p-2">{student._id}</div>
        <div className="p-2">{`${student.first_name} ${student.last_name}`}</div>
        <div className="p-2">{`${hour}:${minute} ${unit}`}</div>
        <div className="p-2">{`${months[parseInt(month) - 1]} ${day}, ${year}`}</div>
    </>)
}
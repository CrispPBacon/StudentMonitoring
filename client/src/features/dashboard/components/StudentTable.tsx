import type { AttendanceProps } from "@/lib/types";
import { Circle, } from "@mui/icons-material";
import { StudentData } from "./StudentData";
import { useSocket } from "@/hooks/useSocket";


interface StudentTableProps { attendanceLog: AttendanceProps[] }
export default function StudentTable({ attendanceLog }: StudentTableProps) {
    const { connected } = useSocket();

    const latestFive = [...attendanceLog]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 10);

    return (
        <div className="p-4">
            {/* <!-- Header --> */}
            <span className="flex items-center justify-between gap-4">
                <h1 className="text-2xl font-bold text-slate-800">Campus Activity Log</h1>
                <span className="text-sm text-slate-500 bg-green-100 py-2 px-3 rounded-2xl">
                    <Circle style={{ fontSize: '.5rem' }} className={`${connected ? "text-green-400" : "text-red-400"} mr-1`} />
                    <span>Live Monitoring</span>
                </span>
            </span>
            {/* <!-- Student Table List --> */}
            <div className=" text-sm mt-4 overflow-y-auto h-80 ">
                {attendanceLog.length > 0 ? latestFive.map(val => {
                    const { createdAt, type, student } = val
                    const { first_name, last_name, student_id } = student || {}
                    return <StudentData key={val._id} first_name={first_name} last_name={last_name} student_id={student_id} createdAt={createdAt} type={type} />
                }) : null}

            </div>
        </div>
    )
}
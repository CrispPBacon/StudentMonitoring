import { useAppSelector } from "@/hooks/reduxHooks"
import { formatPHDate } from "@/utils/formatDate"
import { toTitleCase } from "@/utils/formatString";
import { Circle, LoginOutlined, LogoutOutlined } from "@mui/icons-material";

export default function StudentTable() {
    const { attendanceLog } = useAppSelector(state => state.attendanceLog)

    const latestFive = [...attendanceLog]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 10);

    return (
        <div className="p-4">
            {/* <!-- Header --> */}
            <span className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-slate-800">Campus Activity Log</h1>
                <span className="text-sm text-slate-500">
                    <Circle style={{ fontSize: '.5rem' }} className="text-green-400 mr-1" />
                    <span>Live Monitoring</span>
                </span>
            </span>
            {/* <!-- Student Table List --> */}
            <div className="grid grid-cols-1 text-sm mt-4 overflow-y-auto h-80 ">
                {attendanceLog.length > 0 ? latestFive.map(val => {
                    const { createdAt, type, student } = val
                    const { first_name, last_name, student_id } = student
                    return <StudentData key={val._id} first_name={first_name} last_name={last_name} student_id={student_id} createdAt={createdAt} type={type} />
                }) : null}

            </div>
        </div>
    )
}

interface StudentDataProps {
    student_id: string
    first_name: string
    last_name: string
    createdAt: string
    type: string
}
export function StudentData({ student_id, first_name, last_name, createdAt, type }: StudentDataProps) {
    const { hour, minute, unit } = formatPHDate(createdAt)
    return (
        <div className="flex items-center justify-between p-5 hover:bg-slate-50 animate-entry">
            <div className="flex items-center gap-4">
                <div className={`w-10 h-10 flex items-center justify-center rounded-full ${type == "exit" ? "bg-red-100 text-red-600" : "bg-emerald-100 text-emerald-600"} font-bold`}>
                    {type == 'entry' ? <LoginOutlined /> : <LogoutOutlined />}
                </div>
                <div>
                    <p className="font-semibold text-slate-800">
                        {`${toTitleCase(`${first_name} ${last_name}`)}`}
                    </p>
                    <p className="text-sm text-slate-500">
                        {type == "entry" ? "Entered the campus" : "Left the campus"}
                    </p>
                </div>
            </div>
            <span className="text-sm text-slate-400">
                <h6>{student_id}</h6>
                <h6>Today • {`${hour}:${minute} ${unit}`}</h6>
            </span>
        </div>
    )
}
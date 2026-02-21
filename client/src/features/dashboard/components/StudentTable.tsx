// import { useAppSelector } from "@/hooks/reduxHooks"
import { formatPHDate } from "@/utils/formatDate"

export default function StudentTable() {
    // const { attendanceLog } = useAppSelector(state => state.attendanceLog)

    // const latestFive = [...attendanceLog]
    //     .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    //     .slice(0, 5);
    return (
        <div className="p-4">
            {/* <!-- Filters --> */}
            <strong>Entry Logs</strong>
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
                <div className="font-bold p-2 text-slate-600 border-b-2">Time</div>
                <div className="font-bold p-2 text-slate-600 border-b-2">Type</div>

                {/* <!-- Row 1 --> */}
                {/* <div className="p-2">17-02919</div>
                <div className="p-2">Allan Soriano</div>
                <div className="p-2">07:30 AM</div>
                <div className="p-2">January 12, 2026</div> */}
                {/* {attendanceLog.length > 0 ? latestFive.map(val => {
                    const { createdAt } = val
                    console.log(val)
                    return <StudentData key={val._id} first_name="Allan" last_name="Soriano" student_id="17-02919" createdAt={createdAt} type="Entry" />
                }) : null} */}

                <StudentData first_name="Allan" last_name="Soriano" student_id="17-02919" createdAt="2026-02-20T18:26:35.132Z" type="Entry" />
                <StudentData first_name="Allan" last_name="Soriano" student_id="17-02919" createdAt="2026-02-20T18:26:35.132Z" type="Exit" />
                <StudentData first_name="Allan" last_name="Soriano" student_id="17-02919" createdAt="2026-02-20T18:26:35.132Z" type="Entry" />
                <StudentData first_name="Allan" last_name="Soriano" student_id="17-02919" createdAt="2026-02-20T18:26:35.132Z" type="Exit" />
                <StudentData first_name="Allan" last_name="Soriano" student_id="17-02919" createdAt="2026-02-20T18:26:35.132Z" type="Entry" />
            </div>
            {/* <!-- End of Student Table List --> */}
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
    return (<>
        <div className="p-2">{student_id}</div>
        <div className="p-2">{`${first_name} ${last_name}`}</div>
        <div className="p-2">{`${hour}:${minute} ${unit}`}</div>
        <div className="p-2">{type}</div>
    </>)
}
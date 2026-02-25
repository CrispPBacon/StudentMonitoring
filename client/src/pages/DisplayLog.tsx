import bg from "@/assets/Letran Clock-in.png"
import { useSocket } from "@/hooks/useSocket";
import { useEffect, useState } from "react"
import { CardID, StatusIndicator } from "@/features/display_log";
import type { AttendanceProps, } from "@/lib/types";
import { backendUrl } from "@/lib/api";
import { Login, PersonSearch } from "@mui/icons-material";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { AttendanceLog } from "@/features/attendance/attendanceThunks";



export default function DisplayLog() {
    const [time, setTime] = useState(new Date())
    const [inputShow, setInputShow] = useState(false)
    const [studentID, setStudentID] = useState('')
    const [log, setLog] = useState<AttendanceProps | null>(null)
    const { socket, connected, } = useSocket();
    const serverStatus = connected ? "online" : "offline"

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(timer); // cleanup when component unmounts
    }, []);

    useEffect(() => {
        const timerRef = { current: null as ReturnType<typeof setTimeout> | null };
        const delayRef = { current: null as ReturnType<typeof setTimeout> | null };

        const handleAttendance = (data: AttendanceProps) => {

            // Clear previous timers if any
            if (timerRef.current) {
                clearTimeout(timerRef.current);
                timerRef.current = null;
            }
            if (delayRef.current) {
                clearTimeout(delayRef.current);
                delayRef.current = null;
            }

            // Hide current student first
            setLog(null);

            // Delay before showing the new student
            delayRef.current = setTimeout(() => {
                setLog(data);

                // Hide after 5 seconds
                timerRef.current = setTimeout(() => {
                    setLog(null);
                }, 5000);

            }, 500); // 500ms delay before showing new student
        };

        socket.on("attendance", handleAttendance);

        return () => {
            socket.off("attendance", handleAttendance);

            if (timerRef.current) clearTimeout(timerRef.current);
            if (delayRef.current) clearTimeout(delayRef.current);
        };
    }, [socket]);


    const dispatch = useAppDispatch()

    const handleSubmitID = () => {
        if (!inputShow) return setInputShow(true)
        dispatch(AttendanceLog({ student_id: studentID }))
        console.log("Sent")
        setInputShow(false)
        setStudentID('')
    }

    return (
        <div style={{ backgroundImage: `url(${bg})` }} className="relative bg-fixed bg-no-repeat bg-cover 2xl:container 2xl:mx-auto min-h-dvh grid grid-cols-1 grid-rows-[5rem_1fr]">
            {/* TITLE */}
            <div className="overflow-hidden flex w-full justify-end p-10 items-center">
                {/* <h1 className="text-4xl font-extrabold text-slate-800 tracking-wider">Letran Clock-in</h1> */}
                {/* DISPLAY STATUS */}
                <div className="flex gap-5 z-20">
                    <span className={`items-center relative ${!inputShow ? "hidden" : "flex"}`}>
                        <PersonSearch className="absolute left-5" />
                        <Input value={studentID} onChange={(e) => setStudentID(e.target.value)} type="text" placeholder="Enter your Student ID" className={`bg-slate-100 p-7 pl-14`} />
                    </span>
                    <Button variant="ghost" className="bg-green-100 text-green-400 hover:bg-green-200 hover:text-green-600  p-8 px-10 rounded-2xl" onClick={handleSubmitID}><Login fontSize="large" /></Button>
                    <StatusIndicator label="Card Reader" status={"connected"} />
                    <StatusIndicator label="Server" status={serverStatus} />
                    <span className="bg-blue-100 text-blue-900 font-bold text-2xl z-20 shadow-md flex items-center text-center px-5 py-2 rounded-sm">
                        <h2>{time.toLocaleTimeString()}</h2>
                    </span>
                </div>
            </div>
            {/* CARD */}
            <div className="2xl:px-0 md:px-5 w-full flex justify-center items-center gap-10">
                {log ? <h1 className={`${log.type == "entry" ? "text-green-400 bg-green-100" : "bg-red-100 text-red-400"} z-20 p-3 text-7xl uppercase tracking-widest`}>{log.type == "entry" ? "Welcome" : "Goodbye"}</h1> : null}
                {log ? <CardID student_id={(log?.student.student_id || "N/A")} type={log?.type} program={log?.student.education.program || "N/A"} display_photo={typeof log?.student.display_photo == "string" ? `${backendUrl}/display_photo/${log?.student.display_photo}` : `https://avatar.oxro.io/avatar.svg?name=${log.student.first_name}+${log.student.last_name}&background=ff6b6b&caps=3`} /> : null}
                {log ? <h1 className={`${log.type == "entry" ? "text-green-400 bg-green-100" : "bg-red-100 text-red-400"} z-20 p-3 text-7xl uppercase tracking-widest`}>Student</h1> : null}
            </div>
        </div>
    )
}


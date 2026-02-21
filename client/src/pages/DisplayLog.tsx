import bg from "@/assets/Letran Clock-in.png"
import { useSocket } from "@/hooks/useSocket";
import { useEffect, useState } from "react";
import { CardID, StatusIndicator } from "@/features/display_log";
import type { AttendanceProps, } from "@/lib/types";



export default function DisplayLog() {
    const [log, setLog] = useState<AttendanceProps | null>(null)
    const { socket, connected, } = useSocket();
    const serverStatus = connected ? "online" : "offline"


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


    return (
        <div style={{ backgroundImage: `url(${bg})` }} className="relative bg-fixed bg-no-repeat bg-cover 2xl:container 2xl:mx-auto min-h-dvh flex flex-col items-center justify-center">
            {/* TITLE */}
            <div className="absolute top-0 flex w-full justify-end p-10 items-center">
                {/* <h1 className="text-4xl font-extrabold text-slate-800 tracking-wider">Letran Clock-in</h1> */}
                {/* DISPLAY STATUS */}
                <div className="flex gap-5">
                    <StatusIndicator label="Card Reader" status={"connected"} />
                    <StatusIndicator label="Server" status={serverStatus} />
                </div>
            </div>
            {/* CARD */}
            <div className="2xl:px-0 md:px-5 w-full flex justify-center items-center gap-10">
                {log ? <h1 className={`${log.type == "entry" ? "text-green-400 bg-green-100" : "bg-red-100 text-red-400"} p-3 text-7xl uppercase tracking-widest`}>{log.type == "entry" ? "Welcome" : "Goodbye"}</h1> : null}
                {log ? <CardID student_id={(log?.student.student_id || "N/A")} type={log?.type} program={log?.student.education.program || "N/A"} display_photo={log?.student.display_photo} /> : null}
                {log ? <h1 className={`${log.type == "entry" ? "text-green-400 bg-green-100" : "bg-red-100 text-red-400"} p-3 text-7xl uppercase tracking-widest`}>Student</h1> : null}
            </div>
        </div>
    )
}


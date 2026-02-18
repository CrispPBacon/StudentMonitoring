import { toTitleCase } from "@/lib/utils";
import { Circle } from "@mui/icons-material";
import logo from "@/assets/logo.webp"
import idTemplate from "@/assets/letran-bg.png"
import bg from "@/assets/Letran Clock-in.png"
import { useSocket } from "@/hooks/useSocket";
import { useEffect, useState } from "react";

interface studentData {
    student_id: string
    program: string
    display_photo: string
    type: "entry" | "exit"
}

export default function DisplayLog() {
    const [student, setStudent] = useState<studentData | null>(null)
    const { socket, connected, } = useSocket();
    const serverStatus = connected ? "online" : "offline"


    useEffect(() => {
        const timerRef = { current: null as ReturnType<typeof setTimeout> | null };
        const delayRef = { current: null as ReturnType<typeof setTimeout> | null };

        const handleAttendance = (data: studentData) => {

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
            setStudent(null);

            // Delay before showing the new student
            delayRef.current = setTimeout(() => {
                setStudent(data);
                console.log("HERE", data);

                // Hide after 5 seconds
                timerRef.current = setTimeout(() => {
                    setStudent(null);
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
                    <StatusIndicator label="Card Reader" status={"offline"} />
                    <StatusIndicator label="Server" status={serverStatus} />
                </div>
            </div>
            {/* CARD */}
            <div className="2xl:px-0 md:px-5 w-full flex justify-center items-center">
                {student ? <Card student_id={(student?.student_id || "N/A")} program={student?.program || "N/A"} display_photo={student?.display_photo} /> : null}
            </div>
        </div>
    )
}

type Status = "online" | "offline" | "connected";
interface StatusIndicatorProps {
    label: string
    status: Status
    statusColor?: string
}
export function StatusIndicator({ label, status, statusColor }: StatusIndicatorProps) {
    const bulletColor = status == "online" ? "text-green-500" : status == "offline" ? "text-red-800" : "text-blue-500"
    return (
        <div className="bg-white z-20 shadow-md flex items-center gap-2 pl-2 pr-10 py-2 rounded-sm">
            <Circle sx={{ fontSize: 15 }} className={statusColor ?? bulletColor} />
            <div>
                <p>{label}</p>
                <strong className={"font-medium " + (statusColor ?? bulletColor)}>{toTitleCase(status)}</strong>
            </div>
        </div>
    )
}

interface CardType {
    student_id?: string
    program?: string
    display_photo?: string
}
export function Card({ student_id, program, display_photo }: CardType) {
    return (
        <div className="z-10 before:top-0 before:left-0 before:-z-10 before:w-full before:h-full before:bg-black before:opacity-25 before:absolute ">
            <div style={{ backgroundImage: `url(${idTemplate})` }} className="z-10 rounded-2xl shadow-2xl border-2 bg-slate-100 overflow-hidden flex flex-col items-center w-100 h-150">
                {/* LOGO AND TITLE */}
                <div className="flex items-center gap-2 px-5 mt-3 mb-10 text-white">
                    <span className="rounded-full w-20 h-20 flex bg-white">
                        <img src={logo} alt="Letran Logo" />
                    </span>
                    <span className="text-center">
                        <small className="font-medium text-xs">Colegio de San Juan de Letran Manaoag</small>
                        <h1 className='font-gothic text-4xl tracking-widest'>LETRAN</h1>
                        <small className="font-medium text-[.5rem] tracking-tight">CASTRO ST. POB. MANAOAG, PANGASINAN PHILIPPINES</small>
                    </span>
                </div>
                {/* DISPLAY PHOTO */}
                <span className="w-70 h-80 border-6 rounded-2xl overflow-hidden flex items-center justify-center border-blue-900 bg-slate-50">
                    <img src={display_photo ?? "https://i.pinimg.com/736x/2f/15/f2/2f15f2e8c688b3120d3d26467b06330c.jpg"} alt="avatar" />
                </span>
                {/* DETAILS */}
                <div className="border-2 w-[90%] my-5">
                    <div className="grid grid-cols-2 text-center font-medium">
                        <div className="border-2 bg-slate-50 border-black py-2">COURSE</div>
                        <div className="border-2 bg-slate-50 border-black py-2">{program?.toUpperCase()}</div>
                        <div className="border-2 bg-slate-50 border-black py-2">ID NO.</div>
                        <div className="border-2 bg-slate-50 border-black py-2">{student_id}</div>
                    </div>
                </div>
                {/* FOOTER */}
                <span className="bg-blue-950 h-5 w-full"></span>
                <span className="bg-red-600 h-15 w-full"></span>
            </div>
        </div>
    );
}
import { toTitleCase } from "@/lib/utils";
import { Circle } from "@mui/icons-material";
import logo from "@/assets/logo.webp"
import { useSocket } from "@/hooks/useSocket";
export default function DisplayLog() {
    const { connected, } = useSocket();
    const serverStatus = connected ? "online" : "offline"

    return (
        <div className="2xl:container 2xl:mx-auto gap-10 min-h-dvh flex flex-col items-center justify-center">
            {/* TITLE */}
            <div className="flex w-full  justify-around items-center">
                <h1 className="text-4xl font-extrabold text-slate-800 tracking-wider">Letran Clock-in</h1>
                {/* DISPLAY STATUS */}
                <div className="flex gap-5">
                    <StatusIndicator label="Card Reader" status={"offline"} />
                    <StatusIndicator label="Server" status={serverStatus} />
                </div>
            </div>
            {/* CARD */}
            <div className="2xl:px-0 md:px-5 w-full flex justify-center items-center">
                <Card />
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
        <div className="shadow-md flex items-center gap-2 pl-2 pr-10 py-2 rounded-sm">
            <Circle sx={{ fontSize: 15 }} className={statusColor ?? bulletColor} />
            <div>
                <p>{label}</p>
                <strong className={"font-medium " + (statusColor ?? bulletColor)}>{toTitleCase(status)}</strong>
            </div>
        </div>
    )
}


export function Card() {
    return (
        <div className="p-10 shadow-md flex justify-around w-full">
            <span className="overflow-hidden bg-white flex w-80 h-80  rounded-full border-solid border-10 border-slate-800">
                <img src={logo} alt="profile" />
            </span>
            <div className="gap-20 flex justify-center flex-col">
                <span>
                    <p className="text-xl tracking-widest font-medium text-slate-500">STUDENT ID</p>
                    <h1 className="text-7xl font-extrabold text-slate-800 tracking-wider">17-02919</h1>
                </span>
                <div>
                    <span className="px-10 py-5 rounded-2xl text-2xl font-semibold shadow-md bg-green-100 text-green-700">Access Granted</span>
                </div>
            </div>
        </div>
    )
}
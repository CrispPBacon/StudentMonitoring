import { toTitleCase } from "@/utils/formatString";
import { Circle } from "@mui/icons-material";

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
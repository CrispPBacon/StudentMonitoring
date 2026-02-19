interface OverviewProps {
    totalStudents: number
    entry: number
    exit: number
    totalTaps: number
}
export default function Overview({ totalStudents, entry, exit, totalTaps }: OverviewProps) {
    return (
        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl shadow-sm p-4 sm:p-5">
                <span className="font-medium">Total Students</span>
                <p className="mt-5 font-bold text-2xl">{totalStudents}</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-4 sm:p-5">
                <span className="font-medium">Entry Today</span>
                <p className="mt-5 font-bold text-2xl">{entry}</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-4 sm:p-5">
                <span className="font-medium">Exit Today</span>
                <p className="mt-5 font-bold text-2xl">{exit}</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-4 sm:p-5">
                <span className="font-medium">Total Card Tap</span>
                <p className="mt-5 font-bold text-2xl">{`${totalTaps}`}</p>
            </div>
        </div>
    )
}


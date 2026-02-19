export default function DisplayCover() {
    return (
        <div className="hidden md:flex flex-col justify-center bg-linear-to-br from-slate-600 to-gray-700 text-white p-12">
            {/* <!-- Badge --> */}
            <span
                className="inline-block mb-4 px-4 py-1 rounded-full bg-white/20 text-sm w-fit"
            >
                🎓 Student Monitoring Platform
            </span>

            {/* <!-- Headline --> */}
            <h2 className="text-4xl font-bold leading-tight mb-4">
                Stay Connected. <br />Stay Informed.
            </h2>

            {/* <!-- Subtext --> */}
            <p className="text-indigo-100 max-w-md mb-10">
                Track student attendance, send instant SMS alerts to parents, and get
                actionable insights — all in one secure dashboard.
            </p>

            {/* <!-- DASHBOARD MOCKUP --> */}
            <div
                className="bg-white/10 backdrop-blur rounded-xl p-6 shadow-lg max-w-md"
            >
                {/* <!-- Top cards --> */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-white/20 rounded-lg p-3">
                        <p className="text-xs text-indigo-100">Students</p>
                        <p className="text-xl font-bold">1,248</p>
                    </div>
                    <div className="bg-white/20 rounded-lg p-3">
                        <p className="text-xs text-indigo-100">Attendance</p>
                        <p className="text-xl font-bold">94%</p>
                    </div>
                    <div className="bg-white/20 rounded-lg p-3">
                        <p className="text-xs text-indigo-100">Alerts</p>
                        <p className="text-xl font-bold">7</p>
                    </div>
                </div>

                {/* <!-- Fake chart --> */}
                <div className="flex items-end gap-2 h-24">
                    <div className="w-6 bg-white/40 rounded-t h-12"></div>
                    <div className="w-6 bg-white/60 rounded-t h-20"></div>
                    <div className="w-6 bg-white/40 rounded-t h-16"></div>
                    <div className="w-6 bg-white/70 rounded-t h-24"></div>
                    <div className="w-6 bg-white/50 rounded-t h-14"></div>
                </div>

                <p className="text-xs text-indigo-100 mt-4">
                    Weekly performance overview
                </p>
            </div>
        </div>

    )
}
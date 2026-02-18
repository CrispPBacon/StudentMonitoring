import { useState, type FormEvent } from "react";
import LetranBG from '@/assets/LetranBG.png'
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { loginUser } from "./userThunks";
export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useAppDispatch()
    const { user, error } = useAppSelector((state) => state.user)

    const handleLogin = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(loginUser({ email, password }))
        console.log(error)
        console.log(user)
    }


    return (
        <div style={{ backgroundImage: `url(${LetranBG})` }} className="bg-cover bg-fixed bg-center min-h-screen bg-slate-100 flex items-center justify-center">
            <div className="w-full max-w-6xl bg-white shadow-xl rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
                {/* <!-- LEFT: LOGIN FORM --> */}
                <div className="p-10 flex flex-col justify-center">
                    <h1 className="text-3xl font-bold text-slate-800 mb-2">Welcome Back</h1>
                    <p className="text-slate-500 mb-8">Sign in to continue to your dashboard</p>
                    <form className="space-y-5" onSubmit={handleLogin}>
                        <div>
                            <label className="text-sm text-slate-600">Email</label>
                            <input onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                                placeholder="admin@school.edu" />
                        </div>
                        <div>
                            <label className="text-sm text-slate-600">Password</label>
                            <input onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                                placeholder="••••••••" />
                        </div>
                        <button className="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-semibold hover:bg-indigo-700 transition">
                            Sign In
                        </button>
                    </form>
                    <p className="text-xs text-slate-500 mt-6">Secure access for authorized personnel only</p>
                </div>

                {/* <!-- RIGHT: COVER --> */}
                <RightCover />
            </div>
        </div >
    )
}


function RightCover() {
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
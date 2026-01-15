import { AccountBox, Dashboard, ExitToApp, School } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';


export default function Sidebar() {

    return (
        <aside className="px-4">
            {/* <!-- Title --> */}
            <span className="mt-10 mb-5 flex px-4">
                <strong className="font-mono text-3xl">
                    CLOCK-<span className="text-purple-500">IN</span>
                </strong>
            </span>
            {/* <!-- End of Title --> */}
            <nav>
                <ul>
                    <NavLink to={""} className="border-l-4 border-transparent transition-all duration-300  hover:pl-6 px-4 py-4 text-base gap-2 text-slate-600 hover:text-purple-500 flex items-center">
                        <Dashboard />
                        <p>Dashboard</p>
                    </NavLink>
                    <NavLink to={"attendance"} className="border-l-4 border-transparent transition-all duration-300  hover:pl-6 px-4 py-4 text-base gap-2 text-slate-600 hover:text-purple-500 flex items-center">
                        <AccountBox />
                        <p>Attendance Log</p>
                    </NavLink>
                    <NavLink to={"students"} className="border-l-4 border-transparent transition-all duration-300  hover:pl-6 px-4 py-4 text-base gap-2 text-slate-600 hover:text-purple-500 flex items-center">
                        <School />
                        <p>Students</p>
                    </NavLink>
                </ul>
            </nav>
            <span>
                <button
                    className="cursor-pointer border-l-4 border-transparent hover:border-red-400 text-red-300 hover:text-red-400 hover:bg-red-100 px-4 py-4 flex items-center gap-2 w-full"
                >
                    <ExitToApp />
                    <p>Logout</p>
                </button>
            </span>
        </aside>
    )
}

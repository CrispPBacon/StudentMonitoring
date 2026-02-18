import { AccountBox, Dashboard, ExitToApp, School } from '@mui/icons-material';
import { NavLink, type NavLinkProps } from 'react-router-dom';
import logo from "@/assets/clock-in.webp"
import { cn } from '@/lib/utils';

export default function Sidebar() {

    return (
        <aside className="px-4 rounded-2xl bg-slate-50/95">
            {/* <!-- Title --> */}
            <span className="mt-10 mb-5 flex flex-col px-4 items-center gap-3">
                <img src={logo} alt="logo" className="w-20 h-20" />
                <strong className="font-mono text-3xl">
                    CLOCK-<span className="text-purple-500">IN</span>
                </strong>
            </span>
            {/* <!-- End of Title --> */}
            <NavLinks />
        </aside>
    )
}


function NavLinks() {
    return (
        <nav>
            <ul>
                <Link to={""} icon={Dashboard}>Dashboard</Link>
                <Link to={"attendance"} icon={AccountBox}>Attendance</Link>
                <Link to={"students"} icon={School}>Students List</Link>
                <Logout />
            </ul>
        </nav>
    )
}

type LinkProps = NavLinkProps & {
    children: React.ReactNode,
    className?: string
    icon?: React.ElementType // I want this to accept MUI icons...
}
function Link({ children, className, icon: Icon, ...props }: LinkProps) {
    return <NavLink className={cn("border-l-4 border-transparent transition-all duration-300  hover:pl-6 px-4 py-4 text-base gap-2 text-slate-600 hover:text-purple-500 flex items-center", className)} {...props}>
        {Icon && <Icon />}
        <p>{children}</p>
    </NavLink>
}


function Logout() {
    return (
        <span>
            <button
                className="cursor-pointer border-l-4 border-transparent hover:border-red-400 text-red-300 hover:text-red-400 hover:bg-red-100 px-4 py-4 flex items-center gap-2 w-full"
            >
                <ExitToApp />
                <p>Logout</p>
            </button>
        </span>

    )
}

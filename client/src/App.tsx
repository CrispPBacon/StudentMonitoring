import { Outlet, Route, Routes } from "react-router-dom"
import Sidebar from "./components/layout/Sidebar"
import Dashboard from "./features/dashboard/Dashboard"
import { Toaster } from "sonner"
import Attendance from "./features/attendance/Attendance"

export default function App() {
  return (
    <Routes>
      <Route element={<AppWrapper />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/students" element={<h1>HELLO</h1>} />
      </Route>
    </Routes>

  )
}

function AppWrapper() {
  return (<>
    <Toaster theme="dark" />
    <div className="2xl:container 2xl:mx-auto grid grid-cols-[16rem_1fr] gap-5 h-dvh w-full" >
      <Sidebar />
      <Outlet />
    </div>
  </>)
}
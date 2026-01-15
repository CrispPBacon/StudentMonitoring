import Sidebar from "@/components/Sidebar"
import Dashboard from "@/page/Dashboard"

import { Routes, Route } from "react-router-dom"
import Attendance from "@/page/Attendance"
import Students from "@/page/Students"
import { Toaster } from "@/components/ui/sonner"

export default function App() {
  return (
    <>
      <Toaster />
      <div className="2xl:container 2xl:mx-auto grid grid-cols-[14rem_1fr] gap-5 h-dvh w-full">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/students" element={<Students />} />
        </Routes>
      </div>
    </>
  )
}

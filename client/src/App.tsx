import Sidebar from "@/components/layout/Sidebar"
import Dashboard from "@/page/Dashboard"

import { Routes, Route, Outlet } from "react-router-dom"
import Attendance from "@/page/Attendance"
import Students from "@/page/Students"
import { Toaster } from "@/components/ui/sonner"
// import DataTable, { THeader, THeaderWrapper } from "./components/DataTable"

export default function App() {
  return (
    <>
      {/* <DataTable>
        <THeaderWrapper>
          <THeader>HEY</THeader>
          <THeader>HEY</THeader>
          <THeader>HEY</THeader>
        </THeaderWrapper>
      </DataTable> */}
      <Routes>
        <Route element={<AppWrapper />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/students" element={<Students />} />
        </Route>
      </Routes>
    </>
  )
}

function AppWrapper() {
  return (
    <>
      <Toaster />
      <div className="2xl:container 2xl:mx-auto grid grid-cols-[16rem_1fr] gap-5 h-dvh w-full" >
        <Sidebar />
        <Outlet />
      </div>
    </>
  )
}
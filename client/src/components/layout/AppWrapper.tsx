import Sidebar from "./Sidebar"
import { Toaster } from "sonner"
import LetranBG from "@/assets/LetranBG.png"
import { Outlet } from "react-router-dom"

export default function AppWrapper() {

    return (
        <>
            <Toaster theme="dark" />
            <div style={{ backgroundImage: `url(${LetranBG})` }} className="p-5 bg-cover bg-center 2xl:container 2xl:mx-auto grid grid-cols-[16rem_1fr] gap-5 h-dvh w-full" >
                <Sidebar />
                <Outlet />
            </div>
        </>
    )
}
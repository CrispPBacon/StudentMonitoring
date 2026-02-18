import Sidebar from "./Sidebar"
import { Toaster } from "sonner"
import LetranBG from "@/assets/LetranBG.png"
import { Outlet } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks"
import { fetchCurrentUser } from "@/features/auth/userThunks"
import { useEffect } from "react"

export default function AppWrapper() {
    const { user, isLoading } = useAppSelector((state) => state.user)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!user) dispatch(fetchCurrentUser())
    }, [dispatch, user])

    if (isLoading) {
        return <h1 className="text-2xl font-bold">Loading</h1>
    }

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
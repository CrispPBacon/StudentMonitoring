import { Navigate, Outlet } from 'react-router-dom'
import { useAppSelector } from '@/hooks/reduxHooks'
import { Suspense } from 'react'

const ProtectedRoute = () => {
    const { user } = useAppSelector((state) => state.user)

    if (!user) {
        return <Navigate to="/login" replace />
    }

    return (
        <Suspense fallback={<h1>Loading...</h1>}>
            <Outlet />
        </Suspense>
    )
}
export default ProtectedRoute

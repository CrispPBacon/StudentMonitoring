import { Navigate, Outlet } from 'react-router-dom'
import { useAppSelector } from '@/hooks/reduxHooks'

const PublicRoute = () => {
    const { user } = useAppSelector((state) => state.user)

    if (user) {
        return <Navigate to="/" replace />
    }

    return <Outlet />
}
export default PublicRoute

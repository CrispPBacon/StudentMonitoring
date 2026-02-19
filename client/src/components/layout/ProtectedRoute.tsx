import { Navigate, Outlet } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks'
import { Suspense, useEffect } from 'react'
import { fetchCurrentUser } from '@/features/authentication/userThunks'
import Loading from './Loading'

const ProtectedRoute = () => {
    const { user, isLoading } = useAppSelector((state) => state.user)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!user) dispatch(fetchCurrentUser())
    }, [dispatch, user])

    if (isLoading) {
        return null
    }

    if (!user) {
        return <Navigate to="/login" replace />
    }

    return (
        <Suspense fallback={<Loading />}>
            <Outlet />
        </Suspense>
    )
}
export default ProtectedRoute

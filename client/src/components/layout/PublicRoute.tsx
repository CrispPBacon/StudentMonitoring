import { Navigate, Outlet } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks'
import { useEffect } from 'react'
import { fetchCurrentUser } from '@/features/authentication/userThunks'

const PublicRoute = () => {
    const { user, isLoading } = useAppSelector((state) => state.user)
    const dispatch = useAppDispatch()

    useEffect(() => {
        console.log(user)
        if (!user) dispatch(fetchCurrentUser())
    }, [dispatch, user])


    if (user && isLoading) {
        return <Navigate to="/" replace />
    }

    return !user ? <Outlet /> : <Navigate to="/" replace />
}
export default PublicRoute

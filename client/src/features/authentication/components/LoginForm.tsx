import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { useState, type FormEvent } from 'react';
import { Navigate } from 'react-router-dom';
import { loginUser } from '../userThunks';

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useAppDispatch()

    const { user, error, isLoading } = useAppSelector((state) => state.user)

    const handleLogin = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(loginUser({ email, password }));
        console.log(error)
    }

    if (user && !isLoading) {
        return <Navigate to={"/"} replace />
    }

    return (
        <div className="p-10 flex flex-col justify-center">
            <h1 className="text-3xl font-bold text-slate-800 mb-2">Welcome Back</h1>
            <p className="text-slate-500 mb-8">Sign in to continue to your dashboard</p>
            {
                error?.message ? <h1 className="p-3 rounded-lg text-sm tracking-tight text-red-500 bg-red-100 mb-4">{error?.message}</h1>
                    : <h1 className="opacity-0 p-3 rounded-lg text-sm tracking-tight text-red-500 bg-red-100 mb-4">...</h1>
            }
            <form className="space-y-5" onSubmit={handleLogin}>
                <div>
                    <label className="text-sm text-slate-600">Email</label>
                    <input onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        type="email"
                        className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                        placeholder="admin@school.edu" />
                </div>
                <div>
                    <label className="text-sm text-slate-600">Password</label>
                    <input onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        type="password"
                        className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                        placeholder="••••••••" />
                </div>
                <button className="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-semibold hover:bg-indigo-700 transition">
                    Sign In
                </button>
            </form>
            <p className="text-xs text-slate-500 mt-6">Secure access for authorized personnel only</p>
        </div >

    )
}

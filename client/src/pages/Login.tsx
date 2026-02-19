import LetranBG from '@/assets/LetranBG.png'
import { DisplayCover, LoginForm } from "@/features/authentication";
export default function Login() {


    return (
        <div style={{ backgroundImage: `url(${LetranBG})` }} className="bg-cover bg-fixed bg-center min-h-screen bg-slate-100 flex items-center justify-center">
            <div className="w-full max-w-6xl bg-white shadow-xl rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
                {/* <!-- LEFT: LOGIN FORM --> */}
                <LoginForm />
                {/* <!-- RIGHT: COVER --> */}
                <DisplayCover />
            </div>
        </div >
    )
}

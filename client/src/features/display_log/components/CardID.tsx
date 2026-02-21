import logo from "@/assets/logo.webp"
import idTemplate from "@/assets/letran-bg.png"

interface CardType {
    student_id: string
    program: string
    type: string
    display_photo?: string
}
export function CardID({ student_id, program, display_photo, type }: CardType) {
    const borderColor = `border-${type == "entry" ? "green" : "red"}-400`

    return (
        <div className="z-10 before:top-0 before:left-0 before:-z-10 before:w-full before:h-full before:bg-black before:opacity-25 before:absolute ">
            <div style={{ backgroundImage: `url(${idTemplate})` }}
                className={`${borderColor} z-10 rounded-2xl shadow-2xl border-5 bg-slate-100 overflow-hidden flex flex-col items-center w-100 h-150`}>
                {/* LOGO AND TITLE */}
                <div className="flex items-center gap-2 px-5 mt-3 mb-10 text-white">
                    <span className="rounded-full w-20 h-20 flex bg-white">
                        <img src={logo} alt="Letran Logo" />
                    </span>
                    <span className="text-center">
                        <small className="font-medium text-xs">Colegio de San Juan de Letran Manaoag</small>
                        <h1 className='font-gothic text-4xl tracking-widest'>LETRAN</h1>
                        <small className="font-medium text-[.5rem] tracking-tight">CASTRO ST. POB. MANAOAG, PANGASINAN PHILIPPINES</small>
                    </span>
                </div>
                {/* DISPLAY PHOTO */}
                <span className="w-70 h-80 border-6 rounded-2xl overflow-hidden flex items-center justify-center border-blue-900 bg-slate-50">
                    <img src={display_photo ?? "https://i.pinimg.com/736x/2f/15/f2/2f15f2e8c688b3120d3d26467b06330c.jpg"} className="h-full w-full" alt="avatar" />
                </span>
                {/* DETAILS */}
                <div className="border-2 w-[90%] my-5">
                    <div className="grid grid-cols-2 text-center font-medium">
                        <div className="border-2 bg-slate-50 border-black py-2">COURSE</div>
                        <div className="border-2 bg-slate-50 border-black py-2">{program?.toUpperCase()}</div>
                        <div className="border-2 bg-slate-50 border-black py-2">ID NO.</div>
                        <div className="border-2 bg-slate-50 border-black py-2">{student_id}</div>
                    </div>
                </div>
                {/* FOOTER */}
                <span className="bg-blue-950 h-5 w-full"></span>
                <span className="bg-red-600 h-15 w-full"></span>
            </div>
        </div>
    );
}
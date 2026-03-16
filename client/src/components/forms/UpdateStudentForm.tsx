import { useAppDispatch } from "@/hooks/reduxHooks"
import type { StudentProps } from "@/lib/types"
import { toTitleCase } from "@/utils/formatString"
import { useRef, useState, type FormEvent, type Dispatch, type SetStateAction, useEffect } from 'react'
import { toast } from "sonner"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DialogClose } from "@/components/ui/dialog"
import { backendUrl } from "@/lib/api"
import { Switch } from "@/components/ui/switch"
import { updateStudent } from "@/features/StudentsLog"


interface FormProps extends StudentProps {
    setOpen: Dispatch<SetStateAction<boolean>>
}

export function UpdateStudentForm(props: FormProps) {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [studentID, setStudentID] = useState('')
    const [fingerID, setFingerID] = useState('')
    const [cardID, setCardID] = useState('')
    const [program, setProgram] = useState('')
    const [year, setYear] = useState('0')
    const [guardianPhoneNumber, setGuardianPhoneNumber] = useState('')
    const [guardianEmail, setGuardianEmail] = useState('')
    const [notification, setNotification] = useState(false)



    const [displayPhoto, setDisplayPhoto] = useState<File | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null);

    const dispatch = useAppDispatch()

    const setOpen = props.setOpen
    const display_photo = props.display_photo
    useEffect(() => {
        const { ...student } = props
        const handleDataChange = () => {
            const { first_name, last_name, education, student_id, card_id, finger_id, guardian } = student
            const { email, phone_number, notification } = guardian || {}
            setFirstName(toTitleCase(first_name))
            setLastName(toTitleCase(last_name))
            setProgram(education.program)
            setYear(education.year)
            setStudentID(student_id)
            setCardID(card_id)
            setFingerID(finger_id || '')
            setGuardianEmail(email || '')
            setGuardianPhoneNumber(phone_number || '')
            setNotification(notification == "on" ? true : false)
        }
        handleDataChange()
    }, [props])

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;
        // Validate image type
        if (!file.type.startsWith("image/")) {
            toast.error("Please upload a valid image file.")
            return;
        }
        setDisplayPhoto(file);
    };


    const handleSubmit = ((e: FormEvent<HTMLFormElement>) => {
        const { ...student } = props
        e.preventDefault();
        const guardian = { notification: notification ? "on" : "off", phone_number: guardianPhoneNumber, email: guardianEmail }
        const data = {
            _id: student._id || '',
            first_name: firstName,
            last_name: lastName,
            education: { ...student.education, program, year },
            guardian,
            student_id: studentID,
            card_id: cardID,
            finger_id: fingerID,
            display_photo: displayPhoto
        }
        dispatch((updateStudent(data)))
        setOpen(false)
    });

    return (
        <form onSubmit={handleSubmit} className='grid grid-cols-[.4fr_1fr]'>
            <div className='flex flex-col gap-5'>
                <div
                    className="w-20 h-20 rounded-full bg-slate-200 flex items-center justify-center font-semibold text-slate-600 overflow-hidden">
                    <img onClick={() => fileInputRef.current?.click()} src={displayPhoto ? URL.createObjectURL(displayPhoto) : `${backendUrl}/display_photo/${display_photo}`} alt="profile" />
                    <Input ref={fileInputRef} onChange={handleImageChange} multiple={false} type="file" accept="image/*" className="hidden" />
                </div>
                <span className='flex items-center text-sm tracking-wide text-slate-800'>ID•
                    <Input value={studentID} onChange={e => setStudentID(e.target.value)} className="w-20 p-0 border-none border-0 outline-0 outline-none shadow-none" />
                </span>
            </div>
            <div className='flex flex-col gap-3 '>
                <div className='flex justify-between'>
                    <span className='text-sm tracking-wide text-slate-500'>FIRST NAME</span>
                    {/* <span className='text-sm tracking-wide text-slate-950'>{`${firstName} ${lastName}`.toUpperCase()}</span> */}
                    <Input className="shadow-none border-none w-1/2 text-sm tracking-wide text-slate-800" type="text" value={firstName} onChange={e => setFirstName(e.target.value)} />
                </div>
                <div className='flex justify-between'>
                    <span className='text-sm tracking-wide text-slate-500'>LAST NAME</span>
                    {/* <span className='text-sm tracking-wide text-slate-950'>{`${firstName} ${lastName}`.toUpperCase()}</span> */}
                    <Input className="shadow-none border-none w-1/2 text-sm tracking-wide text-slate-800" type="text" value={lastName} onChange={e => setLastName(e.target.value)} />
                </div>
                <div className='flex justify-between'>
                    <span className='text-sm tracking-wide text-slate-500'>COURSE & YEAR</span>
                    {/* <span className='text-sm tracking-wide text-slate-950'>{`${firstName} ${lastName}`.toUpperCase()}</span> */}
                    <select value={program} onChange={(e) => setProgram(e.target.value)} name="course" id="course" className="border-none flex h-9 w-1/2 rounded-md border border-input bg-transparent px-3 py-1 text-base transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm">
                        <option value="" defaultValue='true' disabled>Select Course</option>
                        <option value="grade">GRADE</option>
                        <option value="bscs">BSCS</option>
                        <option value="bsit">BSIT</option>
                        <option value="bsed">BSED</option>
                        <option value="bsba">BSBA</option>
                    </select>
                    {/* <Input className="w-1/2 text-sm tracking-wide text-slate-800" type="text" value={lastName} onChange={e => setLastName(e.target.value)} /> */}
                </div>
                <div className='flex justify-between'>
                    <span className='text-sm tracking-wide text-slate-500'>YEAR</span>
                    <Input className="shadow-none border-none w-1/2 text-sm tracking-wide text-slate-800" value={year} onChange={e => setYear(e.target.value)} placeholder="Year" type="number" onKeyDown={(e) => {
                        if (["e", "E", "+", "-", "."].includes(e.key)) {
                            e.preventDefault();
                        }
                    }} />
                </div>
                <div className='flex justify-between'>
                    <span className='text-sm tracking-wide text-slate-500'>CARD ID</span>
                    <Input className="shadow-none border-none w-1/2 text-sm tracking-wide text-slate-800" type="text" value={cardID} onChange={e => setCardID(e.target.value)} />
                </div>
                <div className='flex justify-between'>
                    <span className='text-sm tracking-wide text-slate-500'>FINGERPRINT ID</span>
                    <Input className="shadow-none border-none w-1/2 text-sm tracking-wide text-slate-800" type="text" value={fingerID} onChange={e => setFingerID(e.target.value)} />
                </div>
                <div className='flex justify-between mt-5'>
                    <span className='text-sm tracking-tighter text-slate-600 font-bold'>GUARDIAN</span>
                </div>
                <div className='flex justify-between'>
                    <span className='text-sm tracking-wide text-slate-500'>EMAIL</span>
                    <Input className={`${guardianEmail ? "shadow-none border-none" : null} w-1/2 text-sm tracking-wide text-slate-800`} type="text" value={guardianEmail} onChange={e => setGuardianEmail(e.target.value)} />
                </div>
                <div className='flex justify-between'>
                    <span className='text-sm tracking-wide text-slate-500'>PHONE NUMBER</span>
                    <Input className={`${guardianEmail ? "shadow-none border-none" : null} w-1/2 text-sm tracking-wide text-slate-800`} type="text" value={guardianPhoneNumber} onChange={e => setGuardianPhoneNumber(e.target.value)} />
                </div>
                <div className='flex justify-between'>
                    <span className='text-sm tracking-wide text-slate-500'>NOTIFICATION</span>
                    <Switch autoFocus onCheckedChange={setNotification} checked={notification} className="data-[state=checked]:bg-green-950 data-[state=unchecked]:bg-slate-400" />
                </div>
                <div className="mt-2 gap-2 flex justify-end w-full ">
                    <DialogClose asChild>
                        <Button type="button" variant={"outline"} className="cursor-pointer">Cancel</Button>
                    </DialogClose>
                    <Button type="submit" className="px-15 cursor-pointer" >Update</Button>
                </div>
            </div>
        </form>

    )
}
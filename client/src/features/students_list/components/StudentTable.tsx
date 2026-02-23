import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks'
import type { StudentProps } from '@/lib/types'
import { toTitleCase } from '@/utils/formatString'
import { MoreHoriz } from '@mui/icons-material'
import { useEffect, useRef, useState, type FormEvent, type Dispatch, type SetStateAction } from 'react'
import { fetchStudents, updateStudent } from '../studentThunks'

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from '@/components/ui/button'
import { DialogClose } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import ButtonDialog from '@/features/dashboard/components/ButtonDialog'

export default function StudentTable() {
    const { students } = useAppSelector(state => state.student)
    const dispatch = useAppDispatch()
    useEffect(() => {
        if (students.length > 0) return;
        dispatch(fetchStudents())
    }, [dispatch, students])

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead className="sticky top-0 bg-slate-50 border-b border-slate-200">
                    <tr>
                        <th className="p-4 text-sm font-semibold text-slate-600">Student</th>
                        <th className="p-4 text-sm font-semibold text-slate-600">
                            Student ID
                        </th>
                        <th className="p-4 text-sm font-semibold text-slate-600">Course</th>
                        <th className="p-4 text-sm font-semibold text-slate-600">Year</th>
                        <th className="p-4 text-sm font-semibold text-slate-600">Status</th>
                        <th className="p-4 text-sm font-semibold text-slate-600">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                    {students.map(val => (<StudentRow key={val._id} _id={val._id} finger_id={val.finger_id} card_id={val.card_id} first_name={val.first_name} last_name={val.last_name} email={val.email} education={val.education} student_id={val.student_id} />))}
                </tbody>
            </table>
        </div>
    )
}


export function StudentRow({ first_name, last_name, email, education, student_id, card_id, finger_id, _id }: StudentProps) {
    const student = { first_name, last_name, email, education, student_id, card_id, finger_id, _id }
    return (
        <tr>
            <td className="p-4 flex items-center gap-3">
                <div
                    className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-semibold text-slate-600">
                    {`${first_name[0]}${last_name[0]}`.toUpperCase()}
                </div>
                <div>
                    <p className="font-semibold text-slate-800">
                        {toTitleCase(`${first_name} ${last_name}`)}
                    </p>
                    <p className="text-sm text-slate-500">{email}</p>
                </div>
            </td>
            <td className="p-4 text-slate-600">{student_id}</td>
            <td className="p-4 text-slate-600">{education.program.toUpperCase()}</td>
            <td className="p-4 text-slate-600">{education.year}</td>
            <td className="p-4">
                <span
                    className="px-3 py-1 text-sm rounded-full bg-green-100 text-green-600">
                    Enrolled
                </span>
            </td>
            <td className="p-4 space-x-2 hover:animate-entry">
                <PopOver {...student} />
            </td>
        </tr>

    )
}


export function PopOver(student: StudentProps) {
    const [open, setOpen] = useState(false);
    return (
        <Popover>
            <PopoverTrigger asChild>
                <MoreHoriz />
            </PopoverTrigger>
            <PopoverContent className="w-25">
                {/* <div className="grid gap-4">
                    <div className="space-y-2">
                        <h4 className="leading-none font-medium">Dimensions</h4>
                        <p className="text-muted-foreground text-sm">
                            Set the dimensions for the layer.
                        </p>
                    </div>
                </div> */}
                <div className='grid grid-cols-1'>

                    <ButtonDialog
                        open={open}
                        onOpenChange={setOpen}
                        // className="hover:text-purple-300 hover:bg-slate-800 bg-slate-200 text-slate-800 font-medium py-5 px-4 sm:px-5 rounded-md flex items-center gap-3"
                        placeholder="Edit"
                        title="Edit Student Details"
                        description="Fill in the student's detail you want to update."
                    >
                        <UpdateStudentForm setOpen={setOpen} {...student} />
                    </ButtonDialog>
                    {/* <Button variant="ghost" className='text-left'>View</Button> */}
                    {/* <Button variant="ghost" className='text-left'>Edit</Button> */}
                    {/* <Button variant="destructive" className='text-left bg-red-100 text-red-400 hover:text-red-600 hover:bg-red-200'>Delete</Button> */}
                </div>
            </PopoverContent>
        </Popover>)
}

interface FormProps extends StudentProps {
    setOpen: Dispatch<SetStateAction<boolean>>
}
function UpdateStudentForm(props: FormProps) {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [studentID, setStudentID] = useState('')
    const [fingerID, setFingerID] = useState('')
    const [cardID, setCardID] = useState('')
    const [program, setProgram] = useState('')
    const [year, setYear] = useState('0')
    const [guardianPhoneNumber, setGuardianPhoneNumber] = useState('')
    const [guardianEmail, setGuardianEmail] = useState('')

    const [displayPhoto, setDisplayPhoto] = useState<File | null>(null)
    const fileInputRef = useRef(null);

    const dispatch = useAppDispatch()

    // const { first_name, last_name, education, student_id, card_id } = student


    const setOpen = props.setOpen
    useEffect(() => {
        const { ...student } = props
        const handleDataChange = () => {
            const { first_name, last_name, education, student_id, card_id, finger_id } = student
            setFirstName(toTitleCase(first_name))
            setLastName(toTitleCase(last_name))
            setProgram(education.program)
            setStudentID(student_id)
            setCardID(card_id)
            setFingerID(finger_id || '')
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
        console.log(displayPhoto)
        setDisplayPhoto(file);
    };


    const handleSubmit = ((e: FormEvent<HTMLFormElement>) => {
        const { ...student } = props
        e.preventDefault();
        const data = {
            _id: student._id || '',
            first_name: firstName,
            last_name: lastName,
            education: { ...student.education, program, year },
            student_id: studentID,
            card_id: cardID,
            finger_id: fingerID
        }
        dispatch((updateStudent(data)))
        setOpen(false)
    });

    return (
        <form onSubmit={handleSubmit}>
            <h1 className="text-slate-500 mb-2">Student Details</h1>
            <div className="flex gap-2 mb-4">
                <Input value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="First Name" />
                <Input value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Last Name" />
            </div>
            <Input value={studentID} onChange={(e) => setStudentID(e.target.value)} placeholder="Student ID" className="mb-4" />
            <Input value={cardID} onChange={(e) => setCardID(e.target.value)} placeholder="Card ID" className="mb-4" />
            <Input value={fingerID} onChange={(e) => setFingerID(e.target.value)} placeholder="Finger ID" className="mb-4" />
            <div className="flex gap-2 mb-4">
                <select value={program} onChange={(e) => setProgram(e.target.value)} name="course" id="course" className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm">
                    <option value="" defaultValue='true' disabled>Select Course</option>
                    <option value="grade">GRADE</option>
                    <option value="bscs">BSCS</option>
                    <option value="bsit">BSIT</option>
                    <option value="bsed">BSED</option>
                    <option value="bsba">BSBA</option>
                </select>
                <Input value={year} onChange={e => setYear(e.target.value)} placeholder="Year" type="number" onKeyDown={(e) => {
                    if (["e", "E", "+", "-", "."].includes(e.key)) {
                        e.preventDefault();
                    }
                }} />
            </div>
            <Input ref={fileInputRef} onChange={handleImageChange} multiple={false} type="file" accept="image/*" className="mb-8" />
            {/* <Input placeholder="Course" type="" className="mb-6" /> */}

            <h1 className="text-slate-500 mb-2">Guardian Details</h1>
            <Input type="text" placeholder="Phone number" className="mb-4" value={guardianPhoneNumber} onChange={e => setGuardianPhoneNumber(e.target.value)} />
            <Input type="text" placeholder="Email" className="mb-4" value={guardianEmail} onChange={e => setGuardianEmail(e.target.value)} />

            <div className="mt-10 gap-2 flex justify-end w-full ">
                <DialogClose asChild>
                    <Button type="button" variant={"outline"} className="cursor-pointer">Cancel</Button>
                </DialogClose>
                <Button type="submit" className="px-15 cursor-pointer" >Update</Button>
            </div>
        </form>

    )
}
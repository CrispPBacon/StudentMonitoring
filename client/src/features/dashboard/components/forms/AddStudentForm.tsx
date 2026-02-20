

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import React, { useRef, useState } from "react"

import { DialogClose } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";

import { useAppDispatch } from "@/hooks/reduxHooks";
import { addStudent } from "@/features/students_list";



interface DataProps {
    firstName: string;
    lastName: string;
    studentID: string;
    program: string;
    year: string;
    student_display_photo?: File | undefined;
    cardID: string;
}


export default function AddStudentForm() {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [studentID, setStudentID] = useState('')
    const [cardID, setCardID] = useState('')
    const [program, setProgram] = useState('')
    const [year, setYear] = useState('0')
    const [guardianPhoneNumber, setGuardianPhoneNumber] = useState('')
    const [guardianEmail, setGuardianEmail] = useState('')

    const [image, setImage] = useState<File | null>(null)
    const fileInputRef = useRef(null);

    const dispatch = useAppDispatch();

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;
        // Validate image type
        if (!file.type.startsWith("image/")) {
            toast.error("Please upload a valid image file.")
            return;
        }
        setImage(file);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // if (!image) return alert("Select a file first");
        const data: DataProps = {
            firstName, lastName, studentID, program, year, cardID
        }


        if (image) data['student_display_photo'] = image
        dispatch(addStudent(data))
        toast.success("Adding New Student...")
    }
    return (
        <form onSubmit={handleSubmit}>
            <h1 className="text-slate-500 mb-2">Student Details</h1>
            <div className="flex gap-2 mb-4">
                <Input value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="First Name" />
                <Input value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Last Name" />
            </div>
            <Input value={studentID} onChange={(e) => setStudentID(e.target.value)} placeholder="Student ID" className="mb-4" />
            <Input value={cardID} onChange={(e) => setCardID(e.target.value)} placeholder="Card ID" className="mb-4" />
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
                <Button type="submit" className="px-15 cursor-pointer" >Submit</Button>
            </div>
        </form>
    )
}
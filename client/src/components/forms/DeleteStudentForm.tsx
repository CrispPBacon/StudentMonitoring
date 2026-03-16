import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { deleteStudent } from "@/features/StudentsLog";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { useState, type Dispatch, type SetStateAction } from "react";

interface FormProps {
    setOpen: Dispatch<SetStateAction<boolean>>,
    id: string
}
export function DeleteStudentForm({ setOpen, id }: FormProps) {
    const [input, setInput] = useState("")
    const dispatch = useAppDispatch()
    const handleDelete = () => {
        dispatch(deleteStudent({ _id: id || '' }))
        setOpen(false)
    }
    return (
        <div>
            <Input value={input} onChange={e => setInput(e.target.value)} placeholder="Enter 'I AGREE' to delete the student" />
            <Button variant="outline" className="w-full my-2 mt-10 bg-red-100 text-red-400 hover:bg-red-200 hover:text-red-600" onClick={handleDelete} disabled={input != "I AGREE"}>Delete</Button>
            <Button variant="default" className="w-full" onClick={() => setOpen(false)}>Cancel</Button>
        </div>
    )
}
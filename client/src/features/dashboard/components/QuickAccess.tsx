import { ImportExportRounded, PersonAddAltRounded, PersonOffRounded, ShowChartRounded } from "@mui/icons-material";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react"

import { DialogClose } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import ButtonDialog from "@/features/dashboard/components/ButtonDialog";

import AddStudentForm from "./forms/AddStudentForm";

export default function QuickAccess() {
    const [open, setOpen] = useState(false);
    return (
        <div className="mb-6 bg-white p-5 rounded-xl shadow-md">
            <strong>Quick Access</strong>
            <div
                className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
            >
                <ButtonDialog
                    open={open}
                    onOpenChange={setOpen}
                    className="hover:text-purple-300 hover:bg-slate-800 bg-slate-200 text-slate-800 font-medium py-5 px-4 sm:px-5 rounded-md flex items-center gap-3"
                    icon={PersonAddAltRounded}
                    placeholder="Add Student"
                    title="Add New Student"
                    description="Fill in the required details to create a new student record."
                >
                    <AddStudentForm />
                </ButtonDialog>
                <ButtonDialog
                    className="hover:bg-slate-800 bg-slate-200 text-slate-800 hover:text-yellow-300 font-medium py-5 px-4 sm:px-5 rounded-md flex items-center gap-3"
                    icon={PersonOffRounded}
                    placeholder="Suspend ID"
                    title="Suspend Student ID Card"
                    description="The student will not be able to use this ID card until it is reactivated"
                >
                    <Input placeholder="Student ID" className="mb-5" />
                    <div className="gap-3 flex justify-end w-full ">
                        <DialogClose asChild>
                            <Button type="button" variant={"outline"}>Cancel</Button>
                        </DialogClose>
                        <Button type="submit" className="px-15">Submit</Button>
                    </div>
                </ButtonDialog>
                <button onClick={() => toast.info("View Report")}
                    className="hover:bg-slate-800 bg-slate-200 text-slate-800 hover:text-slate-50 font-medium py-5 px-4 sm:px-5 rounded-md flex items-center gap-3"
                >
                    <ShowChartRounded />
                    <span> View Report </span>
                </button>
                <button onClick={() => toast.info("Export Logs")}
                    className="hover:bg-slate-800 bg-slate-200 text-slate-800 hover:text-slate-50 font-medium py-5 px-4 sm:px-5 rounded-md flex items-center gap-3"
                >
                    <ImportExportRounded />
                    <span> Export Logs </span>
                </button>
            </div>
        </div>
    )
}
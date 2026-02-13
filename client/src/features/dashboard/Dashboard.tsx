import { ImportExportRounded, PersonAddAltRounded, PersonOffRounded, ShowChartRounded } from "@mui/icons-material";

import Chart from "@/features/dashboard/components/Chart"
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import React, { useState } from "react"

import { DialogClose } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import StudentTable from "@/features/dashboard/components/StudentTable";
import ButtonDialog from "@/features/dashboard/components/ButtonDialog";

export default function Dashboard() {
    return (
        // < !--Dashbaord -- >
        <main className="p-8 overflow-y-auto">
            {/* <!-- Title Page --> */}
            <div className="mb-6">
                <h1 className="font-bold text-3xl">Dashboard</h1>
            </div>
            {/* <!-- Overview --> */}
            <Overview />
            {/* <!-- Quick Access --> */}
            <QuickAccess />
            {/* Bar Graph */}
            <div className=" bg-white p-5 rounded-xl shadow-md">
                <div className="items-start gap-10 grid grid-cols-1 lg:grid-cols-2">
                    <Chart />
                    <StudentTable />
                </div>
            </div>

        </main >
        //   <!--End of Dashboard-- >
    )
}



function Overview() {
    return (
        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl shadow-sm p-4 sm:p-5">
                <span className="font-medium">Total Students</span>
                <p className="mt-5 font-bold text-2xl">1</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-4 sm:p-5">
                <span className="font-medium">Present Today</span>
                <p className="mt-5 font-bold text-2xl">6</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-4 sm:p-5">
                <span className="font-medium">Absent Today</span>
                <p className="mt-5 font-bold text-2xl">0</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-4 sm:p-5">
                <span className="font-medium">Attendance Rate</span>
                <p className="mt-5 font-bold text-2xl">0</p>
            </div>
        </div>
    )
}

function QuickAccess() {
    const [open, setOpen] = useState(false);
    const addStudent = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        toast.success("Adding New Student...")
    }
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
                    <form onSubmit={addStudent}>
                        <div className="flex gap-2">
                            <Input placeholder="First Name" className="mb-2" />
                            <Input placeholder="Last Name" className="mb-2" />
                        </div>
                        <Input placeholder="Student ID" className="mb-2" />
                        <div className="flex gap-2 mb-2">
                            <select name="course" id="course" className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm">
                                <option value="" disabled selected>Select Course</option>
                                <option value="bscs">BSCS</option>
                                <option value="bsit">BSIT</option>
                                <option value="bsed">BSED</option>
                                <option value="bsba">BSBA</option>
                            </select>
                            <Input placeholder="Year" type="number" />
                        </div>
                        {/* <Input placeholder="Course" type="" className="mb-6" /> */}
                        <div className="mt-10 gap-2 flex justify-end w-full ">
                            <DialogClose asChild>
                                <Button type="button" variant={"outline"} className="cursor-pointer">Cancel</Button>
                            </DialogClose>
                            <Button type="submit" className="px-15 cursor-pointer" >Submit</Button>
                        </div>
                    </form>
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
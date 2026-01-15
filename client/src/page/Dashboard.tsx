import { ImportExportRounded, PersonAddAltRounded, PersonOffRounded, ShowChartRounded } from "@mui/icons-material";

import Chart from "@/components/Chart"
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import React from "react"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

export default function Dashboard() {

    return (
        // < !--Dashbaord -- >
        <main className="p-8 overflow-y-auto">
            {/* <!-- Title Page --> */}
            <div className="mb-6">
                <h1 className="font-bold text-3xl">Dashboard</h1>
            </div>
            {/* <!-- End of Title Page --> */}

            {/* <!-- Overview --> */}
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
            {/* <!-- End of Overview --> */}

            {/* <!-- Quick Access --> */}
            <div className="mb-6 bg-white p-5 rounded-xl shadow-md">
                <strong>Quick Access</strong>
                <div
                    className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
                >
                    <ButtonDialog
                        className="hover:text-purple-300 hover:bg-slate-800 bg-slate-200 text-slate-800 font-medium py-5 px-4 sm:px-5 rounded-md flex items-center gap-3"
                        icon={PersonAddAltRounded}
                        placeholder="Add Student"
                        title="Are you sure you want to do it?"
                    >
                        <span className="gap-2 flex">
                            <Button>Submit</Button>
                            <Button variant={"outline"}>Cancel</Button>
                        </span>
                    </ButtonDialog>
                    <ButtonDialog
                        className="hover:bg-slate-800 bg-slate-200 text-slate-800 hover:text-yellow-300 font-medium py-5 px-4 sm:px-5 rounded-md flex items-center gap-3"
                        icon={PersonOffRounded}
                        placeholder="Suspend Student"
                        title="Suspend Student"
                    >
                        Here
                    </ButtonDialog>
                    <button onClick={() => toast("View Report")}
                        className="hover:bg-slate-800 bg-slate-200 text-slate-800 hover:text-slate-50 font-medium py-5 px-4 sm:px-5 rounded-md flex items-center gap-3"
                    >
                        <ShowChartRounded />
                        <span> View Report </span>
                    </button>
                    <button onClick={() => toast("Export Logs")}
                        className="hover:bg-slate-800 bg-slate-200 text-slate-800 hover:text-slate-50 font-medium py-5 px-4 sm:px-5 rounded-md flex items-center gap-3"
                    >
                        <ImportExportRounded />
                        <span> Export Logs </span>
                    </button>
                </div>
            </div>
            {/* <!-- End of Quick Access --> */}

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


interface ButtonProps {
    children: React.ReactNode,
    placeholder?: string,
    icon?: React.ElementType,
    className?: string,
    title?: string
}
export function ButtonDialog({ children, placeholder, icon: Icon, className, title }: ButtonProps) {
    return (
        <Dialog>
            <DialogTrigger className={className}>
                {Icon && <Icon fontSize="small" />}
                <span>{placeholder}</span>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>
                        {children}
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export function StudentTable() {
    return (
        <div className="p-2">
            {/* <!-- Filters --> */}
            <strong>Recent Entry Logs</strong>
            <div className="mb-4 mt-4 flex flex-wrap gap-2">
                <button
                    className="px-4 sm:px-5 py-2 rounded-full bg-slate-900 text-white text-sm shadow"
                >
                    Daily
                </button>
                <button
                    className="px-4 sm:px-5 py-2 rounded-full bg-white text-slate-600 text-sm shadow-sm hover:bg-slate-50"
                >
                    Weekly
                </button>
                <button
                    className="px-4 sm:px-5 py-2 rounded-full bg-white text-slate-600 text-sm shadow-sm hover:bg-slate-50"
                >
                    Monthly
                </button>
            </div>
            {/* <!-- End of Filters --> */}

            {/* <!-- Student Table List --> */}
            <div className="grid grid-cols-4 text-sm">
                {/* <!-- Header --> */}
                <div className="font-bold p-2 text-slate-600 border-b-2">Student ID</div>
                <div className="font-bold p-2 text-slate-600 border-b-2">
                    Student Name
                </div>
                <div className="font-bold p-2 text-slate-600 border-b-2">Time In</div>
                <div className="font-bold p-2 text-slate-600 border-b-2">Date</div>

                {/* <!-- Row 1 --> */}
                <div className="p-2">17-02919</div>
                <div className="p-2">Allan Soriano</div>
                <div className="p-2">07:30 AM</div>
                <div className="p-2">January 12, 2026</div>

                {/* <!-- Row --> */}
                <div className="p-2">17-02919</div>
                <div className="p-2">Allan Soriano</div>
                <div className="p-2">07:30 AM</div>
                <div className="p-2">January 12, 2026</div>

                {/* <!-- Row --> */}
                <div className="p-2">17-02919</div>
                <div className="p-2">Allan Soriano</div>
                <div className="p-2">07:30 AM</div>
                <div className="p-2">January 12, 2026</div>

                {/* <!-- Row --> */}
                <div className="p-2">17-02919</div>
                <div className="p-2">Allan Soriano</div>
                <div className="p-2">07:30 AM</div>
                <div className="p-2">January 12, 2026</div>

                {/* <!-- Row --> */}
                <div className="p-2">17-02919</div>
                <div className="p-2">Allan Soriano</div>
                <div className="p-2">07:30 AM</div>
                <div className="p-2">January 12, 2026</div>
            </div>
            {/* <!-- End of Student Table List --> */}
        </div>
    )
}
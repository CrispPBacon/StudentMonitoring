import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

export default function Attendance() {
    return (
        <main className="p-8 overflow-y-auto">

            {/* <!-- Title Page --> */}
            <div className="mb-6">
                <h1 className="font-bold text-3xl">Attendance Logs</h1>
            </div>
            {/* <!-- End of Title Page --> */}


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

            {/* Pagination */}
            <PaginationUI />

        </main>
    )
}


export function PaginationUI() {
    return (
        <Pagination  >
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink href="#">1</PaginationLink>
                    <PaginationLink href="#">2</PaginationLink>
                    <PaginationLink href="#">3</PaginationLink>
                    <PaginationLink href="#">4</PaginationLink>
                    <PaginationLink href="#">5</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                    <PaginationNext href="#" />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}
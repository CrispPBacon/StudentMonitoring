
export default function Attendance() {
    return (
        <div className="bg-red-200">
            <table>
                <thead className="text-left">
                    <tr>
                        <th>Card ID</th>
                        <th>Student ID</th>
                        <th>Name</th>
                        <th>Program</th>
                        <th>Date</th>
                        <th>Time</th>
                    </tr>
                </thead>
                <tbody className="gap-5">
                    <tr>
                        <td>E1_D0_22_AA</td>
                        <td>17-02919</td>
                        <td>Allan Soriano</td>
                        <td>BSCS-4</td>
                        <td>February 9, 2026</td>
                        <td>8:00 AM</td>
                    </tr>
                    <tr>
                        <td>E1_D0_22_AA</td>
                        <td>17-02919</td>
                        <td>Allan Soriano</td>
                        <td>BSCS-4</td>
                        <td>February 9, 2026</td>
                        <td>8:00 AM</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

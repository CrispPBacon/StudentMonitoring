import type React from "react"


export type Column<T> = {
    key: keyof T
    header: string
    render?: (value: T[keyof T]) => React.ReactNode
}

interface DataTableProps<T> extends React.TableHTMLAttributes<HTMLTableElement> {
    columns: Column<T>[]
    data: T[]
}
export function DataTable<T extends { id: string | number }>({ columns, data, ...props }: DataTableProps<T>) {
    return (
        <table {...props}>
            <THeader columns={columns} />
            <tbody>
                {data.map((row) => <TableRow key={row.id} row={row} columns={columns} />)}
            </tbody>
        </table>
    )
}


interface THeaderProps<T> extends React.ThHTMLAttributes<HTMLTableCellElement> {
    columns: Column<T>[]
}
export function THeader<T>({ columns }: THeaderProps<T>) {
    return (
        <thead>
            {columns.map((column) => <th key={String(column.key)}>{column.header}</th>)}
        </thead>
    )
}

interface TableRowProps<T> {
    row: T
    columns: Column<T>[]
}
export function TableRow<T extends { id: number | string }>({ row, columns }: TableRowProps<T>) {
    return <tr key={row.id}>
        {columns.map((column) => <TableCell key={String(column.key)} value={row[column.key]} render={column.render} />)}
    </tr>
}

interface TableCellProps<T> {
    value: T
    render?: (value: T) => React.ReactNode
}
function TableCell<T>({ value, render }: TableCellProps<T>) {
    return <td> {render ? render(value) : String(value)}</td>
}
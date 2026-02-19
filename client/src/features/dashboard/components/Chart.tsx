"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "@/components/ui/chart"


export default function ChartBarDefault() {
    return (
        <Card >
            <CardHeader>
                <CardTitle>Today</CardTitle>
                <CardDescription>January 15, 2026</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="max-h-52 w-full md:text-sm">
                    <BarChart accessibilityLayer data={initialChartData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="hour"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent />}
                        />
                        <Bar dataKey="entry" fill="var(--color-entry)" radius={8} />
                        <Bar dataKey="exit" fill="var(--color-exit)" radius={8} />
                    </BarChart>
                </ChartContainer>
            </CardContent >
        </Card >
    )
}

const chartConfig = {
    entry: {
        label: "Entry",
        color: "var(--chart-2)",
    },
    exit: {
        label: "Exit",
        color: "var(--chart-5)",
    },
} satisfies ChartConfig

const initialChartData = [
    { hour: "07:00 AM", entry: 100, exit: 90 },
    { hour: "08:00 AM", entry: 120, exit: 110 },
    { hour: "09:00 AM", entry: 130, exit: 120 },
    { hour: "10:00 AM", entry: 140, exit: 130 },
    { hour: "11:00 AM", entry: 150, exit: 140 },
    { hour: "12:00 PM", entry: 160, exit: 150 },
    { hour: "01:00 PM", entry: 170, exit: 160 },
    { hour: "02:00 PM", entry: 212, exit: 210 },
    { hour: "03:00 PM", entry: 132, exit: 130 },
    { hour: "04:00 PM", entry: 155, exit: 150 },
    { hour: "05:00 PM", entry: 166, exit: 150 },
    { hour: "06:00 PM", entry: 198, exit: 120 },
];

// const attendanceLog = [
//     { _id: "69948379feb881741e010d06", student: "69882dfafb348402802d8c69", type: "entry", createdAt: "2026-02-17T15:04:25.266Z" },
//     { _id: "69948d3cfeb881741e010d0a", student: "6987808f347b8085a0e14468", type: "exit", createdAt: "2026-02-17T15:46:04.686Z" },
//     { _id: "69948d50feb881741e010d0e", student: "6987808f347b8085a0e14468", type: "entry", createdAt: "2026-02-17T15:46:24.007Z" },
//     { _id: "69948d62feb881741e010d12", student: "6987808f347b8085a0e14468", type: "exit", createdAt: "2026-02-17T15:46:42.884Z" },
//     { _id: "69949ef24b584b1feb7ee3dd", student: "6987808f347b8085a0e14468", type: "entry", createdAt: "2026-02-17T17:01:38.661Z" },
//     { _id: "69949efb4b584b1feb7ee3e1", student: "6987808f347b8085a0e14468", type: "exit", createdAt: "2026-02-17T17:01:47.966Z" },
//     { _id: "69949f40e445d9412abe22ea", student: "6987808f347b8085a0e14468", type: "entry", createdAt: "2026-02-17T17:02:56.077Z" },
//     { _id: "69949f7ee445d9412abe22ee", student: "6987808f347b8085a0e14468", type: "exit", createdAt: "2026-02-17T17:03:58.503Z" },
// ];
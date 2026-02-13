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

export const description = "A bar chart"

const chartData = [
    { hour: "07:00 AM", desktop: 186 },
    { hour: "08:00 AM", desktop: 305 },
    { hour: "09:00 AM", desktop: 237 },
    { hour: "10:00 AM", desktop: 73 },
    { hour: "11:00 AM", desktop: 209 },
    { hour: "12:00 PM", desktop: 214 },
    { hour: "01:00 PM", desktop: 214 },
    { hour: "02:00 PM", desktop: 0 },
    { hour: "03:00 PM", desktop: 0 },
    { hour: "04:00 PM", desktop: 0 },
    { hour: "05:00 PM", desktop: 0 },
    { hour: "06:00 PM", desktop: 0 },
]

const chartConfig = {
    desktop: {
        label: "Entry",
        color: "var(--primary)",
    },
} satisfies ChartConfig

export default function ChartBarDefault() {
    return (
        <Card >
            <CardHeader>
                <CardTitle>Today</CardTitle>
                <CardDescription>January 15, 2026</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="max-h-52 w-full md:text-sm">
                    <BarChart accessibilityLayer data={chartData}>
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
                        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={8} />
                    </BarChart>
                </ChartContainer>
            </CardContent >
        </Card >
    )
}

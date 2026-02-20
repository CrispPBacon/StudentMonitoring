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
import type { ChartDataProps } from "../constants/chartData"


type ChartProps = { chartData: ChartDataProps[] }
export default function ChartBarDefault({ chartData }: ChartProps) {
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

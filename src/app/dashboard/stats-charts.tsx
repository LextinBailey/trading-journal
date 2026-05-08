"use client"

import { Line, LineChart } from 'recharts';
import type { CumulativePnlPoint } from "@/types/chart-data";

type StatsChartProps = {
    chartData: CumulativePnlPoint[];
};

export default function StatsChart({ chartData }: StatsChartProps) {
    return (
        <LineChart style={{ width: '100%', aspectRatio: 1.618, maxWidth: 600 }} responsive data={chartData}>
            <Line dataKey="cumulativePnl" />
        </LineChart>
    );
}
"use client"

import { ResponsiveContainer, CartesianGrid, Area, AreaChart, Tooltip, XAxis, YAxis } from 'recharts';
import type { CumulativePnlPoint } from "@/types/chart-data";

type StatsChartProps = {
    chartData: CumulativePnlPoint[];
};

export default function StatsChart({ chartData }: StatsChartProps) {
    return (
        <div className="w-full h-75">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart 
                    responsive data={chartData} 
                    margin={{ top: 10, right: 30, left: 0, bottom: 0, }}
                >
                    <CartesianGrid />
                    <Area type="monotone" dataKey="cumulativePnl" name="Total PNL" />
                    <XAxis dataKey="trade" />
                    <YAxis />
                    <Tooltip />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}
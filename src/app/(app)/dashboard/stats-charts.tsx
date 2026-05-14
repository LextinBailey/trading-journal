"use client"

import { ResponsiveContainer, CartesianGrid, Area, AreaChart, Tooltip, XAxis, YAxis } from 'recharts';
import type { CumulativePnlPoint } from "@/types/chart-data";

type StatsChartProps = {
    chartData: CumulativePnlPoint[];
};

type CustomToolTipProps = {
    active?: boolean;
    payload?: { value?: number}[];
    label?: string | number;
};

const CustomTooltip = ({ active, payload, label }: CustomToolTipProps) => {
    if (!active || !payload?.length) return null;
    const value = payload[0]?.value;
    if (typeof value !== 'number') return null;
    const isPositive = value >= 0;
    return (
        <div className="rounded-lg border border-[#2d3748] bg-[#1e2432] px-3 py-2 shadow-xl">
            <p className="mb-1 text-[10px] font-mono text-gray-400">Trade {label ?? ''}</p>
            <p className={`text-[13px] font-semibold font-mono ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
                {isPositive ? '+' : ''}{value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
            </p>
        </div>
    );
};

export default function StatsChart({ chartData }: StatsChartProps) {
    const lastValue = chartData.at(-1)?.cumulativePnl ?? 0;
    const isPositive = lastValue >= 0;
    const lineColor = isPositive ? '#34d399' : '#f87171';
    const gradientId = 'pnlGradient';


    return (
        <div className="w-full rounded-2xl bg-[#0f1117] p-7">
            {/* Header */}
            <div className="mb-5 flex items-end justify-between">
                <div>
                    <p className="mb-1 font-mono text-[11px] uppercase tracking-widest text-gray-500">
                        Cumulative PnL
                    </p>
                    <p className={`font-mono text-3xl font-semibold tracking-tight ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
                        {isPositive ? '+' : ''}
                        {lastValue.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                    </p>
                </div>
                <p className="font-mono text-[11px] text-gray-600">
                {chartData.length} trades
                </p>
            </div>

            {/* Chart */}
            <div style={{ width: "100%", height: 224, minWidth: 0}}>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData} margin={{ top: 8, right: 0, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor={lineColor} stopOpacity={0.18} />
                                <stop offset="100%" stopColor={lineColor} stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid
                            strokeDasharray="0"
                            stroke="rgba(255,255,255,0.04)"
                            vertical={false}
                        />
                        <XAxis
                            dataKey="trade"
                            tick={{ fill: '#4b5563', fontSize: 10, fontFamily: 'DM Mono, monospace' }}
                            axisLine={false}
                            tickLine={false}
                            tickCount={8}
                        />
                        <YAxis
                            orientation="right"
                            tick={{ fill: '#4b5563', fontSize: 10, fontFamily: 'DM Mono, monospace' }}
                            axisLine={false}
                            tickLine={false}
                            tickFormatter={(v) =>
                                (v >= 0 ? '+' : '') +
                                v.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
                            }
                            width={72}
                        />
                        <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.08)', strokeWidth: 1 }} />
                        <Area
                            type="monotone"
                            dataKey="cumulativePnl"
                            name="Total PNL"
                            stroke={lineColor}
                            strokeWidth={2}
                            fill={`url(#${gradientId})`}
                            dot={false}
                            activeDot={{ r: 5, fill: lineColor, strokeWidth: 2, stroke: '#0f1117' }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            {/* Footer rule */}
            <div className="mt-4 border-t border-[#1f2937] pt-3 flex justify-between">
                <span className="font-mono text-[11px] text-gray-600">Trade #</span>
                <span className={`font-mono text-[11px] ${isPositive ? 'text-emerald-500' : 'text-red-500'}`}>
                    Final: {isPositive ? '+' : ''}{lastValue.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                </span>
            </div>
        </div>
    );
}
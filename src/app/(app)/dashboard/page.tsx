import { createServerClientClient } from "@/lib/supabase/server";
import { calculateTradeStats } from "@/lib/stats/trades";
import { calculateCumulativePnl } from "@/lib/stats/cumulative-pnl";
import StatsChart from "./stats-charts";

export default async function DashboardPage() {
    const supabase = await createServerClientClient();

    const { data: trades, error } = await supabase
        .from("trades")
        .select("*");
    
    if (error) {
        throw new Error("Failed to fetch trades");
    }

    const stats = calculateTradeStats(trades || []);
    const chartData = calculateCumulativePnl(trades || []);

    const pnlPositive = stats.totalPnl >= 0;

    return (
        <div className="dashboard-page">
 
            <h1 className="dashboard-title">Dashboard</h1>
 
            {/* Stats Row */}
            <div className="stats-row">
                <div className="stat-card">
                    <span className="stat-label">Total PnL</span>
                    <span
                        className="stat-value"
                        style={{ color: pnlPositive ? "#4ade80" : "#f87171" }}
                    >
                        {pnlPositive ? "+" : ""}${stats.totalPnl.toFixed(2)}
                    </span>
                </div>
 
                <div className="stat-divider" />
 
                <div className="stat-card">
                    <span className="stat-label">Total Trades</span>
                    <span className="stat-value">{stats.totalTrades}</span>
                </div>
 
                <div className="stat-divider" />
 
                <div className="stat-card">
                    <span className="stat-label">Win Rate</span>
                    <span className="stat-value">{(stats.winRate * 100).toFixed(1)}%</span>
                </div>
            </div>
 
            {/* Chart */}
            <div className="chart-card">
                {trades?.length === 0 ? (
                    <p className="message" style={{ textAlign: "center", padding: "2rem 0" }}>
                        No trades yet — add your first trade to see your curve.
                    </p>
                ) : (
                    <StatsChart chartData={chartData} />
                )}
            </div>
        </div>
    );
}
import Link from "next/link";
import { createServerClientClient } from "@/lib/supabase/server";

export default async function TradesPage() {
    const supabase = await createServerClientClient();

    const { data: trades, error } = await supabase 
        .from("trades")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        throw new Error("Failed to fetch trades"); 
    }

    return (
        <div className="trades-page">
            <div className="trades-header">
                <div>
                    <h1 className="page-title">Trades</h1>
                    <p className="page-description">
                        View and manage your trading history.
                    </p>
                </div>

                <Link
                    href="/trades/new"
                    className="add-trade-button"
                >
                    + Add Trade
                </Link>
            </div>

            {trades.length === 0 ? (
                <div className="empty-state">
                    <p>No trades yet.</p>
                </div>
            ) : (
                <div className="trades-table-wrapper">
                    <table className="trades-table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Result</th>
                                <th>PNL</th>
                                <th>Notes</th>
                                <th>View</th>
                                {/* <th>Edit</th> */}
                                {/* <th>Delete</th> */}
                            </tr>
                        </thead>

                        <tbody>
                            {trades.map((trade) => {
                                const pnlPositive = trade.pnl >= 0;

                                return (
                                    <tr key={trade.id}>
                                        <td>
                                            {new Date(
                                                trade.created_at
                                            ).toLocaleDateString()}
                                        </td>

                                        <td>
                                            {trade.result}
                                        </td>

                                        <td
                                            style={{
                                                color: pnlPositive
                                                    ? "#4ade80"
                                                    : "#f87171",
                                            }}
                                        >
                                            {pnlPositive ? "+" : ""}
                                            ${trade.pnl.toFixed(2)}
                                        </td>

                                        <td>
                                            {trade.notes || "-"}
                                        </td>

                                        <td>
                                            <Link
                                                href={`/trades/${trade.id}`}
                                                className="view-link"
                                            >
                                                View
                                            </Link>
                                        </td>
                                        
                                        {/* 
                                            <td>
                                                Edit
                                            </td>

                                            <td>
                                                Delete
                                            </td>
                                        */}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
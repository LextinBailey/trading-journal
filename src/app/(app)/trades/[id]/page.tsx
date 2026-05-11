import Link from "next/link";
import { notFound } from "next/navigation";
import { createServerClientClient } from "@/lib/supabase/server";

interface TradePageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function TradePage({
    params,
}: TradePageProps) {
    const { id } = await params;

    const supabase = await createServerClientClient();

    const { data: trade, error } = await supabase
        .from("trades")
        .select("*")
        .eq("id", id)
        .single();

    if (error || !trade) {
        notFound();
    }

    const pnlPositive = trade.pnl >= 0;

    return (
        <div className="trade-page">
            <div className="trade-page-header">
                <div>
                    <h1 className="page-title">
                        Trade Details
                    </h1>

                    <p className="page-description">
                        View trade information and notes.
                    </p>
                </div>

                <Link
                    href="/trades"
                    className="back-button"
                >
                    Back
                </Link>
            </div>

            <div className="trade-card">

                <div className="trade-row">
                    <span className="trade-label">
                        Result
                    </span>

                    <span className="trade-value">
                        {trade.result}
                    </span>
                </div>

                <div className="trade-row">
                    <span className="trade-label">
                        PNL
                    </span>

                    <span
                        className="trade-value"
                        style={{
                            color: pnlPositive
                                ? "#4ade80"
                                : "#f87171",
                        }}
                    >
                        {pnlPositive ? "+" : ""}
                        ${trade.pnl.toFixed(2)}
                    </span>
                </div>

                <div className="trade-row">
                    <span className="trade-label">
                        Created
                    </span>

                    <span className="trade-value">
                        {new Date(
                            trade.created_at
                        ).toLocaleDateString()}
                    </span>
                </div>

                <div className="trade-notes">
                    <span className="trade-label">
                        Notes
                    </span>

                    <p>
                        {trade.notes || "No notes provided."}
                    </p>
                </div>
            </div>
        </div>
    );
}
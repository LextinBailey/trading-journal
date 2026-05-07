"use client"

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase/client";
import { Trade } from "@/types/trade";

export default function ViewTradePage() {
    const [trades, setTrades] = useState<Trade[]>([]);

    useEffect(() => {
        fetchTrades();
    }, []);

    const fetchTrades = async() => {
        const { data, error } = await supabase
            .from("trades")
            .select("id, pnl, result, notes, created_at")

        if (error) {
            console.error("Select error:", error.message);
            return;
        }

        if (data) {
            setTrades(data);
        } else {
            setTrades([]);
        }
    };

    const totalPnl = trades.reduce((sum, trade) => sum + trade.pnl, 0);
    const winCount = (trades.filter(trade => trade.result === "win")).length;
    const winRate = trades.length > 0 ?  Math.round((winCount / trades.length) * 100) : 0;

    return (
        <div>
            <div>
                <h1>Total PNL: ${totalPnl}</h1>
                <h1>Win Rate: {winRate}%</h1>
            </div>
            <div>
                {trades.length > 0 ? (
                    trades.map((trade) => (
                        <div key={trade.id}>
                            {trade.pnl}
                            {trade.result}
                            {trade.notes}
                            {trade.created_at}
                        </div>
                    ))
                ) : (
                    <span>No Trades</span>
                )}
            </div>
            
        </div>
    );
}
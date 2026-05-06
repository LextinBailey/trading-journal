"use client"

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
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

    return (
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
    );
}
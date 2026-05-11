"use client"

import { useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function TradeForm() {
    const router = useRouter();

    const [pnl, setPnl] = useState("");
    const [result, setResult] = useState("win");
    const [notes, setNotes] = useState("");

    async function handleSubmit() {
        const { data: userData } = await supabase.auth.getUser();
        const user = userData.user;

        if (!user) {
            console.error("No user found");
            return;
        }

        const { data, error } = await supabase
            .from("trades")
            .insert([
                {
                    user_id: user.id,
                    pnl: parseFloat(pnl),
                    result,
                    notes,
                },
            ]);

        if (error) {
            console.error("Insert error:", error.message);
            return;
        }

        router.push("/trades");
    }

    return (
        <div className="dashboard-page">
            <h1 className="dashboard-title">New Trade</h1>

            <div className="chart-card">
                <div className="trade-form">

                    <div className="form-group">
                        <label className="form-label">PnL</label>

                        <input
                            type="number"
                            placeholder="0.00"
                            value={pnl}
                            onChange={(e) => setPnl(e.target.value)}
                            className="trade-input"
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Result</label>

                        <select
                            value={result}
                            onChange={(e) => setResult(e.target.value)}
                            className="trade-input"
                        >
                            <option value="win">Win</option>
                            <option value="loss">Loss</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Notes</label>

                        <textarea
                            placeholder="What went well? What could improve?"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            className="trade-input trade-textarea"
                        />
                    </div>

                    <button
                        onClick={handleSubmit}
                        className="submit-button"
                    >
                        Add Trade
                    </button>

                </div>
            </div>
        </div>
    );
}
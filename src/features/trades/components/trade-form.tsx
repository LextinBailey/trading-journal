"use client"

import { useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

interface TradeFormProps {
    initialData?: {
        id?: number;
        pnl: number;
        result: string;
        notes: string;
    };
}

export default function TradeForm({
    initialData
}: TradeFormProps) {
    const isEditing = !!initialData;

    const router = useRouter();

    const [pnl, setPnl] = useState(initialData?.pnl?.toString() || "");
    const [result, setResult] = useState(initialData?.result || "win");
    const [notes, setNotes] = useState(initialData?.notes || "");

    async function handleSubmit() {
        const { data: userData } = await supabase.auth.getUser();
        const user = userData.user;

        if (!user) {
            console.error("No user found");
            return;
        }

        let response;

        if (isEditing) {
            response = await supabase
                .from("trades")
                .update({
                    pnl: parseFloat(pnl),
                    result,
                    notes,
                })
                .eq("id", initialData.id);
        } else {
            response = await supabase
                .from("trades")
                .insert([
                    {
                        user_id: user.id,
                        pnl: parseFloat(pnl),
                        result,
                        notes,
                    },
                ]);
        }

        const { data, error } = response;

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
                        {isEditing ? "Update Trade" : "Add Trade"}
                    </button>

                </div>
            </div>
        </div>
    );
}
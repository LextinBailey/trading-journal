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
    const [loading, setLoading] = useState(false);

    async function handleSubmit() {
        if (loading) return;

        if (!pnl.trim()) {
            alert("PNL is required");
            return;
        }

        const pnlValue = parseFloat(pnl);

        if (isNaN(pnlValue)) {
            alert("PNL must be a valid number");
            return;
        }

        try {
            setLoading(true);

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
                        pnl: pnlValue,
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
                            pnl: pnlValue,
                            result,
                            notes,
                        },
                    ]);
            }

            const { error } = response;

            if (error) {
                console.error("Trade submit error:", error.message);
                return;
            }

            router.push("/trades");
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
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
                            className="input-base trade-input"
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Result</label>

                        <select
                            value={result}
                            onChange={(e) => setResult(e.target.value)}
                            className="input-base trade-input"
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
                            className="input-base trade-textarea"
                        />
                    </div>

                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="btn btn-brand submit-button"
                    >
                        {loading
                            ? isEditing
                                ? "Updating..."
                                : "Adding..."
                            : isEditing
                                ? "Update Trade"
                                : "Add Trade"
                        }
                    </button>

                </div>
            </div>
        </div>
    );
}
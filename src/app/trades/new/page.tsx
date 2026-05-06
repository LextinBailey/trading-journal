"use client"

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function NewTradePage() {
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

        console.log("Trade created:", data);
    }

    return (
        <div>
            <h1>New Trade</h1>

            <input
                placeholder="PNL"
                onChange={(e) => setPnl(e.target.value)}
            />

            <select onChange={(e) => setResult(e.target.value)}>
                <option value="win">Win</option>
                <option value="loss">Loss</option>
            </select>

            <input
                placeholder="Notes"
                onChange={(e) => setNotes(e.target.value)}
            />

            <button onClick={handleSubmit}>
                Add Trade
            </button>
        </div>
    );
}
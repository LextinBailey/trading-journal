import { redirect } from "next/navigation";
import { createServerClientClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
    const supabase = await createServerClientClient();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) redirect("/auth/login");

    const { data: trades, error } = await supabase
        .from("trades")
        .select("*");
    
    if (error) {
        throw new Error("Failed to fetch trades");
    }

    return (
        <div>
            <h1>Dashboard</h1>

            <h2>Your Trades</h2>

            {trades?.length === 0 && <p>No trades yet</p>}

            {trades?.map((trade) => (
                <div key={trade.id}>
                    <p>{trade.pnl}</p>
                    <p>{trade.result}</p>
                </div>
            ))}
        </div>
    );
}
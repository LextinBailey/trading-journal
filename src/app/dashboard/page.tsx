import { redirect } from "next/navigation";
import { createServerClientClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
    const supabase = await createServerClientClient();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) redirect("/auth/login");

    return (
        <div>
            <h1>Dashboard</h1>
        </div>
    );
}
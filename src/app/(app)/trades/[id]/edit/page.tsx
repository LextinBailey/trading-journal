import { notFound } from "next/navigation";
import { createServerClientClient } from "@/lib/supabase/server";
import TradeForm from "@/features/trades/components/trade-form";

interface TradePageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function EditPage({
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

    return (
        <TradeForm
            initialData={trade}
        />
    );
}
"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

interface DeleteButtonProps {
    id: string;
}

export default function DeleteButton({
    id,
}: DeleteButtonProps) {
    const router = useRouter();

    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this trade?"
        );

        if (!confirmed) return;

        try {
            setLoading(true);

            const { error } = await supabase
                .from("trades")
                .delete()
                .eq("id", id);

            if (error) {
                console.error(error);
                alert("Failed to delete trade");
                return;
            }

            router.push("/trades");
        } catch (error) {
            console.error(error);
            alert("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleDelete}
            disabled={loading}
            className="btn btn-danger btn-sm"
        >
            {loading ? "Deleting..." : "Delete Trade"}
        </button>
    );
}
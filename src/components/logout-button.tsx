"use client";

import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

export default function LogoutButton() {
    const router = useRouter();

    async function handleLogout() {
        await supabase.auth.signOut();

        router.push("/");
        router.refresh();
    }

    return (
        <button
            onClick={handleLogout}
            className="btn btn-danger btn-md"
        >
            Logout
        </button>
    );
}
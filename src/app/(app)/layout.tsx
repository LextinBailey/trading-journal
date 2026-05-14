import { redirect } from "next/navigation";
import { createServerClientClient } from "@/lib/supabase/server";
import Sidebar from "@/components/navigation/sidebar";
import MobileTopBar from "@/components/navigation/mobile-topbar"
import { SidebarProvider } from "@/components/navigation/sidebar-context";

export default async function AppLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = await createServerClientClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect("/auth/login");
    }

    return (
        <SidebarProvider>
            <div className="app-layout">
                <Sidebar />
                <div className="app-body">
                    <MobileTopBar />
                    <main className="app-content">
                        {children}
                    </main>
                </div>
            </div>
        </SidebarProvider>
    );
}
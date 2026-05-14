import { redirect } from "next/navigation";
import { createServerClientClient } from "@/lib/supabase/server";
import LogoutButton from "@/components/logout-button";

export default async function ProfilePage() {
    const supabase = await createServerClientClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect("/auth/login");
    }

    return (
        <div className="dashboard-page">
            <div className="profile-page">
                <div className="trade-card">
                    <div>
                        <h1 className="page-title">
                            Profile
                        </h1>

                        <p className="page-description">
                            Manage your account information.
                        </p>
                    </div>

                    <div className="trade-details">
                        <div className="trade-row">
                            <span className="trade-label">
                                Email
                            </span>

                            <span className="trade-value">
                                {user.email}
                            </span>
                        </div>
                    </div>

                    <LogoutButton />
                </div>
            </div>
        </div>
    )
}

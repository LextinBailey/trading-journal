"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import Link from "next/link";

export default function ResetPasswordPage() {
    const router = useRouter();

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    async function handleReset(
        e: React.FormEvent<HTMLFormElement>
    ) {
        e.preventDefault();

        setErrorMessage("");

        if (newPassword !== confirmPassword) {
            setErrorMessage("Passwords do not match. Please try again.");
            return;
        }

        if (newPassword.length < 8) {
            setErrorMessage("Password must be 8 characters or longer.");
            return;
        }

        const { error } = await supabase.auth.updateUser({
            password: newPassword,
        });

        if (error) {
            setErrorMessage("Something went wrong. Please try again.");
            return;
        }

        router.replace("/auth/login");
    }

    return (
        <div className="auth-page">
            {/* Auth Card */}
            <div className="card auth-card">
                
                <form onSubmit={handleReset} className="flex flex-col gap-6">
                    {/* Email */}
                    <div className="flex flex-col gap-1.5">
                        <label className="field-label">New password</label>
                        <input
                            type="password"
                            placeholder="Your new password"
                            value={newPassword}
                            className="input-base"
                            onChange={(e) => setNewPassword(e.target.value)}
                        />

                        <label className="field-label">Confirm password</label>
                        <input
                            type="password"
                            placeholder="Confirm password"
                            value={confirmPassword}
                            className="input-base"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
            
                    <button 
                        type="submit"
                        className="btn btn-primary btn-lg btn-pill auth-btn"
                    >
                        Reset password
                    </button>
                </form>
                
                {errorMessage && (
                    <p className="flex flex-col items-center message">{errorMessage}</p>
                )}
            </div>
        </div>
    );
}
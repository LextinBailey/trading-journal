"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase/client";
import Link from "next/link";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    async function handleSendEmail(
        e: React.FormEvent<HTMLFormElement>
    ) {
        e.preventDefault();

        setMessage("");
        setErrorMessage("");

        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/auth/reset-password`,
        });

        if (error) {
            setErrorMessage("Something went wrong. Please try again.");
            return;
        }

        setMessage("If an account exists, a reset email has been sent.");
    }

    return (
        <div className="auth-page">
            {/* Auth Card */}
            <div className="card auth-card">
                
                <form onSubmit={handleSendEmail} className="flex flex-col gap-6">
                    {/* Email */}
                    <div className="flex flex-col gap-1.5">
                        <label className="field-label">Email address</label>
                        <input
                            type="email"
                            placeholder="Your email address"
                            value={email}
                            className="input-base"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
            
                    <button 
                        type="submit"
                        className="btn btn-primary btn-lg btn-pill auth-btn"
                    >
                        Send email
                    </button>

                    {message && (
                        <p className=" flex flex-col items-center message">{message}</p>
                    )}

                    {errorMessage && (
                        <p className="flex flex-col items-center message">{errorMessage}</p>
                    )}
            
                    <div className="flex flex-col items-center gap-1.5">
                        <Link href="/auth/login" className="auth-link">Already have an account? Sign in</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
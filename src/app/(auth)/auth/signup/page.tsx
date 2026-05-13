"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import Link from "next/link";

export default function SignUpPage() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    async function handleSignUp() {
        setErrorMessage("");

        if (password.length < 8) {
            setErrorMessage("Password must be 8 characters or longer.");
            return;
        }

        const { error } = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) {
            setErrorMessage("Something went wrong. Please try again.");
            return;
        }

        router.replace("/dashboard");
    }

    return (
        <div className="auth-page">
            {/* Auth Card */}
            <div className="card auth-card">   
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
        
                {/* Password */}
                <div className="flex flex-col gap-1.5">
                    <label className="field-label">Create a password</label>
                    <input
                        type="password"
                        placeholder="Your password"
                        value={password}
                        className="input-base"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
        
                <button 
                    type="button"
                    className="btn btn-primary btn-lg btn-pill auth-btn"
                    onClick={handleSignUp}
                >
                    Sign up
                </button>

                {errorMessage && (
                    <p className="flex flex-col items-center message">{errorMessage}</p>
                )}
        
                <div className="flex flex-col items-center gap-1.5">
                    <Link href="/auth/login" className="auth-link">Already have an account? Sign in</Link>
                </div>
            </div>
        </div>
    );
}
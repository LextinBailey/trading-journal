"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import Link from "next/link";

export default function LoginPage() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    async function handleLogin(
        e: React.FormEvent<HTMLFormElement>
    ) {
        e.preventDefault();

        setErrorMessage("");

        const { error } = await supabase.auth.signInWithPassword({
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
                
                {/* OAuth Buttons (Future Addition)
                    <div className="flex flex-col gap-3">
                    <button className="btn btn-ghost btn-pill oauth-btn">
                        <span className="text-base">⌘</span>
                        Sign in with Github
                    </button>
                    <button className="btn btn-ghost btn-pill oauth-btn">
                        <span className="text-base font-bold text-blue-500">G</span>
                        Sign in with Google
                    </button>
                    </div>
        
                    <hr className="auth-divider" />
                */}
                
                <form onSubmit={handleLogin} className="flex flex-col gap-6">
                    {/* Email */}
                    <div className="flex flex-col gap-1.5">
                        <label className="field-label">Email address</label>
                        <input
                            name="email"
                            type="email"
                            placeholder="Your email address"
                            autoComplete="email"
                            value={email}
                            className="input-base"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
            
                    {/* Password */}
                    <div className="flex flex-col gap-1.5">
                        <label className="field-label">Your password</label>
                        <input
                            name="password"
                            type="password"
                            placeholder="Your password"
                            autoComplete="current-password"
                            value={password}
                            className="input-base"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
            
                    <button 
                        type="submit"
                        className="btn btn-primary btn-lg btn-pill auth-btn"
                    >
                        Sign in
                    </button>
                </form>
                

                {errorMessage && (
                    <p className="flex flex-col items-center message">{errorMessage}</p>
                )}
        
                <div className="flex flex-col items-center gap-1.5">
                    <Link href="/auth/forgot-password" className="auth-link">Forgot your password?</Link>
                    <Link href="/auth/signup" className="auth-link">Don't have an account? Sign up</Link>
                </div>
            </div>
        </div>
    );
}
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import Link from "next/link";

export default function LoginPage() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleLogin() {
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            console.log(error.message);
            return;
        }

        router.replace("/dashboard");
    }

    return (
        <div className="auth-page">
            {/* Auth Card */}
            <div className="auth-card">
                
                {/* OAuth Buttons (Future Addition)
                    <div className="flex flex-col gap-3">
                    <button className="oauth-btn">
                        <span className="text-base">⌘</span>
                        Sign in with Github
                    </button>
                    <button className="oauth-btn">
                        <span className="text-base font-bold text-blue-500">G</span>
                        Sign in with Google
                    </button>
                    </div>
        
                    <hr className="auth-divider" />
                */}
                
                {/* Email */}
                <div className="flex flex-col gap-1.5">
                    <label className="field-label">Email address</label>
                    <input
                        type="email"
                        placeholder="Your email address"
                        value={email}
                        className="auth-input"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
        
                {/* Password */}
                <div className="flex flex-col gap-1.5">
                    <label className="field-label">Your Password</label>
                    <input
                        type="password"
                        placeholder="Your password"
                        value={password}
                        className="auth-input"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
        
                <button 
                    type="button"
                    className="signin-btn"
                    onClick={handleLogin}
                >
                    Sign in
                </button>
        
                <div className="flex flex-col items-center gap-1.5">
                    <Link href="#" className="auth-link">Forgot your password?</Link>
                    <Link href="/auth/signup" className="auth-link">Don't have an account? Sign up</Link>
                </div>
            </div>
        </div>
    );
}
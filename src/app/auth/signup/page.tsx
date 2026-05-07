"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import Link from "next/link";

export default function SignUpPage() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleSignUp() {
        const { data, error } = await supabase.auth.signUp({
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
                    <label className="field-label">Create a Password</label>
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
                    onClick={handleSignUp}
                >
                    Sign up
                </button>
        
                <div className="flex flex-col items-center gap-1.5">
                    <Link href="/auth/login" className="auth-link">Already have an account? Login</Link>
                </div>
            </div>
        </div>
    );
}
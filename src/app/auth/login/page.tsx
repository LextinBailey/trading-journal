"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleLogin() {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            console.log(error.message);
            return;
        }
    }

    return (
        <div>
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
                    className="auth-input"
                />
                </div>
        
                {/* Password */}
                <div className="flex flex-col gap-1.5">
                <label className="field-label">Your Password</label>
                <input
                    type="password"
                    placeholder="Your password"
                    className="auth-input"
                />
                </div>
        
                <button 
                className="signin-btn"
                //onClick={() => router.push("/dashboard")}
                >
                Sign in
                </button>
        
                <div className="flex flex-col items-center gap-1.5">
                <a href="#" className="auth-link">Forgot your password?</a>
                <a href="#" className="auth-link">Don't have an account? Sign up</a>
                </div>
        
            </div>
            <h1>Login</h1>

            <input
                placeholder="email"
                onChange={(e) => setEmail(e.target.value)}
            />

            <input 
                placeholder="password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
            />

            <button onClick={handleLogin}>
                Login
            </button>
        </div>
    );
}
"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase/client";

export default function SignUpPage() {
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

        console.log("User created:", data);
    }

    return (
        <div>
            <h1>Sign Up</h1>

            <input
                placeholder="email"
                onChange={(e) => setEmail(e.target.value)}
            />

            <input 
                placeholder="password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
            />

            <button onClick={handleSignUp}>
                Create Account
            </button>
        </div>
    );
}
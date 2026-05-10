"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import Link from "next/link";

export default function LandingPage() {
  const router = useRouter();

  useEffect(() => {
    const checkLoggedIn = async() => {
      const { data: userData } = await supabase.auth.getUser();
      const user = userData.user;

      if (user) {
        router.replace("/dashboard");
      }
    };

    checkLoggedIn();
  }, []);

  return (
    <main className="landing-page">
 
      {/* Header Card */}
      <div className="header-card">
        <div className="header-inner">
          <div>
            <h1 className="page-title">Trading Journal</h1>
            <p className="page-subtitle">Track your trades. Improve your decisions.</p>
          </div>
          {/* Dark Mode Button (Future Addition)
            <button className="dark-mode-btn">
              Dark Mode
            </button>
          */}
        </div>
      </div>
 
      {/* Landing Card */}
      <div className="landing-card">
        <Link 
          className="signup-link"
          href="/auth/signup"
        >
          Sign Up
        </Link>
            
        <Link 
          className="login-link"
          href="/auth/login"
        >
          Login
        </Link>
      </div>
    </main>
  );
}

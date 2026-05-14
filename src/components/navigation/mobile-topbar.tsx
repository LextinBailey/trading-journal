"use client";

import { useSidebar } from "@/components/navigation/sidebar-context";

export default function MobileTopBar() {
  const { open } = useSidebar();

  return (
    <div className="mobile-topbar">
      <span className="sidebar-logo">Trading Journal</span>
      <button className="btn btn-ghost btn-sm" onClick={open} aria-label="Open menu">☰</button>
    </div>
  );
}
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebar } from "./sidebar-context";
import { navigationItems } from "./navigation";

export default function Sidebar() {
  const pathname = usePathname();
  const { isOpen, close } = useSidebar();

  return (
    <>
      <aside className={`sidebar ${isOpen ? "sidebar-open" : ""}`}>
        <div className="sidebar-header">
          <h2 className="sidebar-logo">Trading Journal</h2>
          <button className="sidebar-close btn btn-ghost btn-sm" onClick={close} aria-label="Close menu">✕</button>
        </div>
        <nav className="sidebar-nav">
          {navigationItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`sidebar-link ${pathname === item.href ? "sidebar-link-active" : ""}`}
              onClick={close}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      {isOpen && <div className="sidebar-backdrop" onClick={close} />}
    </>
  );
}
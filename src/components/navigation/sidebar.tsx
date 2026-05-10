"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigationItems } from "./navigation";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2 className="sidebar-logo">Trading Journal</h2>
      </div>

      <nav className="sidebar-nav">
        {navigationItems.map((item) => {
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`sidebar-link ${
                active ? "sidebar-link-active" : ""
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
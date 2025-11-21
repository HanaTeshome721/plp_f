"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/platform", label: "Platform" },
  { href: "/contact", label: "Contact" },
];

const buttonBase =
  "rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-slate-50 transition hover:border-white/50";

export default function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 lg:px-8">
        <Link href="/" className="text-lg font-semibold text-white">
          PLP Mentorship
        </Link>
        <nav className="hidden items-center gap-2 text-sm font-medium text-slate-200 md:flex">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`${buttonBase} ${isActive ? "bg-white/10 text-white" : "text-slate-200"}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <Link href="/platform" className="md:hidden">
          <span className="rounded-full bg-indigo-500 px-4 py-2 text-sm font-semibold text-white">Explore</span>
        </Link>
      </div>
    </header>
  );
}

import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-slate-950/90">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-8 text-sm text-slate-400 lg:flex-row lg:items-center lg:justify-between">
        <p>© {new Date().getFullYear()} Peer Learning Platform. All rights reserved.</p>
        <div className="flex flex-wrap gap-4">
          <Link href="/about" className="hover:text-white">
            About
          </Link>
          <Link href="/platform" className="hover:text-white">
            Platform
          </Link>
          <Link href="/contact" className="hover:text-white">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}

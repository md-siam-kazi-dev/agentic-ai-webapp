"use client";

import Link from "next/link";
import { Globe, Send, Mail } from "lucide-react";
import { usePathname } from "next/navigation";

export function Footer() {
  const pathname = usePathname();
  if (pathname === "/assistant") return null;

  return (
    <footer className="border-t border-dark/10 bg-bg">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 py-8 text-sm text-foreground/70 sm:flex-row sm:justify-between sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <span className="flex size-6 items-center justify-center rounded-md bg-accent text-xs font-bold text-bg">
            L
          </span>
          <span className="text-foreground">Loom Ai</span>
          <span className="hidden sm:inline">· Your AI assistant for anything.</span>
        </div>

        <nav className="flex items-center gap-4">
          <Link href="/explore" className="hover:text-foreground">
            Explore
          </Link>
          <Link href="/about" className="hover:text-foreground">
            About
          </Link>
          <Link href="/help" className="hover:text-foreground">
            Help
          </Link>
          <Link href="/privacy" className="hover:text-foreground">
            Privacy
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <a href="https://github.com" aria-label="Website" className="hover:text-foreground">
            <Globe />
          </a>
          <a href="mailto:hello@pathwise.dev" aria-label="Email" className="hover:text-foreground">
            <Mail />
          </a>
          <a href="https://pathwise.dev" aria-label="Contact" className="hover:text-foreground">
            <Send />
          </a>
        </div>

        <p className="text-xs text-foreground/60">
          © {new Date().getFullYear()} Loom Ai
        </p>
      </div>
    </footer>
  );
}

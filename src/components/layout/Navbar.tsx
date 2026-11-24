"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/brand/Logo";
import { Menu, X, ArrowUpRight, Terminal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Process", href: "/process" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <nav
      id="site-nav"
      className="sticky top-0 left-0 z-50 w-full border-b border-[var(--line)] bg-[var(--bg)]/95 backdrop-blur-sm transition-colors duration-300"
    >
      <div className="flex min-h-12 items-stretch justify-between">
        {/* Left: Brand Logo in framed border box */}
        <div className="flex min-w-0 items-stretch">
          <Link
            href="/"
            className="flex items-center border-r border-[var(--line)] px-4 sm:px-6 hover:opacity-80 transition-opacity"
          >
            <Logo variant="horizontal" size="sm" />
          </Link>

          {/* Center/Desktop Navigation Links with ArtCraft HUD style */}
          <div className="hidden min-w-0 items-stretch md:flex">
            <ul className="flex h-full items-stretch">
              {NAV_LINKS.map((link) => {
                const active = isActive(link.href);
                return (
                  <li key={link.href} className="flex items-stretch">
                    <Link
                      href={link.href}
                      className="group flex h-full items-center px-3 hud-label whitespace-nowrap text-[var(--muted)] hover:text-[var(--ink-strong)] transition-colors"
                    >
                      <span
                        className={`flex items-center gap-1.5 px-2 py-0.5 transition-all duration-200 ${
                          active
                            ? "bg-[var(--invert-bg)] text-[var(--invert-fg)] font-semibold"
                            : "group-hover:bg-[var(--invert-bg)] group-hover:text-[var(--invert-fg)]"
                        }`}
                      >
                        {link.name}
                      </span>
                    </Link>
                  </li>
                );
              })}

              {/* Auxiliary System Links */}
              <li className="flex items-stretch ml-2 border-l border-[var(--line)] pl-2">
                <Link
                  href="/admin/login"
                  className="group flex h-full items-center px-3 hud-label whitespace-nowrap text-[var(--faint)] hover:text-[var(--ink)]"
                >
                  <span className="flex items-center gap-1.5 px-2 py-0.5 group-hover:bg-[var(--invert-bg)] group-hover:text-[var(--invert-fg)]">
                    <Terminal className="h-3 w-3" />
                    <span>Console</span>
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Action: CTA Button with Technical Border Frame */}
        <div className="flex items-stretch">
          <Link
            href="/start-a-project"
            className="hidden sm:flex items-center border-l border-[var(--line)] px-5 hud-label text-[var(--ink-strong)] bg-[var(--bg-raised)] hover:bg-[var(--invert-bg)] hover:text-[var(--invert-fg)] transition-all duration-200 group"
          >
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] group-hover:bg-[var(--invert-fg)] animate-pulse" />
              <span>Initiate Project</span>
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex items-center justify-center border-l border-[var(--line)] px-4 text-[var(--ink)] hover:bg-[var(--bg-sunken)] md:hidden"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-b border-[var(--line)] bg-[var(--bg)] px-4 py-6 md:hidden"
          >
            <div className="space-y-2">
              {NAV_LINKS.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`block px-3 py-2 hud-label text-sm ${
                      active
                        ? "bg-[var(--invert-bg)] text-[var(--invert-fg)]"
                        : "text-[var(--ink)] hover:bg-[var(--bg-sunken)]"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}

              <div className="pt-4 border-t border-[var(--line)] space-y-2">
                <Link
                  href="/start-a-project"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-[var(--invert-bg)] text-[var(--invert-fg)] hud-label text-xs font-bold"
                >
                  <span>Initiate Project</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
                <Link
                  href="/admin/login"
                  className="flex items-center justify-center gap-2 w-full py-2 border border-[var(--line)] hud-label text-xs text-[var(--muted)]"
                >
                  <Terminal className="h-3 w-3" />
                  <span>Admin Console</span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

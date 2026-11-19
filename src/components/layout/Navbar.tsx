"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/brand/Logo";
import { Menu, X, ArrowUpRight, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Process", href: "/process" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 py-3"
          : "bg-white/90 backdrop-blur-sm border-b border-gray-100/80 py-4"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Logo variant="horizontal" size="md" />

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-1.5 rounded-full text-xs lg:text-sm font-semibold transition-all duration-200 ${
                    active
                      ? "text-[#00A859] font-bold bg-[#E6F7EF]"
                      : "text-gray-700 hover:text-[#00A859]"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action CTA Button (Matching Screenshot "GET A QUOTE") */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/admin/login"
              className="text-xs font-semibold text-gray-500 hover:text-gray-900 transition-colors"
            >
              Staff
            </Link>
            <Link
              href="/start-a-project"
              className="inline-flex items-center gap-2 rounded-full bg-[#00A859] hover:bg-[#008f4c] px-6 py-2.5 text-xs font-bold text-white uppercase tracking-wider shadow-sm hover:shadow-md transition-all duration-300 hover:scale-102 active:scale-98"
            >
              <span>Get a Quote</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center gap-2 md:hidden">
            <Link
              href="/start-a-project"
              className="inline-flex items-center rounded-full bg-[#00A859] px-3.5 py-1.5 text-xs font-bold text-white shadow-sm"
            >
              Quote
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="inline-flex items-center justify-center rounded-xl p-2 text-gray-800 hover:bg-gray-100 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 border-t border-gray-100 pt-4 pb-3 md:hidden overflow-hidden"
            >
              <div className="flex flex-col space-y-2">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                      isActive(link.href)
                        ? "bg-[#E6F7EF] text-[#00A859] font-bold"
                        : "text-gray-700 hover:bg-gray-50 hover:text-gray-950"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="pt-2 border-t border-gray-100 flex items-center justify-between px-2">
                  <Link
                    href="/admin/login"
                    className="text-xs text-gray-500 hover:text-gray-900"
                  >
                    Admin Portal Login
                  </Link>
                  <div className="flex items-center gap-1 text-[11px] text-[#00A859] font-medium">
                    <Sparkles className="h-3 w-3" />
                    <span>AIVSTACK v1.0</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}

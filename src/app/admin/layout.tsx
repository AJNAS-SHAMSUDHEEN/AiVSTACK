"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Logo } from "@/components/brand/Logo";
import {
  LayoutDashboard,
  Inbox,
  FolderGit2,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
  Shield,
} from "lucide-react";

const NAV_ITEMS = [
  { name: "Dashboard Overview", href: "/admin", icon: LayoutDashboard },
  { name: "Enquiries & Pipeline", href: "/admin/enquiries", icon: Inbox },
  { name: "Projects & Portfolio", href: "/admin/projects", icon: FolderGit2 },
  { name: "Website Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // Skip auth check on login page
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (isLoginPage) return;

    fetch("/api/admin/auth")
      .then((res) => res.json())
      .then((data) => {
        if (!data.authenticated) {
          router.push("/admin/login");
        } else {
          setAuthenticated(true);
        }
      })
      .catch(() => router.push("/admin/login"));
  }, [pathname, isLoginPage, router]);

  const handleLogout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.push("/admin/login");
    router.refresh();
  };

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (authenticated === null) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FAFAFF]">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#A78BFA] border-t-transparent" />
          <span className="text-xs font-semibold text-[#706B7D]">Verifying Security Access...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#F4F2FA]">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 flex-col border-r border-[#A78BFA]/20 bg-white">
        <div className="p-6 border-b border-gray-100">
          <Logo variant="horizontal" size="sm" />
          <div className="mt-2.5 flex items-center gap-1.5 text-[11px] font-bold text-[#7C3AED] bg-[#F2EEFF] px-2.5 py-0.5 rounded-md w-fit">
            <Shield className="h-3 w-3" />
            <span>Admin Console v1.0</span>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1.5">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  active
                    ? "bg-[#30224D] text-white shadow-xs"
                    : "text-[#706B7D] hover:bg-[#F2EEFF] hover:text-[#30224D]"
                }`}
              >
                <Icon className={`h-4 w-4 ${active ? "text-[#A78BFA]" : "text-[#706B7D]"}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-100 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-medium text-[#706B7D] hover:bg-[#F2EEFF] hover:text-[#30224D] transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="h-3.5 w-3.5" />
              <span>Public Website</span>
            </span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header Bar */}
        <header className="lg:hidden flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3">
          <Logo variant="horizontal" size="sm" />
          <button
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
            className="p-2 rounded-lg text-gray-700 hover:bg-gray-100"
          >
            {mobileNavOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </header>

        {mobileNavOpen && (
          <div className="lg:hidden bg-white border-b border-gray-200 p-4 space-y-2">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileNavOpen(false)}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium ${
                  pathname === item.href ? "bg-[#30224D] text-white" : "text-gray-700"
                }`}
              >
                <span>{item.name}</span>
              </Link>
            ))}
            <button
              onClick={handleLogout}
              className="w-full text-left text-xs font-semibold text-red-600 pt-2"
            >
              Sign Out
            </button>
          </div>
        )}

        {/* Child Pages */}
        <main className="flex-1 p-6 sm:p-8 lg:p-10 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

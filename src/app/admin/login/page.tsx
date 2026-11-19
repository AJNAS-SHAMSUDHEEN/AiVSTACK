"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/brand/Logo";
import { Lock, ArrowRight, ShieldCheck, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Authentication failed");
      }

      router.push("/admin");
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Access Denied");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#F2EEFF]/60 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Logo variant="horizontal" size="lg" className="justify-center" />
          <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#A78BFA]/20 text-[#30224D] text-xs font-semibold">
            <ShieldCheck className="h-3.5 w-3.5 text-[#7C3AED]" />
            <span>Authorized Personnel Access Only</span>
          </div>
        </div>

        <div className="rounded-3xl border border-[#A78BFA]/25 bg-white p-8 shadow-xl">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F2EEFF] text-[#30224D]">
              <Lock className="h-5 w-5 text-[#7C3AED]" />
            </div>
            <div>
              <h1 className="font-heading text-xl font-bold text-[#24202D]">
                Administration Portal
              </h1>
              <p className="text-xs text-[#706B7D]">Enter master security key to continue</p>
            </div>
          </div>

          {error && (
            <div className="mb-6 flex items-center gap-2 rounded-xl bg-red-50 p-3.5 text-xs font-medium text-red-700 border border-red-200">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#24202D] mb-2">
                Administrator Password
              </label>
              <input
                type="password"
                required
                autoFocus
                placeholder="Enter password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#FAFAFF] text-sm text-[#24202D] focus:border-[#7C3AED] focus:outline-none focus:ring-1 focus:ring-[#7C3AED]"
              />
              <p className="mt-2 text-[11px] text-[#706B7D]">
                Default deployment key: <code className="bg-[#F2EEFF] text-[#30224D] px-1.5 py-0.5 rounded font-mono font-bold">aivstack2026</code>
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#30224D] px-6 py-3.5 text-sm font-semibold text-white shadow-md hover:bg-[#201535] transition-all disabled:opacity-50"
            >
              {loading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <ArrowRight className="h-4 w-4 text-[#A78BFA]" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-100 text-center">
            <Link
              href="/"
              className="text-xs text-[#706B7D] hover:text-[#30224D] hover:underline"
            >
              ← Return to public website
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/brand/Logo";
import {
  Lock,
  Mail,
  ShieldCheck,
  AlertCircle,
  Eye,
  EyeOff,
  KeyRound,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { auth } from "@/lib/firebase/config";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";

export default function AdminLoginPage() {
  const router = useRouter();

  // Mode: "firebase" (primary) or "masterKey" (fallback)
  const [mode, setMode] = useState<"firebase" | "masterKey">("firebase");

  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [masterKey, setMasterKey] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Status & Feedback
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resetSuccess, setResetSuccess] = useState("");
  const [resetLoading, setResetLoading] = useState(false);

  const translateFirebaseError = (errorCode: string): string => {
    switch (errorCode) {
      case "auth/invalid-credential":
      case "auth/wrong-password":
        return "Invalid email or password. Please verify your credentials.";
      case "auth/user-not-found":
        return "No administrator account found with this email.";
      case "auth/invalid-email":
        return "Please enter a valid email address.";
      case "auth/user-disabled":
        return "This administrator account has been disabled.";
      case "auth/too-many-requests":
        return "Access temporarily blocked due to multiple failed attempts. Please try again later or reset password.";
      case "auth/network-request-failed":
        return "Network connection to Firebase Authentication failed. Check your internet connection.";
      default:
        return "Authentication failed. Please check your credentials.";
    }
  };

  const handleFirebaseLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResetSuccess("");

    try {
      // 1. Authenticate with Firebase Auth
      const userCredential = await signInWithEmailAndPassword(auth, email.trim(), password);
      const user = userCredential.user;
      const idToken = await user.getIdToken();

      // 2. Establish server-side session cookie
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          idToken,
          email: user.email,
          uid: user.uid,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to create administrator session");
      }

      router.push("/admin");
      router.refresh();
    } catch (err: any) {
      console.error("Firebase Login Error:", err);
      const code = err.code || "";
      setError(code ? translateFirebaseError(code) : err.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  const handleMasterKeyLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResetSuccess("");

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: masterKey }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Invalid administrator security key");
      }

      router.push("/admin");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Access denied");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email.trim()) {
      setError("Please enter your administrator email first to receive a password reset link.");
      return;
    }

    setResetLoading(true);
    setError("");
    setResetSuccess("");

    try {
      await sendPasswordResetEmail(auth, email.trim());
      setResetSuccess(`Password reset instructions have been dispatched to ${email.trim()}.`);
    } catch (err: any) {
      const code = err.code || "";
      setError(code ? translateFirebaseError(code) : "Unable to send password reset email.");
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#F2EEFF]/60 px-4 py-12">
      <div className="w-full max-w-md">
        {/* Header branding */}
        <div className="text-center mb-8">
          <Logo variant="horizontal" size="lg" className="justify-center" />
          <div className="mt-4 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-[#A78BFA]/30 text-[#30224D] text-xs font-semibold shadow-xs">
            <ShieldCheck className="h-4 w-4 text-[#7C3AED]" />
            <span>AIVSTACK Administration Portal</span>
          </div>
        </div>

        {/* Main Card */}
        <div className="rounded-3xl border border-[#A78BFA]/25 bg-white p-7 sm:p-8 shadow-xl">
          {/* Card Title */}
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F2EEFF] text-[#7C3AED]">
              {mode === "firebase" ? <Lock className="h-5 w-5" /> : <KeyRound className="h-5 w-5" />}
            </div>
            <div>
              <h1 className="font-heading text-lg sm:text-xl font-bold text-[#24202D]">
                {mode === "firebase" ? "Administrator Sign In" : "Master Security Access"}
              </h1>
              <p className="text-xs text-[#706B7D]">
                {mode === "firebase"
                  ? "Sign in with your verified Firebase administrator account"
                  : "Authenticate via deployment emergency security key"}
              </p>
            </div>
          </div>

          {/* Feedback messages */}
          {error && (
            <div className="mb-6 flex items-start gap-2.5 rounded-2xl bg-red-50 p-3.5 text-xs font-medium text-red-700 border border-red-200">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
              <div className="flex-1">{error}</div>
            </div>
          )}

          {resetSuccess && (
            <div className="mb-6 flex items-start gap-2.5 rounded-2xl bg-emerald-50 p-3.5 text-xs font-medium text-emerald-800 border border-emerald-200">
              <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5 text-emerald-600" />
              <div className="flex-1">{resetSuccess}</div>
            </div>
          )}

          {/* Primary Form: Firebase Auth */}
          {mode === "firebase" ? (
            <form onSubmit={handleFirebaseLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#24202D] mb-1.5">
                  Admin Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#706B7D]" />
                  <input
                    type="email"
                    required
                    autoFocus
                    placeholder="admin@aivstack.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-[#FAFAFF] text-sm text-[#24202D] placeholder-gray-400 focus:border-[#7C3AED] focus:outline-none focus:ring-1 focus:ring-[#7C3AED]"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#24202D]">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    disabled={resetLoading}
                    className="text-[11px] font-semibold text-[#7C3AED] hover:underline disabled:opacity-50"
                  >
                    {resetLoading ? "Sending..." : "Forgot Password?"}
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#706B7D]" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-11 py-3 rounded-xl border border-gray-200 bg-[#FAFAFF] text-sm text-[#24202D] placeholder-gray-400 focus:border-[#7C3AED] focus:outline-none focus:ring-1 focus:ring-[#7C3AED]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#30224D] px-6 py-3.5 text-sm font-semibold text-white shadow-md hover:bg-[#201535] transition-all disabled:opacity-50 mt-2"
              >
                {loading ? (
                  <span>Authenticating with Firebase...</span>
                ) : (
                  <>
                    <span>Sign In to Console</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>

              <div className="pt-4 text-center border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => {
                    setMode("masterKey");
                    setError("");
                    setResetSuccess("");
                  }}
                  className="text-xs text-[#706B7D] hover:text-[#30224D] font-medium"
                >
                  Need emergency access? Use <span className="underline font-semibold text-[#7C3AED]">Security Key</span>
                </button>
              </div>
            </form>
          ) : (
            /* Fallback Form: Master Key */
            <form onSubmit={handleMasterKeyLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#24202D] mb-1.5">
                  Deployment Security Key
                </label>
                <div className="relative">
                  <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#706B7D]" />
                  <input
                    type="password"
                    required
                    autoFocus
                    placeholder="Enter security key..."
                    value={masterKey}
                    onChange={(e) => setMasterKey(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-[#FAFAFF] text-sm text-[#24202D] focus:border-[#7C3AED] focus:outline-none focus:ring-1 focus:ring-[#7C3AED]"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#30224D] px-6 py-3.5 text-sm font-semibold text-white shadow-md hover:bg-[#201535] transition-all disabled:opacity-50"
              >
                {loading ? <span>Verifying Key...</span> : <span>Verify & Access Console</span>}
              </button>

              <div className="pt-4 text-center border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => {
                    setMode("firebase");
                    setError("");
                    setResetSuccess("");
                  }}
                  className="text-xs text-[#706B7D] hover:text-[#30224D] font-medium"
                >
                  Return to <span className="underline font-semibold text-[#7C3AED]">Firebase Account Login</span>
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Security badge at footer */}
        <p className="mt-8 text-center text-xs text-[#706B7D]">
          Protected by Google Firebase Authentication & 256-bit SSL session encryption.
        </p>
      </div>
    </div>
  );
}

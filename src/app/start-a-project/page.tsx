"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SERVICES } from "@/data/services";
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Send,
  Layers,
  Calendar,
  DollarSign,
  Globe,
  Briefcase,
} from "lucide-react";
import Link from "next/link";

const BUDGET_RANGES = [
  "Under $1,500 (< ₹1.2 Lakh)",
  "$1,500 - $3,500 (₹1.2L - ₹3L)",
  "$3,500 - $7,500 (₹3L - ₹6.5L)",
  "$7,500 - $15,000 (₹6.5L - ₹12L)",
  "$15,000+ (Enterprise Scope)",
  "Flexible / To Be Estimated",
];

const DEADLINES = [
  "Urgent (< 2-3 Weeks)",
  "1 Month",
  "2 - 3 Months",
  "3 - 6 Months",
  "Flexible / Long-term Roadmap",
];

function StartProjectForm() {
  const searchParams = useSearchParams();
  const preSelectedService = searchParams.get("service") || "web-development";
  const preSelectedRef = searchParams.get("reference") || "";

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    country: "India",
    company: "",
    serviceId: preSelectedService,
    projectTitle: preSelectedRef ? `Similar to ${preSelectedRef}` : "",
    description: "",
    budgetRange: BUDGET_RANGES[1],
    expectedDeadline: DEADLINES[2],
    referenceUrl: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit project enquiry.");
      }

      setSubmitted(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-3xl border border-[#A78BFA]/30 bg-white p-8 sm:p-14 shadow-lg text-center max-w-2xl mx-auto my-12">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 mb-6">
          <CheckCircle2 className="h-12 w-12" />
        </div>
        <span className="text-xs font-semibold uppercase tracking-widest text-[#7C3AED]">
          Enquiry Transmitted Securely
        </span>
        <h2 className="mt-2 font-heading text-3xl font-bold text-[#24202D]">
          Your Project Brief Has Been Received!
        </h2>
        <p className="mt-4 text-sm sm:text-base text-[#706B7D] leading-relaxed">
          Thank you for trusting AIVSTACK with your vision. An engineering director will review your
          specifications and contact you at <span className="font-bold text-[#30224D]">{formData.email}</span> within 24 business hours to schedule an initial discovery alignment.
        </p>

        <div className="mt-8 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex rounded-full bg-[#30224D] px-7 py-3 text-xs font-semibold text-white hover:bg-[#201535]"
          >
            Return to Homepage
          </Link>
          <Link
            href="/portfolio"
            className="inline-flex rounded-full border border-gray-200 px-6 py-3 text-xs font-medium text-[#706B7D] hover:bg-gray-50"
          >
            Explore Completed Work
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <div className="p-4 rounded-xl bg-red-50 text-red-700 text-xs sm:text-sm font-medium border border-red-200">
          {error}
        </div>
      )}

      {/* 1. Client Identity */}
      <div className="rounded-3xl border border-[#A78BFA]/20 bg-white p-6 sm:p-8 shadow-xs">
        <div className="flex items-center gap-2 mb-6">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#F2EEFF] text-[#30224D] text-xs font-bold font-mono">
            1
          </span>
          <h2 className="font-heading text-lg font-bold text-[#30224D]">
            About You & Your Organization
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#24202D] mb-2">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Vikram Mehta"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#FAFAFF] text-sm text-[#24202D] focus:border-[#7C3AED] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#24202D] mb-2">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              required
              placeholder="e.g. vikram@enterprise.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#FAFAFF] text-sm text-[#24202D] focus:border-[#7C3AED] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#24202D] mb-2">
              Country of Residence / Operation <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. India, United Kingdom, USA, Germany"
              value={formData.country}
              onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#FAFAFF] text-sm text-[#24202D] focus:border-[#7C3AED] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#24202D] mb-2">
              Company / Organization (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Mehta & Sons Logistics Ltd."
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#FAFAFF] text-sm text-[#24202D] focus:border-[#7C3AED] focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* 2. Service Category */}
      <div className="rounded-3xl border border-[#A78BFA]/20 bg-white p-6 sm:p-8 shadow-xs">
        <div className="flex items-center gap-2 mb-4">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#F2EEFF] text-[#30224D] text-xs font-bold font-mono">
            2
          </span>
          <h2 className="font-heading text-lg font-bold text-[#30224D]">
            Select Primary Service Vertical <span className="text-red-500">*</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {SERVICES.map((s) => {
            const selected = formData.serviceId === s.slug;
            return (
              <button
                type="button"
                key={s.id}
                onClick={() => setFormData({ ...formData, serviceId: s.slug })}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  selected
                    ? "border-[#7C3AED] bg-[#F2EEFF] text-[#30224D] ring-2 ring-[#7C3AED]/20"
                    : "border-gray-200 bg-[#FAFAFF] text-[#706B7D] hover:border-[#A78BFA] hover:text-[#30224D]"
                }`}
              >
                <div className="font-heading text-sm font-bold text-[#24202D] mb-1">
                  {s.title}
                </div>
                <div className="text-xs text-[#706B7D] line-clamp-1">
                  {s.tagline}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Project Details */}
      <div className="rounded-3xl border border-[#A78BFA]/20 bg-white p-6 sm:p-8 shadow-xs">
        <div className="flex items-center gap-2 mb-6">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#F2EEFF] text-[#30224D] text-xs font-bold font-mono">
            3
          </span>
          <h2 className="font-heading text-lg font-bold text-[#30224D]">
            Project Scope & Specifications
          </h2>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#24202D] mb-2">
              Working Project Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Next.js Enterprise Booking Platform & Admin Portal"
              value={formData.projectTitle}
              onChange={(e) => setFormData({ ...formData, projectTitle: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#FAFAFF] text-sm text-[#24202D] focus:border-[#7C3AED] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#24202D] mb-2">
              Project Description & Requirements <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={5}
              required
              placeholder="Describe what you want to achieve, user workflows, target deliverables, or specific integrations required..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#FAFAFF] text-sm text-[#24202D] focus:border-[#7C3AED] focus:outline-none leading-relaxed"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#24202D] mb-2">
                Estimated Budget Band <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.budgetRange}
                onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#FAFAFF] text-sm text-[#24202D] focus:border-[#7C3AED] focus:outline-none"
              >
                {BUDGET_RANGES.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#24202D] mb-2">
                Expected Deadline / Target Launch
              </label>
              <select
                value={formData.expectedDeadline}
                onChange={(e) => setFormData({ ...formData, expectedDeadline: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#FAFAFF] text-sm text-[#24202D] focus:border-[#7C3AED] focus:outline-none"
              >
                {DEADLINES.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#24202D] mb-2">
              Reference Website or Figma URL (Optional)
            </label>
            <input
              type="url"
              placeholder="https://example.com or Figma prototype link"
              value={formData.referenceUrl}
              onChange={(e) => setFormData({ ...formData, referenceUrl: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#FAFAFF] text-sm text-[#24202D] focus:border-[#7C3AED] focus:outline-none"
            />
          </div>
        </div>
      </div>

      <div className="text-center pt-2">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[#30224D] px-10 py-4 text-base font-bold text-white shadow-lg hover:bg-[#201535] hover:shadow-xl transition-all duration-300 disabled:opacity-50 active:scale-98"
        >
          {loading ? (
            <span>Encrypting & Sending Brief...</span>
          ) : (
            <>
              <span>Submit Project Brief to AIVSTACK</span>
              <Send className="h-4 w-4 text-[#A78BFA]" />
            </>
          )}
        </button>
        <p className="mt-3 text-xs text-[#706B7D]">
          Strict client confidentiality guaranteed. Your information is never shared with third parties.
        </p>
      </div>
    </form>
  );
}

export default function StartProjectPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#FAFAFF]">
      <Navbar />
      <main className="flex-1">
        {/* Header */}
        <section className="relative overflow-hidden pt-12 pb-16 md:pt-18 md:pb-20 border-b border-[#A78BFA]/15 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-[#24202D] tracking-tight leading-tight">
                Start a New{" "}
                <span className="bg-gradient-to-r from-[#30224D] via-[#6D28D9] to-[#A78BFA] bg-clip-text text-transparent">
                  Project Brief.
                </span>
              </h1>
              <p className="mt-6 text-lg text-[#706B7D] leading-relaxed">
                Provide the high-level scope of your vision. We analyze every submission with engineering
                rigor to deliver an accurate proposal, architectural recommendation, and clear milestone roadmap.
              </p>
            </div>
          </div>
        </section>

        {/* Guided Form Container */}
        <section className="py-16 sm:py-20 bg-[#FAFAFF]">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <Suspense fallback={<div className="text-center py-12">Loading questionnaire...</div>}>
              <StartProjectForm />
            </Suspense>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

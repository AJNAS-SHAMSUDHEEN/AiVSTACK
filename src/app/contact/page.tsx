"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageSquare, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    country: "India",
    company: "",
    serviceId: "web-development",
    projectTitle: "General Contact Inquiry",
    description: "",
    budgetRange: "To be discussed",
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
        throw new Error(data.error || "Failed to submit message");
      }

      setSubmitted(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#FAFAFF]">
      <Navbar />
      <main className="flex-1">
        {/* Header */}
        <section className="relative overflow-hidden pt-12 pb-16 md:pt-18 md:pb-24 border-b border-[#A78BFA]/15 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-[#24202D] tracking-tight leading-tight">
                Let&apos;s Start a{" "}
                <span className="bg-gradient-to-r from-[#30224D] via-[#6D28D9] to-[#A78BFA] bg-clip-text text-transparent">
                  Conversation.
                </span>
              </h1>
              <p className="mt-6 text-lg text-[#706B7D] leading-relaxed">
                Have questions about our services, technical approach, or upcoming project availability?
                Reach out to our leadership team directly via email, WhatsApp, or through the contact form below.
              </p>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-20 bg-[#FAFAFF]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Left Column: Direct channels */}
              <div className="lg:col-span-5 space-y-8">
                <div className="rounded-3xl border border-[#A78BFA]/20 bg-white p-8 sm:p-10 shadow-xs">
                  <h2 className="font-heading text-2xl font-bold text-[#30224D] mb-6">
                    Direct Channels
                  </h2>

                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F2EEFF] text-[#7C3AED] shrink-0 mt-0.5">
                        <Mail className="h-5 w-5" />
                      </div>
                      <div>
                        <span className="block text-xs font-bold uppercase tracking-wider text-[#706B7D]">
                          Official Email
                        </span>
                        <a
                          href="mailto:hello@aivstack.com"
                          className="text-base font-semibold text-[#24202D] hover:text-[#7C3AED] transition-colors"
                        >
                          hello@aivstack.com
                        </a>
                        <p className="text-xs text-[#706B7D] mt-0.5">
                          Response time typically within 24 business hours.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 shrink-0 mt-0.5">
                        <Phone className="h-5 w-5" />
                      </div>
                      <div>
                        <span className="block text-xs font-bold uppercase tracking-wider text-[#706B7D]">
                          WhatsApp & Direct Call
                        </span>
                        <a
                          href="https://wa.me/919876543210"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-base font-semibold text-[#24202D] hover:text-[#7C3AED] transition-colors"
                        >
                          +91 98765 43210
                        </a>
                        <p className="text-xs text-[#706B7D] mt-0.5">
                          Instant messaging for fast project scoping.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F2EEFF] text-[#7C3AED] shrink-0 mt-0.5">
                        <MapPin className="h-5 w-5" />
                      </div>
                      <div>
                        <span className="block text-xs font-bold uppercase tracking-wider text-[#706B7D]">
                          Operational Base
                        </span>
                        <span className="text-base font-semibold text-[#24202D]">
                          India & International Clients
                        </span>
                        <p className="text-xs text-[#706B7D] mt-0.5">
                          Operating across IST, European, and US timezones.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Structured brief reminder card */}
                <div className="rounded-3xl border border-[#A78BFA]/30 bg-gradient-to-br from-[#30224D] to-[#201535] p-8 text-white shadow-md">
                  <h3 className="font-heading text-xl font-bold text-white mb-2">
                    Looking to Start a Project?
                  </h3>
                  <p className="text-sm text-[#C4B5FD] mb-6 leading-relaxed">
                    Use our guided project questionnaire to submit your specific requirements, timeline, and budget bands.
                  </p>
                  <Link
                    href="/start-a-project"
                    className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-xs font-bold text-[#30224D] hover:bg-[#F2EEFF] transition-colors"
                  >
                    <span>Launch Project Brief Builder</span>
                    <ArrowRight className="h-4 w-4 text-[#7C3AED]" />
                  </Link>
                </div>
              </div>

              {/* Right Column: Contact form */}
              <div className="lg:col-span-7">
                <div className="rounded-3xl border border-[#A78BFA]/20 bg-white p-8 sm:p-12 shadow-xs">
                  {submitted ? (
                    <div className="py-12 text-center">
                      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 mb-6">
                        <CheckCircle2 className="h-10 w-10" />
                      </div>
                      <h3 className="font-heading text-2xl font-bold text-[#24202D]">
                        Message Received!
                      </h3>
                      <p className="mt-3 text-sm text-[#706B7D] max-w-md mx-auto leading-relaxed">
                        Thank you for reaching out to AIVSTACK. Our team has received your communication
                        and will get back to you shortly at <span className="font-bold text-[#30224D]">{formData.email}</span>.
                      </p>
                      <button
                        onClick={() => {
                          setSubmitted(false);
                          setFormData({
                            fullName: "",
                            email: "",
                            country: "India",
                            company: "",
                            serviceId: "web-development",
                            projectTitle: "General Contact Inquiry",
                            description: "",
                            budgetRange: "To be discussed",
                          });
                        }}
                        className="mt-8 inline-flex rounded-full bg-[#30224D] px-6 py-2.5 text-xs font-semibold text-white hover:bg-[#201535]"
                      >
                        Send Another Note
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <h2 className="font-heading text-2xl font-bold text-[#30224D]">
                        Send Us a Message
                      </h2>

                      {error && (
                        <div className="p-3.5 rounded-xl bg-red-50 text-red-700 text-xs font-medium border border-red-200">
                          {error}
                        </div>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-[#24202D] mb-2">
                            Full Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Rahul Verma"
                            value={formData.fullName}
                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#FAFAFF] text-sm text-[#24202D] focus:border-[#7C3AED] focus:outline-none focus:ring-1 focus:ring-[#7C3AED]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-[#24202D] mb-2">
                            Email Address <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="email"
                            required
                            placeholder="e.g. rahul@company.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#FAFAFF] text-sm text-[#24202D] focus:border-[#7C3AED] focus:outline-none focus:ring-1 focus:ring-[#7C3AED]"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-[#24202D] mb-2">
                            Company / Organization (Optional)
                          </label>
                          <input
                            type="text"
                            placeholder="Your Company Name"
                            value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#FAFAFF] text-sm text-[#24202D] focus:border-[#7C3AED] focus:outline-none focus:ring-1 focus:ring-[#7C3AED]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-[#24202D] mb-2">
                            Country <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. India, United Kingdom, USA"
                            value={formData.country}
                            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#FAFAFF] text-sm text-[#24202D] focus:border-[#7C3AED] focus:outline-none focus:ring-1 focus:ring-[#7C3AED]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#24202D] mb-2">
                          Your Message / Inquiry <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          rows={4}
                          required
                          placeholder="Tell us about what you want to build or discuss..."
                          value={formData.description}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#FAFAFF] text-sm text-[#24202D] focus:border-[#7C3AED] focus:outline-none focus:ring-1 focus:ring-[#7C3AED]"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#30224D] px-8 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-[#201535] transition-all disabled:opacity-50"
                      >
                        {loading ? (
                          <span>Submitting...</span>
                        ) : (
                          <>
                            <span>Send Message</span>
                            <Send className="h-4 w-4 text-[#A78BFA]" />
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

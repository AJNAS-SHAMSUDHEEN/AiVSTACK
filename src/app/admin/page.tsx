"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Enquiry } from "@/lib/db";
import { Project } from "@/data/projects";
import {
  Inbox,
  FolderGit2,
  Clock,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  AlertCircle,
  Sparkles,
} from "lucide-react";

export default function AdminDashboardPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/enquiries").then((r) => r.json()),
      fetch("/api/admin/projects").then((r) => r.json()),
    ])
      .then(([enqData, projData]) => {
        setEnquiries(enqData.enquiries || []);
        setProjects(projData.projects || []);
      })
      .catch((err) => console.error("Error loading admin stats:", err))
      .finally(() => setLoading(false));
  }, []);

  // Compute real database metrics
  const totalEnquiries = enquiries.length;
  const newEnquiries = enquiries.filter((e) => e.status === "New").length;
  const inDiscussion = enquiries.filter((e) =>
    ["Under Review", "Contacted", "Discussion", "Quotation Sent"].includes(e.status)
  ).length;
  const completedProjects = projects.filter((p) => p.projectStatus === "Completed").length;
  const activeProjects = projects.filter((p) => p.projectStatus === "In Development").length;
  const totalPortfolio = projects.length;

  if (loading) {
    return (
      <div className="py-20 text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-[#A78BFA] border-t-transparent" />
        <p className="mt-3 text-xs font-semibold text-[#706B7D]">Fetching Database Records...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Top Welcome Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-[#24202D]">
            Executive Dashboard
          </h1>
          <p className="text-sm text-[#706B7D] mt-1">
            Real-time operations, inbound project pipelines, and portfolio status.
          </p>
        </div>

        <Link
          href="/admin/enquiries"
          className="inline-flex items-center gap-2 rounded-full bg-[#30224D] px-5 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-[#201535] transition-colors"
        >
          <span>Manage Enquiries</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* Metrics Row (Strictly DB-Backed) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <div className="rounded-2xl border border-[#A78BFA]/20 bg-white p-5 shadow-xs">
          <span className="block text-xs font-bold uppercase tracking-wider text-[#706B7D]">
            Total Enquiries
          </span>
          <div className="mt-2 text-2xl font-bold text-[#24202D] font-mono">
            {totalEnquiries}
          </div>
          <span className="text-[11px] text-[#706B7D] mt-1 block">All recorded submissions</span>
        </div>

        <div className="rounded-2xl border border-purple-200 bg-purple-50/50 p-5 shadow-xs">
          <span className="block text-xs font-bold uppercase tracking-wider text-[#7C3AED]">
            New / Unreviewed
          </span>
          <div className="mt-2 text-2xl font-bold text-[#7C3AED] font-mono">
            {newEnquiries}
          </div>
          <span className="text-[11px] text-[#7C3AED] mt-1 block">Requires action</span>
        </div>

        <div className="rounded-2xl border border-blue-200 bg-blue-50/50 p-5 shadow-xs">
          <span className="block text-xs font-bold uppercase tracking-wider text-blue-700">
            In Discussion
          </span>
          <div className="mt-2 text-2xl font-bold text-blue-700 font-mono">
            {inDiscussion}
          </div>
          <span className="text-[11px] text-blue-600 mt-1 block">Active sales cycle</span>
        </div>

        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-5 shadow-xs">
          <span className="block text-xs font-bold uppercase tracking-wider text-emerald-700">
            Active Projects
          </span>
          <div className="mt-2 text-2xl font-bold text-emerald-700 font-mono">
            {activeProjects}
          </div>
          <span className="text-[11px] text-emerald-600 mt-1 block">In development</span>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-xs">
          <span className="block text-xs font-bold uppercase tracking-wider text-[#706B7D]">
            Completed
          </span>
          <div className="mt-2 text-2xl font-bold text-[#24202D] font-mono">
            {completedProjects}
          </div>
          <span className="text-[11px] text-[#706B7D] mt-1 block">Commercial deliveries</span>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-xs">
          <span className="block text-xs font-bold uppercase tracking-wider text-[#706B7D]">
            Total Portfolio
          </span>
          <div className="mt-2 text-2xl font-bold text-[#24202D] font-mono">
            {totalPortfolio}
          </div>
          <span className="text-[11px] text-[#706B7D] mt-1 block">Published entries</span>
        </div>
      </div>

      {/* Recent Enquiries Quick Table */}
      <div className="rounded-3xl border border-[#A78BFA]/20 bg-white p-6 sm:p-8 shadow-xs">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-heading text-lg font-bold text-[#30224D]">
              Recent Incoming Project Enquiries
            </h2>
            <p className="text-xs text-[#706B7D]">Latest client brief submissions</p>
          </div>
          <Link
            href="/admin/enquiries"
            className="text-xs font-semibold text-[#7C3AED] hover:underline"
          >
            View All ({enquiries.length}) →
          </Link>
        </div>

        {enquiries.length === 0 ? (
          <p className="text-sm text-[#706B7D] py-6 text-center">No enquiries recorded yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="border-b border-gray-100 bg-[#FAFAFF] text-xs font-bold uppercase tracking-wider text-[#706B7D]">
                <tr>
                  <th className="py-3 px-4">Client</th>
                  <th className="py-3 px-4">Service</th>
                  <th className="py-3 px-4">Budget</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Submitted</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {enquiries.slice(0, 5).map((enq) => (
                  <tr key={enq.id} className="hover:bg-[#FAFAFF]/80 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-[#24202D]">{enq.fullName}</div>
                      <div className="text-[11px] text-[#706B7D]">{enq.email}</div>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-[#24202D]">
                      {enq.serviceTitle}
                    </td>
                    <td className="py-3.5 px-4 text-[#706B7D]">{enq.budgetRange}</td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          enq.status === "New"
                            ? "bg-purple-100 text-[#7C3AED]"
                            : enq.status === "Approved"
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {enq.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-[#706B7D] text-xs">
                      {new Date(enq.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <Link
                        href={`/admin/enquiries?id=${enq.id}`}
                        className="text-xs font-semibold text-[#7C3AED] hover:underline"
                      >
                        Open Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

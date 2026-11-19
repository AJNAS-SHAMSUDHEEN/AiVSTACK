"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Enquiry } from "@/lib/db";
import {
  Search,
  Filter,
  Inbox,
  Calendar,
  DollarSign,
  User,
  Mail,
  Building,
  Globe,
  ExternalLink,
  Save,
  CheckCircle,
  X,
} from "lucide-react";

const STATUS_LIST: Enquiry["status"][] = [
  "New",
  "Under Review",
  "Contacted",
  "Discussion",
  "Quotation Sent",
  "Approved",
  "Rejected",
  "Archived",
];

function EnquiriesView() {
  const searchParams = useSearchParams();
  const targetId = searchParams.get("id");

  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [activeEnquiry, setActiveEnquiry] = useState<Enquiry | null>(null);

  // Edit states for the drawer
  const [statusVal, setStatusVal] = useState<Enquiry["status"]>("New");
  const [notesVal, setNotesVal] = useState("");
  const [followUpVal, setFollowUpVal] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const fetchEnquiries = async () => {
    try {
      const res = await fetch("/api/admin/enquiries");
      const data = await res.json();
      if (data.enquiries) {
        setEnquiries(data.enquiries);
        if (targetId) {
          const found = data.enquiries.find((e: Enquiry) => e.id === targetId);
          if (found) selectEnquiry(found);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, [targetId]);

  const selectEnquiry = (enquiry: Enquiry) => {
    setActiveEnquiry(enquiry);
    setStatusVal(enquiry.status);
    setNotesVal(enquiry.internalNotes || "");
    setFollowUpVal(enquiry.followUpAt || "");
    setSaveSuccess(false);
  };

  const handleUpdate = async () => {
    if (!activeEnquiry) return;
    setSaving(true);
    setSaveSuccess(false);

    try {
      const res = await fetch("/api/admin/enquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: activeEnquiry.id,
          status: statusVal,
          internalNotes: notesVal,
          followUpAt: followUpVal,
        }),
      });

      const data = await res.json();
      if (data.success && data.enquiry) {
        setActiveEnquiry(data.enquiry);
        setEnquiries((prev) =>
          prev.map((e) => (e.id === data.enquiry.id ? data.enquiry : e))
        );
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      }
    } catch (err) {
      console.error("Failed to update enquiry:", err);
    } finally {
      setSaving(false);
    }
  };

  const filtered = enquiries.filter((e) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      e.fullName.toLowerCase().includes(query) ||
      e.email.toLowerCase().includes(query) ||
      e.projectTitle.toLowerCase().includes(query) ||
      (e.company && e.company.toLowerCase().includes(query));

    const matchesStatus = selectedStatus === "All" || e.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-[#24202D]">
          Enquiries & Project Pipeline
        </h1>
        <p className="text-sm text-[#706B7D] mt-1">
          Review inbound briefs, update statuses, record internal notes, and schedule client follow-ups.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-[#A78BFA]/20 shadow-xs">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#706B7D]" />
          <input
            type="text"
            placeholder="Search by client name, email, company, or project title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-gray-200 bg-[#FAFAFF] focus:border-[#7C3AED] focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-[#706B7D]" />
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="text-xs sm:text-sm rounded-xl border border-gray-200 bg-[#FAFAFF] px-3 py-2 font-medium text-[#24202D] focus:border-[#7C3AED] focus:outline-none"
          >
            <option value="All">All Statuses ({enquiries.length})</option>
            {STATUS_LIST.map((st) => (
              <option key={st} value={st}>
                {st} ({enquiries.filter((e) => e.status === st).length})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Enquiries Table & Detail Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Table Area */}
        <div className={`${activeEnquiry ? "lg:col-span-7" : "lg:col-span-12"} transition-all`}>
          <div className="rounded-3xl border border-[#A78BFA]/20 bg-white overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="border-b border-gray-100 bg-[#FAFAFF] text-xs font-bold uppercase tracking-wider text-[#706B7D]">
                  <tr>
                    <th className="py-3.5 px-4">Client</th>
                    <th className="py-3.5 px-4">Service</th>
                    <th className="py-3.5 px-4">Budget</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4 text-right">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {loading ? (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-[#706B7D]">
                        Loading enquiries...
                      </td>
                    </tr>
                  ) : filtered.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-[#706B7D]">
                        No enquiries match the current criteria.
                      </td>
                    </tr>
                  ) : (
                    filtered.map((enq) => {
                      const isSelected = activeEnquiry?.id === enq.id;
                      return (
                        <tr
                          key={enq.id}
                          onClick={() => selectEnquiry(enq)}
                          className={`cursor-pointer transition-colors ${
                            isSelected
                              ? "bg-[#F2EEFF]/80 font-medium"
                              : "hover:bg-[#FAFAFF]"
                          }`}
                        >
                          <td className="py-3.5 px-4">
                            <div className="font-semibold text-[#24202D]">{enq.fullName}</div>
                            <div className="text-[11px] text-[#706B7D]">{enq.email}</div>
                          </td>
                          <td className="py-3.5 px-4 text-[#24202D]">{enq.serviceTitle}</td>
                          <td className="py-3.5 px-4 text-[#706B7D] text-xs">{enq.budgetRange}</td>
                          <td className="py-3.5 px-4">
                            <span
                              className={`inline-flex px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                                enq.status === "New"
                                  ? "bg-purple-100 text-[#7C3AED]"
                                  : enq.status === "Approved"
                                  ? "bg-emerald-100 text-emerald-800"
                                  : enq.status === "Rejected"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-blue-100 text-blue-800"
                              }`}
                            >
                              {enq.status}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-right text-xs text-[#706B7D]">
                            {new Date(enq.createdAt).toLocaleDateString()}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Detail Drawer */}
        {activeEnquiry && (
          <div className="lg:col-span-5 rounded-3xl border border-[#A78BFA]/30 bg-white p-6 sm:p-7 shadow-lg space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div>
                <span className="text-xs font-mono font-semibold text-[#7C3AED]">
                  {activeEnquiry.id}
                </span>
                <h3 className="font-heading text-lg font-bold text-[#24202D]">
                  Enquiry Dossier
                </h3>
              </div>
              <button
                onClick={() => setActiveEnquiry(null)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Client Card */}
            <div className="space-y-2 text-xs sm:text-sm bg-[#FAFAFF] p-4 rounded-2xl border border-gray-100">
              <div className="flex items-center gap-2 text-[#24202D] font-bold">
                <User className="h-4 w-4 text-[#7C3AED]" />
                <span>{activeEnquiry.fullName}</span>
              </div>
              <div className="flex items-center gap-2 text-[#706B7D]">
                <Mail className="h-4 w-4" />
                <a href={`mailto:${activeEnquiry.email}`} className="hover:underline text-[#7C3AED]">
                  {activeEnquiry.email}
                </a>
              </div>
              {activeEnquiry.company && (
                <div className="flex items-center gap-2 text-[#706B7D]">
                  <Building className="h-4 w-4" />
                  <span>{activeEnquiry.company}</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-[#706B7D]">
                <Globe className="h-4 w-4" />
                <span>{activeEnquiry.country}</span>
              </div>
            </div>

            {/* Project Specs */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#706B7D] mb-1">
                Project Title & Scope
              </h4>
              <div className="font-semibold text-[#24202D] text-sm">
                {activeEnquiry.projectTitle}
              </div>
              <div className="mt-2 text-xs sm:text-sm text-[#706B7D] whitespace-pre-wrap bg-gray-50 p-3 rounded-xl border border-gray-100 leading-relaxed">
                {activeEnquiry.description}
              </div>
              <div className="mt-3 flex flex-wrap gap-4 text-xs font-medium text-[#706B7D]">
                <span>Budget: <strong className="text-[#30224D]">{activeEnquiry.budgetRange}</strong></span>
                <span>Deadline: <strong className="text-[#30224D]">{activeEnquiry.expectedDeadline || "Flexible"}</strong></span>
              </div>
              {activeEnquiry.referenceUrl && (
                <div className="mt-2 text-xs">
                  <a
                    href={activeEnquiry.referenceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#7C3AED] hover:underline inline-flex items-center gap-1"
                  >
                    <span>Reference Link</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              )}
            </div>

            {/* Management Controls */}
            <div className="space-y-4 pt-4 border-t border-gray-100">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#24202D] mb-1.5">
                  Update Pipeline Status
                </label>
                <select
                  value={statusVal}
                  onChange={(e) => setStatusVal(e.target.value as Enquiry["status"])}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-[#FAFAFF] text-xs sm:text-sm font-semibold text-[#30224D] focus:border-[#7C3AED] focus:outline-none"
                >
                  {STATUS_LIST.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#24202D] mb-1.5">
                  Follow-Up Reminder Date
                </label>
                <input
                  type="date"
                  value={followUpVal}
                  onChange={(e) => setFollowUpVal(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-200 bg-[#FAFAFF] text-xs sm:text-sm text-[#24202D] focus:border-[#7C3AED] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#24202D] mb-1.5">
                  Internal Notes (Confidential)
                </label>
                <textarea
                  rows={3}
                  placeholder="Record client discussions, quote details, or action items..."
                  value={notesVal}
                  onChange={(e) => setNotesVal(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-[#FAFAFF] text-xs sm:text-sm text-[#24202D] focus:border-[#7C3AED] focus:outline-none leading-relaxed"
                />
                <span className="text-[10px] text-gray-400">
                  Notes are strictly private to AIVSTACK administration.
                </span>
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={handleUpdate}
                  disabled={saving}
                  className="inline-flex items-center gap-2 rounded-full bg-[#30224D] px-6 py-2.5 text-xs font-bold text-white hover:bg-[#201535] transition-all disabled:opacity-50"
                >
                  <Save className="h-3.5 w-3.5 text-[#A78BFA]" />
                  <span>{saving ? "Saving Changes..." : "Save Dossier"}</span>
                </button>

                {saveSuccess && (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600">
                    <CheckCircle className="h-4 w-4" />
                    <span>Saved!</span>
                  </span>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function AdminEnquiriesPage() {
  return (
    <Suspense fallback={<div className="py-12 text-center">Loading Enquiries Pipeline...</div>}>
      <EnquiriesView />
    </Suspense>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { INITIAL_PROJECTS, Project, ProjectCategory, ProjectStatus } from "@/data/projects";
import { ArrowUpRight, CheckCircle2, Clock, Lightbulb } from "lucide-react";

const CATEGORIES: ("All" | ProjectCategory)[] = [
  "All",
  "Web Development",
  "Mobile Applications",
  "Software & ERP",
  "AI & Automation",
  "Creative Design",
  "Video Production",
];

export function PortfolioGallery({ initialProjects = INITIAL_PROJECTS }: { initialProjects?: Project[] }) {
  const [selectedCategory, setSelectedCategory] = useState<"All" | ProjectCategory>("All");
  const [selectedStatus, setSelectedStatus] = useState<"All" | ProjectStatus>("All");

  const filtered = initialProjects.filter((p) => {
    const matchesCat = selectedCategory === "All" || p.category === selectedCategory;
    const matchesStatus = selectedStatus === "All" || p.projectStatus === selectedStatus;
    return matchesCat && matchesStatus;
  });

  const getStatusBadge = (status: ProjectStatus) => {
    switch (status) {
      case "Completed":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200">
            <CheckCircle2 className="h-3 w-3" />
            Completed
          </span>
        );
      case "In Development":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-200">
            <Clock className="h-3 w-3" />
            In Development
          </span>
        );
      case "Concept / Prototype":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-semibold border border-purple-200">
            <Lightbulb className="h-3 w-3" />
            Concept / Prototype
          </span>
        );
    }
  };

  return (
    <div>
      {/* Category Tabs */}
      <div className="flex flex-wrap items-center gap-2 pb-6 border-b border-gray-200 mb-8">
        <span className="text-xs font-bold uppercase tracking-wider text-[#706B7D] mr-2">
          Category:
        </span>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ${
              selectedCategory === cat
                ? "bg-[#30224D] text-white shadow-sm"
                : "bg-white text-[#706B7D] border border-gray-200 hover:border-[#A78BFA] hover:text-[#30224D]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Status Filter Sub-bar */}
      <div className="flex items-center gap-3 mb-10 text-xs font-medium text-[#706B7D]">
        <span>Filter Status:</span>
        {(["All", "Completed", "In Development", "Concept / Prototype"] as const).map((st) => (
          <button
            key={st}
            onClick={() => setSelectedStatus(st)}
            className={`px-3 py-1 rounded-md transition-colors ${
              selectedStatus === st
                ? "bg-[#F2EEFF] text-[#30224D] font-bold"
                : "hover:text-[#30224D]"
            }`}
          >
            {st}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((project) => (
          <div
            key={project.id}
            className="group rounded-3xl border border-[#A78BFA]/20 bg-white overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 hover:border-[#A78BFA] flex flex-col justify-between"
          >
            <div className="p-7">
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#7C3AED] bg-[#F2EEFF] px-2.5 py-1 rounded-md">
                  {project.category}
                </span>
                {getStatusBadge(project.projectStatus)}
              </div>

              <h3 className="font-heading text-xl font-bold text-[#24202D] group-hover:text-[#6D28D9] transition-colors">
                {project.title}
              </h3>

              <p className="mt-3 text-sm text-[#706B7D] leading-relaxed line-clamp-3">
                {project.shortDescription}
              </p>

              {/* Tech chips */}
              <div className="mt-4 flex flex-wrap gap-1.5">
                {project.technologyStack.map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center px-2 py-0.5 rounded-md bg-[#FAFAFF] border border-gray-200 text-[#30224D] text-[11px] font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="px-7 py-4 bg-[#F2EEFF]/40 border-t border-[#A78BFA]/15 flex items-center justify-between">
              <span className="text-xs font-medium text-[#706B7D]">
                {project.clientName || "Commercial Release"}
              </span>
              <Link
                href={`/portfolio/${project.slug}`}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#30224D] hover:text-[#7C3AED] transition-colors"
              >
                <span>Case Study</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 bg-white rounded-3xl border border-gray-100">
          <p className="text-sm text-[#706B7D]">
            No projects found matching the selected filters.
          </p>
          <button
            onClick={() => {
              setSelectedCategory("All");
              setSelectedStatus("All");
            }}
            className="mt-4 inline-flex text-xs font-semibold text-[#7C3AED] hover:underline"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}

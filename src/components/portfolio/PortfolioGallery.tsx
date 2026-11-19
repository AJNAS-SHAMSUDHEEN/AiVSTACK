"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { INITIAL_PROJECTS, Project, ProjectCategory, ProjectStatus } from "@/data/projects";
import { ArrowUpRight, CheckCircle2, Clock, Lightbulb, Sparkles, Filter, Terminal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const CATEGORIES: ("All" | ProjectCategory)[] = [
  "All",
  "Mobile Applications",
  "Web Development",
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
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-[#00A859] text-[11px] font-bold border border-emerald-200">
            <CheckCircle2 className="h-3 w-3" />
            Verified Delivery
          </span>
        );
      case "In Development":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-[11px] font-bold border border-blue-200">
            <Clock className="h-3 w-3" />
            Active Sprint
          </span>
        );
      case "Concept / Prototype":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-[11px] font-bold border border-purple-200">
            <Lightbulb className="h-3 w-3" />
            R&D Prototype
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-[11px] font-bold border border-gray-200">
            {status}
          </span>
        );
    }
  };

  return (
    <div>
      {/* Category Pills & Status Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-8 border-b border-gray-100 mb-10">
        <div className="flex flex-wrap items-center gap-2">
          {CATEGORIES.map((cat) => {
            const count =
              cat === "All"
                ? initialProjects.length
                : initialProjects.filter((p) => p.category === cat).length;

            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all duration-300 flex items-center gap-1.5 ${
                  selectedCategory === cat
                    ? "bg-[#00A859] text-white shadow-md shadow-emerald-500/20"
                    : "bg-gray-100/80 text-gray-600 hover:bg-gray-200/70 hover:text-gray-900"
                }`}
              >
                <span>{cat}</span>
                <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                  selectedCategory === cat ? "bg-white/20 text-white" : "bg-gray-200 text-gray-500"
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-gray-500">
          <Filter className="h-3.5 w-3.5 text-gray-400" />
          <span>Status:</span>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value as any)}
            className="rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-xs font-bold text-gray-800 outline-none focus:border-[#00A859]"
          >
            <option value="All">All Statuses</option>
            <option value="Completed">Verified Deliveries</option>
            <option value="In Development">Active Sprints</option>
            <option value="Concept / Prototype">R&D Prototypes</option>
          </select>
        </div>
      </div>

      {/* Grid of Work */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence>
          {filtered.map((project, idx) => {
            const previewImg =
              project.thumbnailUrl ||
              project.galleryImages?.[0] ||
              "/brand/hero_3d_orb.jpg";

            return (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="group rounded-3xl bg-white border border-gray-200 overflow-hidden hover:border-[#00A859] hover:shadow-2xl hover:shadow-emerald-950/10 transition-all duration-500 flex flex-col justify-between"
              >
                {/* Visual Preview Frame */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-900">
                  <Image
                    src={previewImg}
                    alt={project.title}
                    fill
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                  {/* Top Floating Badge */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    {getStatusBadge(project.projectStatus)}
                    <span className="font-mono text-xs font-bold text-white/80 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
                      {project.completionDate || "2026"}
                    </span>
                  </div>

                  {/* Client & Category Overlay */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-[11px] font-mono tracking-wider text-emerald-400 uppercase font-bold">
                      {project.category}
                    </span>
                    <h3 className="font-heading text-lg sm:text-xl font-bold text-white mt-0.5 group-hover:text-emerald-300 transition-colors">
                      {project.title}
                    </h3>
                  </div>
                </div>

                {/* Card Body & Engineering Narrative */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-6">
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {project.shortDescription}
                  </p>

                  <div className="space-y-4 pt-4 border-t border-gray-100">
                    {/* Tech Pills */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologyStack.slice(0, 4).map((tech: string) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-md bg-gray-100 text-gray-700 font-mono text-[11px] font-semibold"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologyStack.length > 4 && (
                        <span className="px-2 py-1 rounded-md bg-gray-100 text-gray-400 font-mono text-[10px]">
                          +{project.technologyStack.length - 4}
                        </span>
                      )}
                    </div>

                    {/* Action link */}
                    <Link
                      href={`/portfolio/${project.slug}`}
                      className="inline-flex items-center justify-between w-full pt-2 text-xs font-bold uppercase tracking-wider text-gray-900 group-hover:text-[#00A859] transition-colors"
                    >
                      <span>Explore Case Study</span>
                      <div className="h-8 w-8 rounded-full bg-gray-100 group-hover:bg-[#00A859] group-hover:text-white flex items-center justify-center transition-all duration-300">
                        <ArrowUpRight className="h-4 w-4" />
                      </div>
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
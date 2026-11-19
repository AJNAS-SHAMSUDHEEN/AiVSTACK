"use client";

import { useEffect, useState } from "react";
import { Project, ProjectCategory, ProjectStatus } from "@/data/projects";
import {
  FolderGit2,
  Plus,
  Edit2,
  CheckCircle2,
  Clock,
  Lightbulb,
  Sparkles,
  Save,
  X,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";

const CATEGORIES: ProjectCategory[] = [
  "Web Development",
  "Mobile Applications",
  "Software & ERP",
  "AI & Automation",
  "Creative Design",
  "Video Production",
];

const STATUSES: ProjectStatus[] = ["Completed", "In Development", "Concept / Prototype"];

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/admin/projects");
      const data = await res.json();
      if (data.projects) setProjects(data.projects);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const openNewProject = () => {
    setIsNew(true);
    setEditingProject({
      id: "",
      slug: "",
      title: "",
      category: "Web Development",
      projectStatus: "Completed",
      shortDescription: "",
      overview: "",
      problem: "",
      solution: "",
      features: ["Responsive UI architecture", "Custom backend API integration"],
      technologyStack: ["Next.js", "TypeScript", "Tailwind CSS"],
      thumbnailUrl: "/brand/design_reference.jpg",
      galleryImages: ["/brand/design_reference.jpg"],
      clientName: "",
      completionDate: "2026",
      isFeatured: false,
    });
    setMsg("");
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;
    setSaving(true);
    setMsg("");

    try {
      if (isNew) {
        const res = await fetch("/api/admin/projects", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editingProject),
        });
        const data = await res.json();
        if (data.success && data.project) {
          setProjects([data.project, ...projects]);
          setEditingProject(null);
          setMsg("Project created successfully!");
        }
      } else {
        const res = await fetch("/api/admin/projects", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingProject.id, updates: editingProject }),
        });
        const data = await res.json();
        if (data.success && data.project) {
          setProjects(projects.map((p) => (p.id === data.project.id ? data.project : p)));
          setEditingProject(null);
          setMsg("Project updated successfully!");
        }
      }
    } catch (err) {
      console.error(err);
      setMsg("Failed to save project.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-[#24202D]">
            Projects & Portfolio Management
          </h1>
          <p className="text-sm text-[#706B7D] mt-1">
            Publish completed case studies, configure developmental statuses, and toggle featured work.
          </p>
        </div>

        <button
          onClick={openNewProject}
          className="inline-flex items-center gap-2 rounded-full bg-[#30224D] px-5 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-[#201535]"
        >
          <Plus className="h-4 w-4 text-[#A78BFA]" />
          <span>New Project Case Study</span>
        </button>
      </div>

      {msg && (
        <div className="p-3.5 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200">
          {msg}
        </div>
      )}

      {/* Editor Modal / Panel */}
      {editingProject && (
        <div className="rounded-3xl border border-[#A78BFA]/30 bg-white p-6 sm:p-8 shadow-xl">
          <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
            <h2 className="font-heading text-xl font-bold text-[#30224D]">
              {isNew ? "Create New Project" : `Edit Project: ${editingProject.title}`}
            </h2>
            <button
              onClick={() => setEditingProject(null)}
              className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#24202D] mb-2">
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  value={editingProject.title}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      title: e.target.value,
                      slug: isNew
                        ? e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-")
                        : editingProject.slug,
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-[#FAFAFF] text-sm text-[#24202D] focus:border-[#7C3AED] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#24202D] mb-2">
                  URL Slug *
                </label>
                <input
                  type="text"
                  required
                  value={editingProject.slug}
                  onChange={(e) => setEditingProject({ ...editingProject, slug: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-[#FAFAFF] text-sm text-[#24202D] focus:border-[#7C3AED] focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#24202D] mb-2">
                  Category *
                </label>
                <select
                  value={editingProject.category}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      category: e.target.value as ProjectCategory,
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-[#FAFAFF] text-sm text-[#24202D] focus:border-[#7C3AED] focus:outline-none"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#24202D] mb-2">
                  Project Status *
                </label>
                <select
                  value={editingProject.projectStatus}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      projectStatus: e.target.value as ProjectStatus,
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-[#FAFAFF] text-sm text-[#24202D] focus:border-[#7C3AED] focus:outline-none"
                >
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#24202D] mb-2">
                  Featured on Homepage?
                </label>
                <div className="pt-2">
                  <label className="inline-flex items-center gap-2 cursor-pointer text-sm font-semibold text-[#30224D]">
                    <input
                      type="checkbox"
                      checked={editingProject.isFeatured}
                      onChange={(e) =>
                        setEditingProject({ ...editingProject, isFeatured: e.target.checked })
                      }
                      className="h-4 w-4 rounded text-[#7C3AED] focus:ring-[#7C3AED]"
                    />
                    <span>Show in Featured Work Section</span>
                  </label>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#24202D] mb-2">
                Short Description (Listing Card) *
              </label>
              <textarea
                rows={2}
                required
                value={editingProject.shortDescription}
                onChange={(e) =>
                  setEditingProject({ ...editingProject, shortDescription: e.target.value })
                }
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-[#FAFAFF] text-sm text-[#24202D] focus:border-[#7C3AED] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#24202D] mb-2">
                Detailed Overview *
              </label>
              <textarea
                rows={3}
                required
                value={editingProject.overview}
                onChange={(e) =>
                  setEditingProject({ ...editingProject, overview: e.target.value })
                }
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-[#FAFAFF] text-sm text-[#24202D] focus:border-[#7C3AED] focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#24202D] mb-2">
                  Client Problem / Requirement
                </label>
                <textarea
                  rows={2}
                  value={editingProject.problem}
                  onChange={(e) =>
                    setEditingProject({ ...editingProject, problem: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-[#FAFAFF] text-sm text-[#24202D] focus:border-[#7C3AED] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#24202D] mb-2">
                  Engineered Solution
                </label>
                <textarea
                  rows={2}
                  value={editingProject.solution}
                  onChange={(e) =>
                    setEditingProject({ ...editingProject, solution: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-[#FAFAFF] text-sm text-[#24202D] focus:border-[#7C3AED] focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#24202D] mb-2">
                  Technology Stack (Comma separated)
                </label>
                <input
                  type="text"
                  value={editingProject.technologyStack.join(", ")}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      technologyStack: e.target.value
                        .split(",")
                        .map((s) => s.trim())
                        .filter(Boolean),
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-[#FAFAFF] text-sm text-[#24202D] focus:border-[#7C3AED] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#24202D] mb-2">
                  Client Name / Organization
                </label>
                <input
                  type="text"
                  value={editingProject.clientName || ""}
                  onChange={(e) =>
                    setEditingProject({ ...editingProject, clientName: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-[#FAFAFF] text-sm text-[#24202D] focus:border-[#7C3AED] focus:outline-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setEditingProject(null)}
                className="px-5 py-2.5 rounded-full border border-gray-200 text-xs font-semibold text-[#706B7D] hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#30224D] text-xs font-bold text-white hover:bg-[#201535] disabled:opacity-50"
              >
                <Save className="h-3.5 w-3.5 text-[#A78BFA]" />
                <span>{saving ? "Saving..." : "Save Project"}</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Projects Table */}
      <div className="rounded-3xl border border-[#A78BFA]/20 bg-white overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="border-b border-gray-100 bg-[#FAFAFF] text-xs font-bold uppercase tracking-wider text-[#706B7D]">
              <tr>
                <th className="py-3.5 px-4">Title</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Featured</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-[#706B7D]">
                    Loading portfolio entries...
                  </td>
                </tr>
              ) : projects.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-[#706B7D]">
                    No portfolio entries created yet.
                  </td>
                </tr>
              ) : (
                projects.map((project) => (
                  <tr key={project.id} className="hover:bg-[#FAFAFF] transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-[#24202D]">{project.title}</div>
                      <div className="text-[11px] text-[#706B7D]">/portfolio/{project.slug}</div>
                    </td>
                    <td className="py-3.5 px-4 text-[#24202D]">{project.category}</td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                          project.projectStatus === "Completed"
                            ? "bg-emerald-100 text-emerald-800"
                            : project.projectStatus === "In Development"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-purple-100 text-purple-800"
                        }`}
                      >
                        {project.projectStatus}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      {project.isFeatured ? (
                        <span className="text-xs font-semibold text-[#7C3AED]">★ Featured</span>
                      ) : (
                        <span className="text-xs text-gray-400">Standard</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-3">
                      <Link
                        href={`/portfolio/${project.slug}`}
                        target="_blank"
                        className="text-xs text-[#706B7D] hover:underline"
                      >
                        View Live
                      </Link>
                      <button
                        onClick={() => {
                          setIsNew(false);
                          setEditingProject(project);
                        }}
                        className="text-xs font-bold text-[#7C3AED] hover:underline"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

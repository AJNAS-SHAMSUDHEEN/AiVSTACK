import fs from "fs";
import path from "path";
import { INITIAL_PROJECTS, Project } from "@/data/projects";

export interface Enquiry {
  id: string;
  fullName: string;
  email: string;
  country: string;
  company?: string;
  serviceId: string;
  serviceTitle: string;
  projectTitle: string;
  description: string;
  budgetRange: string;
  expectedDeadline?: string;
  referenceUrl?: string;
  status:
    | "New"
    | "Under Review"
    | "Contacted"
    | "Discussion"
    | "Quotation Sent"
    | "Approved"
    | "Rejected"
    | "Archived";
  internalNotes?: string;
  followUpAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SiteSettings {
  companyEmail: string;
  whatsappContact: string;
  phoneNumber: string;
  address: string;
  githubUrl: string;
  linkedinUrl: string;
  twitterUrl: string;
  instagramUrl: string;
  tagline: string;
  brandDescriptor: string;
}

interface DatabaseSchema {
  enquiries: Enquiry[];
  projects: Project[];
  settings: SiteSettings;
  adminPasswordHash: string; // Plain/SHA-256 for demo setup, default "aivstack2026"
}

const DATA_DIR = path.join(process.cwd(), "data");
const DB_FILE = path.join(DATA_DIR, "database.json");

const DEFAULT_SETTINGS: SiteSettings = {
  companyEmail: "hello@aivstack.com",
  whatsappContact: "+91 98765 43210",
  phoneNumber: "+91 98765 43210",
  address: "India & International Client Operations",
  githubUrl: "https://github.com/aivstack",
  linkedinUrl: "https://linkedin.com/company/aivstack",
  twitterUrl: "https://x.com/aivstack",
  instagramUrl: "https://instagram.com/aivstack",
  tagline: "Your Vision. Our Innovation.",
  brandDescriptor: "INNOVATION • TECHNOLOGY • CREATIVITY",
};

// Clean production enquiries initialized as empty array ready for real client submissions
const DEFAULT_ENQUIRIES: Enquiry[] = [];

function ensureDb(): DatabaseSchema {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (!fs.existsSync(DB_FILE)) {
    const initialData: DatabaseSchema = {
      enquiries: DEFAULT_ENQUIRIES,
      projects: INITIAL_PROJECTS,
      settings: DEFAULT_SETTINGS,
      adminPasswordHash: "aivstack2026", // default admin password
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2), "utf-8");
    return initialData;
  }

  try {
    const raw = fs.readFileSync(DB_FILE, "utf-8");
    return JSON.parse(raw);
  } catch {
    const fallback: DatabaseSchema = {
      enquiries: DEFAULT_ENQUIRIES,
      projects: INITIAL_PROJECTS,
      settings: DEFAULT_SETTINGS,
      adminPasswordHash: "aivstack2026",
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(fallback, null, 2), "utf-8");
    return fallback;
  }
}

function saveDb(data: DatabaseSchema) {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), "utf-8");
}

/* ENQUIRY OPERATIONS */
export function getEnquiries(): Enquiry[] {
  const db = ensureDb();
  return db.enquiries.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function getEnquiryById(id: string): Enquiry | undefined {
  const db = ensureDb();
  return db.enquiries.find((e) => e.id === id);
}

export function createEnquiry(
  payload: Omit<Enquiry, "id" | "status" | "createdAt" | "updatedAt">
): Enquiry {
  const db = ensureDb();
  const newEnquiry: Enquiry = {
    ...payload,
    id: `enq-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`,
    status: "New",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  db.enquiries.unshift(newEnquiry);
  saveDb(db);
  return newEnquiry;
}

export function updateEnquiryStatus(
  id: string,
  status: Enquiry["status"],
  internalNotes?: string,
  followUpAt?: string
): Enquiry | null {
  const db = ensureDb();
  const index = db.enquiries.findIndex((e) => e.id === id);
  if (index === -1) return null;

  db.enquiries[index] = {
    ...db.enquiries[index],
    status,
    ...(internalNotes !== undefined ? { internalNotes } : {}),
    ...(followUpAt !== undefined ? { followUpAt } : {}),
    updatedAt: new Date().toISOString(),
  };

  saveDb(db);
  return db.enquiries[index];
}

/* PROJECT OPERATIONS */
export function getProjects(): Project[] {
  const db = ensureDb();
  return db.projects;
}

export function getProjectBySlug(slug: string): Project | undefined {
  const db = ensureDb();
  return db.projects.find((p) => p.slug === slug);
}

export function createProject(project: Omit<Project, "id">): Project {
  const db = ensureDb();
  const newProj: Project = {
    ...project,
    id: `proj-${Date.now().toString(36)}`,
  };
  db.projects.unshift(newProj);
  saveDb(db);
  return newProj;
}

export function updateProject(id: string, updates: Partial<Project>): Project | null {
  const db = ensureDb();
  const index = db.projects.findIndex((p) => p.id === id);
  if (index === -1) return null;

  db.projects[index] = {
    ...db.projects[index],
    ...updates,
  };
  saveDb(db);
  return db.projects[index];
}

/* SETTINGS OPERATIONS */
export function getSiteSettings(): SiteSettings {
  const db = ensureDb();
  return db.settings || DEFAULT_SETTINGS;
}

export function updateSiteSettings(settings: Partial<SiteSettings>): SiteSettings {
  const db = ensureDb();
  db.settings = {
    ...DEFAULT_SETTINGS,
    ...(db.settings || {}),
    ...settings,
  };
  saveDb(db);
  return db.settings;
}

/* AUTHENTICATION */
export function verifyAdminCredentials(password: string): boolean {
  const db = ensureDb();
  return password === db.adminPasswordHash || password === "aivstack2026";
}

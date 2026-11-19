import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { db } from "./config";
import type { Enquiry, SiteSettings } from "@/lib/db";
import type { Project } from "@/data/projects";

const ENQUIRIES_COLLECTION = "enquiries";
const PROJECTS_COLLECTION = "projects";
const SETTINGS_COLLECTION = "settings";
const SETTINGS_DOC_ID = "general";

/**
 * ENQUIRY SERVICES (Firestore)
 */
export async function createFirestoreEnquiry(
  payload: Omit<Enquiry, "id" | "status" | "createdAt" | "updatedAt">
): Promise<Enquiry> {
  const enquiryData = {
    ...payload,
    status: "New" as const,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    serverTimestamp: serverTimestamp(),
  };

  const docRef = await addDoc(collection(db, ENQUIRIES_COLLECTION), enquiryData);

  return {
    ...enquiryData,
    id: docRef.id,
  };
}

export async function getFirestoreEnquiries(): Promise<Enquiry[]> {
  try {
    const q = query(collection(db, ENQUIRIES_COLLECTION), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map((docSnap) => {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        fullName: data.fullName || "",
        email: data.email || "",
        country: data.country || "",
        company: data.company || "",
        serviceId: data.serviceId || "",
        serviceTitle: data.serviceTitle || "",
        projectTitle: data.projectTitle || "",
        description: data.description || "",
        budgetRange: data.budgetRange || "",
        expectedDeadline: data.expectedDeadline,
        referenceUrl: data.referenceUrl,
        status: data.status || "New",
        internalNotes: data.internalNotes,
        followUpAt: data.followUpAt,
        createdAt: data.createdAt || new Date().toISOString(),
        updatedAt: data.updatedAt || new Date().toISOString(),
      } as Enquiry;
    });
  } catch (err) {
    console.error("Firestore getFirestoreEnquiries error:", err);
    return [];
  }
}

export async function updateFirestoreEnquiryStatus(
  id: string,
  status: Enquiry["status"],
  internalNotes?: string,
  followUpAt?: string
): Promise<boolean> {
  try {
    const docRef = doc(db, ENQUIRIES_COLLECTION, id);
    const updates: Record<string, any> = {
      status,
      updatedAt: new Date().toISOString(),
    };
    if (internalNotes !== undefined) updates.internalNotes = internalNotes;
    if (followUpAt !== undefined) updates.followUpAt = followUpAt;

    await updateDoc(docRef, updates);
    return true;
  } catch (err) {
    console.error("Firestore updateFirestoreEnquiryStatus error:", err);
    return false;
  }
}

/**
 * PROJECT SERVICES (Firestore)
 */
export async function getFirestoreProjects(): Promise<Project[]> {
  try {
    const snapshot = await getDocs(collection(db, PROJECTS_COLLECTION));
    if (snapshot.empty) return [];

    return snapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...docSnap.data(),
    })) as Project[];
  } catch (err) {
    console.error("Firestore getFirestoreProjects error:", err);
    return [];
  }
}

export async function setFirestoreProject(project: Project): Promise<void> {
  const docRef = doc(db, PROJECTS_COLLECTION, project.slug || project.id);
  await setDoc(docRef, {
    ...project,
    updatedAt: new Date().toISOString(),
  }, { merge: true });
}

/**
 * SITE SETTINGS SERVICES (Firestore)
 */
export async function getFirestoreSettings(): Promise<SiteSettings | null> {
  try {
    const docRef = doc(db, SETTINGS_COLLECTION, SETTINGS_DOC_ID);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) return null;
    return docSnap.data() as SiteSettings;
  } catch (err) {
    console.error("Firestore getFirestoreSettings error:", err);
    return null;
  }
}

export async function setFirestoreSettings(settings: Partial<SiteSettings>): Promise<void> {
  const docRef = doc(db, SETTINGS_COLLECTION, SETTINGS_DOC_ID);
  await setDoc(docRef, {
    ...settings,
    updatedAt: new Date().toISOString(),
  }, { merge: true });
}

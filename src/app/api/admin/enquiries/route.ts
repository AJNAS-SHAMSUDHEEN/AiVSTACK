import { NextRequest, NextResponse } from "next/server";
import { getEnquiries, updateEnquiryStatus } from "@/lib/db";
import { getFirestoreEnquiries, updateFirestoreEnquiryStatus } from "@/lib/firebase/db";

const ADMIN_COOKIE_NAME = "aivstack_admin_session";
const SESSION_SECRET = "aivstack_super_secure_admin_session_token_2026";

function isAuthed(req: NextRequest): boolean {
  const session = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
  return session === SESSION_SECRET;
}

export async function GET(req: NextRequest) {
  if (!isAuthed(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Attempt to load live Firestore enquiries first
    const firestoreEnquiries = await getFirestoreEnquiries();
    if (firestoreEnquiries.length > 0) {
      return NextResponse.json({ enquiries: firestoreEnquiries, source: "firestore" });
    }
  } catch (err) {
    console.warn("Firestore fetch warning, falling back to local db:", err);
  }

  const enquiries = getEnquiries();
  return NextResponse.json({ enquiries, source: "local" });
}

export async function PATCH(req: NextRequest) {
  if (!isAuthed(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id, status, internalNotes, followUpAt } = await req.json();

    if (!id || !status) {
      return NextResponse.json({ error: "id and status are required" }, { status: 400 });
    }

    // Update in local DB
    const updated = updateEnquiryStatus(id, status, internalNotes, followUpAt);

    // Sync to Firestore
    try {
      await updateFirestoreEnquiryStatus(id, status, internalNotes, followUpAt);
    } catch (fbErr) {
      console.warn("Firestore status sync notice:", fbErr);
    }

    if (!updated) {
      return NextResponse.json({ error: "Enquiry not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, enquiry: updated });
  } catch (err) {
    return NextResponse.json({ error: "Failed to update enquiry" }, { status: 500 });
  }
}

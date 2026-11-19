import { NextRequest, NextResponse } from "next/server";
import { createEnquiry, getEnquiries } from "@/lib/db";
import { createFirestoreEnquiry } from "@/lib/firebase/db";
import { SERVICES } from "@/data/services";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      fullName,
      email,
      country,
      company,
      serviceId,
      projectTitle,
      description,
      budgetRange,
      expectedDeadline,
      referenceUrl,
    } = body;

    // Strict validation
    if (!fullName || !email || !country || !description) {
      return NextResponse.json(
        { error: "Missing required fields (fullName, email, country, description)" },
        { status: 400 }
      );
    }

    // Resolve human-readable service title
    const matchedService = SERVICES.find((s) => s.slug === serviceId);
    const serviceTitle = matchedService ? matchedService.title : serviceId || "Custom Solution";

    const payload = {
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      country: country.trim(),
      company: company?.trim() || "",
      serviceId: serviceId || "web-development",
      serviceTitle,
      projectTitle: projectTitle?.trim() || "Project Inquiry",
      description: description.trim(),
      budgetRange: budgetRange || "Flexible",
      expectedDeadline: expectedDeadline || "Not specified",
      referenceUrl: referenceUrl?.trim() || "",
    };

    // 1. Always record in local store for redundancy
    const localEnquiry = createEnquiry(payload);

    // 2. Sync to Firebase Firestore asynchronously
    let firestoreId = localEnquiry.id;
    try {
      const firestoreEnquiry = await createFirestoreEnquiry(payload);
      firestoreId = firestoreEnquiry.id;
    } catch (fbError) {
      console.warn("Firebase sync notice (saved to local backup):", fbError);
    }

    return NextResponse.json(
      {
        success: true,
        message: "Enquiry recorded successfully",
        enquiryId: firestoreId,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Enquiry API Error:", error);
    return NextResponse.json(
      { error: "Internal server error processing enquiry" },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Public GET should not leak sensitive enquiry data
  return NextResponse.json(
    { message: "Enquiries endpoint is write-only for public clients." },
    { status: 405 }
  );
}

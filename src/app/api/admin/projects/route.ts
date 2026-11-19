import { NextRequest, NextResponse } from "next/server";
import { getProjects, createProject, updateProject } from "@/lib/db";

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

  const projects = getProjects();
  return NextResponse.json({ projects });
}

export async function POST(req: NextRequest) {
  if (!isAuthed(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const newProj = createProject({
      ...body,
      slug: body.slug || body.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      features: body.features || [],
      technologyStack: body.technologyStack || [],
      thumbnailUrl: body.thumbnailUrl || "/brand/design_reference.jpg",
      galleryImages: body.galleryImages || ["/brand/design_reference.jpg"],
      isFeatured: !!body.isFeatured,
    });

    return NextResponse.json({ success: true, project: newProj }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  if (!isAuthed(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id, updates } = await req.json();
    if (!id || !updates) {
      return NextResponse.json({ error: "Missing id or updates" }, { status: 400 });
    }

    const updated = updateProject(id, updates);
    if (!updated) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, project: updated });
  } catch (err) {
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
  }
}

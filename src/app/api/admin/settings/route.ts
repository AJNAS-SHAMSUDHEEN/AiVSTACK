import { NextRequest, NextResponse } from "next/server";
import { getSiteSettings, updateSiteSettings } from "@/lib/db";

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

  const settings = getSiteSettings();
  return NextResponse.json({ settings });
}

export async function POST(req: NextRequest) {
  if (!isAuthed(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const updated = updateSiteSettings(body);
    return NextResponse.json({ success: true, settings: updated });
  } catch (err) {
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
  }
}

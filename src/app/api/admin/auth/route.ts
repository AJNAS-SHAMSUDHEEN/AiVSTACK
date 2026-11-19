import { NextRequest, NextResponse } from "next/server";
import { verifyAdminCredentials } from "@/lib/db";

const ADMIN_COOKIE_NAME = "aivstack_admin_session";
const SESSION_SECRET = "aivstack_super_secure_admin_session_token_2026";

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();

    if (!password) {
      return NextResponse.json({ error: "Password is required" }, { status: 400 });
    }

    const isValid = verifyAdminCredentials(password);
    if (!isValid) {
      return NextResponse.json({ error: "Invalid administrator credentials" }, { status: 401 });
    }

    const res = NextResponse.json({ success: true, message: "Authenticated successfully" });
    // Set secure cookie
    res.cookies.set({
      name: ADMIN_COOKIE_NAME,
      value: SESSION_SECRET,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return res;
  } catch (err) {
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 });
  }
}

export async function DELETE() {
  const res = NextResponse.json({ success: true, message: "Logged out" });
  res.cookies.set({
    name: ADMIN_COOKIE_NAME,
    value: "",
    httpOnly: true,
    expires: new Date(0),
    path: "/",
  });
  return res;
}

export async function GET(req: NextRequest) {
  const session = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
  const isAuthenticated = session === SESSION_SECRET;
  return NextResponse.json({ authenticated: isAuthenticated });
}

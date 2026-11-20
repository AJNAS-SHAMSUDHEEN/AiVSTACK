import { NextRequest, NextResponse } from "next/server";
import { verifyAdminCredentials } from "@/lib/db";

const ADMIN_COOKIE_NAME = "aivstack_admin_session";
const ADMIN_EMAIL_COOKIE_NAME = "aivstack_admin_email";
const SESSION_SECRET = "aivstack_super_secure_admin_session_token_2026";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { password, idToken, email, uid } = body;

    let userEmail = "admin@aivstack.com";

    // 1. Firebase Authentication flow
    if (idToken || (email && uid)) {
      userEmail = email || "firebase-admin@aivstack.com";
    }
    // 2. Master Key / Fallback password flow
    else if (password) {
      const isValid = verifyAdminCredentials(password);
      if (!isValid) {
        return NextResponse.json({ error: "Invalid administrator credentials" }, { status: 401 });
      }
      userEmail = "master-key@aivstack.com";
    } else {
      return NextResponse.json(
        { error: "Authentication credentials required" },
        { status: 400 }
      );
    }

    const res = NextResponse.json({
      success: true,
      message: "Authenticated successfully",
      user: { email: userEmail, uid: uid || "admin" },
    });

    // Set secure authentication cookie
    res.cookies.set({
      name: ADMIN_COOKIE_NAME,
      value: SESSION_SECRET,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    // Set user email cookie for display in UI
    res.cookies.set({
      name: ADMIN_EMAIL_COOKIE_NAME,
      value: userEmail,
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
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
  res.cookies.set({
    name: ADMIN_EMAIL_COOKIE_NAME,
    value: "",
    httpOnly: false,
    expires: new Date(0),
    path: "/",
  });
  return res;
}

export async function GET(req: NextRequest) {
  const session = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
  const email = req.cookies.get(ADMIN_EMAIL_COOKIE_NAME)?.value || "admin@aivstack.com";
  const isAuthenticated = session === SESSION_SECRET;
  return NextResponse.json({
    authenticated: isAuthenticated,
    email: isAuthenticated ? email : null,
  });
}

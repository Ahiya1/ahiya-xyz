/**
 * Admin Logout API Route
 *
 * Clears the authentication session cookie.
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getAuthCookie, verifyAdminToken, clearAuthCookie } from "@/lib/auth";

export async function POST(request: NextRequest) {
  // Verify authentication
  const token = getAuthCookie(request);

  if (!token) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { valid } = await verifyAdminToken(token);

  if (!valid) {
    return NextResponse.json({ error: "Invalid session" }, { status: 401 });
  }

  // Clear the auth cookie and return success
  const response = NextResponse.json({ success: true });
  clearAuthCookie(response);

  return response;
}

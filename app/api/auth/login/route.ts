/**
 * Admin Login API Route
 *
 * Handles admin authentication with rate limiting protection.
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  checkRateLimit,
  recordFailedAttempt,
  clearRateLimit,
  verifyPassword,
  createAdminToken,
  setAuthCookie,
} from "@/lib/auth";

export async function POST(request: NextRequest) {
  // Check rate limit first
  const rateLimit = checkRateLimit(request);

  if (!rateLimit.allowed) {
    return NextResponse.json(
      {
        error: "Too many attempts. Try again later.",
        retryAfter: rateLimit.retryAfterSeconds,
      },
      {
        status: 429,
        headers: {
          "Retry-After": String(rateLimit.retryAfterSeconds),
        },
      }
    );
  }

  try {
    const body = await request.json();
    const { password } = body as { password: string };

    if (!password) {
      return NextResponse.json(
        { error: "Password is required" },
        { status: 400 }
      );
    }

    const isValid = await verifyPassword(password);

    if (!isValid) {
      recordFailedAttempt(request);
      return NextResponse.json(
        {
          error: "Invalid password",
          remainingAttempts: rateLimit.remainingAttempts - 1,
        },
        { status: 401 }
      );
    }

    // Success - clear rate limit and create session
    clearRateLimit(request);
    const token = await createAdminToken();

    const response = NextResponse.json({ success: true });
    setAuthCookie(response, token);

    return response;
  } catch (error) {
    console.error("[Auth Login] Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

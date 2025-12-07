/**
 * Analytics Track API
 * POST endpoint to receive and store page view data from middleware
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { insertPageView } from "@/lib/db";
import type { PageViewInsert } from "@/lib/types/analytics";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as PageViewInsert;

    // Validate required fields
    if (!body.path || !body.sessionId || !body.visitorHash) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Insert into database
    await insertPageView(body);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[Analytics Track] Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

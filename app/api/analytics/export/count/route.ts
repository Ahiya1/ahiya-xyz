/**
 * Analytics Export Count API
 * GET endpoint to get row count for export preview
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { sql } from "@vercel/postgres";
import { cookies } from "next/headers";

import { verifyAdminToken } from "@/lib/auth";

const AUTH_COOKIE_NAME = "ahiya_admin_session";

export async function GET(request: NextRequest) {
  try {
    // Verify admin authentication
    const cookieStore = await cookies();
    const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { valid } = await verifyAdminToken(token);

    if (!valid) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Parse search params
    const { searchParams } = new URL(request.url);
    const fromDate = searchParams.get("from");
    const toDate = searchParams.get("to");

    let result;

    if (fromDate && toDate) {
      // Custom date range
      result = await sql`
        SELECT COUNT(*) as count FROM page_views
        WHERE created_at >= ${fromDate}::date
          AND created_at < (${toDate}::date + interval '1 day')
      `;
    } else {
      // Default to all data
      result = await sql`
        SELECT COUNT(*) as count FROM page_views
      `;
    }

    const count = parseInt(result.rows[0]?.count || "0", 10);

    return NextResponse.json({ count });
  } catch (error) {
    console.error("[Analytics Export Count] Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

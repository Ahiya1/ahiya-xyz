/**
 * Analytics Export API
 * GET endpoint to export page view data as CSV
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { sql } from "@vercel/postgres";
import { cookies } from "next/headers";

import { verifyAdminToken } from "@/lib/auth";

const AUTH_COOKIE_NAME = "ahiya_admin_session";

interface PageViewRow {
  id: number;
  path: string;
  referrer: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  utm_term: string | null;
  session_id: string;
  visitor_hash: string;
  device_type: string;
  browser: string | null;
  browser_version: string | null;
  os: string | null;
  os_version: string | null;
  country: string | null;
  city: string | null;
  region: string | null;
  user_agent: string | null;
  created_at: string;
}

/**
 * Escape CSV field value to handle special characters
 */
function escapeCSVField(value: string | null | undefined): string {
  if (value === null || value === undefined) {
    return "";
  }
  const str = String(value);
  // If contains comma, quote, or newline, wrap in quotes and escape internal quotes
  if (str.includes(",") || str.includes('"') || str.includes("\n")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

/**
 * Convert page views data to CSV format
 */
function convertToCSV(rows: PageViewRow[]): string {
  const headers = [
    "id",
    "path",
    "referrer",
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_content",
    "utm_term",
    "session_id",
    "visitor_hash",
    "device_type",
    "browser",
    "browser_version",
    "os",
    "os_version",
    "country",
    "city",
    "region",
    "user_agent",
    "created_at",
  ];

  const csvLines = [headers.join(",")];

  for (const row of rows) {
    const values = [
      escapeCSVField(String(row.id)),
      escapeCSVField(row.path),
      escapeCSVField(row.referrer),
      escapeCSVField(row.utm_source),
      escapeCSVField(row.utm_medium),
      escapeCSVField(row.utm_campaign),
      escapeCSVField(row.utm_content),
      escapeCSVField(row.utm_term),
      escapeCSVField(row.session_id),
      escapeCSVField(row.visitor_hash),
      escapeCSVField(row.device_type),
      escapeCSVField(row.browser),
      escapeCSVField(row.browser_version),
      escapeCSVField(row.os),
      escapeCSVField(row.os_version),
      escapeCSVField(row.country),
      escapeCSVField(row.city),
      escapeCSVField(row.region),
      escapeCSVField(row.user_agent),
      escapeCSVField(row.created_at),
    ];
    csvLines.push(values.join(","));
  }

  return csvLines.join("\n");
}

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
    const range = searchParams.get("range");
    const format = searchParams.get("format") || "csv";
    const fromDate = searchParams.get("from");
    const toDate = searchParams.get("to");

    // Only CSV supported for now
    if (format !== "csv") {
      return NextResponse.json(
        { error: "Only CSV format is supported" },
        { status: 400 }
      );
    }

    // Build date range query
    let result;

    if (fromDate && toDate) {
      // Custom date range
      result = await sql<PageViewRow>`
        SELECT * FROM page_views
        WHERE created_at >= ${fromDate}::date
          AND created_at < (${toDate}::date + interval '1 day')
        ORDER BY created_at DESC
      `;
    } else if (range) {
      // Predefined range
      const rangeMap: Record<string, string> = {
        "7d": "7 days",
        "30d": "30 days",
        "90d": "90 days",
        all: "1000 years",
      };

      const interval = rangeMap[range] || "30 days";

      result = await sql<PageViewRow>`
        SELECT * FROM page_views
        WHERE created_at >= NOW() - ${interval}::interval
        ORDER BY created_at DESC
      `;
    } else {
      // Default to last 30 days
      result = await sql<PageViewRow>`
        SELECT * FROM page_views
        WHERE created_at >= NOW() - interval '30 days'
        ORDER BY created_at DESC
      `;
    }

    const rows = result.rows;

    // Generate CSV
    const csv = convertToCSV(rows);

    // Generate filename with date range
    const dateStr = new Date().toISOString().split("T")[0];
    const filename = `ahiya-analytics-export-${dateStr}.csv`;

    // Return as downloadable file
    return new NextResponse(csv, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    });
  } catch (error) {
    console.error("[Analytics Export] Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

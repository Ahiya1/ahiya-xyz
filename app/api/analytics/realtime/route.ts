/**
 * Real-Time Analytics API
 * GET endpoint returning current visitors and recent activity
 */

import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export interface RealtimeVisit {
  id: number;
  path: string;
  deviceType: string;
  browser: string | null;
  country: string | null;
  city: string | null;
  referrer: string | null;
  createdAt: string;
}

export interface RealtimeResponse {
  currentVisitors: number;
  recentVisits: RealtimeVisit[];
}

export async function GET() {
  try {
    // Calculate time boundaries
    const now = new Date();
    const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000);
    const thirtyMinutesAgo = new Date(now.getTime() - 30 * 60 * 1000);

    // Execute both queries in parallel for performance
    const [currentVisitorsResult, recentVisitsResult] = await Promise.all([
      // Count unique sessions in last 5 minutes (active visitors)
      sql`
        SELECT COUNT(DISTINCT session_id) as count
        FROM page_views
        WHERE created_at >= ${fiveMinutesAgo.toISOString()}
      `,
      // Get last 50 visits from the past 30 minutes
      sql`
        SELECT
          id,
          path,
          device_type,
          browser,
          country,
          city,
          referrer,
          created_at
        FROM page_views
        WHERE created_at >= ${thirtyMinutesAgo.toISOString()}
        ORDER BY created_at DESC
        LIMIT 50
      `,
    ]);

    const currentVisitors = Number(currentVisitorsResult.rows[0]?.count || 0);

    const recentVisits: RealtimeVisit[] = recentVisitsResult.rows.map((row) => ({
      id: row.id,
      path: row.path,
      deviceType: row.device_type,
      browser: row.browser,
      country: row.country,
      city: row.city,
      referrer: row.referrer,
      createdAt: row.created_at,
    }));

    const response: RealtimeResponse = {
      currentVisitors,
      recentVisits,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("[Analytics Realtime] Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

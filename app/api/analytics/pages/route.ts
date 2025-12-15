/**
 * Pages Analytics API
 * GET endpoint to return per-page metrics with sorting and time range filtering
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { sql } from "@vercel/postgres";

type TimeRange = "today" | "7d" | "30d" | "90d";
type SortField = "views" | "visitors" | "bounce";
type SortOrder = "asc" | "desc";

interface PageMetrics {
  path: string;
  views: number;
  uniqueVisitors: number;
  bounceRate: number;
  avgTimeOnPage: number;
  entryRate: number;
  exitRate: number;
}

/**
 * Calculate start date based on time range
 */
function getStartDate(range: TimeRange): Date {
  const now = new Date();
  switch (range) {
    case "today":
      return new Date(now.getFullYear(), now.getMonth(), now.getDate());
    case "7d":
      return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    case "30d":
      return new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    case "90d":
      return new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
    default:
      return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const range = (searchParams.get("range") || "7d") as TimeRange;
    const sort = (searchParams.get("sort") || "views") as SortField;
    const order = (searchParams.get("order") || "desc") as SortOrder;

    const startDate = getStartDate(range);
    const startDateStr = startDate.toISOString();

    // Main query: Get page views, unique visitors, and session counts per page
    // Using CTEs for entry pages, exit pages, and bounce calculation
    const result = await sql`
      WITH
      -- Base page stats
      page_stats AS (
        SELECT
          path,
          COUNT(*) as views,
          COUNT(DISTINCT visitor_hash) as unique_visitors,
          COUNT(DISTINCT session_id) as total_sessions
        FROM page_views
        WHERE created_at >= ${startDateStr}
        GROUP BY path
      ),

      -- Entry pages (first page of each session)
      entry_pages AS (
        SELECT path, COUNT(*) as entry_count
        FROM (
          SELECT DISTINCT ON (session_id) session_id, path
          FROM page_views
          WHERE created_at >= ${startDateStr}
          ORDER BY session_id, created_at ASC
        ) first_pages
        GROUP BY path
      ),

      -- Exit pages (last page of each session)
      exit_pages AS (
        SELECT path, COUNT(*) as exit_count
        FROM (
          SELECT DISTINCT ON (session_id) session_id, path
          FROM page_views
          WHERE created_at >= ${startDateStr}
          ORDER BY session_id, created_at DESC
        ) last_pages
        GROUP BY path
      ),

      -- Total sessions in period (for rate calculations)
      total_sessions AS (
        SELECT COUNT(DISTINCT session_id) as count
        FROM page_views
        WHERE created_at >= ${startDateStr}
      ),

      -- Bounce sessions (sessions with only 1 page view) per page
      bounce_sessions AS (
        SELECT
          pv.path,
          COUNT(DISTINCT pv.session_id) as bounced_sessions
        FROM page_views pv
        INNER JOIN (
          SELECT session_id
          FROM page_views
          WHERE created_at >= ${startDateStr}
          GROUP BY session_id
          HAVING COUNT(*) = 1
        ) single_page_sessions ON pv.session_id = single_page_sessions.session_id
        WHERE pv.created_at >= ${startDateStr}
        GROUP BY pv.path
      ),

      -- Time on page from events table (real data)
      time_on_page AS (
        SELECT
          page_path,
          AVG(event_value) / 1000 as avg_seconds
        FROM events
        WHERE event_category = 'engagement'
          AND event_action = 'time_on_page'
          AND created_at >= ${startDateStr}
        GROUP BY page_path
      )

      SELECT
        ps.path,
        ps.views,
        ps.unique_visitors,
        ps.total_sessions,
        COALESCE(ep.entry_count, 0) as entry_count,
        COALESCE(xp.exit_count, 0) as exit_count,
        COALESCE(bs.bounced_sessions, 0) as bounced_sessions,
        ts.count as total_sessions_period,
        COALESCE(top.avg_seconds, 0) as avg_time_on_page,
        -- Entry rate: percentage of total sessions that started on this page
        CASE
          WHEN ts.count > 0 THEN ROUND(100.0 * COALESCE(ep.entry_count, 0) / ts.count, 1)
          ELSE 0
        END as entry_rate,
        -- Exit rate: percentage of sessions on this page that ended here
        CASE
          WHEN ps.total_sessions > 0 THEN ROUND(100.0 * COALESCE(xp.exit_count, 0) / ps.total_sessions, 1)
          ELSE 0
        END as exit_rate,
        -- Bounce rate: percentage of sessions on this page that were single-page sessions
        CASE
          WHEN COALESCE(ep.entry_count, 0) > 0 THEN ROUND(100.0 * COALESCE(bs.bounced_sessions, 0) / ep.entry_count, 1)
          ELSE 0
        END as bounce_rate
      FROM page_stats ps
      LEFT JOIN entry_pages ep ON ps.path = ep.path
      LEFT JOIN exit_pages xp ON ps.path = xp.path
      LEFT JOIN bounce_sessions bs ON ps.path = bs.path
      LEFT JOIN time_on_page top ON ps.path = top.page_path
      CROSS JOIN total_sessions ts
      ORDER BY ps.views DESC
      LIMIT 100
    `;

    // Transform and sort results
    let pages: PageMetrics[] = result.rows.map((row) => ({
      path: String(row.path),
      views: Number(row.views) || 0,
      uniqueVisitors: Number(row.unique_visitors) || 0,
      bounceRate: Number(row.bounce_rate) || 0,
      avgTimeOnPage: Math.round(Number(row.avg_time_on_page) || 0),
      entryRate: Number(row.entry_rate) || 0,
      exitRate: Number(row.exit_rate) || 0,
    }));

    // Apply sorting
    const sortMultiplier = order === "asc" ? 1 : -1;
    pages.sort((a, b) => {
      switch (sort) {
        case "views":
          return sortMultiplier * (a.views - b.views);
        case "visitors":
          return sortMultiplier * (a.uniqueVisitors - b.uniqueVisitors);
        case "bounce":
          return sortMultiplier * (a.bounceRate - b.bounceRate);
        default:
          return sortMultiplier * (a.views - b.views);
      }
    });

    return NextResponse.json({
      data: pages,
      meta: {
        range,
        sort,
        order,
        count: pages.length,
      },
    });
  } catch (error) {
    console.error("[Analytics Pages API] Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

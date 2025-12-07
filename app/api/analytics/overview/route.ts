/**
 * Analytics Overview API
 * GET endpoint to retrieve dashboard metrics with trend data
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { sql } from "@vercel/postgres";

export type TimeRange = "today" | "7d" | "30d" | "90d";

interface SparklineDataPoint {
  value: number;
}

interface MetricData {
  value: number;
  change: number;
  trend: "up" | "down" | "neutral";
  sparkline: SparklineDataPoint[];
}

interface OverviewResponse {
  totalViews: MetricData;
  uniqueVisitors: MetricData;
  bounceRate: MetricData;
  avgDuration: MetricData;
}

/**
 * Get the date range boundaries based on the range parameter
 */
function getDateRange(range: TimeRange): { start: Date; end: Date; prevStart: Date; prevEnd: Date } {
  const now = new Date();
  const end = new Date(now);
  let start: Date;
  let daysBack: number;

  switch (range) {
    case "today":
      start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      daysBack = 1;
      break;
    case "7d":
      start = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      daysBack = 7;
      break;
    case "30d":
      start = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      daysBack = 30;
      break;
    case "90d":
      start = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
      daysBack = 90;
      break;
    default:
      start = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      daysBack = 7;
  }

  // Previous period for comparison
  const prevEnd = new Date(start.getTime() - 1);
  const prevStart = new Date(prevEnd.getTime() - daysBack * 24 * 60 * 60 * 1000);

  return { start, end, prevStart, prevEnd };
}

/**
 * Calculate trend based on change percentage
 */
function getTrend(change: number): "up" | "down" | "neutral" {
  if (change > 0.5) return "up";
  if (change < -0.5) return "down";
  return "neutral";
}

/**
 * Calculate percentage change between two values
 */
function calculateChange(current: number, previous: number): number {
  if (previous === 0) return current > 0 ? 100 : 0;
  return ((current - previous) / previous) * 100;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const rangeParam = searchParams.get("range") || "7d";
    const range = ["today", "7d", "30d", "90d"].includes(rangeParam)
      ? (rangeParam as TimeRange)
      : "7d";

    const { start, end, prevStart, prevEnd } = getDateRange(range);

    // Execute queries in parallel for performance
    const [
      currentViewsResult,
      previousViewsResult,
      currentVisitorsResult,
      previousVisitorsResult,
      sparklineResult,
    ] = await Promise.all([
      // Current period total views
      sql`
        SELECT COUNT(*) as count
        FROM page_views
        WHERE created_at >= ${start.toISOString()}
          AND created_at <= ${end.toISOString()}
      `,
      // Previous period total views
      sql`
        SELECT COUNT(*) as count
        FROM page_views
        WHERE created_at >= ${prevStart.toISOString()}
          AND created_at <= ${prevEnd.toISOString()}
      `,
      // Current period unique visitors
      sql`
        SELECT COUNT(DISTINCT visitor_hash) as count
        FROM page_views
        WHERE created_at >= ${start.toISOString()}
          AND created_at <= ${end.toISOString()}
      `,
      // Previous period unique visitors
      sql`
        SELECT COUNT(DISTINCT visitor_hash) as count
        FROM page_views
        WHERE created_at >= ${prevStart.toISOString()}
          AND created_at <= ${prevEnd.toISOString()}
      `,
      // Sparkline data - last 7 data points (grouped by day/hour depending on range)
      range === "today"
        ? sql`
            SELECT
              DATE_TRUNC('hour', created_at) as period,
              COUNT(*) as count
            FROM page_views
            WHERE created_at >= ${start.toISOString()}
              AND created_at <= ${end.toISOString()}
            GROUP BY DATE_TRUNC('hour', created_at)
            ORDER BY period DESC
            LIMIT 7
          `
        : sql`
            SELECT
              DATE_TRUNC('day', created_at) as period,
              COUNT(*) as count
            FROM page_views
            WHERE created_at >= ${start.toISOString()}
              AND created_at <= ${end.toISOString()}
            GROUP BY DATE_TRUNC('day', created_at)
            ORDER BY period DESC
            LIMIT 7
          `,
    ]);

    // Parse results
    const currentViews = Number(currentViewsResult.rows[0]?.count ?? 0);
    const previousViews = Number(previousViewsResult.rows[0]?.count ?? 0);
    const currentVisitors = Number(currentVisitorsResult.rows[0]?.count ?? 0);
    const previousVisitors = Number(previousVisitorsResult.rows[0]?.count ?? 0);

    // Calculate changes
    const viewsChange = calculateChange(currentViews, previousViews);
    const visitorsChange = calculateChange(currentVisitors, previousVisitors);

    // Build sparkline data (reverse to show oldest to newest)
    const sparklineData: SparklineDataPoint[] = sparklineResult.rows
      .map((row) => ({ value: Number(row.count) }))
      .reverse();

    // Ensure we have at least 7 data points (pad with zeros if needed)
    while (sparklineData.length < 7) {
      sparklineData.unshift({ value: 0 });
    }

    // Bounce rate calculation placeholder
    // A "bounce" is typically a session with only one page view
    // For now, we'll calculate this as sessions with single page view / total sessions
    const [bounceResult, prevBounceResult] = await Promise.all([
      sql`
        SELECT
          COUNT(CASE WHEN page_count = 1 THEN 1 END)::float / NULLIF(COUNT(*), 0) * 100 as bounce_rate
        FROM (
          SELECT session_id, COUNT(*) as page_count
          FROM page_views
          WHERE created_at >= ${start.toISOString()}
            AND created_at <= ${end.toISOString()}
          GROUP BY session_id
        ) sessions
      `,
      sql`
        SELECT
          COUNT(CASE WHEN page_count = 1 THEN 1 END)::float / NULLIF(COUNT(*), 0) * 100 as bounce_rate
        FROM (
          SELECT session_id, COUNT(*) as page_count
          FROM page_views
          WHERE created_at >= ${prevStart.toISOString()}
            AND created_at <= ${prevEnd.toISOString()}
          GROUP BY session_id
        ) sessions
      `,
    ]);

    const currentBounceRate = Number(bounceResult.rows[0]?.bounce_rate ?? 0);
    const prevBounceRate = Number(prevBounceResult.rows[0]?.bounce_rate ?? 0);
    const bounceRateChange = calculateChange(currentBounceRate, prevBounceRate);
    // For bounce rate, lower is better, so invert the trend
    const bounceRateTrend =
      bounceRateChange < -0.5 ? "up" : bounceRateChange > 0.5 ? "down" : "neutral";

    // Average session duration is a placeholder since we don't track time on page
    // This would require client-side tracking of page visibility/unload events
    const avgDurationPlaceholder = 45; // placeholder: 45 seconds

    const response: OverviewResponse = {
      totalViews: {
        value: currentViews,
        change: viewsChange,
        trend: getTrend(viewsChange),
        sparkline: sparklineData,
      },
      uniqueVisitors: {
        value: currentVisitors,
        change: visitorsChange,
        trend: getTrend(visitorsChange),
        sparkline: sparklineData, // Same sparkline for now
      },
      bounceRate: {
        value: Math.round(currentBounceRate * 10) / 10 || 0,
        change: bounceRateChange,
        trend: bounceRateTrend,
        sparkline: sparklineData, // Placeholder sparkline
      },
      avgDuration: {
        value: avgDurationPlaceholder,
        change: 0,
        trend: "neutral",
        sparkline: sparklineData, // Placeholder sparkline
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("[Analytics Overview] Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch analytics overview" },
      { status: 500 }
    );
  }
}

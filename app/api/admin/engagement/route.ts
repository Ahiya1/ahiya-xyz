/**
 * Engagement Analytics API
 * GET endpoint to return engagement metrics, funnel data, scroll depth distribution,
 * and top clicked elements with time range filtering.
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { sql } from "@vercel/postgres";
import { cookies } from "next/headers";

import { verifyAdminToken } from "@/lib/auth";

// ============================================================================
// Types
// ============================================================================

type TimeRange = "today" | "7d" | "30d" | "90d";

interface MetricData {
  value: number;
  change: number;
  trend: "up" | "down" | "neutral";
  sparkline: { value: number }[];
}

interface FunnelData {
  pageViews: number;
  scroll50: number;
  ctaClicks: number;
  calOpens: number;
}

interface ScrollDistributionData {
  milestone: string;
  sessions: number;
  percentage: number;
}

interface TopClickData {
  label: string;
  category: string;
  count: number;
  pagePath: string;
}

interface EngagementApiResponse {
  metrics: {
    avgScrollDepth: MetricData;
    avgTimeOnPage: MetricData;
    engagementScore: MetricData;
    totalSessions: MetricData;
  };
  funnel: FunnelData;
  scrollDistribution: ScrollDistributionData[];
  topClicks: TopClickData[];
}

// ============================================================================
// Constants
// ============================================================================

const AUTH_COOKIE_NAME = "ahiya_admin_session";

// ============================================================================
// Helpers
// ============================================================================

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

/**
 * Calculate previous period start date for comparison
 */
function getPreviousPeriodStartDate(range: TimeRange): Date {
  const now = new Date();
  switch (range) {
    case "today":
      const yesterday = new Date(now);
      yesterday.setDate(yesterday.getDate() - 1);
      return new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate());
    case "7d":
      return new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);
    case "30d":
      return new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000);
    case "90d":
      return new Date(now.getTime() - 180 * 24 * 60 * 60 * 1000);
    default:
      return new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);
  }
}

/**
 * Validate time range parameter
 */
function validateTimeRange(range: string | null): TimeRange {
  const validRanges: TimeRange[] = ["today", "7d", "30d", "90d"];
  if (range && validRanges.includes(range as TimeRange)) {
    return range as TimeRange;
  }
  return "7d";
}

/**
 * Calculate percentage change between two values
 */
function calculateChange(current: number, previous: number): number {
  if (previous === 0) return current > 0 ? 100 : 0;
  return ((current - previous) / previous) * 100;
}

/**
 * Determine trend from change value
 */
function getTrend(change: number): "up" | "down" | "neutral" {
  if (change > 0.5) return "up";
  if (change < -0.5) return "down";
  return "neutral";
}

// ============================================================================
// Main Handler
// ============================================================================

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

    // Parse and validate search params
    const { searchParams } = new URL(request.url);
    const range = validateTimeRange(searchParams.get("range"));
    const startDate = getStartDate(range);
    const startDateStr = startDate.toISOString();
    const prevStartDate = getPreviousPeriodStartDate(range);
    const prevStartDateStr = prevStartDate.toISOString();

    // Run all queries in parallel for performance
    const [
      scrollDepthResult,
      timeOnPageResult,
      funnelResult,
      scrollDistributionResult,
      topClicksResult,
      prevScrollDepthResult,
      prevTimeOnPageResult,
      prevSessionsResult,
      sparklineResult,
    ] = await Promise.all([
      // Average scroll depth (max scroll per session, then average)
      sql`
        SELECT
          COALESCE(AVG(max_scroll), 0) as avg_scroll
        FROM (
          SELECT session_id, MAX(event_value) as max_scroll
          FROM events
          WHERE event_category = 'scroll'
            AND created_at >= ${startDateStr}::timestamptz
          GROUP BY session_id
        ) per_session
      `,

      // Average time on page (in seconds)
      sql`
        SELECT
          COALESCE(AVG(event_value) / 1000, 0) as avg_seconds,
          COUNT(DISTINCT session_id) as sessions
        FROM events
        WHERE event_category = 'engagement'
          AND event_action = 'time_on_page'
          AND created_at >= ${startDateStr}::timestamptz
      `,

      // Conversion funnel data
      sql`
        WITH pageview_sessions AS (
          SELECT COUNT(DISTINCT session_id) as count FROM page_views
          WHERE created_at >= ${startDateStr}::timestamptz
        ),
        scroll_sessions AS (
          SELECT COUNT(DISTINCT session_id) as count FROM events
          WHERE event_category = 'scroll' AND event_value >= 50
            AND created_at >= ${startDateStr}::timestamptz
        ),
        click_sessions AS (
          SELECT COUNT(DISTINCT session_id) as count FROM events
          WHERE event_category = 'click'
            AND (event_action LIKE 'cta_%' OR event_label LIKE '%cta%')
            AND created_at >= ${startDateStr}::timestamptz
        ),
        cal_sessions AS (
          SELECT COUNT(DISTINCT session_id) as count FROM events
          WHERE event_category = 'conversion'
            AND created_at >= ${startDateStr}::timestamptz
        )
        SELECT
          pv.count as page_views,
          s.count as scroll_50,
          c.count as cta_clicks,
          cal.count as cal_opens
        FROM pageview_sessions pv
        CROSS JOIN scroll_sessions s
        CROSS JOIN click_sessions c
        CROSS JOIN cal_sessions cal
      `,

      // Scroll depth distribution by milestone
      sql`
        WITH scroll_milestones AS (
          SELECT
            session_id,
            MAX(event_value) as max_scroll
          FROM events
          WHERE event_category = 'scroll'
            AND created_at >= ${startDateStr}::timestamptz
          GROUP BY session_id
        ),
        milestone_counts AS (
          SELECT
            CASE
              WHEN max_scroll >= 100 THEN '100%'
              WHEN max_scroll >= 75 THEN '75%'
              WHEN max_scroll >= 50 THEN '50%'
              WHEN max_scroll >= 25 THEN '25%'
              ELSE '<25%'
            END as milestone,
            COUNT(*) as sessions
          FROM scroll_milestones
          GROUP BY
            CASE
              WHEN max_scroll >= 100 THEN '100%'
              WHEN max_scroll >= 75 THEN '75%'
              WHEN max_scroll >= 50 THEN '50%'
              WHEN max_scroll >= 25 THEN '25%'
              ELSE '<25%'
            END
        ),
        total AS (
          SELECT COALESCE(SUM(sessions), 1) as total FROM milestone_counts
        )
        SELECT
          mc.milestone,
          mc.sessions::int,
          ROUND((mc.sessions::numeric / t.total) * 100, 1) as percentage
        FROM milestone_counts mc
        CROSS JOIN total t
        ORDER BY
          CASE mc.milestone
            WHEN '100%' THEN 1
            WHEN '75%' THEN 2
            WHEN '50%' THEN 3
            WHEN '25%' THEN 4
            ELSE 5
          END
      `,

      // Top clicked elements
      sql`
        SELECT
          COALESCE(event_label, event_action) as label,
          CASE
            WHEN event_action LIKE 'cta_%' THEN 'CTA'
            WHEN event_action LIKE 'nav_%' THEN 'Navigation'
            WHEN event_action LIKE 'link_%' THEN 'Link'
            ELSE 'Other'
          END as category,
          COUNT(*) as count,
          page_path
        FROM events
        WHERE event_category = 'click'
          AND (event_label IS NOT NULL OR event_action IS NOT NULL)
          AND created_at >= ${startDateStr}::timestamptz
        GROUP BY event_label, event_action, page_path
        ORDER BY count DESC
        LIMIT 10
      `,

      // Previous period scroll depth for comparison
      sql`
        SELECT
          COALESCE(AVG(max_scroll), 0) as avg_scroll
        FROM (
          SELECT session_id, MAX(event_value) as max_scroll
          FROM events
          WHERE event_category = 'scroll'
            AND created_at >= ${prevStartDateStr}::timestamptz
            AND created_at < ${startDateStr}::timestamptz
          GROUP BY session_id
        ) per_session
      `,

      // Previous period time on page for comparison
      sql`
        SELECT
          COALESCE(AVG(event_value) / 1000, 0) as avg_seconds,
          COUNT(DISTINCT session_id) as sessions
        FROM events
        WHERE event_category = 'engagement'
          AND event_action = 'time_on_page'
          AND created_at >= ${prevStartDateStr}::timestamptz
          AND created_at < ${startDateStr}::timestamptz
      `,

      // Previous period total sessions for comparison
      sql`
        SELECT COUNT(DISTINCT session_id) as sessions
        FROM page_views
        WHERE created_at >= ${prevStartDateStr}::timestamptz
          AND created_at < ${startDateStr}::timestamptz
      `,

      // Sparkline data - daily averages for the period
      sql`
        SELECT
          DATE(created_at) as date,
          COALESCE(AVG(CASE WHEN event_category = 'scroll' THEN event_value END), 0) as scroll,
          COUNT(DISTINCT session_id) as sessions
        FROM events
        WHERE created_at >= ${startDateStr}::timestamptz
        GROUP BY DATE(created_at)
        ORDER BY date
        LIMIT 14
      `,
    ]);

    // Extract current period values
    const avgScrollDepth = Number(scrollDepthResult.rows[0]?.avg_scroll || 0);
    const avgTimeOnPage = Number(timeOnPageResult.rows[0]?.avg_seconds || 0);
    const totalSessions = Number(timeOnPageResult.rows[0]?.sessions || 0);

    // Extract previous period values
    const prevAvgScrollDepth = Number(prevScrollDepthResult.rows[0]?.avg_scroll || 0);
    const prevAvgTimeOnPage = Number(prevTimeOnPageResult.rows[0]?.avg_seconds || 0);
    const prevTotalSessions = Number(prevSessionsResult.rows[0]?.sessions || 0);

    // Calculate engagement score (weighted formula)
    // Scroll: 30% (0-100 normalized)
    // Time: 40% (capped at 300s = 100%)
    // Interactions: 30% (based on CTA clicks / sessions ratio)
    const funnelData = funnelResult.rows[0] || { page_views: 0, scroll_50: 0, cta_clicks: 0, cal_opens: 0 };
    const ctaClicks = Number(funnelData.cta_clicks || 0);
    const pageViews = Number(funnelData.page_views || 0);

    const interactionRate = pageViews > 0 ? (ctaClicks / pageViews) * 100 : 0;

    const scrollScore = avgScrollDepth * 0.3;
    const timeScore = Math.min(100, (avgTimeOnPage / 300) * 100) * 0.4;
    const interactionScore = Math.min(100, interactionRate * 10) * 0.3; // Scale up interactions
    const engagementScore = Math.round(scrollScore + timeScore + interactionScore);

    // Calculate previous engagement score for comparison
    const prevInteractionRate = prevTotalSessions > 0 ? 50 : 0; // Placeholder for prev interactions
    const prevScrollScore = prevAvgScrollDepth * 0.3;
    const prevTimeScore = Math.min(100, (prevAvgTimeOnPage / 300) * 100) * 0.4;
    const prevInteractionScore = Math.min(100, prevInteractionRate) * 0.3;
    const prevEngagementScore = Math.round(prevScrollScore + prevTimeScore + prevInteractionScore);

    // Build sparkline data
    const sparklineData = sparklineResult.rows.map((row) => ({
      value: Number(row.scroll || 0),
    }));

    const sessionSparkline = sparklineResult.rows.map((row) => ({
      value: Number(row.sessions || 0),
    }));

    // Build scroll distribution response
    const scrollDistribution: ScrollDistributionData[] = scrollDistributionResult.rows.map((row) => ({
      milestone: String(row.milestone),
      sessions: Number(row.sessions || 0),
      percentage: Number(row.percentage || 0),
    }));

    // Build top clicks response
    const topClicks: TopClickData[] = topClicksResult.rows.map((row) => ({
      label: String(row.label || "Unknown"),
      category: String(row.category || "Other"),
      count: Number(row.count || 0),
      pagePath: String(row.page_path || "/"),
    }));

    // Calculate changes
    const scrollChange = calculateChange(avgScrollDepth, prevAvgScrollDepth);
    const timeChange = calculateChange(avgTimeOnPage, prevAvgTimeOnPage);
    const sessionChange = calculateChange(totalSessions, prevTotalSessions);
    const engagementChange = calculateChange(engagementScore, prevEngagementScore);

    // Build response
    const response: EngagementApiResponse = {
      metrics: {
        avgScrollDepth: {
          value: Math.round(avgScrollDepth),
          change: Math.round(scrollChange * 10) / 10,
          trend: getTrend(scrollChange),
          sparkline: sparklineData,
        },
        avgTimeOnPage: {
          value: Math.round(avgTimeOnPage),
          change: Math.round(timeChange * 10) / 10,
          trend: getTrend(timeChange),
          sparkline: sparklineData,
        },
        engagementScore: {
          value: engagementScore,
          change: Math.round(engagementChange * 10) / 10,
          trend: getTrend(engagementChange),
          sparkline: sparklineData,
        },
        totalSessions: {
          value: totalSessions,
          change: Math.round(sessionChange * 10) / 10,
          trend: getTrend(sessionChange),
          sparkline: sessionSparkline,
        },
      },
      funnel: {
        pageViews: Number(funnelData.page_views || 0),
        scroll50: Number(funnelData.scroll_50 || 0),
        ctaClicks: Number(funnelData.cta_clicks || 0),
        calOpens: Number(funnelData.cal_opens || 0),
      },
      scrollDistribution,
      topClicks,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("[Engagement API] Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

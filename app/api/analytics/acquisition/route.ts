/**
 * Acquisition Analytics API
 * GET endpoint returning traffic sources, referrers, and campaign data
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { sql } from "@vercel/postgres";

// Time range to days mapping
const RANGE_DAYS: Record<string, number> = {
  today: 1,
  "7d": 7,
  "30d": 30,
  "90d": 90,
};

export interface TrafficSource {
  source: string;
  views: number;
  visitors: number;
  percentage: number;
}

export interface TopReferrer {
  domain: string;
  count: number;
}

export interface TopCampaign {
  campaign: string;
  source: string | null;
  medium: string | null;
  views: number;
}

export interface AcquisitionResponse {
  sources: TrafficSource[];
  topReferrers: TopReferrer[];
  topCampaigns: TopCampaign[];
}

// Helper to extract domain from referrer URL
function extractDomain(referrer: string): string {
  try {
    const url = new URL(referrer);
    return url.hostname.replace(/^www\./, "");
  } catch {
    return referrer;
  }
}

// Categorize traffic source
function categorizeSource(referrer: string | null): string {
  if (!referrer || referrer === "") {
    return "direct";
  }

  const lowerRef = referrer.toLowerCase();

  // Organic search
  if (
    lowerRef.includes("google.") ||
    lowerRef.includes("bing.") ||
    lowerRef.includes("duckduckgo.") ||
    lowerRef.includes("yahoo.") ||
    lowerRef.includes("baidu.") ||
    lowerRef.includes("yandex.")
  ) {
    return "organic";
  }

  // Social
  if (
    lowerRef.includes("twitter.") ||
    lowerRef.includes("x.com") ||
    lowerRef.includes("facebook.") ||
    lowerRef.includes("linkedin.") ||
    lowerRef.includes("instagram.") ||
    lowerRef.includes("tiktok.") ||
    lowerRef.includes("youtube.") ||
    lowerRef.includes("reddit.")
  ) {
    return "social";
  }

  // Default to referral
  return "referral";
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const range = searchParams.get("range") || "7d";
    const days = RANGE_DAYS[range] || 7;

    // Calculate start date
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    startDate.setHours(0, 0, 0, 0);

    // Execute all queries in parallel
    const [sourcesResult, referrersResult, campaignsResult] = await Promise.all(
      [
        // Get all referrers for categorization
        sql`
        SELECT
          referrer,
          utm_source,
          COUNT(*) as views,
          COUNT(DISTINCT visitor_hash) as visitors
        FROM page_views
        WHERE created_at >= ${startDate.toISOString()}
        GROUP BY referrer, utm_source
      `,
        // Get top referrers (non-empty referrers only)
        sql`
        SELECT
          referrer,
          COUNT(*) as count
        FROM page_views
        WHERE created_at >= ${startDate.toISOString()}
          AND referrer IS NOT NULL
          AND referrer != ''
        GROUP BY referrer
        ORDER BY count DESC
        LIMIT 10
      `,
        // Get top campaigns
        sql`
        SELECT
          utm_campaign as campaign,
          utm_source as source,
          utm_medium as medium,
          COUNT(*) as views
        FROM page_views
        WHERE created_at >= ${startDate.toISOString()}
          AND utm_campaign IS NOT NULL
          AND utm_campaign != ''
        GROUP BY utm_campaign, utm_source, utm_medium
        ORDER BY views DESC
        LIMIT 10
      `,
      ]
    );

    // Aggregate sources into categories
    const sourceAggregation: Record<
      string,
      { views: number; visitors: number }
    > = {
      direct: { views: 0, visitors: 0 },
      organic: { views: 0, visitors: 0 },
      social: { views: 0, visitors: 0 },
      referral: { views: 0, visitors: 0 },
      campaign: { views: 0, visitors: 0 },
    };

    let totalViews = 0;

    for (const row of sourcesResult.rows) {
      const views = Number(row.views);
      const visitors = Number(row.visitors);
      totalViews += views;

      // If utm_source exists, categorize as campaign
      if (row.utm_source) {
        sourceAggregation.campaign.views += views;
        sourceAggregation.campaign.visitors += visitors;
      } else {
        const category = categorizeSource(row.referrer);
        sourceAggregation[category].views += views;
        sourceAggregation[category].visitors += visitors;
      }
    }

    // Build sources array with percentages
    const sources: TrafficSource[] = Object.entries(sourceAggregation)
      .filter(([, data]) => data.views > 0)
      .map(([source, data]) => ({
        source,
        views: data.views,
        visitors: data.visitors,
        percentage: totalViews > 0 ? (data.views / totalViews) * 100 : 0,
      }))
      .sort((a, b) => b.views - a.views);

    // Process referrers - extract and aggregate by domain
    const domainCounts: Record<string, number> = {};
    for (const row of referrersResult.rows) {
      const domain = extractDomain(row.referrer);
      domainCounts[domain] = (domainCounts[domain] || 0) + Number(row.count);
    }

    const topReferrers: TopReferrer[] = Object.entries(domainCounts)
      .map(([domain, count]) => ({ domain, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    // Process campaigns
    const topCampaigns: TopCampaign[] = campaignsResult.rows.map((row) => ({
      campaign: row.campaign,
      source: row.source,
      medium: row.medium,
      views: Number(row.views),
    }));

    const response: AcquisitionResponse = {
      sources,
      topReferrers,
      topCampaigns,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("[Analytics Acquisition] Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

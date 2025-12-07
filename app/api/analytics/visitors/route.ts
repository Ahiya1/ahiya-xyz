/**
 * Visitors Analytics API
 * GET endpoint returning device/browser/OS breakdown and geographic data
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

export interface DeviceBreakdown {
  device: string;
  count: number;
  percentage: number;
}

export interface BrowserBreakdown {
  browser: string;
  count: number;
  percentage: number;
}

export interface OSBreakdown {
  os: string;
  count: number;
  percentage: number;
}

export interface GeoData {
  country: string;
  count: number;
  visitors: number;
}

export interface CityData {
  city: string;
  country: string;
  count: number;
}

export interface VisitorsResponse {
  deviceBreakdown: DeviceBreakdown[];
  browserBreakdown: BrowserBreakdown[];
  osBreakdown: OSBreakdown[];
  geoData: GeoData[];
  topCities: CityData[];
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

    // Execute all queries in parallel for optimal performance
    const [
      deviceResult,
      browserResult,
      osResult,
      geoResult,
      citiesResult,
      totalResult,
    ] = await Promise.all([
      // Device breakdown
      sql`
        SELECT
          device_type,
          COUNT(*) as count
        FROM page_views
        WHERE created_at >= ${startDate.toISOString()}
        GROUP BY device_type
        ORDER BY count DESC
      `,
      // Browser breakdown (top 5)
      sql`
        SELECT
          browser,
          COUNT(*) as count
        FROM page_views
        WHERE created_at >= ${startDate.toISOString()}
          AND browser IS NOT NULL
          AND browser != ''
        GROUP BY browser
        ORDER BY count DESC
        LIMIT 5
      `,
      // OS breakdown (top 5)
      sql`
        SELECT
          os,
          COUNT(*) as count
        FROM page_views
        WHERE created_at >= ${startDate.toISOString()}
          AND os IS NOT NULL
          AND os != ''
        GROUP BY os
        ORDER BY count DESC
        LIMIT 5
      `,
      // Geographic data by country
      sql`
        SELECT
          country,
          COUNT(*) as count,
          COUNT(DISTINCT visitor_hash) as visitors
        FROM page_views
        WHERE created_at >= ${startDate.toISOString()}
          AND country IS NOT NULL
          AND country != ''
        GROUP BY country
        ORDER BY count DESC
      `,
      // Top cities
      sql`
        SELECT
          city,
          country,
          COUNT(*) as count
        FROM page_views
        WHERE created_at >= ${startDate.toISOString()}
          AND city IS NOT NULL
          AND city != ''
        GROUP BY city, country
        ORDER BY count DESC
        LIMIT 10
      `,
      // Total count for percentage calculation
      sql`
        SELECT COUNT(*) as total
        FROM page_views
        WHERE created_at >= ${startDate.toISOString()}
      `,
    ]);

    const total = Number(totalResult.rows[0]?.total || 0);

    // Process device breakdown
    const deviceBreakdown: DeviceBreakdown[] = deviceResult.rows.map((row) => ({
      device: row.device_type || "unknown",
      count: Number(row.count),
      percentage: total > 0 ? (Number(row.count) / total) * 100 : 0,
    }));

    // Process browser breakdown
    const browserTotal = browserResult.rows.reduce(
      (sum, row) => sum + Number(row.count),
      0
    );
    const browserBreakdown: BrowserBreakdown[] = browserResult.rows.map(
      (row) => ({
        browser: row.browser,
        count: Number(row.count),
        percentage: browserTotal > 0 ? (Number(row.count) / browserTotal) * 100 : 0,
      })
    );

    // Process OS breakdown
    const osTotal = osResult.rows.reduce(
      (sum, row) => sum + Number(row.count),
      0
    );
    const osBreakdown: OSBreakdown[] = osResult.rows.map((row) => ({
      os: row.os,
      count: Number(row.count),
      percentage: osTotal > 0 ? (Number(row.count) / osTotal) * 100 : 0,
    }));

    // Process geographic data
    const geoData: GeoData[] = geoResult.rows.map((row) => ({
      country: row.country,
      count: Number(row.count),
      visitors: Number(row.visitors),
    }));

    // Process top cities
    const topCities: CityData[] = citiesResult.rows.map((row) => ({
      city: row.city,
      country: row.country,
      count: Number(row.count),
    }));

    const response: VisitorsResponse = {
      deviceBreakdown,
      browserBreakdown,
      osBreakdown,
      geoData,
      topCities,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("[Analytics Visitors] Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

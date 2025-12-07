/**
 * Database Utilities
 * Handles Vercel Postgres database operations for analytics
 */

import { sql } from "@vercel/postgres";

import type { PageViewInsert } from "@/lib/types/analytics";

/**
 * Insert a new page view record into the database
 * Uses parameterized queries via sql template literals for SQL injection safety
 */
export async function insertPageView(data: PageViewInsert): Promise<void> {
  await sql`
    INSERT INTO page_views (
      path,
      referrer,
      utm_source,
      utm_medium,
      utm_campaign,
      utm_content,
      utm_term,
      session_id,
      visitor_hash,
      device_type,
      browser,
      browser_version,
      os,
      os_version,
      country,
      city,
      region,
      user_agent
    ) VALUES (
      ${data.path},
      ${data.referrer},
      ${data.utmSource},
      ${data.utmMedium},
      ${data.utmCampaign},
      ${data.utmContent},
      ${data.utmTerm},
      ${data.sessionId},
      ${data.visitorHash},
      ${data.deviceType},
      ${data.browser},
      ${data.browserVersion},
      ${data.os},
      ${data.osVersion},
      ${data.country},
      ${data.city},
      ${data.region},
      ${data.userAgent}
    )
  `;
}

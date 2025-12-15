/**
 * Database Utilities
 * Handles Vercel Postgres database operations for analytics
 */

import { sql } from "@vercel/postgres";

import type { PageViewInsert } from "@/lib/types/analytics";
import type { EventPayload } from "@/lib/types/events";

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

/**
 * Insert a batch of events into the database
 * Uses parameterized queries via sql template literals for SQL injection safety
 * Plan-17 Iteration-18
 */
export async function insertEvents(events: EventPayload[]): Promise<void> {
  for (const event of events) {
    await sql`
      INSERT INTO events (
        session_id,
        visitor_hash,
        page_path,
        event_category,
        event_action,
        event_label,
        event_value,
        metadata
      ) VALUES (
        ${event.sessionId},
        ${event.visitorHash || null},
        ${event.pagePath},
        ${event.eventCategory},
        ${event.eventAction},
        ${event.eventLabel || null},
        ${event.eventValue || null},
        ${JSON.stringify(event.metadata || {})}
      )
    `;
  }
}

/**
 * Insert a single event into the database
 * Convenience wrapper around insertEvents
 */
export async function insertEvent(event: EventPayload): Promise<void> {
  await insertEvents([event]);
}

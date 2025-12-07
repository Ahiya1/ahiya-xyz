/**
 * Analytics Types
 * Shared TypeScript types for the analytics system
 */

/**
 * Data required to insert a new page view
 */
export interface PageViewInsert {
  path: string;
  referrer: string | null;
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  utmContent: string | null;
  utmTerm: string | null;
  sessionId: string;
  visitorHash: string;
  deviceType: "desktop" | "mobile" | "tablet";
  browser: string | null;
  browserVersion: string | null;
  os: string | null;
  osVersion: string | null;
  country: string | null;
  city: string | null;
  region: string | null;
  userAgent: string | null;
}

/**
 * Device information parsed from user agent
 */
export interface DeviceInfo {
  deviceType: "desktop" | "mobile" | "tablet";
  browser: string | null;
  browserVersion: string | null;
  os: string | null;
  osVersion: string | null;
}

/**
 * Session management info
 */
export interface SessionInfo {
  sessionId: string;
  isNew: boolean;
}

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { UAParser } from "ua-parser-js";

// ============================================================================
// Types
// ============================================================================

/**
 * Vercel Edge geo data (available only on Vercel)
 */
interface VercelGeo {
  country?: string;
  city?: string;
  region?: string;
  latitude?: string;
  longitude?: string;
}

/**
 * Extended NextRequest with Vercel Edge geo property
 */
interface NextRequestWithGeo extends NextRequest {
  geo?: VercelGeo;
}

/**
 * Device information parsed from user agent
 */
interface DeviceInfo {
  deviceType: "desktop" | "mobile" | "tablet";
  browser: string | null;
  browserVersion: string | null;
  os: string | null;
  osVersion: string | null;
}

/**
 * Session management info
 */
interface SessionInfo {
  sessionId: string;
  isNew: boolean;
}

/**
 * Data required to insert a new page view
 */
interface PageViewInsert {
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

// ============================================================================
// Constants
// ============================================================================

const SESSION_COOKIE_NAME = "ahiya_session";
const ADMIN_SESSION_COOKIE = "ahiya_admin_session";
const SESSION_MAX_AGE = 30 * 60; // 30 minutes in seconds

// ============================================================================
// Bot Detection
// ============================================================================

/**
 * Detect if user agent belongs to a bot/crawler
 */
function isBot(userAgent: string): boolean {
  const botPatterns = [
    /bot/i,
    /spider/i,
    /crawl/i,
    /slurp/i,
    /mediapartners/i,
    /Googlebot/i,
    /Bingbot/i,
    /Baiduspider/i,
    /YandexBot/i,
    /facebookexternalhit/i,
    /Twitterbot/i,
    /LinkedInBot/i,
    /Applebot/i,
    /DuckDuckBot/i,
    /Sogou/i,
    /Exabot/i,
    /ia_archiver/i,
    /MJ12bot/i,
    /AhrefsBot/i,
    /SemrushBot/i,
    /DotBot/i,
    /rogerbot/i,
    /PetalBot/i,
    /UptimeRobot/i,
    /Pingdom/i,
    /HeadlessChrome/i,
    /PhantomJS/i,
    /Lighthouse/i,
  ];
  return botPatterns.some((pattern) => pattern.test(userAgent));
}

// ============================================================================
// Session Management
// ============================================================================

/**
 * Get existing session ID from cookie or create a new one
 */
function getOrCreateSessionId(request: NextRequest): SessionInfo {
  const existingSession = request.cookies.get(SESSION_COOKIE_NAME)?.value;

  if (existingSession) {
    return { sessionId: existingSession, isNew: false };
  }

  return { sessionId: crypto.randomUUID(), isNew: true };
}

// ============================================================================
// Visitor Hash Generation (Privacy-Preserving)
// ============================================================================

/**
 * Generate a privacy-preserving visitor hash
 * Uses IP + User-Agent + Date + Salt to create daily-rotating hash
 */
async function generateVisitorHash(request: NextRequest): Promise<string> {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  const userAgent = request.headers.get("user-agent") || "";
  const date = new Date().toISOString().split("T")[0]; // YYYY-MM-DD format for daily rotation

  const input = `${ip}|${userAgent}|${date}|ahiya-analytics-salt-v1`;

  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);

  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

// ============================================================================
// User Agent Parsing
// ============================================================================

/**
 * Parse user agent string to extract device information
 */
function parseUserAgent(userAgent: string): DeviceInfo {
  const parser = new UAParser(userAgent);
  const result = parser.getResult();

  let deviceType: "desktop" | "mobile" | "tablet" = "desktop";
  const deviceTypeFromParser = result.device?.type;
  if (deviceTypeFromParser === "mobile") {
    deviceType = "mobile";
  } else if (deviceTypeFromParser === "tablet") {
    deviceType = "tablet";
  }

  return {
    deviceType,
    browser: result.browser?.name || null,
    browserVersion: result.browser?.version || null,
    os: result.os?.name || null,
    osVersion: result.os?.version || null,
  };
}

// ============================================================================
// UTM Parameter Extraction
// ============================================================================

/**
 * Extract UTM parameters from URL
 */
function extractUtmParams(url: URL): {
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  utmContent: string | null;
  utmTerm: string | null;
} {
  return {
    utmSource: url.searchParams.get("utm_source"),
    utmMedium: url.searchParams.get("utm_medium"),
    utmCampaign: url.searchParams.get("utm_campaign"),
    utmContent: url.searchParams.get("utm_content"),
    utmTerm: url.searchParams.get("utm_term"),
  };
}

// ============================================================================
// Geo Data Extraction
// ============================================================================

/**
 * Extract geographic data from Vercel Edge request
 * Note: geo data is only available on Vercel, will be null in local dev
 */
function extractGeoData(request: NextRequestWithGeo): {
  country: string | null;
  city: string | null;
  region: string | null;
} {
  // Vercel provides geo data on the request object in Edge runtime
  const geo = request.geo;

  return {
    country: geo?.country || null,
    city: geo?.city || null,
    region: geo?.region || null,
  };
}

// ============================================================================
// Async Tracking
// ============================================================================

/**
 * Send page view data to tracking API (non-blocking)
 */
async function trackPageView(
  request: NextRequestWithGeo,
  sessionId: string
): Promise<void> {
  try {
    const url = new URL(request.url);
    const userAgent = request.headers.get("user-agent") || "";

    // Generate visitor hash
    const visitorHash = await generateVisitorHash(request);

    // Parse user agent for device info
    const deviceInfo = parseUserAgent(userAgent);

    // Extract UTM parameters
    const utmParams = extractUtmParams(url);

    // Extract geo data
    const geoData = extractGeoData(request);

    // Build page view data
    const pageViewData: PageViewInsert = {
      path: url.pathname,
      referrer: request.headers.get("referer") || null,
      utmSource: utmParams.utmSource,
      utmMedium: utmParams.utmMedium,
      utmCampaign: utmParams.utmCampaign,
      utmContent: utmParams.utmContent,
      utmTerm: utmParams.utmTerm,
      sessionId,
      visitorHash,
      deviceType: deviceInfo.deviceType,
      browser: deviceInfo.browser,
      browserVersion: deviceInfo.browserVersion,
      os: deviceInfo.os,
      osVersion: deviceInfo.osVersion,
      country: geoData.country,
      city: geoData.city,
      region: geoData.region,
      userAgent: userAgent || null,
    };

    // Get the origin for the API call
    const origin = url.origin;

    // POST to tracking API
    await fetch(`${origin}/api/analytics/track`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pageViewData),
    });
  } catch (error) {
    // Log but don't throw - tracking should never block page load
    console.error("[Analytics Middleware] Tracking error:", error);
  }
}

// ============================================================================
// Main Middleware
// ============================================================================

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Get user agent
  const userAgent = request.headers.get("user-agent") || "";

  // Skip tracking for bots
  if (isBot(userAgent)) {
    return response;
  }

  // Skip tracking for admin users (when logged into admin panel)
  // This ensures your own page views don't pollute analytics
  if (request.cookies.get(ADMIN_SESSION_COOKIE)?.value) {
    return response;
  }

  // Get or create session ID
  const { sessionId, isNew } = getOrCreateSessionId(request);

  // Set session cookie if new
  if (isNew) {
    response.cookies.set(SESSION_COOKIE_NAME, sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: SESSION_MAX_AGE,
      path: "/",
    });
  }

  // Fire async tracking (non-blocking)
  const trackingPromise = trackPageView(request, sessionId);

  // Use waitUntil if available (Vercel Edge)
  // This keeps the function running to complete the tracking even after response is sent
  const extendedResponse = response as unknown as {
    waitUntil?: (promise: Promise<unknown>) => void;
  };

  if (
    typeof extendedResponse.waitUntil === "function"
  ) {
    extendedResponse.waitUntil(trackingPromise);
  } else {
    // Fire-and-forget fallback for environments without waitUntil
    trackingPromise.catch((err) =>
      console.error("[Analytics Middleware] Background tracking failed:", err)
    );
  }

  return response;
}

// ============================================================================
// Matcher Configuration
// ============================================================================

/**
 * Middleware matcher configuration
 * Excludes:
 * - /api/* routes
 * - /_next/* (Next.js internals)
 * - /admin/* (admin routes)
 * - Static files (images, fonts, etc.)
 * - favicon.ico
 */
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|webp|ico|woff|woff2|ttf|eot|css|js)$|admin).*)",
  ],
};

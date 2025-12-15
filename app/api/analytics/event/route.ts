/**
 * Analytics Event API
 * POST endpoint for receiving and storing behavioral events
 * Plan-17 Iteration-18
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { insertEvents } from "@/lib/db";
import type { EventPayload, EventBatchRequest, EventCategory } from "@/lib/types/events";

// Allowed event categories
const VALID_CATEGORIES: readonly EventCategory[] = ["scroll", "click", "engagement", "conversion"];

// Rate limiting: track batches per session per minute
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 60000; // 1 minute
const MAX_BATCHES_PER_MINUTE = 100;

/**
 * Clean up expired rate limit entries
 */
function cleanupRateLimits(): void {
  const now = Date.now();
  for (const [key, value] of rateLimitMap.entries()) {
    if (now > value.resetTime) {
      rateLimitMap.delete(key);
    }
  }
}

/**
 * Check if request is rate limited
 */
function isRateLimited(sessionId: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(sessionId);

  if (!entry || now > entry.resetTime) {
    // Start new window
    rateLimitMap.set(sessionId, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  // Increment count in current window
  entry.count++;
  if (entry.count > MAX_BATCHES_PER_MINUTE) {
    return true;
  }

  return false;
}

/**
 * Validate a single event payload
 */
function validateEvent(event: unknown): { valid: true; event: EventPayload } | { valid: false; error: string } {
  if (!event || typeof event !== "object") {
    return { valid: false, error: "Invalid event structure" };
  }

  const e = event as Record<string, unknown>;

  // Required fields
  if (typeof e.sessionId !== "string" || e.sessionId.length === 0 || e.sessionId.length > 36) {
    return { valid: false, error: "Invalid or missing sessionId" };
  }

  if (typeof e.pagePath !== "string" || e.pagePath.length === 0 || e.pagePath.length > 500) {
    return { valid: false, error: "Invalid or missing pagePath" };
  }

  if (typeof e.eventCategory !== "string") {
    return { valid: false, error: "Missing eventCategory" };
  }

  if (!VALID_CATEGORIES.includes(e.eventCategory as EventCategory)) {
    return { valid: false, error: "Invalid event category" };
  }

  if (typeof e.eventAction !== "string" || e.eventAction.length === 0) {
    return { valid: false, error: "Missing eventAction" };
  }

  if (e.eventAction.length > 100) {
    return { valid: false, error: "eventAction too long (max 100)" };
  }

  // Optional fields validation
  if (e.eventLabel !== undefined && e.eventLabel !== null) {
    if (typeof e.eventLabel !== "string") {
      return { valid: false, error: "eventLabel must be a string" };
    }
    if (e.eventLabel.length > 200) {
      return { valid: false, error: "eventLabel too long (max 200)" };
    }
    // Prevent PII in labels (basic check for email pattern)
    if (/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(e.eventLabel)) {
      return { valid: false, error: "eventLabel must not contain PII" };
    }
  }

  if (e.eventValue !== undefined && e.eventValue !== null) {
    if (typeof e.eventValue !== "number" || !Number.isInteger(e.eventValue)) {
      return { valid: false, error: "eventValue must be an integer" };
    }
  }

  if (e.visitorHash !== undefined && e.visitorHash !== null) {
    if (typeof e.visitorHash !== "string" || e.visitorHash.length > 64) {
      return { valid: false, error: "Invalid visitorHash" };
    }
  }

  if (e.metadata !== undefined && e.metadata !== null) {
    if (typeof e.metadata !== "object" || Array.isArray(e.metadata)) {
      return { valid: false, error: "metadata must be an object" };
    }
  }

  return {
    valid: true,
    event: {
      sessionId: e.sessionId as string,
      pagePath: e.pagePath as string,
      eventCategory: e.eventCategory as EventCategory,
      eventAction: e.eventAction as string,
      eventLabel: e.eventLabel as string | undefined,
      eventValue: e.eventValue as number | undefined,
      visitorHash: e.visitorHash as string | undefined,
      metadata: e.metadata as Record<string, unknown> | undefined,
    },
  };
}

export async function POST(request: NextRequest) {
  try {
    // Periodic cleanup of rate limit map
    if (Math.random() < 0.1) {
      cleanupRateLimits();
    }

    // Parse body
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }

    // Handle both single event and batch
    const rawEvents = Array.isArray((body as EventBatchRequest).events)
      ? (body as EventBatchRequest).events
      : [body];

    // Limit batch size
    if (rawEvents.length > 50) {
      return NextResponse.json(
        { error: "Batch too large (max 50)" },
        { status: 400 }
      );
    }

    if (rawEvents.length === 0) {
      return NextResponse.json(
        { error: "No events provided" },
        { status: 400 }
      );
    }

    // Validate all events
    const validatedEvents: EventPayload[] = [];
    for (const rawEvent of rawEvents) {
      const result = validateEvent(rawEvent);
      if (!result.valid) {
        return NextResponse.json({ error: result.error }, { status: 400 });
      }
      validatedEvents.push(result.event);
    }

    // Rate limiting check using first event's sessionId
    const sessionId = validatedEvents[0].sessionId;
    if (isRateLimited(sessionId)) {
      return NextResponse.json(
        { error: "Rate limit exceeded" },
        { status: 429 }
      );
    }

    // Insert events
    await insertEvents(validatedEvents);

    return NextResponse.json({ success: true, count: validatedEvents.length });
  } catch (error) {
    console.error("[Analytics Event] Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

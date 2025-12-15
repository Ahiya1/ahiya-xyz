/**
 * Client-Side Event Tracking Library
 * Handles event batching, DNT support, and reliable delivery
 * Plan-17 Iteration-18
 */

import type { EventPayload } from "@/lib/types/events";

// Configuration
const BATCH_INTERVAL_MS = 3000;
const MAX_BATCH_SIZE = 50;
const API_ENDPOINT = "/api/analytics/event";
const SESSION_KEY = "ahiya_client_session";
const SESSION_START_KEY = "ahiya_session_start";
const SESSION_TIMEOUT_MS = 30 * 60 * 1000; // 30 minutes

// State
let eventQueue: EventPayload[] = [];
let flushTimer: ReturnType<typeof setInterval> | null = null;
let isInitialized = false;

/**
 * Check if tracking should be enabled
 * Respects Do Not Track (DNT) header
 */
export function shouldTrack(): boolean {
  if (typeof window === "undefined") return false;
  if (typeof navigator === "undefined") return false;

  // Respect DNT header
  if (navigator.doNotTrack === "1") return false;

  // Also check window.doNotTrack (Firefox)
  if ((window as unknown as { doNotTrack?: string }).doNotTrack === "1") return false;

  return true;
}

/**
 * Get or create a session ID
 * Uses localStorage with 30-minute sliding expiry
 */
export function getSessionId(): string {
  if (typeof window === "undefined") return "";

  try {
    const stored = localStorage.getItem(SESSION_KEY);
    const sessionStart = sessionStorage.getItem(SESSION_START_KEY);
    const now = Date.now();

    // Check if session expired
    if (!stored || !sessionStart || now - parseInt(sessionStart, 10) > SESSION_TIMEOUT_MS) {
      const newId = crypto.randomUUID();
      localStorage.setItem(SESSION_KEY, newId);
      sessionStorage.setItem(SESSION_START_KEY, now.toString());
      return newId;
    }

    // Refresh session timestamp
    sessionStorage.setItem(SESSION_START_KEY, now.toString());
    return stored;
  } catch {
    // Handle private browsing mode or storage errors
    return crypto.randomUUID();
  }
}

/**
 * Get current page path
 */
function getPagePath(): string {
  if (typeof window === "undefined") return "";
  return window.location.pathname;
}

/**
 * Queue an event for batched sending
 */
function queueEvent(event: Omit<EventPayload, "sessionId" | "pagePath">): void {
  if (!shouldTrack()) return;

  const fullEvent: EventPayload = {
    ...event,
    sessionId: getSessionId(),
    pagePath: getPagePath(),
  };

  eventQueue.push(fullEvent);

  // Flush if batch is full
  if (eventQueue.length >= MAX_BATCH_SIZE) {
    flushEvents();
  }
}

/**
 * Send queued events to API
 */
export function flushEvents(): void {
  if (eventQueue.length === 0) return;

  const eventsToSend = [...eventQueue];
  eventQueue = [];

  // Use sendBeacon if available (works on page unload)
  if (typeof navigator !== "undefined" && navigator.sendBeacon) {
    navigator.sendBeacon(
      API_ENDPOINT,
      JSON.stringify({ events: eventsToSend })
    );
  } else if (typeof fetch !== "undefined") {
    // Fallback to fetch
    fetch(API_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ events: eventsToSend }),
      keepalive: true, // Allows request to complete after page unload
    }).catch(() => {
      // Silently fail - don't block user
    });
  }
}

/**
 * Start the flush timer
 */
function startFlushTimer(): void {
  if (flushTimer) return;

  flushTimer = setInterval(() => {
    flushEvents();
  }, BATCH_INTERVAL_MS);
}

/**
 * Stop the flush timer
 */
function stopFlushTimer(): void {
  if (flushTimer) {
    clearInterval(flushTimer);
    flushTimer = null;
  }
}

// ============ Public API ============

/**
 * Initialize tracking
 * Call once on app mount
 */
export function initTracking(): void {
  if (isInitialized) return;
  if (!shouldTrack()) return;
  if (typeof window === "undefined") return;

  isInitialized = true;
  startFlushTimer();

  // Flush on page unload
  window.addEventListener("beforeunload", () => {
    stopFlushTimer();
    flushEvents();
  });

  // Flush on visibility hidden (tab switch, minimize)
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
      flushEvents();
    }
  });
}

/**
 * Teardown tracking
 * Call on app unmount
 */
export function teardownTracking(): void {
  stopFlushTimer();
  flushEvents();
  isInitialized = false;
}

/**
 * Track scroll depth milestone
 */
export function trackScroll(depth: 25 | 50 | 75 | 100): void {
  queueEvent({
    eventCategory: "scroll",
    eventAction: `scroll_${depth}`,
    eventValue: depth,
  });
}

/**
 * Track generic event
 */
export function trackEvent(
  category: "scroll" | "click" | "engagement" | "conversion",
  action: string,
  label?: string,
  value?: number,
  metadata?: Record<string, unknown>
): void {
  queueEvent({
    eventCategory: category,
    eventAction: action,
    eventLabel: label,
    eventValue: value,
    metadata,
  });
}

/**
 * Track click event
 */
export function trackClick(category: string, label: string): void {
  queueEvent({
    eventCategory: "click",
    eventAction: `${category}_click`,
    eventLabel: label,
  });
}

/**
 * Track engagement event
 */
export function trackEngagement(timeMs: number): void {
  queueEvent({
    eventCategory: "engagement",
    eventAction: "time_on_page",
    eventValue: timeMs,
  });
}

/**
 * Track conversion event
 */
export function trackConversion(
  type: string,
  metadata?: Record<string, unknown>
): void {
  queueEvent({
    eventCategory: "conversion",
    eventAction: type,
    metadata,
  });
}

// Export for testing
export const _testing = {
  getEventQueue: () => eventQueue,
  clearEventQueue: () => { eventQueue = []; },
  getIsInitialized: () => isInitialized,
  setIsInitialized: (val: boolean) => { isInitialized = val; },
  resetState: () => {
    eventQueue = [];
    isInitialized = false;
    stopFlushTimer();
  },
};

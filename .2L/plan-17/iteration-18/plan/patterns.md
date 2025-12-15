# Code Patterns & Conventions

## File Structure

```
ahiya-xyz/
├── app/
│   ├── components/
│   │   ├── ambient/              # NEW: Ambient animation components
│   │   │   ├── AmbientParticles.tsx
│   │   │   ├── FloatingOrbs.tsx
│   │   │   ├── AmbientLayer.tsx
│   │   │   └── index.ts
│   │   ├── TrackingProvider.tsx  # NEW: Root-level tracking wrapper
│   │   └── [existing components]
│   ├── hooks/
│   │   ├── useReducedMotion.ts   # NEW: Reduced motion detection
│   │   ├── useScrollDepthTracker.ts  # NEW: Scroll milestone tracking
│   │   └── [existing hooks]
│   ├── api/
│   │   └── analytics/
│   │       ├── event/            # NEW: Event tracking endpoint
│   │       │   └── route.ts
│   │       └── [existing endpoints]
│   ├── globals.css               # MODIFY: Add keyframes
│   └── layout.tsx                # MODIFY: Integrate ambient + tracking
├── lib/
│   ├── tracking.ts               # NEW: Client-side tracking library
│   ├── db.ts                     # MODIFY: Add insertEvent
│   └── types/
│       ├── analytics.ts          # Existing PageViewInsert
│       └── events.ts             # NEW: Event types
└── scripts/
    └── schema.sql                # MODIFY: Add events table
```

## Naming Conventions

- **Components:** PascalCase (`AmbientParticles.tsx`)
- **Hooks:** camelCase with `use` prefix (`useReducedMotion.ts`)
- **Files:** camelCase (`tracking.ts`)
- **Types/Interfaces:** PascalCase (`EventPayload`)
- **Functions:** camelCase (`trackScroll()`)
- **Constants:** SCREAMING_SNAKE_CASE (`BATCH_INTERVAL_MS`)
- **CSS Classes:** kebab-case (`ambient-particle`)
- **CSS Keyframes:** kebab-case (`particle-float`)

## Import Order Convention

```typescript
// 1. React and Next.js imports
"use client";
import { useState, useEffect, useRef, useMemo } from "react";
import { usePathname } from "next/navigation";

// 2. External libraries (if any)
import { sql } from "@vercel/postgres";

// 3. Internal absolute imports
import { trackScroll } from "@/lib/tracking";
import type { EventPayload } from "@/lib/types/events";

// 4. Relative imports
import { AmbientParticles } from "./AmbientParticles";

// 5. Type-only imports (at end)
import type { ReactNode } from "react";
```

---

## Animation Patterns

### Pattern: CSS Keyframes for Ambient Animations

**When to use:** Continuous animations that run without user interaction

**CSS Pattern:**
```css
/* ========== PLAN-17 ITERATION-18: Ambient Particles ========== */

@keyframes particle-float {
  0%, 100% {
    transform: translateY(0) translateX(0) scale(1);
    opacity: 0.15;
  }
  25% {
    transform: translateY(-15vh) translateX(3vw) scale(1.05);
    opacity: 0.25;
  }
  50% {
    transform: translateY(-30vh) translateX(-2vw) scale(0.95);
    opacity: 0.2;
  }
  75% {
    transform: translateY(-15vh) translateX(4vw) scale(1.02);
    opacity: 0.22;
  }
}

.ambient-particle {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  will-change: transform, opacity;
  animation: particle-float var(--particle-duration, 20s) ease-in-out infinite;
  animation-delay: var(--particle-delay, 0s);
}

/* Speed variants */
.ambient-particle-slow { --particle-duration: 25s; }
.ambient-particle-medium { --particle-duration: 20s; }
.ambient-particle-fast { --particle-duration: 15s; }

/* ========== END PLAN-17 ITERATION-18 ========== */
```

**Key Points:**
- Use `transform` and `opacity` only (GPU-accelerated)
- Use CSS custom properties for duration/delay variants
- Include `will-change` hint
- Group by plan/iteration with comment headers

---

### Pattern: Floating Orbs with Blur

**When to use:** Large atmospheric elements in corners

**CSS Pattern:**
```css
@keyframes orb-drift {
  0%, 100% {
    transform: translate(0, 0) scale(1);
    opacity: 0.15;
  }
  33% {
    transform: translate(20px, -30px) scale(1.05);
    opacity: 0.2;
  }
  66% {
    transform: translate(-15px, 20px) scale(0.98);
    opacity: 0.12;
  }
}

.floating-orb {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  will-change: transform, opacity;
  filter: blur(80px);
  animation: orb-drift var(--orb-duration, 25s) ease-in-out infinite;
}

/* Orb variants */
.floating-orb-purple {
  background: rgba(168, 85, 247, 0.4);
}

.floating-orb-cyan {
  background: rgba(34, 211, 238, 0.3);
}

.floating-orb-pink {
  background: rgba(236, 72, 153, 0.3);
}
```

**Key Points:**
- Large blur radius (60-100px) for atmospheric effect
- Very low opacity (0.1-0.2)
- Position partially off-screen for subtlety

---

### Pattern: Enhanced Breathing Gradient

**When to use:** Modify existing hero gradient for faster, more visible animation

**CSS Modification:**
```css
/* BEFORE (existing - too slow at 25s) */
.hero-gradient-bg::before {
  animation: gradient-shift 25s ease-in-out infinite;
}

/* AFTER (enhanced - 8-12s, more visible) */
.hero-gradient-bg::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(168, 85, 247, 0.12) 0%,
    rgba(139, 92, 246, 0.08) 25%,
    rgba(99, 102, 241, 0.10) 50%,
    rgba(168, 85, 247, 0.06) 75%,
    rgba(139, 92, 246, 0.12) 100%
  );
  background-size: 200% 200%;
  animation: gradient-shift 10s ease-in-out infinite;
  pointer-events: none;
  z-index: 0;
}
```

**Key Points:**
- Increased opacity range (0.06-0.12 instead of 0.04-0.08)
- Faster cycle (10s instead of 25s)
- Still subtle but noticeable

---

### Pattern: Reduced Motion Support

**When to use:** ALL animation CSS must include this

**CSS Pattern:**
```css
/* Place at end of animation section */
@media (prefers-reduced-motion: reduce) {
  .ambient-particle,
  .floating-orb {
    animation: none;
    /* Show static visible state */
    opacity: 0.15;
  }

  .hero-gradient-bg::before {
    animation: none;
  }
}
```

**Key Points:**
- Group all animation overrides in single media query
- Set static opacity so elements remain visible but don't move
- MUST be included for every animated element

---

## Component Patterns

### Pattern: Ambient Particle Component

**When to use:** Generating multiple particles with CSS classes

```typescript
// app/components/ambient/AmbientParticles.tsx
"use client";

import { useMemo, useState, useEffect } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  speed: "slow" | "medium" | "fast";
  color: "purple" | "white";
}

// Deterministic generation to avoid hydration mismatch
function generateParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: ((i * 37 + 13) % 100),  // Pseudo-random but deterministic
    y: ((i * 53 + 7) % 100),
    size: 2 + ((i * 7) % 5),   // 2-6px
    delay: ((i * 1.3) % 10),   // 0-10s delay
    speed: (["slow", "medium", "fast"] as const)[i % 3],
    color: (i % 4 === 0 ? "white" : "purple") as Particle["color"],
  }));
}

export function AmbientParticles() {
  const [particleCount, setParticleCount] = useState(20);

  // Reduce particles on mobile
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    setParticleCount(mq.matches ? 10 : 20);

    const handler = (e: MediaQueryListEvent) => {
      setParticleCount(e.matches ? 10 : 20);
    };

    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const particles = useMemo(
    () => generateParticles(particleCount),
    [particleCount]
  );

  return (
    <>
      {particles.map((p) => (
        <div
          key={p.id}
          className={`ambient-particle ambient-particle-${p.speed}`}
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDelay: `${p.delay}s`,
            backgroundColor:
              p.color === "purple"
                ? "rgba(168, 85, 247, 0.4)"
                : "rgba(255, 255, 255, 0.3)",
          }}
        />
      ))}
    </>
  );
}
```

**Key Points:**
- Deterministic particle generation (avoid hydration mismatch)
- Mobile-responsive particle count
- CSS classes for animation variants
- Inline styles for position/color (varies per particle)

---

### Pattern: Ambient Layer Wrapper

**When to use:** Container for all ambient elements in root layout

```typescript
// app/components/ambient/AmbientLayer.tsx
"use client";

import { AmbientParticles } from "./AmbientParticles";
import { FloatingOrbs } from "./FloatingOrbs";

export function AmbientLayer() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      <AmbientParticles />
      <FloatingOrbs />
    </div>
  );
}
```

**Key Points:**
- `fixed inset-0` covers entire viewport
- `pointer-events-none` prevents interaction blocking
- `z-index: 0` places below body texture (z-index: 1)
- `aria-hidden="true"` for accessibility
- `overflow-hidden` contains orbs that extend past viewport

---

### Pattern: useReducedMotion Hook

**When to use:** Any component needing to check reduced motion preference

```typescript
// app/hooks/useReducedMotion.ts
"use client";

import { useState, useEffect } from "react";

/**
 * Hook to detect user's reduced motion preference
 * Returns true if user prefers reduced motion
 */
export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return prefersReducedMotion;
}
```

**Key Points:**
- Returns boolean, not object
- Listens for preference changes
- SSR-safe (defaults to false)

---

## API Patterns

### Pattern: Event Tracking Endpoint

**When to use:** POST endpoint for receiving analytics events

```typescript
// app/api/analytics/event/route.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { insertEvents } from "@/lib/db";
import type { EventPayload, EventBatchRequest } from "@/lib/types/events";

// Allowed event categories
const VALID_CATEGORIES = ["scroll", "click", "engagement", "conversion"] as const;

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as EventBatchRequest;

    // Handle both single event and batch
    const events: EventPayload[] = body.events || [body as unknown as EventPayload];

    // Validate events
    for (const event of events) {
      if (!event.sessionId || !event.pagePath || !event.eventCategory || !event.eventAction) {
        return NextResponse.json(
          { error: "Missing required fields" },
          { status: 400 }
        );
      }

      if (!VALID_CATEGORIES.includes(event.eventCategory as typeof VALID_CATEGORIES[number])) {
        return NextResponse.json(
          { error: "Invalid event category" },
          { status: 400 }
        );
      }

      if (event.eventAction.length > 100) {
        return NextResponse.json(
          { error: "eventAction too long (max 100)" },
          { status: 400 }
        );
      }

      if (event.eventLabel && event.eventLabel.length > 200) {
        return NextResponse.json(
          { error: "eventLabel too long (max 200)" },
          { status: 400 }
        );
      }
    }

    // Insert events
    await insertEvents(events);

    return NextResponse.json({ success: true, count: events.length });
  } catch (error) {
    console.error("[Analytics Event] Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
```

**Key Points:**
- Validates all required fields
- Validates event category against whitelist
- Length limits on string fields
- Handles both single event and batch
- Returns count of inserted events

---

### Pattern: Database Insert for Events

**When to use:** Inserting single or batch events

```typescript
// lib/db.ts (addition to existing file)
import { sql } from "@vercel/postgres";
import type { EventPayload } from "@/lib/types/events";

/**
 * Insert a batch of events
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
 * Insert a single event
 */
export async function insertEvent(event: EventPayload): Promise<void> {
  await insertEvents([event]);
}
```

**Key Points:**
- Uses SQL template literals (injection-safe)
- Handles null values properly
- JSON.stringify for metadata JSONB field
- Batch function iterates (can optimize with multi-row insert later)

---

## Tracking Library Patterns

### Pattern: Client-Side Event Tracking

**When to use:** All client-side analytics functionality

```typescript
// lib/tracking.ts
"use client";

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
let flushTimer: ReturnType<typeof setTimeout> | null = null;
let isInitialized = false;

/**
 * Check if tracking should be enabled
 * Respects Do Not Track header
 */
function shouldTrack(): boolean {
  if (typeof window === "undefined") return false;
  if (typeof navigator === "undefined") return false;

  // Respect DNT
  if (navigator.doNotTrack === "1") return false;

  return true;
}

/**
 * Get or create a session ID
 * Uses localStorage with 30-minute sliding expiry
 */
function getSessionId(): string {
  if (typeof window === "undefined") return "";

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
function flushEvents(): void {
  if (eventQueue.length === 0) return;

  const eventsToSend = [...eventQueue];
  eventQueue = [];

  // Use sendBeacon if available (works on page unload)
  if (navigator.sendBeacon) {
    navigator.sendBeacon(
      API_ENDPOINT,
      JSON.stringify({ events: eventsToSend })
    );
  } else {
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
```

**Key Points:**
- DNT respect check first
- Session ID with 30-minute sliding expiry
- Event batching with 3-second interval
- sendBeacon for reliable unload delivery
- Public API is simple function exports

---

### Pattern: Scroll Depth Tracker Hook

**When to use:** Track scroll milestones on a page

```typescript
// app/hooks/useScrollDepthTracker.ts
"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { trackScroll } from "@/lib/tracking";

interface UseScrollDepthTrackerOptions {
  milestones?: number[];
  throttleMs?: number;
}

/**
 * Hook to track scroll depth milestones
 * Fires events at 25%, 50%, 75%, 100% scroll positions
 */
export function useScrollDepthTracker(
  options: UseScrollDepthTrackerOptions = {}
): void {
  const { milestones = [25, 50, 75, 100], throttleMs = 250 } = options;
  const pathname = usePathname();
  const hitMilestones = useRef<Set<number>>(new Set());
  const lastScrollTime = useRef<number>(0);

  useEffect(() => {
    // Reset milestones on navigation
    hitMilestones.current = new Set();

    const handleScroll = () => {
      const now = Date.now();

      // Throttle scroll events
      if (now - lastScrollTime.current < throttleMs) return;
      lastScrollTime.current = now;

      // Calculate scroll percentage
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      const scrollTop = window.scrollY;

      // Handle edge case where page is not scrollable
      if (scrollHeight <= clientHeight) {
        // Page fits in viewport - mark 100% immediately
        if (!hitMilestones.current.has(100)) {
          hitMilestones.current.add(100);
          trackScroll(100);
        }
        return;
      }

      const scrollPercent = (scrollTop / (scrollHeight - clientHeight)) * 100;

      // Check each milestone
      for (const milestone of milestones) {
        if (scrollPercent >= milestone && !hitMilestones.current.has(milestone)) {
          hitMilestones.current.add(milestone);
          trackScroll(milestone as 25 | 50 | 75 | 100);
        }
      }
    };

    // Check initial position (user might land mid-page via anchor)
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname, milestones, throttleMs]);
}
```

**Key Points:**
- Resets milestones on navigation (pathname change)
- Throttles scroll events for performance
- Uses passive listener
- Handles non-scrollable pages
- Fire-once per milestone per page load

---

### Pattern: Tracking Provider

**When to use:** Root layout wrapper for initializing tracking

```typescript
// app/components/TrackingProvider.tsx
"use client";

import { useEffect } from "react";
import { initTracking, teardownTracking } from "@/lib/tracking";
import { useScrollDepthTracker } from "@/app/hooks/useScrollDepthTracker";

interface TrackingProviderProps {
  children: React.ReactNode;
}

export function TrackingProvider({ children }: TrackingProviderProps) {
  // Initialize tracking lifecycle
  useEffect(() => {
    initTracking();
    return () => teardownTracking();
  }, []);

  // Track scroll depth on all pages
  useScrollDepthTracker();

  return <>{children}</>;
}
```

**Key Points:**
- Simple wrapper component
- Initializes on mount, tears down on unmount
- Scroll tracking for all pages via single hook call
- Renders children unchanged

---

## Testing Patterns

### Test File Naming Conventions

- Unit tests: `{module}.test.ts` (same directory as module)
- Integration tests: `{feature}.integration.test.ts` (in `__tests__/` directory)
- E2E tests: `{flow}.e2e.test.ts` (in `e2e/` directory)

### Test File Structure

```typescript
// lib/tracking.test.ts
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

// Mock browser APIs before importing module
const mockSendBeacon = vi.fn();
const mockAddEventListener = vi.fn();
const mockRemoveEventListener = vi.fn();

vi.stubGlobal("navigator", {
  doNotTrack: "0",
  sendBeacon: mockSendBeacon,
});

vi.stubGlobal("window", {
  location: { pathname: "/test" },
  addEventListener: mockAddEventListener,
  removeEventListener: mockRemoveEventListener,
});

vi.stubGlobal("document", {
  addEventListener: vi.fn(),
  visibilityState: "visible",
});

vi.stubGlobal("localStorage", {
  getItem: vi.fn(),
  setItem: vi.fn(),
});

vi.stubGlobal("sessionStorage", {
  getItem: vi.fn(),
  setItem: vi.fn(),
});

vi.stubGlobal("crypto", {
  randomUUID: vi.fn(() => "test-uuid-1234"),
});

// Import after mocks
import { initTracking, teardownTracking, trackScroll, trackClick } from "./tracking";

describe("tracking library", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    teardownTracking();
    vi.useRealTimers();
  });

  describe("shouldTrack", () => {
    it("should respect DNT header", async () => {
      vi.stubGlobal("navigator", { doNotTrack: "1", sendBeacon: mockSendBeacon });

      initTracking();
      trackScroll(25);

      // Advance timer past flush interval
      vi.advanceTimersByTime(4000);

      expect(mockSendBeacon).not.toHaveBeenCalled();
    });
  });

  describe("trackScroll", () => {
    it("should queue scroll events with correct structure", () => {
      vi.stubGlobal("navigator", { doNotTrack: "0", sendBeacon: mockSendBeacon });

      initTracking();
      trackScroll(50);

      // Advance timer to trigger flush
      vi.advanceTimersByTime(4000);

      expect(mockSendBeacon).toHaveBeenCalledWith(
        "/api/analytics/event",
        expect.stringContaining('"eventCategory":"scroll"')
      );
      expect(mockSendBeacon).toHaveBeenCalledWith(
        "/api/analytics/event",
        expect.stringContaining('"eventAction":"scroll_50"')
      );
    });
  });

  describe("event batching", () => {
    it("should batch multiple events into single request", () => {
      vi.stubGlobal("navigator", { doNotTrack: "0", sendBeacon: mockSendBeacon });

      initTracking();
      trackScroll(25);
      trackScroll(50);
      trackClick("cta", "hero_button");

      vi.advanceTimersByTime(4000);

      expect(mockSendBeacon).toHaveBeenCalledTimes(1);

      const payload = mockSendBeacon.mock.calls[0][1];
      const parsed = JSON.parse(payload);
      expect(parsed.events).toHaveLength(3);
    });
  });
});
```

### API Route Test Pattern

```typescript
// app/api/analytics/event/route.test.ts
import { describe, it, expect, vi, beforeEach } from "vitest";
import { POST } from "./route";
import { NextRequest } from "next/server";

// Mock database
vi.mock("@/lib/db", () => ({
  insertEvents: vi.fn().mockResolvedValue(undefined),
}));

import { insertEvents } from "@/lib/db";

describe("POST /api/analytics/event", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should accept valid event batch", async () => {
    const request = new NextRequest("http://localhost/api/analytics/event", {
      method: "POST",
      body: JSON.stringify({
        events: [
          {
            sessionId: "test-session-123",
            pagePath: "/",
            eventCategory: "scroll",
            eventAction: "scroll_25",
            eventValue: 25,
          },
        ],
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual({ success: true, count: 1 });
    expect(insertEvents).toHaveBeenCalledTimes(1);
  });

  it("should reject missing required fields", async () => {
    const request = new NextRequest("http://localhost/api/analytics/event", {
      method: "POST",
      body: JSON.stringify({
        events: [
          {
            sessionId: "test-session-123",
            // Missing pagePath, eventCategory, eventAction
          },
        ],
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe("Missing required fields");
  });

  it("should reject invalid event category", async () => {
    const request = new NextRequest("http://localhost/api/analytics/event", {
      method: "POST",
      body: JSON.stringify({
        events: [
          {
            sessionId: "test-session-123",
            pagePath: "/",
            eventCategory: "invalid_category",
            eventAction: "test_action",
          },
        ],
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe("Invalid event category");
  });
});
```

### Hook Test Pattern

```typescript
// app/hooks/useScrollDepthTracker.test.ts
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useScrollDepthTracker } from "./useScrollDepthTracker";

// Mock tracking library
vi.mock("@/lib/tracking", () => ({
  trackScroll: vi.fn(),
}));

// Mock next/navigation
vi.mock("next/navigation", () => ({
  usePathname: vi.fn(() => "/test"),
}));

import { trackScroll } from "@/lib/tracking";

describe("useScrollDepthTracker", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    // Mock document dimensions
    Object.defineProperty(document.documentElement, "scrollHeight", {
      value: 2000,
      configurable: true,
    });
    Object.defineProperty(document.documentElement, "clientHeight", {
      value: 500,
      configurable: true,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should track 25% scroll milestone", () => {
    renderHook(() => useScrollDepthTracker());

    // Simulate scroll to 25%
    Object.defineProperty(window, "scrollY", { value: 375, configurable: true });

    act(() => {
      window.dispatchEvent(new Event("scroll"));
    });

    expect(trackScroll).toHaveBeenCalledWith(25);
  });

  it("should not fire same milestone twice", () => {
    renderHook(() => useScrollDepthTracker());

    // First scroll to 25%
    Object.defineProperty(window, "scrollY", { value: 375, configurable: true });
    act(() => {
      window.dispatchEvent(new Event("scroll"));
    });

    // Scroll again at 25%
    act(() => {
      window.dispatchEvent(new Event("scroll"));
    });

    expect(trackScroll).toHaveBeenCalledTimes(1);
  });
});
```

### Coverage Expectations by Module Type

| Module Type | Minimum Coverage | Target Coverage |
|-------------|------------------|-----------------|
| lib/tracking.ts | 80% | 90% |
| API Routes | 80% | 90% |
| Hooks | 75% | 85% |
| Components (ambient) | 60% | 70% |

### Test Data Factories

```typescript
// lib/test-utils/factories.ts

import type { EventPayload } from "@/lib/types/events";

export function createMockEvent(
  overrides: Partial<EventPayload> = {}
): EventPayload {
  return {
    sessionId: "test-session-uuid",
    pagePath: "/",
    eventCategory: "scroll",
    eventAction: "scroll_25",
    eventValue: 25,
    ...overrides,
  };
}

export function createMockEventBatch(count: number): EventPayload[] {
  return Array.from({ length: count }, (_, i) =>
    createMockEvent({
      eventAction: `scroll_${(i + 1) * 25}`,
      eventValue: (i + 1) * 25,
    })
  );
}
```

---

## Security Patterns

### Input Validation Pattern

**When to use:** All API endpoints accepting user data

```typescript
// Validation in API route
const VALID_CATEGORIES = ["scroll", "click", "engagement", "conversion"] as const;
type ValidCategory = typeof VALID_CATEGORIES[number];

function validateEvent(event: unknown): event is EventPayload {
  if (!event || typeof event !== "object") return false;

  const e = event as Record<string, unknown>;

  // Required fields
  if (typeof e.sessionId !== "string" || e.sessionId.length !== 36) return false;
  if (typeof e.pagePath !== "string" || e.pagePath.length > 500) return false;
  if (typeof e.eventCategory !== "string") return false;
  if (typeof e.eventAction !== "string" || e.eventAction.length > 100) return false;

  // Category whitelist
  if (!VALID_CATEGORIES.includes(e.eventCategory as ValidCategory)) return false;

  // Optional fields
  if (e.eventLabel !== undefined && typeof e.eventLabel !== "string") return false;
  if (e.eventLabel && e.eventLabel.length > 200) return false;
  if (e.eventValue !== undefined && typeof e.eventValue !== "number") return false;

  return true;
}
```

### DNT Support Pattern

**When to use:** Client-side tracking code

```typescript
function shouldTrack(): boolean {
  if (typeof navigator === "undefined") return false;

  // Respect Do Not Track
  if (navigator.doNotTrack === "1") return false;

  // Also check window.doNotTrack (Firefox)
  if ((window as { doNotTrack?: string }).doNotTrack === "1") return false;

  return true;
}
```

### Secure API Endpoint Pattern

```typescript
// Full validation example
export async function POST(request: NextRequest) {
  try {
    // 1. Parse body
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }

    // 2. Validate structure
    const events = Array.isArray((body as { events?: unknown[] }).events)
      ? (body as { events: unknown[] }).events
      : [body];

    // 3. Validate each event
    for (const event of events) {
      if (!validateEvent(event)) {
        return NextResponse.json(
          { error: "Invalid event structure" },
          { status: 400 }
        );
      }
    }

    // 4. Limit batch size
    if (events.length > 50) {
      return NextResponse.json(
        { error: "Batch too large (max 50)" },
        { status: 400 }
      );
    }

    // 5. Process validated data
    await insertEvents(events as EventPayload[]);

    return NextResponse.json({ success: true, count: events.length });
  } catch (error) {
    // 6. Never expose internal errors
    console.error("[Analytics Event] Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
```

---

## Error Handling Patterns

### API Error Response Format

```typescript
interface ErrorResponse {
  error: string;  // Human-readable message
}

// Standard error responses
return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
return NextResponse.json({ error: "Invalid event category" }, { status: 400 });
return NextResponse.json({ error: "Internal server error" }, { status: 500 });
```

### Client-Side Silent Failure

**When to use:** Analytics/tracking code should never break the app

```typescript
// In tracking.ts
function flushEvents(): void {
  if (eventQueue.length === 0) return;

  const eventsToSend = [...eventQueue];
  eventQueue = [];

  if (navigator.sendBeacon) {
    navigator.sendBeacon(API_ENDPOINT, JSON.stringify({ events: eventsToSend }));
    // sendBeacon doesn't throw, fire-and-forget
  } else {
    fetch(API_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ events: eventsToSend }),
      keepalive: true,
    }).catch(() => {
      // INTENTIONALLY SILENT
      // Tracking failures should never impact user experience
    });
  }
}
```

### Logging Approach

```typescript
// In API routes - log errors for debugging
console.error("[Analytics Event] Error:", error);

// In client code - use console.warn for debugging, remove in production
if (process.env.NODE_ENV === "development") {
  console.warn("[Tracking] Event queued:", event);
}
```

---

## Database Patterns

### Events Table Schema

```sql
-- Add to scripts/schema.sql

-- Events table for behavioral tracking
CREATE TABLE IF NOT EXISTS events (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  session_id VARCHAR(36) NOT NULL,
  visitor_hash VARCHAR(64),
  page_path VARCHAR(500) NOT NULL,
  event_category VARCHAR(50) NOT NULL,
  event_action VARCHAR(100) NOT NULL,
  event_label VARCHAR(200),
  event_value INTEGER,
  metadata JSONB DEFAULT '{}'::jsonb
);

-- Indexes for query performance
CREATE INDEX IF NOT EXISTS idx_events_created_at ON events (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_events_session_id ON events (session_id);
CREATE INDEX IF NOT EXISTS idx_events_category ON events (event_category);
CREATE INDEX IF NOT EXISTS idx_events_path_category ON events (page_path, event_category);
CREATE INDEX IF NOT EXISTS idx_events_category_action ON events (event_category, event_action);
```

### Database Insert Pattern

```typescript
// Using SQL template literals (existing pattern in codebase)
import { sql } from "@vercel/postgres";

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
```

---

## Type Definitions

### Event Types

```typescript
// lib/types/events.ts

/**
 * Valid event categories
 */
export type EventCategory = "scroll" | "click" | "engagement" | "conversion";

/**
 * Event payload for tracking
 */
export interface EventPayload {
  sessionId: string;
  visitorHash?: string;
  pagePath: string;
  eventCategory: EventCategory;
  eventAction: string;
  eventLabel?: string;
  eventValue?: number;
  metadata?: Record<string, unknown>;
}

/**
 * Batch request to event API
 */
export interface EventBatchRequest {
  events: EventPayload[];
}

/**
 * Event API success response
 */
export interface EventSuccessResponse {
  success: true;
  count: number;
}

/**
 * Event API error response
 */
export interface EventErrorResponse {
  error: string;
}
```

---

## Root Layout Integration

### Final Layout Pattern

```typescript
// app/layout.tsx
import "./globals.css";
import { Inter, Crimson_Text } from "next/font/google";
import type { Metadata, Viewport } from "next";
import { AmbientLayer } from "@/app/components/ambient";
import { TrackingProvider } from "@/app/components/TrackingProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const crimson = Crimson_Text({
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  variable: "--font-crimson",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  // ... existing metadata
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${crimson.variable}`}>
      <head>
        {/* ... existing head content */}
      </head>
      <body className={inter.className}>
        <AmbientLayer />
        <TrackingProvider>
          {children}
        </TrackingProvider>
      </body>
    </html>
  );
}
```

**Key Points:**
- AmbientLayer is outside TrackingProvider (purely visual, no tracking)
- TrackingProvider wraps children (all pages get scroll tracking)
- Order: AmbientLayer first (z-index: 0), then content (z-index: 1+)

---

**Patterns Status:** COMPLETE
**Ready for:** Builder Task Breakdown

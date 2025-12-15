# Explorer 2 Report: Analytics Infrastructure & Database Schema

## Executive Summary

The existing analytics system provides a solid foundation for behavioral tracking. The infrastructure already includes Vercel Postgres integration, a middleware-based page view tracking system, session management with privacy-preserving visitor hashes, and a well-organized admin dashboard. Iteration 18 requires adding an `events` table for behavioral tracking, a new `/api/analytics/event` endpoint, a client-side tracking library with batching and DNT support, and scroll depth tracking integration across all public pages.

## Discoveries

### Existing Database Schema

**Location:** `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/scripts/schema.sql`

The current `page_views` table has 18 columns:
- Core identifiers: `id`, `created_at`, `path`
- Session tracking: `session_id` (UUID), `visitor_hash` (SHA-256)
- UTM parameters: `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`
- Device info: `device_type`, `browser`, `browser_version`, `os`, `os_version`
- Geo data: `country`, `city`, `region`
- Raw data: `referrer`, `user_agent`

**Existing indexes:**
- `idx_page_views_created_at` (DESC)
- `idx_page_views_path`
- `idx_page_views_session_id`
- `idx_page_views_utm_campaign` (partial index)
- `idx_page_views_path_created` (compound)
- `idx_page_views_visitor_hash`

### Database Utilities

**Location:** `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/lib/db.ts`

Pattern established:
- Uses `@vercel/postgres` `sql` template literals
- Type-safe with `PageViewInsert` interface
- SQL injection safe via parameterized queries
- Simple async function pattern (no class)

### Existing Analytics API Endpoints

**Location:** `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/api/analytics/`

1. **`/track/route.ts`** - POST endpoint for page view insertion
   - Validates `path`, `sessionId`, `visitorHash`
   - Returns `{ success: true }` or error
   - Simple, minimal error handling

2. **`/overview/route.ts`** - GET endpoint for dashboard metrics
   - Supports `range` query param (today, 7d, 30d, 90d)
   - Calculates metrics with period comparisons
   - Returns sparkline data for charts
   - **Note:** `avgDuration` is hardcoded placeholder (45s)

3. **`/pages/route.ts`** - GET endpoint for per-page metrics
   - Complex CTEs for entry/exit/bounce calculations
   - Supports sorting and time range filtering
   - **Note:** `avgTimeOnPage` returns 0 (placeholder)

4. Other endpoints: `/realtime`, `/export`, `/acquisition`, `/visitors`

### Middleware Architecture

**Location:** `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/middleware.ts`

Key features:
- Bot detection with 25+ patterns
- Admin session exclusion from analytics
- Vulnerability scanner probe filtering
- Session cookie management (`ahiya_session`, 30-min expiry)
- Privacy-preserving visitor hash (IP + UA + Date + Salt, SHA-256)
- Uses `waitUntil` for non-blocking tracking on Vercel Edge

**Matcher excludes:**
- `/api/*`
- `/_next/*`
- `/admin/*`
- Static files
- favicon.ico

### Client-Side Hooks

**Location:** `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/hooks/`

Existing hooks:
- `useScrollReveal.ts` - IntersectionObserver for scroll-triggered reveals
- `useCountUp.ts` - Number animation utility

**Pattern:** Simple, focused hooks with clear interfaces.

### Admin Dashboard Structure

**Location:** `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/admin/`

Components available:
- `AdminSidebar.tsx` - Navigation with 6 items (Overview, Real-Time, Pages, Acquisition, Visitors, Export)
- `MetricCard.tsx` - Sparkline charts with Recharts
- `DataTable.tsx` - Sortable tables
- `TimeRangeSelector.tsx` - Range picker component

**Dashboard patterns:**
- Uses SWR for data fetching with 30s refresh
- Glass-morphism styling with purple accents
- Responsive grid layouts

### Public Pages Structure

**Location:** `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/`

Public pages to integrate scroll tracking:
- `/page.tsx` (homepage)
- `/pricing/page.tsx`
- `/2l/page.tsx`
- `/cv/page.tsx`
- `/capabilities/page.tsx`
- `/projects/mirror-of-dreams/page.tsx`
- `/projects/selahreach/page.tsx`
- `/projects/statviz/page.tsx`
- `/projects/ai-research-pipeline/page.tsx`
- `/soul/*` pages (9 pages)

**Page structure pattern:**
- All are client components (`"use client"`)
- Include `<Navigation />` and `<Footer />`
- Use `section-breathing` class for sections

## Patterns Identified

### API Endpoint Pattern

**Description:** Consistent pattern for analytics API routes
**Use Case:** New `/api/analytics/event` endpoint
**Example:**
```typescript
// Pattern from /api/analytics/track/route.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    // Validate required fields
    if (!body.required_field) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    // Insert into database
    await insertFunction(body);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[Tag] Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
```
**Recommendation:** Follow this exact pattern for the event endpoint

### Database Insert Pattern

**Description:** Type-safe SQL insertions
**Use Case:** Event insertion function
**Example:**
```typescript
// Pattern from /lib/db.ts
import { sql } from "@vercel/postgres";
import type { EventInsert } from "@/lib/types/analytics";

export async function insertEvent(data: EventInsert): Promise<void> {
  await sql`
    INSERT INTO events (column1, column2, ...)
    VALUES (${data.field1}, ${data.field2}, ...)
  `;
}
```
**Recommendation:** Add `insertEvent` function to `/lib/db.ts`

### Hook Pattern

**Description:** Simple React hooks with TypeScript interfaces
**Use Case:** `useScrollDepthTracker` hook
**Example:**
```typescript
// Pattern from /app/hooks/useScrollReveal.ts
"use client";

import { useEffect, useRef, useState } from "react";

interface UseHookOptions {
  option1?: number;
  option2?: boolean;
}

export function useHookName(options: UseHookOptions = {}) {
  const { option1 = defaultValue } = options;
  const ref = useRef<HTMLElement>(null);
  const [state, setState] = useState(initialValue);

  useEffect(() => {
    // Logic here
    return () => { /* cleanup */ };
  }, [dependencies]);

  return { ref, state };
}
```
**Recommendation:** Follow this pattern for scroll depth tracker

## Complexity Assessment

### High Complexity Areas

**Client-Side Tracking Library (`/lib/tracking.ts`)**
- Event batching with 3-second intervals
- `sendBeacon` for reliable page unload tracking
- DNT (Do Not Track) header respect
- Debouncing/throttling for scroll events
- Session ID retrieval from cookie
- **Estimated effort:** 2-3 hours

### Medium Complexity Areas

**Events Table Schema + API Endpoint**
- Schema design with proper indexes
- Input validation with rate limiting considerations
- Batch insert support for efficiency
- **Estimated effort:** 1-2 hours

**useScrollDepthTracker Hook**
- IntersectionObserver for 25/50/75/100% milestones
- Integration with tracking library
- Fire-once per milestone per page load
- **Estimated effort:** 1-2 hours

### Low Complexity Areas

**Public Page Integration**
- Import and use hook on each page
- Straightforward pattern application
- **Estimated effort:** 1 hour for all pages

## Technology Recommendations

### Primary Stack

- **Database:** Vercel Postgres (already in use)
- **API:** Next.js App Router API routes (established pattern)
- **Client:** React hooks with TypeScript (established pattern)
- **Fetch:** `navigator.sendBeacon` for unload, `fetch` for batches

### Supporting Libraries

- **No new dependencies needed**
- Use native `IntersectionObserver` for scroll detection
- Use native `Document Visibility API` for future time tracking

## Integration Points

### External APIs

None required for Iteration 18.

### Internal Integrations

**Middleware <-> Tracking Library**
- Session cookie (`ahiya_session`) must be readable from client-side
- Note: Current cookie is `httpOnly: true` - **need to expose session_id differently**

**Tracking Library <-> Event API**
- POST to `/api/analytics/event`
- Batch events array in single request
- Response: `{ success: true, count: N }`

**Scroll Tracker Hook <-> Tracking Library**
- Hook calls `trackScroll(depth: 25|50|75|100)` from tracking library
- Library batches and sends to API

**Root Layout <-> Scroll Tracker (for all pages)**
- Option A: Add to root layout (simplest, tracks all pages)
- Option B: Add to each page individually (more control)
- **Recommendation:** Option A - wrap in layout with page-specific tracking

## Risks & Challenges

### Technical Risks

**Session ID Access from Client**
- **Impact:** HIGH - Client needs session_id to link events to page views
- **Mitigation:** 
  1. Create separate non-httpOnly cookie for session_id
  2. Or inject session_id via script in layout
  3. Or generate client-side session ID with same logic

**Rate Limiting on Event API**
- **Impact:** MEDIUM - Could be abused
- **Mitigation:** 
  1. Implement IP-based rate limiting (10 events/second)
  2. Validate event structure server-side
  3. Cap metadata size

### Complexity Risks

**Event Batching Reliability**
- **Likelihood:** MEDIUM - `sendBeacon` has size limits (64KB typical)
- **Mitigation:** Flush batches when approaching limit, fallback to fetch

## Recommendations for Planner

### 1. Session ID Exposure Strategy

**Current State:** `ahiya_session` cookie is `httpOnly: true`

**Recommended Solution:** Generate session ID client-side using same logic:
```typescript
// In tracking.ts
function getOrCreateSessionId(): string {
  const stored = localStorage.getItem('ahiya_client_session');
  const sessionStart = sessionStorage.getItem('ahiya_session_start');
  
  // Session expires after 30 minutes of inactivity
  if (!stored || !sessionStart || Date.now() - parseInt(sessionStart) > 30 * 60 * 1000) {
    const newId = crypto.randomUUID();
    localStorage.setItem('ahiya_client_session', newId);
    sessionStorage.setItem('ahiya_session_start', Date.now().toString());
    return newId;
  }
  
  // Refresh session start time
  sessionStorage.setItem('ahiya_session_start', Date.now().toString());
  return stored;
}
```

**Alternative:** Modify middleware to set a duplicate non-httpOnly cookie. This ties client events to server-tracked sessions.

### 2. Events Table Schema

```sql
CREATE TABLE events (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  session_id VARCHAR(36) NOT NULL,
  visitor_hash VARCHAR(64),  -- Can be null if DNT enabled
  page_path VARCHAR(500) NOT NULL,
  event_category VARCHAR(50) NOT NULL,  -- 'scroll', 'click', 'engagement', 'conversion'
  event_action VARCHAR(100) NOT NULL,   -- 'scroll_25', 'cta_click', 'card_hover'
  event_label VARCHAR(200),             -- 'hero_cta', 'portfolio_mirror'
  event_value INTEGER,                  -- scroll %, time in ms, etc.
  metadata JSONB DEFAULT '{}'::jsonb    -- flexible additional data
);

-- Indexes for efficient querying
CREATE INDEX idx_events_created_at ON events (created_at DESC);
CREATE INDEX idx_events_session_id ON events (session_id);
CREATE INDEX idx_events_category ON events (event_category);
CREATE INDEX idx_events_path_category ON events (page_path, event_category);
CREATE INDEX idx_events_category_action ON events (event_category, event_action);
```

### 3. API Endpoint Structure

**Endpoint:** `POST /api/analytics/event`

**Single event request:**
```json
{
  "sessionId": "uuid",
  "visitorHash": "sha256-hash-or-null",
  "pagePath": "/pricing",
  "eventCategory": "scroll",
  "eventAction": "scroll_50",
  "eventLabel": null,
  "eventValue": 50,
  "metadata": {}
}
```

**Batch request (recommended):**
```json
{
  "events": [
    { "sessionId": "...", "pagePath": "/", "eventCategory": "scroll", "eventAction": "scroll_25", "eventValue": 25 },
    { "sessionId": "...", "pagePath": "/", "eventCategory": "scroll", "eventAction": "scroll_50", "eventValue": 50 }
  ]
}
```

### 4. Client-Side Tracking Library Architecture

**File:** `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/lib/tracking.ts`

```typescript
// lib/tracking.ts - High-level architecture

// Configuration
const BATCH_INTERVAL_MS = 3000;
const MAX_BATCH_SIZE = 50;
const API_ENDPOINT = '/api/analytics/event';

// State
let eventQueue: AnalyticsEvent[] = [];
let flushTimer: NodeJS.Timeout | null = null;

// Core functions
export function trackScroll(depth: 25 | 50 | 75 | 100): void;
export function trackClick(category: string, label: string): void;
export function trackEngagement(timeMs: number): void;
export function trackConversion(type: string, metadata?: Record<string, unknown>): void;

// Internal functions
function queueEvent(event: AnalyticsEvent): void;
function flushEvents(): void;
function shouldTrack(): boolean; // Checks DNT

// Lifecycle
function initTracking(): void; // Call on app load
function teardownTracking(): void; // Call on unload with sendBeacon
```

### 5. useScrollDepthTracker Hook Architecture

**File:** `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/hooks/useScrollDepthTracker.ts`

```typescript
// app/hooks/useScrollDepthTracker.ts - Architecture

interface UseScrollDepthTrackerOptions {
  milestones?: number[]; // Default: [25, 50, 75, 100]
  throttleMs?: number;   // Default: 250
}

export function useScrollDepthTracker(options?: UseScrollDepthTrackerOptions): void {
  // Track which milestones have been hit this page load
  const hitMilestones = useRef<Set<number>>(new Set());
  
  useEffect(() => {
    // Create scroll handler that:
    // 1. Calculates current scroll percentage
    // 2. Checks if new milestones were passed
    // 3. Fires trackScroll for each new milestone
    // 4. Throttles to prevent excessive calls
    
    // Cleanup resets hit milestones
  }, [pathname]); // Reset on navigation
}
```

### 6. Integration Points for Public Pages

**Option A: Root Layout Integration (Recommended)**

Modify `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/layout.tsx`:
```typescript
// Add tracking initialization to root layout
import { TrackingProvider } from '@/app/components/TrackingProvider';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <TrackingProvider>
          {children}
        </TrackingProvider>
      </body>
    </html>
  );
}
```

Create `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/components/TrackingProvider.tsx`:
```typescript
'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { initTracking, teardownTracking } from '@/lib/tracking';
import { useScrollDepthTracker } from '@/app/hooks/useScrollDepthTracker';

export function TrackingProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Initialize tracking on mount
  useEffect(() => {
    initTracking();
    return () => teardownTracking();
  }, []);
  
  // Track scroll depth
  useScrollDepthTracker();
  
  return <>{children}</>;
}
```

### 7. Testing Strategy

**Unit Tests (recommended):**
- `/lib/tracking.ts`:
  - DNT detection respects `navigator.doNotTrack`
  - Event batching collects events correctly
  - Flush sends correct payload to API
  - Session ID generation/retrieval works
  
- `useScrollDepthTracker`:
  - Correct milestone detection
  - Each milestone fires only once per page load
  - Resets on pathname change

**Integration Tests:**
- `/api/analytics/event`:
  - Validates required fields
  - Handles single and batch requests
  - Returns proper errors for invalid input
  - Rate limiting works (if implemented)

**Manual Testing:**
- Open homepage, scroll through page
- Check database for scroll events
- Verify events have correct session_id, page_path
- Test with DNT enabled (should not track)
- Test on mobile device

### 8. Security Considerations

1. **No PII Storage:**
   - visitor_hash uses daily-rotating salt (existing pattern)
   - No IP addresses stored
   - No user-identifiable metadata

2. **Rate Limiting:**
   - Implement in API: max 10 events/second/IP
   - Client-side: throttle scroll events

3. **Input Validation:**
   - Validate event_category is known value
   - Limit event_action and event_label lengths
   - Sanitize metadata JSON

4. **DNT Support:**
   - Check `navigator.doNotTrack === "1"`
   - Skip all tracking if enabled
   - Still allow page views (handled by middleware)

## Resource Map

### Critical Files/Directories

| Path | Purpose |
|------|---------|
| `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/scripts/schema.sql` | Database schema - add events table here |
| `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/lib/db.ts` | Database utilities - add insertEvent/insertEvents |
| `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/lib/types/analytics.ts` | Types - add EventInsert interface |
| `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/api/analytics/` | API routes - add event/route.ts |
| `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/lib/tracking.ts` | NEW: Client-side tracking library |
| `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/hooks/useScrollDepthTracker.ts` | NEW: Scroll tracking hook |
| `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/components/TrackingProvider.tsx` | NEW: Tracking context provider |
| `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/layout.tsx` | Root layout - integrate TrackingProvider |

### Key Dependencies

- `@vercel/postgres` - Already installed, for database operations
- `swr` - Already installed, for future admin dashboard data fetching
- No new dependencies required

### Testing Infrastructure

- Test with browser DevTools Network tab to verify API calls
- Use Vercel Postgres console to verify data insertion
- Manual testing with scroll interactions

## Questions for Planner

1. **Session ID Strategy:** Should we modify middleware to expose session_id to client (maintains consistency with page_views), or generate client-side (simpler but separate session tracking)?

2. **Admin Skip:** Should event tracking also skip when admin is logged in (like page views do via middleware)?

3. **Batch Size:** Is 50 events per batch reasonable, or should we adjust based on expected traffic?

4. **Error Handling:** Should failed event submissions be retried, or silently dropped? Current page_view pattern drops silently.

5. **Metadata Schema:** Should we define specific allowed metadata fields, or keep fully flexible JSONB?

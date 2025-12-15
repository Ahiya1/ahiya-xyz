# Master Exploration Report

## Explorer ID
master-explorer-4

## Focus Area
Analytics & Tracking System Design (Scalability & Performance)

## Vision Summary
Enhance the existing analytics system to track behavioral engagement (scroll depth, real time on page, click events, conversions) with a new events table, client-side tracking library, and expanded admin dashboard visualizations.

---

## Requirements Analysis

### Scope Assessment
- **Total analytics features identified:** 8 must-have features (Features 15-22 from vision)
- **Database changes required:** 1 new table (events) + indexes
- **New API endpoints:** 1 ingestion endpoint (`/api/analytics/event`)
- **Client-side components:** 1 tracking library + React hooks
- **Admin dashboard additions:** 1 new tab (Engagement) + funnel visualization

### Complexity Rating
**Overall Complexity: MEDIUM**

**Rationale:**
- Solid existing foundation: Well-structured `page_views` table with 6 indexes, 8 existing API routes, full admin dashboard
- Clear patterns to follow: Existing middleware tracking, SWR-based dashboard, Recharts visualizations
- No external dependencies: Uses Vercel Postgres directly via `@vercel/postgres` (no ORM migration needed)
- Incremental enhancement: Events table extends existing schema patterns

---

## Existing Infrastructure Analysis

### Current Analytics Architecture

**Database Layer** (`/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/scripts/schema.sql`):
```sql
-- Existing page_views table with 18 columns
-- Key columns: session_id (VARCHAR(36)), visitor_hash (VARCHAR(64)), path, created_at
-- 6 indexes for query performance:
--   - idx_page_views_created_at (time-based)
--   - idx_page_views_path (filtering)
--   - idx_page_views_session_id (session queries)
--   - idx_page_views_utm_campaign (campaign analysis)
--   - idx_page_views_path_created (compound)
--   - idx_page_views_visitor_hash (unique visitors)
```

**Tracking Layer** (`/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/middleware.ts`):
- Server-side middleware tracking page views
- Bot detection (15+ bot patterns)
- Privacy-preserving visitor hash (daily rotation via SHA-256)
- Session management (30-minute sliding window)
- Geo data extraction (Vercel Edge)
- Admin user exclusion (prevents self-tracking)

**API Layer** (8 existing routes):
- `/api/analytics/track` - Page view ingestion (POST)
- `/api/analytics/overview` - Dashboard metrics (GET)
- `/api/analytics/pages` - Per-page metrics (GET)
- `/api/analytics/realtime` - Live visitors (GET)
- `/api/analytics/acquisition` - Traffic sources (GET)
- `/api/analytics/visitors` - Visitor details (GET)
- `/api/analytics/export` - Data export (GET)
- `/api/analytics/export/count` - Export count (GET)

**Admin Dashboard** (`/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/admin/`):
- 6 navigation items: Overview, Real-Time, Pages, Acquisition, Visitors, Export
- Component library: MetricCard, MetricGrid, DataTable, LiveFeed, WorldMap
- SWR for data fetching with 30-second auto-refresh
- Framer Motion animations in LiveFeed

### Current Limitations Identified

1. **Time on Page:** Hardcoded to 45 seconds (`avgDurationPlaceholder = 45`)
2. **No Engagement Metrics:** No scroll tracking, click tracking, or interaction events
3. **No Conversion Tracking:** Cal.com interactions not captured
4. **Pages Table Note:** "Avg Time is a placeholder - requires additional time tracking"

---

## Events Table Schema Design

### Recommended Schema

```sql
-- New events table for behavioral tracking
CREATE TABLE IF NOT EXISTS events (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- Session correlation (matches page_views)
  session_id VARCHAR(36) NOT NULL,
  visitor_hash VARCHAR(64) NOT NULL,
  page_path VARCHAR(500) NOT NULL,

  -- Event taxonomy (hierarchical)
  event_category VARCHAR(50) NOT NULL,    -- 'scroll', 'engagement', 'click', 'conversion'
  event_action VARCHAR(100) NOT NULL,     -- 'scroll_25', 'time_heartbeat', 'cta_click', 'cal_open'
  event_label VARCHAR(200),               -- 'hero_cta', 'portfolio_mirror', 'pricing_starter'
  event_value INTEGER,                    -- scroll %, time ms, click count

  -- Flexible metadata
  metadata JSONB DEFAULT '{}'::jsonb
);

-- Index 1: Time-based queries (for aggregations)
CREATE INDEX IF NOT EXISTS idx_events_created_at ON events (created_at DESC);

-- Index 2: Session correlation (join with page_views)
CREATE INDEX IF NOT EXISTS idx_events_session_id ON events (session_id);

-- Index 3: Category filtering (engagement analysis)
CREATE INDEX IF NOT EXISTS idx_events_category ON events (event_category);

-- Index 4: Page-level engagement (compound index)
CREATE INDEX IF NOT EXISTS idx_events_page_category ON events (page_path, event_category);

-- Index 5: Conversion funnel queries
CREATE INDEX IF NOT EXISTS idx_events_action ON events (event_action) WHERE event_category = 'conversion';

-- Index 6: Time-range + category (dashboard queries)
CREATE INDEX IF NOT EXISTS idx_events_time_category ON events (created_at DESC, event_category);
```

### Schema Rationale

| Column | Purpose | Query Pattern |
|--------|---------|---------------|
| `session_id` | Correlates with `page_views.session_id` for session-level analysis | JOIN on session_id |
| `visitor_hash` | Links events to unique visitors | COUNT DISTINCT for unique engagement |
| `event_category` | High-level grouping (4 categories) | WHERE filtering, GROUP BY |
| `event_action` | Specific event type | Funnel step identification |
| `event_label` | Element identifier | Click target analysis |
| `event_value` | Numeric payload | SUM/AVG for metrics |
| `metadata` | Flexible JSON for future needs | Viewport size, scroll direction, etc. |

### Event Taxonomy

```
Category: scroll
  - scroll_25  (event_value: 25)
  - scroll_50  (event_value: 50)
  - scroll_75  (event_value: 75)
  - scroll_100 (event_value: 100)

Category: engagement
  - time_heartbeat     (event_value: cumulative_ms, fires every 5s)
  - time_final         (event_value: total_active_ms, fires on unload)
  - section_visible    (event_label: section_id, event_value: time_visible_ms)

Category: click
  - cta_click          (event_label: cta_id like 'hero_see_work', 'pricing_book_call')
  - card_hover         (event_label: card_id, event_value: dwell_time_ms)
  - nav_click          (event_label: nav_item)
  - external_link      (event_label: destination_url)

Category: conversion
  - cal_button_click   (event_label: page_path)
  - cal_embed_open     (event_label: page_path)
  - cal_booking_start  (event_label: meeting_type) -- if Cal.com exposes this
  - pdf_download       (event_label: 'cv' | 'capabilities')
```

---

## Client-Side Tracking Library Architecture

### Recommended Structure

**File:** `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/lib/tracking.ts`

```typescript
// Core tracking configuration
interface TrackingConfig {
  endpoint: '/api/analytics/event';
  batchSize: 10;           // Batch up to 10 events before sending
  batchInterval: 5000;     // Send batch every 5 seconds
  scrollThresholds: [25, 50, 75, 100];
  heartbeatInterval: 5000; // Time tracking heartbeat every 5s
}

// Main exports
export function trackEvent(category, action, label?, value?, metadata?): void;
export function trackScroll(depth: number): void;
export function trackClick(elementId: string, category?: string): void;
export function trackEngagement(): { start: () => void; stop: () => void };
export function trackConversion(type: string, label?: string): void;

// Privacy utilities
export function respectsDoNotTrack(): boolean;
export function getSessionId(): string;  // Reads from cookie
export function getVisitorHash(): string; // Reads from cookie or generates

// React hooks for declarative tracking
export function useScrollTracking(options?: ScrollOptions): void;
export function useTimeOnPage(): number;
export function useClickTracking(ref: RefObject<HTMLElement>, label: string): void;
```

### Event Batching Design

```
Browser Events                   Event Queue                    API Calls
     |                               |                              |
  scroll_25 ----------------> [event1] ----------------------> POST /api/analytics/event
  click_cta ----------------> [event2]                         { events: [e1, e2, ...e10] }
  heartbeat ----------------> [event3]                              |
     ...                           |                               |
  [10 events OR 5s elapsed] ---> FLUSH --------------------------->|
                                   |                               |
  page_unload ---------------> FLUSH_SYNC (navigator.sendBeacon) ->|
```

### Implementation Patterns

**Pattern 1: Event Batching**
```typescript
class EventBatcher {
  private queue: TrackingEvent[] = [];
  private timer: number | null = null;

  add(event: TrackingEvent): void {
    this.queue.push(event);
    if (this.queue.length >= BATCH_SIZE) {
      this.flush();
    } else if (!this.timer) {
      this.timer = window.setTimeout(() => this.flush(), BATCH_INTERVAL);
    }
  }

  flush(): void {
    if (this.queue.length === 0) return;
    const events = [...this.queue];
    this.queue = [];
    this.timer = null;

    // Use sendBeacon for reliability on page unload
    if (navigator.sendBeacon) {
      navigator.sendBeacon('/api/analytics/event', JSON.stringify({ events }));
    } else {
      fetch('/api/analytics/event', {
        method: 'POST',
        body: JSON.stringify({ events }),
        keepalive: true // Allows request to outlive page
      });
    }
  }
}
```

**Pattern 2: Scroll Tracking with Threshold Deduplication**
```typescript
function useScrollTracking() {
  const trackedRef = useRef<Set<number>>(new Set());

  useEffect(() => {
    const checkScroll = throttle(() => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
      );

      [25, 50, 75, 100].forEach(threshold => {
        if (scrollPercent >= threshold && !trackedRef.current.has(threshold)) {
          trackedRef.current.add(threshold);
          trackScroll(threshold);
        }
      });
    }, 200);

    window.addEventListener('scroll', checkScroll, { passive: true });
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);
}
```

**Pattern 3: Time on Page with Visibility API**
```typescript
function useTimeOnPage() {
  const activeTimeRef = useRef(0);
  const lastTickRef = useRef(Date.now());
  const isVisibleRef = useRef(!document.hidden);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Pausing - capture elapsed time
        activeTimeRef.current += Date.now() - lastTickRef.current;
        isVisibleRef.current = false;
      } else {
        // Resuming - reset tick
        lastTickRef.current = Date.now();
        isVisibleRef.current = true;
      }
    };

    const heartbeat = setInterval(() => {
      if (isVisibleRef.current) {
        const elapsed = Date.now() - lastTickRef.current;
        activeTimeRef.current += elapsed;
        lastTickRef.current = Date.now();
        trackEvent('engagement', 'time_heartbeat', undefined, activeTimeRef.current);
      }
    }, 5000);

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearInterval(heartbeat);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      // Final time event on unmount
      trackEvent('engagement', 'time_final', undefined,
        activeTimeRef.current + (isVisibleRef.current ? Date.now() - lastTickRef.current : 0)
      );
    };
  }, []);

  return activeTimeRef.current;
}
```

---

## API Endpoint Design

### Event Ingestion Endpoint

**File:** `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/api/analytics/event/route.ts`

```typescript
interface EventPayload {
  events: Array<{
    category: string;
    action: string;
    label?: string;
    value?: number;
    metadata?: Record<string, unknown>;
    timestamp?: number; // Client timestamp for latency detection
  }>;
  sessionId: string;
  visitorHash: string;
  pagePath: string;
}

export async function POST(request: NextRequest) {
  // 1. Rate limiting check (simple in-memory for now)
  // 2. Validate payload structure
  // 3. Sanitize inputs (no PII in labels)
  // 4. Batch insert into events table
  // 5. Return success/failure
}
```

### Rate Limiting Strategy

```typescript
// Simple sliding window rate limiter
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 100; // Max 100 event batches per minute per session

// For production: Consider Vercel KV or edge config for distributed rate limiting
```

### Response Codes

| Code | Meaning |
|------|---------|
| 200 | Events ingested successfully |
| 400 | Invalid payload structure |
| 429 | Rate limited (too many requests) |
| 500 | Database error |

---

## Admin Dashboard Expansion

### New Navigation Item

Add to `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/admin/components/AdminSidebar.tsx`:

```typescript
const navItems = [
  // ... existing items
  { href: "/admin/engagement", label: "Engagement", icon: Target },  // New
];
```

### Engagement Dashboard Layout

**File:** `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/admin/(dashboard)/engagement/page.tsx`

```
+------------------------------------------------------------------+
|  Engagement Analytics                        [Time Range: 7d v]  |
+------------------------------------------------------------------+
|                                                                   |
|  +----------------+  +----------------+  +----------------+       |
|  | Avg Scroll     |  | Avg Time on    |  | Engagement     |       |
|  | Depth          |  | Page (Real)    |  | Score          |       |
|  | 67%            |  | 2m 34s         |  | 72/100         |       |
|  | +12.3%         |  | +8.5%          |  | +5.2%          |       |
|  +----------------+  +----------------+  +----------------+       |
|                                                                   |
|  +--------------------------------+  +---------------------------+|
|  | Conversion Funnel             |  | Scroll Depth Distribution  ||
|  | Page View: 1,234              |  |                            ||
|  | Scroll 50%: 890 (72%)         |  | [Bar chart: 25/50/75/100%] ||
|  | CTA Click: 123 (10%)          |  |                            ||
|  | Cal.com Open: 45 (37%)        |  |                            ||
|  +--------------------------------+  +---------------------------+|
|                                                                   |
|  +--------------------------------------------------------------+|
|  | Top Clicked Elements                                          ||
|  +-------+------------------+-------+--------+-------------------+|
|  | Rank  | Element          | Clicks| CTR    | Page              ||
|  +-------+------------------+-------+--------+-------------------+|
|  | 1     | hero_see_work    | 89    | 7.2%   | /                 ||
|  | 2     | pricing_starter  | 45    | 12.4%  | /pricing          ||
|  | 3     | nav_pricing      | 38    | 3.1%   | /                 ||
|  +--------------------------------------------------------------+|
+------------------------------------------------------------------+
```

### Conversion Funnel Visualization

**Component:** `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/admin/components/ConversionFunnel.tsx`

```typescript
interface FunnelStep {
  label: string;
  count: number;
  percentage: number;  // Percentage of previous step
  color: string;
}

interface ConversionFunnelProps {
  steps: FunnelStep[];
  title?: string;
}

// Visualization approach:
// - Horizontal bars with decreasing width (funnel shape)
// - Percentage labels between steps (conversion rate)
// - Use Recharts FunnelChart or custom SVG
```

### Engagement Score Calculation

```typescript
// Composite metric formula
function calculateEngagementScore(
  scrollDepth: number,      // 0-100 (highest scroll depth)
  timeOnPage: number,       // milliseconds
  interactions: number      // click count
): number {
  // Normalize time to 0-100 (cap at 5 minutes = 100)
  const timeScore = Math.min(100, (timeOnPage / 300000) * 100);

  // Normalize interactions to 0-100 (cap at 10 interactions = 100)
  const interactionScore = Math.min(100, interactions * 10);

  // Weighted composite
  return Math.round(
    scrollDepth * 0.3 +      // 30% weight
    timeScore * 0.4 +         // 40% weight
    interactionScore * 0.3    // 30% weight
  );
}
```

---

## Database Query Patterns

### Scroll Depth Aggregation

```sql
-- Average scroll depth per page
SELECT
  page_path,
  AVG(event_value) as avg_scroll_depth,
  COUNT(DISTINCT session_id) as sessions
FROM events
WHERE event_category = 'scroll'
  AND event_action = 'scroll_100'  -- Use max scroll achieved
  AND created_at >= $1
GROUP BY page_path
ORDER BY avg_scroll_depth DESC;
```

### Real Time on Page

```sql
-- Average time per page (using final time events)
SELECT
  page_path,
  AVG(event_value) / 1000 as avg_seconds,
  COUNT(DISTINCT session_id) as sessions
FROM events
WHERE event_category = 'engagement'
  AND event_action = 'time_final'
  AND created_at >= $1
GROUP BY page_path;
```

### Conversion Funnel Query

```sql
-- Funnel: Page View -> Scroll 50% -> CTA Click -> Cal.com Open
WITH page_views AS (
  SELECT COUNT(DISTINCT session_id) as count
  FROM page_views
  WHERE created_at >= $1
),
scroll_50 AS (
  SELECT COUNT(DISTINCT session_id) as count
  FROM events
  WHERE event_category = 'scroll'
    AND event_value >= 50
    AND created_at >= $1
),
cta_clicks AS (
  SELECT COUNT(DISTINCT session_id) as count
  FROM events
  WHERE event_category = 'click'
    AND event_action = 'cta_click'
    AND created_at >= $1
),
cal_opens AS (
  SELECT COUNT(DISTINCT session_id) as count
  FROM events
  WHERE event_category = 'conversion'
    AND event_action = 'cal_embed_open'
    AND created_at >= $1
)
SELECT
  pv.count as page_views,
  s.count as scroll_50,
  c.count as cta_clicks,
  co.count as cal_opens
FROM page_views pv
CROSS JOIN scroll_50 s
CROSS JOIN cta_clicks c
CROSS JOIN cal_opens co;
```

---

## Performance Considerations

### Event Volume Estimation

| Event Type | Frequency | Est. Events/Day (100 visitors) |
|------------|-----------|--------------------------------|
| scroll_* | 1-4 per pageview | 300 |
| time_heartbeat | 1 per 5s active | 1,800 (avg 90s/page) |
| time_final | 1 per pageview | 150 |
| click_* | 0.3 per pageview | 45 |
| conversion_* | 0.05 per pageview | 8 |
| **Total** | | **~2,300/day** |

**At 1,000 visitors/day:** ~23,000 events/day = ~700,000/month

**Vercel Postgres capacity:** Well within free tier limits (256MB storage, 1M rows/month read)

### Index Efficiency

| Query Pattern | Index Used | Expected Performance |
|---------------|------------|---------------------|
| Time range aggregation | `idx_events_time_category` | O(log n) |
| Session correlation | `idx_events_session_id` | O(log n) |
| Page engagement | `idx_events_page_category` | O(log n) |
| Conversion funnel | `idx_events_action` (partial) | O(log n) |

### Batch Insert Optimization

```sql
-- Use single multi-row INSERT for batched events
INSERT INTO events (session_id, visitor_hash, page_path, event_category, event_action, event_label, event_value, metadata)
VALUES
  ($1, $2, $3, $4, $5, $6, $7, $8),
  ($1, $2, $3, $9, $10, $11, $12, $13),
  -- ... up to 10 rows
;
```

---

## Security Considerations

### No PII Storage

- **Allowed labels:** Element IDs, page paths, event types
- **Prohibited:** Email addresses, names, IP addresses, user IDs
- **Validation:** Regex check on event_label to reject patterns like `@`, phone numbers

```typescript
function sanitizeLabel(label: string): string {
  // Remove potential PII
  if (/@|phone|\d{3}-\d{4}|personal|email/i.test(label)) {
    return '[REDACTED]';
  }
  return label.slice(0, 200); // Length limit
}
```

### Rate Limiting

```typescript
// Per-session rate limit
const sessionLimits = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(sessionId: string): boolean {
  const now = Date.now();
  const limit = sessionLimits.get(sessionId);

  if (!limit || now > limit.resetAt) {
    sessionLimits.set(sessionId, { count: 1, resetAt: now + 60000 });
    return true;
  }

  if (limit.count >= 100) {
    return false; // Rate limited
  }

  limit.count++;
  return true;
}
```

### Input Validation

```typescript
const eventSchema = {
  category: { maxLength: 50, allowed: ['scroll', 'engagement', 'click', 'conversion'] },
  action: { maxLength: 100, pattern: /^[a-z_]+$/ },
  label: { maxLength: 200, sanitize: true },
  value: { type: 'integer', min: 0, max: 10000000 },
};
```

---

## Privacy Compliance

### Do Not Track (DNT) Support

```typescript
// In tracking.ts
export function respectsDoNotTrack(): boolean {
  return (
    navigator.doNotTrack === '1' ||
    (window as any).doNotTrack === '1' ||
    (navigator as any).msDoNotTrack === '1'
  );
}

// Usage in tracking functions
export function trackEvent(...args) {
  if (respectsDoNotTrack()) {
    return; // Silent no-op
  }
  // ... proceed with tracking
}
```

### GDPR Considerations

- **Legitimate interest basis:** Analytics for site improvement
- **No consent banner needed:** No cookies set by tracking (uses existing session cookie)
- **Data retention:** 90-day default, configurable
- **Data export:** Existing `/api/analytics/export` endpoint
- **Right to erasure:** Add DELETE endpoint for visitor_hash

### Data Retention & Cleanup

```sql
-- Scheduled cleanup job (run daily via cron)
DELETE FROM events
WHERE created_at < NOW() - INTERVAL '90 days';

-- Keep aggregated metrics in separate summary table if needed
```

---

## Testing Strategy

### Unit Tests

**Location:** `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/__tests__/lib/tracking.test.ts`

```typescript
describe('Event Batching', () => {
  it('should batch events up to BATCH_SIZE');
  it('should flush after BATCH_INTERVAL');
  it('should use sendBeacon on page unload');
  it('should handle failed API calls gracefully');
});

describe('Scroll Tracking', () => {
  it('should track each threshold only once');
  it('should calculate correct scroll percentage');
  it('should respect prefers-reduced-motion');
});

describe('Time Tracking', () => {
  it('should pause when tab hidden');
  it('should resume when tab visible');
  it('should send final time on unmount');
});

describe('Privacy', () => {
  it('should respect DNT header');
  it('should sanitize PII from labels');
  it('should not track if cookies disabled');
});
```

### Integration Tests

**Location:** `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/__tests__/api/analytics/event.test.ts`

```typescript
describe('POST /api/analytics/event', () => {
  it('should accept valid event batch');
  it('should reject invalid category');
  it('should rate limit excessive requests');
  it('should sanitize event labels');
  it('should return 400 for malformed payload');
});
```

### E2E Tests (if applicable)

```typescript
describe('Analytics Integration', () => {
  it('should track scroll depth on homepage');
  it('should track CTA clicks');
  it('should show engagement data in admin');
});
```

### Manual Testing Checklist

- [ ] Scroll tracking fires at 25%, 50%, 75%, 100% thresholds
- [ ] Time tracking pauses when switching tabs
- [ ] Events batch correctly (check network tab)
- [ ] Events survive page navigation (sendBeacon works)
- [ ] Admin dashboard shows new engagement metrics
- [ ] Conversion funnel displays correct numbers
- [ ] DNT header respected (no events when enabled)
- [ ] Rate limiting kicks in after 100 batches/minute

---

## Implementation Phases

### Phase 1: Database & API (2-3 hours)
1. Create events table with schema
2. Add indexes
3. Create `/api/analytics/event` endpoint
4. Add rate limiting and validation

### Phase 2: Client-Side Library (3-4 hours)
1. Create `/lib/tracking.ts` with core functions
2. Implement event batching
3. Create React hooks for scroll/time tracking
4. Add DNT support

### Phase 3: Integration (2-3 hours)
1. Add scroll tracking to layout
2. Add time tracking to pages
3. Add click tracking to CTAs
4. Add conversion tracking to Cal.com integration

### Phase 4: Admin Dashboard (3-4 hours)
1. Add Engagement navigation item
2. Create engagement page layout
3. Build conversion funnel component
4. Update existing metrics with real time on page
5. Add engagement score display

**Total Estimated Time:** 10-14 hours

---

## Recommendations for Master Plan

1. **Leverage Existing Patterns**
   - Follow the established middleware + API + SWR pattern
   - Reuse MetricCard, DataTable components for consistency
   - Keep tracking in `lib/` alongside `lib/db.ts` and `lib/auth.ts`

2. **Implement in Order**
   - Database first (enables API development)
   - API second (enables client-side testing)
   - Client library third (enables integration)
   - Dashboard last (requires data in database)

3. **Consider Parallel Development**
   - Database + API can be done by one builder
   - Client library can start once API endpoint defined
   - Dashboard can be mocked with fake data initially

4. **Testing Priority**
   - Focus on event batching reliability (data loss prevention)
   - Ensure privacy compliance is testable
   - Dashboard can have lighter testing (visual verification)

5. **Future Considerations**
   - Events table enables A/B testing later (add `variant` column)
   - Conversion tracking enables ROI calculation
   - Engagement score enables content optimization

---

## Notes & Observations

- The existing analytics system is well-architected with clear separation of concerns
- Vercel Postgres is being used directly (no Prisma), so schema changes require manual SQL
- The admin dashboard already uses Recharts, making funnel visualization straightforward
- Framer Motion is already used in LiveFeed, so animations are available
- The middleware pattern for server-side tracking is solid; client-side tracking should complement, not replace
- Session correlation between `page_views` and `events` tables enables powerful session-level analysis

---

*Exploration completed: 2025-12-15*
*This report informs master planning decisions for analytics features in plan-17*

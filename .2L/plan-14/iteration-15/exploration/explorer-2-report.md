# Explorer 2 Report: Database Schema & API Patterns

## Executive Summary

The analytics foundation from Iteration 14 provides a clean, well-structured database schema with 18 columns and 6 optimized indexes. The existing API patterns follow Next.js App Router conventions with proper TypeScript typing. Builders should leverage the existing `@vercel/postgres` sql template literals and extend the established patterns for all dashboard API routes.

---

## Database Schema Analysis

### page_views Table Structure

The core analytics table stores all tracking data with 18 columns:

| Column | Type | Constraints | Purpose |
|--------|------|-------------|---------|
| `id` | SERIAL | PRIMARY KEY | Auto-incrementing unique identifier |
| `created_at` | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() | Event timestamp (critical for time-series queries) |
| `path` | VARCHAR(500) | NOT NULL | Page URL path (e.g., `/projects/selahreach`) |
| `referrer` | VARCHAR(2000) | nullable | Full referrer URL |
| `utm_source` | VARCHAR(100) | nullable | UTM source parameter |
| `utm_medium` | VARCHAR(100) | nullable | UTM medium parameter |
| `utm_campaign` | VARCHAR(200) | nullable | UTM campaign parameter |
| `utm_content` | VARCHAR(200) | nullable | UTM content parameter |
| `utm_term` | VARCHAR(200) | nullable | UTM term parameter |
| `session_id` | VARCHAR(36) | NOT NULL | UUID for session tracking |
| `visitor_hash` | VARCHAR(64) | NOT NULL | SHA-256 privacy-preserving visitor ID (daily rotation) |
| `device_type` | VARCHAR(20) | NOT NULL, DEFAULT 'desktop' | `desktop`, `mobile`, or `tablet` |
| `browser` | VARCHAR(50) | nullable | Browser name (Chrome, Safari, etc.) |
| `browser_version` | VARCHAR(20) | nullable | Browser version string |
| `os` | VARCHAR(50) | nullable | Operating system name |
| `os_version` | VARCHAR(20) | nullable | OS version string |
| `country` | VARCHAR(2) | nullable | ISO 3166-1 alpha-2 country code |
| `city` | VARCHAR(100) | nullable | City name (from Vercel Edge geo) |
| `region` | VARCHAR(100) | nullable | Region/state name |
| `user_agent` | TEXT | nullable | Full user agent string |

**File Location:** `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/scripts/schema.sql`

---

## Available Indexes

Six indexes are defined for query optimization:

| Index Name | Columns | Type | Use Case |
|------------|---------|------|----------|
| `idx_page_views_created_at` | `created_at DESC` | B-tree | Time-range queries (today, 7d, 30d) - **Most critical** |
| `idx_page_views_path` | `path` | B-tree | Page-specific analytics |
| `idx_page_views_session_id` | `session_id` | B-tree | Session-based aggregations |
| `idx_page_views_utm_campaign` | `utm_campaign` | Partial (WHERE NOT NULL) | Campaign performance queries |
| `idx_page_views_date_path` | `DATE(created_at), path` | Composite | Daily aggregations per page |
| `idx_page_views_visitor_hash` | `visitor_hash` | B-tree | Unique visitor counting |

### Index Usage Recommendations

1. **Overview queries**: Use `idx_page_views_created_at` with time range filter FIRST
2. **Pages analytics**: Combine `idx_page_views_date_path` for per-page daily stats
3. **Unique visitors**: Use `COUNT(DISTINCT visitor_hash)` - leverages `idx_page_views_visitor_hash`
4. **Sessions**: Use `COUNT(DISTINCT session_id)` for session counts
5. **UTM analysis**: Partial index only covers non-null campaigns - include `WHERE utm_campaign IS NOT NULL`

---

## TypeScript Types Defined

### Location: `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/lib/types/analytics.ts`

```typescript
// Data required to insert a new page view
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

// Device information parsed from user agent
export interface DeviceInfo {
  deviceType: "desktop" | "mobile" | "tablet";
  browser: string | null;
  browserVersion: string | null;
  os: string | null;
  osVersion: string | null;
}

// Session management info
export interface SessionInfo {
  sessionId: string;
  isNew: boolean;
}
```

### New Types Needed for Dashboard

Builders should extend with these response types:

```typescript
// Overview metrics response
export interface OverviewMetrics {
  totalViews: number;
  uniqueVisitors: number;
  bounceRate: number;
  avgSessionDuration: number; // in seconds
  viewsTrend: number; // percentage change
  visitorsTrend: number;
}

// Time series data point
export interface TimeSeriesPoint {
  date: string; // YYYY-MM-DD
  views: number;
  visitors: number;
}

// Page analytics row
export interface PageAnalytics {
  path: string;
  views: number;
  uniqueVisitors: number;
  bounceRate: number;
  avgTimeOnPage: number;
  entryRate: number;
  exitRate: number;
}

// Acquisition source
export interface AcquisitionSource {
  source: string;
  views: number;
  visitors: number;
  percentage: number;
}

// Real-time activity
export interface RealtimeVisit {
  id: number;
  path: string;
  referrer: string | null;
  country: string | null;
  city: string | null;
  deviceType: string;
  browser: string | null;
  createdAt: string;
}
```

---

## API Route Patterns

### Established Pattern from Iteration 14

**File:** `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/api/analytics/track/route.ts`

```typescript
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { insertPageView } from "@/lib/db";
import type { PageViewInsert } from "@/lib/types/analytics";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as PageViewInsert;

    // Validate required fields
    if (!body.path || !body.sessionId || !body.visitorHash) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Insert into database
    await insertPageView(body);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[Analytics Track] Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
```

### Pattern for Dashboard GET Routes

New API routes should follow this pattern:

```typescript
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { sql } from "@vercel/postgres";

export async function GET(request: NextRequest) {
  try {
    // 1. Parse query parameters
    const { searchParams } = new URL(request.url);
    const range = searchParams.get("range") || "7d";
    
    // 2. Calculate date range
    const days = range === "today" ? 0 : range === "7d" ? 7 : range === "30d" ? 30 : 90;
    
    // 3. Execute query with parameterized values
    const result = await sql`
      SELECT COUNT(*) as total
      FROM page_views
      WHERE created_at >= NOW() - INTERVAL '${days} days'
    `;
    
    // 4. Return JSON response
    return NextResponse.json({ data: result.rows });
  } catch (error) {
    console.error("[Analytics API] Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
```

### Auth Pattern for Protected Routes

From `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/api/auth/logout/route.ts`:

```typescript
import { getAuthCookie, verifyAdminToken } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const token = getAuthCookie(request);

  if (!token) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { valid } = await verifyAdminToken(token);

  if (!valid) {
    return NextResponse.json({ error: "Invalid session" }, { status: 401 });
  }
  
  // ... proceed with authenticated action
}
```

---

## Query Patterns for Dashboard Features

### 1. Overview Metrics

```sql
-- Total views in time range
SELECT COUNT(*) as total_views
FROM page_views
WHERE created_at >= NOW() - INTERVAL '7 days';

-- Unique visitors (uses visitor_hash index)
SELECT COUNT(DISTINCT visitor_hash) as unique_visitors
FROM page_views
WHERE created_at >= NOW() - INTERVAL '7 days';

-- Bounce rate (sessions with only 1 page view)
WITH session_counts AS (
  SELECT session_id, COUNT(*) as page_count
  FROM page_views
  WHERE created_at >= NOW() - INTERVAL '7 days'
  GROUP BY session_id
)
SELECT 
  ROUND(
    100.0 * COUNT(CASE WHEN page_count = 1 THEN 1 END) / NULLIF(COUNT(*), 0),
    1
  ) as bounce_rate
FROM session_counts;

-- Daily views trend (for sparkline)
SELECT 
  DATE(created_at) as date,
  COUNT(*) as views,
  COUNT(DISTINCT visitor_hash) as visitors
FROM page_views
WHERE created_at >= NOW() - INTERVAL '7 days'
GROUP BY DATE(created_at)
ORDER BY date;
```

### 2. Pages Analytics

```sql
-- Top pages with metrics
SELECT 
  path,
  COUNT(*) as views,
  COUNT(DISTINCT visitor_hash) as unique_visitors,
  COUNT(DISTINCT session_id) as sessions
FROM page_views
WHERE created_at >= NOW() - INTERVAL '7 days'
GROUP BY path
ORDER BY views DESC
LIMIT 20;

-- Entry pages (first page in session)
WITH first_pages AS (
  SELECT DISTINCT ON (session_id) 
    session_id, 
    path, 
    created_at
  FROM page_views
  WHERE created_at >= NOW() - INTERVAL '7 days'
  ORDER BY session_id, created_at ASC
)
SELECT path, COUNT(*) as entry_count
FROM first_pages
GROUP BY path
ORDER BY entry_count DESC;

-- Exit pages (last page in session)
WITH last_pages AS (
  SELECT DISTINCT ON (session_id) 
    session_id, 
    path, 
    created_at
  FROM page_views
  WHERE created_at >= NOW() - INTERVAL '7 days'
  ORDER BY session_id, created_at DESC
)
SELECT path, COUNT(*) as exit_count
FROM last_pages
GROUP BY path
ORDER BY exit_count DESC;
```

### 3. Acquisition Analytics

```sql
-- Traffic sources breakdown
SELECT 
  CASE
    WHEN referrer IS NULL OR referrer = '' THEN 'direct'
    WHEN referrer LIKE '%google.%' THEN 'google'
    WHEN referrer LIKE '%linkedin.%' THEN 'linkedin'
    WHEN referrer LIKE '%twitter.%' OR referrer LIKE '%x.com%' THEN 'twitter'
    WHEN referrer LIKE '%facebook.%' THEN 'facebook'
    WHEN utm_source IS NOT NULL THEN utm_source
    ELSE 'referral'
  END as source,
  COUNT(*) as views,
  COUNT(DISTINCT visitor_hash) as visitors
FROM page_views
WHERE created_at >= NOW() - INTERVAL '7 days'
GROUP BY source
ORDER BY views DESC;

-- UTM campaign breakdown
SELECT 
  utm_source,
  utm_medium,
  utm_campaign,
  COUNT(*) as views,
  COUNT(DISTINCT visitor_hash) as visitors
FROM page_views
WHERE created_at >= NOW() - INTERVAL '7 days'
  AND utm_campaign IS NOT NULL
GROUP BY utm_source, utm_medium, utm_campaign
ORDER BY views DESC;

-- Top referrers (full URLs)
SELECT 
  referrer,
  COUNT(*) as views,
  COUNT(DISTINCT visitor_hash) as visitors
FROM page_views
WHERE created_at >= NOW() - INTERVAL '7 days'
  AND referrer IS NOT NULL 
  AND referrer != ''
GROUP BY referrer
ORDER BY views DESC
LIMIT 10;
```

### 4. Visitor Insights

```sql
-- Device breakdown
SELECT 
  device_type,
  COUNT(*) as views,
  COUNT(DISTINCT visitor_hash) as visitors,
  ROUND(100.0 * COUNT(*) / SUM(COUNT(*)) OVER(), 1) as percentage
FROM page_views
WHERE created_at >= NOW() - INTERVAL '7 days'
GROUP BY device_type
ORDER BY views DESC;

-- Browser breakdown
SELECT 
  browser,
  COUNT(*) as views,
  ROUND(100.0 * COUNT(*) / SUM(COUNT(*)) OVER(), 1) as percentage
FROM page_views
WHERE created_at >= NOW() - INTERVAL '7 days'
  AND browser IS NOT NULL
GROUP BY browser
ORDER BY views DESC
LIMIT 10;

-- OS breakdown
SELECT 
  os,
  COUNT(*) as views,
  ROUND(100.0 * COUNT(*) / SUM(COUNT(*)) OVER(), 1) as percentage
FROM page_views
WHERE created_at >= NOW() - INTERVAL '7 days'
  AND os IS NOT NULL
GROUP BY os
ORDER BY views DESC;

-- Countries (for world map)
SELECT 
  country,
  COUNT(*) as views,
  COUNT(DISTINCT visitor_hash) as visitors
FROM page_views
WHERE created_at >= NOW() - INTERVAL '7 days'
  AND country IS NOT NULL
GROUP BY country
ORDER BY views DESC;

-- Top cities
SELECT 
  country,
  city,
  COUNT(*) as views
FROM page_views
WHERE created_at >= NOW() - INTERVAL '7 days'
  AND city IS NOT NULL
GROUP BY country, city
ORDER BY views DESC
LIMIT 10;
```

### 5. Real-Time Feed

```sql
-- Active visitors (last 5 minutes)
SELECT COUNT(DISTINCT visitor_hash) as active_now
FROM page_views
WHERE created_at >= NOW() - INTERVAL '5 minutes';

-- Recent activity feed (last 30 minutes)
SELECT 
  id,
  path,
  referrer,
  country,
  city,
  device_type,
  browser,
  created_at
FROM page_views
WHERE created_at >= NOW() - INTERVAL '30 minutes'
ORDER BY created_at DESC
LIMIT 50;
```

### 6. Export (CSV Generation)

```sql
-- Full data export
SELECT 
  id,
  created_at,
  path,
  referrer,
  utm_source,
  utm_medium,
  utm_campaign,
  session_id,
  visitor_hash,
  device_type,
  browser,
  os,
  country,
  city
FROM page_views
WHERE created_at >= $1 AND created_at <= $2
ORDER BY created_at DESC;
```

---

## Database Connection Pattern

**File:** `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/lib/db.ts`

```typescript
import { sql } from "@vercel/postgres";
import type { PageViewInsert } from "@/lib/types/analytics";

export async function insertPageView(data: PageViewInsert): Promise<void> {
  await sql`
    INSERT INTO page_views (
      path, referrer, utm_source, utm_medium, utm_campaign,
      utm_content, utm_term, session_id, visitor_hash, device_type,
      browser, browser_version, os, os_version, country, city, region, user_agent
    ) VALUES (
      ${data.path}, ${data.referrer}, ${data.utmSource}, ${data.utmMedium},
      ${data.utmCampaign}, ${data.utmContent}, ${data.utmTerm}, ${data.sessionId},
      ${data.visitorHash}, ${data.deviceType}, ${data.browser}, ${data.browserVersion},
      ${data.os}, ${data.osVersion}, ${data.country}, ${data.city}, ${data.region},
      ${data.userAgent}
    )
  `;
}
```

### Pattern for Query Functions

Builders should add functions like:

```typescript
export async function getOverviewMetrics(days: number): Promise<OverviewMetrics> {
  const [viewsResult, visitorsResult, bounceResult] = await Promise.all([
    sql`SELECT COUNT(*) as count FROM page_views 
        WHERE created_at >= NOW() - INTERVAL '${days} days'`,
    sql`SELECT COUNT(DISTINCT visitor_hash) as count FROM page_views 
        WHERE created_at >= NOW() - INTERVAL '${days} days'`,
    sql`WITH session_counts AS (
          SELECT session_id, COUNT(*) as page_count
          FROM page_views
          WHERE created_at >= NOW() - INTERVAL '${days} days'
          GROUP BY session_id
        )
        SELECT ROUND(100.0 * COUNT(CASE WHEN page_count = 1 THEN 1 END) / NULLIF(COUNT(*), 0), 1) as rate
        FROM session_counts`
  ]);
  
  return {
    totalViews: Number(viewsResult.rows[0].count),
    uniqueVisitors: Number(visitorsResult.rows[0].count),
    bounceRate: Number(bounceResult.rows[0].rate) || 0,
    avgSessionDuration: 0, // Requires additional calculation
    viewsTrend: 0,
    visitorsTrend: 0
  };
}
```

---

## Existing Admin Layout & Components

### Admin Layout Structure

The admin dashboard uses:
- **Sidebar:** 264px fixed width with purple accent theming
- **Header:** 64px fixed height with logout button
- **Main content:** Flexible with p-6 padding
- **Background:** `#0a0f1a` (dark navy)

### Navigation Items (Already Defined)

From `AdminSidebar.tsx`:
```typescript
const navItems = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/realtime", label: "Real-Time", icon: Activity },
  { href: "/admin/pages", label: "Pages", icon: FileText },
  { href: "/admin/acquisition", label: "Acquisition", icon: TrendingUp },
  { href: "/admin/visitors", label: "Visitors", icon: Users },
  { href: "/admin/export", label: "Export", icon: Download },
];
```

### Design System Classes

- `contemplative-card` - Card container with border styling
- `heading-xl` - Large heading typography
- `heading-lg` - Medium heading typography
- Purple accent color: `purple-400`, `purple-500/20`
- Text colors: `text-white`, `text-slate-400`, `text-slate-500`
- Border style: `border-white/10`

---

## Recommendations for Builders

### 1. Parallel Query Execution

Use `Promise.all` for independent queries:

```typescript
const [views, visitors, bounce, trend] = await Promise.all([
  getViewsCount(days),
  getVisitorsCount(days),
  getBounceRate(days),
  getTrendData(days)
]);
```

### 2. Time Range Parameter Handling

```typescript
const RANGE_DAYS: Record<string, number> = {
  'today': 0,
  '7d': 7,
  '30d': 30,
  '90d': 90
};

// In route handler
const range = searchParams.get('range') || '7d';
const days = RANGE_DAYS[range] || 7;
```

### 3. SQL Interval Parameterization

Note: Vercel Postgres sql template doesn't interpolate intervals directly. Use:

```typescript
// Build the date condition manually
const startDate = new Date();
startDate.setDate(startDate.getDate() - days);

await sql`
  SELECT * FROM page_views
  WHERE created_at >= ${startDate.toISOString()}
`;
```

### 4. SWR Integration for Real-Time

```typescript
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(r => r.json());

export function useRealtimeData() {
  return useSWR('/api/analytics/realtime', fetcher, {
    refreshInterval: 5000, // 5 seconds
    revalidateOnFocus: true
  });
}
```

### 5. Empty State Handling

Check for zero data conditions:

```typescript
if (result.rows.length === 0) {
  return NextResponse.json({ 
    data: [], 
    empty: true,
    message: "No data for the selected period"
  });
}
```

---

## Potential Query Performance Considerations

1. **Use LIMIT** on all list queries (max 50-100 items)
2. **Use indexes** - Always filter by `created_at` first
3. **Avoid SELECT *** - Only select needed columns
4. **Use DISTINCT judiciously** - Expensive on large datasets
5. **Consider caching** - SWR handles client-side; consider edge caching for expensive queries

---

## File Locations Summary

| Purpose | Path |
|---------|------|
| Database schema | `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/scripts/schema.sql` |
| DB utilities | `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/lib/db.ts` |
| Analytics types | `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/lib/types/analytics.ts` |
| Auth utilities | `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/lib/auth.ts` |
| Track API | `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/api/analytics/track/route.ts` |
| Admin layout | `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/admin/layout.tsx` |
| Admin sidebar | `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/admin/components/AdminSidebar.tsx` |
| Tracking middleware | `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/middleware.ts` |

---

## Questions for Planner

1. Should session duration be computed client-side (requires additional tracking) or approximated from timestamps?
2. Should we add data caching (Redis/Vercel KV) for expensive aggregation queries, or rely on SWR alone?
3. What is the expected data volume - should we implement pagination for the pages list?

# Explorer 2 Report: Admin Dashboard & Engagement Metrics Architecture

## Executive Summary

The admin dashboard has a solid foundation with established patterns (MetricCard, DataTable, TimeRangeSelector, SWR data fetching). Adding an "Engagement" tab requires: 1) extending AdminSidebar navigation, 2) creating new `/app/admin/(dashboard)/engagement/page.tsx`, 3) building a new `/api/admin/engagement` endpoint to aggregate events data, and 4) implementing ConversionFunnel and ScrollDepthChart visualization components using existing Recharts library (v3.5.1 with FunnelChart support).

## Discoveries

### Admin Infrastructure Patterns

**File: `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/admin/components/AdminSidebar.tsx`**

Navigation structure is a simple array-based pattern:
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

**Extension Pattern:** Adding Engagement tab requires:
- Add `{ href: "/admin/engagement", label: "Engagement", icon: BarChart2 }` to `navItems`
- Create `/app/admin/(dashboard)/engagement/page.tsx`

### Events Table Schema

**File: `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/scripts/schema.sql`**

Events table structure (from iteration-18):
```sql
CREATE TABLE events (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  session_id VARCHAR(36) NOT NULL,
  visitor_hash VARCHAR(64),
  page_path VARCHAR(500) NOT NULL,
  event_category VARCHAR(50) NOT NULL,  -- scroll, click, engagement, conversion
  event_action VARCHAR(100) NOT NULL,   -- scroll_25, cta_click, time_on_page
  event_label VARCHAR(200),             -- hero_see_work, pricing_starter
  event_value INTEGER,                  -- scroll %, time in ms
  metadata JSONB DEFAULT '{}'::jsonb
);
```

**Existing Indexes:**
- `idx_events_created_at` (time-based queries)
- `idx_events_session_id` (session correlation)
- `idx_events_category` (category filtering)
- `idx_events_path_category` (page + category)
- `idx_events_category_action` (funnel queries)

### Event Types Being Collected

Based on tracking hooks (iteration-19):

| Category | Action Pattern | Value | Label |
|----------|----------------|-------|-------|
| scroll | scroll_25, scroll_50, scroll_75, scroll_100 | Percentage (25, 50, 75, 100) | - |
| engagement | time_on_page | Milliseconds | - |
| click | {category}_click | - | Element identifier |
| conversion | booking_intent, cal_embed_open | - | Optional metadata |

### Existing MetricCard Component

**File: `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/admin/components/MetricCard.tsx`**

Props interface:
```typescript
interface MetricCardProps {
  title: string;
  value: string | number;
  change: number;
  trend: "up" | "down" | "neutral";
  data: SparklineDataPoint[];  // For sparkline chart
  isLoading?: boolean;
}
```

Uses Recharts AreaChart for sparklines with gradient fills.

### Data Fetching Pattern

**Pattern from `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/admin/(dashboard)/page.tsx`:**

```typescript
const { data, isLoading, error } = useSWR<OverviewData>(
  `/api/analytics/overview?range=${timeRange}`,
  fetcher,
  {
    refreshInterval: 30000,
    revalidateOnFocus: true,
  }
);
```

### Visualization Libraries Available

**Package: Recharts v3.5.1** (already installed)

Available chart types verified:
- `AreaChart` - Used in MetricCard sparklines
- `BarChart` - Used in Visitors page
- `PieChart` - Used in Acquisition page
- `FunnelChart` - Available for conversion funnel

**Important:** Recharts v3.5.1 includes `FunnelChart` component (verified in types):
```typescript
export declare const FunnelChart: React.ForwardRefExoticComponent<CartesianChartProps>;
```

## Patterns Identified

### Page Component Pattern

**Description:** Standard admin page structure
**File: `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/admin/(dashboard)/acquisition/page.tsx`**

```typescript
export default function PageName() {
  const [timeRange, setTimeRange] = useState<TimeRange>("7d");
  
  const { data, error, isLoading } = useSWR<DataType>(
    `/api/analytics/endpoint?range=${timeRange}`,
    fetcher,
    { refreshInterval: 60000, revalidateOnFocus: true }
  );

  return (
    <div className="space-y-6">
      {/* Header with TimeRangeSelector */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="heading-xl text-white mb-2">Page Title</h1>
          <p className="text-slate-400">Description</p>
        </div>
        <TimeRangeSelector value={timeRange} onRangeChange={setTimeRange} />
      </div>

      {/* Error state */}
      {error && <ErrorBanner />}

      {/* Content sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart/Card components */}
      </div>
    </div>
  );
}
```

**Recommendation:** Follow this pattern exactly for EngagementPage.

### Card Container Pattern

**Description:** Glassmorphism card styling
**Use Case:** Wrapping charts and data sections

```typescript
<div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
  <div className="flex items-center gap-2 mb-4">
    <Icon className="w-5 h-5 text-purple-400" />
    <h3 className="text-lg font-medium text-white">Title</h3>
  </div>
  {/* Content */}
</div>
```

### API Response Pattern

**Description:** Standardized API response structure
**File: `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/api/analytics/pages/route.ts`**

```typescript
return NextResponse.json({
  data: processedData,
  meta: {
    range,
    sort,
    order,
    count: data.length,
  },
});
```

## Complexity Assessment

### High Complexity Areas

**1. Engagement Score Calculation**
- Formula: `(scroll 30%) + (time 40%) + (interactions 30%)`
- Requires aggregating multiple event types per session
- Need to normalize each component to 0-100 scale
- Complexity: **MEDIUM** - SQL aggregation is straightforward but needs careful normalization

**2. Conversion Funnel Visualization**
- Stages: pageview -> scroll_50 -> cta_click -> cal_open
- Requires correlating page_views table with events table
- Need percentage calculations between stages
- FunnelChart available in Recharts (no custom SVG needed)
- Complexity: **MEDIUM** - Query complexity moderate, visualization straightforward

### Medium Complexity Areas

**3. Scroll Depth Distribution Chart**
- Group by milestone (25/50/75/100%)
- Calculate session counts per milestone
- Standard BarChart visualization
- Complexity: **LOW** - Simple GROUP BY query

**4. Top Clicked Elements Table**
- Filter events by category='click'
- Aggregate by event_label
- Reuse DataTable component
- Complexity: **LOW** - Reuses existing patterns

### Low Complexity Areas

**5. AdminSidebar Extension**
- Add single item to navItems array
- No logic changes needed
- Complexity: **LOW** - 3 lines of code

**6. Real Time-on-Page in Pages Table**
- Update Pages API to join with events table
- Average event_value where category='engagement'
- Complexity: **LOW** - Simple SQL join addition

## Technology Recommendations

### Primary Stack

Already in place - no new dependencies needed:

| Technology | Version | Purpose |
|------------|---------|---------|
| Recharts | 3.5.1 | Charts (BarChart, FunnelChart, AreaChart) |
| SWR | 2.3.7 | Data fetching with caching |
| Lucide React | 0.517.0 | Icons |
| @vercel/postgres | 0.10.0 | Database queries |

### New Component Recommendations

**ConversionFunnel Component:**
```typescript
// /app/admin/components/ConversionFunnel.tsx
interface FunnelStep {
  name: string;
  value: number;
  fill: string;
}

// Use Recharts FunnelChart with LabelList
import { FunnelChart, Funnel, LabelList, Cell, ResponsiveContainer } from 'recharts';
```

**ScrollDepthChart Component:**
```typescript
// /app/admin/components/ScrollDepthChart.tsx
// Horizontal BarChart showing distribution across milestones
// Data: [{ milestone: '25%', count: 1234 }, ...]
```

## Integration Points

### API Endpoint Design

**New Endpoint: `/api/admin/engagement`**

```typescript
// Response structure
interface EngagementApiResponse {
  metrics: {
    avgScrollDepth: MetricData;
    avgTimeOnPage: MetricData;  // In seconds, not placeholder
    engagementScore: MetricData;
    totalSessions: MetricData;
  };
  funnel: {
    pageViews: number;
    scroll50: number;
    ctaClicks: number;
    calOpens: number;
  };
  scrollDistribution: {
    milestone: string;  // '25%', '50%', '75%', '100%'
    sessions: number;
    percentage: number;
  }[];
  topClicks: {
    label: string;
    category: string;
    count: number;
    pagePath: string;
  }[];
}
```

### Database Queries Required

**1. Scroll Depth Aggregation:**
```sql
-- Average scroll depth (use max scroll per session)
SELECT
  page_path,
  AVG(max_scroll) as avg_scroll_depth,
  COUNT(*) as sessions
FROM (
  SELECT session_id, page_path, MAX(event_value) as max_scroll
  FROM events
  WHERE event_category = 'scroll'
    AND created_at >= $1
  GROUP BY session_id, page_path
) per_session
GROUP BY page_path;
```

**2. Time on Page Aggregation:**
```sql
-- Average time per page (use max time per session)
SELECT
  page_path,
  AVG(event_value) / 1000 as avg_seconds,
  COUNT(DISTINCT session_id) as sessions
FROM events
WHERE event_category = 'engagement'
  AND event_action = 'time_on_page'
  AND created_at >= $1
GROUP BY page_path;
```

**3. Conversion Funnel Query:**
```sql
WITH pageview_sessions AS (
  SELECT COUNT(DISTINCT session_id) as count
  FROM page_views WHERE created_at >= $1
),
scroll_sessions AS (
  SELECT COUNT(DISTINCT session_id) as count
  FROM events
  WHERE event_category = 'scroll' AND event_value >= 50 AND created_at >= $1
),
click_sessions AS (
  SELECT COUNT(DISTINCT session_id) as count
  FROM events
  WHERE event_category = 'click' AND event_action LIKE 'cta_%' AND created_at >= $1
),
cal_sessions AS (
  SELECT COUNT(DISTINCT session_id) as count
  FROM events
  WHERE event_category = 'conversion' AND created_at >= $1
)
SELECT
  pv.count as page_views,
  s.count as scroll_50,
  c.count as cta_clicks,
  cal.count as cal_opens
FROM pageview_sessions pv
CROSS JOIN scroll_sessions s
CROSS JOIN click_sessions c
CROSS JOIN cal_sessions cal;
```

**4. Scroll Distribution Query:**
```sql
SELECT
  CASE
    WHEN event_value <= 25 THEN '25%'
    WHEN event_value <= 50 THEN '50%'
    WHEN event_value <= 75 THEN '75%'
    ELSE '100%'
  END as milestone,
  COUNT(DISTINCT session_id) as sessions
FROM events
WHERE event_category = 'scroll'
  AND created_at >= $1
GROUP BY milestone
ORDER BY milestone;
```

**5. Top Clicked Elements:**
```sql
SELECT
  event_label as label,
  SPLIT_PART(event_action, '_', 1) as category,
  COUNT(*) as count,
  page_path
FROM events
WHERE event_category = 'click'
  AND event_label IS NOT NULL
  AND created_at >= $1
GROUP BY event_label, event_action, page_path
ORDER BY count DESC
LIMIT 10;
```

**6. Engagement Score Calculation:**
```sql
-- Per-session engagement scores, then aggregate
WITH session_metrics AS (
  SELECT
    session_id,
    COALESCE(MAX(CASE WHEN event_category = 'scroll' THEN event_value END), 0) as scroll_depth,
    COALESCE(MAX(CASE WHEN event_category = 'engagement' THEN event_value END), 0) as time_ms,
    COUNT(CASE WHEN event_category = 'click' THEN 1 END) as clicks
  FROM events
  WHERE created_at >= $1
  GROUP BY session_id
),
scored AS (
  SELECT
    session_id,
    -- Scroll: 0-100 (already in range)
    scroll_depth * 0.3 +
    -- Time: normalize to 0-100 (cap at 5 min = 300000ms)
    LEAST(100, (time_ms::float / 300000) * 100) * 0.4 +
    -- Interactions: 0-100 (cap at 10 clicks)
    LEAST(100, clicks * 10) * 0.3 as score
  FROM session_metrics
)
SELECT ROUND(AVG(score)::numeric, 1) as avg_engagement_score
FROM scored;
```

### Update Pages API for Real Time-on-Page

**File: `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/api/analytics/pages/route.ts`**

Add CTE to join events:
```sql
-- Add to existing page_stats CTE
time_on_page AS (
  SELECT
    page_path,
    AVG(event_value) / 1000 as avg_seconds
  FROM events
  WHERE event_category = 'engagement'
    AND event_action = 'time_on_page'
    AND created_at >= ${startDateStr}
  GROUP BY page_path
)
-- Then LEFT JOIN in final SELECT:
LEFT JOIN time_on_page top ON ps.path = top.page_path
```

## Risks & Challenges

### Technical Risks

**1. Event Data Availability**
- Risk: Events may be sparse if tracking was recently deployed
- Impact: Empty charts, zero metrics
- Mitigation: Show "Collecting data..." states for <100 events

**2. Query Performance on Large Event Tables**
- Risk: Complex aggregations may slow down at scale
- Impact: Dashboard load times > 2s
- Mitigation: Existing indexes should handle; consider materialized views if needed

### Complexity Risks

**3. Engagement Score Edge Cases**
- Risk: Sessions with only scroll events (no time/clicks) get skewed scores
- Mitigation: Default missing components to 0, document score interpretation

## Recommendations for Planner

1. **Keep builder focused on a single page + API endpoint.** The Engagement page should be one builder task including:
   - `/app/admin/(dashboard)/engagement/page.tsx`
   - `/api/admin/engagement/route.ts`
   - AdminSidebar update (trivial)

2. **Split visualization components as separate concerns:**
   - ConversionFunnel component (can be reused elsewhere)
   - ScrollDepthChart component (simple BarChart)

3. **Update Pages API in parallel.** The avgTimeOnPage update to Pages table is independent and can be done by a second builder if parallelism is desired.

4. **Prioritize Funnel Visualization.** This is the highest-value deliverable for iteration 20 as it closes the analytics loop from impression to conversion.

5. **Use existing patterns exactly.** All components, styling, and data fetching patterns are established. No innovation needed.

## Resource Map

### Critical Files to Create

| File | Purpose |
|------|---------|
| `/app/admin/(dashboard)/engagement/page.tsx` | Main engagement dashboard page |
| `/app/api/admin/engagement/route.ts` | API endpoint for engagement metrics |
| `/app/admin/components/ConversionFunnel.tsx` | Funnel visualization component |
| `/app/admin/components/ScrollDepthChart.tsx` | Bar chart for scroll distribution |

### Files to Modify

| File | Change |
|------|--------|
| `/app/admin/components/AdminSidebar.tsx` | Add Engagement nav item |
| `/app/api/analytics/pages/route.ts` | Add real time-on-page from events |

### Key Dependencies

| Component | Import From |
|-----------|-------------|
| MetricCard | `@/app/admin/components/MetricCard` |
| MetricGrid | `@/app/admin/components/MetricGrid` |
| TimeRangeSelector | `@/app/admin/components/TimeRangeSelector` |
| DataTable | `@/app/admin/components/DataTable` |
| EmptyState | `@/app/admin/components/EmptyState` |
| SkeletonLoader | `@/app/admin/components/SkeletonLoader` |
| FunnelChart, Funnel | `recharts` |
| BarChart, Bar | `recharts` |
| BarChart2 (icon) | `lucide-react` |

### Testing Infrastructure

- **Unit tests:** Not required for dashboard components (visual testing preferred)
- **Manual testing:** Verify with real event data in Vercel Postgres
- **Empty state testing:** Ensure graceful handling of zero events

## Questions for Planner

1. **Funnel Granularity:** Should the conversion funnel show per-page funnels or site-wide funnel only? Site-wide is simpler and recommended for initial implementation.

2. **Engagement Score Display:** Should engagement score be shown per-page or as a site-wide average? Site-wide is simpler; per-page would require extending Pages table.

3. **Time Range Alignment:** Should Engagement page use same time ranges as other pages (today/7d/30d/90d), or add custom ranges for engagement analysis?

4. **Real-time Updates:** Should engagement metrics auto-refresh (like Overview at 30s)? Recommended: 60s refresh like other detail pages.

---

**Explorer 2 Complete**

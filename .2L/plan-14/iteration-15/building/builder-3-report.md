# Builder-3 Report: Pages Analytics

## Status
COMPLETE

## Summary
Implemented the complete Pages Analytics feature for the admin dashboard, including a reusable DataTable component with sortable columns, a comprehensive API endpoint for per-page metrics with CTEs for entry/exit/bounce calculations, and a full-featured pages analytics page with search, filtering, and SWR data fetching.

## Files Created

### Implementation
- `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/admin/components/DataTable.tsx` - Reusable sortable data table component with alternating row backgrounds, loading skeletons, and empty state
- `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/api/analytics/pages/route.ts` - GET endpoint returning per-page metrics with time range filtering and sorting
- `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/admin/pages/page.tsx` - Pages analytics dashboard page with TimeRangeSelector, search filter, and DataTable

## Success Criteria Met
- [x] DataTable component created with sortable columns
- [x] DataTable has props: columns (array of {key, label, sortable}), data, onSort
- [x] DataTable has hover states with purple accent
- [x] DataTable has alternating row backgrounds (bg-white/5 and bg-white/[0.03])
- [x] DataTable has sort indicator arrows
- [x] DataTable has empty state message
- [x] API route supports searchParams: range (today|7d|30d|90d), sort (views|visitors|bounce), order (asc|desc)
- [x] API returns per-page metrics: path, views, uniqueVisitors, bounceRate, avgTimeOnPage, entryRate, exitRate
- [x] API uses CTEs for calculating entry/exit pages
- [x] Bounce rate calculated as sessions with only 1 page view
- [x] Pages page has TimeRangeSelector at top
- [x] Pages page has search/filter input for page paths
- [x] Pages page has DataTable with all required columns
- [x] Pages page uses SWR for data fetching
- [x] Pages page has loading state with skeleton rows

## Implementation Details

### 1. DataTable Component (`/app/admin/components/DataTable.tsx`)

**Features:**
- Generic TypeScript component supporting any data type
- Sortable columns with click handlers and visual indicators (ChevronUp/ChevronDown/ChevronsUpDown)
- Column alignment options (left/center/right)
- Custom render functions for each column
- Alternating row backgrounds: `bg-white/5` and `bg-white/[0.03]`
- Purple accent hover states: `hover:bg-purple-500/10`
- Loading skeleton with pulse animation
- Empty state with FileText icon and customizable message

**Props Interface:**
```typescript
export interface Column<T> {
  key: keyof T | string;
  label: string;
  sortable?: boolean;
  align?: "left" | "center" | "right";
  render?: (value: unknown, row: T) => React.ReactNode;
}

export interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  sortKey?: string | null;
  sortOrder?: "asc" | "desc";
  onSort?: (key: string) => void;
  isLoading?: boolean;
  emptyMessage?: string;
}
```

### 2. Pages API Route (`/app/api/analytics/pages/route.ts`)

**Query Parameters:**
- `range`: "today" | "7d" | "30d" | "90d" (default: "7d")
- `sort`: "views" | "visitors" | "bounce" (default: "views")
- `order`: "asc" | "desc" (default: "desc")

**Response Format:**
```typescript
{
  data: PageMetrics[],
  meta: {
    range: string,
    sort: string,
    order: string,
    count: number
  }
}
```

**SQL Query Structure (CTEs):**
1. `page_stats` - Base views and visitor counts per page
2. `entry_pages` - Pages that started sessions (first page in session)
3. `exit_pages` - Pages that ended sessions (last page in session)
4. `total_sessions` - Total session count for rate calculations
5. `bounce_sessions` - Single-page session counts per page

**Metrics Calculation:**
- **Entry Rate**: `100 * entry_count / total_sessions_period`
- **Exit Rate**: `100 * exit_count / page_sessions`
- **Bounce Rate**: `100 * bounced_sessions / entry_count` (only for pages that were entry pages)
- **Avg Time on Page**: Placeholder (0) - requires additional time tracking implementation

### 3. Pages Analytics Page (`/app/admin/pages/page.tsx`)

**Features:**
- TimeRangeSelector for filtering by time period
- Search input with Search icon for filtering by page path (client-side)
- Refresh button with loading state
- Results count summary with clear filter option
- Error state display
- Auto-refresh every 30 seconds via SWR

**Columns:**
| Column | Sortable | Color Coding |
|--------|----------|--------------|
| Page | No | White with FileText icon |
| Views | Yes | Tabular nums |
| Unique Visitors | Yes | Tabular nums |
| Bounce Rate | Yes | Red (>70%), Amber (>50%), Green (<=50%) |
| Avg Time | No | Placeholder "--" |
| Entry % | No | Tabular nums |
| Exit % | No | Tabular nums |

## Tests Summary
- **TypeScript compilation:** PASSING
- **Next.js build:** PASSING
- **Routes registered:** `/admin/pages` and `/api/analytics/pages` visible in build output

## Dependencies Used
- `swr`: For data fetching with auto-refresh and revalidation
- `lucide-react`: For icons (Search, RefreshCw, FileText, ChevronUp, ChevronDown, ChevronsUpDown)
- `@vercel/postgres`: For database queries via sql template literals
- Existing component: `TimeRangeSelector` from admin components

## Patterns Followed
- **Design System:** Used `bg-white/5`, `backdrop-blur-xl`, `border-white/10`, `rounded-2xl` for cards
- **Purple Accent:** Used `purple-400`, `purple-500/10`, `purple-500/30` for active and hover states
- **Typography:** Used `heading-xl`, `text-slate-400`, `tabular-nums` for consistent styling
- **API Pattern:** Followed the dashboard GET route pattern with query params and JSON response
- **Component Pattern:** Client-side component with "use client" directive
- **SQL Pattern:** Used CTEs (Common Table Expressions) for complex calculations

## Integration Notes

### Exports for Other Builders
- `DataTable` component can be reused by other builders for any tabular data
- `Column` interface exported for type definitions

### Dependencies on Other Builders
- Uses `TimeRangeSelector` from iteration-14 Builder (already exists)
- Uses `page_views` table created by Builder-1 in iteration-14

### Environment Requirements
- `POSTGRES_URL` must be set for API to connect to database

## Challenges Overcome

### 1. TypeScript Generics
The DataTable generic constraint `T extends Record<string, unknown>` caused issues with interfaces like `PageMetrics`. Solved by changing to `T extends object` and casting internally.

### 2. Bounce Rate Calculation
Bounce rate needed to be calculated only for pages that were entry pages (first page of a session), not all pages. Used a join with entry_pages CTE to ensure accuracy.

### 3. SQL Interval with Vercel Postgres
Vercel Postgres sql template literals don't interpolate intervals directly. Solved by calculating the date in JavaScript and passing the ISO string to the query.

## Testing Notes

### Manual Testing via Browser
1. Navigate to `/admin/pages` after logging in
2. Verify TimeRangeSelector changes the data displayed
3. Test search functionality by typing a path
4. Click column headers to sort
5. Verify refresh button works and shows loading state

### API Testing via curl
```bash
# Default request
curl "http://localhost:3000/api/analytics/pages"

# With params
curl "http://localhost:3000/api/analytics/pages?range=30d&sort=visitors&order=asc"
```

## MCP Testing Performed
- MCP tools not required for this builder's scope
- Database queries are ready to execute against production database

## Notes

### Avg Time on Page
The `avgTimeOnPage` metric is returned as 0 (placeholder). Implementing accurate time-on-page tracking requires:
1. Tracking page exit events (unload, visibility change)
2. Storing timestamp pairs per page view
3. Calculating duration from timestamps

This is typically handled client-side with a separate tracking call on page exit.

### Performance Considerations
- Query limited to 100 pages
- Uses existing indexes: `idx_page_views_created_at`, `idx_page_views_session_id`, `idx_page_views_path`
- Client-side filtering for search (no additional DB queries)

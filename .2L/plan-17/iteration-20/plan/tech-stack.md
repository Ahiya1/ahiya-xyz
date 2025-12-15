# Technology Stack

## Core Framework

**Decision:** Next.js 14+ with App Router (existing)

**Rationale:**
- Already in use - no migration needed
- App Router enables template.tsx for page transitions
- Server/Client component model established

## Animation Library

**Decision:** Framer Motion v12.23.25 (existing)

**Rationale:**
- Already installed and used in reactive components (MagneticButton, TiltCard, AnimatedIcon)
- Provides AnimatePresence for page transitions
- Spring physics via useSpring hooks
- Variants system for orchestrated animations

**Usage in Iteration 20:**
- `AnimatePresence` for page transitions in template.tsx
- `motion.div` with `variants` for SectionReveal orchestration
- `useSpring` for continuous breathing animation

## CSS Animation Approach

**Decision:** Hybrid CSS + Framer Motion

**CSS Keyframes for:**
- Continuous/periodic animations (shimmer, breathing)
- Simple infinite loops
- Lower JS overhead

**Framer Motion for:**
- Scroll-triggered reveals with orchestration
- Complex stagger and variant coordination
- Interactive state management (connected animations)

**Rationale:**
- CSS better for always-on animations (no JS tick)
- Framer Motion better for coordinated reveals and user interaction
- Matches existing pattern in codebase

## Charts & Visualization

**Decision:** Recharts v3.5.1 (existing)

**Rationale:**
- Already installed and used in admin dashboard
- FunnelChart component available for conversion funnel
- BarChart for scroll depth distribution
- AreaChart already used in MetricCard sparklines

**New Components Used:**
- `FunnelChart`, `Funnel`, `Cell`, `LabelList` - Conversion funnel
- `BarChart`, `Bar`, `XAxis`, `YAxis` - Scroll depth distribution

## Data Fetching

**Decision:** SWR v2.3.7 (existing)

**Rationale:**
- Already used throughout admin dashboard
- Consistent pattern with existing pages
- Built-in caching, revalidation, refresh intervals

**Configuration:**
```typescript
// Standard admin page config
{
  refreshInterval: 60000, // 60s refresh
  revalidateOnFocus: true,
}
```

## Database

**Decision:** Vercel Postgres with @vercel/postgres (existing)

**Rationale:**
- Events table already exists from iteration-18
- Indexes in place for time-based and category-based queries
- No schema changes required

**Key Tables Used:**
- `events` - Behavioral event data (scroll, click, engagement, conversion)
- `page_views` - Page view counts for funnel top

## State Management

**Decision:** React useState/Context (no global state library)

**Rationale:**
- Connected animations require minimal shared state
- React Context sufficient for portfolio card group awareness
- No additional dependencies

**ConnectedAnimations Pattern:**
```typescript
// Context provides hovered card index to siblings
const PortfolioContext = createContext<{
  hoveredIndex: number | null;
  setHoveredIndex: (index: number | null) => void;
} | null>(null);
```

## Scroll Detection

**Decision:** Native IntersectionObserver + scroll event listener

**Rationale:**
- Already established pattern in useScrollReveal hook
- New useScrollProgress hook for progress bar
- Passive scroll listeners for performance

## Browser Support

**Decision:** Modern browsers with CSS :has() feature detection

**Primary Targets:**
- Chrome 105+
- Firefox 121+
- Safari 15.4+
- Edge 105+

**CSS :has() Support:**
```typescript
// Feature detection for connected animations
const supportsHas = CSS.supports('selector(:has(*))');
// Fallback to React state if not supported
```

**Reduced Motion:**
- All animations respect `prefers-reduced-motion`
- Existing useReducedMotion hook reused

## New Hooks to Create

| Hook | Purpose |
|------|---------|
| `useScrollProgress` | Continuous scroll percentage (0-100) for progress bar |
| `usePeriodicAnimation` | Timer-based trigger for shimmer (every 8-10s) |

## New Components to Create

| Component | Path | Purpose |
|-----------|------|---------|
| TextShimmer | `/app/components/choreography/TextShimmer.tsx` | Periodic gradient shimmer on text |
| HeroBreathing | `/app/components/choreography/HeroBreathing.tsx` | Continuous scale breathing wrapper |
| SectionReveal | `/app/components/choreography/SectionReveal.tsx` | Orchestrated reveal with variants |
| ConnectedAnimations | `/app/components/choreography/ConnectedAnimations.tsx` | Group awareness context provider |
| ScrollProgressBar | `/app/components/choreography/ScrollProgressBar.tsx` | Navigation scroll indicator |
| ConversionFunnel | `/app/admin/components/ConversionFunnel.tsx` | Recharts funnel visualization |
| ScrollDepthChart | `/app/admin/components/ScrollDepthChart.tsx` | Bar chart for scroll milestones |

## New API Endpoint

**Endpoint:** `/api/admin/engagement`

**Response Structure:**
```typescript
interface EngagementApiResponse {
  metrics: {
    avgScrollDepth: MetricData;
    avgTimeOnPage: MetricData;
    engagementScore: MetricData;
    totalSessions: MetricData;
  };
  funnel: {
    pageViews: number;
    scroll50: number;
    ctaClicks: number;
    calOpens: number;
  };
  scrollDistribution: Array<{
    milestone: string;
    sessions: number;
    percentage: number;
  }>;
  topClicks: Array<{
    label: string;
    category: string;
    count: number;
    pagePath: string;
  }>;
}
```

## Environment Variables

No new environment variables required. Uses existing:
- `POSTGRES_URL` - Database connection (existing)
- `ADMIN_PASSWORD_HASH` - Admin auth (existing)

## Dependencies Overview

All dependencies are already installed. No new packages required.

| Package | Version | Purpose |
|---------|---------|---------|
| framer-motion | 12.23.25 | Animation orchestration, page transitions |
| recharts | 3.5.1 | Charts (funnel, bar, area) |
| swr | 2.3.7 | Data fetching with caching |
| lucide-react | 0.517.0 | Icons (BarChart2 for engagement) |
| @vercel/postgres | 0.10.0 | Database queries |

## Performance Targets

| Metric | Target | Measurement |
|--------|--------|-------------|
| Lighthouse Performance | > 90 | Production build |
| First Contentful Paint | < 1.5s | Lighthouse |
| Largest Contentful Paint | < 2.5s | Lighthouse |
| Cumulative Layout Shift | < 0.1 | Lighthouse |
| Animation FPS | 60fps | Chrome DevTools |
| Bundle Size Increase | < 5KB | Build output diff |

## Security Considerations

### Admin Routes
- All `/api/admin/*` routes require authentication
- Existing session-based auth via cookies
- No new security surface

### Client Tracking
- Respects Do Not Track (DNT) header
- No PII collected
- Session ID stored in localStorage (no cookies)

### Input Validation
- API endpoints validate query parameters
- SQL queries use parameterized statements (existing pattern)

## Testing Strategy

### Unit Tests (Vitest)
- Hook behavior (useScrollProgress, usePeriodicAnimation)
- Component rendering with mocked props
- Animation state transitions

### Integration Tests
- API endpoint responses
- Database query correctness

### Manual Testing
- Visual animation verification
- Cross-browser testing
- Reduced motion behavior
- Mobile responsive behavior

## Code Organization

```
/app
  /components
    /choreography/           # NEW - All iteration-20 choreography components
      index.ts               # Barrel export
      TextShimmer.tsx
      HeroBreathing.tsx
      SectionReveal.tsx
      ConnectedAnimations.tsx
      ScrollProgressBar.tsx
  /hooks
    useScrollProgress.ts     # NEW
    usePeriodicAnimation.ts  # NEW
  /admin
    /components
      ConversionFunnel.tsx   # NEW
      ScrollDepthChart.tsx   # NEW
      AdminSidebar.tsx       # MODIFY - add nav item
    /(dashboard)
      /engagement
        page.tsx             # NEW
  /api
    /admin
      /engagement
        route.ts             # NEW
    /analytics
      /pages
        route.ts             # MODIFY - add time-on-page
  template.tsx               # NEW - Page transitions
  page.tsx                   # MODIFY - Integrate choreography
  globals.css                # MODIFY - Add keyframes
/lib
  animation-utils.ts         # MODIFY - Add spring presets
```

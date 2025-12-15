# Builder Task Breakdown

## Overview

**2 primary builders** will work in parallel with clearly separated domains:

1. **Builder-1: Choreography Components** - Animation layer for public site
2. **Builder-2: Admin Engagement Dashboard** - Analytics dashboard for admin

Builders have no file overlap and can work completely independently.

**Test generation is REQUIRED for each builder.**
**Minimum coverage: 70%**

---

## Builder Assignment Strategy

| Builder | Domain | Files Modified | Files Created |
|---------|--------|----------------|---------------|
| Builder-1 | Public site animations | `app/page.tsx`, `app/globals.css`, `app/components/Navigation.tsx`, `lib/animation-utils.ts` | 8 new files |
| Builder-2 | Admin dashboard | `app/admin/components/AdminSidebar.tsx`, `app/api/analytics/pages/route.ts` | 5 new files |

---

## Builder-1: Choreography Components

### Scope

Create the choreographed animation layer for the public site:
- TextShimmer component for periodic headline shimmer
- HeroBreathing component for continuous scale animation
- SectionReveal component with 4 variants (fade, fan-in, cascade, scale-glow)
- ConnectedAnimations context for portfolio card group awareness
- ScrollProgressBar component for navigation
- Page transitions via template.tsx
- Supporting hooks (useScrollProgress, usePeriodicAnimation)
- Integration into homepage

### Complexity Estimate

**HIGH**

Multiple components with interconnected behavior, Framer Motion integration, CSS keyframes, and homepage integration. However, components are well-defined and follow established patterns.

### Success Criteria

- [ ] Hero headline shimmers every 8-10 seconds
- [ ] Hero has continuous breathing animation (1.0 -> 1.005 -> 1.0)
- [ ] Portfolio cards fan in from above/below on scroll
- [ ] How I Work steps cascade sequentially on scroll
- [ ] Non-hovered portfolio cards recede when sibling hovered
- [ ] Scroll progress bar visible in navigation header
- [ ] Page transitions fade smoothly (0.2-0.3s)
- [ ] All animations respect prefers-reduced-motion
- [ ] Lighthouse Performance score > 90
- [ ] Test coverage >= 70%

### Files to Create

| File | Purpose |
|------|---------|
| `/app/components/choreography/index.ts` | Barrel export |
| `/app/components/choreography/TextShimmer.tsx` | Periodic text shimmer effect |
| `/app/components/choreography/HeroBreathing.tsx` | Continuous scale animation |
| `/app/components/choreography/SectionReveal.tsx` | Orchestrated reveal variants |
| `/app/components/choreography/ConnectedAnimations.tsx` | Group awareness context |
| `/app/components/choreography/ScrollProgressBar.tsx` | Navigation progress indicator |
| `/app/hooks/useScrollProgress.ts` | Continuous scroll percentage |
| `/app/hooks/usePeriodicAnimation.ts` | Timer-based animation trigger |
| `/app/template.tsx` | Page transition wrapper |

### Files to Modify

| File | Changes |
|------|---------|
| `/app/page.tsx` | Integrate choreography components |
| `/app/globals.css` | Add text-shimmer and hero-breathe keyframes |
| `/app/components/Navigation.tsx` | Add ScrollProgressBar |
| `/lib/animation-utils.ts` | Add reveal and cascade spring presets |

### Test Files to Create

| Test File | Tests |
|-----------|-------|
| `/app/hooks/useScrollProgress.test.ts` | Hook behavior, scroll calculation, edge cases |
| `/app/hooks/usePeriodicAnimation.test.ts` | Timer behavior, trigger function, cleanup |
| `/app/components/choreography/TextShimmer.test.tsx` | Rendering, reduced motion, timing |
| `/app/components/choreography/SectionReveal.test.tsx` | Variants, intersection observer |
| `/app/components/choreography/ConnectedAnimations.test.tsx` | Context, hover state propagation |
| `/app/components/choreography/ScrollProgressBar.test.tsx` | Progress calculation, visibility |

### Dependencies

**Depends on:** None (independent)
**Blocks:** Integration (must complete before final validation)

### Implementation Notes

1. **Start with hooks** - useScrollProgress and usePeriodicAnimation are foundational
2. **Build components in order:**
   - HeroBreathing (simplest)
   - ScrollProgressBar (depends on useScrollProgress)
   - TextShimmer (depends on usePeriodicAnimation)
   - SectionReveal (most complex, standalone)
   - ConnectedAnimations (standalone context)
3. **Add CSS keyframes early** - needed by TextShimmer
4. **Integrate into homepage last** - after all components tested
5. **Page transitions optional** - implement if time permits, can be skipped if performance issues

### Patterns to Follow

Reference patterns from `patterns.md`:
- Use `useScrollProgress` pattern for scroll tracking
- Use `usePeriodicAnimation` pattern for shimmer timing
- Use `TextShimmer` pattern for overlay approach
- Use `HeroBreathing` pattern with Framer Motion animate prop
- Use `SectionReveal` pattern with variants system
- Use `ConnectedAnimations` pattern with React Context
- Follow import order convention
- All components must check `useReducedMotion()`

### Testing Requirements

- Unit tests for hooks (useScrollProgress, usePeriodicAnimation)
- Component tests for all choreography components
- Test reduced motion behavior for all components
- Coverage target: 70%+

### Homepage Integration Map

```tsx
// app/page.tsx modifications

// 1. Import choreography components
import {
  TextShimmer,
  HeroBreathing,
  SectionReveal,
  ConnectedAnimationsProvider,
  ConnectedCard,
} from "@/app/components/choreography";

// 2. Wrap hero headline
<HeroBreathing>
  <TextShimmer intervalMs={9000}>
    <h1 className="display-xl text-white mb-6">
      {/* existing content */}
    </h1>
  </TextShimmer>
</HeroBreathing>

// 3. Wrap portfolio section
<SectionReveal variant="fan-in">
  <div className="grid md:grid-cols-2 gap-6 md:gap-8">
    <ConnectedAnimationsProvider>
      {portfolioProjects.map((project, index) => (
        <ConnectedCard key={project.id} index={index}>
          <SectionReveal.Item index={index} totalItems={4} variant="fan-in">
            <PortfolioCard project={project} index={index} />
          </SectionReveal.Item>
        </ConnectedCard>
      ))}
    </ConnectedAnimationsProvider>
  </div>
</SectionReveal>

// 4. Wrap How I Work section
<SectionReveal variant="cascade">
  <div className="grid sm:grid-cols-3 gap-8 max-w-4xl mx-auto mb-8">
    {steps.map((step, index) => (
      <SectionReveal.Item key={index} index={index} variant="cascade">
        {/* step content */}
      </SectionReveal.Item>
    ))}
  </div>
</SectionReveal>

// 5. Wrap Contact CTA
<SectionReveal variant="scale-glow">
  {/* existing CTA content */}
</SectionReveal>
```

---

## Builder-2: Admin Engagement Dashboard

### Scope

Create the engagement analytics tab in the admin dashboard:
- Add Engagement nav item to AdminSidebar
- Create Engagement page with metrics and visualizations
- Create ConversionFunnel component
- Create ScrollDepthChart component
- Create API endpoint for engagement data
- Update Pages API to include real time-on-page

### Complexity Estimate

**MEDIUM**

Follows established admin dashboard patterns. Uses existing MetricCard, TimeRangeSelector, and Recharts. SQL queries are moderately complex but follow existing patterns.

### Success Criteria

- [ ] Engagement tab visible in admin sidebar
- [ ] Engagement page loads with MetricCards
- [ ] Conversion funnel shows: pageview -> scroll_50 -> cta_click -> cal_open
- [ ] Scroll depth distribution shows 25/50/75/100% milestones
- [ ] Top clicked elements table shows most-clicked CTAs
- [ ] Engagement score calculated and displayed
- [ ] Pages table shows real time-on-page (not placeholder)
- [ ] All data refreshes every 60 seconds
- [ ] Empty states shown when no data
- [ ] Test coverage >= 70%

### Files to Create

| File | Purpose |
|------|---------|
| `/app/admin/(dashboard)/engagement/page.tsx` | Engagement dashboard page |
| `/app/api/admin/engagement/route.ts` | API endpoint for metrics |
| `/app/admin/components/ConversionFunnel.tsx` | Funnel visualization |
| `/app/admin/components/ScrollDepthChart.tsx` | Bar chart for scroll milestones |

### Files to Modify

| File | Changes |
|------|---------|
| `/app/admin/components/AdminSidebar.tsx` | Add Engagement nav item |
| `/app/api/analytics/pages/route.ts` | Add real time-on-page from events |

### Test Files to Create

| Test File | Tests |
|-----------|-------|
| `/app/api/admin/engagement/route.test.ts` | API responses, auth, error handling |
| `/app/admin/components/ConversionFunnel.test.tsx` | Rendering, data display, conversion rates |
| `/app/admin/components/ScrollDepthChart.test.tsx` | Rendering, data display |
| `/app/admin/(dashboard)/engagement/page.test.tsx` | Page rendering, data fetching states |

### Dependencies

**Depends on:** Existing events table (created iteration-18)
**Blocks:** None (independent)

### Implementation Notes

1. **Start with AdminSidebar update** - trivial change, immediate visibility
2. **Create API endpoint early** - page needs data to render
3. **Build visualization components:**
   - ConversionFunnel (uses FunnelChart from Recharts)
   - ScrollDepthChart (uses BarChart from Recharts)
4. **Build page last** - composes all components
5. **Update Pages API** - independent, can be done anytime

### Patterns to Follow

Reference patterns from `patterns.md`:
- Use `Admin Page Structure` pattern for page layout
- Use `ConversionFunnel Component` pattern for visualization
- Use `API Route for Engagement Data` pattern for endpoint
- Follow card container styling with glassmorphism
- Use existing TimeRangeSelector and MetricCard components
- Use SWR with 60s refresh interval

### Testing Requirements

- API endpoint tests (auth, responses, error handling)
- Component tests for visualizations
- Page test with mocked SWR
- Coverage target: 70%+

### AdminSidebar Update

```typescript
// /app/admin/components/AdminSidebar.tsx
// Add to navItems array:

import { BarChart2 } from "lucide-react";

const navItems = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/realtime", label: "Real-Time", icon: Activity },
  { href: "/admin/pages", label: "Pages", icon: FileText },
  { href: "/admin/acquisition", label: "Acquisition", icon: TrendingUp },
  { href: "/admin/visitors", label: "Visitors", icon: Users },
  { href: "/admin/engagement", label: "Engagement", icon: BarChart2 }, // NEW
  { href: "/admin/export", label: "Export", icon: Download },
];
```

### Pages API Update

```typescript
// /app/api/analytics/pages/route.ts
// Add CTE for time on page:

const query = sql`
  WITH page_stats AS (
    -- existing query
  ),
  time_on_page AS (
    SELECT
      page_path,
      AVG(event_value) / 1000 as avg_seconds
    FROM events
    WHERE event_category = 'engagement'
      AND event_action = 'time_on_page'
      AND created_at >= ${startDateStr}::timestamptz
    GROUP BY page_path
  )
  SELECT
    ps.*,
    COALESCE(top.avg_seconds, 0) as avg_time_on_page
  FROM page_stats ps
  LEFT JOIN time_on_page top ON ps.path = top.page_path
  ORDER BY ${sortColumn} ${orderDirection}
`;
```

---

## Builder Execution Order

### Parallel Group (No dependencies)

Both builders can start immediately and work in parallel:

| Builder | Start Condition | Estimated Duration |
|---------|-----------------|-------------------|
| Builder-1 | Immediate | 2.5-3 hours |
| Builder-2 | Immediate | 2-2.5 hours |

### Integration (After both complete)

1. Verify no file conflicts (should be none by design)
2. Run full test suite
3. Run Lighthouse audit
4. Manual verification of all success criteria

---

## Integration Notes

### No File Conflicts Expected

Builder-1 and Builder-2 work on completely separate file sets:

- Builder-1: `/app/components/choreography/`, `/app/hooks/`, `/app/page.tsx`, `/app/template.tsx`, `/app/globals.css`
- Builder-2: `/app/admin/`, `/app/api/admin/`

Only shared reference (read-only): `/lib/tracking.ts`, `/lib/types/events.ts`

### Potential Coordination Points

1. **Animation performance** - If Builder-1's animations affect Lighthouse score significantly, page transitions may need to be disabled
2. **Build verification** - Both builders should run `npm run build` before marking complete

### Testing Integration

Run combined test suite after both builders complete:
```bash
npm run test -- --coverage
```

Verify combined coverage >= 70%.

---

## Complexity Legend

| Level | Description | Typical Duration | Split Recommendation |
|-------|-------------|------------------|---------------------|
| LOW | Single component, clear pattern | < 1 hour | No split needed |
| MEDIUM | Multiple files, some complexity | 1-2 hours | Optional split |
| HIGH | Many files, integration needed | 2-4 hours | Consider split |
| VERY HIGH | Complex orchestration | 4+ hours | Recommend split |

---

## Post-Build Checklist

### Builder-1 Completion
- [ ] All 9 files created
- [ ] All 4 files modified
- [ ] All 6 test files created
- [ ] `npm run build` succeeds
- [ ] `npm run test` passes with >= 70% coverage
- [ ] Lighthouse Performance > 90

### Builder-2 Completion
- [ ] All 4 files created
- [ ] All 2 files modified
- [ ] All 4 test files created
- [ ] `npm run build` succeeds
- [ ] `npm run test` passes with >= 70% coverage
- [ ] Engagement page loads with data

### Final Validation
- [ ] Both builders complete
- [ ] Full test suite passes
- [ ] Lighthouse Performance > 90
- [ ] All success criteria verified
- [ ] Ready for deployment

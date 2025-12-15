# Master Exploration Report

## Explorer ID
master-explorer-2

## Focus Area
Dependencies & Risk Assessment

## Vision Summary
Transform ahiya.xyz into a "Living Site" with ambient animations, reactive interactions, choreographed reveals, and comprehensive behavioral analytics tracking to improve engagement and measure conversions.

---

## Technology Dependencies Analysis

### Current Stack Assessment

**Core Dependencies (from package.json):**
| Dependency | Version | Status | Risk Level |
|------------|---------|--------|------------|
| framer-motion | ^12.23.25 | Current (latest: 12.23.26) | LOW |
| @calcom/embed-react | ^1.5.3 | Current | LOW |
| @vercel/postgres | ^0.10.0 | Current | LOW |
| next | ^16.0.7 | Current | LOW |
| react | ^19.0.0 | Current | LOW |
| tailwindcss | ^4.1.10 | Current | LOW |
| swr | ^2.3.7 | Current | LOW |

**Framer Motion Capability Assessment:**
- **Installed Version:** 12.23.25 (nearly latest)
- **Current Usage:** Limited to admin dashboard (`LiveFeed.tsx`) with basic `AnimatePresence` and `motion.div`
- **Unused Potential:** Motion variants, spring physics, scroll animations, gesture handling
- **Required Features for Plan-17:**
  - `useScroll` - scroll-linked animations (available)
  - `useInView` - scroll-triggered reveals (available)
  - `useSpring` - magnetic button physics (available)
  - `motion.div` with `whileHover`, `whileInView` - reactive interactions (available)
  - `AnimatePresence` - page transitions (available)
  - `useMotionValue` / `useTransform` - 3D tilt effects (available)

**Verdict: Framer Motion CAN handle all required animations efficiently.**

---

### Database Dependencies

**Current Schema (`scripts/schema.sql`):**
```sql
-- Existing table
CREATE TABLE page_views (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  path VARCHAR(500) NOT NULL,
  referrer VARCHAR(2000),
  utm_source VARCHAR(100),
  utm_medium VARCHAR(100),
  utm_campaign VARCHAR(200),
  utm_content VARCHAR(200),
  utm_term VARCHAR(200),
  session_id VARCHAR(36) NOT NULL,
  visitor_hash VARCHAR(64) NOT NULL,
  device_type VARCHAR(20) NOT NULL DEFAULT 'desktop',
  browser VARCHAR(50),
  browser_version VARCHAR(20),
  os VARCHAR(50),
  os_version VARCHAR(20),
  country VARCHAR(2),
  city VARCHAR(100),
  region VARCHAR(100),
  user_agent TEXT
);
```

**Required Schema Changes for Events Table:**
```sql
-- NEW table needed
CREATE TABLE events (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  session_id VARCHAR(36) NOT NULL,
  visitor_hash VARCHAR(64) NOT NULL,
  page_path VARCHAR(500) NOT NULL,
  event_category VARCHAR(50) NOT NULL,  -- 'scroll', 'click', 'engagement', 'conversion'
  event_action VARCHAR(100) NOT NULL,   -- 'scroll_25', 'cta_click', 'card_hover'
  event_label VARCHAR(200),             -- 'hero_cta', 'portfolio_mirror'
  event_value INTEGER,                  -- scroll %, time in ms, etc.
  metadata JSONB                        -- flexible additional data
);

-- Required indexes
CREATE INDEX idx_events_created_at ON events (created_at DESC);
CREATE INDEX idx_events_session_id ON events (session_id);
CREATE INDEX idx_events_category ON events (event_category);
CREATE INDEX idx_events_path ON events (page_path);
```

**Database Risk Assessment:**
- Vercel Postgres handles this well
- No foreign key constraints needed (session_id is just correlation, not referential)
- JSONB for metadata provides flexibility without schema migrations
- Estimated storage impact: ~500 bytes per event, manageable even at scale

---

### API Route Structure Analysis

**Existing Analytics Endpoints:**
| Endpoint | Method | Purpose | Status |
|----------|--------|---------|--------|
| `/api/analytics/track` | POST | Page view tracking | EXISTS |
| `/api/analytics/overview` | GET | Dashboard metrics | EXISTS |
| `/api/analytics/pages` | GET | Page-level analytics | EXISTS |
| `/api/analytics/visitors` | GET | Visitor data | EXISTS |
| `/api/analytics/acquisition` | GET | Traffic sources | EXISTS |
| `/api/analytics/realtime` | GET | Live feed data | EXISTS |
| `/api/analytics/export` | GET | Data export | EXISTS |

**Required New Endpoints:**
| Endpoint | Method | Purpose | Priority |
|----------|--------|---------|----------|
| `/api/analytics/event` | POST | Event tracking | MUST-HAVE |
| `/api/analytics/engagement` | GET | Engagement metrics | MUST-HAVE |
| `/api/analytics/conversions` | GET | Conversion funnel | MUST-HAVE |

**API Risk Assessment:** LOW - follows existing patterns, well-structured codebase

---

### Cal.com Integration Analysis

**Current Implementation (`app/components/CalcomEmbed.tsx`):**
```typescript
// Uses @calcom/embed-react with dark theme
const cal = await getCalApi();
cal("ui", {
  theme: "dark",
  styles: { branding: { brandColor: "#a855f7" } },
  hideEventTypeDetails: false,
});
```

**Tracking Possibilities:**
1. **Cal.com Events API:** The `getCalApi()` returns an API that supports event listeners
2. **Available Events:**
   - `cal("on", { action: "bookingSuccessful", callback: ... })` - booking completed
   - `cal("on", { action: "linkReady", callback: ... })` - embed loaded
   - `cal("on", { action: "eventTypeSelected", callback: ... })` - user selected event type
3. **Limitation:** No webhook for completed bookings without Cal.com Pro plan

**Conversion Tracking Strategy:**
- Track "Book Discovery Call" button clicks (easy)
- Track Cal.com embed visibility/open events (moderate)
- Track booking completion via Cal.com callbacks (available)
- Full funnel: Page view -> CTA click -> Cal.com open -> Booking

---

## Risk Assessment

### High Risks

**1. Performance with Particle System**
- **Risk:** Continuous particle animations (15-25 particles) could cause jank on lower-end devices
- **Impact:** Poor UX, high CPU usage, battery drain on mobile
- **Mitigation:**
  - Use CSS transforms only (GPU-accelerated)
  - Implement `will-change: transform` sparingly
  - Add device capability detection (reduce particles on mobile)
  - Respect `prefers-reduced-motion` (already pattern in codebase)
- **Recommendation:** Start with 10 particles, measure performance, scale up

**2. Bundle Size with Animation Components**
- **Risk:** Multiple animation components could bloat the client bundle
- **Impact:** Slower initial page load, worse Lighthouse scores
- **Mitigation:**
  - Lazy load animation components with `next/dynamic`
  - Tree-shake Framer Motion (import only what's needed)
  - Consider CSS-only for simple animations (already 30+ keyframes defined)
- **Current State:** Framer Motion is already in bundle (~40KB gzipped)

### Medium Risks

**3. Animation Timing Conflicts**
- **Risk:** Multiple continuous animations competing could create visual chaos
- **Impact:** "Busy" feeling rather than "alive" feeling
- **Mitigation:**
  - Establish animation hierarchy (ambient < reactive < choreographed)
  - Use different timing functions for different layers
  - Test extensively with real users
- **Recommendation:** Create animation design system with timing guidelines

**4. Database Load from Event Tracking**
- **Risk:** High-traffic scenarios could generate many events
- **Impact:** Database costs, query performance
- **Mitigation:**
  - Batch events on client-side (send every 5 seconds)
  - Throttle scroll depth events (only at 25/50/75/100%)
  - Aggregate old events into summary tables
- **Estimation:** Even 10K daily visitors with 5 events each = 50K rows/day (manageable)

**5. Cal.com Embed Interaction Tracking**
- **Risk:** Cal.com may change their API or limit event access
- **Impact:** Conversion tracking could break
- **Mitigation:**
  - Document Cal.com API version being used
  - Add error handling for missing callbacks
  - Consider fallback to button-click-only tracking

### Low Risks

**6. Framer Motion Breaking Changes**
- **Risk:** Major version update could break animations
- **Impact:** Requires code updates
- **Mitigation:** Pin to ^12.x, test updates before deploying
- **Current:** Using ^12.23.25, very stable

**7. CSS Animation Compatibility**
- **Risk:** Some CSS animations may not work in all browsers
- **Impact:** Degraded experience in older browsers
- **Mitigation:** Existing codebase already has graceful degradation patterns
- **Note:** 30+ keyframes already exist and are well-tested

---

## Dependency Chain Analysis

### Critical Path

```
Foundation Phase
├── Events table schema (no dependencies)
├── /api/analytics/event endpoint (needs schema)
└── Client-side tracking library (needs endpoint)
    ↓
Animation Components
├── AmbientParticles component (no dependencies)
├── BreathingGradient component (no dependencies)
├── MagneticButton component (no dependencies)
└── TiltCard component (no dependencies)
    ↓
Page Integration
├── Homepage animations (needs components)
├── Pricing page animations (needs components)
├── Project pages (needs components, can parallelize)
└── CV page (needs components)
    ↓
Analytics Integration
├── Scroll tracking hooks (needs tracking library)
├── Click tracking (needs tracking library)
├── Time-on-page tracking (needs tracking library)
└── Cal.com conversion tracking (needs tracking library)
    ↓
Admin Dashboard
├── Engagement tab (needs events in DB)
├── Funnel visualization (needs conversion data)
└── Engagement score calculation (needs all metrics)
```

### Parallelization Opportunities

**Can be built in parallel (no dependencies on each other):**
1. Events table + API endpoint
2. All animation components (AmbientParticles, MagneticButton, TiltCard, etc.)
3. CSS animation enhancements

**Must be sequential:**
1. Tracking library depends on API endpoint
2. Page integrations depend on components
3. Dashboard visualizations depend on data in database

---

## Iteration Breakdown Recommendation

### Recommendation: MULTI-ITERATION (2 phases recommended)

**Rationale:**
- 22 features across two distinct domains (animations + analytics)
- Natural separation: visual work vs data infrastructure
- Risk mitigation: validate animations work before adding tracking overhead
- Allows course correction if animations feel "too much"

### Suggested Iteration Phases

**Iteration 1: The Living Site (Animations)**
- **Vision:** Make the site undeniably alive with ambient, reactive, and choreographed animations
- **Scope:**
  - Ambient Layer: Particles, breathing gradients, floating orbs
  - Reactive Layer: Magnetic CTAs, 3D tilt cards, animated icons
  - Choreographed Layer: Section reveals, text shimmer, connected animations
  - Continuous Layer: Hero breathing, page transitions
- **Why first:**
  - Independent of analytics (no backend changes)
  - High visual impact, immediately noticeable
  - Allows testing animation performance before adding tracking
- **Estimated duration:** 8-12 hours
- **Risk level:** MEDIUM (performance concerns with particles)
- **Success criteria:**
  - [ ] Lighthouse performance score > 90
  - [ ] All animations respect `prefers-reduced-motion`
  - [ ] Site feels "alive" on first visit
  - [ ] No visible jank on mid-range devices

**Iteration 2: Enhanced Analytics**
- **Vision:** Measure everything that matters - scroll depth, engagement time, conversions
- **Scope:**
  - Database: Events table with proper indexes
  - API: Event tracking endpoint
  - Client: Tracking library with batching
  - Tracking: Scroll depth, time-on-page, click tracking
  - Conversions: Cal.com integration, funnel tracking
  - Dashboard: Engagement tab, funnel visualization
- **Dependencies:**
  - Requires iteration 1 complete (to track interactions with animated elements)
  - Uses existing analytics patterns from `/api/analytics/*`
- **Estimated duration:** 6-8 hours
- **Risk level:** LOW (follows existing patterns)
- **Success criteria:**
  - [ ] Scroll depth tracked on all pages
  - [ ] Real time-on-page (not placeholder 45s)
  - [ ] CTA click tracking working
  - [ ] Conversion funnel visible in admin
  - [ ] Engagement score calculated

---

## Production Mode Requirements

### Testing Framework Assessment

**Current State:** No testing framework configured (no vitest.config.* found)

**Recommendation: Add Vitest**
- Vitest works excellently with Next.js 16
- Fast, ESM-native, TypeScript support out of box
- Would need: `vitest`, `@testing-library/react`, `@testing-library/user-event`

**Testing Priorities for Plan-17:**
1. Client-side tracking library (critical - must not throw errors)
2. Event API endpoint (validate data shape)
3. Animation hooks (useScrollReveal, useMagnetic)
4. Engagement score calculation (pure function, easy to test)

**Estimated Addition:** 2-3 hours to set up Vitest + write critical path tests

### Security Considerations

**Analytics Privacy:**
- Existing pattern uses SHA-256 visitor hash (privacy-preserving)
- No PII stored in events table
- Should respect `Do Not Track` header (mentioned in vision)
- GDPR consideration: events don't contain personal data

**Rate Limiting:**
- Consider adding rate limiting to `/api/analytics/event`
- Prevent abuse from malicious clients flooding events
- Simple implementation: max 100 events per session per minute

**Input Validation:**
- Validate event_category is from allowed list
- Sanitize event_label (could contain user input)
- Limit metadata JSONB size

### CI/CD Tooling Needs

**Current State:** No CI/CD configuration visible in project root

**For Plan-17:**
- Database migrations need to run before deployment
- Consider adding a `scripts/migrate.ts` for schema updates
- Vercel handles deployment, but schema needs manual intervention

**Recommendation:**
- Add migration script that can be run via Vercel CLI
- Document migration process in plan
- Consider `prisma` for future schema management (not blocking for this iteration)

### Dependencies with Known Issues

**None Critical Found**

**Minor Notes:**
- `framer-motion` 12.x is stable, no known breaking issues
- `@calcom/embed-react` works well, occasional hydration warnings (cosmetic)
- `@vercel/postgres` is production-ready

---

## Key Questions Answered

### 1. Can Framer Motion handle all required animations efficiently?
**YES.** Framer Motion 12.x supports all required features:
- Scroll-linked animations via `useScroll`
- Magnetic effects via `useSpring`
- 3D transforms via `useMotionValue` + `useTransform`
- Orchestrated reveals via `variants`
- Page transitions via `AnimatePresence`

The library is already in the bundle; we're just underutilizing it.

### 2. What database changes are needed for the events table?
**New table + 4 indexes:**
```sql
CREATE TABLE events (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  session_id VARCHAR(36) NOT NULL,
  visitor_hash VARCHAR(64) NOT NULL,
  page_path VARCHAR(500) NOT NULL,
  event_category VARCHAR(50) NOT NULL,
  event_action VARCHAR(100) NOT NULL,
  event_label VARCHAR(200),
  event_value INTEGER,
  metadata JSONB
);

CREATE INDEX idx_events_created_at ON events (created_at DESC);
CREATE INDEX idx_events_session_id ON events (session_id);
CREATE INDEX idx_events_category ON events (event_category);
CREATE INDEX idx_events_path ON events (page_path);
```

### 3. Are there performance risks with the particle system?
**MEDIUM risk, mitigatable:**
- Start with 10 particles (not 25)
- Use CSS transforms only (GPU-accelerated)
- Reduce/disable on mobile
- Already have `prefers-reduced-motion` support
- Add performance monitoring before production

### 4. What are the main technical risks?
1. **Performance with continuous animations** - mitigate with careful implementation
2. **Animation timing conflicts** - establish hierarchy and guidelines
3. **Bundle size growth** - lazy load, tree shake
4. **Cal.com API stability** - add error handling, fallback tracking

---

## Recommendations for Master Plan

1. **Split into 2 iterations:**
   - Iteration 1: Animations only (decouple from analytics)
   - Iteration 2: Analytics infrastructure (build on stable animation layer)

2. **Animation Performance Strategy:**
   - Create performance budget: 60fps target, <5% CPU usage
   - Test on mobile-first (iPhone 11 Pro era as baseline)
   - Use CSS for simple animations, Framer Motion for complex ones

3. **Consider adding Vitest:**
   - Critical for tracking library reliability
   - 2-3 hours investment pays dividends in stability

4. **Plan database migration:**
   - Events table schema is straightforward
   - Run migration before iteration 2 deployment

5. **Document animation guidelines:**
   - Create animation design system
   - Establish timing hierarchy to prevent "chaos"

---

## Technology Recommendations

### Existing Codebase Findings

- **Stack detected:** Next.js 16, React 19, Framer Motion 12, Vercel Postgres, Tailwind 4
- **Patterns observed:**
  - CSS-first animations (30+ keyframes in globals.css)
  - Custom `useScrollReveal` hook already implemented
  - `prefers-reduced-motion` respected throughout
  - Well-structured API routes with TypeScript
- **Opportunities:**
  - Framer Motion vastly underutilized (only in admin LiveFeed)
  - Could leverage existing CSS animations more
  - SWR available for real-time dashboard updates
- **Constraints:**
  - No testing framework (should add Vitest)
  - No Prisma (raw SQL, which is fine for this scope)
  - Must maintain Lighthouse score > 90

### New Dependencies Recommended

| Dependency | Purpose | Risk |
|------------|---------|------|
| vitest | Testing framework | LOW (dev only) |
| @testing-library/react | Component testing | LOW (dev only) |

No new production dependencies needed - existing stack is sufficient.

---

## Notes & Observations

- The codebase is exceptionally well-organized with clear separation of concerns
- Existing CSS animation infrastructure is robust (30+ keyframes, proper reduced-motion support)
- Admin dashboard already has SWR polling patterns that can be extended
- Middleware-based analytics tracking is elegant and non-blocking
- Cal.com integration is already themed to match site aesthetic
- The placeholder `avgDuration: 45` in overview API is explicitly noted as needing real tracking

---

*Exploration completed: 2025-12-15*
*This report informs master planning decisions*

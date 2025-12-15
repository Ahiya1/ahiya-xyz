# Technology Stack

## Core Framework

**Decision:** Next.js 15 with App Router (existing)

**Rationale:**
- Already in use, no changes required
- App Router enables server components for optimal performance
- Root layout is ideal integration point for ambient and tracking layers

**Version:** Next.js 15.x (existing)

## Database

**Decision:** Vercel Postgres with SQL template literals (existing)

**Rationale:**
- Already integrated for page_views table
- SQL template literals provide type safety and injection protection
- No ORM overhead, direct SQL for performance

**Schema Strategy:**
- Add `events` table following existing page_views pattern
- Use same indexing strategy (created_at DESC, session_id, compound indexes)
- JSONB metadata field for flexible event data

**New Table: events**
```sql
CREATE TABLE events (
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
```

## Animation Strategy

**Decision:** CSS @keyframes for all ambient animations

**Rationale:**
- GPU composited - browser handles all timing
- Works seamlessly with global `prefers-reduced-motion`
- No JavaScript event loops or requestAnimationFrame overhead
- Existing pattern in codebase (30+ keyframes already defined)
- Better performance score than JS-based animations

**Implementation:**
- Transform and opacity only (GPU-accelerated properties)
- `will-change` hints for browser optimization
- `contain: layout style` for isolation
- Staggered animation delays for natural movement

**Alternatives Considered:**
- Framer Motion: Better for interactive animations (used in Iteration 19), but overkill for continuous ambient effects
- Canvas/WebGL: Too heavy, increases bundle size, accessibility concerns
- requestAnimationFrame: Works but higher CPU usage than CSS

## Client-Side Tracking

**Decision:** Custom lightweight tracking library (`/lib/tracking.ts`)

**Rationale:**
- No external dependencies (GA, Mixpanel, etc.)
- Privacy-respecting by design (DNT support, no PII)
- Event batching reduces API calls
- sendBeacon for reliable page unload tracking
- Full control over data collected

**Implementation Details:**
- Event queue with 3-second flush interval
- Maximum 50 events per batch
- sendBeacon for final flush on page unload
- Session ID via localStorage with 30-minute expiry
- DNT check before any tracking

**Alternatives Considered:**
- Google Analytics: Privacy concerns, external dependency
- Plausible: External service, cost
- PostHog: Overkill for current needs

## API Layer

**Decision:** Next.js App Router API Routes (existing pattern)

**Rationale:**
- Established pattern in codebase (/api/analytics/track)
- Simple async functions with NextResponse
- Type-safe with TypeScript interfaces
- Serverless deployment on Vercel

**New Endpoint:** `POST /api/analytics/event`

**Request Structure:**
```typescript
interface EventBatchRequest {
  events: EventPayload[];
}

interface EventPayload {
  sessionId: string;
  visitorHash?: string;
  pagePath: string;
  eventCategory: 'scroll' | 'click' | 'engagement' | 'conversion';
  eventAction: string;
  eventLabel?: string;
  eventValue?: number;
  metadata?: Record<string, unknown>;
}
```

## Hooks Architecture

**Decision:** Custom React hooks in `/app/hooks/`

**Rationale:**
- Existing pattern (useScrollReveal, useCountUp)
- TypeScript interfaces for options and returns
- Clean separation of concerns
- Reusable across components

**New Hooks:**
1. `useReducedMotion()` - Returns boolean for motion preference
2. `useScrollDepthTracker()` - Fires scroll milestone events

## Component Architecture

**Decision:** Functional components with TypeScript

**Rationale:**
- Existing pattern throughout codebase
- "use client" directive for browser APIs
- Props interfaces for type safety

**New Component Structure:**
```
app/components/ambient/
  AmbientParticles.tsx   # Pure presentation, CSS classes
  FloatingOrbs.tsx       # Pure presentation, CSS classes
  AmbientLayer.tsx       # Container with fixed positioning
  index.ts               # Named exports
```

## Styling

**Decision:** Tailwind CSS + Custom CSS in globals.css (existing)

**Rationale:**
- Tailwind for utility classes (positioning, z-index)
- Custom CSS for keyframe animations
- Follow existing section comment pattern in globals.css

**CSS Organization:**
```css
/* ========== PLAN-17 ITERATION-18: Ambient Particles ========== */
@keyframes particle-float { ... }
.ambient-particle { ... }

/* ========== PLAN-17 ITERATION-18: Floating Orbs ========== */
@keyframes orb-drift { ... }
.floating-orb { ... }

/* ========== PLAN-17 ITERATION-18: Enhanced Breathing ========== */
/* Modifications to existing .hero-gradient-bg */

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .ambient-particle,
  .floating-orb { ... }
}
/* ========== END PLAN-17 ITERATION-18 ========== */
```

## Environment Variables

No new environment variables required for Iteration 18.

**Existing (used by analytics):**
- `POSTGRES_URL` - Vercel Postgres connection string (existing)

## Dependencies Overview

**No new dependencies added.**

Existing dependencies used:
- `react` 19.x - Component framework
- `next` 15.x - Application framework
- `@vercel/postgres` - Database client
- `tailwindcss` 4.x - Styling utilities

## Performance Targets

| Metric | Target | Measurement |
|--------|--------|-------------|
| Lighthouse Performance | >= 85 | Chrome DevTools |
| Animation FPS | 60fps | Chrome Performance tab |
| First Contentful Paint | < 1.8s | Lighthouse |
| Largest Contentful Paint | < 2.5s | Lighthouse |
| Cumulative Layout Shift | < 0.1 | Lighthouse |
| Total Blocking Time | < 200ms | Lighthouse |
| Bundle size increase | < 5KB | Build output |

## Security Considerations

### Client-Side Tracking

**Do Not Track (DNT) Support:**
```typescript
function shouldTrack(): boolean {
  if (typeof navigator === 'undefined') return false;
  return navigator.doNotTrack !== '1';
}
```

**No PII Collection:**
- visitor_hash uses daily-rotating salt (existing pattern)
- No IP addresses stored
- No user-identifiable metadata

### Event API Validation

**Required Validations:**
- `eventCategory` must be known value
- `eventAction` length <= 100 characters
- `eventLabel` length <= 200 characters
- `metadata` size <= 1KB
- `sessionId` must be valid UUID format

**Rate Limiting (Future Enhancement):**
- Consider IP-based limiting if abuse detected
- Not implemented in Iteration 18 (low traffic site)

## Accessibility Considerations

### Reduced Motion

**Global CSS Pattern (existing):**
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

**Component-Level Check:**
```typescript
// useReducedMotion hook for JS-based decisions
const prefersReducedMotion = useReducedMotion();
if (prefersReducedMotion) {
  // Show static state
}
```

### Screen Reader Compatibility

**Ambient Layer:**
- `aria-hidden="true"` on ambient container
- No interactive elements
- Purely decorative

## Mobile Strategy

**Particle Reduction:**
- Desktop: 20 particles
- Mobile (< 768px): 10 particles

**Implementation:**
```typescript
const [isMobile, setIsMobile] = useState(false);

useEffect(() => {
  const mq = window.matchMedia('(max-width: 768px)');
  setIsMobile(mq.matches);
  const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
  mq.addEventListener('change', handler);
  return () => mq.removeEventListener('change', handler);
}, []);

const particleCount = isMobile ? 10 : 20;
```

**Touch Devices:**
- No cursor-based effects in Iteration 18
- Ambient animations work identically on touch

## Browser Support

| Browser | Minimum Version | Notes |
|---------|-----------------|-------|
| Chrome | 90+ | Full support |
| Firefox | 90+ | Full support |
| Safari | 15+ | Test blur performance |
| Edge | 90+ | Full support |

**CSS Features Used:**
- `@keyframes` - Universal support
- `will-change` - Universal support
- `transform`, `opacity` - Universal support
- `filter: blur()` - Universal support (performance varies)
- `pointer-events: none` - Universal support

---

**Tech Stack Status:** DEFINED
**Ready for:** Pattern Documentation

# Builder Task Breakdown

## Overview

**3 primary builders** working in parallel with sequential integration:
- **Builder-1 (Animation):** CSS keyframes + ambient components
- **Builder-2 (Analytics):** Database schema + API + tracking library
- **Builder-3 (Integration):** Layout integration + cross-system testing

**Estimated total time:** 4-5 hours (builders work in parallel)

## Builder Assignment Strategy

- Builder-1 and Builder-2 work in **complete isolation** - no shared files
- Builder-3 **waits for both** to complete before starting integration
- All new files - minimal modification to existing files
- Test generation required for all builders (PRODUCTION mode)

---

## Builder-1: Animation Foundation

### Scope

Create the ambient animation layer including CSS keyframes, particle component, floating orbs component, and reduced motion hook. All animations use pure CSS for GPU acceleration and automatic reduced motion support.

### Complexity Estimate

**MEDIUM**

Straightforward component work with established CSS patterns. Main complexity is ensuring deterministic particle generation for hydration safety.

### Success Criteria

- [ ] CSS keyframes for particle-float animation (3 speed variants)
- [ ] CSS keyframes for orb-drift animation
- [ ] CSS for enhanced breathing gradient (faster cycle, higher opacity)
- [ ] CSS reduced motion media query for all new animations
- [ ] AmbientParticles component renders 20 particles (10 on mobile)
- [ ] FloatingOrbs component renders 2-4 corner orbs
- [ ] useReducedMotion hook returns boolean for motion preference
- [ ] Unit tests for useReducedMotion hook
- [ ] Unit tests for particle generation (deterministic output)
- [ ] No hydration mismatches
- [ ] Lighthouse Performance >= 85 after changes

### Files to Create

| File | Purpose | Lines Est. |
|------|---------|------------|
| `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/components/ambient/AmbientParticles.tsx` | Floating particle system | 80-100 |
| `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/components/ambient/FloatingOrbs.tsx` | Large corner orbs | 60-80 |
| `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/components/ambient/index.ts` | Re-exports | 5 |
| `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/hooks/useReducedMotion.ts` | Reduced motion detection hook | 25-30 |
| `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/hooks/useReducedMotion.test.ts` | Unit tests for hook | 40-50 |
| `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/components/ambient/AmbientParticles.test.ts` | Unit tests for particle generation | 40-50 |

### Files to Modify

| File | Changes |
|------|---------|
| `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/globals.css` | Add keyframes section at end (before print styles) |

### Dependencies

**Depends on:** Nothing (can start immediately)
**Blocks:** Builder-3 (Integration)

### Implementation Notes

1. **Particle Generation Must Be Deterministic**
   - Use mathematical formula based on index, not Math.random()
   - Prevents hydration mismatch between server and client
   - Example: `x = ((i * 37 + 13) % 100)`

2. **Mobile Detection**
   - Use `window.matchMedia("(max-width: 768px)")`
   - Set state in useEffect to avoid SSR issues
   - Reduce particle count from 20 to 10 on mobile

3. **CSS Organization**
   - Add new section with comment header: `/* ========== PLAN-17 ITERATION-18: Ambient Particles ========== */`
   - Place before existing print styles section
   - Include reduced motion overrides in same section

4. **Orb Positioning**
   - Position partially off-screen (e.g., -100px from edge)
   - Use blur(80px) for atmospheric effect
   - Keep opacity low (0.1-0.2)

### Patterns to Follow

Reference patterns from `patterns.md`:
- Use **CSS Keyframes for Ambient Animations** pattern for all keyframes
- Use **Floating Orbs with Blur** pattern for orb CSS
- Use **Enhanced Breathing Gradient** pattern for hero-gradient-bg modification
- Use **Reduced Motion Support** pattern for media query
- Use **Ambient Particle Component** pattern for component structure
- Use **useReducedMotion Hook** pattern for hook implementation

### Testing Requirements

**Unit Tests:**

1. **useReducedMotion.test.ts**
   - Test returns false by default (no preference)
   - Test returns true when prefers-reduced-motion matches
   - Test responds to preference changes
   - Coverage target: 90%

2. **AmbientParticles.test.ts**
   - Test particle generation is deterministic (same input = same output)
   - Test correct number of particles generated
   - Test particle properties are within expected ranges
   - Coverage target: 80%

**Manual Testing:**
- Visual inspection of particles on homepage
- Toggle reduced motion in browser (DevTools > Rendering)
- Check mobile view (DevTools device mode)
- Lighthouse Performance check

---

## Builder-2: Analytics Infrastructure

### Scope

Create the analytics event tracking infrastructure including database schema, API endpoint, client-side tracking library, and scroll depth tracking hook. Focus on privacy (DNT support), reliability (sendBeacon), and performance (event batching).

### Complexity Estimate

**MEDIUM-HIGH**

Multiple interconnected pieces (schema, types, API, library, hook). Main complexity is ensuring reliable event delivery and proper session management.

### Success Criteria

- [ ] Events table created with all columns and indexes
- [ ] EventPayload and related types defined
- [ ] insertEvents function in db.ts
- [ ] /api/analytics/event POST endpoint with validation
- [ ] Client-side tracking library with batching
- [ ] DNT (Do Not Track) header respected
- [ ] sendBeacon used for reliable unload delivery
- [ ] useScrollDepthTracker hook fires at 25/50/75/100%
- [ ] Each milestone fires only once per page load
- [ ] Unit tests for tracking library (batching, DNT)
- [ ] Integration tests for API endpoint
- [ ] Unit tests for scroll depth hook

### Files to Create

| File | Purpose | Lines Est. |
|------|---------|------------|
| `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/lib/types/events.ts` | Event type definitions | 40-50 |
| `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/lib/tracking.ts` | Client-side tracking library | 150-180 |
| `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/lib/tracking.test.ts` | Unit tests for tracking | 120-150 |
| `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/api/analytics/event/route.ts` | Event API endpoint | 80-100 |
| `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/api/analytics/event/route.test.ts` | API integration tests | 100-120 |
| `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/hooks/useScrollDepthTracker.ts` | Scroll milestone tracking | 60-80 |
| `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/hooks/useScrollDepthTracker.test.ts` | Unit tests for hook | 80-100 |

### Files to Modify

| File | Changes |
|------|---------|
| `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/scripts/schema.sql` | Add events table at end |
| `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/lib/db.ts` | Add insertEvents function |

### Dependencies

**Depends on:** Nothing (can start immediately)
**Blocks:** Builder-3 (Integration)

### Implementation Notes

1. **Session ID Strategy**
   - Generate client-side using `crypto.randomUUID()`
   - Store in localStorage with key `ahiya_client_session`
   - Use sessionStorage for activity timestamp (`ahiya_session_start`)
   - 30-minute inactivity timeout (matching server-side pattern)

2. **Event Batching**
   - Queue events in memory array
   - Flush every 3 seconds via setInterval
   - Also flush when batch reaches 50 events
   - Flush on beforeunload and visibilitychange (hidden)

3. **DNT Support**
   - Check `navigator.doNotTrack === "1"` before any tracking
   - Also check `window.doNotTrack` for Firefox
   - If DNT enabled, all track* functions become no-ops

4. **API Validation**
   - Whitelist event categories: scroll, click, engagement, conversion
   - Limit eventAction to 100 chars, eventLabel to 200 chars
   - Limit metadata JSON size (implicit via request size)

5. **Scroll Tracking**
   - Use scroll event listener with throttling (250ms)
   - Calculate percentage: `scrollY / (scrollHeight - clientHeight) * 100`
   - Track milestones in Set to prevent duplicates
   - Reset Set on pathname change

### Patterns to Follow

Reference patterns from `patterns.md`:
- Use **Event Tracking Endpoint** pattern for API route
- Use **Database Insert for Events** pattern for db.ts
- Use **Client-Side Event Tracking** pattern for tracking.ts
- Use **Scroll Depth Tracker Hook** pattern for hook
- Use **Input Validation Pattern** for API validation
- Use **DNT Support Pattern** for privacy
- Use **API Route Test Pattern** for testing
- Use **Hook Test Pattern** for scroll tracker tests

### Testing Requirements

**Unit Tests:**

1. **tracking.test.ts**
   - Test shouldTrack returns false when DNT enabled
   - Test shouldTrack returns true when DNT disabled
   - Test session ID generation and persistence
   - Test event batching collects events
   - Test flush sends correct payload structure
   - Test flush uses sendBeacon when available
   - Coverage target: 85%

2. **useScrollDepthTracker.test.ts**
   - Test fires at correct scroll percentages
   - Test each milestone fires only once
   - Test resets on pathname change
   - Test handles non-scrollable pages
   - Coverage target: 80%

**Integration Tests:**

3. **route.test.ts**
   - Test accepts valid single event
   - Test accepts valid event batch
   - Test rejects missing required fields
   - Test rejects invalid event category
   - Test rejects oversized strings
   - Test returns correct count
   - Coverage target: 90%

---

## Builder-3: Integration & Layout

### Scope

Create the wrapper components (AmbientLayer, TrackingProvider) and integrate everything into the root layout. Verify all systems work together, test across all public pages, and ensure performance targets are met.

### Complexity Estimate

**LOW-MEDIUM**

Mostly wiring together Builder-1 and Builder-2 outputs. Main work is thorough cross-page testing and performance validation.

### Success Criteria

- [ ] AmbientLayer component wraps particles + orbs
- [ ] TrackingProvider component initializes tracking + scroll depth
- [ ] Root layout renders AmbientLayer + TrackingProvider
- [ ] Particles visible on homepage
- [ ] Particles visible on /pricing, /2l, /cv, /projects/*
- [ ] Scroll tracking fires on homepage (verify in Network tab)
- [ ] Events reach database (verify via SQL query)
- [ ] Reduced motion disables all ambient animations
- [ ] Mobile shows 10 particles (not 20)
- [ ] Lighthouse Performance >= 85
- [ ] No z-index conflicts with nav, modals
- [ ] No pointer-event blocking on CTAs

### Files to Create

| File | Purpose | Lines Est. |
|------|---------|------------|
| `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/components/ambient/AmbientLayer.tsx` | Wrapper for ambient elements | 20-25 |
| `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/components/TrackingProvider.tsx` | Wrapper for tracking initialization | 25-30 |

### Files to Modify

| File | Changes |
|------|---------|
| `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/layout.tsx` | Import and render AmbientLayer + TrackingProvider |

### Dependencies

**Depends on:** Builder-1 (Animation), Builder-2 (Analytics)
**Blocks:** Deployment

### Implementation Notes

1. **Layout Integration Order**
   ```tsx
   <body className={inter.className}>
     <AmbientLayer />         {/* z-index: 0, outside tracking */}
     <TrackingProvider>       {/* Wraps all page content */}
       {children}
     </TrackingProvider>
   </body>
   ```

2. **Z-Index Verification**
   - AmbientLayer uses z-index: 0
   - Body texture overlay uses z-index: 1
   - Navigation uses z-index: 50
   - Modals use z-index: 40+
   - Verify ambient elements don't appear above any of these

3. **Cross-Page Testing Matrix**
   Test each combination:
   | Page | Particles | Orbs | Scroll 25% | Scroll 100% |
   |------|-----------|------|------------|-------------|
   | / | Check | Check | Check | Check |
   | /pricing | Check | Check | Check | Check |
   | /2l | Check | Check | Check | Check |
   | /cv | Check | Check | Check | Check |
   | /projects/mirror-of-dreams | Check | Check | Check | Check |
   | /capabilities | Check | Check | Check | Check |

4. **Performance Testing**
   - Run Lighthouse on homepage before integration
   - Run Lighthouse after integration
   - Target: Performance score >= 85
   - If score drops significantly, investigate particles/orbs

### Patterns to Follow

Reference patterns from `patterns.md`:
- Use **Ambient Layer Wrapper** pattern for AmbientLayer.tsx
- Use **Tracking Provider** pattern for TrackingProvider.tsx
- Use **Root Layout Integration** pattern for layout.tsx

### Testing Requirements

**Manual Testing Checklist:**

1. **Visual Verification**
   - [ ] Particles floating on homepage
   - [ ] Orbs visible in hero corners
   - [ ] Breathing gradient noticeably faster
   - [ ] No particles on admin pages

2. **Scroll Tracking Verification**
   - [ ] Open DevTools Network tab
   - [ ] Filter by "event"
   - [ ] Scroll homepage slowly
   - [ ] See POST requests at 25%, 50%, 75%, 100%
   - [ ] Verify request payload structure

3. **Database Verification**
   - [ ] Query: `SELECT * FROM events ORDER BY created_at DESC LIMIT 10;`
   - [ ] Verify events have correct session_id, page_path, event_category
   - [ ] Verify scroll events have correct event_value (25, 50, 75, 100)

4. **Reduced Motion Testing**
   - [ ] Chrome DevTools > Rendering > Emulate CSS prefers-reduced-motion: reduce
   - [ ] Verify particles are static (visible but not moving)
   - [ ] Verify orbs are static
   - [ ] Verify gradient is static

5. **Mobile Testing**
   - [ ] DevTools device mode (iPhone 12 Pro)
   - [ ] Count particles (should be 10, not 20)
   - [ ] Verify scroll tracking works

6. **Performance Testing**
   - [ ] Run Lighthouse on /
   - [ ] Performance score >= 85
   - [ ] No "Avoid large layout shifts" warning from ambient layer
   - [ ] Animation FPS check (Performance tab, record 5 seconds)

7. **Z-Index Testing**
   - [ ] Open mobile nav (should be above particles)
   - [ ] Click hero CTA (should be clickable)
   - [ ] Hover portfolio cards (should respond)

---

## Builder Execution Order

### Phase 1: Parallel Development (No dependencies)

```
Builder-1 (Animation)  ─────────────────────────▶ Complete
                                                      │
Builder-2 (Analytics)  ─────────────────────────▶ Complete
                                                      │
                                                      ▼
                                              ┌─────────────┐
                                              │  Builder-3  │
                                              │ Integration │
                                              └─────────────┘
                                                      │
                                                      ▼
                                                  Validation
                                                      │
                                                      ▼
                                                 Deployment
```

### Phase 2: Integration (Depends on Phase 1)

- Builder-3 starts after Builder-1 AND Builder-2 complete
- Creates wrapper components
- Modifies root layout
- Runs full test matrix

### Phase 3: Validation

- Lighthouse performance check
- Database event verification
- Cross-browser testing
- Mobile device testing

---

## Integration Notes

### How Builder Outputs Merge

1. **Builder-1 Outputs:**
   - CSS in globals.css (append to existing)
   - Components in `/app/components/ambient/`
   - Hook in `/app/hooks/`

2. **Builder-2 Outputs:**
   - Schema in scripts/schema.sql (append to existing)
   - Types in `/lib/types/events.ts`
   - Library in `/lib/tracking.ts`
   - API in `/app/api/analytics/event/`
   - Hook in `/app/hooks/`

3. **Builder-3 Merges:**
   - Imports from Builder-1: `AmbientParticles`, `FloatingOrbs`
   - Imports from Builder-2: `initTracking`, `teardownTracking`, `useScrollDepthTracker`
   - Creates: `AmbientLayer`, `TrackingProvider`
   - Modifies: `layout.tsx`

### Potential Conflict Areas

1. **globals.css**
   - Only Builder-1 modifies
   - Append section, don't modify existing

2. **scripts/schema.sql**
   - Only Builder-2 modifies
   - Append table definition at end

3. **lib/db.ts**
   - Only Builder-2 modifies
   - Add function at end of file

4. **app/layout.tsx**
   - Only Builder-3 modifies
   - Add imports and wrapper components

### Shared Files Summary

| File | Builder-1 | Builder-2 | Builder-3 |
|------|-----------|-----------|-----------|
| `globals.css` | WRITES | - | - |
| `layout.tsx` | - | - | WRITES |
| `schema.sql` | - | WRITES | - |
| `lib/db.ts` | - | WRITES | - |
| `lib/types/events.ts` | - | WRITES | READS |
| `app/components/ambient/*` | WRITES | - | READS |
| `lib/tracking.ts` | - | WRITES | READS |
| `app/hooks/useScrollDepthTracker.ts` | - | WRITES | READS |
| `app/hooks/useReducedMotion.ts` | WRITES | - | - |

---

## Database Migration Instructions

**Before deploying Builder-2 changes:**

1. Connect to Vercel Postgres console
2. Run the events table creation:

```sql
BEGIN;

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

CREATE INDEX IF NOT EXISTS idx_events_created_at ON events (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_events_session_id ON events (session_id);
CREATE INDEX IF NOT EXISTS idx_events_category ON events (event_category);
CREATE INDEX IF NOT EXISTS idx_events_path_category ON events (page_path, event_category);
CREATE INDEX IF NOT EXISTS idx_events_category_action ON events (event_category, event_action);

COMMIT;
```

3. Verify with: `SELECT * FROM events LIMIT 1;` (should return empty, no error)

---

## Test Coverage Summary

| Builder | Test Files | Coverage Target |
|---------|------------|-----------------|
| Builder-1 | `useReducedMotion.test.ts`, `AmbientParticles.test.ts` | 85% |
| Builder-2 | `tracking.test.ts`, `route.test.ts`, `useScrollDepthTracker.test.ts` | 85% |
| Builder-3 | Manual testing matrix | N/A |

**Total test files:** 5 unit/integration test files
**Total estimated test lines:** 400-500 lines

---

**Builder Tasks Status:** COMPLETE
**Ready for:** Builder Assignment & Execution

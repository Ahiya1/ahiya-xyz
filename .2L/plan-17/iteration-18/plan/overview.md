# 2L Iteration Plan - The Living Site: Ambient Foundation + Analytics Infrastructure

## Project Vision

Transform ahiya.xyz from a static portfolio into an "undeniably alive" site. Iteration 18 establishes the foundation layer: ambient animations that make the site feel alive without user interaction, plus the analytics infrastructure to measure behavioral engagement.

The site itself becomes the portfolio piece. When someone lands on ahiya.xyz, they should think: "If they built THIS, imagine what they could build for ME."

## Success Criteria

Specific, measurable criteria for iteration completion:

- [ ] Floating particles visible on all public pages (15-20 particles)
- [ ] Breathing gradient enhanced (8-12s cycle, visible movement)
- [ ] Floating orbs in hero corners (2-4 large blurred orbs)
- [ ] prefers-reduced-motion fully respected (animations disabled)
- [ ] Events database table created with proper indexes
- [ ] /api/analytics/event endpoint operational
- [ ] Client-side tracking library with batching and DNT support
- [ ] Scroll depth tracking firing on all public pages
- [ ] Lighthouse Performance score >= 85
- [ ] 60fps animations (no visible jank)

## MVP Scope

**In Scope:**

ANIMATION FOUNDATION:
- AmbientParticles component (15-20 CSS-animated particles)
- FloatingOrbs component (2-4 large blurred orbs in corners)
- BreathingGradient enhancement (speed up from 25s to 8-12s)
- New CSS keyframes in globals.css
- AmbientLayer wrapper integrating into root layout
- Full prefers-reduced-motion support
- useReducedMotion hook for shared pattern

ANALYTICS INFRASTRUCTURE:
- Events database table with schema and indexes
- /api/analytics/event POST endpoint with validation
- Client-side tracking library (/lib/tracking.ts)
- useScrollDepthTracker hook (25/50/75/100% milestones)
- TrackingProvider component for root layout integration
- DNT (Do Not Track) header support

**Out of Scope (Future Iterations):**
- Reactive interactions (magnetic CTAs, 3D tilt) - Iteration 19
- Choreographed animations (section reveals, shimmer) - Iteration 20
- Time on page tracking - Iteration 19
- Click tracking - Iteration 19
- Conversion tracking - Iteration 19
- Admin dashboard engagement tab - Iteration 20
- Cursor trail effect - Deferred

## Development Phases

1. **Exploration** - COMPLETE
2. **Planning** - CURRENT
3. **Building** - Estimated 4-5 hours (3 parallel builders)
4. **Integration** - Estimated 30 minutes
5. **Validation** - Estimated 30 minutes
6. **Deployment** - Final

## Timeline Estimate

- Exploration: Complete
- Planning: Complete
- Building: 4-5 hours (parallel)
  - Builder-1 (Animation): 2-3 hours
  - Builder-2 (Analytics): 2-3 hours
  - Builder-3 (Integration): 1-2 hours
- Integration: 30 minutes
- Validation: 30 minutes
- **Total: ~5-6 hours**

## Risk Assessment

### High Risks

**Performance Degradation from Particles**
- Impact: Lighthouse score drops below 85
- Likelihood: Medium
- Mitigation:
  - Use CSS-only animations (GPU composited)
  - Avoid blur on particles (blur is expensive)
  - Test with Lighthouse after each component
  - Reduce count on mobile (10 particles)
  - `will-change: transform, opacity` hint

### Medium Risks

**Session ID Mismatch Between Server and Client**
- Impact: Events cannot be correlated with page views
- Likelihood: Medium
- Mitigation:
  - Generate client-side session ID with localStorage persistence
  - Use 30-minute inactivity expiry (matching server pattern)
  - Session IDs linkable via visitor_hash when available

**Z-Index Conflicts with Existing Content**
- Impact: Ambient elements appear above content or modals
- Likelihood: Low
- Mitigation:
  - Use `pointer-events: none` on ambient container
  - Use z-index: 0 (below body texture at z-index: 1)
  - Test with navigation, mobile menu, modals

### Low Risks

**Cross-Browser Animation Inconsistency**
- Mitigation: Use well-supported CSS properties, test Safari/Chrome/Firefox

**Event API Abuse**
- Mitigation: Validate event structure, limit metadata size, consider rate limiting

## Integration Strategy

### Builder Output Merge Order

1. **Builder-1 (Animation)** creates:
   - CSS keyframes in globals.css
   - Ambient components in `/app/components/ambient/`
   - useReducedMotion hook

2. **Builder-2 (Analytics)** creates:
   - Database schema additions
   - Event types and API endpoint
   - Tracking library

3. **Builder-3 (Integration)** consumes both and creates:
   - AmbientLayer wrapper
   - TrackingProvider wrapper
   - Updates root layout to use both
   - Tests all public pages

### Shared Files Requiring Coordination

| File | Builder-1 | Builder-2 | Builder-3 |
|------|-----------|-----------|-----------|
| `globals.css` | WRITES | - | READS |
| `layout.tsx` | - | - | WRITES |
| `lib/types/analytics.ts` | - | WRITES | READS |
| `app/hooks/index.ts` | WRITES | WRITES | READS |

### Conflict Prevention

- Builder-1 and Builder-2 work in isolated directories
- Builder-3 waits for both to complete before integration
- All new files - no modifications to existing files except Builder-3

## Deployment Plan

1. **Pre-deployment Checklist:**
   - Run Lighthouse on staging (target >= 85)
   - Verify reduced motion works (browser toggle)
   - Test scroll tracking fires correctly
   - Verify events table receives data
   - Test on mobile device (Safari, Chrome)

2. **Database Migration:**
   - Run events table creation SQL before deployment
   - Verify indexes created

3. **Deployment:**
   - Standard Vercel deployment
   - No environment variable changes required

4. **Post-deployment Verification:**
   - Check particles visible on homepage
   - Trigger scroll events, verify in database
   - Check Lighthouse score in production

## Technical Constraints

- **No new dependencies** - Use existing React, CSS, Vercel Postgres
- **CSS for continuous animations** - GPU accelerated, works with prefers-reduced-motion
- **Transform/opacity only** - Avoid layout-triggering properties
- **Mobile: 10 particles** - Reduce from 20 for performance
- **Event batching: 3-second intervals** - Minimize API calls
- **sendBeacon for unload** - Reliable final event delivery

## Files Summary

### New Files to Create

```
app/components/ambient/
  AmbientParticles.tsx      # 15-20 floating particles
  FloatingOrbs.tsx          # 2-4 large corner orbs
  AmbientLayer.tsx          # Wrapper combining both
  index.ts                  # Re-exports

app/components/
  TrackingProvider.tsx      # Tracking context for root layout

app/hooks/
  useReducedMotion.ts       # Shared reduced motion detection
  useScrollDepthTracker.ts  # Scroll milestone tracking

lib/
  tracking.ts               # Client-side event tracking library

lib/types/
  events.ts                 # Event type definitions

app/api/analytics/
  event/route.ts            # Event insertion endpoint
```

### Files to Modify

```
app/globals.css             # Add CSS keyframes for particles/orbs
app/layout.tsx              # Integrate AmbientLayer + TrackingProvider
scripts/schema.sql          # Add events table schema
lib/db.ts                   # Add insertEvent function
```

---

**Plan Status:** COMPLETE
**Ready for:** Builder Assignment

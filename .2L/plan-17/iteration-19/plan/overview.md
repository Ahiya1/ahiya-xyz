# 2L Iteration Plan - Iteration 19: Reactive Interactions + Behavioral Tracking

## Project Vision

Transform ahiya.xyz from a static portfolio into a responsive, living site that reacts to user presence. CTAs pull toward the cursor, portfolio cards tilt in 3D space, and icons animate on interaction. Simultaneously, complete the behavioral analytics foundation with real time-on-page tracking, click tracking, and Cal.com conversion tracking.

## Success Criteria

Specific, measurable criteria for MVP completion:

- [ ] MagneticButton component with spring physics applied to all CTAs
- [ ] TiltCard component with 3D perspective transforms on portfolio and testimonial cards
- [ ] AnimatedIcon components for all 4 portfolio card icons (Sparkles, Terminal, BarChart3, FlaskConical)
- [ ] useTimeOnPage hook tracking real engagement time using Visibility API
- [ ] useClickTracker hook tracking CTA clicks via data attributes
- [ ] Cal.com conversion tracking (embed ready, date/time selection, booking complete)
- [ ] All tracking integrated into TrackingProvider
- [ ] Data attributes added to all CTAs across pages (Homepage, Pricing, CV, 2L, Projects)
- [ ] Lighthouse Performance score remains > 85
- [ ] Mobile graceful degradation (no cursor effects on touch devices)
- [ ] prefers-reduced-motion respected in all components
- [ ] Unit tests for all hooks with > 80% coverage

## MVP Scope

**In Scope:**

### Reactive Animations
- MagneticButton wrapper component with Framer Motion spring physics
- TiltCard wrapper component with 3D perspective transforms
- AnimatedIcon components with hover + idle animations
- Integration with PortfolioCard component
- Subtle tilt on Testimonials cards
- Mobile detection and graceful degradation

### Behavioral Tracking
- useTimeOnPage hook using Visibility API
- useClickTracker hook using data attribute delegation
- Cal.com conversion tracking integration
- TrackingProvider enhancement with new hooks
- Data-track-click attributes on all CTAs

**Out of Scope (Post-MVP):**
- Cursor trail effect (deferred to future iteration)
- Page transitions with AnimatePresence
- Text shimmer effect on hero headline
- Section reveal choreography variations
- Admin dashboard engagement metrics (Iteration 20)
- Engagement score calculation (Iteration 20)

## Development Phases

1. **Exploration** - Complete
2. **Planning** - Current (this document)
3. **Building** - Estimated 5-6 hours (3 parallel builders)
4. **Integration** - 30 minutes
5. **Validation** - 30 minutes
6. **Deployment** - Final

## Timeline Estimate

- Exploration: Complete
- Planning: Complete
- Building: 5-6 hours (parallel builders)
  - Builder-1 (Reactive Animations): ~2.5 hours
  - Builder-2 (Behavioral Tracking): ~2 hours
  - Builder-3 (Integration): ~2 hours (after Builder-1 and Builder-2)
- Integration: 30 minutes
- Validation: 30 minutes
- Total: ~7 hours

## Risk Assessment

### High Risks

**Hydration Mismatch in Animation Components**
- Risk: Mouse position tracking could cause SSR/client mismatch
- Mitigation: All mouse tracking in useEffect; initial state must be deterministic; use motion values instead of useState where possible

**Performance Impact from Multiple Mouse Listeners**
- Risk: MagneticButton and TiltCard both track mouse position, could cause jank
- Mitigation: Throttle to 60fps; use will-change: transform; test with DevTools Performance tab; consider shared mouse position context if needed

### Medium Risks

**Cal.com Event API Stability**
- Risk: Undocumented events (`__dateSelected`, `__timeSelected`) could break
- Mitigation: Wrap in try/catch; primarily rely on documented events; graceful degradation

**Visibility API Edge Cases**
- Risk: Mobile Safari and some browsers have quirks with visibility state
- Mitigation: Test on real devices; use fallback timing if needed; send heartbeats as backup

### Low Risks

**Event Queue Overflow**
- Risk: Too many tracking events could exceed batch limit
- Mitigation: Existing 3-second flush interval handles this; existing MAX_BATCH_SIZE of 50

## Integration Strategy

### Builder Dependencies

```
Builder-1 (Reactive Animations) -----> Builder-3 (Integration)
                                  \
Builder-2 (Behavioral Tracking) ----> Builder-3 (Integration)
```

Builder-1 and Builder-2 work in parallel with no dependencies between them.
Builder-3 depends on both and integrates their outputs into the pages.

### Shared Code Locations

- Animation utilities: `/lib/animation-utils.ts` (created by Builder-1)
- Reactive components: `/app/components/reactive/` (created by Builder-1)
- Tracking hooks: `/app/hooks/` (created by Builder-2)
- Integration: Modifications to page files (Builder-3)

### Conflict Prevention

- Builder-1 creates NEW files only (no modifications to existing pages)
- Builder-2 modifies TrackingProvider and CalcomEmbed only
- Builder-3 modifies page files and PortfolioCard/Testimonials
- Clear file ownership prevents merge conflicts

## Deployment Plan

1. All builders complete their tasks
2. Integration builder merges components into pages
3. Run full test suite (unit + integration)
4. Lighthouse performance audit (must be > 85)
5. Manual testing on desktop and mobile
6. Test reduced motion preference
7. Verify analytics events in database
8. Deploy to Vercel production

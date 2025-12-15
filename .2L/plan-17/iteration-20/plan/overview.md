# 2L Iteration Plan - Iteration 20: Choreographed Animations & Admin Engagement Dashboard

## Project Vision

Iteration 20 completes "The Living Site" vision by adding the **choreographed animations layer** - the orchestrated movements that make different sections reveal with personality - and the **admin engagement dashboard** that enables data-driven iteration. This iteration transforms the site from having ambient/reactive animations to having a cohesive, choreographed experience where each section tells its own story through motion.

## Success Criteria

Specific, measurable criteria for MVP completion:

- [ ] Hero headline shimmers periodically (every 8-10 seconds)
- [ ] 4+ distinct reveal styles on homepage (fan-in, cascade, stagger, scale-glow)
- [ ] Hero has continuous subtle breathing animation (1.0 -> 1.005 -> 1.0 scale)
- [ ] Non-hovered portfolio cards recede when one is hovered (opacity + scale)
- [ ] Scroll progress bar visible in navigation header
- [ ] Page transitions smooth with AnimatePresence (fade 0.2-0.3s)
- [ ] Engagement tab visible and functional in admin sidebar
- [ ] Funnel visualization showing: pageview -> scroll_50 -> cta_click -> cal_open
- [ ] Engagement score calculated (scroll 30% + time 40% + interactions 30%)
- [ ] Pages table shows real time-on-page from events data
- [ ] Lighthouse Performance score > 90 with all features enabled
- [ ] All animations respect prefers-reduced-motion
- [ ] Test coverage >= 70% for all new code

## MVP Scope

**In Scope:**

### Choreographed Animations
- TextShimmer component with CSS gradient mask animation
- SectionReveal component with 4 variants (fade, fan-in, cascade, scale-glow)
- ConnectedAnimations context for portfolio group awareness
- HeroBreathing wrapper for continuous subtle scale animation
- ScrollProgressBar integrated into Navigation component
- Page transitions via template.tsx with AnimatePresence

### Admin Engagement Dashboard
- New Engagement nav item in AdminSidebar
- Engagement page with MetricCards (scroll depth, time on page, engagement score, total sessions)
- ConversionFunnel visualization using Recharts FunnelChart
- ScrollDepthChart showing distribution across milestones
- TopClickedElements table showing most-clicked CTAs
- Update Pages API to include real time-on-page data

**Out of Scope (Post-MVP):**
- Cursor trail effect (deprioritized)
- Per-page engagement scores (site-wide only for MVP)
- Animated connecting lines between How I Work steps (simple cascade sufficient)
- Advanced page transition choreography (simple fade only)

## Development Phases

1. **Exploration** - Complete
2. **Planning** - Current
3. **Building** - Estimated 4-5 hours (parallel builders)
4. **Integration** - 15 minutes
5. **Validation** - 20 minutes
6. **Deployment** - Final

## Timeline Estimate

- Exploration: Complete
- Planning: Complete
- Building: ~4-5 hours (parallel builders)
- Integration: ~15 minutes
- Validation: ~20 minutes
- Total: ~5-6 hours

## Risk Assessment

### High Risks

**Page Transitions Performance**
- Risk: AnimatePresence renders both old and new page during transition, potentially causing jank
- Mitigation: Use simple fade transition (0.2-0.3s), test on low-powered devices
- Contingency: Make page transitions optional via feature flag, can be disabled post-deploy

**Shimmer Effect Conflicts with Gradient Text**
- Risk: Layering shimmer gradient over existing text-gentle gradient may cause visual artifacts
- Mitigation: Use overlay technique rather than replacing gradient, test all viewport sizes
- Contingency: Simplify shimmer to opacity-based effect

### Medium Risks

**CSS :has() Browser Support for Connected Animations**
- Risk: CSS :has() selector not supported in all target browsers
- Mitigation: Feature detection with fallback to React state management
- Contingency: React-only implementation adds minimal overhead

**Engagement Data Sparsity**
- Risk: Events table may have limited data if tracking recently deployed
- Mitigation: Show "Collecting data..." state for < 100 events
- Contingency: Display placeholder/demo data with clear indicator

### Low Risks

**Query Performance on Events Table**
- Risk: Complex aggregations may slow dashboard
- Mitigation: Existing indexes (created iteration-18) should handle load
- Monitoring: Add query timing logs in development

## Integration Strategy

### Builder Independence

Builders are designed to work in parallel with minimal dependencies:

1. **Builder-1 (Choreography Components)** creates isolated components in `/app/components/choreography/`
2. **Builder-2 (Admin Engagement)** creates isolated page and API in `/app/admin/` and `/app/api/`

### Shared Dependencies

Both builders share:
- `lib/animation-utils.ts` - Builder-1 may add spring presets
- `lib/tracking.ts` - Read-only reference for event types
- `app/globals.css` - Builder-1 adds new keyframes

### Integration Points

1. **AdminSidebar.tsx** - Builder-2 adds single nav item (trivial merge)
2. **Navigation.tsx** - Builder-1 adds ScrollProgressBar (component insertion)
3. **app/page.tsx** - Builder-1 wraps existing sections with new components
4. **globals.css** - Builder-1 adds new keyframes at end of file

### Conflict Prevention

- Builder-1 works exclusively on `/app/components/choreography/` and `/app/page.tsx`
- Builder-2 works exclusively on `/app/admin/` and `/app/api/admin/`
- No overlapping file modifications expected

## Deployment Plan

1. **Pre-deployment Checks**
   - Run `npm run build` to verify no build errors
   - Run `npm run test` to verify >= 70% coverage
   - Run Lighthouse audit on local build
   - Verify reduced motion behavior

2. **Deployment**
   - Merge to main branch
   - Vercel auto-deploys
   - Database migrations (none required - uses existing events table)

3. **Post-deployment Validation**
   - Verify shimmer animation timing (8-10s intervals)
   - Test portfolio card connected animations
   - Verify scroll progress bar in navigation
   - Test page transitions on multiple routes
   - Verify engagement tab loads with real data
   - Run Lighthouse on production URL

4. **Rollback Plan**
   - If Lighthouse score < 85: disable page transitions via template.tsx removal
   - If visual glitches: revert app/page.tsx choreography integrations
   - If admin issues: independent of public site, can debug in place

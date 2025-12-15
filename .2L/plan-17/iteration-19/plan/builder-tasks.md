# Builder Task Breakdown

## Overview

**3 primary builders** will work on this iteration:
- Builder-1 and Builder-2 work in parallel (no dependencies between them)
- Builder-3 depends on both Builder-1 and Builder-2 for integration

## Builder Assignment Strategy

- **Builder-1** creates all reactive animation components (isolated work)
- **Builder-2** creates all behavioral tracking hooks (isolated work)
- **Builder-3** integrates both into existing pages (depends on Builder-1 + Builder-2)

---

## Builder-1: Reactive Animation Components

### Scope

Create the reactive animation component suite: MagneticButton, TiltCard, and AnimatedIcon. These components wrap existing elements to add cursor-following magnetic effects, 3D perspective transforms, and icon animations.

### Complexity Estimate

**MEDIUM**

Single builder can complete this. All components share similar patterns (mouse tracking, spring physics, reduced motion handling).

### Success Criteria

- [ ] MagneticButton component with Framer Motion spring physics
- [ ] TiltCard component with 3D perspective transforms
- [ ] AnimatedIcon component with 4 unique icon animations
- [ ] All components respect `useReducedMotion()` hook
- [ ] All components disable on mobile (no cursor on touch devices)
- [ ] Spring presets exported from `/lib/animation-utils.ts`
- [ ] Unit tests for each component with > 70% coverage
- [ ] Barrel export from `/app/components/reactive/index.ts`

### Files to Create

| Path | Purpose |
|------|---------|
| `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/lib/animation-utils.ts` | Spring presets, useIsMobile hook |
| `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/components/reactive/MagneticButton.tsx` | Magnetic cursor effect wrapper |
| `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/components/reactive/TiltCard.tsx` | 3D tilt card wrapper |
| `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/components/reactive/AnimatedIcon.tsx` | Portfolio icon animations |
| `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/components/reactive/index.ts` | Barrel export |
| `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/components/reactive/MagneticButton.test.tsx` | Unit tests |
| `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/components/reactive/TiltCard.test.tsx` | Unit tests |
| `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/components/reactive/AnimatedIcon.test.tsx` | Unit tests |

### Dependencies

**Depends on:** Nothing (can start immediately)
**Blocks:** Builder-3 (Integration)

### Implementation Notes

1. **Start with animation-utils.ts** - Create spring presets and useIsMobile hook first, as all components will use them.

2. **MagneticButton requirements:**
   - Wrapper component that preserves children styles
   - pullDistance: default 8px max
   - pullStrength: default 0.4 (40% of distance)
   - Optional glow effect on proximity
   - Return to center on mouse leave with spring animation

3. **TiltCard requirements:**
   - Perspective container wrapping motion div
   - maxTilt: default 8 degrees
   - Disable on mobile (matchMedia check)
   - Optional shine effect following tilt direction
   - Return to flat on mouse leave

4. **AnimatedIcon requirements:**
   - Support 4 icon types: sparkles, terminal, barChart, flask
   - Each icon has unique hover animation
   - Each icon has unique idle animation (periodic, staggered)
   - idleDelay prop for staggering multiple icons
   - Map to actual Lucide icons: Sparkles, Terminal, BarChart3, FlaskConical

5. **Mobile detection:**
   - Use `window.matchMedia("(max-width: 768px)")`
   - Check in useEffect to avoid SSR issues
   - Completely disable tilt/magnetic on mobile (no hover on touch)

### Patterns to Follow

Reference patterns from `patterns.md`:
- Use **useSpring for Smooth Tracking** pattern for MagneticButton and TiltCard
- Use **MagneticButton Component** pattern for implementation
- Use **TiltCard Component** pattern for 3D transforms
- Use **Animated Icon Component** pattern for icon variants
- Use **Hook Test Pattern** for unit tests
- Follow **Import Order Convention**

### Testing Requirements

- Unit tests for MagneticButton:
  - Renders children correctly
  - Disables effect when prefersReducedMotion is true
  - Disables effect on mobile
  - Returns to center on mouse leave

- Unit tests for TiltCard:
  - Renders children correctly
  - Disables effect when prefersReducedMotion is true
  - Disables effect on mobile
  - Returns to flat on mouse leave

- Unit tests for AnimatedIcon:
  - Renders correct icon for each type
  - Shows hover animation when isHovered is true
  - Respects reduced motion preference

- Coverage target: 70% minimum

---

## Builder-2: Behavioral Tracking Hooks

### Scope

Create behavioral tracking hooks and enhance existing components: useTimeOnPage for real engagement time, useClickTracker for CTA click tracking, and Cal.com conversion tracking integration.

### Complexity Estimate

**MEDIUM**

Single builder can complete this. Hooks are well-defined and independent. Cal.com integration requires careful async handling.

### Success Criteria

- [ ] useTimeOnPage hook using Visibility API
- [ ] useClickTracker hook using data attribute delegation
- [ ] CalcomEmbed enhanced with conversion tracking
- [ ] TrackingProvider updated to use new hooks
- [ ] Unit tests for useTimeOnPage with > 80% coverage
- [ ] Unit tests for useClickTracker with > 80% coverage
- [ ] Heartbeat interval of 30 seconds for time tracking
- [ ] Minimum time threshold of 5 seconds before tracking

### Files to Create

| Path | Purpose |
|------|---------|
| `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/hooks/useTimeOnPage.ts` | Time on page tracking hook |
| `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/hooks/useTimeOnPage.test.ts` | Unit tests |
| `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/hooks/useClickTracker.ts` | Click tracking hook |
| `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/hooks/useClickTracker.test.ts` | Unit tests |

### Files to Modify

| Path | Changes |
|------|---------|
| `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/components/CalcomEmbed.tsx` | Add conversion tracking events |
| `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/components/TrackingProvider.tsx` | Add useTimeOnPage, useClickTracker |

### Dependencies

**Depends on:** Nothing (can start immediately)
**Blocks:** Builder-3 (Integration)

### Implementation Notes

1. **useTimeOnPage hook:**
   - Use Visibility API (document.visibilityState)
   - Accumulate time only when tab is visible
   - Send heartbeat every 30 seconds
   - Send final time on beforeunload and route change
   - Minimum 5 seconds before tracking (avoid micro-visits)
   - Use trackEngagement() from existing tracking library

2. **useClickTracker hook:**
   - Single document-level click listener (capture phase)
   - Look for `data-track-click` attribute
   - Parse format: `category:label` or just `label` (default category: "cta")
   - Also check for `data-track-conversion` attribute
   - Use trackClick() and trackConversion() from existing library

3. **CalcomEmbed enhancement:**
   - Add cal("on", {...}) event handlers after getCalApi()
   - Track `linkReady` (documented)
   - Track `bookingSuccessful` (documented)
   - Track `__dateSelected` (undocumented, wrap in try/catch)
   - Track `__timeSelected` (undocumented, wrap in try/catch)
   - Add optional onBookingComplete callback prop

4. **TrackingProvider update:**
   - Import and call useTimeOnPage({ enabled })
   - Import and call useClickTracker({ enabled })
   - Keep existing useScrollDepthTracker({ enabled })

### Patterns to Follow

Reference patterns from `patterns.md`:
- Use **useTimeOnPage Hook** pattern for implementation
- Use **Data Attribute Click Tracking** pattern for useClickTracker
- Use **Enhanced CalcomEmbed** pattern for Cal.com tracking
- Use **Hook Test Pattern with renderHook** for unit tests
- Use **Mocking Strategies** for tracking module mocks
- Follow **Tracking Label Convention** for event naming

### Testing Requirements

- Unit tests for useTimeOnPage:
  - Should not track if disabled
  - Should send heartbeat after interval
  - Should not track time below minimum threshold
  - Should pause tracking when tab is hidden
  - Should send final time on cleanup

- Unit tests for useClickTracker:
  - Should track clicks on elements with data-track-click
  - Should parse category:label format
  - Should track conversions when data-track-conversion present
  - Should not track when disabled
  - Should find trackable element via closest() for nested elements

- Coverage target: 80% minimum

---

## Builder-3: Integration

### Scope

Integrate Builder-1's reactive components and Builder-2's tracking hooks into all pages. Add data-track-click attributes to all CTAs. Apply MagneticButton to CTAs, TiltCard to cards.

### Complexity Estimate

**MEDIUM**

Requires modifying multiple files but changes are straightforward. Mainly wrapping existing elements and adding attributes.

### Success Criteria

- [ ] MagneticButton applied to all hero CTAs on homepage
- [ ] MagneticButton applied to footer CTAs on homepage
- [ ] MagneticButton applied to CTAs on Pricing, 2L, CV pages
- [ ] TiltCard applied to PortfolioCard component
- [ ] TiltCard (subtle) applied to Testimonials component
- [ ] AnimatedIcon integrated into PortfolioCard
- [ ] data-track-click attributes on all CTAs (20+ elements)
- [ ] All pages build without errors
- [ ] Lighthouse Performance score > 85
- [ ] Manual verification of animations on desktop
- [ ] Manual verification of graceful degradation on mobile

### Files to Modify

| Path | Changes |
|------|---------|
| `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/page.tsx` | Wrap CTAs with MagneticButton, add data-track-click |
| `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/pricing/page.tsx` | Wrap CTAs with MagneticButton, add data-track-click |
| `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/cv/page.tsx` | Wrap CTAs with MagneticButton, add data-track-click |
| `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/2l/page.tsx` | Wrap CTAs with MagneticButton, add data-track-click |
| `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/components/PortfolioCard.tsx` | Add TiltCard wrapper, AnimatedIcon |
| `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/components/Testimonials.tsx` | Add subtle TiltCard wrapper |

### Dependencies

**Depends on:** Builder-1 (reactive components), Builder-2 (tracking hooks)
**Blocks:** Nothing (final builder)

### Implementation Notes

1. **Homepage CTAs to wrap with MagneticButton:**
   - Hero "See the Work" button
   - Hero "Let's Build" button
   - CTA strip links (See the Work, How I Build, Capabilities, Get in Touch)
   - Footer "Book Discovery Call" button
   - Footer "GitHub" link

2. **Homepage CTAs data-track-click attributes:**
   ```tsx
   data-track-click="hero_see_work"
   data-track-click="hero_lets_build"
   data-track-click="cta_strip:see_work"
   data-track-click="cta_strip:how_i_build"
   data-track-click="cta_strip:capabilities"
   data-track-click="cta_strip:get_in_touch"
   data-track-click="footer_discovery_call" data-track-conversion="booking_intent"
   data-track-click="footer_github"
   ```

3. **Pricing page:**
   - Wrap "Back to Portfolio" with MagneticButton
   - Add data-track-click to tier cards
   - Cal.com embed already has tracking from Builder-2

4. **CV page:**
   - Wrap email contact link with MagneticButton
   - Wrap PDF download link with MagneticButton
   - Add data-track-click="cv_email"
   - Add data-track-click="cv_pdf_download"

5. **2L page:**
   - Wrap "Watch It Build" CTA
   - Wrap "View Case Study" CTA
   - Wrap "Get in Touch" CTA

6. **PortfolioCard modifications:**
   - Wrap card content with TiltCard (maxTilt={6})
   - Replace icon rendering with AnimatedIcon
   - Pass index to AnimatedIcon for idleDelay staggering
   - Add data-track-click={`portfolio:${project.id}`}

7. **Testimonials modifications:**
   - Wrap each testimonial card with TiltCard (maxTilt={4}, subtle)
   - Keep existing hover effects

### Patterns to Follow

Reference patterns from `patterns.md`:
- Use **Tracking Label Convention** for all data-track-click values
- Use **Data Attribute Click Tracking** usage examples
- Follow **Import Order Convention** when adding imports

### Testing Requirements

- Build verification: `npm run build` succeeds
- Lighthouse audit: Performance > 85
- Manual testing checklist:
  - [ ] Hero CTAs have magnetic effect on desktop
  - [ ] Portfolio cards tilt on hover
  - [ ] Portfolio icons animate on hover
  - [ ] Testimonial cards have subtle tilt
  - [ ] All effects disabled on mobile
  - [ ] Reduced motion preference disables effects
  - [ ] Click events appear in database (check /api/analytics/event)
  - [ ] Time on page events appear after 30 seconds
  - [ ] Cal.com events fire on embed interaction

---

## Builder Execution Order

### Parallel Group 1 (No dependencies)

| Builder | Task | Estimated Time |
|---------|------|----------------|
| Builder-1 | Reactive Animation Components | 2.5 hours |
| Builder-2 | Behavioral Tracking Hooks | 2 hours |

### Sequential Group 2 (Depends on Group 1)

| Builder | Task | Estimated Time |
|---------|------|----------------|
| Builder-3 | Integration | 2 hours |

### Timeline

```
Hour 0-2.5:  Builder-1 + Builder-2 (parallel)
Hour 2.5-4.5: Builder-3 (after both complete)
Hour 4.5-5:   Integration testing
Hour 5-5.5:   Validation and fixes
```

---

## Integration Notes

### How Builder Outputs Come Together

1. Builder-1 creates isolated components in `/app/components/reactive/`
2. Builder-2 creates hooks in `/app/hooks/` and modifies TrackingProvider
3. Builder-3 imports from both locations and integrates into pages

### File Ownership (Conflict Prevention)

| Builder | Owns (Creates) | Modifies |
|---------|----------------|----------|
| Builder-1 | `/app/components/reactive/*`, `/lib/animation-utils.ts` | None |
| Builder-2 | `/app/hooks/useTimeOnPage.ts`, `/app/hooks/useClickTracker.ts` | `CalcomEmbed.tsx`, `TrackingProvider.tsx` |
| Builder-3 | None | `page.tsx`, `pricing/page.tsx`, `cv/page.tsx`, `2l/page.tsx`, `PortfolioCard.tsx`, `Testimonials.tsx` |

### Shared Code Locations

- Animation utilities: `/lib/animation-utils.ts`
- Reactive components: `/app/components/reactive/`
- Tracking hooks: `/app/hooks/`

### Potential Conflict Areas

**None expected.** File ownership is clearly separated:
- Builder-1 creates NEW files only
- Builder-2 modifies only TrackingProvider and CalcomEmbed
- Builder-3 modifies only page files and card components

### Verification After Integration

1. Run `npm run build` - must succeed
2. Run `npm run test` - all tests must pass
3. Run `npx lighthouse http://localhost:3000 --only-categories=performance` - score > 85
4. Manual testing on desktop and mobile
5. Check database for tracking events

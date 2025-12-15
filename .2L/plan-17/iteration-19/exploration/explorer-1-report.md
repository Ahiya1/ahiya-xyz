# Explorer 1 Report: Reactive Animation Components (Magnetic CTAs, 3D Tilt Cards)

## Executive Summary

The codebase has Framer Motion v12.23.25 installed but minimally used (only in admin LiveFeed). The existing animation infrastructure relies heavily on CSS keyframes with excellent `prefers-reduced-motion` support. This iteration needs to introduce four key reactive components: MagneticButton, TiltCard, AnimatedIcon, and interactive Testimonials. The architecture should leverage Framer Motion's spring physics for smooth, performant interactions while maintaining the established patterns.

## Discoveries

### Existing Animation Infrastructure

- **Framer Motion Usage:** Only used in `/app/admin/components/LiveFeed.tsx` for list animations (`AnimatePresence`, `motion.div`)
- **CSS Keyframes:** 30+ keyframes defined in `globals.css` including `particle-float`, `orb-drift`, `gradient-shift`
- **Reduced Motion:** Comprehensive CSS-level support via `@media (prefers-reduced-motion: reduce)` blocks
- **Existing Hook:** `useReducedMotion()` hook available at `/app/hooks/useReducedMotion.ts` for JS-level detection

### CTA Locations Requiring Magnetic Effect

**Homepage (`/app/page.tsx`):**
- Line 72-84: Hero CTAs ("See the Work", "Let's Build")
- Line 93-134: CTA Strip ("See the Work", "How I Build", "Capabilities", "Get in Touch")
- Line 232-250: Footer CTA ("Book Discovery Call", "GitHub")

**Pricing Page (`/app/pricing/page.tsx`):**
- Line 94-112: "Book a Call" section with Cal.com embed trigger

**2L Page (`/app/2l/page.tsx`):**
- Line 112-125: Hero CTAs ("Watch It Build", "View Case Study")
- Line 254: "Get in Touch" CTA

**Capabilities Page (`/app/capabilities/page.tsx`):**
- Line 199: "Get in Touch" CTA

**CV Page (`/app/cv/page.tsx`):**
- Line 114-118: Contact email link
- Line 127-133: PDF download link

**Project Pages (`/app/projects/*/page.tsx`):**
- Various CTA buttons per project

### Portfolio Cards to Receive 3D Tilt

**Existing Component:** `/app/components/PortfolioCard.tsx`
- Already has hover glow effect (lines 104-108)
- Has visual header with floating orbs (lines 114-139)
- Has icon container with hover scale effect (lines 154-166)
- Currently uses CSS transitions, no 3D transforms

**Project Icons for Animation:**
```typescript
// From PortfolioCard.tsx lines 34-64
{
  "mirror-of-dreams": Sparkles,
  "selahreach": Terminal,
  "statviz": BarChart3,
  "ai-research-pipeline": FlaskConical
}
```

### Testimonials Component

**Location:** `/app/components/Testimonials.tsx`
- Already has hover effects (line 41): `hover:border-purple-400/30`
- Has gradient overlay on hover (line 49)
- Logo has scale transform on hover (line 11-12)
- Uses `useScrollReveal()` for entrance animation
- Currently no 3D tilt effect

## Patterns Identified

### Pattern: CSS-first Animation with JS Enhancement

**Description:** The codebase favors CSS keyframes for continuous animations and reserves JavaScript for interactive/user-triggered effects.

**Use Case:** Ambient effects (particles, orbs, gradients) use CSS; user interactions (hover, click) could use Framer Motion.

**Example:**
```css
/* CSS for continuous ambient */
.floating-orb {
  animation: orb-drift var(--orb-duration, 25s) ease-in-out infinite;
}
```

**Recommendation:** Follow this pattern. Use CSS for idle animations (icon pulses), Framer Motion for mouse-tracking effects (magnetic, tilt).

### Pattern: Deterministic Animation Values

**Description:** `AmbientParticles.tsx` uses mathematical formulas instead of `Math.random()` to prevent hydration mismatches.

**Use Case:** Any component needing varied animations across instances.

**Example:**
```typescript
// From AmbientParticles.tsx line 25-39
x: ((i * 37 + 13) % 100),
y: ((i * 53 + 7) % 100),
```

**Recommendation:** Apply to AnimatedIcon idle animations - use icon index to vary timing.

### Pattern: Mobile Detection for Animation Reduction

**Description:** `AmbientParticles.tsx` reduces particle count on mobile via `matchMedia`.

**Use Case:** Disable cursor-based effects on touch devices.

**Example:**
```typescript
// From AmbientParticles.tsx line 60-72
const mq = window.matchMedia("(max-width: 768px)");
setParticleCount(mq.matches ? 10 : 20);
```

**Recommendation:** Create `useIsMobile()` hook or extend this pattern to disable magnetic/tilt on mobile.

### Pattern: Spring Physics Constants

**Description:** Framer Motion spring configs should use consistent values across components.

**Use Case:** Magnetic buttons and 3D tilts should feel related.

**Recommendation:** Define spring presets:
```typescript
export const springPresets = {
  gentle: { stiffness: 100, damping: 15 },
  snappy: { stiffness: 300, damping: 20 },
  magnetic: { stiffness: 150, damping: 15, mass: 0.1 },
};
```

## Complexity Assessment

### High Complexity Areas

**MagneticButton Component**
- Requires mouse position tracking relative to button bounding box
- Spring physics for smooth attraction/release
- Enhanced glow when cursor is near
- Must work with both `<button>` and `<a>` elements
- **Estimated effort:** 3-4 hours
- **Recommendation:** No split needed if builder has Framer Motion experience

**TiltCard Component**
- 3D perspective transforms require careful calculation
- Mouse position to rotation angle conversion
- Smooth return to flat on mouse leave
- Glow shift following tilt direction
- **Estimated effort:** 3-4 hours
- **Recommendation:** No split needed

### Medium Complexity Areas

**AnimatedIcon Components**
- Four different icon animations (Sparkles, Terminal, BarChart3, FlaskConical)
- Hover trigger + periodic idle animation
- Per-icon unique effect design
- **Estimated effort:** 2-3 hours
- **Recommendation:** Could be parallelized if needed

**Interactive Testimonial Cards**
- Subtle 3D tilt (less than portfolio cards)
- Quote marks draw-on-reveal effect
- Logo pulse on hover
- **Estimated effort:** 2 hours
- **Recommendation:** Extend TiltCard component with reduced intensity

### Low Complexity Areas

**Integration Work**
- Wrapping existing CTAs with MagneticButton
- Applying TiltCard to PortfolioCard
- **Estimated effort:** 1-2 hours

## Technology Recommendations

### Primary Stack (Already in Use)

- **Framer Motion v12.23.25:** Already installed, supports spring physics, gestures, and variants
- **React hooks:** `useState`, `useRef`, `useEffect`, `useCallback` for mouse tracking
- **CSS custom properties:** For dynamic values passed from JS

### Supporting Patterns

**Mouse Position Tracking:**
```typescript
// Throttled mouse move handler
const handleMouseMove = useCallback(
  throttle((e: MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPosition({ x, y });
  }, 16), // 60fps throttle
  []
);
```

**3D Transform Calculation:**
```typescript
// Convert mouse position to rotation angles
const rotateX = (position.y / (height / 2)) * -maxTilt; // Invert Y
const rotateY = (position.x / (width / 2)) * maxTilt;
```

**Spring Animation Config:**
```typescript
// Framer Motion spring for magnetic effect
const x = useSpring(0, { stiffness: 150, damping: 15, mass: 0.1 });
const y = useSpring(0, { stiffness: 150, damping: 15, mass: 0.1 });
```

### Performance Utilities Needed

**Throttle function:** Either lodash.throttle or custom implementation
**requestAnimationFrame:** For smooth mouse tracking
**will-change:** CSS hint for transform-heavy elements

## Integration Points

### MagneticButton Integration

```
MagneticButton wraps:
  - Homepage hero CTAs
  - Homepage CTA strip links
  - Homepage footer CTA
  - Pricing page Book a Call button
  - 2L page CTAs
  - Capabilities page CTA
  - Project page CTAs
```

### TiltCard Integration

```
TiltCard wraps:
  - PortfolioCard inner div (lines 97-230)
  - Testimonial cards (lines 38-98 in Testimonials.tsx)
```

### AnimatedIcon Integration

```
AnimatedIcon replaces:
  - PortfolioCard icon rendering (line 163-165)
```

## Risks & Challenges

### Technical Risks

**Hydration Mismatch Risk**
- **Impact:** Console errors, visual glitches
- **Mitigation:** Use `useEffect` for all client-side mouse tracking; no random values in initial render

**Performance on Low-End Devices**
- **Impact:** Jank, battery drain
- **Mitigation:** Throttle mouse events to 60fps max; use `will-change: transform`; test on older hardware

**Event Listener Cleanup**
- **Impact:** Memory leaks
- **Mitigation:** Properly remove listeners in useEffect cleanup; use `useCallback` for handler references

### Complexity Risks

**Animation Timing Conflicts**
- **Likelihood:** Medium
- **Mitigation:** Coordinate spring configs; test all animations together

**Mobile Touch Handling**
- **Likelihood:** Low (disabled on mobile per spec)
- **Mitigation:** Clear device detection; fallback to CSS-only effects

## Recommendations for Planner

1. **Create shared animation utilities first:** Build `/lib/animation-utils.ts` with spring presets, throttle function, and `useIsMobile()` hook before individual components.

2. **Build MagneticButton as a wrapper component:** Should accept children and enhance them with magnetic effect, not replace existing button styles.

3. **TiltCard should be composable:** Create a `useTilt()` hook that can be applied to any element, then create TiltCard as a convenience wrapper.

4. **Leverage existing reduced motion patterns:** The codebase already has excellent reduced motion support. New components must respect `useReducedMotion()` hook.

5. **Consider a single builder for all reactive components:** These components share mouse-tracking logic and spring physics. A single builder with access to shared utilities will produce more consistent results than splitting.

6. **Test animation performance early:** Run Lighthouse after each component is integrated. The target is >85 during iteration, >90 at final delivery.

## Resource Map

### Critical Files to Modify

| Path | Purpose |
|------|---------|
| `/app/page.tsx` | Homepage - wrap CTAs, integrate portfolio tilt |
| `/app/pricing/page.tsx` | Wrap Book a Call CTA |
| `/app/components/PortfolioCard.tsx` | Add TiltCard wrapper, AnimatedIcon |
| `/app/components/Testimonials.tsx` | Add subtle tilt effect |
| `/app/globals.css` | Add any new keyframes for icon animations |

### New Files to Create

| Path | Purpose |
|------|---------|
| `/app/components/reactive/MagneticButton.tsx` | Magnetic cursor effect wrapper |
| `/app/components/reactive/TiltCard.tsx` | 3D tilt card wrapper |
| `/app/components/reactive/AnimatedIcon.tsx` | Portfolio icon animations |
| `/app/components/reactive/index.ts` | Barrel export |
| `/lib/animation-utils.ts` | Shared spring presets, throttle, hooks |

### Key Dependencies

| Dependency | Why Needed |
|------------|------------|
| framer-motion | Spring physics, motion components, useSpring |
| react | useState, useRef, useEffect, useCallback |

### Testing Infrastructure

| Tool/Approach | Rationale |
|---------------|-----------|
| Manual browser testing | Verify 60fps on hover interactions |
| Chrome DevTools Performance tab | Profile mouse move handlers |
| Lighthouse | Verify performance score >85 |
| prefers-reduced-motion media query | Test with OS accessibility setting |
| Mobile device testing | Verify graceful degradation |

## Questions for Planner

1. Should magnetic effect have a visual proximity indicator (glow increases as cursor approaches), or only transform?

2. For 3D tilt, should the card shadow also shift with tilt direction, or remain static?

3. What is the acceptable "magnetic pull distance" - how far from the button should the effect activate (50px, 100px)?

4. Should AnimatedIcon idle animations be synchronized across all cards, or staggered for a "breathing" effect?

5. For testimonials, should the quote marks animate on scroll reveal (draw-in effect) or only have static quote marks with tilt?

# Explorer 1 Report: Choreographed Animation Architecture

## Executive Summary

The codebase has a solid animation foundation from Iterations 18-19, with ambient particles, floating orbs, MagneticButton, TiltCard, and AnimatedIcon components already implemented. Iteration 20 focuses on **choreographed animations** - the orchestrated layer that makes sections reveal with personality and keeps the hero eternally alive. The architecture should leverage existing patterns (CSS keyframes for continuous animations, Framer Motion for complex orchestration) while introducing five new components: TextShimmer, SectionReveal (with variants), ConnectedAnimations, HeroBreathing, and ScrollProgressBar.

## Discoveries

### Existing Animation Infrastructure

**CSS Keyframes in globals.css (Lines 281-1311):**
| Keyframe | Purpose | Duration |
|----------|---------|----------|
| `word-reveal` | Hero text entrance | 0.6s |
| `gradient-shift` | Background gradient movement | 25s (needs speedup) |
| `particle-float` | Ambient particles | 15-25s |
| `orb-drift` | Corner orbs | 25-32s |
| `fade-in-up` | General reveal | 0.8s |
| `phase-pulse` | Pipeline active state | 1.5s |
| `breathe` | Subtle scale pulse | varies |

**Existing Section Reveal Classes (Lines 384-399):**
```css
.section-reveal {
  animation: fade-in-up 0.6s ease forwards;
  opacity: 0;
}
.section-reveal-1 { animation-delay: 0.1s; }
.section-reveal-2 { animation-delay: 0.2s; }
/* ... up to .section-reveal-10 */
```

**useScrollReveal Hook (`/app/hooks/useScrollReveal.ts`):**
```typescript
// IntersectionObserver-based visibility detection
// Returns { ref, isVisible } for scroll-triggered animations
// Supports threshold, rootMargin, triggerOnce options
```

**Framer Motion Components from Iteration 19:**
- `MagneticButton` - spring physics cursor attraction
- `TiltCard` - 3D perspective transforms
- `AnimatedIcon` - unique hover/idle animations per icon type
- `springPresets` - standardized spring configs (gentle, snappy, magnetic, tilt)

### Hero Section Analysis

**Current Hero Structure (`/app/page.tsx` Lines 51-94):**
```tsx
<section className="section-breathing pt-32 hero-gradient-bg">
  <h1 className="display-xl text-white mb-6">
    <span className="hero-word" style={{ animationDelay: '0.1s' }}>
      <span className="text-gentle">Intention.</span>
    </span>{" "}
    <span className="hero-word" style={{ animationDelay: '0.3s' }}>
      <span className="text-gentle">Clarity.</span>
    </span>{" "}
    <span className="hero-word" style={{ animationDelay: '0.5s' }}>
      <span className="text-gentle">Results.</span>
    </span>
  </h1>
  <!-- Subline and CTAs follow with similar animation delays -->
</section>
```

**Key Observations:**
- Hero words use CSS class `hero-word` with staggered `animationDelay`
- Gradient uses `hero-gradient-bg` class (25s cycle - too slow per vision)
- No shimmer effect on text
- No continuous breathing animation after initial load
- Text uses `text-gentle` for gradient fill effect

**TextShimmer Integration Point:**
The shimmer should wrap the entire headline or individual words. Best approach: wrap the h1 content with a new `<TextShimmer>` component that adds periodic gradient mask animation.

**HeroBreathing Integration Point:**
Apply subtle scale transform (1.0 -> 1.005 -> 1.0) to the h1 element after initial reveal completes. Can be a CSS keyframe or Framer Motion.

### Section Reveal Analysis

**Current Reveal Patterns by Section:**

| Section | Current Pattern | Target Variant |
|---------|-----------------|----------------|
| Hero | CSS `hero-word` class | Add shimmer + breathing |
| CTA Strip | CSS `section-reveal-1` | Keep simple fade |
| Portfolio | `useScrollReveal()` + stagger delay | **Fan-in from center** |
| How I Work | Manual `useScrollReveal()` per step | **Cascade with lines** |
| Testimonials | `useScrollReveal()` + TiltCard | **Stagger from sides** |
| Contact CTA | `useScrollReveal()` | Scale up with glow |

**Portfolio Section (`/app/page.tsx` Lines 159-172):**
```tsx
<div className="grid md:grid-cols-2 gap-6 md:gap-8">
  {portfolioProjects.map((project, index) => (
    <PortfolioCard key={project.id} project={project} index={index} />
  ))}
</div>
```
- 4 cards in 2x2 grid
- Each card uses internal `useScrollReveal()` with stagger delay
- **Fan-in Target:** Cards 0,1 (top row) slide in from top; cards 2,3 (bottom row) from bottom

**How I Work Section (`/app/page.tsx` Lines 174-231):**
```tsx
<div className="grid sm:grid-cols-3 gap-8">
  <div ref={step1.ref} className={`transition-all duration-700 ${...}`}>
  <div ref={step2.ref} className={`delay-150 ${...}`}>
  <div ref={step3.ref} className={`delay-300 ${...}`}>
</div>
```
- 3 steps with manual useScrollReveal per step
- **Cascade Target:** Steps appear sequentially with connecting line animation between them

**Testimonials (`/app/components/Testimonials.tsx`):**
```tsx
{testimonials.map((testimonial, index) => (
  <TiltCard key={testimonial.id} maxTilt={4} enableShine={false}>
    <div ref={reveals[index].ref} style={{ transitionDelay: `${index * 150}ms` }}>
```
- 3 cards in grid
- Already uses TiltCard wrapper
- **Stagger Target:** Alternate slide direction (left, right, left)

### Navigation Analysis

**Current Navigation (`/app/components/Navigation.tsx`):**
```tsx
<nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0f1a]/80 backdrop-blur-sm">
  <div className="container-wide">
    <div className="flex items-center justify-between h-16">
```

**Key Observations:**
- Fixed position with backdrop blur
- Height: 64px (h-16)
- No scroll progress indicator
- No dynamic behavior based on scroll position

**ScrollProgressBar Integration Point:**
Add a thin progress bar (2-4px height) at the very top of the viewport, above or part of the nav. Options:
1. Inside nav, above the container
2. Separate fixed element above nav
3. As part of nav background (gradient fill)

**Recommended:** Inside nav as first child, full width, absolute positioned.

### Page Transition Feasibility

**Current Layout (`/app/layout.tsx` Lines 89-128):**
```tsx
<html lang="en">
  <body className={inter.className}>
    <AmbientLayer />
    <TrackingProvider>
      {children}
    </TrackingProvider>
  </body>
</html>
```

**Key Observations:**
- No `template.tsx` exists (no per-page wrapper)
- No `loading.tsx` exists
- AmbientLayer renders outside TrackingProvider
- Children rendered directly without AnimatePresence

**Page Transition Options:**

**Option A: template.tsx approach (Recommended)**
```tsx
// app/template.tsx
"use client";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function Template({ children }) {
  const pathname = usePathname();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
```

**Option B: Layout wrapper (More complex)**
Requires client component wrapper in layout.tsx with state management.

**Performance Considerations:**
- AnimatePresence renders both old and new page during transition
- With 20 particles + 4 orbs + page content = potential performance hit
- Recommend: Simple fade transition (0.2-0.3s), test performance first
- Exit animation should be brief; entry can be more elaborate

### Connected Animations Analysis

**Current Portfolio Card Behavior:**
- Each card is independent
- No awareness of sibling hover states
- Hover effects are self-contained

**Connected Animation Target:**
When one card is hovered, non-hovered cards should:
- Reduce opacity (0.7-0.8)
- Scale down slightly (0.98)
- Blur slightly (optional, expensive)

**Implementation Options:**

**Option A: CSS-only with :has() selector**
```css
.portfolio-grid:has(.card:hover) .card:not(:hover) {
  opacity: 0.7;
  transform: scale(0.98);
}
```
Browser support: Good in modern browsers, fallback gracefully

**Option B: React state lifting**
```tsx
const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
// Pass to each card, apply conditional styles
```
More control, works everywhere, slight performance overhead

**Recommendation:** Option A for simplicity, with fallback detection if needed.

## Patterns Identified

### Pattern: Periodic Animation Trigger

**Description:** Animations that trigger periodically after initial load (shimmer every 8-10s).

**Implementation:**
```typescript
// usePeriodicAnimation hook
function usePeriodicAnimation(intervalMs: number, duration: number) {
  const [isAnimating, setIsAnimating] = useState(false);
  
  useEffect(() => {
    // Initial delay before first trigger
    const initialDelay = setTimeout(() => {
      triggerAnimation();
    }, intervalMs);
    
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), duration);
    }, intervalMs);
    
    return () => {
      clearTimeout(initialDelay);
      clearInterval(interval);
    };
  }, [intervalMs, duration]);
  
  return isAnimating;
}
```

**Recommendation:** Create this hook for TextShimmer timing control.

### Pattern: Scroll Progress Calculation

**Description:** Track scroll position as percentage for progress bar.

**Implementation:**
```typescript
function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      const scrollTop = window.scrollY;
      const percent = (scrollTop / (scrollHeight - clientHeight)) * 100;
      setProgress(Math.min(100, Math.max(0, percent)));
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return progress;
}
```

**Note:** Existing `useScrollDepthTracker.ts` tracks milestones for analytics. This is different - continuous value for visual progress.

### Pattern: Framer Motion Variants for Orchestration

**Description:** Use variants for coordinated multi-element animations.

**Implementation for Fan-in:**
```typescript
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: (index: number) => ({
    opacity: 0,
    y: index < 2 ? -30 : 30, // Top row from above, bottom from below
    scale: 0.95,
  }),
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", ...springPresets.gentle },
  },
};
```

**Recommendation:** Use Framer Motion variants for portfolio fan-in and How I Work cascade.

### Pattern: CSS Gradient Mask for Text Shimmer

**Description:** Apply animated gradient mask to create shimmer effect.

**Implementation:**
```css
@keyframes text-shimmer {
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
}

.text-shimmer {
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.4) 50%,
    transparent 100%
  );
  background-size: 200% 100%;
  background-clip: text;
  -webkit-background-clip: text;
  animation: text-shimmer 1.5s ease-in-out;
}
```

**Note:** This technique layers on top of existing gradient text. Use mix-blend-mode or overlay positioning.

## Complexity Assessment

### High Complexity Areas

**Page Transitions with AnimatePresence**
- Requires understanding Next.js App Router behavior
- Performance implications with large page content
- Exit animations can be tricky with route changes
- **Estimated effort:** 3-4 hours
- **Risk:** Performance degradation, visual glitches
- **Recommendation:** Implement last, make optional behind feature flag

**Connected Animations (Group Awareness)**
- Requires state coordination across multiple components
- CSS :has() may not work in all scenarios
- Performance with multiple cards
- **Estimated effort:** 2-3 hours
- **Recommendation:** Start with CSS :has(), fallback to React state

### Medium Complexity Areas

**TextShimmer Component**
- CSS gradient mask layering on existing gradient text
- Periodic trigger timing
- Reduced motion support
- **Estimated effort:** 2 hours

**SectionReveal Variants (Fan-in, Cascade)**
- Framer Motion variants system
- Custom animation per section type
- Integration with existing IntersectionObserver pattern
- **Estimated effort:** 3 hours for all variants

**ScrollProgressBar**
- Simple scroll tracking
- Integration into Navigation component
- Styling to match design
- **Estimated effort:** 1-2 hours

### Low Complexity Areas

**HeroBreathing**
- Simple CSS keyframe or Framer Motion animation
- 6s cycle, very subtle scale
- **Estimated effort:** 30 minutes

## Technology Recommendations

### Animation Type Decision Matrix

| Animation | Approach | Rationale |
|-----------|----------|-----------|
| TextShimmer | CSS keyframes + JS trigger | Periodic timing needs JS, visual is pure CSS |
| HeroBreathing | CSS keyframes | Continuous, no interaction needed |
| SectionReveal | Framer Motion variants | Complex orchestration, stagger children |
| ConnectedAnimations | CSS :has() | Simple state, browser-native |
| ScrollProgressBar | React state + CSS | Real-time scroll value |
| Page Transitions | Framer Motion AnimatePresence | Route change detection |

### New Spring Preset for Orchestration

```typescript
// Add to /lib/animation-utils.ts
export const springPresets = {
  // ... existing
  reveal: { stiffness: 100, damping: 20, mass: 0.8 } as SpringOptions,
  cascade: { stiffness: 80, damping: 15, mass: 0.5 } as SpringOptions,
};
```

### Performance Optimization Strategies

1. **will-change hints:** Apply to elements about to animate
2. **transform-only animations:** Avoid layout-triggering properties
3. **Passive scroll listeners:** Already used in useScrollDepthTracker
4. **Animation frame batching:** Framer Motion handles this
5. **Reduced motion cascade:** Disable ALL choreography when preferred

## Integration Points

### New Component File Structure

```
/app/components/
  /choreography/
    index.ts                    # Barrel export
    TextShimmer.tsx             # Periodic text shimmer effect
    SectionReveal.tsx           # Base reveal with variants
    HeroBreathing.tsx           # Continuous hero animation
    ConnectedAnimations.tsx     # Context for group awareness
    ScrollProgressBar.tsx       # Navigation progress indicator
    PageTransition.tsx          # AnimatePresence wrapper

/app/hooks/
  useScrollProgress.ts          # Continuous scroll percentage
  usePeriodicAnimation.ts       # Timer-based animation trigger
```

### Homepage Integration Map

```
/app/page.tsx modifications:
├── Hero Section
│   ├── Wrap h1 with <TextShimmer interval={9000}>
│   ├── Wrap h1 with <HeroBreathing>
│   └── Add enhanced-gradient class to section
├── Portfolio Section
│   ├── Wrap grid with <SectionReveal variant="fan-in">
│   └── Wrap with <ConnectedAnimations>
├── How I Work Section
│   └── Wrap with <SectionReveal variant="cascade">
├── Testimonials Section
│   └── Already has stagger, enhance to alternate sides
└── Contact CTA
    └── Wrap with <SectionReveal variant="scale-glow">
```

### Navigation Integration

```
/app/components/Navigation.tsx modifications:
├── Add <ScrollProgressBar /> as first child of nav
└── Style: absolute top-0 left-0 right-0 h-1
```

### Layout Integration (Page Transitions)

```
/app/template.tsx (new file):
└── AnimatePresence wrapper with fade transition
```

## Risks & Challenges

### Technical Risks

**Risk: Template.tsx hydration issues**
- Impact: Console errors, flash of unstyled content
- Mitigation: Use `mode="wait"` to ensure clean transitions
- Mitigation: Add `key={pathname}` for proper remounting

**Risk: Shimmer conflicting with gradient text**
- Impact: Visual artifacts, unreadable text
- Mitigation: Use overlay approach rather than replacing gradient
- Mitigation: Test with different text lengths

**Risk: Performance degradation with all choreography**
- Impact: Lighthouse score drop below 85
- Mitigation: Test incrementally, add one feature at a time
- Mitigation: Make page transitions optional

### UX Risks

**Risk: Over-animation fatigue**
- Impact: Users find site distracting rather than delightful
- Mitigation: Very subtle parameters (1.005 scale, 8-10s intervals)
- Mitigation: Respect reduced motion globally

**Risk: Section reveals feel disconnected**
- Impact: Choreography doesn't feel unified
- Mitigation: Use consistent timing curves and delays
- Mitigation: Test full page scroll experience

## Recommendations for Planner

1. **Build in dependency order:**
   - First: useScrollProgress hook, usePeriodicAnimation hook
   - Then: HeroBreathing (simplest), ScrollProgressBar
   - Then: TextShimmer, SectionReveal base
   - Then: SectionReveal variants (fan-in, cascade)
   - Then: ConnectedAnimations
   - Last: Page transitions (optional if time permits)

2. **Create a choreography barrel export:** Similar to `/app/components/reactive/index.ts` and `/app/components/ambient/index.ts`, create `/app/components/choreography/index.ts` for clean imports.

3. **Use feature detection for CSS :has():**
   ```typescript
   const supportsHas = CSS.supports('selector(:has(*))');
   ```
   Fall back to React state if not supported.

4. **Make page transitions conditional:** Consider environment variable or config flag to disable if performance issues arise.

5. **Test shimmer on all hero variants:** The shimmer must look good whether words are on one line or wrapped to multiple lines on mobile.

6. **Coordinate with existing reduced motion support:** All new choreography components must check `useReducedMotion()` and show static/immediate states when true.

## Resource Map

### Critical Files to Modify

| Path | Purpose |
|------|---------|
| `/app/page.tsx` | Homepage - integrate all choreography components |
| `/app/components/Navigation.tsx` | Add ScrollProgressBar |
| `/app/globals.css` | Add new keyframes (shimmer, hero-breathe) |
| `/lib/animation-utils.ts` | Add new spring presets |

### New Files to Create

| Path | Purpose |
|------|---------|
| `/app/components/choreography/TextShimmer.tsx` | Periodic text shimmer effect |
| `/app/components/choreography/HeroBreathing.tsx` | Continuous subtle scale |
| `/app/components/choreography/SectionReveal.tsx` | Orchestrated reveal variants |
| `/app/components/choreography/ScrollProgressBar.tsx` | Navigation scroll indicator |
| `/app/components/choreography/ConnectedAnimations.tsx` | Group awareness context |
| `/app/components/choreography/index.ts` | Barrel export |
| `/app/hooks/useScrollProgress.ts` | Continuous scroll percentage |
| `/app/hooks/usePeriodicAnimation.ts` | Timer-based animation trigger |
| `/app/template.tsx` | Page transition wrapper (optional) |

### Key Dependencies

| Dependency | Why Needed | Already Installed |
|------------|------------|-------------------|
| framer-motion | AnimatePresence, variants, springs | Yes (v12.23.25) |
| react | hooks, context | Yes |

### Testing Requirements

| Test Type | Focus Area |
|-----------|------------|
| Manual browser testing | Shimmer visibility, timing |
| Lighthouse performance | Score >90 with all features |
| Scroll testing | Progress bar accuracy |
| Mobile testing | Responsive choreography |
| Reduced motion testing | All animations disabled |
| Page transition testing | Route changes smooth |

## Questions for Planner

1. **TextShimmer frequency:** Vision says 8-10 seconds. Should it be exactly 9s, or randomized within range?

2. **Page transitions scope:** Should all pages have transitions, or only public pages (exclude admin)?

3. **Connected animations intensity:** How much should non-hovered cards recede? 0.7 opacity and 0.98 scale, or more subtle?

4. **ScrollProgressBar style:** Thin line (2px) or gradient bar? Should it hide when at top of page?

5. **How I Work cascade:** Should the "connecting lines" between steps be animated, or is sequential reveal of the 3 steps sufficient?

6. **Testimonials direction:** Vision says "slide in from alternating sides" - should card 1 come from left, card 2 from right, card 3 from left?

# Builder Task Breakdown - Iteration 10

## Overview

**6 primary builders** will work in parallel.
**No splits anticipated** - tasks are appropriately scoped.

## Builder Assignment Strategy

- Builders work on isolated features when possible
- Builder-1 completes first (critical navigation fix)
- Builder-6 creates shared hooks before other builders need them
- CSS additions use designated sections to avoid conflicts

---

## Builder-1: Navigation Fix + Copy Fixes

### Scope

Fix the critical navigation bug where hash links don't work from non-homepage pages, and update "How We Work" copy to "How I Work" throughout the homepage.

**PRIORITY: CRITICAL - Complete first**

### Complexity Estimate

**LOW** - Simple code changes, well-defined scope

### Success Criteria

- [ ] Navigation links work correctly from `/projects/statviz` (and all project pages)
- [ ] Clicking "Work" from any page navigates to homepage portfolio section
- [ ] Clicking "Process" navigates to homepage "how-i-work" section
- [ ] Clicking "Contact" navigates to homepage contact section
- [ ] All instances of "How We Work" changed to "How I Work" on homepage
- [ ] Section ID updated from `how-we-work` to `how-i-work`
- [ ] Copy in step descriptions uses "I" instead of "We"

### Files to Modify

| File | Changes |
|------|---------|
| `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/components/Navigation.tsx` | Add Link import, fix navItems hrefs, use Link for internal routes |
| `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/page.tsx` | Update "How We Work" section to "How I Work", update section ID, fix step copy |

### Dependencies

**Depends on:** Nothing
**Blocks:** Nothing (but should complete first for testing)

### Implementation Notes

**Navigation.tsx changes:**

1. Add import at top:
```typescript
import Link from "next/link";
```

2. Update navItems (around line 12-18):
```typescript
const navItems: NavItem[] = [
  { label: "Work", href: "/#portfolio" },           // Changed from "#portfolio"
  { label: "Process", href: "/#how-i-work" },       // Changed from "#how-we-work"
  { label: "2L", href: "/2l" },
  { label: "Capabilities", href: "/capabilities" },
  { label: "Contact", href: "/#contact" },          // Changed from "#contact"
];
```

3. Update desktop navigation render (around line 71-81) to use Link:
```typescript
{navItems.map((item) => (
  <Link
    key={item.href}
    href={item.href}
    className="text-slate-300 hover:text-white transition-colors"
  >
    {item.label}
  </Link>
))}
```

4. Update mobile navigation similarly (around line 119-129)

**page.tsx changes:**

1. Find "How We Work Section" comment and section (around line 143-160)
2. Change:
   - Comment: `{/* How I Work Section */}`
   - Section ID: `id="how-i-work"`
   - Heading: `How I Work`
   - Step descriptions: "I align..." instead of "We align..."

### Testing Requirements

- [ ] Navigate to `/projects/statviz`
- [ ] Click each nav link and verify correct destination
- [ ] Verify smooth scroll to sections on homepage
- [ ] Check mobile menu works correctly
- [ ] Verify "How I Work" displays correctly

### Patterns to Follow

Reference `patterns.md`:
- Navigation Link Pattern

---

## Builder-2: PDF Generation System

### Scope

Install @react-pdf/renderer, create a build-time PDF generation script, redesign the capabilities page as a landing page with download CTA, and add a download link to the homepage.

### Complexity Estimate

**MEDIUM** - New dependency setup, PDF design work

### Success Criteria

- [ ] @react-pdf/renderer installed and working
- [ ] `/scripts/generate-capabilities-pdf.tsx` creates valid PDF
- [ ] PDF includes logo, name, tagline, capabilities, selected work, tech stack
- [ ] PDF is professional, scannable, one page
- [ ] PDF saved to `/public/ahiya-capabilities.pdf`
- [ ] Running `npm run generate:pdf` succeeds
- [ ] Capabilities page shows landing page with download button
- [ ] Homepage has download link in CTA strip
- [ ] PDF accessible at `/ahiya-capabilities.pdf`

### Files to Create

| File | Purpose |
|------|---------|
| `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/scripts/generate-capabilities-pdf.tsx` | PDF generation script |
| `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/public/ahiya-capabilities.pdf` | Generated PDF (build output) |

### Files to Modify

| File | Changes |
|------|---------|
| `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/package.json` | Add @react-pdf/renderer, add generate:pdf script |
| `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/capabilities/page.tsx` | Redesign as landing page with download CTA |
| `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/page.tsx` | Add download link in CTA strip |

### Dependencies

**Depends on:** Nothing
**Blocks:** Nothing

### Implementation Notes

**Step 1: Install dependency**
```bash
npm install @react-pdf/renderer
```

**Step 2: Update package.json scripts**
```json
{
  "scripts": {
    "generate:pdf": "npx tsx scripts/generate-capabilities-pdf.tsx",
    "prebuild": "npm run generate:pdf"
  }
}
```

**Step 3: Create PDF script**

See `patterns.md` for complete PDF Generation Pattern. Key structure:

```typescript
// scripts/generate-capabilities-pdf.tsx
import React from 'react';
import { Document, Page, Text, View, Image, StyleSheet, renderToFile } from '@react-pdf/renderer';
import path from 'path';

// Styles, Document component, generatePDF function
// Output to: path.join(process.cwd(), 'public', 'ahiya-capabilities.pdf')
```

**PDF Content Sections:**
1. Header with logo + name + tagline
2. Contact info row (website, email, github)
3. Value proposition
4. Capabilities (2-column grid)
5. Selected work (3-4 projects with brief description)
6. Tech stack
7. Footer with contact

**Step 4: Redesign capabilities page**

Transform from print-focused to download-focused:
- Hero section with "Download Full Capabilities PDF" CTA button
- Preview of key highlights
- Remove window.print() approach
- Link: `<a href="/ahiya-capabilities.pdf" download>`

**Step 5: Homepage download link**

In CTA strip section, add:
```tsx
<a
  href="/ahiya-capabilities.pdf"
  download
  className="inline-flex items-center gap-2 px-4 py-2 text-sm text-slate-300 hover:text-white transition-colors"
>
  <Download className="w-4 h-4" />
  Download Capabilities
</a>
```

### Testing Requirements

- [ ] `npm run generate:pdf` completes without errors
- [ ] PDF opens correctly in browser/PDF reader
- [ ] Logo displays with correct colors
- [ ] Text is readable and properly formatted
- [ ] Download button on capabilities page works
- [ ] Download link on homepage works
- [ ] PDF file size is reasonable (< 500KB)

### Patterns to Follow

Reference `patterns.md`:
- PDF Generation Pattern

---

## Builder-3: 2L Page Animations

### Scope

Animate the 2L methodology page with pipeline phase lighting, floating agent icons, count-up metrics, and enhanced card hovers. Update meta stats to show "7 plans, 10 iterations".

### Complexity Estimate

**MEDIUM** - Multiple animation implementations, state management

### Success Criteria

- [ ] Pipeline phases light up sequentially (0.3s each, looping)
- [ ] Connection lines between phases animate with gradient flow
- [ ] Agent card icons have floating/breathing animation
- [ ] Metrics count up from 0 when visible
- [ ] Meta stats show "7 plans, 10 iterations" with count-up
- [ ] Card hovers feel premium (enhanced lift + glow)
- [ ] Animations respect prefers-reduced-motion
- [ ] Page feels "alive" not "busy"

### Files to Modify

| File | Changes |
|------|---------|
| `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/2l/page.tsx` | Add animations to pipeline, agents, metrics |
| `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/globals.css` | Add pipeline animation keyframes (in BUILDER-3 section) |

### Dependencies

**Depends on:** Builder-6 (for useScrollReveal and useCountUp hooks)
**Blocks:** Nothing

**Note:** If Builder-6 hasn't completed hooks yet, Builder-3 can inline the hook implementations initially.

### Implementation Notes

**Pipeline Animation:**

```tsx
// State for active phase
const [activePhase, setActivePhase] = useState(0);
const phases = ['explore', 'plan', 'build', 'validate', 'deploy'];

useEffect(() => {
  const interval = setInterval(() => {
    setActivePhase((prev) => (prev + 1) % phases.length);
  }, 2000);
  return () => clearInterval(interval);
}, []);

// Render with active state
<div className={`pipeline-phase ${activePhase === i ? 'pipeline-phase-active' : ''}`}>
  {phase.icon}
</div>
```

**Agent Icon Animation:**

```tsx
// Add floating animation to agent icons
<div className={`icon-float icon-float-delay-${i % 3}`}>
  {agent.icon}
</div>
```

**Metrics Count-Up:**

```tsx
// Import or inline useCountUp
const { count: plansCount } = useCountUp(7);
const { count: iterationsCount } = useCountUp(10);

// Render
<div className="text-3xl font-bold tabular-nums">{plansCount}</div>
<div className="text-sm text-slate-400">Plans Completed</div>
```

**CSS to add to globals.css (BUILDER-3 section):**

```css
/* ========== BUILDER-3: 2L Page Animations ========== */

@keyframes phase-pulse {
  0%, 100% {
    box-shadow: 0 0 0 rgba(168, 85, 247, 0);
    transform: scale(1);
  }
  50% {
    box-shadow: 0 0 20px rgba(168, 85, 247, 0.6);
    transform: scale(1.05);
  }
}

@keyframes line-flow {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

.pipeline-phase-active {
  animation: phase-pulse 1.5s ease-in-out infinite;
}

.pipeline-line-animated {
  background: linear-gradient(90deg, transparent, rgba(168, 85, 247, 0.5), transparent);
  background-size: 200% 100%;
  animation: line-flow 3s linear infinite;
}
```

### Testing Requirements

- [ ] Pipeline phases cycle through sequentially
- [ ] Only one phase is "active" (glowing) at a time
- [ ] Agent icons float with varied timing
- [ ] Metrics count up when scrolled into view
- [ ] "7 plans, 10 iterations" displays correctly
- [ ] Test with prefers-reduced-motion: reduce (animations disabled)
- [ ] Page loads without JavaScript errors

### Patterns to Follow

Reference `patterns.md`:
- Intersection Observer Hook Pattern
- Count-Up Animation Hook Pattern
- Premium CSS Animations Pattern

---

## Builder-4: StatViz + Wealth Interactive Demos

### Scope

Create custom interactive demo components for StatViz (animated charts, toggle views) and Wealth (ticking balance, transaction animations) projects. Replace generic MockupElement with these custom demos.

### Complexity Estimate

**MEDIUM-HIGH** - Two complete demo components with animations

### Success Criteria

**StatViz Demo:**
- [ ] Animated bar chart that grows from 0 on load
- [ ] Three toggle buttons: Distribution, Correlation, Significance
- [ ] Staggered bar animations (0.1s delays)
- [ ] Animated metrics showing Mean, Std Dev, N

**Wealth Demo:**
- [ ] Balance counter ticks up from 0 to target (ILS formatting)
- [ ] Category progress bars animate in sequence
- [ ] Transaction list slides in from right
- [ ] Colors: green for income, normal for expenses
- [ ] +2.3% badge pulses green

**Both:**
- [ ] Demo replaces MockupElement in hero section
- [ ] Window chrome (traffic lights) included
- [ ] Hydration-safe (mounted state check)
- [ ] Mobile responsive

### Files to Modify

| File | Changes |
|------|---------|
| `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/projects/statviz/page.tsx` | Add StatVizDemo component, replace MockupElement |
| `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/projects/wealth/page.tsx` | Add WealthDemo component, replace MockupElement |
| `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/globals.css` | Add demo-specific animations (in BUILDER-4 section) |

### Dependencies

**Depends on:** Nothing (can inline hooks if Builder-6 not done)
**Blocks:** Nothing

### Implementation Notes

**StatViz Demo Implementation:**

See `patterns.md` - StatViz Demo Pattern for complete code.

Key features:
- `useState` for activeView toggle
- `useState` for animate trigger
- Bar heights array with staggered CSS transitions
- Metrics row with static values (or count-up if time permits)

**Wealth Demo Implementation:**

See `patterns.md` - Wealth Demo Pattern for complete code.

Key features:
- `useState` for balance with requestAnimationFrame counting
- `Intl.NumberFormat('he-IL', { style: 'currency', currency: 'ILS' })`
- Category bars with CSS width transition
- Transaction list with slide-in animation

**CSS to add (BUILDER-4 section):**

```css
/* ========== BUILDER-4: Demo Animations ========== */

@keyframes bar-grow {
  from { transform: scaleY(0); }
  to { transform: scaleY(1); }
}

@keyframes slide-in-right {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes pulse-green {
  0%, 100% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.4); }
  50% { box-shadow: 0 0 0 8px rgba(34, 197, 94, 0); }
}

.demo-bar {
  transform-origin: bottom;
}

.demo-pulse-green {
  animation: pulse-green 2s infinite;
}
```

**Integration in pages:**

Replace MockupElement usage with new demo:
```tsx
// Before
<MockupElement element={element} />

// After
<StatVizDemo />  // or <WealthDemo />
```

### Testing Requirements

- [ ] StatViz bars animate from 0 on page load
- [ ] Toggle buttons switch views (if implemented)
- [ ] Wealth balance counts up smoothly
- [ ] ILS currency formats correctly (right-to-left aware)
- [ ] Category bars fill sequentially
- [ ] Transactions slide in from right
- [ ] Both demos work on mobile
- [ ] No hydration errors in console

### Patterns to Follow

Reference `patterns.md`:
- Demo Component Pattern
- StatViz Demo Pattern
- Wealth Demo Pattern

---

## Builder-5: Mirror + AI Pipeline Demos

### Scope

Create custom demo for Mirror of Dreams (cosmic background, AI typing effect) and enhance AI Research Pipeline (streaming text reveal when switching tabs).

### Complexity Estimate

**MEDIUM** - One new demo, one enhancement

### Success Criteria

**Mirror of Dreams Demo:**
- [ ] Cosmic background with floating star particles
- [ ] Dream entry displayed in serif/handwritten style font
- [ ] AI reflection types out character by character
- [ ] Blinking cursor at end of typing
- [ ] Ethereal glow around AI response container

**AI Research Pipeline Enhancement:**
- [ ] Tab switching triggers transition animation
- [ ] Narrative text reveals paragraph by paragraph
- [ ] Profile values transition smoothly between tabs
- [ ] Existing functionality preserved

### Files to Modify

| File | Changes |
|------|---------|
| `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/projects/mirror-of-dreams/page.tsx` | Add MirrorDemo component |
| `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/projects/ai-research-pipeline/page.tsx` | Enhance existing demo with streaming |
| `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/globals.css` | Add demo animations (in BUILDER-5 section) |

### Dependencies

**Depends on:** Nothing
**Blocks:** Nothing

### Implementation Notes

**Mirror Demo Implementation:**

See `patterns.md` - Mirror of Dreams Demo Pattern for complete code.

Key features:
- Cosmic background with CSS stars (absolute positioned divs with float animation)
- Dream entry in Georgia/serif font
- Typing effect using setInterval with 30-40ms per character
- Cursor blink using separate interval (530ms toggle)
- Subtle purple glow animation on AI container

**AI Pipeline Enhancement:**

The current page already has tabs - enhance with:

```tsx
const [isTransitioning, setIsTransitioning] = useState(false);
const [visibleParagraphs, setVisibleParagraphs] = useState<number[]>([]);

const handleTabChange = (index: number) => {
  setIsTransitioning(true);
  setVisibleParagraphs([]);

  setTimeout(() => {
    setActiveNarrative(index);
    setIsTransitioning(false);

    // Stagger paragraph reveals
    const paragraphs = sampleNarratives[index].narrative.split('\n\n');
    paragraphs.forEach((_, i) => {
      setTimeout(() => {
        setVisibleParagraphs(prev => [...prev, i]);
      }, i * 200);
    });
  }, 300);
};
```

**CSS to add (BUILDER-5 section):**

```css
/* ========== BUILDER-5: Demo Animations ========== */

@keyframes float-star {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
    opacity: 0.3;
  }
  50% {
    transform: translateY(-20px) rotate(180deg);
    opacity: 0.8;
  }
}

@keyframes cursor-blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

@keyframes cosmic-glow {
  0%, 100% { box-shadow: 0 0 20px rgba(168, 85, 247, 0.2); }
  50% { box-shadow: 0 0 40px rgba(168, 85, 247, 0.4); }
}

.demo-star {
  animation: float-star 6s ease-in-out infinite;
}

.demo-cursor {
  animation: cursor-blink 1s step-end infinite;
}

.demo-cosmic-glow {
  animation: cosmic-glow 3s ease-in-out infinite;
}

.narrative-paragraph {
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.4s ease;
}

.narrative-paragraph.visible {
  opacity: 1;
  transform: translateY(0);
}
```

### Testing Requirements

- [ ] Mirror demo shows floating stars
- [ ] AI reflection types out gradually
- [ ] Cursor blinks at correct speed
- [ ] Typing completes full text
- [ ] AI Pipeline tabs still work
- [ ] Tab switching triggers text reveal animation
- [ ] Paragraphs appear sequentially
- [ ] Mobile displays correctly

### Patterns to Follow

Reference `patterns.md`:
- Demo Component Pattern
- Mirror of Dreams Demo Pattern

---

## Builder-6: Global Animations + Polish

### Scope

Create shared hooks (useScrollReveal, useCountUp), add premium CSS utilities to globals.css, fix section reveals across all pages to use Intersection Observer, and add typography/spacing polish.

**PRIORITY: Create hooks early so other builders can use them**

### Complexity Estimate

**MEDIUM** - Foundational work that other builders depend on

### Success Criteria

- [ ] `/app/hooks/useScrollReveal.ts` created and working
- [ ] `/app/hooks/useCountUp.ts` created and working
- [ ] Section reveals use Intersection Observer (not CSS animation on load)
- [ ] Premium CSS utilities added to globals.css
- [ ] Enhanced card hovers with lift + glow
- [ ] Active/press states on buttons
- [ ] Focus ring improvements
- [ ] Typography spacing improvements
- [ ] All pages feel polished and premium

### Files to Create

| File | Purpose |
|------|---------|
| `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/hooks/useScrollReveal.ts` | Reusable scroll reveal hook |
| `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/hooks/useCountUp.ts` | Reusable count-up hook |

### Files to Modify

| File | Changes |
|------|---------|
| `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/globals.css` | Add premium utilities (in BUILDER-6 section) |
| Multiple page files | Update to use new hooks where beneficial |

### Dependencies

**Depends on:** Nothing
**Blocks:** Builders 3, 4, 5 (they can use the hooks)

### Implementation Notes

**Step 1: Create hooks directory and files**

```bash
mkdir -p /home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/hooks
```

**Step 2: useScrollReveal hook**

See `patterns.md` - Intersection Observer Hook Pattern for complete code.

Key features:
- Options for threshold, rootMargin, triggerOnce
- Returns { ref, isVisible }
- Cleanup on unmount

**Step 3: useCountUp hook**

See `patterns.md` - Count-Up Animation Hook Pattern for complete code.

Key features:
- Options for duration, delay, startOnMount
- Ease-out cubic easing
- Returns { count, start, hasStarted }

**Step 4: CSS utilities**

Add to globals.css (BUILDER-6 section):

```css
/* ========== BUILDER-6: Global Premium Polish ========== */

/* Enhanced card hover */
.card-lift-premium {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.card-lift-premium:hover {
  transform: translateY(-6px) scale(1.01);
  box-shadow:
    0 12px 40px rgba(0, 0, 0, 0.4),
    0 0 0 1px rgba(168, 85, 247, 0.15),
    0 0 60px -10px rgba(168, 85, 247, 0.2);
}

/* Scroll reveal base (JS-controlled) */
.reveal-on-scroll {
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.reveal-on-scroll:not(.visible) {
  opacity: 0;
  transform: translateY(20px);
}

.reveal-on-scroll.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Active/press states */
.gentle-button:active,
.cta-magnetic:active {
  transform: translateY(1px) scale(0.98);
  transition: transform 0.1s ease;
}

/* Focus ring */
.gentle-button:focus-visible,
.cta-magnetic:focus-visible {
  outline: 2px solid rgba(168, 85, 247, 0.6);
  outline-offset: 3px;
}

/* Tabular numbers for counters */
.tabular-nums {
  font-variant-numeric: tabular-nums;
}

/* Staggered reveal */
.reveal-stagger > *:nth-child(1) { transition-delay: 0s; }
.reveal-stagger > *:nth-child(2) { transition-delay: 0.1s; }
.reveal-stagger > *:nth-child(3) { transition-delay: 0.2s; }
.reveal-stagger > *:nth-child(4) { transition-delay: 0.3s; }
.reveal-stagger > *:nth-child(5) { transition-delay: 0.4s; }
.reveal-stagger > *:nth-child(6) { transition-delay: 0.5s; }

/* Typography improvements */
.display-xl {
  letter-spacing: -0.03em; /* Tighten slightly */
}

/* Extra breathing room utility */
.section-breathing-xl {
  padding: 8rem 0;
}
```

**Step 5: Notify other builders**

Once hooks are created, other builders can import:
```typescript
import { useScrollReveal } from "@/app/hooks/useScrollReveal";
import { useCountUp } from "@/app/hooks/useCountUp";
```

### Testing Requirements

- [ ] useScrollReveal hook triggers on scroll
- [ ] useCountUp counts from 0 to target
- [ ] Hooks work in client components
- [ ] CSS utilities apply correctly
- [ ] Card hovers feel premium
- [ ] Button press gives feedback
- [ ] Focus states are visible
- [ ] No CSS conflicts with existing styles

### Patterns to Follow

Reference `patterns.md`:
- Intersection Observer Hook Pattern
- Count-Up Animation Hook Pattern
- Premium CSS Animations Pattern

---

## Builder Execution Order

### Parallel Group 1 (No dependencies)

| Builder | Focus | Can Start |
|---------|-------|-----------|
| Builder-1 | Navigation + Copy | Immediately |
| Builder-2 | PDF System | Immediately |
| Builder-6 | Global Animations + Hooks | Immediately (priority for hooks) |

### Parallel Group 2 (After Builder-6 hooks ready)

| Builder | Focus | Depends On |
|---------|-------|------------|
| Builder-3 | 2L Page Animations | Builder-6 hooks (or inline) |
| Builder-4 | StatViz + Wealth Demos | Nothing (can inline hooks) |
| Builder-5 | Mirror + AI Pipeline Demos | Nothing (can inline hooks) |

**Note:** Builders 3, 4, 5 CAN start immediately by inlining hook implementations. They can later refactor to use shared hooks from Builder-6.

---

## Integration Notes

### How Builder Outputs Come Together

1. **Builder-1** merges first - no conflicts expected
2. **Builder-6** merges second - creates shared infrastructure
3. **Builder-2** merges third - adds dependency and new files
4. **Builders 3, 4, 5** merge in any order - isolated features

### CSS Integration

globals.css will have these sections after all builders complete:

```css
/* ... existing styles ... */

/* ========== BUILDER-3: 2L Page Animations ========== */
/* Pipeline phase pulse, line flow */

/* ========== BUILDER-4: Demo Animations ========== */
/* Bar grow, slide-in, pulse-green */

/* ========== BUILDER-5: Demo Animations ========== */
/* Float star, cursor blink, cosmic glow */

/* ========== BUILDER-6: Global Premium Polish ========== */
/* Card lift, reveal-on-scroll, button states */
```

### Potential Conflict Areas

1. **globals.css** - Mitigated by section ownership
2. **page.tsx (homepage)** - Builder-1 changes copy, Builder-2 adds download link - merge sequentially

### Shared Files That Need Coordination

| File | Builders | Resolution |
|------|----------|------------|
| globals.css | 3, 4, 5, 6 | Section-based, Builder-6 has final authority |
| page.tsx | 1, 2 | Sequential merge (1 first, then 2) |
| /app/hooks/ | 6 creates, 3-5 use | Builder-6 completes hooks first |

---

## Quality Checklist

Before marking builder task complete:

- [ ] Code compiles without TypeScript errors
- [ ] Page loads without console errors
- [ ] Animations work as specified
- [ ] Mobile view tested
- [ ] prefers-reduced-motion respected (where applicable)
- [ ] CSS added in designated section with comment header
- [ ] No regressions to existing functionality

---

*Builder tasks defined: 2025-12-04*
*Iteration: 10 (Plan-8)*

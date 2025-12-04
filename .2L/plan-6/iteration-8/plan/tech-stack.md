# Technology Stack

## Core Framework

**Decision:** Next.js 15.3.4 with App Router

**Rationale:**
- Already in use across all project pages
- Server components available for future optimization
- Consistent with portfolio site architecture
- No migration or setup required

**No changes needed for this iteration.**

## React

**Decision:** React 19.0.0 (client components)

**Rationale:**
- All project pages use `"use client"` directive
- Interactive elements (tabs, hover states) require client-side rendering
- Already configured and working

## TypeScript

**Decision:** TypeScript 5.x with strict mode

**Rationale:**
- Type safety for props and data structures
- IDE support for refactoring
- Already configured across codebase

## Styling

**Decision:** Tailwind CSS 4.1.10 + Custom CSS in globals.css

**Rationale:**
- Utility-first approach already established
- Custom CSS classes (`.contemplative-card`, `.breathing-glass`, etc.) provide consistent design language
- PostCSS integration via `@import "tailwindcss"`

**New CSS Classes to Add:**
- `.section-reveal` - CSS-only staggered animation
- `.section-reveal-1` through `.section-reveal-8` - Animation delay variants

## Icons

**Decision:** lucide-react 0.517.0

**Rationale:**
- Already installed and in use
- All required icons available:
  - `ExternalLink` - Live site links (already in use)
  - `ChevronDown` - Scroll indicators (already in use)
  - `Github` - GitHub links (used on homepage)
  - `Lock` - Private repository badge (available)
  - `ArrowRight` - Next project navigation (available)

**Required Import:**
```typescript
import { ExternalLink, ChevronDown, Github, Lock, ArrowRight } from "lucide-react";
```

## Images

**Decision:** next/image for optimized image rendering

**Rationale:**
- Already in use for logo images
- Provides lazy loading, responsive sizing
- Required for any future screenshot additions

**Note:** This iteration uses HTML mockups instead of screenshots, so no new image assets needed.

---

## Animation Approach

**Decision:** CSS-only animations with `animation-delay` staggering

**Rationale:**
- Vision document explicitly recommends CSS-only approach
- Existing `@keyframes fade-in-up` already defined in globals.css
- More reliable than IntersectionObserver (no JS race conditions)
- Respects `prefers-reduced-motion` (already handled in globals.css)

**Implementation:**
```css
.section-reveal {
  animation: fade-in-up 0.6s ease forwards;
  opacity: 0;
}

.section-reveal-1 { animation-delay: 0.1s; }
.section-reveal-2 { animation-delay: 0.2s; }
/* etc. */
```

**Why Not IntersectionObserver:**
- Three different implementations exist across pages (inconsistent)
- Can cause "invisible section" bugs if observer fails
- CSS-only is simpler and more reliable for this use case

---

## Data Architecture

**Decision:** Keep data inline in page components (no extraction to shared files)

**Rationale:**
- Each project page is standalone
- Content is unique per project
- Extraction adds complexity without benefit for 4 pages
- Future refactoring can centralize if needed

**Data Structures Per Page:**
```typescript
// Metrics
const metrics = [
  { value: "10K+", label: "Responses Generated" },
  // ...
];

// Tech Deep-Dive
const techDeepDive = [
  { name: "Next.js 15", why: "Server components for speed." },
  // ...
];

// Next Project
const nextProject = {
  href: "/projects/statviz",
  emoji: "\u{1F4CA}",
  title: "StatViz",
  subtitle: "Statistical Analysis, Visualized"
};
```

---

## Environment Variables

**No new environment variables required for this iteration.**

All functionality uses existing:
- Static page rendering
- Client-side interactivity
- No external API calls from project pages

---

## Dependencies Overview

| Package | Version | Purpose |
|---------|---------|---------|
| next | 15.3.4 | Framework |
| react | 19.0.0 | UI library |
| typescript | 5.x | Type safety |
| tailwindcss | 4.1.10 | Styling utilities |
| lucide-react | 0.517.0 | Icons (Github, Lock, ArrowRight) |

**No new dependencies required.**

---

## Performance Targets

- **First Contentful Paint:** < 1.5s (unchanged from current)
- **Total Blocking Time:** < 200ms
- **Largest Contentful Paint:** < 2.5s
- **Animation smoothness:** 60fps for all transitions

**Considerations:**
- CSS animations are GPU-accelerated (transform, opacity)
- No heavy JavaScript libraries added
- HTML mockups are lightweight (no image downloads)

---

## Security Considerations

- **No new security concerns for this iteration**
- All links use `rel="noopener noreferrer"` for external links
- No user input handling
- No API endpoints modified

---

## Browser Support

**Target:** Modern browsers (last 2 versions)
- Chrome, Edge (Chromium)
- Firefox
- Safari

**Animation fallback:** `prefers-reduced-motion` already implemented

**CSS compatibility:**
- All CSS features used are widely supported
- No experimental CSS features (animation-timeline: view() avoided)

---

## Testing Strategy

| Approach | What to Test |
|----------|--------------|
| Manual browser testing | Animations work in Chrome/Safari/Firefox |
| Reduced motion testing | Toggle `prefers-reduced-motion` in dev tools |
| Mobile testing | Responsive layout on small screens |
| Navigation testing | Project chain links work correctly |

---

*Tech stack finalized: 2025-12-04*
*No new dependencies or breaking changes*

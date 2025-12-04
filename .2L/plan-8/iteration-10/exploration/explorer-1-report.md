# Explorer 1 Report: Architecture Analysis for 6-Builder Execution

## Executive Summary

This analysis maps the complete file ownership matrix for 6 parallel builders working on "Undeniably Premium & Alive" plan. The architecture is clean with minimal conflict zones - primarily in globals.css which needs a CSS-variable-based integration strategy. Each builder has clear file ownership with well-defined interfaces.

## File Ownership Matrix

### Builder 1: Navigation Fix + Copy Fixes
| File | Ownership | Action |
|------|-----------|--------|
| `/app/components/Navigation.tsx` | **PRIMARY** | Fix anchor links, update copy |
| `/app/page.tsx` | **PRIMARY** | Update hero copy, taglines |
| `/app/2l/page.tsx` | TOUCH | Minor copy adjustments if needed |
| `/app/capabilities/page.tsx` | TOUCH | Minor copy adjustments if needed |

**Files touched:** 1-4 files
**Risk level:** LOW - isolated component changes

---

### Builder 2: PDF Generation System
| File | Ownership | Action |
|------|-----------|--------|
| `/app/capabilities/page.tsx` | **PRIMARY** | Replace window.print() with PDF generation |
| `/app/components/PDFGenerator.tsx` | **CREATE** | New component for PDF generation |
| `/package.json` | **SHARED** | Add dependencies (e.g., @react-pdf/renderer or jspdf) |

**Files touched:** 2-3 files
**Risk level:** MEDIUM - dependency addition requires coordination
**Dependencies to add:** `@react-pdf/renderer` or `jspdf` + `html2canvas`

---

### Builder 3: 2L Page Animations
| File | Ownership | Action |
|------|-----------|--------|
| `/app/2l/page.tsx` | **PRIMARY** | Add premium animations to pipeline, agents, benefits sections |
| `/app/globals.css` | **SHARED** | Add new animation keyframes |

**Files touched:** 2 files
**Risk level:** MEDIUM - CSS additions need coordination

---

### Builder 4: StatViz + Wealth Demo Components
| File | Ownership | Action |
|------|-----------|--------|
| `/app/projects/statviz/page.tsx` | **PRIMARY** | Add interactive demo component |
| `/app/projects/wealth/page.tsx` | **PRIMARY** | Add interactive demo component |
| `/app/components/demos/StatVizDemo.tsx` | **CREATE** | New demo component |
| `/app/components/demos/WealthDemo.tsx` | **CREATE** | New demo component |
| `/app/globals.css` | **SHARED** | Demo-specific animations |

**Files touched:** 4-5 files
**Risk level:** MEDIUM - new component creation, CSS coordination

---

### Builder 5: Mirror + AI Pipeline Demo Components
| File | Ownership | Action |
|------|-----------|--------|
| `/app/projects/mirror-of-dreams/page.tsx` | **PRIMARY** | Add interactive demo component |
| `/app/projects/ai-research-pipeline/page.tsx` | **PRIMARY** | Add interactive demo component |
| `/app/components/demos/MirrorDemo.tsx` | **CREATE** | New demo component |
| `/app/components/demos/AIPipelineDemo.tsx` | **CREATE** | New demo component |
| `/app/globals.css` | **SHARED** | Demo-specific animations |

**Files touched:** 4-5 files
**Risk level:** MEDIUM - new component creation, CSS coordination

---

### Builder 6: Global Animations + Polish
| File | Ownership | Action |
|------|-----------|--------|
| `/app/globals.css` | **PRIMARY** | Global animation enhancements |
| `/app/page.tsx` | **SHARED** | Apply global animations |
| `/app/components/PortfolioCard.tsx` | **PRIMARY** | Enhanced hover animations |
| `/app/components/Footer.tsx` | PRIMARY | Animation polish |
| `/app/layout.tsx` | TOUCH | Possible wrapper for global effects |

**Files touched:** 4-5 files
**Risk level:** HIGH - global CSS is shared with multiple builders

---

## Potential Conflicts

### Critical Conflict: globals.css

**Touched by:** Builders 3, 4, 5, 6

**Current Structure (606 lines):**
```
Lines 1-60: Foundation (box-sizing, html, body, scrollbar)
Lines 64-119: Components (.contemplative-card, .gentle-button, .breathing-glass)
Lines 120-172: Typography (.display-xl, .heading-lg, etc.)
Lines 174-209: Layout (.container-wide, .section-breathing)
Lines 211-257: Colors & Micro-interactions
Lines 258-286: Hero Animations
Lines 288-341: Keyframes
Lines 380-400: Section Reveal Classes
Lines 401-465: Responsive + Utilities
Lines 507-605: Print Styles
```

**Integration Strategy:**
1. Each builder adds CSS in designated sections using comments:
   ```css
   /* ═══════════════════════════════════════════════════════════════════════════
      [BUILDER-X] Section Name
      ═══════════════════════════════════════════════════════════════════════════ */
   ```
2. Use CSS custom properties (variables) for shared values
3. Builder 6 has final authority on globals.css - integrates others' additions

---

### Medium Conflict: package.json

**Touched by:** Builder 2 (PDF dependencies)

**Current dependencies:**
- `@tailwindcss/postcss`: ^4.1.10
- `lucide-react`: ^0.517.0
- `next`: 15.3.4
- `react`: ^19.0.0
- `react-dom`: ^19.0.0
- `tailwindcss`: ^4.1.10

**Integration Strategy:**
- Builder 2 adds dependencies in separate commit
- No other builders should modify package.json

---

### Low Conflict: page.tsx (homepage)

**Touched by:** Builders 1 and 6

**Integration Strategy:**
- Builder 1: Copy/text changes only (lines 52-67, 158-192)
- Builder 6: Animation class additions (non-destructive)
- Sequential merge: Builder 1 first, then Builder 6

---

## Current Patterns

### Animation Patterns

**1. CSS-only Section Reveal:**
```css
.section-reveal {
  animation: fade-in-up 0.6s ease forwards;
  opacity: 0;
}
.section-reveal-1 { animation-delay: 0.1s; }
.section-reveal-2 { animation-delay: 0.2s; }
/* ... up to .section-reveal-10 */
```

**2. JavaScript Scroll Reveal Hook (useScrollReveal):**
```typescript
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    // ...
  }, []);
  
  return { ref, isVisible };
}
```

**3. Hero Staggered Animation:**
```tsx
<span className="hero-word" style={{ animationDelay: '0.1s' }}>
  <span className="text-gentle">Word</span>
</span>
```

**4. Hover-triggered Animations:**
```css
.cta-magnetic:hover {
  transform: scale(1.03);
  box-shadow: 0 0 40px rgba(168, 85, 247, 0.5);
}
```

---

### Component Structure Patterns

**1. Page Component Pattern:**
```typescript
"use client";

import React, { useState, useEffect } from "react";
// ... imports

export default function PageName() {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Loading state for hydration
  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#0a0f1a] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-purple-400/30 border-t-purple-400 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <main id="main-content" className="bg-[#0a0f1a] min-h-screen">
      <Navigation />
      {/* sections */}
      <Footer />
    </main>
  );
}
```

**2. Project Page Pattern (4 projects follow identical structure):**
- Hero with emoji + title + "Built with 2L" badge
- Visual Mockup Section (MockupElement component)
- Challenge Section
- Solution Section
- Features Section
- Tech Deep-Dive Section
- Metrics Section
- Next Project Section
- CTA Section
- Footer

**3. MockupElement Pattern:**
```typescript
function MockupElement({ element }: { element: MockupScreen['elements'][0] }) {
  switch (element.type) {
    case 'header': return <div>...</div>;
    case 'card': return <div>...</div>;
    case 'list': return <div>...</div>;
    case 'button': return <div>...</div>;
    case 'input': return <div>...</div>;
    case 'chart': return <div>...</div>;
    case 'table': return <div>...</div>;
    default: return null;
  }
}
```

---

### Import Patterns

**Standard imports for pages:**
```typescript
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { IconName } from "lucide-react";
import { Navigation } from "@/app/components/Navigation";
import { Footer } from "@/app/components/Footer";
```

**Path alias:** `@/` maps to project root

---

## Integration Strategy

### Pre-Build Phase
1. Create designated CSS sections in globals.css for each builder
2. Document CSS variable naming conventions
3. Create `/app/components/demos/` directory structure

### Build Phase (Parallel Execution)
1. Each builder works in isolated file territories
2. Builders 3-5 add CSS under their designated sections
3. Builder 6 monitors global animations but does not conflict

### Post-Build Integration Order
1. **Builder 1** (Navigation + Copy) - FIRST
   - Minimal dependencies, no CSS changes
   
2. **Builder 2** (PDF) - SECOND
   - Adds dependencies, creates new component
   
3. **Builders 4 & 5** (Demo Components) - PARALLEL THIRD
   - Create new demo components
   - Add CSS under designated sections
   
4. **Builder 3** (2L Animations) - FOURTH
   - Modifies /app/2l/page.tsx
   - Adds animation CSS
   
5. **Builder 6** (Global Polish) - LAST
   - Reviews all CSS additions
   - Applies global animations
   - Resolves any CSS conflicts
   - Final polish pass

### CSS Namespace Convention
```css
/* Builder 3: 2L Page Animations */
.2l-pipeline-animate { }
.2l-agent-card-animate { }

/* Builder 4: StatViz/Wealth Demos */
.demo-statviz-chart { }
.demo-wealth-balance { }

/* Builder 5: Mirror/Pipeline Demos */
.demo-mirror-reflection { }
.demo-pipeline-flow { }

/* Builder 6: Global Polish */
.global-breathe { }
.global-glow { }
```

---

## Recommendations for Planner

1. **Create Demo Component Directory First:**
   ```bash
   mkdir -p /app/components/demos
   ```
   This prevents Builders 4 and 5 from creating conflicting structures.

2. **Pre-allocate CSS Sections:**
   Add placeholder sections in globals.css before builders start:
   ```css
   /* ═══════════════════════════════════════════════════════════════════════════
      BUILDER-3: 2L Page Animations (Lines 610-660)
      ═══════════════════════════════════════════════════════════════════════════ */
   
   /* ═══════════════════════════════════════════════════════════════════════════
      BUILDER-4: Demo Components - StatViz & Wealth (Lines 661-710)
      ═══════════════════════════════════════════════════════════════════════════ */
   
   /* etc. */
   ```

3. **PDF Strategy Decision:**
   Two options for Builder 2:
   - **Option A:** `@react-pdf/renderer` - Full React PDF generation (more control, larger bundle)
   - **Option B:** `html2canvas` + `jspdf` - Screenshot-based (simpler, smaller bundle)
   
   Recommend Option B for capabilities page use case.

4. **Demo Component Consistency:**
   Builders 4 and 5 should use identical wrapper pattern:
   ```typescript
   interface DemoProps {
     className?: string;
   }
   
   export function ProjectDemo({ className }: DemoProps) {
     return (
       <div className={`demo-container ${className}`}>
         {/* Interactive demo content */}
       </div>
     );
   }
   ```

5. **Global Animation Variables:**
   Define shared timing variables at the start of Builder 6's work:
   ```css
   :root {
     --anim-duration-fast: 0.3s;
     --anim-duration-medium: 0.6s;
     --anim-duration-slow: 1.2s;
     --anim-easing: cubic-bezier(0.4, 0, 0.2, 1);
   }
   ```

---

## Resource Map

### Critical Files
| File | Lines | Purpose | Builder(s) |
|------|-------|---------|------------|
| `/app/globals.css` | 606 | Global styles, animations | 3, 4, 5, 6 |
| `/app/page.tsx` | 237 | Homepage | 1, 6 |
| `/app/2l/page.tsx` | 464 | 2L page | 3 |
| `/app/capabilities/page.tsx` | 433 | Capabilities + PDF | 1, 2 |
| `/app/components/Navigation.tsx` | 140 | Site navigation | 1 |

### New Files to Create
| File | Builder | Purpose |
|------|---------|---------|
| `/app/components/demos/StatVizDemo.tsx` | 4 | StatViz interactive demo |
| `/app/components/demos/WealthDemo.tsx` | 4 | Wealth interactive demo |
| `/app/components/demos/MirrorDemo.tsx` | 5 | Mirror interactive demo |
| `/app/components/demos/AIPipelineDemo.tsx` | 5 | AI Pipeline interactive demo |
| `/app/components/PDFGenerator.tsx` | 2 | PDF generation utility |

### Key Dependencies
| Package | Current | Purpose |
|---------|---------|---------|
| next | 15.3.4 | Framework |
| react | ^19.0.0 | UI Library |
| lucide-react | ^0.517.0 | Icons |
| tailwindcss | ^4.1.10 | Styling |
| **jspdf (ADD)** | - | PDF generation |
| **html2canvas (ADD)** | - | PDF screenshot |

---

## Questions for Planner

1. Should demo components support mobile interaction or desktop-only?
2. What specific copy changes are needed for Builder 1? (Need list)
3. Should PDF include all sections or allow section selection?
4. Are there specific animation styles from external references to match?
5. Should demos be lazy-loaded or inline with page content?

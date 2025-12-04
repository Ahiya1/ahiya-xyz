# Master Explorer 4: Architecture & Integration Patterns

## Summary

This report provides a comprehensive analysis of the ahiya-xyz portfolio codebase architecture, with particular focus on the premium 2L page as the reference standard for upcoming project page upgrades. The analysis covers component patterns, animation infrastructure, routing structure, and styling conventions that builders should follow to create premium project pages.

---

## 2L Page Analysis (Premium Reference)

### File Structure

The 2L page (`/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/2l/page.tsx`) is a client-side rendered page with:
- **509 lines** of premium, well-structured code
- **5 custom components** in `/app/components/2l/`
- Comprehensive data arrays for phases, agents, benefits, and technical content
- State management for animations and accordion interactions

### Key Components

Located in `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/components/2l/`:

| Component | File | Description | Premium Feature |
|-----------|------|-------------|-----------------|
| **TerminalAnimation** | `TerminalAnimation.tsx` | Looping terminal typing effect showing real 2L commands | requestAnimationFrame-based typing, color-coded output types |
| **AgentVisualization** | `AgentVisualization.tsx` | Glowing orbs representing AI agents with hover effects | Radial gradients, staggered float animations, SVG connections |
| **LiveDashboard** | `LiveDashboard.tsx` | Count-up metrics with scroll-triggered animation | IntersectionObserver, custom useCountUp hook, staggered reveals |
| **CodeGenDemo** | `CodeGenDemo.tsx` | Code editor with syntax highlighting and typing effect | Syntax highlighting, line numbers, cursor blink |
| **SlashCommands** | `SlashCommands.tsx` | Grid of slash commands with icons | Simple grid layout, icon + description pattern |

### Animation Techniques

1. **requestAnimationFrame Typing**
   ```typescript
   // TerminalAnimation.tsx pattern
   const animate = (timestamp: number) => {
     if (timestamp - lastCharTimeRef.current >= typingSpeed) {
       lastCharTimeRef.current = timestamp;
       charIndexRef.current++;
       setCurrentText(currentLine.text.slice(0, charIndexRef.current));
       animationRef.current = requestAnimationFrame(animate);
     }
   };
   ```

2. **IntersectionObserver for Scroll Triggers**
   ```typescript
   // LiveDashboard.tsx pattern
   const observer = new IntersectionObserver(
     ([entry]) => {
       if (entry.isIntersecting && !isVisible) {
         setIsVisible(true);
         counts.forEach((c) => c.start());
       }
     },
     { threshold: 0.3 }
   );
   ```

3. **Custom Count-Up Hook**
   ```typescript
   // Inline in LiveDashboard.tsx
   function useCountUp(target: number, duration = 2000) {
     // Uses requestAnimationFrame with ease-out cubic
     const eased = 1 - Math.pow(1 - progress, 3);
     setCount(Math.floor(eased * target));
   }
   ```

4. **Reduced Motion Support**
   ```typescript
   // All demo components check this
   const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
   if (mediaQuery.matches) {
     // Show all content immediately without animation
   }
   ```

### What Makes It "Premium"

1. **Multi-Section Architecture**: 10+ distinct sections with staggered reveal
2. **Interactive Demos**: Real working animations, not static mockups
3. **Data-Driven Content**: Arrays for phases, agents, benefits - easy to maintain
4. **Consistent Visual Language**: Glass cards, purple accents, subtle gradients
5. **Performance-Conscious**: Uses refs, requestAnimationFrame, proper cleanup
6. **Accessibility**: Reduced motion support, ARIA attributes, keyboard navigation

---

## Animation Infrastructure

### CSS Keyframes Available (from `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/globals.css`)

| Keyframe | Description | Usage |
|----------|-------------|-------|
| `word-reveal` | translateY(20px) + opacity fade in | Hero text, staggered words |
| `gentle-drift` | Subtle translate movement | Background texture |
| `soft-float` | translateY(-6px) bounce | Floating elements |
| `fade-in-up` | translateY(20px) + opacity | Section reveals |
| `gradient-shift` | background-position animation | Hero gradient |
| `phase-pulse` | box-shadow + scale | Active pipeline phase |
| `line-flow` | background-position | Pipeline connection line |
| `icon-float` | translateY(-8px) | Agent icons floating |
| `agent-orb-float` | translateY(-12px) + scale | Agent visualization orbs |
| `slide-in-right` | translateX(20px) + opacity | Demo elements |
| `pulse-green` | box-shadow pulse | Status indicators |
| `float-star` | translateY + rotate + opacity | Mirror of Dreams stars |
| `cursor-blink` | opacity step animation | Typing cursors |
| `cosmic-glow` | box-shadow expansion | Glowing elements |

### CSS Classes Available

```css
/* Section reveal with stagger */
.section-reveal { animation: fade-in-up 0.6s ease forwards; opacity: 0; }
.section-reveal-1 through .section-reveal-10 { animation-delay: 0.1s - 1.0s; }

/* Card hover effects */
.card-lift-premium { /* translateY(-6px) + scale(1.01) + box-shadow */ }
.contemplative-card { /* glass morphism + hover transform */ }

/* Button effects */
.cta-magnetic:hover { transform: scale(1.03); box-shadow glow; }
.gentle-button { /* purple accent button with hover states */ }

/* Typography */
.text-gentle { /* gradient text: purple to pink */ }
.display-xl, .display-lg { /* Crimson font, large sizes */ }
.heading-xl, .heading-lg { /* section headings */ }
.body-xl, .body-lg { /* paragraph text */ }

/* Layout */
.container-wide { max-width: 1200px; }
.container-content { max-width: 800px; }
.container-narrow { max-width: 600px; }
.section-breathing { padding: 6rem 0; }
```

### Custom Hooks Pattern

```typescript
// useScrollReveal - used in Footer, PortfolioCard, HomePage
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
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}
```

---

## Component Patterns

### Reusable Components

Located in `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/components/`:

| Component | File | Purpose | Props |
|-----------|------|---------|-------|
| **Navigation** | `Navigation.tsx` | Fixed header with mobile menu | None |
| **Footer** | `Footer.tsx` | Simple footer with scroll reveal | None |
| **PortfolioCard** | `PortfolioCard.tsx` | Project card with glow effects | `project`, `index` |
| **SectionHeading** | `SectionHeading.tsx` | Section title + description | `title`, `description`, `centered` |
| **MobileNav** | `MobileNav.tsx` | Mobile navigation panel | Not currently used directly |

### TypeScript Interface Patterns

```typescript
// Project page data structure pattern (from mirror-of-dreams)
interface MockupScreen {
  title: string;
  description: string;
  elements: { type: string; label: string; accent?: boolean }[];
}

interface MetricItem {
  value: string;
  label: string;
}

interface TechDeepDiveItem {
  name: string;
  why: string;
}

interface NextProject {
  href: string;
  emoji: string;
  title: string;
  subtitle: string;
}

// Portfolio project interface (from PortfolioCard.tsx)
export interface PortfolioProject {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  status: "live" | "development";
  liveUrl?: string;
  detailUrl: string;
  techStack: string[];
}
```

### Props Patterns

- **Optional className**: `className?: string` for extending styles
- **Index for stagger**: `index?: number` for animation delays
- **Status discriminated unions**: `status: "live" | "development"`
- **Optional URLs**: `liveUrl?: string` for when no external link exists

---

## Routing Structure

### Current Routes

```
/                                    - Homepage
/2l                                  - 2L Page (premium reference)
/capabilities                        - Capabilities page
/projects/mirror-of-dreams           - Mirror of Dreams project
/projects/statviz                    - StatViz project
/projects/wealth                     - Wealth project (TO BE DELETED)
/projects/ai-research-pipeline       - AI Research Pipeline project
```

### Adding New Route: /projects/selahreach

1. **Create directory**: `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/projects/selahreach/`
2. **Create page**: `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/projects/selahreach/page.tsx`
3. **Update portfolio data**: `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/data/portfolio.ts`
4. **Add visual config**: Update `projectVisuals` in `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/components/PortfolioCard.tsx`

### Portfolio Data Location

```typescript
// /home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/data/portfolio.ts
export const portfolioProjects: PortfolioProject[] = [
  // Add new project here
  {
    id: "selahreach",
    title: "SelahReach",
    subtitle: "Intelligent Outreach Automation",
    description: "...",
    status: "live",
    detailUrl: "/projects/selahreach",
    techStack: ["Claude Code", "..."],
  },
];
```

### PortfolioCard Visual Config

```typescript
// /home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/components/PortfolioCard.tsx
// Add to projectVisuals object:
"selahreach": {
  accent: "rgb(139, 92, 246)",        // purple for terminal/code aesthetic
  accentLight: "rgb(167, 139, 250)",
  glow: "rgba(139, 92, 246, 0.4)",
  icon: <Terminal className="w-7 h-7" />,  // import Terminal from lucide-react
},
```

---

## Styling Guide

### Color Palette

| Name | Value | Usage |
|------|-------|-------|
| **Background** | `#0a0f1a` | Main page background |
| **Card Background** | `rgba(255, 255, 255, 0.04)` | Glass cards |
| **Purple Primary** | `#a78bfa` / `rgb(168, 85, 247)` | Accent color, gradient start |
| **Purple Light** | `#c084fc` | Hover states |
| **Pink Accent** | `#f472b6` | Gradient end for `.text-gentle` |
| **Emerald** | `#22c55e` | Success states, "Live" badges |
| **Blue** | `#60a5fa` | Secondary accent (commands) |
| **Slate-300** | `#cbd5e1` | Body text |
| **Slate-400** | `#94a3b8` | Secondary text |
| **Slate-500** | `#64748b` | Muted text |
| **White/10** | `rgba(255, 255, 255, 0.1)` | Borders |
| **White/5** | `rgba(255, 255, 255, 0.05)` | Subtle borders |

### Typography

| Class | Font | Size | Weight | Usage |
|-------|------|------|--------|-------|
| `.display-xl` | Crimson Text | clamp(2.5rem, 5vw, 4rem) | 600 | Page titles |
| `.display-lg` | Crimson Text | clamp(2rem, 4vw, 3rem) | 600 | Section titles |
| `.heading-xl` | Inter | clamp(1.5rem, 3vw, 2rem) | 600 | Major headings |
| `.heading-lg` | Inter | clamp(1.25rem, 2.5vw, 1.5rem) | 500 | Card titles |
| `.body-xl` | Inter | clamp(1.125rem, 2vw, 1.25rem) | 400 | Lead paragraphs |
| `.body-lg` | Inter | clamp(1rem, 1.5vw, 1.125rem) | 400 | Body text |

### Spacing Conventions

| Class | Value | Usage |
|-------|-------|-------|
| `.section-breathing` | 6rem (96px) | Section vertical padding |
| `.section-breathing-xl` | 8rem (128px) | Extra breathing room |
| `.spacing-gentle` | 2rem | Between related elements |
| `.spacing-comfortable` | 3rem | Between distinct elements |
| `.spacing-generous` | 4rem | Major section breaks |

### Responsive Breakpoints

| Breakpoint | Width | Usage |
|------------|-------|-------|
| `sm` | 640px | Stack to row layouts |
| `md` | 768px | 2-column grids, show desktop nav |
| `lg` | 1024px | 3-column grids, wider content |
| `xl` | 1280px | Max content width |

---

## Builder Recommendations

### Pattern 1: Project Page Template

Every project page should follow this structure:

```tsx
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, ChevronDown, Lock, ArrowRight } from "lucide-react";

// TypeScript interfaces
interface DemoData { ... }
interface MetricItem { value: string; label: string; }
interface TechDeepDiveItem { name: string; why: string; }
interface NextProject { href: string; emoji: string; title: string; subtitle: string; }

// Custom Demo Component (project-specific)
function ProjectDemo() {
  // Interactive demo with animations
  // Follow reduced motion pattern
  return (
    <div className="relative bg-slate-900/80 backdrop-blur-sm rounded-xl border border-slate-700/50 overflow-hidden">
      {/* Window chrome */}
      <div className="flex items-center gap-2 px-4 py-3 bg-slate-800/50 border-b border-slate-700/50">
        <div className="w-3 h-3 rounded-full bg-red-500/80" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
        <div className="w-3 h-3 rounded-full bg-green-500/80" />
        <span className="ml-2 text-xs text-slate-500">Demo Title</span>
      </div>
      {/* Demo content */}
    </div>
  );
}

export default function ProjectPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  // Data arrays
  const features = [...];
  const challenges = [...];
  const solutions = [...];
  const techDeepDive = [...];
  const metrics = [...];
  const nextProject = {...};

  if (!mounted) return <LoadingState />;

  return (
    <div className="min-h-screen bg-[#0a0f1a] text-white">
      {/* 1. Navigation - inline or shared */}
      <nav>...</nav>

      {/* 2. Hero Section */}
      <section className="min-h-screen flex items-center justify-center hero-gradient-bg pt-20">
        {/* Back link, emoji, title, "Built with 2L" badge, tagline, CTAs */}
      </section>

      {/* 3. Interactive Demo Section */}
      <section className="py-24 section-reveal section-reveal-1">
        <ProjectDemo />
      </section>

      {/* 4. Challenge Section */}
      <section className="py-24 section-reveal section-reveal-2">...</section>

      {/* 5. Solution Section */}
      <section className="py-24 section-reveal section-reveal-3">...</section>

      {/* 6. Features Section */}
      <section className="py-24 section-reveal section-reveal-4">...</section>

      {/* 7. Tech Deep-Dive Section */}
      <section className="py-24 section-reveal section-reveal-5">...</section>

      {/* 8. Metrics/Impact Section */}
      <section className="py-24 section-reveal section-reveal-6">...</section>

      {/* 9. Next Project Section */}
      <section className="py-24 section-reveal section-reveal-7">...</section>

      {/* 10. CTA Section */}
      <section className="py-24 section-reveal section-reveal-8">...</section>

      {/* 11. Footer */}
      <footer>...</footer>
    </div>
  );
}
```

### Pattern 2: Demo Component Structure

```tsx
function ProjectDemo() {
  const [mounted, setMounted] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [demoState, setDemoState] = useState<DemoStateType>('initial');

  useEffect(() => {
    setMounted(true);

    // Check reduced motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);

    // Start animation after mount
    if (!mediaQuery.matches) {
      // Initialize animation
    }
  }, []);

  if (!mounted) {
    return <div className="h-64 bg-slate-800/50 rounded-lg animate-pulse" />;
  }

  return (
    <div className="relative bg-slate-900/80 backdrop-blur-sm rounded-xl border border-slate-700/50 overflow-hidden">
      {/* macOS-style window chrome */}
      <div className="flex items-center gap-2 px-4 py-3 bg-slate-800/50 border-b border-slate-700/50">
        <div className="w-3 h-3 rounded-full bg-red-500/80" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
        <div className="w-3 h-3 rounded-full bg-green-500/80" />
        <span className="ml-2 text-xs text-slate-500">Window Title</span>
      </div>

      {/* Demo content */}
      <div className="p-6">
        {/* Interactive elements with animations */}
      </div>
    </div>
  );
}
```

### Pattern 3: Animation Integration

```tsx
// For typing effects (like terminal, code gen)
const TYPING_SPEED = 40; // ms per character
const animationRef = useRef<number | null>(null);
const charIndexRef = useRef(0);

useEffect(() => {
  if (reducedMotion) {
    // Show all content immediately
    return;
  }

  const animate = (timestamp: number) => {
    if (timestamp - lastCharTimeRef.current >= TYPING_SPEED) {
      lastCharTimeRef.current = timestamp;
      charIndexRef.current++;
      setCurrentText(text.slice(0, charIndexRef.current));

      if (charIndexRef.current < text.length) {
        animationRef.current = requestAnimationFrame(animate);
      }
    } else {
      animationRef.current = requestAnimationFrame(animate);
    }
  };

  animationRef.current = requestAnimationFrame(animate);
  return () => {
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
  };
}, [text, reducedMotion]);
```

---

## File Structure for New Pages

### For SelahReach (New Project Page)

```
/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/
  app/
    projects/
      selahreach/
        page.tsx          # Main page component (~500-600 lines)
    data/
      portfolio.ts        # Update with new project entry
    components/
      PortfolioCard.tsx   # Add visual config for selahreach
```

### For Existing Project Updates

No new files needed - modify existing:
- `/app/projects/mirror-of-dreams/page.tsx` - Complete overhaul
- `/app/projects/statviz/page.tsx` - Premium upgrade
- `/app/projects/ai-research-pipeline/page.tsx` - Polish + research-viz

### Files to Delete

```
/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/projects/wealth/page.tsx
```

---

## Dependencies to Consider

### Already Installed (Use These)

- **lucide-react** - Icons (ArrowRight, ExternalLink, Terminal, etc.)
- **next/image** - Optimized images
- **next/link** - Client-side navigation
- **Tailwind CSS** - Styling

### No Additional Dependencies Needed

The existing animation infrastructure (requestAnimationFrame, IntersectionObserver, CSS keyframes) is sufficient for all planned demos. Avoid adding:
- framer-motion (overkill for simple animations)
- Additional animation libraries
- External charting libraries (build custom visualizations)

---

## Critical Implementation Notes

### 1. Demo Content Accuracy

The current Mirror of Dreams demo shows **sleep dreams** analysis:
```typescript
// WRONG - Current content
const dreamEntry = "Last night I dreamed of flying over an endless ocean...";
const aiReflection = "Your dream of flight over water suggests a desire for freedom...";
```

Should show **life dreams** (aspirations):
```typescript
// CORRECT - New content
const dreamTitle = "Launch My Sustainable Fashion Brand";
const reflectionQuestions = [
  "What draws you to this dream?",
  "What's one step you could take today?",
  "What fears are you holding?",
  "What would success feel like?"
];
const aiCompanionResponse = "Your dream of sustainable fashion reveals a deep alignment...";
```

### 2. Next Project Links

Current Mirror of Dreams links to Wealth (being deleted):
```typescript
// WRONG
const nextProject = { href: "/projects/wealth", ... };
```

Should link to StatViz or SelahReach:
```typescript
// CORRECT
const nextProject = { href: "/projects/statviz", ... };
```

### 3. Navigation Consistency

Project pages use inline navigation. Consider using shared `<Navigation />` component:
```tsx
import { Navigation } from "@/app/components/Navigation";
import { Footer } from "@/app/components/Footer";
```

### 4. Terminal/Code Aesthetic for SelahReach

Follow 2L page patterns for terminal-style demos:
- Use `TerminalAnimation` component as reference
- Color-coded output (green for success, purple for phases, blue for commands)
- macOS window chrome with traffic lights
- Monospace font (`font-mono`)

---

## Summary of Required Changes

### Files to Modify

| File | Change Type | Estimated Lines |
|------|-------------|-----------------|
| `/app/projects/mirror-of-dreams/page.tsx` | Complete overhaul | ~600 lines |
| `/app/projects/statviz/page.tsx` | Premium upgrade | ~600 lines |
| `/app/projects/ai-research-pipeline/page.tsx` | Polish | ~100 line changes |
| `/app/data/portfolio.ts` | Update entries | ~30 lines |
| `/app/components/PortfolioCard.tsx` | Add visual config | ~10 lines |

### Files to Create

| File | Description | Estimated Lines |
|------|-------------|-----------------|
| `/app/projects/selahreach/page.tsx` | New SelahReach page | ~600 lines |

### Files to Delete

| File | Reason |
|------|--------|
| `/app/projects/wealth/page.tsx` | Replaced by SelahReach |

---

*Report generated by Master Explorer 4*
*Analysis complete: 2025-12-04*

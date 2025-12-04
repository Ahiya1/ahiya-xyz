# Explorer 1 Report: Architecture Analysis

## Executive Summary

The ahiya-xyz portfolio site is a Next.js 15 application using React 19, Tailwind CSS 4, and a custom "Sacred Potato" design system. The architecture follows a clear pattern: client components with intersection-observer animations, custom CSS utility classes, and a consistent dark theme with purple accents. New pages (/2l and /capabilities) should follow the established project page pattern, while Navigation updates require modifying a single component file.

## File Structure

### Current Structure
```
/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/
├── components/
│   ├── Footer.tsx           # Shared footer with scroll reveal
│   ├── MobileNav.tsx        # Mobile navigation (unused on homepage)
│   ├── Navigation.tsx       # Main nav - needs modification
│   ├── PortfolioCard.tsx    # Project cards with custom visuals
│   └── SectionHeading.tsx   # Reusable section header
├── data/
│   └── portfolio.ts         # Portfolio project data
├── projects/
│   ├── ai-research-pipeline/page.tsx
│   ├── mirror-of-dreams/page.tsx
│   ├── statviz/page.tsx
│   └── wealth/page.tsx
├── soul/                    # Personal/philosophical pages (separate)
├── globals.css              # Custom CSS design system
├── layout.tsx               # Root layout with fonts & metadata
└── page.tsx                 # Homepage
```

### New Files Needed
```
/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/
├── 2l/
│   └── page.tsx             # NEW: 2L methodology page
├── capabilities/
│   └── page.tsx             # NEW: Capabilities page (HTML with print styles)
```

### Files to Modify
1. `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/components/Navigation.tsx` - Add 2L and Capabilities links
2. `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/page.tsx` - B2B messaging updates (hero, CTA)
3. `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/projects/*/page.tsx` - Add "Built with 2L" badges (all 4 project pages)
4. `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/globals.css` - Add print styles for /capabilities page

## Page Patterns

### Homepage Pattern (`page.tsx`)
```typescript
"use client";

import { useEffect, useRef, useState } from "react";
import { Navigation } from "@/app/components/Navigation";
import { Footer } from "@/app/components/Footer";

// Custom hook for scroll-triggered fade-in
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  // ... intersection observer logic
  return { ref, isVisible };
}

export default function HomePage() {
  // Multiple scroll reveal hooks for different sections
  const step1 = useScrollReveal();
  // ...
  
  return (
    <main id="main-content" className="bg-[#0a0f1a] min-h-screen">
      <Navigation />
      {/* Sections with section-breathing and section-reveal classes */}
      <Footer />
    </main>
  );
}
```

### Project Page Pattern (`projects/*/page.tsx`)
```typescript
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, ChevronDown, Lock, ArrowRight } from "lucide-react";

// Local interfaces for page-specific data
interface MockupScreen { /* ... */ }
interface MetricItem { /* ... */ }
interface TechDeepDiveItem { /* ... */ }
interface NextProject { /* ... */ }

// Local MockupElement component (duplicated in each project page)
function MockupElement({ element }) { /* ... */ }

const ProjectPage: React.FC = () => {
  const [mounted, setMounted] = useState<boolean>(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Page-specific data arrays
  const mockupScreens: MockupScreen[] = [/* ... */];
  const metrics: MetricItem[] = [/* ... */];
  const techDeepDive: TechDeepDiveItem[] = [/* ... */];
  const nextProject: NextProject = { /* ... */ };
  const features = [/* ... */];
  const challenges = [/* ... */];
  const solutions = [/* ... */];
  
  // Loading state
  if (!mounted) {
    return (/* purple pulse loader */);
  }
  
  return (
    <div className="min-h-screen bg-[#0a0f1a] text-white relative overflow-hidden">
      {/* Local nav (not shared Navigation component) */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0f1a]/80 backdrop-blur-sm">
        {/* Logo + "Back to Portfolio" + CTA */}
      </nav>
      
      {/* Hero Section - min-h-screen with emoji + gradient */}
      <section className="min-h-screen flex items-center justify-center hero-gradient-bg pt-20">
        {/* Back link, emoji, title, description, CTAs, scroll indicator */}
      </section>
      
      {/* Content sections with section-reveal classes */}
      <section className="py-24 section-reveal section-reveal-1">...</section>
      <section className="py-24 section-reveal section-reveal-2">...</section>
      {/* ... more sections ... */}
      
      {/* Local footer (not shared Footer component) */}
      <footer className="py-16 border-t border-white/5">...</footer>
    </div>
  );
};

export default ProjectPage;
```

**Key Observation:** Project pages use their own nav/footer, not the shared components. This is intentional for the "portfolio item" context.

## Component Patterns

### Navigation Component
**Location:** `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/components/Navigation.tsx`

```typescript
const navItems: NavItem[] = [
  { label: "Work", href: "#portfolio" },
  { label: "Process", href: "#how-we-work" },
  { label: "Contact", href: "#contact" },
];
```

**To add new pages:** Add entries to `navItems` array:
```typescript
const navItems: NavItem[] = [
  { label: "Work", href: "#portfolio" },
  { label: "Process", href: "#how-we-work" },
  { label: "2L", href: "/2l" },           // NEW
  { label: "Capabilities", href: "/capabilities" }, // NEW
  { label: "Contact", href: "#contact" },
];
```

### Scroll Reveal Hook (Duplicated)
The `useScrollReveal` hook is duplicated across files. For new pages, copy this pattern:

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

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}
```

### SectionHeading Component
**Location:** `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/components/SectionHeading.tsx`

```typescript
<SectionHeading
  title="Selected Work"
  description="Real systems, deployed and running."
/>
```

## Styling Patterns

### Core Background & Colors
```css
/* Primary background */
bg-[#0a0f1a]                    /* Dark blue-black */

/* Text colors */
text-white                      /* Primary headings */
text-slate-300                  /* Body text */
text-slate-400                  /* Secondary text */
text-slate-500                  /* Tertiary/muted text */

/* Accent colors */
text-purple-300                 /* Highlighted text */
text-gentle                     /* Gradient text (purple to pink) */
bg-purple-500/10                /* Button backgrounds */
border-purple-400/30            /* Button borders */
```

### Typography Classes (from globals.css)
```css
.display-xl   /* Hero headings - Crimson font, clamp(2.5rem, 5vw, 4rem) */
.display-lg   /* Section headings - Crimson font, clamp(2rem, 4vw, 3rem) */
.heading-xl   /* Subsection headings - clamp(1.5rem, 3vw, 2rem) */
.heading-lg   /* Card headings - clamp(1.25rem, 2.5vw, 1.5rem) */
.body-xl      /* Large body - clamp(1.125rem, 2vw, 1.25rem) */
.body-lg      /* Regular body - clamp(1rem, 1.5vw, 1.125rem) */
.text-gentle  /* Gradient text: purple to pink */
```

### Layout Classes (from globals.css)
```css
.container-wide     /* max-width: 1200px, padding: 0 1.5rem */
.container-content  /* max-width: 800px, padding: 0 1.5rem */
.container-narrow   /* max-width: 600px, padding: 0 1.5rem */
.section-breathing  /* padding: 6rem 0 */
```

### Animation Classes (from globals.css)
```css
/* Hero animations */
.hero-word          /* Staggered word reveal */
.hero-subline       /* Fade in after hero words */
.hero-ctas          /* CTAs fade in last */
.hero-gradient-bg   /* Animated gradient background */

/* Section reveal (CSS-only) */
.section-reveal              /* Base class - opacity: 0 initially */
.section-reveal-1 through -10 /* Animation delays: 0.1s to 1.0s */

/* Utilities */
.animate-float      /* Soft floating animation (8s) */
.animate-fade-in    /* Fade in from below */
```

### Card Patterns
```css
.contemplative-card  /* Glass card with blur, subtle border, hover lift */
.breathing-glass     /* Lighter glass effect for metrics */
.gentle-button       /* Purple-tinted button with hover glow */
.cta-magnetic        /* Enhanced CTA with glow on hover */
```

### Button Patterns
```typescript
// Primary CTA (purple)
<a className="inline-flex items-center justify-center px-6 py-3 bg-purple-500/10 border border-purple-400/30 rounded-xl text-slate-200 font-medium transition-all duration-300 hover:bg-purple-500/20 hover:border-purple-400/50">

// Secondary CTA (subtle)
<a className="inline-flex items-center justify-center px-6 py-3 border border-white/10 rounded-xl text-slate-300 font-medium transition-all duration-300 hover:bg-white/5 hover:border-white/20">

// Or use .gentle-button class
<a className="gentle-button inline-flex items-center space-x-3">
```

## Implementation Recommendations

### 1. New /2l Page Structure
**File:** `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/2l/page.tsx`

Follow the project page pattern but with content-focused structure:
- Use `"use client"` directive
- Include mounted state for hydration
- Use shared Navigation component OR local nav (recommend shared for consistency)
- Structure: Hero > Philosophy > Process > Benefits > CTA
- Use `section-reveal` classes for animations
- Include `hero-gradient-bg` for hero section

Recommended sections:
```
1. Hero: "2L: Two-Loop Intelligence" with tagline
2. Philosophy: What is 2L (the dual-loop concept)
3. Process: How it works (visual diagram or steps)
4. Benefits: Why it matters (faster, better, cheaper)
5. Case Studies: Links to projects built with 2L
6. CTA: "Let's Build Together"
```

### 2. New /capabilities Page Structure
**File:** `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/capabilities/page.tsx`

Special requirements for print-friendliness:
- Add print-specific styles to globals.css
- Use semantic HTML structure
- Consider `@media print` overrides for:
  - Hide navigation
  - White background
  - Black text
  - Page breaks between sections

Recommended structure:
```
1. Header: Ahiya Butman - Full-Stack Developer
2. Services: What I build (SaaS, AI systems, etc.)
3. Tech Stack: Technologies used
4. Process: How we work together
5. Contact: Email/GitHub
```

### 3. Navigation Updates
**File:** `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/components/Navigation.tsx`

Add to navItems array:
```typescript
const navItems: NavItem[] = [
  { label: "Work", href: "#portfolio" },
  { label: "Process", href: "#how-we-work" },
  { label: "2L", href: "/2l" },
  { label: "Capabilities", href: "/capabilities" },
  { label: "Contact", href: "#contact" },
];
```

Consider: Should "2L" and "Capabilities" be external page links or anchor links? Since they're separate pages, they should use full paths (`/2l`, `/capabilities`).

### 4. Homepage B2B Messaging Updates
**File:** `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/page.tsx`

Current hero text:
```
"Intention. Clarity. Results."
"Research systems. Business tools. AI pipelines."
```

For B2B positioning, consider:
- More specific value propositions
- Client-focused language
- Emphasize speed, reliability, partnership

### 5. "Built with 2L" Badges on Project Pages
**Files to modify:**
- `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/projects/mirror-of-dreams/page.tsx`
- `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/projects/wealth/page.tsx`
- `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/projects/statviz/page.tsx`
- `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/projects/ai-research-pipeline/page.tsx`

Suggested badge placement: Near the hero section or in the tech stack area:
```typescript
<Link href="/2l" className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-400/20 text-purple-300 text-xs hover:bg-purple-500/20 transition-all">
  <span>Built with 2L</span>
</Link>
```

### 6. Print Styles for /capabilities
**File:** `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/globals.css`

Add at the end:
```css
/* Print styles for /capabilities page */
@media print {
  body::after {
    display: none; /* Hide star texture */
  }
  
  .print-hide {
    display: none !important;
  }
  
  .print-break-before {
    page-break-before: always;
  }
  
  body {
    background: white;
    color: black;
  }
  
  .contemplative-card {
    background: white;
    border: 1px solid #e2e8f0;
    box-shadow: none;
  }
}
```

## Technology Stack Reference

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 15.3.4 | React framework with App Router |
| React | 19.0.0 | UI library |
| Tailwind CSS | 4.1.10 | Utility-first CSS |
| lucide-react | 0.517.0 | Icon library |
| TypeScript | 5.x | Type safety |

## Fonts
- **Inter** (sans-serif): Body text, UI elements
- **Crimson Text** (serif): Display headings (.display-xl, .display-lg)

## Color Palette Summary
| Usage | Color | Tailwind Class |
|-------|-------|----------------|
| Background | #0a0f1a | `bg-[#0a0f1a]` |
| Primary text | white | `text-white` |
| Body text | slate-300 | `text-slate-300` |
| Muted text | slate-400/500 | `text-slate-400` |
| Accent | purple-300/400 | `text-purple-300` |
| Borders | white/10, purple/30 | `border-white/10` |

## Questions for Planner

1. Should the /2l page use the shared Navigation component or have its own local nav like project pages?
2. Should the /capabilities page be SEO-indexed or have `noindex` (since it's B2B-focused)?
3. For the "Built with 2L" badge, should it link to /2l or be a tooltip/popover?
4. Should there be a shared "2L Badge" component, or inline it in each project page?

## Risk Assessment

| Area | Risk | Mitigation |
|------|------|------------|
| Navigation overflow | Adding 2 more items may crowd mobile nav | Test mobile layout, consider dropdown |
| Print styles | May need extensive testing | Create dedicated print preview |
| Consistency | Project pages have duplicated code | Consider extracting shared components |
| SEO | New pages need proper metadata | Define metadata exports in page.tsx |

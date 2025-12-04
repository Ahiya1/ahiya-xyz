# Code Patterns & Conventions

## File Structure

```
app/
├── globals.css                          # Add section-reveal animations here
├── projects/
│   ├── ai-research-pipeline/
│   │   └── page.tsx                     # Most complex, preserve SampleNarratives
│   ├── statviz/
│   │   └── page.tsx                     # Template page (build first)
│   ├── mirror-of-dreams/
│   │   └── page.tsx                     # Standard structure
│   └── wealth/
│       └── page.tsx                     # Standard structure
```

## Naming Conventions

- **Components:** PascalCase (`StatVizPage`)
- **Files:** kebab-case (`ai-research-pipeline`)
- **CSS Classes:** kebab-case with prefix (`section-reveal`, `section-reveal-1`)
- **TypeScript Interfaces:** PascalCase (`TechDeepDiveItem`, `MetricItem`)
- **Constants:** camelCase for data arrays (`techDeepDive`, `metrics`)
- **Functions:** camelCase (`formatKey`)

---

## CSS Animation Patterns

### Section Reveal Animation (ADD TO globals.css)

**Purpose:** Staggered fade-in animation for page sections on load

**Add this CSS block to globals.css (after line 378):**

```css
/* ═══════════════════════════════════════════════════════════════════════════
   PROJECT PAGE SECTION REVEAL - CSS-only staggered animation
   ═══════════════════════════════════════════════════════════════════════════ */

.section-reveal {
  animation: fade-in-up 0.6s ease forwards;
  opacity: 0;
}

/* Staggered delays for sequential sections */
.section-reveal-1 { animation-delay: 0.1s; }
.section-reveal-2 { animation-delay: 0.2s; }
.section-reveal-3 { animation-delay: 0.3s; }
.section-reveal-4 { animation-delay: 0.4s; }
.section-reveal-5 { animation-delay: 0.5s; }
.section-reveal-6 { animation-delay: 0.6s; }
.section-reveal-7 { animation-delay: 0.7s; }
.section-reveal-8 { animation-delay: 0.8s; }
```

**Also add reduced motion support (inside existing @media block around line 462):**

```css
@media (prefers-reduced-motion: reduce) {
  /* Add to existing rules */
  .section-reveal {
    animation: none;
    opacity: 1;
  }
}
```

**Usage in components:**
```tsx
<section className="py-24 section-reveal section-reveal-1">
  {/* Section content */}
</section>

<section className="py-24 section-reveal section-reveal-2">
  {/* Next section content */}
</section>
```

---

## Icon Import Pattern

**Standard import for all project pages:**

```typescript
import { ExternalLink, ChevronDown, Github, Lock, ArrowRight } from "lucide-react";
```

**Icon sizing:**
- Navigation: `w-4 h-4`
- CTA buttons: `w-5 h-5`
- Scroll indicator: `w-6 h-6`

---

## Hero Section Pattern (Dual CTAs)

### For Pages WITH Live Site (StatViz, Wealth, Mirror of Dreams)

```tsx
{/* CTA Buttons */}
<div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
  <a
    href={liveLink}
    target="_blank"
    rel="noopener noreferrer"
    className="gentle-button inline-flex items-center space-x-3 text-lg px-8 py-4"
  >
    <ExternalLink className="w-5 h-5" aria-hidden="true" />
    <span>View Live</span>
  </a>
  <div className="inline-flex items-center space-x-3 px-6 py-3 border border-white/10 rounded-xl text-slate-500">
    <Lock className="w-5 h-5" aria-hidden="true" />
    <span>Private Repository</span>
  </div>
</div>
```

### For Pages WITHOUT Live Site (AI Research Pipeline)

```tsx
{/* CTA Buttons */}
<div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
  <a
    href="mailto:ahiya.butman@gmail.com"
    className="gentle-button inline-flex items-center space-x-3 text-lg px-8 py-4"
  >
    <span>Contact for Access</span>
  </a>
  <div className="inline-flex items-center space-x-3 px-6 py-3 border border-white/10 rounded-xl text-slate-500">
    <Lock className="w-5 h-5" aria-hidden="true" />
    <span>Private Repository</span>
  </div>
</div>
```

---

## Visual Mockup Section Pattern

### Data Structure

```typescript
interface MockupScreen {
  title: string;
  description: string;
  elements: {
    type: 'header' | 'card' | 'list' | 'button' | 'input' | 'chart' | 'table';
    label: string;
    accent?: boolean;
  }[];
}

const mockupScreens: MockupScreen[] = [
  {
    title: "Dashboard View",
    description: "Main interface for data overview",
    elements: [
      { type: 'header', label: 'Dashboard' },
      { type: 'card', label: 'Total Balance', accent: true },
      { type: 'chart', label: 'Monthly Trend' },
      { type: 'list', label: 'Recent Transactions' },
    ]
  },
  // Add more screens as needed
];
```

### Component Pattern

```tsx
{/* Visual Mockup Section */}
<section className="py-24 section-reveal section-reveal-2">
  <div className="container-content">
    <h2 className="heading-xl text-center mb-4">See It In Action</h2>
    <p className="text-center text-slate-400 mb-12">
      A glimpse into the interface
    </p>

    <div className="grid md:grid-cols-2 gap-6">
      {mockupScreens.map((screen, index) => (
        <div key={index} className="contemplative-card p-6 overflow-hidden">
          {/* Mockup Header */}
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-400/60" />
              <div className="w-3 h-3 rounded-full bg-green-400/60" />
            </div>
            <span className="text-xs text-slate-500 ml-2">{screen.title}</span>
          </div>

          {/* Mockup Content */}
          <div className="space-y-3">
            {screen.elements.map((element, idx) => (
              <MockupElement key={idx} element={element} />
            ))}
          </div>

          {/* Caption */}
          <p className="mt-4 pt-3 border-t border-white/5 text-sm text-slate-500">
            {screen.description}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>
```

### Mockup Element Renderer

```tsx
function MockupElement({ element }: { element: MockupScreen['elements'][0] }) {
  switch (element.type) {
    case 'header':
      return (
        <div className="h-8 bg-white/[0.08] rounded-lg flex items-center px-3">
          <span className="text-xs text-slate-400">{element.label}</span>
        </div>
      );
    case 'card':
      return (
        <div className={`p-3 rounded-lg ${element.accent ? 'bg-purple-500/10 border border-purple-400/20' : 'bg-white/[0.04]'}`}>
          <div className="text-xs text-slate-500 mb-1">{element.label}</div>
          <div className={`text-lg font-semibold ${element.accent ? 'text-purple-300' : 'text-slate-300'}`}>
            ---
          </div>
        </div>
      );
    case 'list':
      return (
        <div className="space-y-2">
          <div className="text-xs text-slate-500">{element.label}</div>
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-6 bg-white/[0.04] rounded" />
          ))}
        </div>
      );
    case 'button':
      return (
        <div className="h-8 bg-purple-500/20 rounded-lg flex items-center justify-center px-3">
          <span className="text-xs text-purple-300">{element.label}</span>
        </div>
      );
    case 'input':
      return (
        <div className="h-8 bg-white/[0.04] rounded-lg border border-white/10 flex items-center px-3">
          <span className="text-xs text-slate-500">{element.label}</span>
        </div>
      );
    case 'chart':
      return (
        <div className="h-24 bg-white/[0.04] rounded-lg flex items-end justify-center gap-1 p-3">
          {[40, 65, 45, 80, 55, 70, 60].map((h, i) => (
            <div
              key={i}
              className="w-4 bg-purple-400/40 rounded-t"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      );
    case 'table':
      return (
        <div className="space-y-1">
          <div className="text-xs text-slate-500 mb-2">{element.label}</div>
          <div className="grid grid-cols-3 gap-1">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-5 bg-white/[0.04] rounded" />
            ))}
          </div>
        </div>
      );
    default:
      return null;
  }
}
```

---

## Metrics Section Pattern

### Data Structure

```typescript
interface MetricItem {
  value: string;
  label: string;
}

const metrics: MetricItem[] = [
  { value: "10K+", label: "Responses Generated" },
  { value: "5+", label: "Demographic Variables" },
  { value: "2", label: "Languages Supported" },
  { value: "100%", label: "Academically Valid" },
];
```

### Component Pattern

```tsx
{/* Metrics Section */}
<section className="py-24 section-reveal section-reveal-6">
  <div className="container-content">
    <h2 className="heading-xl text-center mb-12">Impact</h2>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {metrics.map((metric, index) => (
        <div key={index} className="breathing-glass p-6 text-center">
          <div className="text-3xl md:text-4xl font-bold text-gentle mb-2">
            {metric.value}
          </div>
          <div className="text-slate-400 text-sm">
            {metric.label}
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
```

**Note:** The `.text-gentle` class applies the gradient text effect (already in globals.css).

---

## Tech Deep-Dive Section Pattern

### Data Structure

```typescript
interface TechDeepDiveItem {
  name: string;
  why: string;
}

const techDeepDive: TechDeepDiveItem[] = [
  {
    name: "Next.js 15",
    why: "Server components for speed. App router for clean architecture."
  },
  {
    name: "TypeScript",
    why: "End-to-end type safety. Fewer bugs, faster development."
  },
  {
    name: "Prisma + PostgreSQL",
    why: "Type-safe database access. Reliable, scalable data layer."
  },
  {
    name: "JWT Authentication",
    why: "Secure, stateless authentication. No session management overhead."
  },
];
```

### Component Pattern

```tsx
{/* Tech Deep-Dive Section */}
<section className="py-24 section-reveal section-reveal-5">
  <div className="container-content">
    <h2 className="heading-xl text-center mb-12">Built With</h2>

    <div className="grid md:grid-cols-2 gap-6">
      {techDeepDive.map((tech, index) => (
        <div key={index} className="contemplative-card p-6">
          <h3 className="heading-lg text-purple-300 mb-2">{tech.name}</h3>
          <p className="text-slate-400">{tech.why}</p>
        </div>
      ))}
    </div>
  </div>
</section>
```

---

## Next Project Preview Card Pattern

### Data Structure

```typescript
interface NextProject {
  href: string;
  emoji: string;
  title: string;
  subtitle: string;
}

const nextProject: NextProject = {
  href: "/projects/statviz",
  emoji: "\u{1F4CA}",
  title: "StatViz",
  subtitle: "Statistical Analysis, Visualized"
};
```

### Component Pattern

```tsx
{/* Next Project Section */}
<section className="py-24 section-reveal section-reveal-7">
  <div className="container-content">
    <p className="text-slate-500 text-sm text-center mb-4">Continue Exploring</p>

    <Link href={nextProject.href} className="group block max-w-md mx-auto">
      <div className="contemplative-card p-6 flex items-center gap-4 group-hover:border-purple-400/20 transition-all">
        <div className="text-4xl">{nextProject.emoji}</div>
        <div className="flex-1">
          <h3 className="heading-lg text-white group-hover:text-purple-300 transition-colors">
            {nextProject.title}
          </h3>
          <p className="text-slate-400 text-sm">{nextProject.subtitle}</p>
        </div>
        <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-purple-300 group-hover:translate-x-1 transition-all" />
      </div>
    </Link>
  </div>
</section>
```

---

## Complete Page Structure Template

Use this as the base structure for all project pages:

```tsx
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, ChevronDown, Github, Lock, ArrowRight } from "lucide-react";

// TypeScript interfaces
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

const ProjectPage: React.FC = () => {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Page-specific data
  const liveLink = "https://example.com";

  const mockupScreens: MockupScreen[] = [/* ... */];
  const features = [/* existing features array */];
  const challenges = [/* existing challenges array */];
  const solutions = [/* existing solutions array */];
  const techDeepDive: TechDeepDiveItem[] = [/* ... */];
  const metrics: MetricItem[] = [/* ... */];
  const nextProject: NextProject = {/* ... */};

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#0a0f1a] flex items-center justify-center">
        <div className="w-4 h-4 bg-purple-400 rounded-full animate-pulse" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0f1a] text-white relative overflow-hidden">
      {/* Navigation */}
      {/* Hero with Dual CTAs */}
      {/* Visual Mockup Section - section-reveal-1 */}
      {/* Challenge Section - section-reveal-2 */}
      {/* Solution Section - section-reveal-3 */}
      {/* Features Section - section-reveal-4 */}
      {/* Tech Deep-Dive Section - section-reveal-5 */}
      {/* Metrics Section - section-reveal-6 */}
      {/* Next Project Section - section-reveal-7 */}
      {/* CTA Section - section-reveal-8 */}
      {/* Footer */}
    </div>
  );
};

export default ProjectPage;
```

---

## Removing useScrollReveal Hook

**Current (REMOVE):**
```typescript
// Placeholder hook - sections are always visible
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  return { ref };
}
```

**After (DELETE ENTIRELY):**
- Remove the `useScrollReveal` function definition
- Remove all `const xxxReveal = useScrollReveal()` calls
- Remove `ref={xxxReveal.ref}` from sections
- Remove `useRef` from imports if no longer needed
- Add `section-reveal section-reveal-N` classes to sections instead

---

## Import Order Convention

```typescript
// 1. React and hooks
import React, { useState, useEffect } from "react";

// 2. Next.js
import Image from "next/image";
import Link from "next/link";

// 3. Third-party libraries
import { ExternalLink, ChevronDown, Github, Lock, ArrowRight } from "lucide-react";

// 4. Local components (if any)
// import { CustomComponent } from "@/components/CustomComponent";

// 5. Types/interfaces (inline in this iteration)
```

---

## Responsive Considerations

**Mobile breakpoints:**
- Default: Single column, smaller text
- `md:` (768px+): Two columns for grids
- `lg:` (1024px+): Used sparingly

**Pattern examples:**
```tsx
// Grid that collapses on mobile
<div className="grid md:grid-cols-2 gap-6">

// Metrics grid (4 cols on desktop, 2 on mobile)
<div className="grid grid-cols-2 md:grid-cols-4 gap-6">

// Hero CTAs (stack on mobile, row on desktop)
<div className="flex flex-col sm:flex-row gap-4 justify-center">

// Text sizing
<div className="text-3xl md:text-4xl font-bold">
```

---

## Accessibility Patterns

```tsx
// Icon accessibility
<ExternalLink className="w-5 h-5" aria-hidden="true" />
<span>View Live</span>

// Skip navigation (already in nav)
<Link href="/#portfolio">Back to Portfolio</Link>

// Semantic sections
<section className="py-24">
  <div className="container-content">
    <h2 className="heading-xl">Section Title</h2>
    {/* content */}
  </div>
</section>

// External link attributes
<a
  href={liveLink}
  target="_blank"
  rel="noopener noreferrer"
>
```

---

*Patterns document finalized: 2025-12-04*
*Reference this file for all builder implementations*

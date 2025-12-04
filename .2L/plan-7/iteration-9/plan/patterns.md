# Code Patterns & Conventions

## File Structure

```
/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/
├── components/
│   ├── Footer.tsx           # Shared footer
│   ├── MobileNav.tsx        # Mobile navigation
│   ├── Navigation.tsx       # Main nav - MODIFY
│   ├── PortfolioCard.tsx    # Project cards
│   └── SectionHeading.tsx   # Section headers
├── data/
│   └── portfolio.ts         # Portfolio data
├── projects/
│   ├── ai-research-pipeline/page.tsx  # MODIFY - add badge
│   ├── mirror-of-dreams/page.tsx      # MODIFY - add badge
│   ├── statviz/page.tsx               # MODIFY - add badge
│   └── wealth/page.tsx                # MODIFY - add badge
├── 2l/
│   └── page.tsx             # NEW - 2L methodology page
├── capabilities/
│   └── page.tsx             # NEW - Capabilities page
├── globals.css              # MODIFY - add print styles
├── layout.tsx               # Root layout (no changes)
└── page.tsx                 # Homepage - MODIFY
```

## Naming Conventions

- **Components:** PascalCase (`Navigation.tsx`, `SectionHeading.tsx`)
- **Pages:** lowercase directory with `page.tsx` (`/2l/page.tsx`)
- **Files:** camelCase for utilities (`formatDate.ts`)
- **CSS classes:** kebab-case (`.section-reveal`, `.hero-gradient-bg`)
- **Functions:** camelCase (`useScrollReveal()`)
- **Constants:** SCREAMING_SNAKE_CASE for true constants, camelCase for config objects

## Page Pattern (for /2l and /capabilities)

**Full working example:**

```typescript
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Navigation } from "@/app/components/Navigation";
import { Footer } from "@/app/components/Footer";
import { IconName } from "lucide-react";

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

      {/* Hero Section */}
      <section className="section-breathing pt-32 hero-gradient-bg">
        <div className="container-content text-center">
          <h1 className="display-xl text-white mb-6">
            <span className="hero-word" style={{ animationDelay: '0.1s' }}>
              <span className="text-gentle">Word One.</span>
            </span>
          </h1>
          <p className="body-xl text-slate-300 max-w-2xl mx-auto mb-10 hero-subline" style={{ animationDelay: '0.4s' }}>
            Subheadline text here.
          </p>
        </div>
      </section>

      {/* Content Sections */}
      <section className="section-breathing section-reveal section-reveal-1">
        <div className="container-wide">
          {/* Section content */}
        </div>
      </section>

      <Footer />
    </main>
  );
}
```

## Navigation Update Pattern

**Current navItems array:**
```typescript
const navItems: NavItem[] = [
  { label: "Work", href: "#portfolio" },
  { label: "Process", href: "#how-we-work" },
  { label: "Contact", href: "#contact" },
];
```

**Updated navItems array:**
```typescript
const navItems: NavItem[] = [
  { label: "Work", href: "#portfolio" },
  { label: "Process", href: "#how-we-work" },
  { label: "2L", href: "/2l" },
  { label: "Capabilities", href: "/capabilities" },
  { label: "Contact", href: "#contact" },
];
```

**Note:** External page links use full paths (`/2l`), anchor links use hashes (`#portfolio`).

## "Built with 2L" Badge Pattern

**Badge component (inline in each project page):**

```typescript
<Link
  href="/2l"
  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-400/20 text-purple-300 text-xs font-medium hover:bg-purple-500/20 hover:border-purple-400/30 transition-all duration-300"
>
  <span>Built with 2L</span>
</Link>
```

**Placement:** In the hero section, after the title/description, before or alongside the CTA buttons. Example location in project page hero:

```typescript
{/* Hero Section */}
<section className="min-h-screen flex items-center justify-center hero-gradient-bg pt-20">
  <div className="container-content text-center">
    {/* Back link */}
    <Link href="/#portfolio" className="...">
      Back to Portfolio
    </Link>

    {/* Emoji */}
    <div className="text-6xl mb-6">...</div>

    {/* Title */}
    <h1 className="display-xl text-white mb-4">Project Title</h1>

    {/* Badge - INSERT HERE */}
    <div className="mb-6">
      <Link
        href="/2l"
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-400/20 text-purple-300 text-xs font-medium hover:bg-purple-500/20 hover:border-purple-400/30 transition-all duration-300"
      >
        <span>Built with 2L</span>
      </Link>
    </div>

    {/* Description */}
    <p className="body-xl text-slate-300 mb-8">...</p>

    {/* CTAs */}
    <div className="flex gap-4">...</div>
  </div>
</section>
```

## CTA Strip Pattern (Homepage)

**Insert after hero section, before portfolio section:**

```typescript
{/* CTA Strip */}
<section className="py-8 border-b border-white/5 section-reveal section-reveal-1">
  <div className="container-wide">
    <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
      {/* Primary CTA */}
      <a
        href="#portfolio"
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-purple-500/10 border border-purple-400/30 rounded-xl text-slate-200 font-medium transition-all duration-300 hover:bg-purple-500/20 hover:border-purple-400/50"
      >
        <Grid className="w-4 h-4" />
        See the Work
      </a>

      {/* Secondary CTAs */}
      <Link
        href="/2l"
        className="inline-flex items-center gap-2 px-5 py-2.5 border border-white/10 rounded-xl text-slate-300 font-medium transition-all duration-300 hover:bg-white/5 hover:border-white/20"
      >
        <Workflow className="w-4 h-4" />
        How I Build
      </Link>

      <Link
        href="/capabilities"
        className="inline-flex items-center gap-2 px-5 py-2.5 border border-white/10 rounded-xl text-slate-300 font-medium transition-all duration-300 hover:bg-white/5 hover:border-white/20"
      >
        <FileText className="w-4 h-4" />
        Capabilities
      </Link>

      <a
        href="#contact"
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-purple-500/10 border border-purple-400/30 rounded-xl text-slate-200 font-medium transition-all duration-300 hover:bg-purple-500/20 hover:border-purple-400/50"
      >
        <Mail className="w-4 h-4" />
        Get in Touch
      </a>
    </div>
  </div>
</section>
```

## Section Heading Pattern

**Using the SectionHeading component:**

```typescript
import { SectionHeading } from "@/app/components/SectionHeading";

<SectionHeading
  title="Section Title"
  description="Optional description text explaining the section."
/>
```

**Custom section heading (when more control needed):**

```typescript
<div className="text-center mb-12">
  <h2 className="display-lg text-white mb-4">Section Title</h2>
  <p className="body-lg text-slate-400 max-w-2xl mx-auto">
    Description text here.
  </p>
</div>
```

## Card Grid Pattern

**For displaying items in a grid (agents, benefits, etc.):**

```typescript
<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {items.map((item, index) => (
    <div
      key={item.name}
      className="contemplative-card p-6"
    >
      <div className="text-3xl mb-4">{item.icon}</div>
      <h3 className="heading-lg text-white mb-2">{item.title}</h3>
      <p className="text-slate-400">{item.description}</p>
    </div>
  ))}
</div>
```

## Pipeline Diagram Pattern (for 2L page)

**Horizontal pipeline with 7 phases:**

```typescript
{/* Pipeline Phases */}
<div className="relative">
  {/* Connection line */}
  <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-purple-500/20 -translate-y-1/2" />

  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
    {phases.map((phase, index) => (
      <div
        key={phase.name}
        className="relative flex flex-col items-center text-center"
      >
        {/* Circle with icon */}
        <div className="w-14 h-14 rounded-full bg-purple-500/10 border border-purple-400/30 flex items-center justify-center mb-3 relative z-10 bg-[#0a0f1a]">
          <phase.icon className="w-6 h-6 text-purple-300" />
        </div>
        <h3 className="text-sm font-medium text-white mb-1">{phase.name}</h3>
        <p className="text-xs text-slate-500">{phase.description}</p>
      </div>
    ))}
  </div>
</div>
```

## Accordion/Expandable Pattern (for 2L technical section)

```typescript
const [openItem, setOpenItem] = useState<string | null>(null);

{technicalItems.map((item) => (
  <div key={item.name} className="border-b border-white/5">
    <button
      onClick={() => setOpenItem(openItem === item.name ? null : item.name)}
      className="w-full flex items-center justify-between py-4 text-left"
    >
      <span className="text-white font-medium">{item.name}</span>
      <ChevronDown
        className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${
          openItem === item.name ? 'rotate-180' : ''
        }`}
      />
    </button>
    {openItem === item.name && (
      <div className="pb-4 text-slate-400">
        {item.content}
      </div>
    )}
  </div>
))}
```

## Print Styles Pattern

**Add to globals.css:**

```css
/* ═══════════════════════════════════════════════════════════════════════════
   PRINT STYLES - For capabilities page
   ═══════════════════════════════════════════════════════════════════════════ */

@media print {
  /* Hide decorative elements */
  body::after {
    display: none;
  }

  /* Utility classes for print control */
  .print-hide {
    display: none !important;
  }

  .print-only {
    display: block !important;
  }

  .print-break-before {
    page-break-before: always;
  }

  .print-break-after {
    page-break-after: always;
  }

  .print-avoid-break {
    break-inside: avoid;
  }

  /* Reset background and colors */
  body {
    background: white !important;
    color: black !important;
  }

  main {
    background: white !important;
  }

  /* Reset card styles */
  .contemplative-card {
    background: white !important;
    border: 1px solid #e2e8f0 !important;
    box-shadow: none !important;
    backdrop-filter: none !important;
  }

  /* Text color overrides */
  .text-white {
    color: #1e293b !important;
  }

  .text-slate-200,
  .text-slate-300 {
    color: #334155 !important;
  }

  .text-slate-400,
  .text-slate-500 {
    color: #64748b !important;
  }

  /* Reset gradient text for print */
  .text-gentle {
    background: none !important;
    -webkit-background-clip: initial !important;
    -webkit-text-fill-color: #7c3aed !important;
    background-clip: initial !important;
    color: #7c3aed !important;
  }

  /* Hide navigation and footer for print */
  nav,
  footer {
    display: none !important;
  }

  /* Reset hero gradient */
  .hero-gradient-bg::before {
    display: none;
  }

  /* Ensure links are visible */
  a {
    color: #7c3aed !important;
    text-decoration: underline;
  }
}
```

## Button Patterns

**Primary CTA (purple accent):**
```typescript
<a className="inline-flex items-center justify-center px-6 py-3 bg-purple-500/10 border border-purple-400/30 rounded-xl text-slate-200 font-medium transition-all duration-300 hover:bg-purple-500/20 hover:border-purple-400/50">
  Button Text
</a>
```

**Secondary CTA (subtle outline):**
```typescript
<a className="inline-flex items-center justify-center px-6 py-3 border border-white/10 rounded-xl text-slate-300 font-medium transition-all duration-300 hover:bg-white/5 hover:border-white/20">
  Button Text
</a>
```

**Magnetic CTA (for emphasis):**
```typescript
<a className="cta-magnetic inline-flex items-center justify-center px-6 py-3 bg-purple-500/10 border border-purple-400/30 rounded-xl text-slate-200 font-medium">
  Button Text
</a>
```

## Import Order Convention

```typescript
// 1. React/Next.js
"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

// 2. External libraries
import { IconName, AnotherIcon } from "lucide-react";

// 3. Internal components
import { Navigation } from "@/app/components/Navigation";
import { Footer } from "@/app/components/Footer";
import { SectionHeading } from "@/app/components/SectionHeading";

// 4. Internal data/utilities
import { portfolioProjects } from "@/app/data/portfolio";

// 5. Types (if separate)
interface LocalType { /* ... */ }
```

## Typography Classes Reference

| Class | Font | Size | Use Case |
|-------|------|------|----------|
| `.display-xl` | Crimson | clamp(2.5rem, 5vw, 4rem) | Hero headings |
| `.display-lg` | Crimson | clamp(2rem, 4vw, 3rem) | Section headings |
| `.heading-xl` | Inter | clamp(1.5rem, 3vw, 2rem) | Subsection headings |
| `.heading-lg` | Inter | clamp(1.25rem, 2.5vw, 1.5rem) | Card headings |
| `.body-xl` | Inter | clamp(1.125rem, 2vw, 1.25rem) | Large body text |
| `.body-lg` | Inter | clamp(1rem, 1.5vw, 1.125rem) | Regular body text |
| `.text-gentle` | - | - | Gradient text (purple to pink) |

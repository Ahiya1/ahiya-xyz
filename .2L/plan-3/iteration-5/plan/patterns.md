# Code Patterns & Conventions

## File Structure

```
app/
├── page.tsx                          # Homepage (Builder 1)
├── globals.css                       # CSS patterns (reference only)
├── components/
│   ├── Navigation.tsx                # Nav bar (Builder 1)
│   ├── Footer.tsx                    # Footer (Builder 1)
│   ├── PortfolioCard.tsx             # Keep unchanged
│   └── SectionHeading.tsx            # Keep unchanged
├── projects/
│   ├── statviz/page.tsx              # Builder 2
│   ├── mirror-of-dreams/page.tsx     # Builder 2
│   └── wealth/page.tsx               # Builder 2
└── data/
    └── portfolio.ts                  # Keep unchanged
```

---

## CSS Class Reference

### Layout Classes

| Class | Purpose | Max Width |
|-------|---------|-----------|
| `container-wide` | Portfolio grid, navigation | 1200px |
| `container-content` | Most sections | 800px |
| `container-narrow` | CTA, testimonials | 600px |
| `section-breathing` | Section padding | 6rem (4rem mobile) |
| `spacing-generous` | Bottom margin | 4rem |
| `spacing-comfortable` | Bottom margin | 3rem |

### Card Classes

| Class | Purpose | Use Case |
|-------|---------|----------|
| `breathing-glass` | Light glass effect | Service cards, badges, About pillars |
| `contemplative-card` | Heavier glass | CTA section, testimonial, project features |

### Typography Classes

| Class | Use Case | Font |
|-------|----------|------|
| `display-xl` | Hero headline | Crimson (serif) |
| `display-lg` | Section headings | Crimson (serif) |
| `heading-xl` | Card headings (large) | Sans-serif |
| `heading-lg` | Card headings (medium) | Sans-serif |
| `body-xl` | Lead paragraphs | Sans-serif |
| `body-lg` | Body text | Sans-serif |
| `text-gentle` | Purple gradient text | N/A (color only) |

### Color Palette

| Element | Class |
|---------|-------|
| Primary text | `text-white` |
| Secondary text | `text-slate-300` |
| Tertiary text | `text-slate-400` |
| Muted text | `text-slate-500` |
| Accent | `text-purple-400`, `text-purple-300` |
| Accent background | `bg-purple-500/10` |
| Border light | `border-white/10` |
| Border accent | `border-purple-400/30` |

---

## Homepage Patterns (Builder 1)

### Section Structure Pattern

Every section follows this structure:

```tsx
{/* Section Name */}
<section id="section-id" className="section-breathing">
  <div className="container-content"> {/* or container-wide, container-narrow */}
    <h2 className="display-lg text-white text-center mb-X">Title</h2>
    {/* Section content */}
  </div>
</section>
```

### Hero Section Pattern

```tsx
{/* Hero Section */}
<section className="section-breathing pt-32">
  <div className="container-content text-center">
    {/* Headline */}
    <h1 className="display-xl text-white mb-6">
      I build systems with <span className="text-gentle">clarity</span>, <span className="text-gentle">intention</span>, and the speed of good engineering.
    </h1>

    {/* Subheadline */}
    <p className="body-xl text-slate-300 max-w-2xl mx-auto mb-10">
      A boutique studio delivering complete SaaS systems, AI research tools, and automated workflows — designed, built, and deployed end-to-end with precision and intention.
    </p>

    {/* CTAs */}
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
      <a
        href="#portfolio"
        className="inline-flex items-center justify-center px-6 py-3 bg-purple-500/10 border border-purple-400/30 rounded-xl text-slate-200 font-medium transition-all duration-300 hover:bg-purple-500/20 hover:border-purple-400/50"
      >
        See My Work
      </a>
      <a
        href="#contact"
        className="inline-flex items-center justify-center px-6 py-3 border border-white/10 rounded-xl text-slate-300 font-medium transition-all duration-300 hover:bg-white/5 hover:border-white/20"
      >
        Contact Me
      </a>
    </div>
  </div>
</section>
```

### About Section Pattern (NEW)

```tsx
{/* About Section */}
<section id="about" className="section-breathing">
  <div className="container-content">
    <h2 className="display-lg text-white text-center mb-6">About Me</h2>

    <div className="max-w-2xl mx-auto text-center mb-12">
      <p className="body-xl text-slate-300 mb-4">
        I'm Ahiya, a systems architect and full-stack engineer.
      </p>
      <p className="body-lg text-slate-400">
        I build complete software systems — architecture, backend, frontend, AI tooling, automation, UX, and deployment. Every system is designed with clarity, built with intention, and delivered with clean, scalable engineering.
      </p>
    </div>

    {/* Four Pillars */}
    <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto mb-12">
      <div className="breathing-glass p-6 rounded-2xl text-center">
        <h3 className="heading-lg text-white mb-2">Architecture</h3>
        <p className="text-slate-400">Clear data models, services, structure</p>
      </div>
      <div className="breathing-glass p-6 rounded-2xl text-center">
        <h3 className="heading-lg text-white mb-2">Speed</h3>
        <p className="text-slate-400">Rapid development without sacrificing quality</p>
      </div>
      <div className="breathing-glass p-6 rounded-2xl text-center">
        <h3 className="heading-lg text-white mb-2">Intention</h3>
        <p className="text-slate-400">Thoughtful design, grounded decision-making</p>
      </div>
      <div className="breathing-glass p-6 rounded-2xl text-center">
        <h3 className="heading-lg text-white mb-2">Intelligence</h3>
        <p className="text-slate-400">Modern AI pipelines where they matter</p>
      </div>
    </div>

    <p className="body-lg text-slate-400 text-center italic">
      I work alone, but I build like a studio: fast, reliable, well-structured, and aesthetically clean.
    </p>
  </div>
</section>
```

### Services Card Pattern

```tsx
<div className="breathing-glass p-6 rounded-2xl">
  <IconComponent className="w-8 h-8 text-purple-400 mb-4" aria-hidden="true" />
  <h3 className="heading-lg text-white mb-2">Service Title</h3>
  <p className="text-slate-400">Service description text.</p>
</div>
```

### How I Work Phase Card Pattern

```tsx
<div className="breathing-glass p-6 rounded-2xl text-center">
  <div className="text-purple-400 text-sm font-medium mb-2">Phase N</div>
  <h3 className="heading-lg text-white mb-3">Phase Name</h3>
  <p className="text-slate-400 text-sm">Description of this phase.</p>
  <p className="text-slate-500 text-xs mt-3 italic">Outcome: the result</p>
</div>
```

### Testimonials Section Pattern (NEW)

```tsx
{/* Testimonials Section */}
<section id="testimonials" className="section-breathing">
  <div className="container-narrow">
    <h2 className="display-lg text-white text-center mb-8">Trusted by Researchers and Professionals</h2>

    <div className="contemplative-card p-8 md:p-12 text-center">
      {/* Stars */}
      <div className="flex justify-center gap-1 mb-6">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
        ))}
      </div>

      {/* Quote */}
      <blockquote className="body-xl text-slate-300 italic mb-6">
        "Ahiya is an excellent statistician. He delivered precise results quickly and clearly."
      </blockquote>

      {/* Attribution */}
      <p className="text-slate-400">
        — <span className="text-white font-medium">Michal Schriber</span>, Head of Department, Herzog College
      </p>
    </div>

    {/* Trust Line */}
    <p className="text-center text-slate-500 text-sm mt-6">
      Trusted by academic researchers across multiple institutions.
    </p>
  </div>
</section>
```

### Button Patterns

**Primary Button (Purple):**
```tsx
<a
  href="#target"
  className="inline-flex items-center justify-center px-6 py-3 bg-purple-500/10 border border-purple-400/30 rounded-xl text-slate-200 font-medium transition-all duration-300 hover:bg-purple-500/20 hover:border-purple-400/50"
>
  Button Text
</a>
```

**Secondary Button (White Border):**
```tsx
<a
  href="#target"
  className="inline-flex items-center justify-center px-6 py-3 border border-white/10 rounded-xl text-slate-300 font-medium transition-all duration-300 hover:bg-white/5 hover:border-white/20"
>
  Button Text
</a>
```

---

## Project Page Patterns (Builder 2)

### Challenge/Solution Data Arrays

Add after existing `techStack` array, before the component return:

```tsx
const challenges = [
  "Challenge point 1",
  "Challenge point 2",
  "Challenge point 3",
  "Challenge point 4",
];

const solutions = [
  "Solution point 1",
  "Solution point 2",
  "Solution point 3",
  "Solution point 4",
  "Solution point 5",
];
```

### Challenge Section Pattern

Insert after Hero section, before Features section:

```tsx
{/* The Challenge Section */}
<section className="section-breathing">
  <div className="container-content">
    <h2 className="heading-xl text-center spacing-generous">
      The Challenge
    </h2>
    <div className="contemplative-card p-6 md:p-8">
      <p className="body-lg text-slate-300 mb-6">
        {/* PROJECT-SPECIFIC INTRO TEXT */}
      </p>
      <ul className="space-y-4">
        {challenges.map((challenge, index) => (
          <li key={index} className="flex items-start space-x-3">
            <div className="w-2 h-2 rounded-full bg-red-400/60 mt-2 flex-shrink-0" />
            <span className="text-slate-300">{challenge}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
</section>
```

### Solution Section Pattern

Insert after Challenge section, before Features section:

```tsx
{/* The Solution Section */}
<section className="section-breathing">
  <div className="container-content">
    <h2 className="heading-xl text-center spacing-generous">
      The Solution
    </h2>
    <div className="contemplative-card p-6 md:p-8">
      <p className="body-lg text-slate-300 mb-6">
        {/* PROJECT-SPECIFIC INTRO TEXT */}
      </p>
      <ul className="space-y-4">
        {solutions.map((solution, index) => (
          <li key={index} className="flex items-start space-x-3">
            <div className="w-2 h-2 rounded-full bg-emerald-400/60 mt-2 flex-shrink-0" />
            <span className="text-slate-300">{solution}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
</section>
```

### Key Visual Elements

- **Challenge dots:** `bg-red-400/60` (red, semi-transparent)
- **Solution dots:** `bg-emerald-400/60` (green, semi-transparent)
- **Dot size:** `w-2 h-2 rounded-full`
- **Dot alignment:** `mt-2 flex-shrink-0` (aligns with text baseline)

---

## Navigation Pattern

### NavItems Array

```tsx
const navItems: NavItem[] = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Contact", href: "#contact" },
];
```

**Note:** Remove Soul link from both desktop and mobile navigation.

---

## Footer Pattern

```tsx
export function Footer() {
  return (
    <footer className="py-16 border-t border-white/5">
      <div className="container-content">
        {/* Centered Logo */}
        <div className="flex justify-center mb-8">
          <Image
            src="/logo-symbol.png"
            alt="Ahiya"
            width={40}
            height={40}
            className="opacity-40"
          />
        </div>

        {/* Attribution */}
        <p className="text-center text-slate-500 text-sm mb-2">
          Made with intention by <span className="text-gentle">Ahiya</span>
        </p>

        {/* Tagline and Year */}
        <p className="text-center text-slate-500 text-xs">
          2025 · Building systems that work
        </p>
      </div>
    </footer>
  );
}
```

**Note:** Remove Soul link section, Sparkles import no longer needed.

---

## Import Conventions

### Homepage Imports (after changes)

```tsx
"use client";

import { ArrowRight, Mail, Github, Code, Database, FlaskConical, Layers, Star } from "lucide-react";
import { Navigation } from "@/app/components/Navigation";
import { Footer } from "@/app/components/Footer";
import { PortfolioCard } from "@/app/components/PortfolioCard";
import { SectionHeading } from "@/app/components/SectionHeading";
import { portfolioProjects } from "@/app/data/portfolio";
```

### Footer Imports (after changes)

```tsx
"use client";

import React from "react";
import Image from "next/image";
// Remove: import Link from "next/link";
// Remove: import { Sparkles } from "lucide-react";
```

### Navigation Imports (unchanged)

```tsx
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
// Remove: import { Sparkles } from "lucide-react";
```

---

## Accessibility Patterns

### Icon Accessibility

```tsx
<IconName className="w-5 h-5" aria-hidden="true" />
```

### External Link Pattern

```tsx
<a
  href="https://example.com"
  target="_blank"
  rel="noopener noreferrer"
  className="..."
>
  <span>Link Text</span>
  <span className="sr-only">(opens in new tab)</span>
</a>
```

---

## Testing Checklist

After implementation, verify:

1. [ ] Hero displays new headline with purple gradient on "clarity" and "intention"
2. [ ] About section shows 4 pillar cards in 2x2 grid
3. [ ] Services section shows 4 cards with new titles and icons
4. [ ] How I Work shows 3 phases in horizontal layout (stacks on mobile)
5. [ ] Portfolio section title is "Selected Work"
6. [ ] Testimonials section shows 5 stars and quote
7. [ ] Contact section has new title and body text
8. [ ] Footer shows new text, no Soul link
9. [ ] Navigation includes About, no Soul link
10. [ ] All 3 project pages have Challenge and Solution sections

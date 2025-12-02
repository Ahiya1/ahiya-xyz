# Explorer 1 Report: Architecture & Component Analysis

## Executive Summary

This analysis documents the exact changes needed to add project detail pages to the ahiya.xyz portfolio. The scope involves modifying the `PortfolioProject` interface, updating portfolio data with fixed URLs and new `detailUrl` fields, changing `PortfolioCard` click behavior to navigate to detail pages, and creating 4 new project pages following the existing blueprint page patterns.

## Key Files to Modify

### 1. app/components/PortfolioCard.tsx

**Location:** `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/components/PortfolioCard.tsx`

**Current Interface Definition (lines 7-15):**
```typescript
export interface PortfolioProject {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  status: "live" | "development";
  liveUrl?: string;
  techStack: string[];
}
```

**Required Interface Change:**
```typescript
export interface PortfolioProject {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  status: "live" | "development";
  liveUrl?: string;
  detailUrl: string;  // NEW FIELD - required
  techStack: string[];
}
```

**Current Click Behavior (lines 79-99):**
- Card itself is NOT clickable
- Only the "Visit Site" button (when `liveUrl` exists) links externally
- Button uses `target="_blank"` and `rel="noopener noreferrer"`

**Required Click Behavior Change:**
1. Wrap the entire card in a Next.js `Link` component pointing to `detailUrl`
2. Keep the "Visit Site" external link button, but prevent event propagation
3. Add visual cursor indicator for clickable card

**Implementation Pattern:**
```typescript
import Link from "next/link";

export function PortfolioCard({ project }: PortfolioCardProps) {
  return (
    <Link href={project.detailUrl}>
      <div className="
        bg-white/[0.04] backdrop-blur-sm border border-white/[0.08] rounded-2xl p-6 md:p-8
        hover:bg-white/[0.06] hover:border-purple-400/10 hover:-translate-y-1
        transition-all duration-300
        group cursor-pointer
      ">
        {/* ... existing card content ... */}
        
        {/* External Link - prevent propagation */}
        {project.liveUrl && (
          <div className="flex justify-end">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="..."
            >
              {/* ... */}
            </a>
          </div>
        )}
      </div>
    </Link>
  );
}
```

### 2. app/data/portfolio.ts

**Location:** `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/data/portfolio.ts`

**Current Data (4 projects):**

| Project | Current liveUrl | Issue |
|---------|-----------------|-------|
| Mirror of Dreams | `https://mirror-of-truth.xyz` | WRONG URL |
| Wealth | (none) | MISSING |
| StatViz | (none) | MISSING |
| AI Research Pipeline | (none) | N/A - custom solution |

**Required Changes:**

```typescript
import type { PortfolioProject } from "@/app/components/PortfolioCard";

export const portfolioProjects: PortfolioProject[] = [
  {
    id: "mirror-of-dreams",
    title: "Mirror of Dreams",
    subtitle: "AI Reflection Tool",
    description:
      "Tiered AI-powered reflection platform with PayPal subscriptions. Users explore dreams through 5 sacred questions and receive personalized insights.",
    status: "live",
    liveUrl: "https://selahmirror.xyz",  // FIXED: was mirror-of-truth.xyz
    detailUrl: "/projects/mirror-of-dreams",  // NEW
    techStack: ["Next.js", "TypeScript", "Claude API", "PayPal", "Supabase", "tRPC"],
  },
  {
    id: "wealth",
    title: "Wealth",
    subtitle: "Personal Finance SaaS",
    description:
      "Complete financial tracking system with AI-powered categorization, Israeli bank connections, budgeting, and goal tracking.",
    status: "live",
    liveUrl: "https://selahwealth.xyz",  // NEW
    detailUrl: "/projects/wealth",  // NEW
    techStack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Claude API", "tRPC"],
  },
  {
    id: "statviz",
    title: "StatViz",
    subtitle: "Statistical Reports Platform",
    description:
      "Secure B2B platform for delivering interactive statistical reports to academic students. Password-protected access with Hebrew support.",
    status: "live",
    liveUrl: "https://statviz.xyz",  // NEW
    detailUrl: "/projects/statviz",  // NEW
    techStack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "JWT"],
  },
  {
    id: "ai-research-pipeline",
    title: "AI Research Pipeline",
    subtitle: "Factorial Design Research Tool",
    description:
      "Factorial design research tool for generating culturally nuanced, emotionally authentic questionnaire responses at scale. Supports any research domain with precise demographic control.",  // UPDATED DESCRIPTION
    status: "live",
    // NO liveUrl - contact only
    detailUrl: "/projects/ai-research-pipeline",  // NEW
    techStack: ["Next.js 15", "TypeScript", "React 19", "Tailwind CSS"],
  },
];

export default portfolioProjects;
```

## Reusable Patterns

### CSS Classes from globals.css

**Location:** `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/globals.css`

| Class | Purpose | Usage |
|-------|---------|-------|
| `contemplative-card` | Glass-morphism card with hover effects | Main content sections |
| `gentle-button` | Purple-tinted button with hover | CTAs and links |
| `breathing-glass` | Subtle glass background | Badges and highlights |
| `display-lg` | Large serif heading | Page titles |
| `heading-xl` | Section headings | Section titles |
| `heading-lg` | Subsection headings | Feature cards |
| `body-xl` | Large body text | Descriptions |
| `body-lg` | Standard body text | Content paragraphs |
| `text-gentle` | Purple gradient text | Accents |
| `sacred-text` | Italic purple text | Quotes |
| `sacred-quote` | Quote block with left border | Featured quotes |
| `section-breathing` | Section padding (6rem vertical) | Section spacing |
| `container-wide` | 1200px max-width | Full sections |
| `container-content` | 800px max-width | Centered content |
| `container-narrow` | 600px max-width | Narrow sections |
| `spacing-comfortable` | 3rem margin-bottom | Element spacing |
| `spacing-generous` | 4rem margin-bottom | Section spacing |
| `animate-fade-in` | Fade in animation | Entry animations |
| `animate-float` | Gentle floating animation | Icons/emojis |

### Component Patterns from Blueprint Pages

**Reference Pages:**
- `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/soul/blueprint/mirror-of-truth/page.tsx`
- `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/soul/blueprint/selah/page.tsx`

**Common Structure Pattern:**

```typescript
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

const ProjectPage: React.FC = () => {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const liveLink = "https://example.xyz"; // or null

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
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0f1a]/80 backdrop-blur-sm">
        {/* ... */}
      </nav>

      {/* Hero */}
      <section className="section-breathing pt-32">
        {/* ... */}
      </section>

      {/* Content Sections */}
      {/* ... */}

      {/* Footer */}
      <footer className="py-16 border-t border-white/5">
        {/* ... */}
      </footer>
    </div>
  );
};

export default ProjectPage;
```

**Navigation Pattern (from blueprint pages):**
```typescript
<nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0f1a]/80 backdrop-blur-sm">
  <div className="container-wide">
    <div className="flex items-center justify-between h-16">
      <Link href="/" className="flex items-center space-x-3 group">
        <Image
          src="/logo-symbol.png"
          alt="Ahiya"
          width={28}
          height={28}
          className="transition-transform duration-300 group-hover:scale-105"
        />
        <span className="text-lg font-medium">Ahiya</span>
      </Link>

      <div className="hidden md:flex items-center space-x-8">
        <Link href="/#portfolio" className="text-slate-300 hover:text-white transition-colors">
          Back to Portfolio
        </Link>
        {liveLink && (
          <a
            href={liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="gentle-button text-sm px-4 py-2 flex items-center space-x-2"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Visit Live Site</span>
          </a>
        )}
      </div>
    </div>
  </div>
</nav>
```

**Hero Section Pattern:**
```typescript
<section className="section-breathing pt-32">
  <div className="container-content text-center">
    <div className="animate-fade-in">
      {/* Status Badge */}
      <div className="breathing-glass inline-block px-6 py-3 mb-8">
        <div className="flex items-center space-x-2 text-emerald-300">
          <span className="text-xl">EMOJI</span>
          <span className="font-medium">Live</span>
        </div>
      </div>

      {/* Large Icon */}
      <div className="text-6xl md:text-8xl mb-8 animate-float">EMOJI</div>

      {/* Title */}
      <h1 className="display-lg spacing-comfortable text-gentle">
        Project Title
      </h1>

      {/* Subtitle */}
      <p className="body-xl text-slate-400 spacing-comfortable">
        Project Subtitle
      </p>

      {/* Description */}
      <p className="body-lg text-slate-300 max-w-2xl mx-auto spacing-generous leading-relaxed">
        Description paragraph...
      </p>

      {/* CTA Button */}
      {liveLink && (
        <div className="spacing-comfortable">
          <a
            href={liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="gentle-button inline-flex items-center space-x-3 text-lg px-8 py-4"
          >
            <ExternalLink className="w-6 h-6" />
            <span>Visit Live Site</span>
          </a>
        </div>
      )}
    </div>
  </div>
</section>
```

**Feature Grid Pattern:**
```typescript
<section className="section-breathing">
  <div className="container-content">
    <h2 className="heading-xl text-center spacing-generous">Section Title</h2>

    <div className="grid md:grid-cols-2 gap-8">
      {features.map((feature, index) => (
        <div
          key={feature.title}
          className="animate-fade-in"
          style={{ animationDelay: `${index * 200}ms` }}
        >
          <div className="contemplative-card p-6 md:p-8">
            <div className="text-3xl md:text-4xl mb-6">{feature.icon}</div>
            <h3 className="heading-lg mb-4">{feature.title}</h3>
            <p className="text-slate-300 leading-relaxed">
              {feature.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
```

**Footer Pattern:**
```typescript
<footer className="py-16 border-t border-white/5">
  <div className="container-content text-center">
    <div className="flex justify-center mb-6">
      <Image
        src="/logo-symbol.png"
        alt="Ahiya"
        width={24}
        height={24}
        className="opacity-40"
      />
    </div>
    <p className="text-slate-400 text-sm mb-4">
      Made with reverence by <span className="text-gentle">Ahiya</span>
    </p>
    <p className="text-slate-500 text-xs">
      {new Date().getFullYear()} - Building systems that work
    </p>
  </div>
</footer>
```

## File Structure for New Pages

```
app/
  projects/
    mirror-of-dreams/
      page.tsx         # Mirror of Dreams detail page
    wealth/
      page.tsx         # Wealth detail page
    statviz/
      page.tsx         # StatViz detail page
    ai-research-pipeline/
      page.tsx         # AI Research Pipeline detail page (COMPLEX)
```

## Implementation Notes

### Builder 1: Data & Component Updates

**Task 1: Update PortfolioCard.tsx**
1. Add `detailUrl: string` to `PortfolioProject` interface
2. Import `Link` from `next/link`
3. Wrap card div in `<Link href={project.detailUrl}>`
4. Add `cursor-pointer` class to card div
5. Add `onClick={(e) => e.stopPropagation()}` to external link button

**Task 2: Update portfolio.ts**
1. Fix Mirror of Dreams URL: `selahmirror.xyz`
2. Add Wealth URL: `selahwealth.xyz`
3. Add StatViz URL: `statviz.xyz`
4. Add `detailUrl` to all 4 projects
5. Update AI Research Pipeline description (from vision.md)

### Builder 2: Mirror of Dreams & Wealth Pages

**Mirror of Dreams Page Structure:**
- Hero with title, subtitle, status badge
- Description section
- Features section (4 features from vision.md)
- Tech stack display
- "Visit Live Site" CTA to selahmirror.xyz
- Footer

**Wealth Page Structure:**
- Same pattern as Mirror of Dreams
- Features: Bank sync, AI categorization, Budget mgmt, Advisor chat
- CTA to selahwealth.xyz

### Builder 3: StatViz & AI Research Pipeline Pages

**StatViz Page Structure:**
- Same pattern as other simple pages
- Features: Admin panel, Password access, HTML/DOCX reports, Hebrew RTL
- CTA to statviz.xyz

**AI Research Pipeline Page (COMPLEX):**
- Hero with different badge: "Custom Solution" / "Contact for Access"
- "The Challenge" section (bullet points)
- "The Solution" section (capabilities)
- **Sample Outputs section** - CRITICAL: Display all 5 narratives from vision.md
  - Each sample needs demographic profile display
  - Full narrative text
  - Visual distinction between samples
- Technical Capabilities section
- Use Cases section
- Contact CTA (NO external link - mailto or #contact)

## Critical Dependencies

| Step | File | Depends On |
|------|------|------------|
| 1 | PortfolioCard.tsx interface | - |
| 2 | portfolio.ts data | Step 1 |
| 3 | PortfolioCard.tsx behavior | Step 1 |
| 4a | Mirror of Dreams page | Steps 1-3 |
| 4b | Wealth page | Steps 1-3 |
| 4c | StatViz page | Steps 1-3 |
| 4d | AI Research Pipeline page | Steps 1-3 |

Steps 4a-4d can run in parallel after steps 1-3 complete.

## Validation Checklist

- [ ] TypeScript compiles without errors
- [ ] All 4 project detail pages accessible at /projects/{id}
- [ ] Portfolio cards on homepage navigate to detail pages
- [ ] "Visit Site" buttons on detail pages open correct URLs in new tabs
- [ ] AI Research Pipeline page displays all 5 sample outputs
- [ ] Mobile responsive on all pages
- [ ] Build passes: `npm run build`

## Risk Assessment

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| Interface change breaks existing code | LOW | LOW | Additive change only |
| Wrong URLs deployed | MEDIUM | LOW | Verify URLs before commit |
| Sample output formatting issues | LOW | MEDIUM | Test on mobile |
| Link propagation issues | LOW | MEDIUM | Test click behavior |

## Questions Resolved by Vision Document

1. **What URL format for detail pages?** `/projects/{project-id}`
2. **Should cards link to detail or external?** Detail pages (external link on detail page)
3. **What about AI Research Pipeline?** Contact only, no external link
4. **Exact sample output content?** Provided in vision.md (5 narratives)

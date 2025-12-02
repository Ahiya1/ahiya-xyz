# Code Patterns & Conventions

## File Structure

```
app/
├── components/
│   └── PortfolioCard.tsx        # Modified - add detailUrl, wrap in Link
├── data/
│   └── portfolio.ts             # Modified - fix URLs, add detailUrl
├── projects/
│   ├── mirror-of-dreams/
│   │   └── page.tsx             # NEW
│   ├── wealth/
│   │   └── page.tsx             # NEW
│   ├── statviz/
│   │   └── page.tsx             # NEW
│   └── ai-research-pipeline/
│       └── page.tsx             # NEW (complex)
└── globals.css                  # Reference only - do not modify
```

## Naming Conventions

- **Page Files:** `page.tsx` (Next.js App Router convention)
- **Components:** PascalCase (`PortfolioCard.tsx`)
- **Data Files:** camelCase (`portfolio.ts`)
- **Types/Interfaces:** PascalCase (`PortfolioProject`)
- **Functions:** camelCase (`setMounted()`)
- **CSS Classes:** kebab-case (`contemplative-card`)

## CSS Classes from globals.css

### Layout Classes

| Class | Purpose | Usage |
|-------|---------|-------|
| `min-h-screen bg-[#0a0f1a]` | Base page background | Root div of every page |
| `section-breathing` | Section padding (6rem vertical) | Wrap each page section |
| `container-wide` | 1200px max-width | Full-width sections (nav) |
| `container-content` | 800px max-width | Main content areas |
| `container-narrow` | 600px max-width | CTAs, focused content |
| `spacing-comfortable` | 3rem margin-bottom | Element spacing |
| `spacing-generous` | 4rem margin-bottom | Section spacing |

### Component Classes

| Class | Purpose | Usage |
|-------|---------|-------|
| `contemplative-card` | Glass-morphism card with hover | Content sections, feature cards |
| `gentle-button` | Purple-tinted button with hover | CTAs and link buttons |
| `breathing-glass` | Subtle glass background | Badges, highlights |

### Typography Classes

| Class | Purpose | Usage |
|-------|---------|-------|
| `display-lg` | Large serif heading | Page titles (h1) |
| `heading-xl` | Section headings | Section titles (h2) |
| `heading-lg` | Subsection headings | Feature cards (h3) |
| `body-xl` | Large body text | Subtitles, lead paragraphs |
| `body-lg` | Standard body text | Content paragraphs |
| `text-gentle` | Purple gradient text | Accent text, branding |
| `sacred-text` | Italic purple text | Quotes, emphasis |

### Animation Classes

| Class | Purpose | Usage |
|-------|---------|-------|
| `animate-fade-in` | Fade in animation | Entry animations on load |
| `animate-float` | Gentle floating animation | Hero icons/emojis |

---

## PortfolioCard Component Update Pattern

### Updated Interface

```typescript
export interface PortfolioProject {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  status: "live" | "development";
  liveUrl?: string;
  detailUrl: string;  // NEW - required field
  techStack: string[];
}
```

### Updated Component with Link Wrapper

```typescript
"use client";

import React from "react";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

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

export interface PortfolioCardProps {
  project: PortfolioProject;
}

export function PortfolioCard({ project }: PortfolioCardProps) {
  return (
    <Link href={project.detailUrl}>
      <div
        className="
          bg-white/[0.04] backdrop-blur-sm border border-white/[0.08] rounded-2xl p-6 md:p-8
          hover:bg-white/[0.06] hover:border-purple-400/10 hover:-translate-y-1
          transition-all duration-300
          group cursor-pointer
        "
      >
        {/* Header with title, subtitle, and status */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1 min-w-0 pr-4">
            <h3 className="text-xl font-semibold text-white group-hover:text-purple-200 transition-colors duration-300">
              {project.title}
            </h3>
            <p className="text-slate-400 text-sm mt-1">
              {project.subtitle}
            </p>
          </div>

          {/* Status Badge */}
          <div className="flex-shrink-0 px-3 py-1 bg-white/[0.02] border border-white/[0.06] rounded-full text-xs">
            <span
              className={`font-medium ${
                project.status === "live"
                  ? "text-emerald-300"
                  : "text-amber-300"
              }`}
            >
              {project.status === "live" ? "Live" : "Development"}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-slate-300 leading-relaxed mb-6 text-sm">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 bg-white/[0.02] border border-white/[0.06] rounded-md text-xs text-slate-400 hover:text-slate-300 hover:bg-white/[0.04] transition-all duration-300"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* External Link - prevent propagation to allow card link */}
        {project.liveUrl && (
          <div className="flex justify-end">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="
                inline-flex items-center space-x-2
                px-4 py-2 bg-emerald-500/12 border border-emerald-400/20 rounded-lg
                text-xs text-emerald-300 font-medium
                hover:bg-emerald-500/20 hover:scale-105
                transition-all duration-300
              "
            >
              <span>Visit Site</span>
              <ExternalLink className="w-3 h-3" aria-hidden="true" />
              <span className="sr-only">(opens in new tab)</span>
            </a>
          </div>
        )}
      </div>
    </Link>
  );
}

export default PortfolioCard;
```

**Key changes:**
1. Added `detailUrl: string` to interface (required)
2. Import `Link` from `next/link`
3. Wrap entire card div in `<Link href={project.detailUrl}>`
4. Add `cursor-pointer` class to card div
5. Add `onClick={(e) => e.stopPropagation()}` to external link button

---

## Portfolio Data Update Pattern

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
      "Factorial design research tool for generating culturally nuanced, emotionally authentic questionnaire responses at scale. Supports any research domain with precise demographic control.",  // UPDATED description
    status: "live",
    // NO liveUrl - contact only
    detailUrl: "/projects/ai-research-pipeline",  // NEW
    techStack: ["Next.js 15", "TypeScript", "React 19", "Tailwind CSS"],
  },
];

export default portfolioProjects;
```

---

## Standard Project Page Template

Use this template for Mirror of Dreams, Wealth, and StatViz pages:

```typescript
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

const ProjectNamePage: React.FC = () => {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const liveLink = "https://example.xyz";  // Replace with actual URL

  const features = [
    {
      icon: "EMOJI",
      title: "Feature Title",
      description: "Feature description text here.",
    },
    // Add 3 more features (4 total)
  ];

  const techStack = ["Next.js", "TypeScript", /* etc */];

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
              <Link
                href="/#portfolio"
                className="text-slate-300 hover:text-white transition-colors"
              >
                Back to Portfolio
              </Link>
              <a
                href={liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="gentle-button text-sm px-4 py-2 flex items-center space-x-2"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Visit Live Site</span>
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="section-breathing pt-32">
        <div className="container-content text-center">
          <div className="animate-fade-in">
            {/* Status Badge */}
            <div className="breathing-glass inline-block px-6 py-3 mb-8">
              <span className="text-emerald-300 font-medium">Live</span>
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
              Project description paragraph from vision document.
            </p>

            {/* CTA Button */}
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
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-breathing">
        <div className="container-content">
          <h2 className="heading-xl text-center spacing-generous">Key Features</h2>

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

      {/* Tech Stack Section */}
      <section className="section-breathing">
        <div className="container-content text-center">
          <h2 className="heading-xl spacing-comfortable">Tech Stack</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 bg-white/[0.04] border border-white/[0.08] rounded-lg text-slate-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-breathing">
        <div className="container-narrow text-center">
          <div className="contemplative-card p-8 md:p-12">
            <h2 className="heading-xl spacing-comfortable">Ready to Explore?</h2>
            <p className="body-lg text-slate-300 spacing-comfortable">
              See the project in action.
            </p>
            <a
              href={liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="gentle-button inline-flex items-center space-x-3"
            >
              <ExternalLink className="w-5 h-5" />
              <span>Visit Live Site</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
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
    </div>
  );
};

export default ProjectNamePage;
```

---

## AI Research Pipeline Page Template (Complex)

This page requires special handling for the 5 sample narratives with tabbed interface:

```typescript
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

interface SampleNarrative {
  id: string;
  title: string;
  profile: {
    age: string;
    sport: string;
    region: string;
    citySize: string;
    background: string;
    trainingHours: string;
    travelTime: string;
    cost: string;
  };
  narrative: string;
}

const AIResearchPipelinePage: React.FC = () => {
  const [mounted, setMounted] = useState<boolean>(false);
  const [activeNarrative, setActiveNarrative] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  const sampleNarratives: SampleNarrative[] = [
    // Populate from vision.md - all 5 narratives
  ];

  const challenges = [
    "Expensive and time-consuming data collection",
    "Difficulty reaching diverse demographic groups",
    "Inconsistent response quality across populations",
    "Limited ability to generate controlled factorial designs",
  ];

  const solutions = [
    "Precise demographic control (age, location, religion, socioeconomic factors)",
    "Emotionally authentic first-person narratives",
    "Multiple distribution methods (random, equal, weighted)",
    "Bilingual support (English + Hebrew)",
    "Scalable from 100 to 10,000+ responses",
  ];

  const capabilities = [
    "Factorial design variables (any combination)",
    "Output formats (structured data, narratives)",
    "Integration options (n8n workflows, API)",
    "Quality controls and validation",
  ];

  const useCases = [
    "Academic research studies",
    "Market research and consumer insights",
    "UX research persona generation",
    "Content generation for diverse audiences",
    "Training data for ML models",
  ];

  const techStack = ["Next.js 15", "TypeScript", "React 19", "Tailwind CSS"];

  // Helper function to format profile keys
  const formatKey = (key: string): string => {
    const keyMap: Record<string, string> = {
      age: "Age",
      sport: "Sport",
      region: "Region",
      citySize: "City Size",
      background: "Background",
      trainingHours: "Training",
      travelTime: "Travel",
      cost: "Cost",
    };
    return keyMap[key] || key;
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#0a0f1a] flex items-center justify-center">
        <div className="w-4 h-4 bg-purple-400 rounded-full animate-pulse" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0f1a] text-white relative overflow-hidden">
      {/* Navigation - NO external link */}
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
              <Link
                href="/#portfolio"
                className="text-slate-300 hover:text-white transition-colors"
              >
                Back to Portfolio
              </Link>
              <a
                href="mailto:ahiya.butman@gmail.com"
                className="gentle-button text-sm px-4 py-2"
              >
                Contact for Access
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Different badge */}
      <section className="section-breathing pt-32">
        <div className="container-content text-center">
          <div className="animate-fade-in">
            {/* Custom Solution Badge */}
            <div className="breathing-glass inline-block px-6 py-3 mb-8">
              <span className="text-amber-300 font-medium">Custom Solution</span>
            </div>

            <div className="text-6xl md:text-8xl mb-8 animate-float">BRAIN_EMOJI</div>

            <h1 className="display-lg spacing-comfortable text-gentle">
              AI Research Pipeline
            </h1>

            <p className="body-xl text-slate-400 spacing-comfortable">
              Factorial Design Research Tool
            </p>

            <p className="body-lg text-purple-300 max-w-2xl mx-auto spacing-generous leading-relaxed italic">
              "Culturally nuanced, emotionally authentic research responses at scale"
            </p>
          </div>
        </div>
      </section>

      {/* The Challenge Section */}
      <section className="section-breathing">
        <div className="container-content">
          <h2 className="heading-xl text-center spacing-generous">The Challenge</h2>
          <div className="contemplative-card p-6 md:p-8">
            <p className="body-lg text-slate-300 mb-6">
              Traditional survey research faces significant challenges:
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

      {/* The Solution Section */}
      <section className="section-breathing">
        <div className="container-content">
          <h2 className="heading-xl text-center spacing-generous">The Solution</h2>
          <div className="contemplative-card p-6 md:p-8">
            <p className="body-lg text-slate-300 mb-6">
              AI-powered response generation that understands cultural context:
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

      {/* Sample Outputs Section - CRITICAL */}
      <section className="section-breathing">
        <div className="container-wide">
          <h2 className="heading-xl text-center spacing-comfortable">Sample Outputs</h2>
          <p className="text-center text-slate-400 mb-8">
            See the cultural nuance and emotional authenticity
          </p>

          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {sampleNarratives.map((sample, index) => (
              <button
                key={sample.id}
                onClick={() => setActiveNarrative(index)}
                className={`px-4 py-2 rounded-lg text-sm transition-all ${
                  activeNarrative === index
                    ? "bg-purple-500/20 border border-purple-400/40 text-purple-300"
                    : "bg-white/[0.04] border border-white/[0.08] text-slate-400 hover:text-slate-300"
                }`}
              >
                Sample {index + 1}
              </button>
            ))}
          </div>

          {/* Active Narrative Display */}
          <div className="contemplative-card p-6 md:p-8">
            <h3 className="heading-lg text-purple-300 mb-6">
              {sampleNarratives[activeNarrative]?.title}
            </h3>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Demographic Profile */}
              <div className="breathing-glass p-4">
                <h4 className="font-semibold text-slate-200 mb-4">Demographic Profile</h4>
                <div className="space-y-2 text-sm">
                  {sampleNarratives[activeNarrative] &&
                    Object.entries(sampleNarratives[activeNarrative].profile).map(
                      ([key, value]) => (
                        <div key={key} className="flex justify-between">
                          <span className="text-slate-400">{formatKey(key)}:</span>
                          <span className="text-slate-300">{value}</span>
                        </div>
                      )
                    )}
                </div>
              </div>

              {/* Narrative Text */}
              <div className="md:col-span-2">
                <h4 className="font-semibold text-slate-200 mb-4">Full Narrative</h4>
                <div className="prose prose-invert prose-sm max-w-none">
                  {sampleNarratives[activeNarrative]?.narrative
                    .split("\n\n")
                    .map((paragraph, idx) => (
                      <p key={idx} className="text-slate-300 leading-relaxed mb-4">
                        {paragraph}
                      </p>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Capabilities Section */}
      <section className="section-breathing">
        <div className="container-content">
          <h2 className="heading-xl text-center spacing-generous">Technical Capabilities</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {capabilities.map((capability, index) => (
              <div key={index} className="contemplative-card p-6">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full bg-purple-400/60 mt-2 flex-shrink-0" />
                  <span className="text-slate-300">{capability}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="section-breathing">
        <div className="container-content">
          <h2 className="heading-xl text-center spacing-generous">Use Cases</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {useCases.map((useCase, index) => (
              <div
                key={index}
                className="breathing-glass p-4 text-center text-slate-300"
              >
                {useCase}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="section-breathing">
        <div className="container-content text-center">
          <h2 className="heading-xl spacing-comfortable">Tech Stack</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 bg-white/[0.04] border border-white/[0.08] rounded-lg text-slate-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="section-breathing">
        <div className="container-narrow text-center">
          <div className="contemplative-card p-8 md:p-12">
            <h2 className="heading-xl spacing-comfortable">
              Interested in Custom Research Generation?
            </h2>
            <p className="body-lg text-slate-300 spacing-comfortable">
              This tool is available for custom research projects.
              Contact me to discuss your requirements.
            </p>
            <a
              href="mailto:ahiya.butman@gmail.com"
              className="gentle-button inline-flex items-center space-x-3"
            >
              <span>Get in Touch</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
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
    </div>
  );
};

export default AIResearchPipelinePage;
```

---

## Import Order Convention

```typescript
// 1. React/framework imports
"use client";
import React, { useState, useEffect } from "react";

// 2. Next.js imports
import Image from "next/image";
import Link from "next/link";

// 3. Third-party imports
import { ExternalLink } from "lucide-react";

// 4. Local imports (if any)
// import { something } from "@/app/lib/something";
```

---

## Code Quality Standards

1. **Always use "use client"** at top of interactive pages
2. **Always include mounted state** for hydration safety
3. **Always include loading state** with purple pulse animation
4. **Use semantic HTML** (nav, section, footer, h1-h3)
5. **Accessibility:** Include `alt` text for images, `aria-hidden` for decorative icons
6. **External links:** Always use `target="_blank"` with `rel="noopener noreferrer"`
7. **Prevent propagation:** Use `onClick={(e) => e.stopPropagation()}` on nested links

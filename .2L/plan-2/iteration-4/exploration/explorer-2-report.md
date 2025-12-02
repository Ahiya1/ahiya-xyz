# Explorer 2 Report: Page Template & Content Analysis

## Executive Summary

Analyzed 4 existing blueprint pages under `/app/soul/blueprint/` to extract the template pattern for creating the 4 new portfolio project pages. The blueprint pages provide a comprehensive and consistent structure that can be directly adapted. The AI Research Pipeline page requires special handling for its 5 sample narratives with demographic profiles.

---

## Existing Blueprint Page Analysis

### Reference Template: `/app/soul/blueprint/mirror-of-truth/page.tsx`

**File Path:** `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/soul/blueprint/mirror-of-truth/page.tsx`

**Key Structural Elements:**

```typescript
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink, /* other icons */ } from "lucide-react";

const ComponentNamePage: React.FC = () => {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const liveLink = "https://example.xyz";  // or null if no live site

  // Data arrays for features, tiers, etc.
  const features = [...];

  // Loading state
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
      {/* Hero Section */}
      {/* Feature Sections */}
      {/* Technical Architecture */}
      {/* Philosophy/Design */}
      {/* Status/CTA Section */}
      {/* Footer */}
    </div>
  );
};

export default ComponentNamePage;
```

### Common Sections Across All Blueprint Pages

| Section | Purpose | Key Classes |
|---------|---------|-------------|
| Navigation | Fixed header with logo and back link | `fixed top-0 z-50 bg-[#0a0f1a]/80 backdrop-blur-sm` |
| Hero | Title, subtitle, description, main CTA | `section-breathing pt-32`, `container-content` |
| Features Grid | Display features in cards | `contemplative-card`, `grid md:grid-cols-2` or `md:grid-cols-4` |
| Technical Architecture | Tech stack display | `grid md:grid-cols-2 gap-8` |
| Philosophy | Design principles | `container-narrow`, `sacred-quote` |
| Status/CTA | Call to action | `contemplative-card p-8 md:p-12` |
| Footer | Branding | `py-16 border-t border-white/5` |

---

## Recommended Page Structure

### Standard Project Page Template

For Mirror of Dreams, Wealth, and StatViz pages:

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

  const liveLink = "https://projectsite.xyz";

  const features = [
    { title: "Feature 1", description: "...", icon: "icon" },
    // ... more features
  ];

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#0a0f1a] flex items-center justify-center">
        <div className="w-4 h-4 bg-purple-400 rounded-full animate-pulse" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0f1a] text-white relative overflow-hidden">
      {/* Navigation - Back to Portfolio */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0f1a]/80 backdrop-blur-sm">
        <div className="container-wide">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-3 group">
              <Image src="/logo-symbol.png" alt="Ahiya" width={28} height={28} />
              <span className="text-lg font-medium">Ahiya</span>
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/#portfolio" className="text-slate-300 hover:text-white">
                ← Portfolio
              </Link>
              <a href={liveLink} target="_blank" rel="noopener noreferrer"
                 className="gentle-button text-sm px-4 py-2 flex items-center space-x-2">
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
            <div className="breathing-glass inline-block px-6 py-3 mb-8">
              <span className="text-emerald-300 font-medium">● Live</span>
            </div>
            <div className="text-6xl md:text-8xl mb-8 animate-float">{icon}</div>
            <h1 className="display-lg spacing-comfortable text-gentle">{title}</h1>
            <p className="body-xl text-slate-400 spacing-comfortable">{subtitle}</p>
            <p className="body-lg text-slate-300 max-w-2xl mx-auto spacing-generous leading-relaxed">
              {description}
            </p>
            <a href={liveLink} target="_blank" rel="noopener noreferrer"
               className="gentle-button inline-flex items-center space-x-3 text-lg px-8 py-4">
              <ExternalLink className="w-6 h-6" />
              <span>Visit Live Site</span>
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-breathing">
        <div className="container-content">
          <h2 className="heading-xl text-center spacing-generous">Key Features</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div key={feature.title} className="contemplative-card p-6 md:p-8">
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="heading-lg mb-2">{feature.title}</h3>
                <p className="text-slate-300">{feature.description}</p>
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
              <span key={tech} className="px-4 py-2 bg-white/[0.04] border border-white/[0.08] rounded-lg text-slate-300">
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
            <a href={liveLink} target="_blank" rel="noopener noreferrer"
               className="gentle-button inline-flex items-center space-x-3">
              <ExternalLink className="w-5 h-5" />
              <span>Visit Live Site</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t border-white/5">
        <div className="container-content text-center">
          <Image src="/logo-symbol.png" alt="Ahiya" width={24} height={24} className="mx-auto mb-6 opacity-40" />
          <p className="text-slate-400 text-sm">Made with reverence by <span className="text-gentle">Ahiya</span></p>
        </div>
      </footer>
    </div>
  );
};

export default ProjectNamePage;
```

---

## AI Research Pipeline Special Requirements

### Page Structure with 5 Sample Narratives

The AI Research Pipeline page is significantly different from other project pages. It requires:

1. **No Live Site Link** - Contact CTA instead
2. **"Contact for Access" Badge** instead of "Live" badge
3. **6 Content Sections:**
   - Hero with tagline
   - The Challenge section
   - The Solution section
   - **Sample Outputs section** (5 narratives with demographic profiles)
   - Technical Capabilities section
   - Use Cases section
   - Contact CTA

### Sample Narratives Structure

Each sample narrative requires a **demographic profile card** followed by the **full narrative text**:

```typescript
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
  narrative: string;  // Full narrative text
}

const sampleNarratives: SampleNarrative[] = [
  {
    id: "orthodox-basketball",
    title: "Orthodox Jewish Basketball Player",
    profile: {
      age: "17-18 years old",
      sport: "Basketball",
      region: "South",
      citySize: "Large City",
      background: "Ultra-Orthodox Jewish",
      trainingHours: "16-18 hours/week",
      travelTime: "1+ hour each way",
      cost: "Few hundred shekels/month"
    },
    narrative: `I started playing basketball at 12, when my mother...`
  },
  // ... 4 more narratives
];
```

### Visual Layout for Sample Narratives

```
+------------------------------------------------------------------+
|  Sample Outputs                                                   |
|  "See the cultural nuance and emotional authenticity"             |
+------------------------------------------------------------------+
|                                                                    |
|  [Tab: Sample 1] [Tab: Sample 2] [Tab: Sample 3] [Tab: Sample 4] [Tab: Sample 5]
|                                                                    |
|  +------------------------+  +------------------------------------+
|  | DEMOGRAPHIC PROFILE    |  |                                    |
|  | Age: 17-18 years old   |  |  "I started playing basketball    |
|  | Sport: Basketball      |  |   at 12, when my mother was       |
|  | Region: South          |  |   looking for suitable physical   |
|  | City Size: Large City  |  |   activity for Orthodox girls..." |
|  | Background: Ultra-Orth |  |                                    |
|  | Training: 16-18 hrs/wk |  |   [Full narrative text continues] |
|  | Travel: 1+ hour/way    |  |                                    |
|  | Cost: Few hundred NIS  |  |                                    |
|  +------------------------+  +------------------------------------+
|                                                                    |
|  Highlight: Cultural context showing Haredi girl navigating       |
|  between religious obligations and competitive sports             |
+------------------------------------------------------------------+
```

### Recommended Implementation: Tabbed Interface

```typescript
const [activeNarrative, setActiveNarrative] = useState(0);

// In JSX:
<section className="section-breathing">
  <div className="container-content">
    <h2 className="heading-xl text-center spacing-comfortable">Sample Outputs</h2>
    <p className="text-center text-slate-300 mb-8">
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
        {sampleNarratives[activeNarrative].title}
      </h3>
      
      <div className="grid md:grid-cols-3 gap-6">
        {/* Demographic Profile */}
        <div className="breathing-glass p-4">
          <h4 className="font-semibold text-slate-200 mb-4">Demographic Profile</h4>
          <div className="space-y-2 text-sm">
            {Object.entries(sampleNarratives[activeNarrative].profile).map(([key, value]) => (
              <div key={key} className="flex justify-between">
                <span className="text-slate-400">{formatKey(key)}:</span>
                <span className="text-slate-300">{value}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Narrative Text */}
        <div className="md:col-span-2">
          <h4 className="font-semibold text-slate-200 mb-4">Full Narrative</h4>
          <div className="prose prose-invert prose-sm max-w-none">
            {sampleNarratives[activeNarrative].narrative.split('\n\n').map((paragraph, idx) => (
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
```

---

## Content Checklist

### Mirror of Dreams Page (`/projects/mirror-of-dreams`)

| Content Element | Value | Source |
|-----------------|-------|--------|
| Title | Mirror of Dreams | Vision doc |
| Subtitle | AI Reflection Tool | Vision doc |
| Status | Live | Vision doc |
| Live URL | https://selahmirror.xyz | Vision doc (FIXED from mirror-of-truth.xyz) |
| Description | Tiered AI-powered reflection platform with PayPal subscriptions. Users explore dreams through 5 sacred questions and receive personalized insights. Features subscription tiers (Free/Pro/Unlimited) with PayPal payment integration and evolution tracking over time. | Vision doc |
| Tech Stack | Next.js, TypeScript, Claude API, PayPal, Supabase, tRPC | Vision doc |
| Feature 1 | Subscription tiers (Free/Pro/Unlimited) | Vision doc |
| Feature 2 | AI-powered personalized reflections | Vision doc |
| Feature 3 | PayPal payment integration | Vision doc |
| Feature 4 | Evolution tracking over time | Vision doc |

### Wealth Page (`/projects/wealth`)

| Content Element | Value | Source |
|-----------------|-------|--------|
| Title | Wealth | Vision doc |
| Subtitle | Personal Finance SaaS | Vision doc |
| Status | Live | Vision doc |
| Live URL | https://selahwealth.xyz | Vision doc (NEW) |
| Description | Complete financial tracking system with AI-powered categorization, Israeli bank connections, budgeting, and goal tracking. Helps users understand their spending patterns and make informed financial decisions with an intelligent advisor. | Vision doc |
| Tech Stack | Next.js, TypeScript, Prisma, PostgreSQL, Claude API, tRPC | Vision doc |
| Feature 1 | Bank account sync (Israeli banks) | Vision doc |
| Feature 2 | AI transaction categorization | Vision doc |
| Feature 3 | Budget management with alerts | Vision doc |
| Feature 4 | Financial advisor chat | Vision doc |

### StatViz Page (`/projects/statviz`)

| Content Element | Value | Source |
|-----------------|-------|--------|
| Title | StatViz | Vision doc |
| Subtitle | Statistical Reports Platform | Vision doc |
| Status | Live | Vision doc |
| Live URL | https://statviz.xyz | Vision doc (NEW) |
| Description | Secure B2B platform for delivering interactive statistical reports to academic students. Features password-protected access, admin panel for project management, and full Hebrew RTL support for the Israeli market. | Vision doc |
| Tech Stack | Next.js, TypeScript, Prisma, PostgreSQL, JWT | Vision doc |
| Feature 1 | Admin panel for project management | Vision doc |
| Feature 2 | Password-protected student access | Vision doc |
| Feature 3 | Interactive HTML reports + DOCX | Vision doc |
| Feature 4 | Hebrew RTL support | Vision doc |

### AI Research Pipeline Page (`/projects/ai-research-pipeline`)

| Content Element | Value | Source |
|-----------------|-------|--------|
| Title | AI Research Pipeline | Vision doc |
| Subtitle | Factorial Design Research Tool | Vision doc |
| Status | Custom Solution | Vision doc |
| Badge | Contact for Access | Vision doc |
| Live URL | NONE - Contact only | Vision doc |
| Tagline | Culturally nuanced, emotionally authentic research responses at scale | Vision doc |
| Tech Stack | Next.js 15, TypeScript, React 19, Tailwind CSS | Vision doc |

#### Section: The Challenge
- Expensive and time-consuming data collection
- Difficulty reaching diverse demographic groups
- Inconsistent response quality across populations
- Limited ability to generate controlled factorial designs

#### Section: The Solution
- Precise demographic control (age, location, religion, socioeconomic factors)
- Emotionally authentic first-person narratives
- Multiple distribution methods (random, equal, weighted)
- Bilingual support (English + Hebrew)
- Scalable from 100 to 10,000+ responses

#### Section: Technical Capabilities
- Factorial design variables (any combination)
- Output formats (structured data, narratives)
- Integration options (n8n workflows, API)
- Quality controls and validation

#### Section: Use Cases
- Academic research studies
- Market research and consumer insights
- UX research persona generation
- Content generation for diverse audiences
- Training data for ML models

#### Section: 5 Sample Narratives

**Sample 1: Orthodox Jewish Basketball Player**
- Age: 17-18, Sport: Basketball, Region: South, City: Large City
- Background: Ultra-Orthodox Jewish, Training: 16-18 hrs/week
- Travel: 1+ hour each way, Cost: Few hundred shekels/month
- Full narrative: ~6 paragraphs (see vision doc)

**Sample 2: Muslim Arab Sailor**
- Age: 15-16, Sport: Sailing, Region: North, City: Small City
- Background: Muslim Arab, Training: 18-20 hrs/week
- Travel: Under 1 hour, Cost: Free
- Full narrative: ~5 paragraphs (see vision doc)

**Sample 3: Druze Basketball Player**
- Age: 13-14, Sport: Basketball, Region: South, City: Small City
- Background: Druze, Training: 16-18 hrs/week
- Travel: 1+ hour each way, Cost: Free
- Full narrative: ~5 paragraphs (see vision doc)

**Sample 4: Christian Arab Taekwondo Athlete**
- Age: 19-20, Sport: Taekwondo, Region: Center, City: Small City
- Background: Christian Arab, Training: 16-18 hrs/week
- Travel: 1+ hour each way, Cost: Free (municipal scholarship)
- Full narrative: ~5 paragraphs (see vision doc)

**Sample 5: Christian Arab Handball Player**
- Age: 17-18, Sport: Handball, Region: Center, City: Large City
- Background: Christian Arab, Training: 20-22 hrs/week
- Travel: 1+ hour each way, Cost: Free
- Full narrative: ~5 paragraphs (see vision doc)

---

## Component Imports Pattern

Based on analysis of existing blueprint pages, the standard imports are:

```typescript
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";  // Primary icon needed
```

Additional lucide-react icons used across blueprint pages:
- `ArrowLeft` - For navigation
- `Eye`, `Heart`, `Sparkles`, `Crown`, `Star` - For decorative elements
- `Users`, `MessageCircle`, `Zap` - For feature icons
- `BookOpen`, `Play`, `Calendar` - For specific contexts

For project pages, only `ExternalLink` is essential.

---

## Key CSS Classes Reference

| Class | Purpose |
|-------|---------|
| `min-h-screen bg-[#0a0f1a]` | Base page background |
| `section-breathing` | Standard section padding (6rem) |
| `container-content` | 800px max-width container |
| `container-narrow` | 600px max-width container |
| `container-wide` | 1200px max-width container |
| `contemplative-card` | Glass-morphism card |
| `breathing-glass` | Subtle glass effect |
| `gentle-button` | Purple-tinted button |
| `display-lg` | Large display heading |
| `heading-xl` | Section heading |
| `heading-lg` | Subsection heading |
| `body-lg` | Body text |
| `text-gentle` | Gradient text effect |
| `sacred-text` | Italic purple text |
| `animate-fade-in` | Fade-in animation |
| `animate-float` | Floating animation |
| `spacing-comfortable` | 3rem margin-bottom |
| `spacing-generous` | 4rem margin-bottom |

---

## Recommendations for Builders

1. **Use mirror-of-truth/page.tsx as primary reference** - It has the most complete structure including pricing tiers and multiple feature sections

2. **For standard project pages (Mirror/Wealth/StatViz):**
   - Simplify from blueprint template (remove pricing tiers section)
   - Keep: Nav, Hero, Features Grid, Tech Stack, CTA, Footer
   - Change navigation to link back to portfolio (`/#portfolio`)

3. **For AI Research Pipeline page:**
   - Create tabbed interface for 5 narratives
   - Use state management for active tab
   - Include all 6 sections from vision doc
   - Replace external link CTA with contact CTA

4. **Icon consistency:**
   - Mirror of Dreams: Use existing icon from blueprint or reflection-themed emoji
   - Wealth: Finance emoji (chart, money)
   - StatViz: Data/stats emoji (chart, magnifying glass)
   - AI Research Pipeline: Research emoji (brain, test tube, gear)

5. **Mobile responsiveness:**
   - All blueprint pages are already mobile-responsive
   - Sample narratives tabs should wrap on mobile
   - Consider collapsible accordions for narratives on mobile

---

## File Structure for New Pages

```
app/
  projects/
    mirror-of-dreams/
      page.tsx          # ~200-250 lines
    wealth/
      page.tsx          # ~200-250 lines
    statviz/
      page.tsx          # ~200-250 lines
    ai-research-pipeline/
      page.tsx          # ~400-500 lines (longer due to narratives)
```

---

## Questions for Planner

1. Should the project pages include a tech stack section similar to blueprint pages, or keep it simpler?
2. For AI Research Pipeline, should the 5 narratives use tabs or vertical scroll with anchors?
3. Should there be any navigation between project pages (e.g., "Next Project" links)?

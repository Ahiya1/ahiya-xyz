# Code Patterns & Conventions

## File Structure

```
/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/
├── components/           # Shared React components
│   ├── Testimonials.tsx
│   ├── CalcomEmbed.tsx
│   └── UrgencyBadge.tsx
├── data/                 # TypeScript data files
│   ├── testimonials.ts
│   ├── pricing.ts
│   └── availability.ts
├── hooks/
│   └── useScrollReveal.ts
├── pricing/
│   └── page.tsx          # Pricing page route
└── page.tsx              # Homepage
```

## Naming Conventions

- **Components:** PascalCase (`Testimonials.tsx`, `UrgencyBadge.tsx`)
- **Data files:** camelCase (`testimonials.ts`, `pricing.ts`)
- **Types/Interfaces:** PascalCase (`Testimonial`, `ServiceTier`)
- **Functions:** camelCase (`useScrollReveal()`)
- **CSS Classes:** kebab-case (`contemplative-card`, `section-breathing`)

## Data File Patterns

### Testimonials Data Pattern

```typescript
// /app/data/testimonials.ts
export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  organization: string;
  type: "institutional" | "corporate" | "personal";
}

export const testimonials: Testimonial[] = [
  {
    id: "herzog-college",
    quote: "The students were very satisfied with the efficiency and the results in StatViz",
    author: "Michal Schriber",
    role: "Head of Department",
    organization: "Herzog College",
    type: "institutional",
  },
  {
    id: "hit",
    quote: "The AI results were comprehensive and aligned with our purpose. Exactly what we needed",
    author: "HIT",
    role: "Research Team",
    organization: "Holon Institute of Technology",
    type: "corporate",
  },
  {
    id: "mirror-user",
    quote: "The app helped me connect to my aspirations in a transitional period in my life",
    author: "Mirror of Dreams user",
    role: "User",
    organization: "",
    type: "personal",
  },
];
```

### Pricing Data Pattern

```typescript
// /app/data/pricing.ts
export interface ServiceTier {
  id: string;
  name: string;
  timeline: string;
  price: string;
  description: string;
  features: string[];
  highlighted?: boolean;
}

export const serviceTiers: ServiceTier[] = [
  {
    id: "landing-page",
    name: "Landing Page / Marketing Site",
    timeline: "1-2 weeks",
    price: "$2,500+",
    description: "Professional web presence that converts",
    features: [
      "Custom design matching your brand",
      "Mobile-responsive",
      "SEO optimized",
      "Contact form integration",
    ],
  },
  {
    id: "ai-agent",
    name: "AI Agent Integration",
    timeline: "2-3 weeks",
    price: "$5,000+",
    description: "Connect AI that does things to your product",
    features: [
      "Custom AI agent development",
      "API integration",
      "User-facing interface",
      "Testing and deployment",
    ],
    highlighted: true,
  },
  {
    id: "full-mvp",
    name: "Full MVP Build",
    timeline: "4-6 weeks",
    price: "$12,000+",
    description: "From idea to working product",
    features: [
      "Full-stack development",
      "Database design",
      "Authentication",
      "Deployment pipeline",
    ],
  },
  {
    id: "consulting",
    name: "Strategy Consulting",
    timeline: "Per session",
    price: "$100/hr",
    description: "Expert guidance on AI integration",
    features: [
      "Architecture review",
      "Technology selection",
      "Integration strategy",
      "Best practices",
    ],
  },
];

export const launchPricingConfig = {
  message: "Launch Pricing",
  subtext: "Available for the next 5 clients or through March 2025",
  active: true,
};
```

### Availability Data Pattern

```typescript
// /app/data/availability.ts
export interface AvailabilityConfig {
  slotsRemaining: number;
  period: string;
  message: string;
  showBadge: boolean;
}

export const availability: AvailabilityConfig = {
  slotsRemaining: 2,
  period: "January",
  message: "2 slots remaining for January",
  showBadge: true,
};
```

## Component Patterns

### Scroll Reveal Pattern (MUST USE)

```typescript
"use client";

import { useScrollReveal } from "@/app/hooks/useScrollReveal";

export function MyComponent() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {/* Content */}
    </div>
  );
}
```

### Section Pattern (MUST FOLLOW)

```typescript
<section id="section-id" className="section-breathing">
  <div className="container-wide">
    <SectionHeading
      title="Section Title"
      description="Optional description"
    />
    {/* Grid or content */}
  </div>
</section>
```

### Card Pattern (contemplative-card)

```typescript
<div className="contemplative-card p-8 md:p-12">
  <h3 className="heading-lg text-white mb-4">Card Title</h3>
  <p className="text-slate-400">Card content</p>
</div>
```

### Testimonial Card Pattern

```typescript
<div className="contemplative-card p-6 md:p-8">
  <blockquote className="mb-6">
    <p className="body-lg text-slate-300 italic">
      "{testimonial.quote}"
    </p>
  </blockquote>
  <footer className="flex flex-col">
    <cite className="text-white font-medium not-italic">
      {testimonial.author}
    </cite>
    <span className="text-slate-500 text-sm">
      {testimonial.role}{testimonial.organization && `, ${testimonial.organization}`}
    </span>
  </footer>
</div>
```

### Pricing Card Pattern

```typescript
<div
  className={`contemplative-card p-6 md:p-8 ${
    tier.highlighted
      ? "border-purple-400/30 shadow-[0_0_30px_rgba(168,85,247,0.15)]"
      : ""
  }`}
>
  {tier.highlighted && (
    <span className="inline-block px-3 py-1 text-xs font-medium text-purple-400 bg-purple-500/10 rounded-full mb-4">
      Most Popular
    </span>
  )}
  <h3 className="heading-lg text-white mb-2">{tier.name}</h3>
  <div className="flex items-baseline gap-2 mb-4">
    <span className="text-2xl font-bold text-white">{tier.price}</span>
    <span className="text-slate-500">{tier.timeline}</span>
  </div>
  <p className="text-slate-400 mb-6">{tier.description}</p>
  <ul className="space-y-3">
    {tier.features.map((feature) => (
      <li key={feature} className="flex items-start gap-3 text-slate-300">
        <Check className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
        {feature}
      </li>
    ))}
  </ul>
</div>
```

### UrgencyBadge Pattern

```typescript
"use client";

import { availability } from "@/app/data/availability";

export function UrgencyBadge() {
  if (!availability.showBadge) return null;

  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-400/30 rounded-full text-amber-400 text-sm font-medium">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75 animate-ping" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-400" />
      </span>
      {availability.message}
    </div>
  );
}
```

### CalcomEmbed Pattern

```typescript
"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

interface CalcomEmbedProps {
  calLink?: string;
}

export function CalcomEmbed({ calLink = "ahiya-butman-tigupi/discovery-call" }: CalcomEmbedProps) {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      cal("ui", {
        theme: "dark",
        styles: {
          branding: { brandColor: "#a855f7" },
        },
        hideEventTypeDetails: false,
      });
    })();
  }, []);

  return (
    <Cal
      calLink={calLink}
      style={{ width: "100%", height: "100%", overflow: "scroll" }}
      config={{
        theme: "dark",
      }}
    />
  );
}
```

## Button Patterns

### Primary CTA (Purple)

```typescript
<a
  href="/pricing"
  className="inline-flex items-center justify-center px-6 py-3 bg-purple-500/10 border border-purple-400/30 rounded-xl text-slate-200 font-medium transition-all duration-300 hover:bg-purple-500/20 hover:border-purple-400/50"
>
  View Pricing
</a>
```

### Secondary CTA (Ghost)

```typescript
<a
  href="#portfolio"
  className="inline-flex items-center justify-center px-6 py-3 border border-white/10 rounded-xl text-slate-300 font-medium transition-all duration-300 hover:bg-white/5 hover:border-white/20"
>
  See the Work
</a>
```

### Magnetic CTA (with glow)

```typescript
<a
  href="https://cal.com/ahiya-butman-tigupi/discovery-call"
  target="_blank"
  rel="noopener noreferrer"
  className="cta-magnetic inline-flex items-center justify-center px-6 py-3 bg-purple-500/10 border border-purple-400/30 rounded-xl text-slate-200 font-medium"
>
  Book Discovery Call
</a>
```

## Typography Classes

| Class | Usage | Font |
|-------|-------|------|
| `display-xl` | Main hero headings | Crimson Text (serif) |
| `display-lg` | Section headings | Crimson Text (serif) |
| `heading-xl` | Card headings | System (sans-serif) |
| `heading-lg` | Subheadings | System (sans-serif) |
| `body-xl` | Large body text | System (sans-serif) |
| `body-lg` | Standard body | System (sans-serif) |
| `text-gentle` | Purple gradient text | Gradient fill |

## Color Palette

| Color | Tailwind Class | Usage |
|-------|----------------|-------|
| Background | `bg-[#0a0f1a]` | Page background |
| Primary Purple | `purple-400/500` | CTAs, accents |
| Text White | `text-white` | Headings |
| Text Light | `text-slate-300` | Body text |
| Text Muted | `text-slate-400/500` | Secondary text |
| Border Light | `border-white/10` | Subtle borders |
| Glass BG | `bg-white/5` | Card backgrounds |
| Amber (urgency) | `amber-400/500` | Urgency badges |

## Container Classes

```typescript
// Wide container (1200px) - for grids
<div className="container-wide">

// Content container (800px) - for text-heavy sections
<div className="container-content">

// Narrow container (600px) - for focused content
<div className="container-narrow">
```

## Animation Patterns

### Staggered Children Pattern

```typescript
{items.map((item, index) => (
  <div
    key={item.id}
    ref={reveals[index].ref}
    className={`transition-all duration-700 ${
      reveals[index].isVisible
        ? "opacity-100 translate-y-0"
        : "opacity-0 translate-y-8"
    }`}
    style={{ transitionDelay: `${index * 100}ms` }}
  >
    {/* Item content */}
  </div>
))}
```

### Section Reveal CSS Classes

```typescript
<section className="section-reveal section-reveal-1"> // delay 0.1s
<section className="section-reveal section-reveal-2"> // delay 0.2s
```

## Grid Patterns

### 3-Column Grid (Testimonials, Pricing)

```typescript
<div className="grid md:grid-cols-3 gap-6 md:gap-8">
  {/* Grid items */}
</div>
```

### 2-Column Grid (Portfolio)

```typescript
<div className="grid md:grid-cols-2 gap-6 md:gap-8">
  {/* Grid items */}
</div>
```

## Import Order Convention

```typescript
// 1. React imports
"use client";
import { useEffect, useState } from "react";

// 2. Next.js imports
import Link from "next/link";
import Image from "next/image";

// 3. External libraries
import { Check, Calendar } from "lucide-react";
import Cal from "@calcom/embed-react";

// 4. Internal components
import { Navigation } from "@/app/components/Navigation";
import { Footer } from "@/app/components/Footer";
import { SectionHeading } from "@/app/components/SectionHeading";

// 5. Data imports
import { testimonials } from "@/app/data/testimonials";
import { serviceTiers } from "@/app/data/pricing";

// 6. Hooks
import { useScrollReveal } from "@/app/hooks/useScrollReveal";
```

## Page Pattern (for /pricing)

```typescript
"use client";

import { Navigation } from "@/app/components/Navigation";
import { Footer } from "@/app/components/Footer";
// ... other imports

export default function PricingPage() {
  return (
    <main id="main-content" className="bg-[#0a0f1a] min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="section-breathing pt-32 hero-gradient-bg">
        <div className="container-content text-center">
          {/* Hero content */}
        </div>
      </section>

      {/* Content sections */}
      <section className="section-breathing">
        <div className="container-wide">
          {/* Section content */}
        </div>
      </section>

      {/* Cal.com embed section */}
      <section id="book" className="section-breathing">
        <div className="container-content">
          <div className="contemplative-card p-6 md:p-8">
            <div className="h-[600px]">
              <CalcomEmbed />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
```

## Reduced Motion Support

All animations MUST respect reduced motion preferences. The existing CSS in globals.css handles this, but verify any custom animations include:

```css
@media (prefers-reduced-motion: reduce) {
  .animate-ping {
    animation: none;
  }
}
```

## Responsive Design Patterns

### Mobile-First Approach

```typescript
// Mobile: single column
// Desktop: 3 columns
<div className="grid md:grid-cols-3 gap-6">

// Mobile: stacked
// Desktop: side-by-side
<div className="flex flex-col sm:flex-row items-center gap-4">
```

### Breakpoints
- `sm:` - 640px (small tablets)
- `md:` - 768px (tablets / mobile nav switch)
- `lg:` - 1024px (desktop)
- `xl:` - 1280px (large desktop)

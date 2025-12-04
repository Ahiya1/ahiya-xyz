# Tech Stack

## Frameworks & Core Dependencies

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 15.3.4 | React framework with App Router |
| React | 19.0.0 | UI library |
| TypeScript | 5.x | Type safety |
| Tailwind CSS | 4.1.10 | Utility-first CSS |
| lucide-react | 0.517.0 | Icon library |

## Fonts

- **Inter** (`var(--font-inter)`): Body text, UI elements, navigation
- **Crimson Text** (`var(--font-crimson)`): Display headings (`.display-xl`, `.display-lg`)

## No New Dependencies Required

This iteration requires no new npm packages. All functionality can be achieved with existing dependencies:
- Icons from `lucide-react` (Target, Search, FileText, Hammer, GitMerge, Shield, RefreshCw, etc.)
- Standard React hooks (`useState`, `useEffect`, `useRef`)
- Next.js components (`Link`, `Image`)

## Key Patterns from Exploration

### Page Structure Pattern

All new pages should follow the established pattern:

```typescript
"use client";

import { useEffect, useRef, useState } from "react";
import { Navigation } from "@/app/components/Navigation";
import { Footer } from "@/app/components/Footer";

export default function PageName() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (/* Loading state */);
  }

  return (
    <main className="bg-[#0a0f1a] min-h-screen">
      <Navigation />
      {/* Content sections */}
      <Footer />
    </main>
  );
}
```

### Animation System

The site uses CSS-only animations defined in `globals.css`:

- **Hero animations:** `.hero-word`, `.hero-subline`, `.hero-ctas`
- **Section reveals:** `.section-reveal` with `.section-reveal-1` through `.section-reveal-10` for staggered delays
- **Gradient background:** `.hero-gradient-bg`
- **Floating elements:** `.animate-float`
- **Fade in:** `.animate-fade-in`

### Layout System

- `.container-wide` - max-width: 1200px
- `.container-content` - max-width: 800px
- `.container-narrow` - max-width: 600px
- `.section-breathing` - padding: 6rem 0

### Color Palette

| Usage | Color | Tailwind Class |
|-------|-------|----------------|
| Background | #0a0f1a | `bg-[#0a0f1a]` |
| Primary text | white | `text-white` |
| Body text | slate-300 | `text-slate-300` |
| Secondary text | slate-400 | `text-slate-400` |
| Muted text | slate-500 | `text-slate-500` |
| Accent | purple-300/400 | `text-purple-300` |
| Gradient text | purple-pink | `.text-gentle` |
| Card background | white/4% | `bg-white/[0.04]` |
| Borders | white/10, purple/30 | `border-white/10`, `border-purple-400/30` |

### Component Library

Existing reusable components:
- `Navigation` - Main navigation with mobile menu
- `Footer` - Site footer with scroll reveal
- `SectionHeading` - Section title + description
- `PortfolioCard` - Project cards on homepage

### CSS Custom Classes

From `globals.css`:
- `.contemplative-card` - Glass card with blur, border, hover lift
- `.gentle-button` - Purple-tinted button with hover glow
- `.breathing-glass` - Lighter glass effect
- `.cta-magnetic` - Enhanced CTA with glow on hover
- `.sacred-text` - Crimson font, italic, purple color
- `.link-animate` - Underline animation on hover

## Print Styles (New)

Add to `globals.css` for the capabilities page:

```css
@media print {
  /* Hide decorative elements */
  body::after { display: none; }

  /* Utility classes */
  .print-hide { display: none !important; }
  .print-break-before { page-break-before: always; }
  .print-break-after { page-break-after: always; }
  .print-avoid-break { break-inside: avoid; }

  /* Base print styling */
  body {
    background: white;
    color: black;
  }

  /* Reset cards for print */
  .contemplative-card {
    background: white;
    border: 1px solid #e2e8f0;
    box-shadow: none;
    backdrop-filter: none;
  }

  /* Reset text colors */
  .text-white,
  .text-slate-200,
  .text-slate-300 {
    color: #1e293b !important;
  }

  .text-slate-400,
  .text-slate-500 {
    color: #64748b !important;
  }

  /* Reset gradient text */
  .text-gentle {
    background: none;
    -webkit-text-fill-color: #7c3aed;
    color: #7c3aed;
  }
}
```

## Environment Variables

No new environment variables required for this iteration.

## Performance Considerations

- All new pages are client components (`"use client"`)
- Use `section-reveal` CSS classes instead of JavaScript IntersectionObserver where possible
- Lazy load icons only when needed
- Keep bundle size minimal by avoiding new dependencies

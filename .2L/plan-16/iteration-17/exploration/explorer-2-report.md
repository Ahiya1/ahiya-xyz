# Explorer 2 Report: Styling Patterns & Design System

## Executive Summary

The ahiya.xyz codebase follows a sophisticated "contemplative technology" design philosophy with a purple-accent color palette on dark backgrounds. The styling system combines global CSS utility classes, Tailwind CSS configuration, and component-level patterns. Animations prioritize subtlety and respect reduced motion preferences. New components should leverage existing CSS classes like `.contemplative-card`, `.gentle-button`, and typography utilities to maintain visual consistency.

## Discoveries

### Global CSS Architecture (`/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/globals.css`)

- **Tailwind 4.x Integration:** Uses `@import "tailwindcss"` syntax (v4 style)
- **Named Sections:** CSS organized into clearly labeled sections: Foundation, Components, Typography, Layout, Colors & Gradients, Animations, etc.
- **Component Classes:** Pre-built reusable classes for cards, buttons, glass effects
- **Print Styles:** Full print media support for PDF-exportable pages
- **Builder Contributions:** CSS contains clearly marked sections from multiple builders (Builder-3, Builder-4, Builder-5, Builder-6, Plan-11, Plan-13)

### Tailwind Configuration (`/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/tailwind.config.js`)

- **Content Paths:** Scans `pages/`, `components/`, and `app/` directories
- **Custom Color Palette:** Extended with `gentle` color scale (purple spectrum)
- **Custom Fonts:** Uses CSS variables `--font-inter` and `--font-crimson`
- **Custom Animations:** Pre-configured `soft-float`, `gentle-drift`, `fade-in`
- **Custom Shadows:** `shadow-gentle` and `shadow-contemplative`

## Color Palette Reference

### Primary Brand Colors (Purple Accent)

| Token | Hex | RGB | Usage |
|-------|-----|-----|-------|
| `gentle-500` / Primary | `#a855f7` | `rgb(168, 85, 247)` | Primary accent, CTAs, glows |
| `gentle-400` | `#c084fc` | `rgb(192, 132, 252)` | Hover states |
| `gentle-300` | `#d8b4fe` | `rgb(216, 180, 254)` | Lighter accents |
| `gentle-600` | `#9333ea` | - | Darker variants |
| `gentle-700` | `#7c3aed` | - | Print/high contrast |

### Accent Colors (Used in Components)

| Color | Hex | Purpose |
|-------|-----|---------|
| Cyan | `#22d3d8` | Explorers/Master Explorers |
| Green | `#22c55e` | Builders, Success states |
| Blue | `#60a5fa` | Integrators, Links |
| Gold | `#fbbf24` | Validators, Warnings |
| Orange | `#f97316` | Healers, Errors |
| Emerald | `rgb(16, 185, 129)` | Live status indicators |
| Amber | `rgb(251, 191, 36)` | "Sacred Fusion" theme |

### Background Colors

| Token | Value | Usage |
|-------|-------|-------|
| Body Background | `#0a0f1a` | Main page background |
| Card Background | `rgba(255, 255, 255, 0.04)` | `.contemplative-card` |
| Glass Background | `rgba(255, 255, 255, 0.02)` | `.breathing-glass` |
| Dark Section | `#0d1220` | Card inner backgrounds |
| Cosmic Dark | `#0f0f23` | Project pages (Mirror of Dreams) |

### Text Colors

| Class/Value | Color | Usage |
|-------------|-------|-------|
| Base text | `#f8fafc` | Body text |
| `text-white` | `#ffffff` | Headings |
| `text-slate-200` | - | Subheadings |
| `text-slate-300` | `#cbd5e1` | Body paragraphs |
| `text-slate-400` | - | Secondary text |
| `text-slate-500` | - | Muted text |
| `text-slate-600` | - | Disabled/subtle |
| `.text-gentle` | Gradient purple-pink | Accent text (gradient fill) |

## Typography Scale

### Display Typography (Crimson Text serif)

```css
/* Hero headlines */
.display-xl {
  font-family: var(--font-crimson), Georgia, serif;
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 600;
  line-height: 1.1;
  letter-spacing: -0.02em;
}

/* Section headlines */
.display-lg {
  font-family: var(--font-crimson), Georgia, serif;
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: -0.01em;
}
```

### Heading Typography (Inter sans-serif)

```css
.heading-xl {
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 600;
  line-height: 1.3;
  letter-spacing: -0.01em;
}

.heading-lg {
  font-size: clamp(1.25rem, 2.5vw, 1.5rem);
  font-weight: 500;
  line-height: 1.4;
}
```

### Body Typography

```css
.body-xl {
  font-size: clamp(1.125rem, 2vw, 1.25rem);
  line-height: 1.7;
  font-weight: 400;
}

.body-lg {
  font-size: clamp(1rem, 1.5vw, 1.125rem);
  line-height: 1.6;
  font-weight: 400;
}
```

### Special Text

```css
/* Italic purple accent text */
.sacred-text {
  font-family: var(--font-crimson), Georgia, serif;
  font-style: italic;
  color: #a78bfa;
  line-height: 1.8;
}
```

## Card/Section CSS Classes to Reuse

### Primary Card: `.contemplative-card`

```css
.contemplative-card {
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
}

.contemplative-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(168, 85, 247, 0.1);
}
```

**Usage:** Main content cards, feature cards, CTA sections

### Premium Card Hover: `.card-lift-premium`

```css
.card-lift-premium {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.card-lift-premium:hover {
  transform: translateY(-6px) scale(1.01);
  box-shadow:
    0 12px 40px rgba(0, 0, 0, 0.4),
    0 0 0 1px rgba(168, 85, 247, 0.15),
    0 0 60px -10px rgba(168, 85, 247, 0.2);
}
```

**Usage:** Cards that need extra "lift" effect (combine with `.contemplative-card`)

### Glass Effect: `.breathing-glass`

```css
.breathing-glass {
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
}
```

**Usage:** Lighter glass panels, metric displays, tags

### Button: `.gentle-button`

```css
.gentle-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 24px;
  background: rgba(168, 85, 247, 0.1);
  border: 1px solid rgba(168, 85, 247, 0.3);
  border-radius: 12px;
  color: #e2e8f0;
  text-decoration: none;
  transition: all 0.3s ease;
  font-weight: 500;
}

.gentle-button:hover {
  background: rgba(168, 85, 247, 0.15);
  border-color: rgba(168, 85, 247, 0.5);
  transform: translateY(-1px);
}
```

### Magnetic CTA: `.cta-magnetic`

```css
.cta-magnetic {
  transition: all 0.3s ease;
}

.cta-magnetic:hover {
  transform: scale(1.03);
  box-shadow: 0 0 40px rgba(168, 85, 247, 0.5);
}
```

**Usage:** Primary call-to-action buttons

### Layout Containers

```css
.container-wide { max-width: 1200px; margin: 0 auto; padding: 0 1.5rem; }
.container-content { max-width: 800px; margin: 0 auto; padding: 0 1.5rem; }
.container-narrow { max-width: 600px; margin: 0 auto; padding: 0 1.5rem; }
```

### Section Spacing

```css
.section-breathing { padding: 6rem 0; }
.section-breathing-xl { padding: 8rem 0; }  /* Extra breathing room */
.spacing-gentle { margin-bottom: 2rem; }
.spacing-comfortable { margin-bottom: 3rem; }
.spacing-generous { margin-bottom: 4rem; }

/* Mobile responsive */
@media (max-width: 640px) {
  .section-breathing { padding: 4rem 0; }
}
```

### Hero Gradient Background

```css
.hero-gradient-bg {
  position: relative;
}

.hero-gradient-bg::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(168, 85, 247, 0.08) 0%,
    rgba(139, 92, 246, 0.04) 25%,
    rgba(99, 102, 241, 0.06) 50%,
    rgba(168, 85, 247, 0.04) 75%,
    rgba(139, 92, 246, 0.08) 100%
  );
  background-size: 200% 200%;
  animation: gradient-shift 25s ease-in-out infinite;
  pointer-events: none;
  z-index: 0;
}
```

## Animation Patterns with Code Examples

### 1. Scroll Reveal (Intersection Observer Pattern)

**CSS Classes:**

```css
.reveal-on-scroll {
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.reveal-on-scroll:not(.visible) {
  opacity: 0;
  transform: translateY(20px);
}

.reveal-on-scroll.visible {
  opacity: 1;
  transform: translateY(0);
}
```

**JavaScript Hook (used throughout codebase):**

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

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}

// Usage in component:
const { ref, isVisible } = useScrollReveal();

return (
  <div
    ref={ref}
    className={`transition-all duration-700 ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
    }`}
  >
    {/* content */}
  </div>
);
```

### 2. Staggered Section Reveal (CSS-only)

```css
.section-reveal {
  animation: fade-in-up 0.6s ease forwards;
  opacity: 0;
}

/* Staggered delays */
.section-reveal-1 { animation-delay: 0.1s; }
.section-reveal-2 { animation-delay: 0.2s; }
.section-reveal-3 { animation-delay: 0.3s; }
/* ... up to section-reveal-10 */

@keyframes fade-in-up {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
```

**Usage:** Apply to sequential sections on a page

### 3. Staggered Child Reveal

```css
.reveal-stagger > *:nth-child(1) { transition-delay: 0s; }
.reveal-stagger > *:nth-child(2) { transition-delay: 0.1s; }
.reveal-stagger > *:nth-child(3) { transition-delay: 0.2s; }
/* ... up to 6 children */
```

### 4. Hero Word Reveal Animation

```css
.hero-word {
  display: inline-block;
  opacity: 0;
  transform: translateY(20px);
  animation: word-reveal 0.6s ease forwards;
}

@keyframes word-reveal {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

**Usage in JSX:**

```tsx
<h1 className="display-xl text-white">
  <span className="hero-word" style={{ animationDelay: '0.1s' }}>
    <span className="text-gentle">Intention.</span>
  </span>{" "}
  <span className="hero-word" style={{ animationDelay: '0.3s' }}>
    <span className="text-gentle">Clarity.</span>
  </span>
</h1>
```

### 5. Floating Animation

```css
@keyframes soft-float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-6px); }
}

.animate-float {
  animation: soft-float 8s ease-in-out infinite;
}
```

### 6. Pulse Animations (for active states)

```css
@keyframes pipeline-pulse {
  0%, 100% {
    transform: scale(1);
    filter: brightness(1);
  }
  50% {
    transform: scale(1.08);
    filter: brightness(1.2);
  }
}

.pipeline-node-active {
  animation: pipeline-pulse 1.5s ease-in-out infinite;
}
```

### 7. Pipeline Flow Animation (gradient movement)

```css
@keyframes pipeline-flow {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

.pipeline-line-animated {
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(168, 85, 247, 0.6) 25%,
    rgba(34, 211, 216, 0.6) 50%,
    rgba(96, 165, 250, 0.6) 75%,
    transparent 100%
  );
  background-size: 200% 100%;
  animation: pipeline-flow 2s linear infinite;
}
```

### 8. Framer Motion (Limited Use - Admin Only)

The project uses Framer Motion ONLY in the admin dashboard (`LiveFeed.tsx`):

```tsx
import { motion, AnimatePresence } from "framer-motion";

<AnimatePresence initial={false}>
  {items.map((item, index) => (
    <motion.div
      key={item.id}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
    >
      {/* content */}
    </motion.div>
  ))}
</AnimatePresence>
```

**Recommendation:** For new components, prefer CSS animations with the `useScrollReveal` hook pattern. Only use Framer Motion if AnimatePresence (enter/exit animations) is truly needed.

### Reduced Motion Support (CRITICAL)

ALL animations MUST include reduced motion media query:

```css
@media (prefers-reduced-motion: reduce) {
  .animate-float,
  .pipeline-node-active,
  .pipeline-line-animated {
    animation: none;
  }

  .reveal-on-scroll {
    transition: none;
    opacity: 1;
    transform: none;
  }
}
```

## Responsive Design Patterns

### Breakpoints (Tailwind defaults)

| Breakpoint | Min Width | Usage |
|------------|-----------|-------|
| `sm:` | 640px | Small tablets |
| `md:` | 768px | Tablets / Mobile nav switch |
| `lg:` | 1024px | Desktop |
| `xl:` | 1280px | Large desktop |

### Common Responsive Patterns

**Grid Layouts:**

```tsx
// 2-column grid
<div className="grid md:grid-cols-2 gap-6 md:gap-8">

// 3-column grid
<div className="grid md:grid-cols-3 gap-6">

// Agent cards (7 items)
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
```

**Typography Scaling:**

All typography uses `clamp()` for fluid scaling:

```css
font-size: clamp(MIN, PREFERRED, MAX);
/* e.g., clamp(2.5rem, 5vw, 4rem) */
```

**Mobile Navigation:**

- Desktop: Horizontal nav links visible
- Mobile: Hamburger menu with slide-out panel at `md:hidden`
- Breakpoint: `md:` (768px)

**Container Padding:**

```css
/* Desktop */
.container-wide { padding: 0 1.5rem; }

/* Mobile */
@media (max-width: 640px) {
  .container-wide { padding: 0 1rem; }
}
```

## Patterns Identified

### Card Hover Pattern with Glow

**Description:** Cards have subtle glow effect on hover using inline style calculations

**Use Case:** Feature cards, project cards

**Example from `PortfolioCard.tsx`:**

```tsx
const visuals = {
  accent: "rgb(168, 85, 247)",
  glow: "rgba(168, 85, 247, 0.4)",
};

<div className="group relative h-full">
  {/* Glow effect on hover */}
  <div
    className="absolute -inset-0.5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
    style={{ background: visuals.glow }}
  />

  {/* Card */}
  <div className="relative h-full bg-[#0d1220] border border-white/[0.08] rounded-3xl overflow-hidden group-hover:border-white/[0.15] transition-all duration-500">
    {/* content */}
  </div>
</div>
```

**Recommendation:** Use this pattern for any card that needs per-instance accent colors.

### Icon Container Pattern

**Description:** Icons wrapped in rounded container with matching accent

```tsx
<div
  className="w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300"
  style={{
    background: `${accentColor}15`,
    border: `1px solid ${accentColor}30`,
    boxShadow: `0 0 20px ${accentColor}20`,
  }}
>
  <Icon className="w-7 h-7" style={{ color: accentColor }} />
</div>
```

### Status Indicator Pattern

```tsx
{/* Live status dot */}
<span className="relative flex h-2 w-2">
  <span
    className="absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping"
    style={{ background: statusColor }}
  />
  <span
    className="relative inline-flex h-2 w-2 rounded-full"
    style={{ background: statusColor }}
  />
</span>
```

### Badge/Pill Pattern

```tsx
{/* Status pill */}
<div
  className={`
    px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-md
    ${status === "live"
      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
      : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
    }
  `}
>
  {status === "live" ? "Live" : "In Dev"}
</div>
```

### Section Heading Component

Use the existing `SectionHeading` component:

```tsx
import { SectionHeading } from "@/app/components/SectionHeading";

<SectionHeading
  title="Selected Work"
  description="Real systems, deployed and running."
/>
```

## Recommendations for Planner

1. **Reuse Existing CSS Classes:** New components should prioritize `.contemplative-card`, `.gentle-button`, `.breathing-glass`, and typography classes rather than creating new styles.

2. **Follow Scroll Reveal Pattern:** Use the `useScrollReveal` hook for any sections that should animate on scroll. Do not introduce new animation libraries.

3. **Maintain Color Consistency:** Use the established accent colors from the codebase. The primary purple (`#a855f7` / `gentle-500`) should be the default accent unless a specific semantic color is needed.

4. **Respect Reduced Motion:** Any new animations MUST include `prefers-reduced-motion` media query support.

5. **Typography Hierarchy:** Follow the established hierarchy:
   - `.display-xl` / `.display-lg` for page headings
   - `.heading-xl` / `.heading-lg` for section headings
   - `.body-xl` / `.body-lg` for body text
   - `.text-gentle` for accent/gradient text

6. **Responsive Grid Pattern:** Use `md:grid-cols-2` or `md:grid-cols-3` with `gap-6` as the standard grid configuration.

7. **Avoid Framer Motion in Public Pages:** The admin dashboard uses Framer Motion for AnimatePresence, but public-facing pages use CSS animations with IntersectionObserver for better performance.

8. **Card Border Radius:** Standard is `rounded-2xl` (16px) for cards, `rounded-xl` (12px) for smaller elements.

## Resource Map

### Critical Style Files

| Path | Purpose |
|------|---------|
| `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/globals.css` | Global CSS utilities, animations, component classes |
| `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/tailwind.config.js` | Tailwind theme extensions, custom colors/fonts |
| `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/layout.tsx` | Font loading (Inter, Crimson Text) |

### Key Component Files for Reference

| Path | Pattern |
|------|---------|
| `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/components/PortfolioCard.tsx` | Card with glow, scroll reveal |
| `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/components/2l/AgentCards.tsx` | Expandable cards, dynamic styling |
| `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/components/SectionHeading.tsx` | Reusable heading component |
| `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/page.tsx` | Hero, staggered animations, CTAs |
| `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/cv/page.tsx` | Hidden CV page, minimal style |
| `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/2l/page.tsx` | Full 2L showcase page |
| `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/projects/mirror-of-dreams/page.tsx` | Project detail page with cosmic theme |

### Key Dependencies

| Dependency | Purpose |
|------------|---------|
| `tailwindcss` (v4.x) | Utility CSS framework |
| `lucide-react` | Icon library (used throughout) |
| `framer-motion` | Animation library (admin only) |
| `next/font/google` | Font optimization (Inter, Crimson Text) |

## Questions for Planner

- Does the new CV content require additional styling beyond existing utilities, or should it match the current minimal aesthetic?
- Should the hidden CV page (`/cv`) maintain its ultra-minimal style or adopt more visual elements from the main site?
- Are there specific animation requirements for new components, or should they default to the `useScrollReveal` pattern?

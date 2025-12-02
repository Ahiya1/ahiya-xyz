# Iteration 2: Technical Stack Reference

## Framework & Dependencies

From exploration findings - no changes needed:

- **Next.js 15** - App Router with static generation
- **React 19** - Latest React version
- **TypeScript** - Strict mode enabled
- **Tailwind CSS 4** - With custom theme extensions

## Existing CSS Classes to Use

### Layout Classes
```css
.container-wide     /* max-width: 1200px - full layouts */
.container-content  /* max-width: 800px - content sections */
.container-narrow   /* max-width: 600px - forms, CTAs */
.section-breathing  /* padding: 6rem 0 (4rem mobile) */
```

### Component Classes
```css
.contemplative-card  /* Glass card with hover lift */
.gentle-button       /* Purple accent button */
.breathing-glass     /* Subtle glass panel */
.sacred-quote        /* Left-bordered quote block (if needed) */
```

### Typography Classes
```css
.display-xl   /* Crimson Text, clamp(2.5-4rem), 600 weight */
.display-lg   /* Crimson Text, clamp(2-3rem), 600 weight */
.heading-xl   /* System sans, clamp(1.5-2rem), 600 weight */
.heading-lg   /* System sans, clamp(1.25-1.5rem), 500 weight */
.body-xl      /* System sans, clamp(1.125-1.25rem), 400 weight */
.body-lg      /* System sans, clamp(1-1.125rem), 400 weight */
```

### Color Classes
```css
.text-gentle    /* Purple-to-pink gradient text */
.border-gentle  /* rgba(168, 85, 247, 0.2) border */
.bg-gentle      /* rgba(168, 85, 247, 0.05) background */
```

### Spacing Classes
```css
.spacing-gentle      /* margin-bottom: 2rem */
.spacing-comfortable /* margin-bottom: 3rem */
.spacing-generous    /* margin-bottom: 4rem */
```

## Color Palette Reference

### Backgrounds
- Primary: `#0a0f1a` or `bg-[#0a0f1a]`
- Card: `bg-white/[0.04]` or `bg-white/5`
- Glass: `bg-white/[0.02]`
- Nav: `bg-[#0a0f1a]/80 backdrop-blur-sm`

### Text Colors
- Primary: `text-white` or `text-slate-50`
- Secondary: `text-slate-300`
- Muted: `text-slate-400`
- Dim: `text-slate-500`

### Accent Colors
- Primary purple: `text-purple-300` / `text-purple-400` / `text-purple-500`
- Live status: `text-emerald-300` / `bg-emerald-500/12`
- In progress: `text-amber-300`

### Borders
- Card: `border-white/[0.08]`
- Card hover: `border-purple-400/10`
- Button: `border-purple-400/30`
- Section divider: `border-white/5`

## Animation Classes

Use sparingly for professional appearance:

```css
.animate-fade-in        /* 0.8s ease-out, opacity + translateY */
.animate-fade-in-delay  /* Same + 0.2s delay */
.animate-float          /* 8s floating effect (use on accent elements only) */
```

### Transition Pattern
```tsx
transition-all duration-300 ease-out
hover:-translate-y-1
group-hover:translate-x-1
```

## Component Patterns

### Card Pattern (for portfolio)
```tsx
<div className="bg-white/[0.04] backdrop-blur-sm border border-white/[0.08]
                rounded-2xl p-6 md:p-8 transition-all duration-300
                hover:bg-white/[0.06] hover:border-purple-400/10 hover:-translate-y-1">
  {/* Card content */}
</div>
```

### Button Pattern (primary)
```tsx
<button className="inline-flex items-center justify-center px-6 py-3
                   bg-purple-500/10 border border-purple-400/30 rounded-xl
                   text-slate-200 font-medium transition-all duration-300
                   hover:bg-purple-500/20 hover:border-purple-400/50">
  {buttonText}
</button>
```

### Button Pattern (secondary)
```tsx
<button className="inline-flex items-center justify-center px-6 py-3
                   border border-white/10 rounded-xl
                   text-slate-300 font-medium transition-all duration-300
                   hover:bg-white/5 hover:border-white/20">
  {buttonText}
</button>
```

### Section Pattern
```tsx
<section id="section-id" className="section-breathing">
  <div className="container-content">
    {/* Section content */}
  </div>
</section>
```

### Tech Badge Pattern
```tsx
<span className="px-2 py-1 bg-white/[0.02] border border-white/[0.06]
                 rounded-md text-xs text-slate-400">
  {techName}
</span>
```

### Status Badge Pattern
```tsx
<span className={`text-sm font-medium ${
  status === "live" ? "text-emerald-300" : "text-amber-300"
}`}>
  ● {status === "live" ? "Live" : "In Progress"}
</span>
```

## Icons (Lucide React)

Already installed. Import as needed:

```typescript
import {
  ArrowRight,    // CTA arrows
  ExternalLink,  // External links
  Mail,          // Email
  Github,        // GitHub link
  Briefcase,     // Portfolio
  Sparkles,      // Soul link
  Code,          // Code/tech
  Rocket,        // Deploy/ship
  Zap,           // Fast/AI
} from "lucide-react";
```

## File Structure

```
app/
  page.tsx                    # Business homepage (modify existing placeholder)
  components/
    MobileNav.tsx             # Existing (Soul navigation)
    Navigation.tsx            # NEW - Business navigation
    Footer.tsx                # NEW - Shared footer
    PortfolioCard.tsx         # NEW - Project showcase card
    SectionHeading.tsx        # NEW - Section headers
```

## Responsive Breakpoints

- Default: Mobile-first (<640px)
- `sm:` >= 640px (small tablet)
- `md:` >= 768px (tablet, nav switch)
- `lg:` >= 1024px (desktop)

### Common Responsive Patterns
```tsx
/* Grid layouts */
className="grid md:grid-cols-2 gap-6 md:gap-8"

/* Typography */
className="text-3xl md:text-4xl lg:text-5xl"

/* Spacing */
className="px-4 md:px-6 lg:px-8"
className="py-12 md:py-16 lg:py-20"
```

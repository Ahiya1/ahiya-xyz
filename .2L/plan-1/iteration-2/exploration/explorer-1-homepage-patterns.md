# Explorer-1 Report: Homepage Patterns Analysis

## Executive Summary

The ahiya.xyz codebase has a well-established design system with three key pages to analyze: a placeholder "Coming Soon" root page, a rich philosophical Soul homepage, and a sophisticated Building page with advanced project cards. The existing patterns provide excellent templates for creating a professional business homepage that can optionally incorporate consciousness-aware design elements.

## Discoveries

### 1. Current Root Homepage (`/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/page.tsx`)

**Structure:**
- Simple placeholder page with "Coming Soon" message
- Centered content with max-width container
- Background gradient orbs with blur and animation
- Logo, title, subtitle, CTA button, and quote card
- Uses `"use client"` directive for client-side rendering

**Key Elements:**
- Background: `bg-[#0a0f1a]` (deep navy/charcoal)
- Gradient orbs: `bg-purple-500/10` and `bg-blue-500/10` with `blur-3xl` and `animate-pulse`
- CTA button pattern: `inline-flex items-center` with hover states
- Quote card: `bg-white/5 backdrop-blur-sm rounded-xl border border-white/10`

### 2. Soul Homepage (`/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/soul/page.tsx`)

**Page Structure (Top to Bottom):**
1. **Navigation** - Fixed top nav with logo and site name
2. **Hero Section** - Logo image, h1 display text, body paragraph, quote card
3. **What I'm About** - Two-column grid with text left and card right
4. **Three Rooms Grid** - 3-column grid of navigation cards
5. **Featured Project** - Large centered project showcase
6. **Connect CTA** - Final call-to-action section
7. **Footer** - Simple centered footer

**Section Classes Used:**
- `section-breathing` - Standard section padding (6rem vertical)
- `container-content` - 800px max-width centered
- `container-wide` - 1200px max-width
- `container-narrow` - 600px max-width

**Card Pattern (Three Rooms):**
```tsx
<Link href="/soul/building" className="group">
  <div className="contemplative-card p-8 h-full text-center">
    <div className="flex items-center justify-center mb-6">
      <div className="breathing-glass p-3 rounded-full">
        <Building className="w-8 h-8 text-purple-300" />
      </div>
    </div>
    <h3 className="heading-lg mb-4 group-hover:text-purple-200 transition-colors">
      Building
    </h3>
    <p className="text-slate-300 mb-6 leading-relaxed">
      Description text here...
    </p>
    <div className="flex items-center justify-center space-x-2 text-purple-300">
      <span className="text-sm">Call to action</span>
      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
    </div>
  </div>
</Link>
```

**Key Design Patterns:**
- Uses Lucide icons: `ArrowRight`, `Building`, `FileText`, `MapPin`
- Mounted state pattern for hydration safety
- Loading state with `animate-pulse` dot

### 3. Building Page (`/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/soul/building/page.tsx`)

**Project Interface:**
```typescript
interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  status: "live" | "blueprint" | "development";
  icon: string;
  blueprintLink: string;
  liveLink?: string;
  featured?: boolean;
  reflection: string;
  tech: string[];
  cardType: "mirror" | "breathing" | "deceptive" | "writing";
}
```

**Project Card Pattern:**
- Two-column grid on larger screens: `grid lg:grid-cols-2 gap-6 md:gap-8`
- Card container: `bg-white/[0.015] border border-white/[0.04] rounded-2xl p-6`
- Header with icon + title + status badge
- Description paragraph
- Reflection quote (styled blockquote)
- Tech stack badges
- Action links footer

**Status Badge Pattern:**
```tsx
<span className={`font-medium ${
  project.status === "live"
    ? "text-emerald-300"
    : project.status === "development"
    ? "text-amber-300"
    : "text-purple-300"
}`}>
  {project.status === "live" ? "● Live" : project.status === "development" ? "● Development" : "● Blueprint"}
</span>
```

**Tech Stack Badges:**
```tsx
<div className="flex flex-wrap gap-2 mb-4">
  {project.tech.map((tech: string) => (
    <span
      key={tech}
      className="px-2 py-1 bg-white/[0.02] border border-white/[0.06] rounded-md text-xs text-slate-400"
    >
      {tech}
    </span>
  ))}
</div>
```

## Animation Classes and Their Usage

### From globals.css:

| Class | Animation | Duration | Usage |
|-------|-----------|----------|-------|
| `animate-float` | `soft-float` (Y: 0 to -6px) | 8s infinite | Floating icons/emojis |
| `animate-fade-in` | `fade-in-up` (opacity + Y) | 0.8s ease-out | Initial load animations |
| `animate-fade-in-delay` | `fade-in-up` | 0.8s + 0.2s delay | Staggered animations |
| `animate-pulse` | Tailwind default | - | Loading states, subtle attention |

### From Building Page (inline styles):

| Animation | Implementation | Usage |
|-----------|----------------|-------|
| `smoothFadeIn` | `@keyframes` in style jsx | Card entrance with staggered delay |
| `gentleFloat` | Y: 0 to -8px, 4s | Section icons |
| `gentleBounce` | Y: 0 to -4px, 2s | CTA icons |

### Custom Hooks for Advanced Animations:

1. **useSimpleBreathing** - 8-second breathing cycle for cards with scale and glow
2. **useTextGlitch** - Text corruption effect for "deceptive" card type
3. **useTypewriter** - Character-by-character typing effect
4. **useMirrorReflection** - Shimmer and reflection effects

## CSS Classes Reference

### Layout Classes (globals.css):

```css
.container-wide { max-width: 1200px; }
.container-content { max-width: 800px; }
.container-narrow { max-width: 600px; }
.section-breathing { padding: 6rem 0; }
.spacing-gentle { margin-bottom: 2rem; }
.spacing-comfortable { margin-bottom: 3rem; }
.spacing-generous { margin-bottom: 4rem; }
```

### Component Classes:

```css
.contemplative-card - Glass card with hover lift effect
.gentle-button - Subtle purple button with hover states
.breathing-glass - Very subtle glass panel
.sacred-text - Crimson italic purple text
.sacred-quote - Left-bordered quote block
.text-gentle - Purple gradient text
```

### Typography Classes:

```css
.display-xl - Large serif titles (2.5-4rem)
.display-lg - Medium serif titles (2-3rem)
.heading-xl - Sans headings (1.5-2rem)
.heading-lg - Sans subheadings (1.25-1.5rem)
.body-xl - Large body text (1.125-1.25rem)
.body-lg - Standard body text (1-1.125rem)
```

## Existing Reusable Components

### MobileNav (`/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/components/MobileNav.tsx`)

- Fixed top navigation bar with logo
- Desktop navigation links (hidden on mobile)
- Mobile hamburger menu with slide-out panel
- Body scroll lock when menu open
- Escape key handling
- Accessible with ARIA attributes

**Navigation Items Structure:**
```typescript
interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}
```

**Usage:**
```tsx
<MobileNav currentPath="/soul/building" />
```

## Recommended Patterns for New Business Homepage

### Page Structure Recommendation:

```
1. Hero Section
   - Professional headline (not "Coming Soon")
   - Clear value proposition
   - Primary CTA button
   
2. Services/Capabilities Grid
   - 3-column grid similar to "Three Rooms"
   - Use contemplative-card pattern
   - Icon + title + description + link
   
3. Featured Projects/Portfolio
   - 2-column grid similar to Building page
   - Simplified project cards (less animation)
   - Status badges for live projects
   
4. About/Philosophy Section
   - Two-column layout with text and visual
   - Can retain some contemplative language if desired
   
5. Contact CTA
   - Centered card with clear action
   
6. Footer
   - Current footer pattern works well
```

### Card Patterns to Reuse:

1. **Service Card** (adapt from Three Rooms):
```tsx
<div className="contemplative-card p-8 h-full text-center">
  <div className="breathing-glass p-3 rounded-full inline-flex mb-6">
    <Icon className="w-8 h-8 text-purple-300" />
  </div>
  <h3 className="heading-lg mb-4">{title}</h3>
  <p className="text-slate-300 mb-6">{description}</p>
  <Link className="flex items-center justify-center space-x-2 text-purple-300">
    <span>Learn more</span>
    <ArrowRight className="w-4 h-4" />
  </Link>
</div>
```

2. **Portfolio Card** (simplified from Project card):
```tsx
<div className="bg-white/[0.015] border border-white/[0.04] rounded-2xl p-6">
  <div className="flex items-center justify-between mb-4">
    <div className="flex items-center space-x-3">
      <div className="text-3xl">{icon}</div>
      <div>
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-slate-400 text-sm">{subtitle}</p>
      </div>
    </div>
    <StatusBadge status={status} />
  </div>
  <p className="text-slate-300 mb-4">{description}</p>
  <TechBadges tech={tech} />
  <ActionLinks />
</div>
```

### Animation Recommendations:

For a professional business site, use restraint:

1. **Keep:** `animate-fade-in` for page load
2. **Keep:** Hover transitions (`transition-all duration-300`)
3. **Consider removing:** Complex breathing/glitch effects
4. **Keep subtle:** `animate-float` for accent elements only

### Color Scheme:

The existing palette works well for professional use:
- Background: `#0a0f1a` (deep navy)
- Text: White and slate-300/400
- Accent: Purple-300/400/500 range
- Success: Emerald-300
- Warning: Amber-300

## Files to Reference During Implementation

| File | Purpose |
|------|---------|
| `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/soul/page.tsx` | Section layout patterns |
| `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/soul/building/page.tsx` | Project card patterns |
| `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/globals.css` | CSS classes and animations |
| `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/components/MobileNav.tsx` | Navigation component |
| `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/tailwind.config.js` | Theme configuration |

## Questions for Planner

1. Should the business homepage maintain the "contemplative/consciousness" tone or shift to purely professional language?
2. Should we create new components or inline everything in page.tsx like the existing pages?
3. Should the MobileNav be updated to include business routes or create a separate navigation?
4. What is the desired hero section structure - single headline or more elaborate with subheadline and CTAs?
5. How many portfolio items should be displayed on the homepage?

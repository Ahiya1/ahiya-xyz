# Explorer-2 Report: Styling Patterns & CSS Architecture

## Executive Summary

The ahiya.xyz website employs a sophisticated "contemplative technology" design system built on Tailwind CSS v4 with extensive custom utilities. The design philosophy emphasizes soft, meditative aesthetics with dark backgrounds (#0a0f1a), purple accent gradients, subtle animations, and glass-morphism effects. Business pages should maintain this contemplative feel while projecting professionalism through consistent use of established patterns.

---

## 1. Global CSS Analysis (`/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/globals.css`)

### 1.1 Foundation Styles

```css
/* Base body styling */
body {
  background: #0a0f1a;           /* Primary background - deep navy */
  color: #f8fafc;                /* Primary text - slate-50 equivalent */
  font-family: var(--font-inter), -apple-system, BlinkMacSystemFont, sans-serif;
  line-height: 1.7;
  font-weight: 400;
}

/* Smooth scrolling enabled globally */
html {
  scroll-behavior: smooth;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

### 1.2 Background Texture Effect

The site has a subtle star-field texture overlay:

```css
body::after {
  content: "";
  position: fixed;
  inset: 0;
  z-index: 1;
  background-image: radial-gradient(
    circle at 2px 2px,
    rgba(168, 85, 247, 0.03) 1px,  /* Purple-500 at 3% opacity */
    transparent 0
  );
  background-size: 100px 100px;
  opacity: 0.3;
  pointer-events: none;
  animation: gentle-drift 40s linear infinite;
}
```

### 1.3 Custom CSS Classes

#### Component Classes

| Class | Purpose | Properties |
|-------|---------|------------|
| `.contemplative-card` | Primary card component | Glass effect, blur, hover transform |
| `.gentle-button` | Primary button style | Purple accent, rounded, subtle hover |
| `.breathing-glass` | Lighter glass effect | Subtle blur and border |
| `.sacred-quote` | Quote/blockquote styling | Left border, italic, background |
| `.potato-energy` | Fun easter egg on hover | Shows potato emoji |

#### Typography Classes

| Class | Font | Size | Weight | Line Height |
|-------|------|------|--------|-------------|
| `.display-xl` | Crimson Text (serif) | clamp(2.5rem, 5vw, 4rem) | 600 | 1.1 |
| `.display-lg` | Crimson Text (serif) | clamp(2rem, 4vw, 3rem) | 600 | 1.2 |
| `.heading-xl` | System (sans) | clamp(1.5rem, 3vw, 2rem) | 600 | 1.3 |
| `.heading-lg` | System (sans) | clamp(1.25rem, 2.5vw, 1.5rem) | 500 | 1.4 |
| `.body-xl` | System (sans) | clamp(1.125rem, 2vw, 1.25rem) | 400 | 1.7 |
| `.body-lg` | System (sans) | clamp(1rem, 1.5vw, 1.125rem) | 400 | 1.6 |
| `.sacred-text` | Crimson Text (serif) | inherit | 400 italic | 1.8 |

#### Layout Classes

| Class | Purpose | Properties |
|-------|---------|------------|
| `.container-wide` | Wide content container | max-width: 1200px, auto margins, 1.5rem padding |
| `.container-content` | Content container | max-width: 800px, auto margins, 1.5rem padding |
| `.container-narrow` | Narrow container | max-width: 600px, auto margins, 1.5rem padding |
| `.section-breathing` | Section spacing | padding: 6rem 0 (4rem on mobile) |
| `.spacing-gentle` | Small margin | margin-bottom: 2rem |
| `.spacing-comfortable` | Medium margin | margin-bottom: 3rem |
| `.spacing-generous` | Large margin | margin-bottom: 4rem |

#### Color/Effect Classes

| Class | Purpose | Properties |
|-------|---------|------------|
| `.text-gentle` | Gradient text | Purple to pink gradient, transparent fill |
| `.border-gentle` | Subtle border | rgba(168, 85, 247, 0.2) |
| `.bg-gentle` | Subtle background | rgba(168, 85, 247, 0.05) |

### 1.4 Accessibility Features

```css
/* Screen reader only */
.sr-only { ... }

/* Reduced motion respect */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 2. Tailwind Configuration (`/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/tailwind.config.js`)

### 2.1 Custom Color Palette

```javascript
colors: {
  gentle: {
    50: "#faf5ff",
    100: "#f3e8ff",
    200: "#e9d5ff",
    300: "#d8b4fe",
    400: "#c084fc",
    500: "#a855f7",   // PRIMARY ACCENT
    600: "#9333ea",
    700: "#7c3aed",
    800: "#6b21a8",
    900: "#581c87",
    950: "#3b0764",
  }
}
```

### 2.2 Custom Font Families

```javascript
fontFamily: {
  sans: ["var(--font-inter)", "system-ui", "sans-serif"],
  serif: ["var(--font-crimson)", "serif"],
}
```

### 2.3 Custom Animations

```javascript
animation: {
  "soft-float": "soft-float 8s ease-in-out infinite",
  "gentle-drift": "gentle-drift 40s linear infinite",
  "fade-in": "fade-in-up 0.8s ease-out forwards",
  "fade-in-delay": "fade-in-up 0.8s ease-out 0.2s forwards",
}
```

### 2.4 Custom Shadows

```javascript
boxShadow: {
  gentle: "0 4px 20px rgba(0, 0, 0, 0.15)",
  contemplative: "0 8px 32px rgba(0, 0, 0, 0.3)",
}
```

---

## 3. Complete Color Palette Documentation

### 3.1 Background Colors

| Token | Value | Usage |
|-------|-------|-------|
| Primary BG | `#0a0f1a` | Main page background |
| Card BG | `rgba(255, 255, 255, 0.04)` | `.contemplative-card` |
| Card Hover BG | `rgba(255, 255, 255, 0.06)` | Card hover states |
| Breathing Glass BG | `rgba(255, 255, 255, 0.02)` | `.breathing-glass` |
| Quote BG | `rgba(255, 255, 255, 0.02)` | `.sacred-quote` |
| Nav BG | `#0a0f1a/80` (80% opacity) | Navigation bar |

### 3.2 Text Colors

| Token | Value | Usage |
|-------|-------|-------|
| Primary Text | `#f8fafc` (slate-50) | Body text |
| Secondary Text | `#cbd5e1` (slate-300) | Descriptions |
| Muted Text | `#94a3b8` (slate-400) | Subtitles, meta |
| Disabled Text | `#64748b` (slate-500) | Footer, small print |
| Accent Text | `#a78bfa` (violet-400) | `.sacred-text`, highlights |

### 3.3 Accent Colors

| Token | Value | Usage |
|-------|-------|-------|
| Primary Purple | `#a855f7` (purple-500) | Main accent |
| Purple Light | `#c084fc` (purple-400) | Hover states |
| Purple Lighter | `#d8b4fe` (purple-300) | Active states |
| Purple BG | `rgba(168, 85, 247, 0.1-0.3)` | Buttons, badges |
| Gradient Start | `#a78bfa` | `.text-gentle` |
| Gradient End | `#f472b6` (pink-400) | `.text-gentle` |

### 3.4 Status Colors (used in project cards)

| Token | Value | Usage |
|-------|-------|-------|
| Live/Success | `text-emerald-300` / `bg-emerald-500/12` | Live status |
| Blueprint | `text-purple-300` | Blueprint status |
| Development | `text-amber-300` | In-progress status |
| Blue Accent | `text-blue-400` | Personal journey |
| Emerald Accent | `text-emerald-400` | Collective journey |

### 3.5 Border Colors

| Token | Value | Usage |
|-------|-------|-------|
| Card Border | `rgba(255, 255, 255, 0.08)` | Default card |
| Card Hover Border | `rgba(168, 85, 247, 0.1)` | Card hover |
| Button Border | `rgba(168, 85, 247, 0.3)` | `.gentle-button` |
| Quote Border | `rgba(168, 85, 247, 0.3)` | Left border on quotes |
| Footer Border | `border-white/5` | Section dividers |

---

## 4. Animation Specifications

### 4.1 Keyframe Animations (globals.css)

```css
/* Floating effect - used for icons */
@keyframes soft-float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-6px); }
}
/* Duration: 8s, Timing: ease-in-out, Iteration: infinite */

/* Background drift - star texture */
@keyframes gentle-drift {
  0% { transform: translate(0, 0); }
  50% { transform: translate(-5px, -3px); }
  100% { transform: translate(0, 0); }
}
/* Duration: 40s, Timing: linear, Iteration: infinite */

/* Entrance animation */
@keyframes fade-in-up {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
/* Duration: 0.8s, Timing: ease-out */
```

### 4.2 Animation Classes

| Class | Animation | Duration | Delay | Initial State |
|-------|-----------|----------|-------|---------------|
| `.animate-float` | soft-float | 8s | - | visible |
| `.animate-fade-in` | fade-in-up | 0.8s | 0s | opacity: 0 |
| `.animate-fade-in-delay` | fade-in-up | 0.8s | 0.2s | opacity: 0 |
| `.animate-pulse` | Tailwind pulse | 2s | - | visible |

### 4.3 Building Page Custom Animations (inline JSX styles)

```css
@keyframes smoothFadeIn {
  from { opacity: 0; transform: translateY(20px) translateZ(0); }
  to { opacity: 1; transform: translateY(0) translateZ(0); }
}

@keyframes gentleFloat {
  0%, 100% { transform: translateY(0px) translateZ(0); }
  50% { transform: translateY(-8px) translateZ(0); }
}

@keyframes gentleBounce {
  0%, 100% { transform: translateY(0px) translateZ(0); }
  50% { transform: translateY(-4px) translateZ(0); }
}
```

### 4.4 Transition Specifications

| Context | Properties | Duration | Timing |
|---------|------------|----------|--------|
| Card hover | all | 0.4s | ease |
| Button hover | all | 0.3s | ease |
| Link hover | colors | 0.3s | ease |
| Icon hover | transform | 0.3s | ease |
| Navigation link | colors | default | default |

---

## 5. Component Specifications

### 5.1 Contemplative Card (`.contemplative-card`)

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
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4), 
              0 0 0 1px rgba(168, 85, 247, 0.1);
}
```

**Usage Pattern (Tailwind equivalent):**
```tsx
<div className="bg-white/[0.04] backdrop-blur-[20px] border border-white/[0.08] 
                rounded-2xl shadow-contemplative transition-all duration-400 
                hover:-translate-y-1 hover:shadow-xl">
```

### 5.2 Gentle Button (`.gentle-button`)

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
  font-weight: 500;
  transition: all 0.3s ease;
}

.gentle-button:hover {
  background: rgba(168, 85, 247, 0.15);
  border-color: rgba(168, 85, 247, 0.5);
  transform: translateY(-1px);
}
```

**Usage Pattern (Tailwind equivalent):**
```tsx
<button className="inline-flex items-center justify-center px-6 py-3 
                   bg-purple-500/10 border border-purple-400/30 rounded-xl 
                   text-slate-200 font-medium transition-all duration-300 
                   hover:bg-purple-500/15 hover:border-purple-400/50 
                   hover:-translate-y-0.5">
```

### 5.3 Breathing Glass (`.breathing-glass`)

```css
.breathing-glass {
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
}
```

### 5.4 Sacred Quote (`.sacred-quote`)

```css
.sacred-quote {
  position: relative;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.02);
  border-left: 3px solid rgba(168, 85, 247, 0.3);
  border-radius: 0 12px 12px 0;
  font-style: italic;
  color: #cbd5e1;
  margin: 2rem 0;
}

.sacred-quote::before {
  content: '"';
  position: absolute;
  top: 0;
  left: 1rem;
  font-size: 3rem;
  color: rgba(168, 85, 247, 0.3);
  line-height: 1;
}
```

---

## 6. Spacing & Layout Patterns

### 6.1 Container Widths

| Container | Max Width | Use Case |
|-----------|-----------|----------|
| `container-wide` | 1200px | Full page layouts |
| `container-content` | 800px | Article/content pages |
| `container-narrow` | 600px | Forms, CTAs |
| Inline: `max-w-5xl` | 1024px | Hero sections |
| Inline: `max-w-7xl` | 1280px | Grid layouts |

### 6.2 Vertical Spacing

| Pattern | Value | Usage |
|---------|-------|-------|
| Section padding | 6rem / 4rem mobile | `.section-breathing` |
| Hero top padding | pt-32 (8rem) | Below fixed nav |
| Card gap | gap-8 (2rem) | Grid layouts |
| Internal card padding | p-8 / p-12 | Cards, modals |
| Text spacing | space-y-6 | Paragraphs |

### 6.3 Grid Patterns

```tsx
/* 2-column layout */
<div className="grid md:grid-cols-2 gap-8 md:gap-12">

/* 3-column layout (navigation cards) */
<div className="grid md:grid-cols-3 gap-8">

/* 4-column layout (philosophy pillars) */
<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
```

---

## 7. Hover & Interactive Patterns

### 7.1 Card Hover States

```tsx
/* Standard card hover */
className="group hover:bg-white/[0.06] transition-all duration-300"

/* Child element that responds to group hover */
className="group-hover:text-purple-200 transition-colors"
className="group-hover:translate-x-1 transition-transform"
className="group-hover:scale-110 transition-transform duration-300"
```

### 7.2 Button Variants

**Primary (purple):**
```tsx
className="bg-purple-500/10 hover:bg-purple-500/20 border border-purple-400/20 
           hover:border-purple-400/40 rounded-xl text-purple-200"
```

**Secondary (emerald - live projects):**
```tsx
className="bg-emerald-500/12 border border-emerald-400/20 rounded-lg 
           text-emerald-300 hover:bg-emerald-500/20 hover:scale-105"
```

### 7.3 Link States

```tsx
/* Navigation links */
className="text-slate-300 hover:text-white transition-colors"

/* Active navigation */
className="text-purple-300"

/* In-content links */
className="text-purple-300 hover:text-purple-200 transition-colors"
```

---

## 8. Mobile Responsiveness Patterns

### 8.1 Breakpoints Used

| Breakpoint | Width | Common Usage |
|------------|-------|--------------|
| Default | < 640px | Mobile-first base |
| `sm:` | >= 640px | Small tablet |
| `md:` | >= 768px | Tablet/navigation switch |
| `lg:` | >= 1024px | Desktop layouts |

### 8.2 Responsive Typography

```tsx
/* Hero titles */
className="text-3xl md:text-4xl lg:text-6xl"

/* Section headings */
className="text-2xl md:text-3xl lg:text-4xl"

/* Body text */
className="text-base md:text-lg"

/* Small text */
className="text-xs md:text-sm"
```

### 8.3 Responsive Spacing

```tsx
/* Padding */
className="p-6 md:p-8 lg:p-12"
className="px-4 md:px-6"
className="py-12 md:py-16"

/* Gaps */
className="gap-4 md:gap-6 lg:gap-8"
```

### 8.4 Mobile Navigation

The site uses a slide-out mobile menu (at `md:` breakpoint):
- Fixed header with hamburger menu
- Right-side slide panel (w-72, max-w-[80vw])
- Backdrop blur overlay
- Touch-friendly tap targets (px-4 py-3)

---

## 9. Font Configuration

### 9.1 Google Fonts (from `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/layout.tsx`)

```typescript
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const crimson = Crimson_Text({
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  variable: "--font-crimson",
});
```

### 9.2 Font Usage

| Font | Variable | Usage |
|------|----------|-------|
| Inter | `--font-inter` | Body text, UI, navigation |
| Crimson Text | `--font-crimson` | Display headings, sacred quotes |

---

## 10. Recommendations for Business Pages

### 10.1 Maintain Existing Patterns

Business pages should use the exact same design tokens and patterns to maintain brand consistency:

1. **Use existing container classes**: `.container-wide`, `.container-content`
2. **Use existing card component**: `.contemplative-card` or equivalent Tailwind
3. **Use existing button style**: `.gentle-button`
4. **Maintain color palette**: Purple accents on #0a0f1a background
5. **Keep animations subtle**: Use existing fade-in and hover patterns

### 10.2 Business-Appropriate Additions

For professional business content, consider these adjustments while staying consistent:

**Hero Sections:**
```tsx
<section className="section-breathing pt-32">
  <div className="container-content text-center">
    <div className="breathing-glass inline-block px-6 py-3 mb-8">
      {/* Badge with icon */}
    </div>
    <h1 className="display-lg text-gentle spacing-comfortable">
      {/* Business headline */}
    </h1>
    <p className="body-xl text-slate-300 max-w-2xl mx-auto">
      {/* Value proposition */}
    </p>
  </div>
</section>
```

**Service/Feature Cards:**
```tsx
<div className="contemplative-card p-8 h-full">
  <div className="text-4xl mb-6">{emoji}</div>
  <h3 className="heading-lg mb-4">{title}</h3>
  <p className="text-slate-300 leading-relaxed">{description}</p>
</div>
```

**CTA Sections:**
```tsx
<section className="section-breathing">
  <div className="container-narrow text-center">
    <div className="contemplative-card p-12">
      <div className="text-5xl mb-6 animate-float">{icon}</div>
      <h2 className="heading-xl spacing-comfortable">{headline}</h2>
      <p className="body-lg text-slate-300 spacing-comfortable">{copy}</p>
      <Link href="/contact" className="gentle-button">
        {ctaText}
      </Link>
    </div>
  </div>
</section>
```

### 10.3 Professional Status Indicators

For business services, use the established status color pattern:
- **Available/Active**: `text-emerald-300` / `bg-emerald-500/12`
- **Coming Soon**: `text-amber-300` / `bg-amber-500/12`
- **Premium**: `text-purple-300` / `bg-purple-500/12`

### 10.4 Form Styling (from Connect page)

```tsx
<input className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg 
                  text-white placeholder-slate-400 
                  focus:outline-none focus:border-purple-400/50 focus:bg-white/10 
                  transition-all duration-300 backdrop-blur-sm" />
```

---

## 11. Key Files Reference

| File | Purpose |
|------|---------|
| `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/globals.css` | Global styles, custom classes |
| `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/tailwind.config.js` | Tailwind customizations |
| `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/layout.tsx` | Font configuration |
| `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/components/MobileNav.tsx` | Navigation patterns |
| `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/soul/page.tsx` | Homepage patterns |
| `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/soul/building/page.tsx` | Complex animations, card variants |
| `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/soul/connect/page.tsx` | Form styling patterns |

---

## 12. Design System Summary

### Quick Reference Card

```
COLORS
- Background: #0a0f1a
- Text Primary: #f8fafc (slate-50)
- Text Secondary: #cbd5e1 (slate-300)
- Accent: #a855f7 (purple-500)
- Gradient: #a78bfa -> #f472b6

TYPOGRAPHY
- Display: Crimson Text, 600, clamp(2-4rem)
- Heading: System, 500-600, clamp(1.25-2rem)
- Body: System, 400, clamp(1-1.25rem)

SPACING
- Sections: 6rem / 4rem mobile
- Cards: p-8 / p-12
- Content gaps: gap-8

COMPONENTS
- Cards: .contemplative-card (glass effect, 16px radius)
- Buttons: .gentle-button (purple accent, 12px radius)
- Quotes: .sacred-quote (left border, italic)

ANIMATIONS
- Float: 8s ease-in-out infinite
- Fade-in: 0.8s ease-out
- Transitions: 0.3-0.4s ease
```

This design system provides a complete foundation for building consistent, professional business pages that maintain the contemplative, consciousness-first aesthetic of the ahiya.xyz brand.

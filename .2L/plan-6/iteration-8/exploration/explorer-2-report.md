# Explorer 2 Report: Technology Patterns & Dependencies

## Executive Summary

The project pages use a well-established pattern with Tailwind CSS 4 (via PostCSS), lucide-react icons, and custom CSS animations in globals.css. The existing animation system is robust with keyframes for fade-in, float, gradient-shift, and hero word reveal. However, there are inconsistencies in the useScrollReveal hook implementations across pages that need resolution. The vision requires adding GitHub/Lock/ExternalLink icons (all available in lucide-react) and structured content sections for metrics, tech deep-dives, and visual mockups.

---

## Discoveries

### CSS Animation Patterns in globals.css

The project has a comprehensive CSS animation system already in place at `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/globals.css`:

**Existing Keyframes:**
1. `word-reveal` - Fade-in from below with 20px translateY (lines 281-286)
2. `gentle-drift` - Subtle 5px drift for texture overlay (lines 305-315)
3. `soft-float` - 6px float up/down for icons (lines 317-325)
4. `fade-in-up` - Standard 20px translate with opacity (lines 327-336)
5. `gradient-shift` - Background position animation for hero gradients (lines 338-341)

**Existing Animation Classes:**
- `.hero-word` - Staggered word reveal for hero titles (lines 262-267)
- `.hero-subline` - Subline fade animation (lines 269-274)
- `.hero-ctas` - CTA buttons fade animation (lines 276-279)
- `.animate-float` - 8s floating effect (lines 366-368)
- `.animate-fade-in` - 0.8s fade with opacity 0 start (lines 370-373)
- `.animate-fade-in-delay` - 0.8s fade with 0.2s delay (lines 375-378)
- `.hero-gradient-bg` - Animated gradient background (lines 343-364)

**Reduced Motion Support:**
Lines 462-479 contain proper `@media (prefers-reduced-motion: reduce)` handling that disables animations and sets opacity:1 for affected elements.

### Tailwind CSS 4 Patterns in Project Pages

The project uses Tailwind CSS 4.1.10 with PostCSS integration:

**Import Method:**
```css
@import "tailwindcss";  /* Line 3 of globals.css */
```

**Common Tailwind Patterns Used:**
1. **Container Classes:** `container-wide`, `container-content`, `container-narrow` (custom utilities in globals.css)
2. **Spacing:** `py-24`, `px-4`, `p-6 md:p-8`, `gap-6 md:gap-8`
3. **Grid Layouts:** `grid md:grid-cols-2 gap-8`
4. **Typography:** Custom classes like `display-xl`, `heading-xl`, `body-xl`, `body-lg`
5. **Color Opacity:** `bg-white/[0.04]`, `border-white/[0.08]`, `text-slate-300`
6. **Backdrop Effects:** `backdrop-blur-sm`, `backdrop-blur-md`
7. **Transitions:** `transition-all duration-300`, `transition-colors`

**Card Pattern (contemplative-card):**
```css
.contemplative-card {
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  transition: all 0.4s ease;
}
```

### Icon Usage (lucide-react)

**Current Import Pattern in Project Pages:**
```typescript
import { ExternalLink, ChevronDown } from "lucide-react";
```

**Icons Currently Used Across Project Pages:**
- `ExternalLink` - For "Visit Live Site" buttons (statviz, mirror-of-dreams, wealth)
- `ChevronDown` - For scroll indicators in hero sections (all 4 pages)

**Additional Icons Available for Vision Requirements:**
- `Github` - Already used on homepage (`app/page.tsx`)
- `Lock` - Available in lucide-react for "Private Repository" badge
- `ArrowUpRight` - Used in PortfolioCard for navigation indication

**Icon Sizing Patterns:**
- Navigation: `w-4 h-4`
- CTA Buttons: `w-5 h-5`
- Scroll Indicator: `w-6 h-6`
- Feature Cards: Use emoji strings instead (e.g., `"\u{1F512}"` for lock emoji)

### Content Structure Patterns

**Current Page Section Structure:**
1. Navigation (fixed)
2. Hero Section (min-h-screen, hero-gradient-bg)
3. Challenge Section (py-24, contemplative-card)
4. Solution Section (py-24, contemplative-card)
5. Features Section (py-24, grid md:grid-cols-2 gap-8)
6. Tech Stack Section (py-24, flex flex-wrap justify-center gap-3)
7. Next Project Link (text-center mb-16)
8. CTA Section (py-24, container-narrow)
9. Footer (py-16, border-t border-white/5)

**Feature Card Pattern:**
```typescript
const features = [
  {
    icon: "\u{1F527}",  // Unicode emoji
    title: "Admin Panel",
    description: "Comprehensive dashboard..."
  },
  // ...
];
```

**Tech Stack Badge Pattern:**
```tsx
<span className="px-4 py-2 bg-white/[0.04] border border-white/[0.08] rounded-lg text-slate-300">
  {tech}
</span>
```

### Visual Mockup Sections (AI Research Pipeline)

The AI Research Pipeline page (`/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/projects/ai-research-pipeline/page.tsx`) contains a unique "Sample Outputs" section that serves as a model for visual mockup patterns:

**Tab Navigation Pattern:**
```tsx
<div className="flex flex-wrap justify-center gap-2 mb-8">
  {sampleNarratives.map((sample, index) => (
    <button
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
```

**Content Display Pattern (Demographic Profile):**
```tsx
<div className="breathing-glass p-4">
  <h4 className="font-semibold text-slate-200 mb-4">Demographic Profile</h4>
  <div className="space-y-2 text-sm">
    {Object.entries(profile).map(([key, value]) => (
      <div key={key} className="flex justify-between">
        <span className="text-slate-400">{formatKey(key)}:</span>
        <span className="text-slate-300">{value}</span>
      </div>
    ))}
  </div>
</div>
```

**Grid Layout for Profile + Narrative:**
```tsx
<div className="grid md:grid-cols-3 gap-6">
  {/* 1 column for profile */}
  <div className="breathing-glass p-4">...</div>
  {/* 2 columns for narrative */}
  <div className="md:col-span-2">...</div>
</div>
```

---

## Patterns Identified

### Pattern 1: CSS-Only Section Reveal Animation

**Description:** Replace JavaScript-based IntersectionObserver with CSS animation-delay staggering
**Use Case:** When you need reliable section reveals without JavaScript complexity
**Example:**
```css
/* Add to globals.css */
.project-section-reveal {
  animation: fade-in-up 0.6s ease forwards;
  opacity: 0;
}
.project-section-reveal:nth-child(1) { animation-delay: 0.1s; }
.project-section-reveal:nth-child(2) { animation-delay: 0.2s; }
.project-section-reveal:nth-child(3) { animation-delay: 0.3s; }
.project-section-reveal:nth-child(4) { animation-delay: 0.4s; }
.project-section-reveal:nth-child(5) { animation-delay: 0.5s; }
```
**Recommendation:** Use this approach for project pages. The existing `fade-in-up` keyframe is already defined.

### Pattern 2: Metrics Display Grid

**Description:** 3-column grid for displaying project metrics with large numbers
**Use Case:** Showing impact numbers like "10K+", "5", "Bilingual"
**Example:**
```tsx
<div className="grid grid-cols-3 gap-6 text-center">
  <div>
    <div className="text-4xl font-bold text-purple-400">10K+</div>
    <div className="text-slate-400 text-sm">Responses Generated</div>
  </div>
  <div>
    <div className="text-4xl font-bold text-purple-400">5</div>
    <div className="text-slate-400 text-sm">Demographic Variables</div>
  </div>
  <div>
    <div className="text-4xl font-bold text-purple-400">2</div>
    <div className="text-slate-400 text-sm">Languages</div>
  </div>
</div>
```
**Recommendation:** Implement as new `.project-metrics-grid` class in globals.css for consistency.

### Pattern 3: Tech Deep-Dive Card

**Description:** Enhanced tech stack display with "why" explanations
**Use Case:** Showing thoughtful technology choices
**Example:**
```tsx
<div className="grid md:grid-cols-2 gap-6">
  <div className="contemplative-card p-6">
    <h3 className="heading-lg text-purple-300 mb-2">Next.js 15</h3>
    <p className="text-slate-400 text-sm">
      Server components for speed. App router for clean architecture.
    </p>
  </div>
  {/* ... more tech cards */}
</div>
```
**Recommendation:** Reuse existing `contemplative-card` class with modified padding.

### Pattern 4: Dual CTA Hero Button

**Description:** Two action buttons for Live Site and GitHub/Private Repo
**Use Case:** Hero sections with multiple entry points
**Example:**
```tsx
<div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
  <a href={liveLink} className="gentle-button inline-flex items-center space-x-3">
    <ExternalLink className="w-5 h-5" />
    <span>View Live</span>
  </a>
  {githubUrl ? (
    <a href={githubUrl} className="gentle-button inline-flex items-center space-x-3">
      <Github className="w-5 h-5" />
      <span>View Source</span>
    </a>
  ) : (
    <div className="gentle-button inline-flex items-center space-x-3 opacity-60 cursor-not-allowed">
      <Lock className="w-5 h-5" />
      <span>Private Repository</span>
    </div>
  )}
</div>
```
**Recommendation:** Use existing `gentle-button` class.

### Pattern 5: Next Project Preview Card

**Description:** Enhanced navigation with project preview
**Use Case:** End-of-page navigation to continue exploring
**Example:**
```tsx
<div className="contemplative-card p-6 flex items-center gap-4 group hover:border-purple-400/20 transition-all">
  <div className="text-4xl">{nextProject.emoji}</div>
  <div className="flex-1">
    <p className="text-slate-400 text-sm mb-1">Continue Exploring</p>
    <h3 className="heading-lg text-white group-hover:text-purple-300 transition-colors">
      {nextProject.title}
    </h3>
    <p className="text-slate-400 text-sm">{nextProject.subtitle}</p>
  </div>
  <ArrowUpRight className="w-5 h-5 text-slate-500 group-hover:text-purple-300 transition-colors" />
</div>
```
**Recommendation:** Wrap in Link component with existing card hover effects.

---

## Technology Recommendations

### Primary Stack (Already in Use)

| Technology | Version | Rationale |
|------------|---------|-----------|
| Next.js | 15.3.4 | App Router, Server Components, already configured |
| React | 19.0.0 | Latest stable, concurrent features |
| TypeScript | 5.x | Type safety, better IDE support |
| Tailwind CSS | 4.1.10 | Utility-first, PostCSS integration |
| lucide-react | 0.517.0 | Icons for GitHub, Lock, ExternalLink |

### Required Icon Imports

**For each project page, update imports to:**
```typescript
import { ExternalLink, ChevronDown, Github, Lock, ArrowUpRight } from "lucide-react";
```

**Icon availability confirmed in lucide-react 0.517.0:**
- `Github` - checkmark icon for GitHub links
- `Lock` - padlock icon for private repos
- `ExternalLink` - already in use
- `ChevronDown` - already in use
- `ArrowUpRight` - already in PortfolioCard

### CSS Classes Needed

**New classes to add to globals.css:**

1. `project-section-reveal` - CSS-only staggered animation
2. `project-metrics-grid` - 3-column metrics layout
3. `project-tech-card` - Tech deep-dive card styling
4. `project-next-card` - Next project preview card
5. `project-screenshot-placeholder` - Placeholder for screenshots

---

## Complexity Assessment

### Low Complexity Areas

- **GitHub Link Integration:** Simple conditional rendering with existing icons
- **Dual Hero CTAs:** Minor JSX changes using existing `gentle-button` class
- **Tech Badge Enhancement:** Adding subtitle text to existing badge pattern

### Medium Complexity Areas

- **CSS Animation System:** Adding new staggered reveal classes to globals.css
- **Tech Deep-Dive Section:** Restructuring tech stack from list to cards
- **Next Project Preview:** Creating new card component pattern
- **Metrics Section:** New section with grid layout

### High Complexity Areas

- **Visual Proof Section with Placeholders:** Need to design intentional empty state
- **useScrollReveal Hook Inconsistency:** Three different implementations need resolution
- **Content Population:** Each project needs new metrics, tech explanations

---

## Integration Points

### Internal Integrations

| From | To | Integration Type |
|------|-----|-----------------|
| globals.css | All project pages | CSS classes |
| portfolio.ts | Project pages | Could add githubUrl field |
| PortfolioCard.tsx | Project pages | Shared visual config patterns |

### Icon Dependencies

```
lucide-react 0.517.0
├── ExternalLink (in use)
├── ChevronDown (in use)
├── Github (available, used on homepage)
├── Lock (available)
└── ArrowUpRight (in PortfolioCard)
```

### Page-to-Page Navigation Chain

```
ai-research-pipeline → statviz → mirror-of-dreams → wealth → ai-research-pipeline
```

All "Next Project" links are circular and already implemented.

---

## Risks & Challenges

### Technical Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| CSS changes break homepage | HIGH | Use namespaced classes (e.g., `project-*`) |
| Animation timing issues | LOW | Test on Safari, use standard CSS |
| Icon import errors | LOW | All icons available in lucide-react |

### Content Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| Missing screenshots | MEDIUM | Design polished placeholder state |
| Unknown GitHub URLs | LOW | Use conditional rendering |
| Inaccurate metrics | LOW | Mark as editable, owner verifies |

### Complexity Risks

| Risk | Likelihood | Impact |
|------|------------|--------|
| useScrollReveal inconsistency causing bugs | MEDIUM | Replace all with CSS-only approach |
| AI Research Pipeline SampleNarratives interference | LOW | Keep section isolated |

---

## Recommendations for Planner

1. **Start with globals.css changes**
   - Add all new CSS classes first
   - Use `project-` prefix to avoid conflicts
   - Test homepage for regressions

2. **Use StatViz as template page**
   - Simplest structure (no custom UI components)
   - Has live URL for dual CTA testing
   - Copy pattern to other pages

3. **Remove useScrollReveal hooks from project pages**
   - Replace with CSS classes
   - Mirror of Dreams has working IntersectionObserver but CSS-only is simpler
   - Consistent approach across all 4 pages

4. **Add githubUrl to portfolio.ts data structure**
   - Optional field: `githubUrl?: string`
   - Enables conditional rendering in pages
   - Centralizes data management

5. **Design placeholder screenshot component**
   - Gradient background matching project color
   - Icon + "Coming Soon" text
   - Fixed aspect ratio for layout stability

6. **Import required icons once per file**
   ```typescript
   import { ExternalLink, ChevronDown, Github, Lock, ArrowUpRight } from "lucide-react";
   ```

---

## Resource Map

### Critical Files to Modify

| Path | Purpose |
|------|---------|
| `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/globals.css` | Add new animation/layout classes |
| `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/projects/ai-research-pipeline/page.tsx` | Most complex, has SampleNarratives |
| `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/projects/statviz/page.tsx` | Template page (simplest) |
| `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/projects/mirror-of-dreams/page.tsx` | Has working IntersectionObserver |
| `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/projects/wealth/page.tsx` | Standard structure |
| `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/data/portfolio.ts` | Add githubUrl field |

### Directory to Create

```
/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/public/projects/
├── ai-research-pipeline/
├── statviz/
├── mirror-of-dreams/
└── wealth/
```

### Key Dependencies

| Dependency | Version | Purpose |
|------------|---------|---------|
| lucide-react | 0.517.0 | Icons (Github, Lock, ExternalLink) |
| tailwindcss | 4.1.10 | Styling utilities |
| next | 15.3.4 | Framework, Image optimization |

---

## Code Snippets for Builder Reference

### 1. CSS Section Reveal (for globals.css)

```css
/* Project page section reveal - CSS only */
.project-section-reveal {
  animation: fade-in-up 0.6s ease forwards;
  opacity: 0;
}

/* Staggered delays for sequential sections */
.project-section-reveal[data-index="1"] { animation-delay: 0.1s; }
.project-section-reveal[data-index="2"] { animation-delay: 0.2s; }
.project-section-reveal[data-index="3"] { animation-delay: 0.3s; }
.project-section-reveal[data-index="4"] { animation-delay: 0.4s; }
.project-section-reveal[data-index="5"] { animation-delay: 0.5s; }
.project-section-reveal[data-index="6"] { animation-delay: 0.6s; }
.project-section-reveal[data-index="7"] { animation-delay: 0.7s; }
.project-section-reveal[data-index="8"] { animation-delay: 0.8s; }
```

### 2. Metrics Grid (for globals.css)

```css
/* Project metrics display */
.project-metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1.5rem;
  text-align: center;
}

.project-metric-value {
  font-size: 2.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #a78bfa, #f472b6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.project-metric-label {
  font-size: 0.875rem;
  color: rgb(148, 163, 184);
  margin-top: 0.25rem;
}
```

### 3. GitHub/Private Repo Badge Pattern

```tsx
// In hero section, after primary CTA
{project.githubUrl ? (
  <a
    href={project.githubUrl}
    target="_blank"
    rel="noopener noreferrer"
    className="gentle-button inline-flex items-center space-x-3"
  >
    <Github className="w-5 h-5" />
    <span>View Source</span>
  </a>
) : (
  <div className="inline-flex items-center space-x-3 px-6 py-3 border border-white/10 rounded-xl text-slate-500">
    <Lock className="w-5 h-5" />
    <span>Private Repository</span>
  </div>
)}
```

### 4. Screenshot Placeholder Pattern

```tsx
// Visual Proof Section
<section className="py-24">
  <div className="container-content">
    <h2 className="heading-xl text-center mb-12">See It In Action</h2>
    <div className="grid md:grid-cols-2 gap-6">
      {screenshots.length > 0 ? (
        screenshots.map((screenshot, index) => (
          <div key={index} className="contemplative-card overflow-hidden">
            <Image
              src={screenshot.src}
              alt={screenshot.alt}
              width={600}
              height={400}
              className="w-full h-auto"
            />
            <p className="p-4 text-slate-400 text-sm">{screenshot.caption}</p>
          </div>
        ))
      ) : (
        <div className="md:col-span-2 contemplative-card p-12 text-center">
          <div className="text-6xl mb-4 opacity-30">📸</div>
          <p className="text-slate-500">Screenshots coming soon</p>
        </div>
      )}
    </div>
  </div>
</section>
```

---

## Questions for Planner

1. Should we extract common project page sections into shared components (e.g., `ProjectHero`, `ProjectMetrics`, `ProjectTechDeepDive`) for maintainability, or keep pages as standalone files for this iteration?

2. For the AI Research Pipeline page, should the SampleNarratives section be considered the "Visual Proof" section, or should we add a separate screenshot section?

3. Should metrics values be hardcoded in each page file or moved to a centralized data structure in `portfolio.ts`?

---

*Exploration completed: 2025-12-04*
*Focus: Technology Patterns & Dependencies*
*This report informs builder implementation decisions*

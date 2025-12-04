# Technology Stack - Iteration 10

## Core Framework

**Decision:** Next.js 15.3.4 with React 19

**Rationale:**
- Already in use, no changes needed
- App Router provides optimal client/server architecture
- React 19 features (use client directive) already implemented

## New Dependency

### @react-pdf/renderer

**Decision:** Install @react-pdf/renderer for PDF generation

**Version:** Latest stable (^4.x)

**Install Command:**
```bash
npm install @react-pdf/renderer
```

**Rationale:**
1. React component-based syntax matches existing codebase paradigm
2. Native PNG image support for logo embedding
3. Professional typography control
4. Build-time generation = zero client bundle impact
5. Well-maintained with active development
6. No deployment complexity (static file output)

**Alternatives Considered:**

| Option | Why Not Chosen |
|--------|----------------|
| jsPDF | Imperative API, manual coordinate calculations, hard to maintain |
| Puppeteer | 170MB dependency, complex deployment, overkill for static PDF |
| PDFKit | Low-level, no React integration |
| window.print() | Current approach - inconsistent results, no direct link |

**Bundle Impact:**
- Client: 0 KB (build-time only)
- Dev dependency: ~2MB

## Animation Approach

**Decision:** CSS-first with Intersection Observer (NO Framer Motion)

**Rationale:**
1. No new dependencies - keep bundle minimal
2. CSS animations are GPU-accelerated
3. Patterns already exist in codebase (useScrollReveal hook)
4. Respects prefers-reduced-motion automatically
5. Framer Motion adds 30-50KB - not worth it for this scope

**Technical Implementation:**

```typescript
// Intersection Observer pattern (already in codebase)
const observer = new IntersectionObserver(
  ([entry]) => {
    if (entry.isIntersecting) {
      setIsVisible(true);
      observer.disconnect();
    }
  },
  { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
);
```

**CSS Animation Features Used:**
- `@keyframes` for complex animations
- `transition` for state changes
- `transform` for performance (GPU-accelerated)
- `animation-delay` for staggered effects
- `animation-fill-mode: forwards` for final state persistence

## Database

**Decision:** Not applicable - static site, no database

## Authentication

**Decision:** Not applicable - public portfolio site

## API Layer

**Decision:** Build-time script for PDF generation

**Pattern:**
```json
{
  "scripts": {
    "generate:pdf": "npx tsx scripts/generate-capabilities-pdf.tsx",
    "prebuild": "npm run generate:pdf"
  }
}
```

**Rationale:**
- PDF content is static, no need for runtime generation
- Integrates into standard build process
- No server costs or cold starts

## Frontend Stack

**Decision:** Existing stack unchanged

| Technology | Version | Purpose |
|------------|---------|---------|
| React | ^19.0.0 | UI Library |
| Next.js | 15.3.4 | Framework |
| Tailwind CSS | ^4.1.10 | Styling |
| lucide-react | ^0.517.0 | Icons |

**UI Patterns:**
- `"use client"` for interactive components
- Tailwind for utility classes
- CSS custom properties for theming
- contemplative-card, gentle-button classes

## Development Tools

### Testing

**Decision:** Manual testing for this iteration

**Rationale:**
- Animation changes are visual, best tested manually
- No logic changes that require unit tests
- Quick iteration cycle

### Code Quality

**Existing tools (unchanged):**
- TypeScript for type checking
- Next.js built-in linting
- Tailwind class sorting (if configured)

### Build & Deploy

**Decision:** Vercel auto-deploy from main branch

**Build Command:**
```bash
npm run build
```

**New Build Step:**
```bash
npm run generate:pdf  # Runs before build via prebuild script
```

## Environment Variables

No new environment variables required.

**Existing (unchanged):**
- Standard Next.js variables
- No API keys needed for this iteration

## Dependencies Overview

### Current package.json dependencies:
```json
{
  "dependencies": {
    "@tailwindcss/postcss": "^4.1.10",
    "lucide-react": "^0.517.0",
    "next": "15.3.4",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "tailwindcss": "^4.1.10"
  }
}
```

### After iteration:
```json
{
  "dependencies": {
    "@react-pdf/renderer": "^4.x.x",  // NEW
    "@tailwindcss/postcss": "^4.1.10",
    "lucide-react": "^0.517.0",
    "next": "15.3.4",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "tailwindcss": "^4.1.10"
  },
  "scripts": {
    "generate:pdf": "npx tsx scripts/generate-capabilities-pdf.tsx",  // NEW
    "prebuild": "npm run generate:pdf"  // NEW
  }
}
```

## Performance Targets

| Metric | Target | Approach |
|--------|--------|----------|
| First Contentful Paint | < 1.5s | Already achieved, no regression |
| Largest Contentful Paint | < 2.5s | CSS animations don't block |
| Total Blocking Time | < 200ms | No heavy JS added |
| Animation FPS | 60fps | CSS transforms are GPU-accelerated |
| PDF file size | < 500KB | Simple text + logo |

## Security Considerations

| Consideration | How Addressed |
|---------------|---------------|
| No user input | All content is static/hardcoded |
| No API routes | No server-side attack surface |
| PDF generation | Build-time only, no user-triggered generation |
| External dependencies | Only @react-pdf/renderer, well-audited |

## Browser Support

**Target:** Modern browsers (Chrome, Firefox, Safari, Edge - latest 2 versions)

**CSS Features Used:**
- `backdrop-filter` - Supported in all modern browsers
- `@keyframes` - Universal support
- IntersectionObserver - Supported in all modern browsers
- CSS custom properties - Universal support

**Fallback Strategy:**
- `prefers-reduced-motion` disables animations for accessibility
- Progressive enhancement - site works without animations

## File Structure After Implementation

```
/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/
├── app/
│   ├── components/
│   │   └── Navigation.tsx        # Modified: Link + hash fix
│   ├── hooks/                    # NEW directory
│   │   ├── useScrollReveal.ts    # NEW: Shared hook
│   │   └── useCountUp.ts         # NEW: Shared hook
│   ├── projects/
│   │   ├── statviz/page.tsx      # Modified: StatVizDemo
│   │   ├── wealth/page.tsx       # Modified: WealthDemo
│   │   ├── mirror-of-dreams/page.tsx  # Modified: MirrorDemo
│   │   └── ai-research-pipeline/page.tsx  # Modified: Streaming
│   ├── 2l/page.tsx               # Modified: Animations
│   ├── capabilities/page.tsx     # Modified: Landing page
│   ├── page.tsx                  # Modified: Copy + download link
│   └── globals.css               # Modified: New animations
├── scripts/
│   └── generate-capabilities-pdf.tsx  # NEW
├── public/
│   ├── logo-text.png             # Existing
│   └── ahiya-capabilities.pdf    # NEW (generated)
└── package.json                  # Modified: New dep + scripts
```

---

*Tech stack defined: 2025-12-04*
*Iteration: 10 (Plan-8)*

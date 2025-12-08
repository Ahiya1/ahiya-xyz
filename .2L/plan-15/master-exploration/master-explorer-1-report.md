# Master Explorer 1 Report: Architecture & Structure Analysis

## Executive Summary

The ahiya.xyz codebase is a well-structured Next.js 16 application using the App Router pattern with a consistent design system built on Tailwind CSS v4. The site follows a dark theme (`bg-[#0a0f1a]`) with purple accents and uses two typography systems (Inter for body, Crimson Text for display). Implementing the hidden CV page requires creating a new route at `/app/cv/page.tsx`, modifying the Footer component to add a subtle availability signal, creating a new PDF generator script, and adding a `robots.txt` file to exclude the `/cv` route from indexing.

## Discoveries

### 1. Page Architecture Pattern

All pages follow a consistent structure:

```tsx
"use client";

import { Navigation } from "@/app/components/Navigation";
import { Footer } from "@/app/components/Footer";

export default function SomePage() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  // Loading state for hydration
  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#0a0f1a] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-purple-400/30 border-t-purple-400 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <main id="main-content" className="bg-[#0a0f1a] min-h-screen">
      <Navigation />
      {/* Hero Section with pt-32 for nav clearance */}
      <section className="section-breathing pt-32 hero-gradient-bg">
        {/* Content */}
      </section>
      {/* Additional sections */}
      <Footer />
    </main>
  );
}
```

**Key files:**
- `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/page.tsx` - Homepage
- `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/capabilities/page.tsx` - Capabilities page (good reference for CV)
- `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/2l/page.tsx` - 2L page

### 2. Navigation Structure

**File:** `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/components/Navigation.tsx`

The Navigation component uses a `navItems` array to define links:

```tsx
const navItems: NavItem[] = [
  { label: "Work", href: "/#portfolio" },
  { label: "Process", href: "/#how-i-work" },
  { label: "2L", href: "/2l" },
  { label: "Capabilities", href: "/capabilities" },
  { label: "Contact", href: "/#contact" },
];
```

**Important:** The CV page should NOT be added to this array. The route will exist but remain hidden from navigation.

### 3. Footer Structure

**File:** `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/components/Footer.tsx`

The Footer component is minimal and uses a scroll-reveal animation:

```tsx
export function Footer() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <footer ref={ref} className={`py-12 border-t border-white/5 ...`}>
      <div className="container-content">
        <p className="text-center text-slate-500 text-sm mb-1">
          Ahiya - Systems Architect
        </p>
        <p className="text-center text-slate-600 text-xs">
          2025
        </p>
      </div>
    </footer>
  );
}
```

**Recommendation for availability signal:** Add a subtle link above the copyright line:

```tsx
<p className="text-center text-slate-600 text-xs mb-2">
  <a href="/cv" className="hover:text-slate-500 transition-colors">
    Select part-time availability for systems roles.
  </a>
</p>
```

### 4. Design System

**File:** `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/globals.css`

#### Colors
- Background: `#0a0f1a` (near-black blue)
- Text primary: `#f8fafc` (slate-50)
- Text secondary: `#cbd5e1` (slate-300)
- Text muted: `#64748b` (slate-500)
- Accent: `#a78bfa` (purple-400)
- Accent pink: `#f472b6` (pink-400)

#### Typography Classes
- `.display-xl` - Hero headlines (Crimson Text, clamp 2.5-4rem)
- `.display-lg` - Section headlines (Crimson Text, clamp 2-3rem)
- `.heading-xl` - Large headings (Inter, clamp 1.5-2rem)
- `.heading-lg` - Medium headings (Inter, clamp 1.25-1.5rem)
- `.body-xl` - Large body text (Inter, clamp 1.125-1.25rem)
- `.body-lg` - Standard body (Inter, clamp 1-1.125rem)
- `.text-gentle` - Gradient text (purple to pink)

#### Layout Classes
- `.container-wide` - 1200px max-width
- `.container-content` - 800px max-width (ideal for CV)
- `.container-narrow` - 600px max-width
- `.section-breathing` - 6rem vertical padding

#### Component Classes
- `.contemplative-card` - Glassmorphism card with hover lift
- `.gentle-button` - Primary button style
- `.hero-gradient-bg` - Animated gradient background

### 5. PDF Generation Pattern

**File:** `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/scripts/generate-capabilities-pdf.tsx`

The existing PDF generator uses `@react-pdf/renderer` (already installed):

```tsx
import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
  renderToFile,
} from '@react-pdf/renderer';

// Define styles
const styles = StyleSheet.create({
  page: { padding: 40, backgroundColor: '#ffffff', fontFamily: 'Helvetica' },
  // ... more styles
});

// Document component
const CapabilitiesDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Content */}
    </Page>
  </Document>
);

// Generate function
async function generatePDF() {
  const outputPath = path.join(process.cwd(), 'public', 'ahiya-capabilities.pdf');
  await renderToFile(<CapabilitiesDocument />, outputPath);
}
```

**Build integration:** Package.json has:
```json
"scripts": {
  "generate:pdf": "npx tsx scripts/generate-capabilities-pdf.tsx",
  "prebuild": "npm run generate:pdf",
}
```

**Recommendation:** Create `/scripts/generate-cv-pdf.tsx` following the same pattern and add to prebuild.

### 6. Robots.txt / SEO Configuration

**Current state:** No `robots.txt` or `app/robots.ts` file exists.

**Recommendation:** Create `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/robots.ts`:

```tsx
import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/cv',
    },
    sitemap: 'https://ahiya.xyz/sitemap.xml',
  };
}
```

Additionally, add page-level metadata to the CV page:

```tsx
export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};
```

### 7. Component Dependencies

Components used across pages that the CV page will likely need:

| Component | Path | Purpose |
|-----------|------|---------|
| Navigation | `/app/components/Navigation.tsx` | Fixed top navigation |
| Footer | `/app/components/Footer.tsx` | Page footer |
| SectionHeading | `/app/components/SectionHeading.tsx` | Section title + description |

## Patterns Identified

### Pattern 1: Client-Side Hydration Guard

**Description:** All pages use a mounted state to prevent hydration mismatches.

**Use Case:** Any page with interactive elements or animations.

**Example:**
```tsx
const [mounted, setMounted] = useState(false);
useEffect(() => { setMounted(true); }, []);
if (!mounted) return <LoadingSpinner />;
```

**Recommendation:** Use this pattern for the CV page.

### Pattern 2: Section Animation Classes

**Description:** CSS-only staggered animations using `.section-reveal` classes.

**Use Case:** Sequential content reveals on page load.

**Example:**
```tsx
<section className="section-breathing section-reveal section-reveal-1">
<section className="section-breathing section-reveal section-reveal-2">
```

**Recommendation:** Use for CV sections (vision, proof, scope, contact).

### Pattern 3: Contemplative Card Styling

**Description:** Glassmorphism cards with hover effects.

**Use Case:** Feature cards, content blocks.

**Example:**
```tsx
<div className="contemplative-card p-6 md:p-8">
  {/* Content */}
</div>
```

**Recommendation:** Use sparingly for CV - focus on typography.

## Complexity Assessment

### Low Complexity Areas

| Task | Effort | Notes |
|------|--------|-------|
| CV page route creation | 0.5h | Simple page.tsx file |
| Footer availability link | 0.25h | Single line addition |
| robots.ts creation | 0.25h | Standard Next.js pattern |
| Page-level noindex meta | 0.1h | Single metadata export |

### Medium Complexity Areas

| Task | Effort | Notes |
|------|--------|-------|
| CV page content & styling | 2h | Multiple sections, responsive |
| Availability status toggle | 0.5h | Config constant or env var |
| PDF download link | 0.25h | Simple anchor tag |

### High Complexity Areas

| Task | Effort | Notes |
|------|--------|-------|
| CV PDF generation script | 2-3h | New script following capabilities pattern |

## Technology Recommendations

### Primary Stack (Already in Use)

- **Framework:** Next.js 16 with App Router
- **Styling:** Tailwind CSS v4
- **PDF Generation:** @react-pdf/renderer (installed)
- **Icons:** lucide-react (installed)

### No New Dependencies Required

The existing stack fully supports all CV page requirements.

## Integration Points

### Internal Integrations

| Component | Integration | Notes |
|-----------|-------------|-------|
| Footer.tsx | Availability link | Add single line, link to /cv |
| package.json | PDF build script | Add generate:cv-pdf command |
| prebuild script | CV PDF generation | Chain with capabilities PDF |

### Configuration Points

| Config | Location | Purpose |
|--------|----------|---------|
| Availability status | `/app/cv/config.ts` or env | Toggle open/closed |
| Contact email | Same config | Display on page and PDF |

## Risks & Challenges

### Technical Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| PDF styling mismatch | Low | Follow capabilities PDF pattern exactly |
| Hydration errors | Low | Use mounted guard pattern |

### Complexity Risks

| Risk | Likelihood | Notes |
|------|------------|-------|
| PDF generation fails on Vercel | Low | Already working for capabilities |
| Footer change breaks layout | Very Low | Simple text addition |

## Recommendations for Planner

1. **Single Builder Approach:** This implementation is straightforward enough for a single builder. No need to split across multiple builders.

2. **Start with Page, End with PDF:** Build the CV page first to finalize content, then create the PDF generator using the same content structure.

3. **Config-First Availability:** Use a simple config constant rather than environment variable for availability status - it changes rarely and a code deploy is acceptable.

4. **Reuse Typography Classes:** The CV page should be typography-forward. Use `.display-xl`, `.heading-lg`, `.body-lg` classes extensively rather than custom styling.

5. **Minimal Animation:** Per vision, use minimal animation. Suggest only `.section-reveal` for initial load, no hover animations on content.

## Resource Map

### Critical Files to Create

| File | Purpose |
|------|---------|
| `/app/cv/page.tsx` | Main CV page component |
| `/app/cv/config.ts` | Availability status and contact info |
| `/app/robots.ts` | SEO exclusion configuration |
| `/scripts/generate-cv-pdf.tsx` | PDF generation script |

### Files to Modify

| File | Change |
|------|--------|
| `/app/components/Footer.tsx` | Add availability signal link |
| `/package.json` | Add generate:cv-pdf script |

### Reference Files

| File | Use For |
|------|---------|
| `/app/capabilities/page.tsx` | Page structure reference |
| `/scripts/generate-capabilities-pdf.tsx` | PDF generator reference |
| `/app/globals.css` | CSS classes reference |

## Questions for Planner

1. **Availability signal placement:** The vision mentions "homepage footer" - should this link appear on ALL pages' footers, or only the homepage? Currently Footer.tsx is shared across all pages.

2. **PDF filename:** Should it be `ahiya-cv.pdf` (per vision) or something more descriptive like `ahiya-butman-systems-cv.pdf`?

3. **Availability toggle implementation:** Vision suggests config constant in code. Should we create a dedicated config file (`/app/cv/config.ts`) or use environment variables for potential future admin UI?

---

**Report Generated:** 2025-12-08
**Explorer:** Master Explorer 1
**Focus Area:** Architecture & Structure Analysis

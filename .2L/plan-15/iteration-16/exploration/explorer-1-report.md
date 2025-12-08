# Explorer 1 Report: Existing Code Patterns & File Analysis

## Executive Summary

Comprehensive analysis of existing files that builders will reference and modify. The codebase follows consistent patterns with a "Sacred Potato CSS" design system, client-side components with hydration handling, and a well-established PDF generation pipeline. All required patterns exist and are well-documented below for direct builder reference.

## Discoveries

### File Structure for CV Implementation

```
Existing Files to Modify:
- /home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/components/Footer.tsx (add availability signal)
- /home/ahiya/Ahiya/2L/Prod/ahiya-xyz/package.json (add CV PDF script)

New Files to Create:
- /home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/cv/page.tsx
- /home/ahiya/Ahiya/2L/Prod/ahiya-xyz/lib/cv-config.ts
- /home/ahiya/Ahiya/2L/Prod/ahiya-xyz/scripts/generate-cv-pdf.tsx
- /home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/robots.ts
- /home/ahiya/Ahiya/2L/Prod/ahiya-xyz/public/ahiya-cv.pdf (generated)
```

### Design System Already Exists

No new CSS needed. All classes are in `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/globals.css`:
- `display-lg`, `display-xl` - Display typography (lines 124-138)
- `heading-xl`, `heading-lg` - Heading typography (lines 140-151)
- `body-xl`, `body-lg` - Body typography (lines 153-163)
- `section-breathing` - 6rem padding (line 195-198)
- `container-content` - 800px max-width (lines 183-187)
- `container-narrow` - 600px max-width (lines 189-193)
- `contemplative-card` - Glass-morphism cards (lines 69-78)
- `text-gentle` - Purple gradient text (lines 215-220)

## Patterns Identified

### Pattern 1: Page Component Structure (Capabilities Page Reference)

**File:** `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/capabilities/page.tsx`

**Structure:**
```typescript
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Navigation } from "@/app/components/Navigation";
import { Footer } from "@/app/components/Footer";
import { /* lucide icons */ } from "lucide-react";

export default function CapabilitiesPage() {
  const [mounted, setMounted] = useState<boolean>(false);

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

  // Data arrays defined here
  const data = [...];

  return (
    <main id="main-content" className="bg-[#0a0f1a] min-h-screen">
      <Navigation />
      {/* Sections with section-breathing and section-reveal classes */}
      <Footer />
    </main>
  );
}
```

**Key Points:**
- Uses `"use client"` directive
- Implements mounted state for hydration
- Returns loading spinner until mounted
- Main has `id="main-content"` for skip-link
- Background: `bg-[#0a0f1a]`
- Uses staggered reveal: `section-reveal section-reveal-1`, `section-reveal-2`, etc.

**CV Page DEVIATION:** No Navigation component (intentionally hidden). Uses custom minimal footer.

### Pattern 2: Footer Component Structure

**File:** `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/components/Footer.tsx`
**Lines:** 1-54

**Full Current Implementation:**
```typescript
"use client";

import React, { useEffect, useRef, useState } from "react";

// Custom hook for scroll-triggered fade-in
function useScrollReveal() {
  const ref = useRef<HTMLElement>(null);
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

export function Footer() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <footer
      ref={ref}
      className={`py-12 border-t border-white/5 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <div className="container-content">
        <p className="text-center text-slate-500 text-sm mb-1">
          Ahiya — Systems Architect
        </p>
        <p className="text-center text-slate-600 text-xs">
          2025
        </p>
      </div>
    </footer>
  );
}

export default Footer;
```

**Modification Point (Builder 2):** Add availability signal ABOVE the existing content:
```typescript
{/* NEW: Availability signal - add at line 44, inside container-content, before existing <p> tags */}
<Link 
  href="/cv" 
  className="block text-center text-slate-600 text-xs mb-3 hover:text-slate-500 transition-colors"
>
  Select part-time availability for systems roles.
</Link>
```

### Pattern 3: PDF Generator Structure

**File:** `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/scripts/generate-capabilities-pdf.tsx`
**Lines:** 1-313

**Complete Reference Pattern:**
```typescript
import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
  renderToFile,
} from '@react-pdf/renderer';
import path from 'path';

// Styles with StyleSheet.create()
const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: '#ffffff',
    fontFamily: 'Helvetica',
  },
  // ... more styles
});

// Data arrays
const data = [...];

// Document component
const DocumentComponent = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Content */}
    </Page>
  </Document>
);

// Generate function
async function generatePDF() {
  const outputPath = path.join(process.cwd(), 'public', 'filename.pdf');
  console.log('Generating PDF...');
  await renderToFile(<DocumentComponent />, outputPath);
  console.log(`PDF generated successfully: ${outputPath}`);
}

generatePDF().catch((error) => {
  console.error('Failed to generate PDF:', error);
  process.exit(1);
});
```

**Key Style Properties from Capabilities PDF:**
- Font sizes: 24 (title), 12 (section title), 10-11 (body), 8-9 (small)
- Colors: `#1e293b` (dark text), `#64748b` (muted), `#7c3aed` (purple accent)
- Spacing: `marginBottom: 18` for sections, `paddingBottom: 15` for headers
- Border accent: `'2px solid #7c3aed'` for header

### Pattern 4: Package.json Scripts

**File:** `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/package.json`
**Lines 6-10:**

```json
"scripts": {
  "dev": "next dev --turbopack",
  "generate:pdf": "npx tsx scripts/generate-capabilities-pdf.tsx",
  "prebuild": "npm run generate:pdf",
  "build": "next build",
```

**Modification Required (Builder 3):**
```json
"scripts": {
  "dev": "next dev --turbopack",
  "generate:pdf": "npx tsx scripts/generate-capabilities-pdf.tsx",
  "generate:cv-pdf": "npx tsx scripts/generate-cv-pdf.tsx",
  "prebuild": "npm run generate:pdf && npm run generate:cv-pdf",
  "build": "next build",
```

### Pattern 5: Layout and Metadata

**File:** `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/layout.tsx`

**Font Variables:**
- `var(--font-inter)` - Sans-serif (body)
- `var(--font-crimson)` - Serif (display text)

**CV Page Metadata (Builder 1):**
```typescript
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CV | Ahiya Butman',
  description: 'Part-time systems collaboration availability.',
  robots: {
    index: false,
    follow: false,
  },
};
```

### Pattern 6: Section Reveal Animation

**File:** `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/globals.css`
**Lines 384-399:**

```css
.section-reveal {
  animation: fade-in-up 0.6s ease forwards;
  opacity: 0;
}

/* Staggered delays for sequential sections */
.section-reveal-1 { animation-delay: 0.1s; }
.section-reveal-2 { animation-delay: 0.2s; }
.section-reveal-3 { animation-delay: 0.3s; }
.section-reveal-4 { animation-delay: 0.4s; }
```

**Usage (CV page should use minimal animation - professional tone):**
```tsx
<section className="section-breathing section-reveal section-reveal-1">
```

## Integration Points

### CV Config Integration

**New File:** `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/lib/cv-config.ts`

```typescript
export const cvConfig = {
  availabilityStatus: 'open' as 'open' | 'closed',
  contactEmail: 'ahiya.butman@gmail.com',
} as const;
```

**Import in CV page:**
```typescript
import { cvConfig } from '@/lib/cv-config';
```

### Robots.ts Integration (NEW FILE)

**Create:** `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/robots.ts`

```typescript
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/cv', '/admin'],
    },
    sitemap: 'https://ahiya.xyz/sitemap.xml',
  };
}
```

### Navigation Exclusion

**CV page does NOT import Navigation.** This is intentional per vision.md requirements.

## Complexity Assessment

### Low Complexity Areas

- **Footer Modification:** Simple 3-line addition to existing component
- **CV Config:** Single config file with 2 properties
- **Robots.ts:** Standard Next.js metadata route
- **Package.json Scripts:** Add 1 script, modify 1 existing

### Medium Complexity Areas

- **CV Page:** Multiple sections but following existing patterns exactly
- **PDF Generator:** Direct port of capabilities PDF with different content

### High Complexity Areas

None. All patterns are well-established in the codebase.

## Technology Recommendations

### Already Installed (No New Dependencies)

```json
"dependencies": {
  "@react-pdf/renderer": "^4.3.1",  // PDF generation
  "lucide-react": "^0.517.0",       // Icons
  "next": "^16.0.7",                // Framework
}
```

### TypeScript Path Alias

Use `@/*` for imports (configured in tsconfig.json line 27):
```typescript
import { Footer } from '@/app/components/Footer';
import { cvConfig } from '@/lib/cv-config';
```

## Exact Code Snippets for Builders

### Builder 1: CV Page Template

```typescript
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Mail, Download, ExternalLink, Check } from "lucide-react";
import { cvConfig } from "@/lib/cv-config";

export default function CVPage() {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#0a0f1a] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-purple-400/30 border-t-purple-400 rounded-full animate-spin" />
      </div>
    );
  }

  const isOpen = cvConfig.availabilityStatus === 'open';

  return (
    <main id="main-content" className="bg-[#0a0f1a] min-h-screen">
      {/* Vision Section */}
      <section className="section-breathing pt-32">
        <div className="container-content">
          {/* Content here */}
        </div>
      </section>

      {/* Systems Proof Section */}
      <section className="section-breathing section-reveal section-reveal-1">
        {/* ... */}
      </section>

      {/* Minimal footer - just ahiya.xyz link */}
      <footer className="py-12 border-t border-white/5">
        <div className="container-content text-center">
          <Link 
            href="/" 
            className="text-slate-500 text-sm hover:text-slate-400 transition-colors"
          >
            ahiya.xyz
          </Link>
        </div>
      </footer>
    </main>
  );
}
```

### Builder 2: Footer Modification

**Modify lines 42-48 in Footer.tsx:**

```typescript
<div className="container-content">
  {/* NEW: Availability signal */}
  <Link 
    href="/cv" 
    className="block text-center text-slate-600 text-xs mb-3 hover:text-slate-500 transition-colors"
  >
    Select part-time availability for systems roles.
  </Link>
  
  {/* Existing content */}
  <p className="text-center text-slate-500 text-sm mb-1">
    Ahiya — Systems Architect
  </p>
  <p className="text-center text-slate-600 text-xs">
    2025
  </p>
</div>
```

**Required Import Addition:**
```typescript
import Link from "next/link";
```

### Builder 3: PDF Script Command

**Package.json modifications:**
```json
{
  "scripts": {
    "generate:cv-pdf": "npx tsx scripts/generate-cv-pdf.tsx",
    "prebuild": "npm run generate:pdf && npm run generate:cv-pdf"
  }
}
```

## Risks & Challenges

### Technical Risks

- **PDF Font Rendering:** @react-pdf/renderer uses Helvetica by default. Match capabilities PDF pattern exactly.
- **Hydration Mismatch:** Always use mounted state pattern (already established).

### Integration Risks

- **Footer Link Import:** Footer.tsx currently has no Link import. Builder 2 must add it.

## Recommendations for Planner

1. **Builder 1** should create lib/cv-config.ts FIRST, then cv/page.tsx - config is a dependency
2. **Builder 2** footer modification is isolated - can run in parallel with Builder 1
3. **Builder 3** should follow generate-capabilities-pdf.tsx structure EXACTLY - proven pattern
4. **Testing:** After all builders complete, verify:
   - `npm run generate:cv-pdf` works
   - `npm run prebuild` generates both PDFs
   - `/cv` renders without Navigation
   - Footer link appears on homepage

## Resource Map

### Critical Files to Read

| File | Purpose | Builder |
|------|---------|---------|
| `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/capabilities/page.tsx` | Page structure pattern | Builder 1 |
| `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/components/Footer.tsx` | Modification target | Builder 2 |
| `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/scripts/generate-capabilities-pdf.tsx` | PDF pattern | Builder 3 |
| `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/globals.css` | CSS classes | All |

### Critical Files to Create

| File | Builder |
|------|---------|
| `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/lib/cv-config.ts` | Builder 1 |
| `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/cv/page.tsx` | Builder 1 |
| `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/robots.ts` | Builder 2 |
| `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/scripts/generate-cv-pdf.tsx` | Builder 3 |

## Questions for Planner

1. Should Builder 2 also handle the page-level noindex metadata, or should that be Builder 1's responsibility with the page file?
2. Is the availability signal link styled correctly as understated (text-slate-600 matching copyright year)?

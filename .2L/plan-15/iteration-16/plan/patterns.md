# Code Patterns & Conventions

## File Structure

```
/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/
├── app/
│   ├── cv/
│   │   └── page.tsx              # NEW: CV page (Builder 1)
│   ├── components/
│   │   └── Footer.tsx            # MODIFY: Add availability signal (Builder 2)
│   └── robots.ts                 # NEW: Robots metadata (Builder 2)
├── lib/
│   └── cv-config.ts              # NEW: CV configuration (Builder 1)
├── scripts/
│   └── generate-cv-pdf.tsx       # NEW: PDF generator (Builder 3)
├── public/
│   └── ahiya-cv.pdf              # GENERATED: Output PDF
└── package.json                  # MODIFY: Add scripts (Builder 3)
```

## Naming Conventions

- Components: PascalCase (`CVPage`)
- Files: kebab-case for pages (`page.tsx`), camelCase for config (`cv-config.ts`)
- Types: PascalCase (`CVConfig`, `AvailabilityStatus`)
- Functions: camelCase (`getAvailabilityText()`)
- CSS classes: kebab-case (`section-breathing`)

---

## Pattern 1: Client-Side Page with Hydration Guard

**When to use:** All pages that use client-side state or effects.

**Reference file:** `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/capabilities/page.tsx`

```typescript
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Mail, Download } from "lucide-react";
import { cvConfig } from "@/lib/cv-config";

export default function CVPage() {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Hydration guard - prevents SSR/client mismatch
  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#0a0f1a] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-purple-400/30 border-t-purple-400 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <main id="main-content" className="bg-[#0a0f1a] min-h-screen">
      {/* Content sections here */}
    </main>
  );
}
```

**Key points:**
- Always use `"use client"` directive
- Implement `mounted` state with `useState(false)`
- Set `mounted` to `true` in `useEffect`
- Return loading spinner until mounted
- Main element has `id="main-content"` for accessibility

---

## Pattern 2: Page Metadata with noindex

**When to use:** Pages that should not be indexed by search engines.

```typescript
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CV | Ahiya Butman",
  description: "Part-time systems collaboration availability.",
  robots: {
    index: false,
    follow: false,
  },
};
```

**Note:** This goes OUTSIDE the component function, at the top level of the file. For client components, create a separate `layout.tsx` OR use `app/robots.ts` for site-wide control.

**For client components:** Use `app/robots.ts` instead (Builder 2's responsibility).

---

## Pattern 3: CV Config Structure

**File:** `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/lib/cv-config.ts`

```typescript
/**
 * CV Page Configuration
 *
 * This config controls the hidden /cv page content and availability status.
 * Change availabilityStatus to 'closed' when not accepting new engagements.
 */

export type AvailabilityStatus = "open" | "closed";

export interface SystemProject {
  name: string;
  description: string;
  link?: string;
  external?: boolean;
}

export interface CVConfig {
  availabilityStatus: AvailabilityStatus;
  contactEmail: string;
  emailSubject: string;
  systems: SystemProject[];
  copy: {
    headline: string;
    subheadline: string;
    philosophy: string;
    operationalScope: string[];
    availabilityOpen: string;
    availabilityClosed: string;
    contactSupportText: string;
    pdfDownloadText: string;
    footerSignal: string;
  };
}

export const cvConfig: CVConfig = {
  availabilityStatus: "open",

  contactEmail: "ahiya.butman@gmail.com",
  emailSubject: "Part-time Collaboration Inquiry",

  systems: [
    {
      name: "2L",
      description:
        "AI agent orchestration framework for parallel software delivery",
      link: "/2l",
    },
    {
      name: "AI Research Pipeline",
      description:
        "Factorial design engine for controlled academic data generation",
      link: "/projects/ai-research-pipeline",
    },
    {
      name: "StatViz",
      description: "B2B statistical reports platform with Hebrew RTL support",
      link: "https://statviz.xyz",
      external: true,
    },
    {
      name: "SelahReach",
      description: "Intelligent outreach automation with Claude Code integration",
      link: "/projects/selahreach",
    },
  ],

  copy: {
    headline: "Systems-level AI builder.",
    subheadline:
      "I design and ship production-grade software where agents, data pipelines, and execution loops converge. Clarity in architecture. Precision in delivery.",
    philosophy:
      "Independent by default. Selective collaboration when alignment is clear.",
    operationalScope: [
      "Part-time engagements only",
      "Remote-first, timezone-flexible",
      "Systems, agents, AI pipelines, automation",
    ],
    availabilityOpen: "Open to part-time collaboration",
    availabilityClosed: "Currently closed to new engagements",
    contactSupportText: "One channel. Direct communication.",
    pdfDownloadText:
      "For formal internal processes, a one-page PDF version is available.",
    footerSignal: "Select part-time availability for systems roles.",
  },
};

export function getAvailabilityText(config: CVConfig = cvConfig): string {
  return config.availabilityStatus === "open"
    ? config.copy.availabilityOpen
    : config.copy.availabilityClosed;
}

export function getMailtoUrl(config: CVConfig = cvConfig): string {
  const subject = encodeURIComponent(config.emailSubject);
  return `mailto:${config.contactEmail}?subject=${subject}`;
}

export default cvConfig;
```

---

## Pattern 4: Availability Status Indicator

**When to use:** Display current availability with visual indicator.

```typescript
const isOpen = cvConfig.availabilityStatus === "open";

<div className="flex items-center justify-center gap-3">
  <span
    className={`w-2.5 h-2.5 rounded-full ${
      isOpen ? "bg-emerald-500" : "bg-slate-500"
    }`}
    aria-hidden="true"
  />
  <span className="text-slate-300">
    {isOpen ? cvConfig.copy.availabilityOpen : cvConfig.copy.availabilityClosed}
  </span>
</div>
```

**Key points:**
- Use `aria-hidden="true"` on decorative indicator
- Green (`bg-emerald-500`) for open
- Gray (`bg-slate-500`) for closed
- Read text from config for consistency

---

## Pattern 5: Section Structure

**When to use:** Each content section on the CV page.

```typescript
{/* Section with breathing room */}
<section className="section-breathing">
  <div className="container-content">
    {/* Optional section header */}
    <p className="text-slate-500 text-xs tracking-[0.2em] uppercase text-center mb-8">
      SYSTEMS
    </p>

    {/* Section content */}
    <div className="space-y-4">
      {/* Content items */}
    </div>
  </div>
</section>
```

**Key points:**
- `section-breathing` provides 6rem vertical padding
- `container-content` constrains width to 800px
- Section headers use uppercase with letter-spacing
- First section uses `pt-32` instead of `section-breathing` for top padding

---

## Pattern 6: Systems Proof List

**When to use:** Display project list with optional links.

```typescript
<div className="space-y-6">
  {cvConfig.systems.map((project, index) => (
    <div key={index} className="text-center">
      {project.link ? (
        <a
          href={project.link}
          target={project.external ? "_blank" : undefined}
          rel={project.external ? "noopener noreferrer" : undefined}
          className="text-white font-medium hover:text-purple-400 transition-colors"
        >
          {project.name}
          {project.external && (
            <ExternalLink className="inline w-3 h-3 ml-1 opacity-50" />
          )}
        </a>
      ) : (
        <span className="text-white font-medium">{project.name}</span>
      )}
      <p className="text-slate-400 text-sm mt-1">{project.description}</p>
    </div>
  ))}
</div>
```

---

## Pattern 7: Contact Section with Mailto

**When to use:** Contact section with pre-filled email subject.

```typescript
<div className="text-center">
  <h3 className="heading-lg text-white mb-4">Contact</h3>
  <a
    href={getMailtoUrl()}
    className="text-xl text-purple-400 hover:text-purple-300 transition-colors"
  >
    {cvConfig.contactEmail}
  </a>
  <p className="text-slate-600 text-sm mt-3">
    {cvConfig.copy.contactSupportText}
  </p>
</div>
```

**Note:** Use `getMailtoUrl()` helper which encodes the subject line.

---

## Pattern 8: PDF Download Link

**When to use:** Understated link to downloadable PDF.

```typescript
<p className="text-center text-slate-600 text-xs mt-12">
  <a
    href="/ahiya-cv.pdf"
    download
    className="hover:text-slate-500 transition-colors underline"
  >
    {cvConfig.copy.pdfDownloadText}
  </a>
</p>
```

**Key points:**
- Use `download` attribute for direct download
- Understated styling (`text-slate-600 text-xs`)
- Underline for discoverability

---

## Pattern 9: Minimal CV Page Footer

**When to use:** Footer specifically for the CV page (not main site footer).

```typescript
<footer className="py-8 border-t border-white/5">
  <div className="container-content text-center">
    <Link
      href="/"
      className="text-slate-600 text-xs hover:text-slate-500 transition-colors"
    >
      ahiya.xyz
    </Link>
  </div>
</footer>
```

**Key points:**
- Simpler than main Footer component
- Just a link back to homepage
- No availability signal (visitor is already on CV page)

---

## Pattern 10: Footer Modification (Main Site)

**When to use:** Adding availability signal to main site footer.

**Current Footer.tsx (lines 41-48):**
```typescript
<div className="container-content">
  <p className="text-center text-slate-500 text-sm mb-1">
    Ahiya - Systems Architect
  </p>
  <p className="text-center text-slate-600 text-xs">
    2025
  </p>
</div>
```

**Modified Footer.tsx:**
```typescript
import Link from "next/link";  // ADD THIS IMPORT

// ... inside the component ...

<div className="container-content">
  {/* NEW: Availability signal */}
  <Link
    href="/cv"
    className="block text-center text-slate-600 text-xs mb-3 hover:text-slate-500 transition-colors"
  >
    Select part-time availability for systems roles.
  </Link>

  {/* Existing content unchanged */}
  <p className="text-center text-slate-500 text-sm mb-1">
    Ahiya - Systems Architect
  </p>
  <p className="text-center text-slate-600 text-xs">
    2025
  </p>
</div>
```

---

## Pattern 11: Robots.ts Metadata Route

**When to use:** Controlling search engine indexing.

**File:** `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/robots.ts`

```typescript
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/cv", "/admin"],
    },
    sitemap: "https://ahiya.xyz/sitemap.xml",
  };
}
```

**Key points:**
- Export default function named `robots`
- Return `MetadataRoute.Robots` type
- Include existing /admin disallow
- Add /cv to disallow list

---

## Pattern 12: PDF Generator Script

**Reference:** `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/scripts/generate-capabilities-pdf.tsx`

```typescript
import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  renderToFile,
} from "@react-pdf/renderer";
import path from "path";
import { cvConfig } from "../lib/cv-config";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: "#ffffff",
    fontFamily: "Helvetica",
  },
  header: {
    marginBottom: 25,
    borderBottom: "2px solid #7c3aed",
    paddingBottom: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1e293b",
  },
  subtitle: {
    fontSize: 11,
    color: "#64748b",
    marginTop: 3,
  },
  section: {
    marginBottom: 18,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#7c3aed",
    marginBottom: 10,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  bodyText: {
    fontSize: 10,
    color: "#334155",
    lineHeight: 1.5,
  },
  // ... additional styles
});

const CVDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Ahiya Butman</Text>
        <Text style={styles.subtitle}>{cvConfig.copy.headline}</Text>
      </View>

      {/* Sections */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Vision</Text>
        <Text style={styles.bodyText}>{cvConfig.copy.subheadline}</Text>
      </View>

      {/* ... more sections ... */}
    </Page>
  </Document>
);

async function generatePDF() {
  const outputPath = path.join(process.cwd(), "public", "ahiya-cv.pdf");
  console.log("Generating CV PDF...");
  await renderToFile(<CVDocument />, outputPath);
  console.log(`PDF generated successfully: ${outputPath}`);
}

generatePDF().catch((error) => {
  console.error("Failed to generate PDF:", error);
  process.exit(1);
});
```

**Key points:**
- Import config from `../lib/cv-config` (relative path for scripts)
- Use `renderToFile()` to generate static file
- Output to `public/ahiya-cv.pdf`
- Include error handling with process.exit(1)

---

## Import Order Convention

```typescript
// 1. React and framework
"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Metadata } from "next";

// 2. Third-party libraries
import { Mail, Download, ExternalLink } from "lucide-react";

// 3. Local imports (using @/* alias)
import { cvConfig, getMailtoUrl } from "@/lib/cv-config";
import { Footer } from "@/app/components/Footer";
```

---

## Code Quality Standards

- TypeScript strict mode (all types explicit)
- No `any` types
- Use template literals for dynamic classes
- Accessibility: `aria-hidden` on decorative elements
- Semantic HTML: `main`, `section`, `footer`
- Consistent spacing with Tailwind classes

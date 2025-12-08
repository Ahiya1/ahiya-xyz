# Builder Task Breakdown

## Overview

3 primary builders working with clear boundaries:
- Builder 1: Core CV page and config (foundation)
- Builder 2: Footer and SEO integration (parallel)
- Builder 3: PDF generator (depends on Builder 1)

## Builder Execution Order

### Parallel Group 1 (No dependencies)
- **Builder 1**: CV Page & Config
- **Builder 2**: Footer & SEO Integration

### Sequential (Depends on Builder 1)
- **Builder 3**: PDF Generator (needs cv-config.ts)

---

## Builder 1: CV Page & Config

### Scope

Create the central CV page and its configuration file. This builder owns all content and structure of the hidden CV interface.

### Complexity Estimate

**MEDIUM**

No split recommended. Clear, well-defined scope with established patterns.

### Success Criteria

- [ ] `lib/cv-config.ts` exports `cvConfig` with all content
- [ ] `lib/cv-config.ts` exports `CVConfig` type and helper functions
- [ ] `app/cv/page.tsx` renders with hydration guard
- [ ] Page has NO Navigation component
- [ ] Page has 5 sections: Vision, Systems, Scope, Availability, Contact
- [ ] Availability indicator shows green/gray based on config
- [ ] Contact email opens mailto with pre-filled subject
- [ ] PDF download link present and styled
- [ ] Minimal footer with "ahiya.xyz" link only
- [ ] Page uses existing CSS classes (no new CSS)

### Files to Create

| File | Purpose |
|------|---------|
| `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/lib/cv-config.ts` | Configuration and copy source of truth |
| `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/cv/page.tsx` | CV page component |

### Dependencies

**Depends on:** None (can start immediately)

**Blocks:** Builder 3 (PDF generator needs cv-config.ts)

### Implementation Notes

1. **Create config FIRST** - Builder 3 depends on it
2. **No Navigation import** - Intentionally isolated page
3. **Use custom footer** - Not the shared Footer component
4. **Hydration guard required** - Use mounted state pattern

### Patterns to Follow

Reference patterns from `patterns.md`:

- **Pattern 1:** Client-Side Page with Hydration Guard
- **Pattern 3:** CV Config Structure (copy exactly)
- **Pattern 4:** Availability Status Indicator
- **Pattern 5:** Section Structure
- **Pattern 6:** Systems Proof List
- **Pattern 7:** Contact Section with Mailto
- **Pattern 8:** PDF Download Link
- **Pattern 9:** Minimal CV Page Footer

### Full Content from Explorer 2

**Vision Section:**
```
Headline: "Systems-level AI builder."
Subheadline: "I design and ship production-grade software where agents, data pipelines, and execution loops converge. Clarity in architecture. Precision in delivery."
Philosophy: "Independent by default. Selective collaboration when alignment is clear."
```

**Systems (4 items):**
```
1. 2L - AI agent orchestration framework for parallel software delivery
2. AI Research Pipeline - Factorial design engine for controlled academic data generation
3. StatViz - B2B statistical reports platform with Hebrew RTL support
4. SelahReach - Intelligent outreach automation with Claude Code integration
```

**Scope (3 items):**
```
1. Part-time engagements only
2. Remote-first, timezone-flexible
3. Systems, agents, AI pipelines, automation
```

### Page Structure Guide

```
1. Vision Section (pt-32 for top padding)
   - display-lg headline
   - body-xl subheadline
   - body-lg philosophy

2. Systems Section (section-breathing)
   - "SYSTEMS" header
   - 4 project items from config

3. Scope Section (section-breathing)
   - "SCOPE" header
   - 3 constraint items as pills or list

4. Availability + Contact Section (section-breathing)
   - Status indicator (green/gray dot)
   - Contact heading
   - Email link with mailto
   - Support text
   - PDF download link

5. Minimal Footer
   - Just "ahiya.xyz" link back to home
```

### Testing Requirements

- Verify page loads at `/cv`
- Verify no 404 or hydration errors
- Verify availability indicator color matches config
- Verify mailto link has correct subject
- Verify PDF download link points to `/ahiya-cv.pdf`

---

## Builder 2: Footer & SEO Integration

### Scope

Modify the main site footer to add the availability signal link, and create the robots.ts file to exclude /cv from search indexing.

### Complexity Estimate

**LOW**

Simple, isolated changes with no dependencies.

### Success Criteria

- [ ] Footer.tsx imports Link from "next/link"
- [ ] Footer.tsx displays availability signal text ABOVE existing content
- [ ] Signal links to `/cv`
- [ ] Signal styled with `text-slate-600 text-xs` (matches year color)
- [ ] `app/robots.ts` created and exports robots function
- [ ] Robots disallow includes both `/cv` and `/admin`
- [ ] Sitemap URL is `https://ahiya.xyz/sitemap.xml`

### Files to Create

| File | Purpose |
|------|---------|
| `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/robots.ts` | Robots metadata route |

### Files to Modify

| File | Change |
|------|--------|
| `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/components/Footer.tsx` | Add Link import, add availability signal |

### Dependencies

**Depends on:** None (can start immediately)

**Blocks:** None

### Implementation Notes

1. **Footer modification is minimal** - Only add import and 5 lines of JSX
2. **Signal text must match exactly** - "Select part-time availability for systems roles."
3. **Keep existing footer content unchanged** - Only ADD new content above
4. **Robots.ts is standard Next.js pattern** - Use MetadataRoute type

### Patterns to Follow

Reference patterns from `patterns.md`:

- **Pattern 10:** Footer Modification (Main Site)
- **Pattern 11:** Robots.ts Metadata Route

### Exact Footer Modification

**Add import at top of file (after existing imports):**
```typescript
import Link from "next/link";
```

**Modify JSX inside `<div className="container-content">` (lines 41-48):**

Before:
```typescript
<div className="container-content">
  <p className="text-center text-slate-500 text-sm mb-1">
    Ahiya — Systems Architect
  </p>
  <p className="text-center text-slate-600 text-xs">
    2025
  </p>
</div>
```

After:
```typescript
<div className="container-content">
  <Link
    href="/cv"
    className="block text-center text-slate-600 text-xs mb-3 hover:text-slate-500 transition-colors"
  >
    Select part-time availability for systems roles.
  </Link>
  <p className="text-center text-slate-500 text-sm mb-1">
    Ahiya — Systems Architect
  </p>
  <p className="text-center text-slate-600 text-xs">
    2025
  </p>
</div>
```

### Exact robots.ts Content

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

### Testing Requirements

- Verify footer link appears on homepage
- Verify link navigates to /cv
- Verify link styling matches year text color
- Verify /robots.txt endpoint returns correct disallow rules

---

## Builder 3: PDF Generator

### Scope

Create the PDF generator script that produces a one-page CV PDF for download. Uses @react-pdf/renderer following the existing capabilities PDF pattern.

### Complexity Estimate

**MEDIUM**

Follows proven pattern from capabilities PDF. Main work is styling and content layout.

### Success Criteria

- [ ] `scripts/generate-cv-pdf.tsx` created
- [ ] Script imports cv-config for content
- [ ] PDF outputs to `public/ahiya-cv.pdf`
- [ ] PDF is one page, A4 size
- [ ] PDF includes: Header, Vision, Systems, Scope, Availability, Contact
- [ ] `npm run generate:cv-pdf` executes successfully
- [ ] `npm run prebuild` chains both PDF generators
- [ ] PDF style matches capabilities PDF aesthetic

### Files to Create

| File | Purpose |
|------|---------|
| `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/scripts/generate-cv-pdf.tsx` | PDF generator script |

### Files to Modify

| File | Change |
|------|--------|
| `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/package.json` | Add generate:cv-pdf script, update prebuild |

### Dependencies

**Depends on:** Builder 1 (needs `lib/cv-config.ts` for content)

**Blocks:** None

### Implementation Notes

1. **Wait for Builder 1** - Must have cv-config.ts before starting
2. **Follow capabilities PDF exactly** - Same style approach, different content
3. **Use relative import for config** - `../lib/cv-config` (not @/ alias in scripts)
4. **No logo in CV PDF** - Simpler header than capabilities PDF
5. **Keep to one page** - Adjust font sizes if needed

### Patterns to Follow

Reference patterns from `patterns.md`:

- **Pattern 12:** PDF Generator Script

### Reference File

Study `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/scripts/generate-capabilities-pdf.tsx` for:
- StyleSheet structure
- Document/Page/View/Text usage
- renderToFile pattern
- Error handling

### PDF Content Structure

```
HEADER
├── Name: "Ahiya Butman"
├── Title: "Systems-Level AI Builder"
├── Tagline: "Clarity in architecture. Precision in delivery."
└── Purple accent border

CONTACT ROW
├── ahiya.xyz
├── ahiya.butman@gmail.com
└── github.com/Ahiya1

VISION SECTION
└── Full subheadline + philosophy from config

SYSTEMS SECTION
├── 2L - description
├── AI Research Pipeline - description
├── StatViz - description
└── SelahReach - description

SCOPE SECTION
├── Part-time engagements only
├── Remote-first, timezone-flexible
└── Systems, agents, AI pipelines, automation

FOOTER
├── Availability status (from config)
└── Direct contact CTA
```

### Exact package.json Modifications

**Current scripts (lines 5-11):**
```json
"scripts": {
  "dev": "next dev --turbopack",
  "generate:pdf": "npx tsx scripts/generate-capabilities-pdf.tsx",
  "prebuild": "npm run generate:pdf",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
```

**Modified scripts:**
```json
"scripts": {
  "dev": "next dev --turbopack",
  "generate:pdf": "npx tsx scripts/generate-capabilities-pdf.tsx",
  "generate:cv-pdf": "npx tsx scripts/generate-cv-pdf.tsx",
  "prebuild": "npm run generate:pdf && npm run generate:cv-pdf",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
```

### PDF Style Values

Match capabilities PDF colors and spacing:

| Property | Value |
|----------|-------|
| Page padding | 40 |
| Page background | #ffffff |
| Font family | Helvetica |
| Title size | 24 |
| Section title size | 12 |
| Body text size | 10-11 |
| Small text size | 8-9 |
| Dark text color | #1e293b |
| Muted text color | #64748b |
| Purple accent | #7c3aed |
| Section margin | 18 |
| Header border | 2px solid #7c3aed |

### Testing Requirements

- Run `npm run generate:cv-pdf` - should complete without errors
- Verify `public/ahiya-cv.pdf` exists
- Open PDF and verify all sections present
- Verify PDF is one page
- Run `npm run prebuild` - should generate both PDFs
- Verify PDF content matches config values

---

## Integration Notes

### No File Conflicts

Each builder owns distinct files:
- Builder 1: `lib/cv-config.ts`, `app/cv/page.tsx`
- Builder 2: `app/robots.ts`, `app/components/Footer.tsx`
- Builder 3: `scripts/generate-cv-pdf.tsx`, `package.json`

### Shared Dependencies

Only Builder 3 depends on Builder 1's output (`cv-config.ts`).

### Verification After All Builders Complete

1. `npm run generate:cv-pdf` works
2. `npm run prebuild` generates both PDFs
3. `npm run build` completes successfully
4. `/cv` page renders correctly
5. Footer link appears on all pages using Footer component
6. `/robots.txt` shows correct disallow rules
7. PDF download from /cv page works

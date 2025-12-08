# Technology Stack

## No New Dependencies Required

This iteration uses existing packages only. No npm install needed.

## Packages Being Used

### @react-pdf/renderer (^4.3.1)

**Purpose:** Generate downloadable CV PDF

**Usage:** Builder 3 creates `scripts/generate-cv-pdf.tsx`

**Key imports:**
```typescript
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  renderToFile,
} from '@react-pdf/renderer';
```

**Notes:**
- Uses Helvetica font by default (no custom fonts)
- StyleSheet.create() for type-safe styles
- renderToFile() for server-side generation

### lucide-react (^0.517.0)

**Purpose:** Icons for CV page

**Usage:** Builder 1 uses for availability indicator and contact icons

**Icons needed:**
```typescript
import { Mail, Download, ExternalLink } from "lucide-react";
```

### next (^16.0.7)

**Purpose:** Framework, routing, metadata

**Key features used:**
- App Router for `/cv` page
- Metadata export for noindex
- MetadataRoute for robots.ts
- Link component for navigation

## Path Alias Configuration

All imports use the `@/*` path alias (configured in tsconfig.json):

```typescript
// Correct
import { cvConfig } from '@/lib/cv-config';
import { Footer } from '@/app/components/Footer';

// Incorrect - do not use relative paths
import { cvConfig } from '../../../lib/cv-config';
```

## TypeScript Types

### Defined in cv-config.ts

```typescript
export type AvailabilityStatus = 'open' | 'closed';

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
```

## Environment Variables

No new environment variables required for this iteration.

## Build Scripts

### Current (package.json)
```json
"generate:pdf": "npx tsx scripts/generate-capabilities-pdf.tsx",
"prebuild": "npm run generate:pdf",
```

### After Builder 3 Modifications
```json
"generate:pdf": "npx tsx scripts/generate-capabilities-pdf.tsx",
"generate:cv-pdf": "npx tsx scripts/generate-cv-pdf.tsx",
"prebuild": "npm run generate:pdf && npm run generate:cv-pdf",
```

## CSS Classes Available

All styling uses existing classes from `app/globals.css`:

| Class | Purpose | Usage |
|-------|---------|-------|
| `display-lg` | Large display text | CV headline |
| `body-xl` | Large body text | Subheadline |
| `body-lg` | Body text | Philosophy statement |
| `heading-lg` | Section headings | Contact heading |
| `section-breathing` | 6rem padding | Section spacing |
| `container-content` | 800px max-width | Content wrapper |
| `contemplative-card` | Glass-morphism | Optional for cards |

## Color Palette

Consistent with site design system:

| Color | CSS Class/Value | Usage |
|-------|-----------------|-------|
| Background | `bg-[#0a0f1a]` | Page background |
| White | `text-white` | Headlines |
| Slate 300 | `text-slate-300` | Body text |
| Slate 400 | `text-slate-400` | Secondary text |
| Slate 500 | `text-slate-500` | Muted text |
| Slate 600 | `text-slate-600` | Very muted text |
| Purple 400 | `text-purple-400` | Accent/links |
| Emerald 500 | `bg-emerald-500` | Open status indicator |

## PDF Color Values

For StyleSheet in PDF generator:

| Purpose | Hex Value |
|---------|-----------|
| Dark text | `#1e293b` |
| Muted text | `#64748b` |
| Purple accent | `#7c3aed` |
| Light border | `#e2e8f0` |
| Light background | `#f1f5f9` |

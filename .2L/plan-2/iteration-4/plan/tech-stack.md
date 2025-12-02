# Technology Stack

## Overview

This iteration requires **no new dependencies**. All work uses existing technologies already in the codebase.

## Core Framework

**Decision:** Next.js 15 with App Router

**Rationale:**
- Already used throughout the project
- App Router provides file-based routing for new pages
- Static generation for optimal performance

**Key Files:**
- New pages go in `app/projects/{project-name}/page.tsx`
- Follow existing patterns from `app/soul/blueprint/` pages

## Frontend

**Decision:** React 19 + TypeScript + Tailwind CSS

**UI Components:** Custom components using existing CSS utility classes from `globals.css`

**Styling:** Tailwind CSS with custom contemplative design system classes

**Rationale:**
- Consistent with existing codebase
- No learning curve for builders
- All patterns established in blueprint pages

## Key File Locations

### Files to Modify

| File | Path | Purpose |
|------|------|---------|
| PortfolioCard.tsx | `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/components/PortfolioCard.tsx` | Add `detailUrl` to interface, wrap card in Link |
| portfolio.ts | `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/data/portfolio.ts` | Fix URLs, add `detailUrl` values, update descriptions |

### Files to Create

| File | Path | Purpose |
|------|------|---------|
| Mirror of Dreams | `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/projects/mirror-of-dreams/page.tsx` | Project detail page |
| Wealth | `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/projects/wealth/page.tsx` | Project detail page |
| StatViz | `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/projects/statviz/page.tsx` | Project detail page |
| AI Research Pipeline | `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/projects/ai-research-pipeline/page.tsx` | Project detail page with sample narratives |

### Reference Files

| File | Path | Purpose |
|------|------|---------|
| Blueprint Template | `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/soul/blueprint/mirror-of-truth/page.tsx` | Pattern template for project pages |
| globals.css | `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/globals.css` | CSS utility classes |

## Dependencies Overview

No new packages needed. Existing dependencies used:

| Package | Purpose |
|---------|---------|
| next | Framework, routing, Link component, Image component |
| react | UI library |
| lucide-react | Icons (ExternalLink) |

## Required Imports for Project Pages

```typescript
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
```

## Environment Variables

**No new environment variables required.**

All project detail pages are static content with external links.

## Build & Deploy

**Build command:** `npm run build`

**Deployment target:** Existing platform (Vercel)

**Validation:**
1. `npm run build` - must pass without errors
2. `npm run dev` - test all navigation paths locally

## Performance Targets

- First Contentful Paint: < 1s (static pages)
- Bundle size: Minimal increase (only new page content)
- No API calls required (static content)

## Security Considerations

- All external links use `target="_blank"` with `rel="noopener noreferrer"`
- No user input or form handling
- No authentication required for project pages

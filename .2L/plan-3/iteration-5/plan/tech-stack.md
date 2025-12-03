# Technology Stack

## Overview

No technology changes required for this iteration. All changes are content updates and use existing patterns.

## Core Framework

**Decision:** Next.js 14+ with App Router (existing)

**Rationale:**
- Already in use, no changes needed
- All new sections use existing component patterns

## Frontend

**Decision:** React with Tailwind CSS (existing)

**Rationale:**
- All CSS classes already defined in globals.css
- No new UI components needed

## Icons

**Decision:** Lucide React (existing)

**Required Icon Updates:**

### Builder 1 (Homepage)
Current imports in `app/page.tsx`:
```typescript
import { Zap, ArrowRight, Mail, Github, Code, Database, Bot, BarChart3 } from "lucide-react";
```

Updated imports needed:
```typescript
import { ArrowRight, Mail, Github, Code, Database, FlaskConical, Layers, Star } from "lucide-react";
```

**Changes:**
- **Remove:** `Zap` (badge removed), `Bot`, `BarChart3`
- **Add:** `FlaskConical` (AI Research Tools), `Layers` (Architecture), `Star` (testimonials)

### Builder 2 (Project Pages)
No icon changes needed - project pages don't use new icons.

## Styling

**Decision:** Existing globals.css classes (no changes)

**Key Classes Used:**
- Layout: `container-wide`, `container-content`, `container-narrow`, `section-breathing`
- Cards: `breathing-glass`, `contemplative-card`
- Typography: `display-xl`, `display-lg`, `heading-xl`, `heading-lg`, `body-xl`, `body-lg`
- Colors: `text-gentle`, `text-slate-300`, `text-slate-400`, `text-slate-500`

## Dependencies

No new dependencies required.

## Performance Targets

No changes - existing performance maintained:
- First Contentful Paint: < 1.5s
- Bundle size: No increase (removing icons, adding text)
- No new external resources

## Security Considerations

No security changes - all updates are static content.

---

**Tech Stack Status:** NO CHANGES REQUIRED

# Builder Task Breakdown

## Overview

**3 primary builders** will work in parallel after Builder 1 completes the foundation.

| Builder | Focus | Complexity | Est. Time |
|---------|-------|------------|-----------|
| Builder 1 | Data & Component Foundation | LOW | 30 min |
| Builder 2 | Mirror of Dreams & Wealth Pages | MEDIUM | 1 hour |
| Builder 3 | StatViz & AI Research Pipeline Pages | HIGH | 2 hours |

## Builder Assignment Strategy

1. **Builder 1 completes first** - Creates interface changes and data updates
2. **Builders 2 & 3 start after Builder 1** - Work on pages in parallel
3. All builders follow patterns from `patterns.md`
4. No file conflicts between builders

---

## Builder-1: Data & Component Foundation

### Scope

Update the PortfolioCard component and portfolio data to support detail page linking. This is the foundation that all other builders depend on.

### Complexity Estimate

**LOW**

Simple additive changes to existing files. No complex logic.

### Success Criteria

- [ ] `PortfolioProject` interface has new `detailUrl: string` field
- [ ] PortfolioCard wraps card in `Link` component pointing to `detailUrl`
- [ ] External link button has `onClick={(e) => e.stopPropagation()}`
- [ ] All 4 portfolio projects have correct `detailUrl` values
- [ ] Mirror of Dreams `liveUrl` corrected to `https://selahmirror.xyz`
- [ ] Wealth has `liveUrl`: `https://selahwealth.xyz`
- [ ] StatViz has `liveUrl`: `https://statviz.xyz`
- [ ] AI Research Pipeline has updated description (no `liveUrl`)
- [ ] TypeScript compiles without errors

### Files to Modify

| File | Path | Changes |
|------|------|---------|
| PortfolioCard.tsx | `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/components/PortfolioCard.tsx` | Add `detailUrl` to interface, wrap card in Link, add stopPropagation |
| portfolio.ts | `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/data/portfolio.ts` | Fix/add URLs, add `detailUrl` to all projects, update description |

### Dependencies

**Depends on:** Nothing (first task)
**Blocks:** Builder 2, Builder 3

### Implementation Notes

#### Task 1A: Update PortfolioCard.tsx Interface

Add `detailUrl: string` to the `PortfolioProject` interface (line ~14):

```typescript
export interface PortfolioProject {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  status: "live" | "development";
  liveUrl?: string;
  detailUrl: string;  // ADD THIS LINE
  techStack: string[];
}
```

#### Task 1B: Update PortfolioCard.tsx Component

1. Add import at top: `import Link from "next/link";`
2. Wrap the card `<div>` in `<Link href={project.detailUrl}>`
3. Add `cursor-pointer` to card's className
4. Add `onClick={(e) => e.stopPropagation()}` to the external link `<a>` tag

See `patterns.md` for complete updated component code.

#### Task 1C: Update portfolio.ts Data

Update all 4 projects:

1. **Mirror of Dreams:**
   - Fix `liveUrl`: `"https://selahmirror.xyz"` (was `mirror-of-truth.xyz`)
   - Add `detailUrl`: `"/projects/mirror-of-dreams"`

2. **Wealth:**
   - Add `liveUrl`: `"https://selahwealth.xyz"`
   - Add `detailUrl`: `"/projects/wealth"`

3. **StatViz:**
   - Add `liveUrl`: `"https://statviz.xyz"`
   - Add `detailUrl`: `"/projects/statviz"`

4. **AI Research Pipeline:**
   - NO `liveUrl` (keep undefined)
   - Add `detailUrl`: `"/projects/ai-research-pipeline"`
   - Update `description`: `"Factorial design research tool for generating culturally nuanced, emotionally authentic questionnaire responses at scale. Supports any research domain with precise demographic control."`

See `patterns.md` for complete updated data file.

### Testing Requirements

- Run `npm run build` to verify TypeScript compiles
- Check homepage portfolio cards still render correctly
- Verify clicking card navigates to detail URL (will 404 until pages created)
- Verify "Visit Site" button still works for external links

### Patterns to Follow

Reference patterns from `patterns.md`:
- Use "PortfolioCard Component Update Pattern" section
- Use "Portfolio Data Update Pattern" section

---

## Builder-2: Mirror of Dreams & Wealth Pages

### Scope

Create two standard project detail pages with similar structure. Both have live site links.

### Complexity Estimate

**MEDIUM**

Two similar pages with established patterns. Primarily content population.

### Success Criteria

- [ ] `/projects/mirror-of-dreams/page.tsx` exists and renders correctly
- [ ] `/projects/wealth/page.tsx` exists and renders correctly
- [ ] Both pages have correct "Visit Live Site" links
- [ ] Both pages have all 4 features from vision document
- [ ] Both pages have correct tech stacks
- [ ] Mobile responsive on both pages
- [ ] Build passes without errors

### Files to Create

| File | Path | Est. Lines |
|------|------|------------|
| Mirror of Dreams | `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/projects/mirror-of-dreams/page.tsx` | ~200 |
| Wealth | `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/projects/wealth/page.tsx` | ~200 |

### Dependencies

**Depends on:** Builder 1 (interface/data must exist)
**Blocks:** Nothing

### Implementation Notes

#### Task 2A: Create Mirror of Dreams Page

**File:** `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/projects/mirror-of-dreams/page.tsx`

**Content from Vision:**

```
Title: Mirror of Dreams
Subtitle: AI Reflection Tool
Status: Live
Live URL: https://selahmirror.xyz
Hero Icon: (mirror/reflection emoji)

Description:
Tiered AI-powered reflection platform with PayPal subscriptions. Users explore
dreams through 5 sacred questions and receive personalized insights. Features
subscription tiers (Free/Pro/Unlimited) with PayPal payment integration and
evolution tracking over time.

Tech Stack: Next.js, TypeScript, Claude API, PayPal, Supabase, tRPC

Features (4 total):
1. Subscription tiers (Free/Pro/Unlimited)
2. AI-powered personalized reflections
3. PayPal payment integration
4. Evolution tracking over time
```

Use the "Standard Project Page Template" from `patterns.md`.

#### Task 2B: Create Wealth Page

**File:** `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/projects/wealth/page.tsx`

**Content from Vision:**

```
Title: Wealth
Subtitle: Personal Finance SaaS
Status: Live
Live URL: https://selahwealth.xyz
Hero Icon: (finance/money emoji)

Description:
Complete financial tracking system with AI-powered categorization, Israeli bank
connections, budgeting, and goal tracking. Helps users understand their spending
patterns and make informed financial decisions with an intelligent advisor.

Tech Stack: Next.js, TypeScript, Prisma, PostgreSQL, Claude API, tRPC

Features (4 total):
1. Bank account sync (Israeli banks)
2. AI transaction categorization
3. Budget management with alerts
4. Financial advisor chat
```

Use the "Standard Project Page Template" from `patterns.md`.

### Testing Requirements

- Navigate to `/projects/mirror-of-dreams` - page renders
- Navigate to `/projects/wealth` - page renders
- "Visit Live Site" buttons open correct URLs in new tabs
- "Back to Portfolio" links work
- Pages look good on mobile (test with browser dev tools)
- Run `npm run build` - no errors

### Patterns to Follow

Reference patterns from `patterns.md`:
- Use "Standard Project Page Template" section
- Use CSS classes from "CSS Classes from globals.css" section
- Follow "Import Order Convention"

### Suggested Feature Icons

**Mirror of Dreams:**
- Feature 1 (Subscription tiers): Crown or star emoji
- Feature 2 (AI reflections): Sparkles or brain emoji
- Feature 3 (PayPal): Credit card or payment emoji
- Feature 4 (Evolution tracking): Chart or growth emoji

**Wealth:**
- Feature 1 (Bank sync): Bank or link emoji
- Feature 2 (AI categorization): Tag or folder emoji
- Feature 3 (Budget): Calculator or alert emoji
- Feature 4 (Advisor chat): Message or bot emoji

---

## Builder-3: StatViz & AI Research Pipeline Pages

### Scope

Create StatViz page (simple) and AI Research Pipeline page (complex with 5 sample narratives).

### Complexity Estimate

**HIGH**

StatViz is straightforward, but AI Research Pipeline requires:
- Tabbed interface for 5 narratives
- State management for active tab
- Large amount of content (5 full narratives)
- Different page structure (no external link, contact CTA)

### Success Criteria

- [ ] `/projects/statviz/page.tsx` exists and renders correctly
- [ ] `/projects/ai-research-pipeline/page.tsx` exists and renders correctly
- [ ] StatViz has correct "Visit Live Site" link
- [ ] AI Research Pipeline has "Contact for Access" button (mailto)
- [ ] AI Research Pipeline displays all 5 sample narratives
- [ ] Narrative tabs switch correctly
- [ ] Demographic profiles display correctly
- [ ] All content matches vision document exactly
- [ ] Mobile responsive on both pages
- [ ] Build passes without errors

### Files to Create

| File | Path | Est. Lines |
|------|------|------------|
| StatViz | `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/projects/statviz/page.tsx` | ~200 |
| AI Research Pipeline | `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/projects/ai-research-pipeline/page.tsx` | ~500 |

### Dependencies

**Depends on:** Builder 1 (interface/data must exist)
**Blocks:** Nothing

### Implementation Notes

#### Task 3A: Create StatViz Page

**File:** `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/projects/statviz/page.tsx`

**Content from Vision:**

```
Title: StatViz
Subtitle: Statistical Reports Platform
Status: Live
Live URL: https://statviz.xyz
Hero Icon: (chart/stats emoji)

Description:
Secure B2B platform for delivering interactive statistical reports to academic
students. Features password-protected access, admin panel for project management,
and full Hebrew RTL support for the Israeli market.

Tech Stack: Next.js, TypeScript, Prisma, PostgreSQL, JWT

Features (4 total):
1. Admin panel for project management
2. Password-protected student access
3. Interactive HTML reports + DOCX
4. Hebrew RTL support
```

Use the "Standard Project Page Template" from `patterns.md`.

#### Task 3B: Create AI Research Pipeline Page (COMPLEX)

**File:** `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/projects/ai-research-pipeline/page.tsx`

This page is significantly different from the others. Key differences:
- No `liveUrl` - use mailto link instead
- "Custom Solution" badge instead of "Live"
- Amber color theme instead of emerald
- 6 content sections (not 3)
- Tabbed interface for 5 sample narratives

**Page Sections (in order):**
1. Hero - with "Custom Solution" badge, tagline quote
2. The Challenge - bullet list of research challenges
3. The Solution - bullet list of AI capabilities
4. Sample Outputs - **CRITICAL** - tabbed interface with all 5 narratives
5. Technical Capabilities - bullet list
6. Use Cases - grid of use cases
7. Tech Stack - simple display
8. Contact CTA - mailto button

**Content from Vision:**

```
Title: AI Research Pipeline
Subtitle: Factorial Design Research Tool
Status: Custom Solution
Badge: "Custom Solution" (amber color)

Tagline: "Culturally nuanced, emotionally authentic research responses at scale"

Tech Stack: Next.js 15, TypeScript, React 19, Tailwind CSS

Contact: mailto:ahiya.butman@gmail.com
```

**The Challenge section:**
- Expensive and time-consuming data collection
- Difficulty reaching diverse demographic groups
- Inconsistent response quality across populations
- Limited ability to generate controlled factorial designs

**The Solution section:**
- Precise demographic control (age, location, religion, socioeconomic factors)
- Emotionally authentic first-person narratives
- Multiple distribution methods (random, equal, weighted)
- Bilingual support (English + Hebrew)
- Scalable from 100 to 10,000+ responses

**Technical Capabilities:**
- Factorial design variables (any combination)
- Output formats (structured data, narratives)
- Integration options (n8n workflows, API)
- Quality controls and validation

**Use Cases:**
- Academic research studies
- Market research and consumer insights
- UX research persona generation
- Content generation for diverse audiences
- Training data for ML models

**5 Sample Narratives (MUST USE EXACT TEXT FROM VISION.MD):**

See `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/.2L/plan-2/vision.md` lines 214-349 for complete narrative text.

Each narrative needs:
- `id`: unique identifier
- `title`: e.g., "Orthodox Jewish Basketball Player"
- `profile`: object with demographic fields
- `narrative`: full text (multiple paragraphs)

**Sample 1: Orthodox Jewish Basketball Player**
```typescript
{
  id: "orthodox-basketball",
  title: "Orthodox Jewish Basketball Player",
  profile: {
    age: "17-18 years old",
    sport: "Basketball",
    region: "South",
    citySize: "Large City",
    background: "Ultra-Orthodox Jewish",
    trainingHours: "16-18 hours/week",
    travelTime: "1+ hour each way",
    cost: "Few hundred shekels/month"
  },
  narrative: `I started playing basketball at 12, when my mother was looking for suitable physical activity for Orthodox girls...` // FULL TEXT FROM VISION.MD
}
```

Repeat for all 5 samples - copy exact text from vision.md.

### Testing Requirements

- Navigate to `/projects/statviz` - page renders
- Navigate to `/projects/ai-research-pipeline` - page renders
- StatViz "Visit Live Site" opens `https://statviz.xyz` in new tab
- AI Pipeline "Contact for Access" opens mailto
- All 5 narrative tabs work and switch content
- Demographic profiles display all 8 fields
- Narrative text displays with proper paragraph breaks
- Pages look good on mobile
- Run `npm run build` - no errors

### Patterns to Follow

Reference patterns from `patterns.md`:
- Use "Standard Project Page Template" for StatViz
- Use "AI Research Pipeline Page Template (Complex)" for AI Pipeline
- Use CSS classes from "CSS Classes from globals.css" section
- Follow "Import Order Convention"

### Potential Split Strategy

If AI Research Pipeline proves too complex, consider splitting:

**Foundation (Builder 3 creates first):**
- Basic page structure without sample narratives
- All sections except "Sample Outputs"
- Placeholder for narratives section

**Sub-builder 3A: Narrative Data**
- Create `sampleNarratives` array with all 5 narratives
- Verify all text matches vision.md exactly

**Sub-builder 3B: Narrative UI**
- Implement tabbed interface
- Connect to narrative data
- Test tab switching and responsive design

---

## Builder Execution Order

### Phase 1: Foundation (Must complete first)
- **Builder 1** - Data & Component Foundation

### Phase 2: Pages (Parallel after Phase 1)
- **Builder 2** - Mirror of Dreams & Wealth Pages
- **Builder 3** - StatViz & AI Research Pipeline Pages

### Integration Notes

1. **No file conflicts:** Each builder works on separate files
2. **Shared dependencies:** All pages import from `next/image`, `next/link`, `lucide-react`
3. **Consistent patterns:** All pages follow templates from `patterns.md`
4. **Testing sequence:**
   - Builder 1 finishes -> verify TypeScript compiles
   - Builders 2 & 3 finish -> verify all pages accessible
   - Final validation -> test all navigation paths

### Shared Files Requiring Coordination

| File | Modified By | Read By |
|------|-------------|---------|
| PortfolioCard.tsx | Builder 1 | All (interface type) |
| portfolio.ts | Builder 1 | Homepage |
| globals.css | None (read only) | All builders |

### Conflict Prevention

- Builder 1 must complete before Builders 2 & 3 start
- Builders 2 & 3 create files in different directories - no conflicts
- All builders use the same CSS classes - no style conflicts

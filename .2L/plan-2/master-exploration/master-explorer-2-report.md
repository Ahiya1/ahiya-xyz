# Master Explorer 2 Report: Dependencies & Risk Assessment

## Explorer ID
master-explorer-2

## Focus Area
Dependencies & Risk Assessment

## Vision Summary

Create 4 dedicated project detail pages (`/projects/mirror-of-dreams`, `/projects/wealth`, `/projects/statviz`, `/projects/ai-research-pipeline`) and fix portfolio link issues. The AI Research Pipeline page is the most complex, requiring 5 sample output showcases. Portfolio cards should link to detail pages rather than directly to live sites.

---

## Existing Patterns Analysis

### Component Patterns

#### 1. PortfolioCard Component (`/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/components/PortfolioCard.tsx`)
- **Interface:** `PortfolioProject` with fields: `id`, `title`, `subtitle`, `description`, `status`, `liveUrl?`, `techStack`
- **Pattern:** Glass-morphism card with hover effects
- **Styling Classes:** `bg-white/[0.04]`, `backdrop-blur-sm`, `border border-white/[0.08]`, `rounded-2xl`
- **Status Badge:** Uses emerald for "live", amber for "development"
- **MODIFICATION REQUIRED:** Interface needs new `detailUrl` field; click behavior needs to route to detail page

#### 2. Contemplative Card (CSS Class)
- **Defined in:** `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/globals.css`
- **Usage:** `contemplative-card` class for major content containers
- **Properties:** `bg-white/0.04`, `backdrop-filter: blur(20px)`, `border-radius: 16px`, hover transforms

#### 3. Gentle Button (CSS Class)
- **Defined in:** `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/globals.css`
- **Usage:** `gentle-button` class for CTAs
- **Properties:** Purple accent (`rgba(168, 85, 247)`), 12px border-radius, hover lift effect

#### 4. Breathing Glass (CSS Class)
- **Usage:** `breathing-glass` for subtle glass containers
- **Properties:** `bg-white/0.02`, `backdrop-filter: blur(10px)`

#### 5. Blueprint Page Pattern (`/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/soul/blueprint/mirror-of-truth/page.tsx`)
- **Structure:** "use client" directive, hero section, feature grids, tech architecture, philosophy, CTA
- **Components:** Uses Image from next/image, Link from next/link, lucide-react icons
- **Layout:** `container-content`, `container-narrow`, `container-wide` utility classes
- **Animations:** `animate-fade-in`, `animate-float`

### Typography Classes (from globals.css)
- `display-xl`, `display-lg` - Crimson font, large headings
- `heading-xl`, `heading-lg` - Inter font, medium headings
- `body-xl`, `body-lg` - Body text sizes
- `sacred-text` - Crimson italic, purple accent
- `text-gentle` - Gradient text effect

### Spacing Classes
- `section-breathing` - 6rem vertical padding (4rem on mobile)
- `spacing-gentle` (2rem), `spacing-comfortable` (3rem), `spacing-generous` (4rem)

### Data Model Pattern (`/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/data/portfolio.ts`)

**Current Structure:**
```typescript
interface PortfolioProject {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  status: "live" | "development";
  liveUrl?: string;
  techStack: string[];
}
```

**Required Changes:**
```typescript
interface PortfolioProject {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  status: "live" | "development";
  liveUrl?: string;
  detailUrl: string;  // NEW - required
  techStack: string[];
}
```

---

## Dependency Assessment

### Critical Dependencies

#### 1. Type System Extension
- **File:** `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/components/PortfolioCard.tsx`
- **Change:** Add `detailUrl: string` to `PortfolioProject` interface
- **Impact:** Affects type checking across entire portfolio system
- **Risk Level:** LOW - additive change, no breaking modifications

#### 2. Portfolio Data Update
- **File:** `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/data/portfolio.ts`
- **Change:** Add `detailUrl` to all 4 projects, fix Mirror of Dreams URL, update AI Research Pipeline description
- **Impact:** Immediate visual change on homepage portfolio section
- **Risk Level:** LOW - data-only change

#### 3. PortfolioCard Behavior Change
- **File:** `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/components/PortfolioCard.tsx`
- **Change:** Wrap card in Link to `detailUrl`, keep "Visit Site" button for `liveUrl`
- **Impact:** User flow changes from "click card -> external site" to "click card -> detail page"
- **Risk Level:** MEDIUM - changes user interaction pattern

#### 4. New Page Creation (4 pages)
- **Location:** `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/projects/`
- **Dependencies:** Must use existing component patterns, CSS classes, layout structure
- **Risk Level:** LOW - additive, no existing code modification

### Dependency Chain

```
1. Type Definition Update (PortfolioCard.tsx interface)
   |
   v
2. Portfolio Data Update (portfolio.ts)
   |
   v
3. PortfolioCard Component Update (link behavior)
   |
   v
4. Project Detail Pages Creation (can be parallel after 1-3)
   ├── /projects/mirror-of-dreams/page.tsx
   ├── /projects/wealth/page.tsx
   ├── /projects/statviz/page.tsx
   └── /projects/ai-research-pipeline/page.tsx (COMPLEX - 5 samples)
```

### Third-Party Dependencies

| Package | Version | Used For | Risk |
|---------|---------|----------|------|
| next | 15.3.4 | Framework, routing, Image | NONE - stable |
| react | 19.0.0 | Components | NONE - stable |
| lucide-react | 0.517.0 | Icons (ExternalLink, ArrowLeft) | NONE |
| tailwindcss | 4.1.10 | Styling | NONE |

**No new dependencies required.**

---

## Risk Identification

### Risk 1: Type Interface Breaking Change
- **Description:** Modifying `PortfolioProject` interface could break existing imports
- **Impact:** Build failure if not all usages updated
- **Probability:** LOW (only 2 files use this interface)
- **Mitigation:**
  - Make `detailUrl` required with immediate population in data file
  - Update interface and data in same commit
  - Run `npm run build` after each change

### Risk 2: Link Behavior User Confusion
- **Description:** Users expecting external site may click card and see detail page
- **Impact:** Minor UX friction
- **Probability:** LOW
- **Mitigation:**
  - Clear visual hierarchy: "Explore Project" vs "Visit Live Site" buttons
  - Add visual indicator on cards (arrow icon pointing to detail page)
  - Keep "Visit Site" button prominent on cards for projects with live URLs

### Risk 3: AI Research Pipeline Page Complexity
- **Description:** Page requires displaying 5 long-form sample narratives with demographic profiles
- **Impact:** Potential layout issues, performance concerns with large text content
- **Probability:** MEDIUM
- **Mitigation:**
  - Use collapsible/accordion pattern for samples
  - Lazy load sample content
  - Test mobile rendering with full content
  - Consider tabbed interface for samples

### Risk 4: SEO and Routing Consistency
- **Description:** New `/projects/*` routes need proper metadata for SEO
- **Impact:** Poor search visibility if metadata missing
- **Probability:** LOW
- **Mitigation:**
  - Add proper `metadata` export to each page (title, description, openGraph)
  - Ensure consistent URL structure
  - Note: No redirects needed (new pages, not moving existing content)

### Risk 5: Content Accuracy
- **Description:** URLs must be exact (selahmirror.xyz, not mirror-of-truth.xyz)
- **Impact:** Broken external links, user frustration
- **Probability:** LOW (explicit in vision doc)
- **Mitigation:**
  - Verify all URLs before deployment:
    - `https://selahmirror.xyz` (Mirror of Dreams)
    - `https://selahwealth.xyz` (Wealth)
    - `https://statviz.xyz` (StatViz)
  - Test all external links post-deployment

---

## Testing Requirements

### Unit/Component Testing
1. **PortfolioCard renders with detailUrl** - Verify Link wrapper exists
2. **External link opens new tab** - Verify `target="_blank"` and `rel="noopener noreferrer"`
3. **All pages export correct metadata** - Check title, description present

### Integration Testing
1. **Homepage to Detail Page flow** - Click card, verify correct page loads
2. **Detail Page to Live Site flow** - Click "Visit Live Site", verify external navigation
3. **Back navigation** - From detail page, browser back returns to homepage

### Visual/Manual Testing
1. **Mobile responsive layout** - All 4 detail pages on mobile viewport
2. **AI Research Pipeline samples** - Verify all 5 samples display correctly
3. **Typography and spacing** - Consistent with existing site design
4. **Dark mode compatibility** - Already handled by existing CSS

### Build Testing
```bash
npm run build  # Must pass with no errors
npm run lint   # Must pass with no errors
```

### Recommended Test Matrix

| Page | Desktop | Tablet | Mobile | Links | SEO |
|------|---------|--------|--------|-------|-----|
| /projects/mirror-of-dreams | [ ] | [ ] | [ ] | [ ] | [ ] |
| /projects/wealth | [ ] | [ ] | [ ] | [ ] | [ ] |
| /projects/statviz | [ ] | [ ] | [ ] | [ ] | [ ] |
| /projects/ai-research-pipeline | [ ] | [ ] | [ ] | [ ] | [ ] |

---

## Build Considerations

### File Structure to Create
```
app/
  projects/
    mirror-of-dreams/
      page.tsx          # Detail page
    wealth/
      page.tsx          # Detail page
    statviz/
      page.tsx          # Detail page
    ai-research-pipeline/
      page.tsx          # Detail page (complex)
```

### Build Pipeline
1. **Pre-build:** No special requirements
2. **Build:** `npm run build` uses Next.js static generation
3. **Turbopack:** Dev mode uses `--turbopack` flag (fast refresh)
4. **Lint:** ESLint 9 with next config

### Deployment Considerations
1. **Static Generation:** All new pages can be statically generated (no server-side data fetching)
2. **Image Optimization:** If screenshots added later, use `next/image`
3. **No API routes needed:** Pure static content
4. **No database:** All content hardcoded in page components

### Performance Impact
- **Bundle Size:** Minimal increase (~4 new page components)
- **Build Time:** Negligible increase
- **Runtime:** No performance concerns (static pages)

---

## Recommendations

### For Master Planner

1. **Iteration Structure:** SINGLE ITERATION recommended
   - Scope is well-defined
   - No complex dependencies
   - All tasks can be parallelized after initial type update

2. **Suggested Task Breakdown:**
   - **Task 1:** Type interface and data updates (1 builder, 30 min)
   - **Task 2:** PortfolioCard link behavior (1 builder, 30 min)
   - **Task 3:** Simple project pages (3 pages, can parallelize, 2 hours)
   - **Task 4:** AI Research Pipeline page (1 builder, 1-2 hours - complex)

3. **Critical Path:**
   ```
   Type Update -> Data Update -> PortfolioCard Update -> All Pages (parallel)
   ```

### For Builders

1. **Follow Existing Patterns:**
   - Use `contemplative-card` for main content containers
   - Use `gentle-button` for CTAs
   - Use `section-breathing` for vertical rhythm
   - Reference `/app/soul/blueprint/mirror-of-truth/page.tsx` as template

2. **Page Structure Template:**
   ```tsx
   "use client";

   export const metadata = { /* SEO */ };

   export default function ProjectPage() {
     return (
       <div className="min-h-screen bg-[#0a0f1a] text-white">
         {/* Navigation */}
         {/* Hero */}
         {/* Content Sections */}
         {/* CTA */}
         {/* Footer */}
       </div>
     );
   }
   ```

3. **AI Research Pipeline Special Handling:**
   - Store 5 sample narratives as const array
   - Create reusable `SampleCard` component
   - Consider demographic badge component for profiles
   - Test mobile scroll with long narrative content

4. **URL Verification Before Commit:**
   - Mirror of Dreams: `https://selahmirror.xyz`
   - Wealth: `https://selahwealth.xyz`
   - StatViz: `https://statviz.xyz`

5. **Import Paths:**
   - Use `@/app/components/` for shared components
   - Use `lucide-react` for icons (ExternalLink, ArrowRight, ArrowLeft)
   - Use `next/image` for any images
   - Use `next/link` for internal navigation

---

## Complexity Assessment

**Overall Complexity: SIMPLE-MEDIUM**

| Factor | Assessment |
|--------|------------|
| Scope | Clear, well-defined |
| Dependencies | Minimal, linear chain |
| Technical Risk | Low |
| Integration Risk | Low |
| Content Volume | Medium (5 sample narratives) |
| New Code | ~500-800 lines across 4 pages |
| Time Estimate | 4-6 hours total |

---

*Exploration completed: 2025-12-02*
*This report informs master planning decisions*

# Master Exploration Report

## Explorer ID
master-explorer-2

## Focus Area
Dependencies & Risk Assessment

## Vision Summary
Transform 4 functional project pages into "phenomenal" mini-experiences by adding visual proof sections, GitHub links, tech deep-dives with rationale, metrics, CSS-only animations, and enhanced navigation between projects.

---

## Requirements Analysis

### Scope Assessment
- **Total features identified:** 8 must-have features across 4 project pages
- **User stories/acceptance criteria:** ~20 (visual proof, GitHub links, tech deep-dive, metrics, animations, hero improvements, navigation, consistent structure)
- **Estimated total work:** 8-12 hours

### Complexity Rating
**Overall Complexity: MEDIUM**

**Rationale:**
- All 4 project pages share identical patterns (low divergence risk)
- No new infrastructure required (CSS animations, no backend changes)
- Content-heavy work (text, images) vs complex logic
- Clear existing structure to enhance rather than rebuild

---

## Dependency Analysis

### File Dependency Map

```
globals.css (FOUNDATION - affects ALL pages)
    |
    +-- Section animation classes (NEW)
    |   - .section-reveal
    |   - @keyframes for staggered fade-in
    |
    +-- Tech deep-dive card styles (NEW)
    |   - .tech-card
    |   - .tech-why
    |
    +-- Metrics display styles (NEW)
    |   - .metrics-grid
    |   - .metric-value
    |
    +-- Next project card styles (NEW)
         - .next-project-card
         - .next-project-preview

Project Pages (CONSUME globals.css classes)
    |
    +-- ai-research-pipeline/page.tsx
    |       Uses: contemplative-card, hero-gradient-bg, breathing-glass
    |       Custom: useScrollReveal hook (INCONSISTENT - placeholder only)
    |       Unique: SampleNarratives tab interface
    |
    +-- statviz/page.tsx
    |       Uses: contemplative-card, hero-gradient-bg, gentle-button
    |       Custom: useScrollReveal hook (INCONSISTENT - placeholder only)
    |       Standard structure
    |
    +-- mirror-of-dreams/page.tsx
    |       Uses: contemplative-card, hero-gradient-bg, gentle-button
    |       Custom: useScrollReveal hook (DIFFERENT - has IntersectionObserver)
    |       Standard structure
    |
    +-- wealth/page.tsx
            Uses: contemplative-card, hero-gradient-bg, gentle-button
            Custom: useScrollReveal hook (INCONSISTENT - placeholder only)
            Standard structure

Shared Components (NOT used by project pages currently)
    |
    +-- PortfolioCard.tsx
    |       Has: projectVisuals config per project ID
    |       Has: useScrollReveal hook (working implementation)
    |
    +-- portfolio.ts (data file)
            Has: Project metadata (id, title, subtitle, techStack, etc.)
            Missing: GitHub URLs, metrics data
```

### Critical Dependency Chain

1. **globals.css** MUST be updated FIRST
   - Animation classes needed by all 4 pages
   - Risk: Changes here affect homepage and all other pages

2. **Create shared component/pattern** for new sections
   - Tech deep-dive template
   - Metrics display template
   - Visual proof gallery template
   - Next project preview card

3. **Update project pages IN ORDER:**
   - Start with ONE page as template (recommend: statviz - simplest)
   - Copy pattern to remaining 3 pages
   - Avoids divergence and conflict

### Inter-Page Dependencies

| From | To | Dependency Type |
|------|-----|-----------------|
| ai-research-pipeline | statviz | "Next Project" link |
| statviz | mirror-of-dreams | "Next Project" link |
| mirror-of-dreams | wealth | "Next Project" link |
| wealth | ai-research-pipeline | "Next Project" link (circular) |

**Implication:** Navigation chain is circular. All pages must be updated to maintain consistency. If one page's slug changes, links break.

---

## Risk Assessment

### HIGH RISKS

#### 1. CSS Changes Breaking Homepage

**Risk:** Changes to `globals.css` can affect the homepage and all other pages.

**Impact:**
- Homepage uses: `hero-gradient-bg`, `contemplative-card`, `hero-word`, `hero-subline`, `gentle-button`
- Soul section pages also use these classes
- Unintended side effects could break existing styling

**Mitigation:**
- Use NEW class names for new features (e.g., `.project-section-reveal` not `.section-reveal`)
- Test homepage after globals.css changes
- Avoid modifying existing classes; only ADD new ones

**Recommendation:** Update globals.css in isolated commit, test all pages before proceeding.

---

#### 2. useScrollReveal Hook Inconsistency

**Risk:** Three different implementations of useScrollReveal across pages.

**Current State:**
- `ai-research-pipeline`: Placeholder (returns ref only, no animation)
- `statviz`: Placeholder (returns ref only, no animation)
- `wealth`: Placeholder (returns ref only, no animation)
- `mirror-of-dreams`: Full IntersectionObserver implementation
- `PortfolioCard.tsx`: Full IntersectionObserver implementation
- `page.tsx` (homepage): Full IntersectionObserver implementation

**Impact:**
- Updating to CSS-only animations will require removing/modifying hooks
- Mirror of Dreams page has working animations; others appear broken
- Inconsistent user experience

**Mitigation:**
- Vision suggests CSS-only animations (simpler, more reliable)
- Remove JS-based opacity manipulation
- Use CSS animation-delay for staggered reveals

**Recommendation:** Replace all useScrollReveal hooks with CSS-only approach as specified in vision.

---

### MEDIUM RISKS

#### 3. Missing Screenshot Assets

**Risk:** Visual proof sections require screenshots that don't exist yet.

**Current State:**
- `/public/projects/` directory does not exist
- No project screenshots available

**Impact:**
- Visual proof section cannot be fully implemented without images
- Placeholder approach needed for MVP

**Mitigation:**
- Create placeholder structure: "Screenshots coming soon" with styled empty state
- Design image containers with fixed aspect ratios
- Add images later without code changes

**Recommendation:** Implement with placeholder approach; document where images should be added.

---

#### 4. GitHub Repository Visibility Unknown

**Risk:** Vision requires GitHub links but repo status is unclear.

**Current State:**
- AI Research Pipeline: Likely private (client work per vision)
- StatViz: Unknown
- Mirror of Dreams: Unknown
- Wealth: Unknown

**Impact:**
- Cannot add functional GitHub links without URL information
- Need "Private Repository" badge fallback

**Mitigation:**
- Implement conditional rendering: show GitHub link OR "Private" badge
- Use placeholder URLs that can be easily updated

**Recommendation:** Add GitHub field to portfolio.ts data file; use conditional display.

---

### LOW RISKS

#### 5. Content Accuracy (Metrics)

**Risk:** Metrics in vision may not be accurate.

**Mitigation:** Mark as editable placeholder text; owner can verify and update.

---

#### 6. Lucide Icons Missing

**Risk:** New icons may be needed (Lock, Github).

**Current State:** Pages already import from lucide-react; Github icon used on homepage.

**Mitigation:** Add imports as needed; library already in use.

---

## Implementation Order Recommendation

### Phase 1: Foundation (globals.css) - 1-2 hours
**Priority: CRITICAL**

1. Add NEW CSS classes (do not modify existing):
   - `.project-section-reveal` - CSS-only animation with delay vars
   - `.project-metrics-grid` - 3-column metrics layout
   - `.project-tech-card` - Tech stack card with "why" subtitle
   - `.project-next-card` - Next project preview card styling
   - `.project-screenshot-grid` - Visual proof gallery layout

2. Test homepage and existing pages for regressions

**Dependencies:** None
**Blocks:** All subsequent phases

---

### Phase 2: Template Page (statviz) - 2-3 hours
**Priority: HIGH**

1. Update statviz/page.tsx as the template:
   - Add Visual Proof section (placeholder images)
   - Add GitHub link (with conditional Private badge)
   - Transform Tech Stack to Tech Deep-Dive
   - Add Metrics section
   - Replace useScrollReveal with CSS classes
   - Enhance Hero with dual CTAs
   - Upgrade Next Project to preview card

2. Verify all new patterns work correctly

**Dependencies:** Phase 1 complete
**Blocks:** Phases 3-5

**Why statviz first:**
- Simplest page structure (no custom UI like AI Research's tabs)
- Has live URL (can show GitHub + Live dual CTAs)
- Mid-chain position (not first or last in navigation)

---

### Phase 3: Remaining Pages (3 pages) - 3-4 hours
**Priority: HIGH**

Apply template pattern to remaining pages in order:

1. **wealth/page.tsx** (2nd simplest)
   - Similar to statviz
   - Copy pattern directly

2. **mirror-of-dreams/page.tsx**
   - Has working useScrollReveal (must replace)
   - Similar structure otherwise

3. **ai-research-pipeline/page.tsx** (most complex)
   - Keep SampleNarratives section intact
   - Add new sections around existing custom content
   - No live URL (remove Visit button, add Contact CTA)

**Dependencies:** Phase 2 complete (template established)
**Blocks:** None (final phase)

---

### Phase 4: Content & Assets - 1-2 hours
**Priority: MEDIUM**

1. Gather actual GitHub URLs
2. Capture/create screenshots
3. Verify metrics accuracy
4. Add images to `/public/projects/{slug}/`

**Dependencies:** Phase 3 complete (image containers exist)
**Can be parallel:** Yes, can happen alongside Phase 3

---

## Content Requirements

### Per-Project Content Needed

#### AI Research Pipeline
| Content Type | Status | Notes |
|--------------|--------|-------|
| GitHub URL | SKIP | Private client work |
| Screenshots | NEEDED | Tab interface, demographic profile, generated narrative |
| Tech "Why" | NEEDED | 4 technologies with rationale |
| Metrics | PROVIDED | 10K+ responses, 5 variables, bilingual |

#### StatViz
| Content Type | Status | Notes |
|--------------|--------|-------|
| GitHub URL | UNKNOWN | Need to determine if public |
| Screenshots | NEEDED | Admin panel, student view, visualization |
| Tech "Why" | NEEDED | 5 technologies with rationale |
| Metrics | PROVIDED | Dual format, RTL support, secure access |

#### Mirror of Dreams
| Content Type | Status | Notes |
|--------------|--------|-------|
| GitHub URL | UNKNOWN | Need to determine |
| Screenshots | NEEDED | Journal entry, AI reflection, tiers |
| Tech "Why" | NEEDED | 6 technologies with rationale |
| Metrics | PROVIDED | 3 tiers, Claude-powered, PayPal |

#### Wealth
| Content Type | Status | Notes |
|--------------|--------|-------|
| GitHub URL | UNKNOWN | Need to determine |
| Screenshots | NEEDED | Dashboard, categorization, alerts |
| Tech "Why" | NEEDED | 6 technologies with rationale |
| Metrics | PROVIDED | Bank sync, AI categorization, alerts |

### Tech Deep-Dive Content (Must Create)

For each technology, need "why" explanation:

**Common patterns:**
- Next.js: "Server components for speed. App router for clean architecture."
- TypeScript: "End-to-end type safety. Fewer bugs, faster development."
- Prisma: "Type-safe database access. Reliable, scalable data layer."
- Claude API: "AI that understands context. Personalized, not generic."
- tRPC: "Type-safe API layer. Full-stack type safety."
- Supabase: "Auth + Database in one. Rapid development."
- PostgreSQL: "Reliable, scalable SQL database."
- JWT: "Secure, stateless authentication."
- PayPal: "Trusted payment processing. Easy subscriptions."

---

## Iteration Breakdown Recommendation

### Recommendation: SINGLE ITERATION

**Rationale:**
- All work is interconnected (globals.css changes affect all pages)
- Template pattern means subsequent pages are fast after first
- No complex dependencies or infrastructure changes
- Estimated 8-12 hours total

**If time-boxing needed, split as:**
- Iteration 1A: globals.css + statviz (template) - 3-4 hours
- Iteration 1B: Remaining 3 pages - 4-5 hours
- Iteration 1C: Assets and content polish - 1-2 hours

---

## Recommendations for Master Plan

1. **Start with globals.css** - All CSS changes in one commit, test for regressions before proceeding.

2. **Use statviz as template** - Simplest structure, allows validation of patterns before scaling to other pages.

3. **Preserve unique features** - AI Research Pipeline has SampleNarratives tabs; don't break this when adding new sections.

4. **CSS-only animations** - Vision explicitly recommends this; removes complexity of IntersectionObserver inconsistencies.

5. **Prepare placeholder strategy** - Screenshots likely unavailable; design empty states that look intentional.

6. **Update portfolio.ts** - Add `githubUrl?: string` field to PortfolioProject type; enables conditional rendering.

7. **Test navigation chain** - After updates, verify all "Next Project" links work correctly in circular chain.

---

## Notes & Observations

- The vision is well-defined with specific code examples - implementation should be straightforward
- Current useScrollReveal implementations are inconsistent and partially broken - CSS-only approach will fix this
- The circular navigation (wealth -> ai-research-pipeline) creates a nice loop through all projects
- AI Research Pipeline is unique due to SampleNarratives - extra care needed not to disrupt this feature
- No backend changes required - this is purely frontend enhancement work
- Consider adding optional `metrics` field to portfolio.ts for future data-driven approach

---

*Exploration completed: 2025-12-04*
*This report informs master planning decisions*

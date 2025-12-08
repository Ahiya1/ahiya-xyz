# Project Vision: Hidden CV / Part-Time Availability Interface

**Created:** 2025-12-08T20:33:00Z
**Plan:** plan-15

---

## Problem Statement

ahiya.xyz exists as a builder identity — product-facing, system-facing, portfolio-oriented. But a separate need exists: a **formal organizational interface** for structured hiring processes where part-time systems collaboration is relevant.

This interface must:
- Exist without polluting the main narrative
- Filter for the right organizations by design
- Present a clear yes/no decision gate
- Not market, convince, or sell

**Current state:** No such interface exists. Employment-related communication is ad-hoc.

**Desired state:** A precision access layer that creates consent-based filtering before engagement begins.

---

## Target Users

**Primary user:** Decision-makers in three organization types:

1. **Early-stage startups**
   - Need senior systems-level thinking
   - Cannot afford or do not need full-time

2. **Technical founders**
   - Already understand agents and AI pipelines
   - Want execution, not education

3. **Advanced product/infra teams**
   - Need a bridge role between product, backend, and AI
   - Have specific, scoped problems

**Explicitly NOT for:**
- HR departments browsing candidates
- Recruiters mass-sourcing
- Junior pipeline processes
- Anyone who needs to be "convinced"

---

## Core Value Proposition

A **hard yes/no gate** for part-time systems collaboration.

The interface:
- Does not explain or justify
- Does not market or persuade
- Presents identity, proof, scope, and one action
- Either the visitor sends a qualified message or exits silently

---

## Feature Breakdown

### Must-Have (MVP)

1. **Hidden `/cv` Route**
   - Description: Direct-access page, not linked from navigation
   - Implementation:
     - Route: `/cv` (or `/part-time` as alias)
     - Not in main nav or mobile nav
     - `robots.txt` excludes from indexing
     - Accessed only via direct URL or manual share
   - Acceptance criteria:
     - [ ] Route exists and renders
     - [ ] Not present in any navigation component
     - [ ] Excluded from sitemap/robots.txt
     - [ ] No internal links point to it (except footer signal)

2. **Subtle Footer Availability Signal**
   - Description: Single line in homepage footer, understated
   - Copy: "Select part-time availability for systems roles."
   - Implementation:
     - Small text, same color as footer copyright (slate-600)
     - Links to `/cv`
     - Not styled as CTA, not highlighted
   - Acceptance criteria:
     - [ ] Line appears in footer
     - [ ] Links to `/cv`
     - [ ] Visually understated (not promotional)

3. **CV Page: Vision Section**
   - Description: Identity positioning statement
   - Content:
     - Systems-level AI and automation builder
     - Focus: agent-driven, production-grade software
     - Specialty: loops (data → logic → agents → execution → feedback)
     - Independence by default, selective collaboration
   - Acceptance criteria:
     - [ ] Clear positioning in first viewport
     - [ ] No marketing language
     - [ ] Sets filter expectations

4. **CV Page: Systems Proof Section**
   - Description: Compressed portfolio evidence
   - Projects (compressed, not visual-heavy):
     - **2L** — Agent orchestration framework
     - **AI Research Pipeline** — Factorial design delivery system
     - **StatViz** — Live B2B statistical reports platform
     - **SelahReach** — Claude Code + outreach automation
   - Implementation:
     - Brief titles with one-line descriptions
     - Optional: links to live systems or project pages
     - No screenshots or heavy visuals
   - Acceptance criteria:
     - [ ] Four systems listed
     - [ ] One-line descriptions
     - [ ] Clean, professional layout

5. **CV Page: Operational Scope Section**
   - Description: Clear boundaries
   - Content:
     - Part-time only
     - Remote-first
     - Domains: Systems, agents, AI pipelines, automation
   - Acceptance criteria:
     - [ ] Three constraints clearly stated
     - [ ] No ambiguity about engagement type

6. **CV Page: Availability Status**
   - Description: Boolean state
   - States:
     - "Open to part-time collaboration" (green indicator)
     - "Currently closed" (neutral indicator)
   - Implementation:
     - Config-driven (can toggle in code/env)
     - Visual indicator (subtle, not flashy)
   - Acceptance criteria:
     - [ ] Shows current availability
     - [ ] Easy to update (env var or config file)

7. **CV Page: Contact Channel**
   - Description: Single structured pathway
   - Options (pick one):
     - Option A: Direct email link (ahiya.butman@gmail.com)
     - Option B: Short qualification form (3-4 fields max)
   - Decision: **Direct email** (simpler, filters naturally)
   - Acceptance criteria:
     - [ ] One clear action
     - [ ] No calendar links
     - [ ] No multiple channels

8. **CV Page: PDF Download**
   - Description: Quiet one-page PDF option
   - Implementation:
     - Small line at page bottom: "For formal internal processes, a one-page PDF version is available."
     - Click downloads PDF
     - No button styling, no emphasis
   - PDF Content:
     - Same vision/positioning as page
     - Systems proof compressed
     - Operational scope
     - Contact info
   - Technical: Built programmatically with @react-pdf/renderer (like capabilities PDF)
   - Acceptance criteria:
     - [ ] Download link exists
     - [ ] PDF generated from code (not static file)
     - [ ] Content matches page
     - [ ] Professional, minimal design

### Should-Have (Post-MVP)

1. **Availability Toggle Admin** — Simple admin UI to toggle open/closed status
2. **View Counter** — Track how many times `/cv` is accessed (analytics integration)

### Could-Have (Future)

1. **Qualification Form** — If direct email proves insufficient filtering
2. **Multiple Language Support** — Hebrew version for Israel market

---

## User Flows

### Flow 1: Direct Link Access

**Trigger:** Visitor receives `/cv` link from Ahiya directly

**Steps:**
1. Visitor opens `ahiya.xyz/cv`
2. Page loads with vision statement at top
3. Visitor reads positioning, proof, scope
4. Visitor sees availability status
5. Decision point:
   - **Qualified:** Clicks email link, sends message
   - **Unqualified:** Exits silently

**Success:** Binary outcome. No middle state.

### Flow 2: Organic Discovery via Footer

**Trigger:** Visitor on homepage notices footer line

**Steps:**
1. Visitor scrolls to footer
2. Notices "Select part-time availability for systems roles."
3. Curiosity or relevance → clicks link
4. Continues as Flow 1

**Notes:** This is intentionally low-conversion. Only those actively looking will notice.

---

## Data Model Overview

**No database required for MVP.**

Configuration only:

```typescript
// config or env
const cvConfig = {
  availabilityStatus: 'open' | 'closed',
  contactEmail: 'ahiya.butman@gmail.com',
}
```

---

## Technical Requirements

**Must support:**
- Next.js App Router (existing stack)
- Static generation (no dynamic data needed)
- PDF generation with @react-pdf/renderer

**Constraints:**
- No new dependencies beyond @react-pdf/renderer (already installed)
- Consistent with existing design system (dark theme, slate colors, purple accents)
- Mobile-responsive

**Preferences:**
- Minimal animation (professional, not playful)
- Typography-forward design
- Generous whitespace

---

## Success Criteria

**The MVP is successful when:**

1. **Route exists and is hidden**
   - Metric: Route `/cv` works
   - Metric: Not in navigation
   - Metric: Not in search engines (post-deployment check)

2. **Page communicates positioning clearly**
   - Metric: Vision, proof, scope, status visible in one scroll
   - Metric: No confusion about engagement type

3. **PDF downloads correctly**
   - Metric: Click triggers download
   - Metric: PDF renders professionally
   - Metric: Content matches page

4. **Design matches site quality**
   - Metric: Visual consistency with ahiya.xyz
   - Metric: No jarring transitions from main site

---

## Out of Scope

**Explicitly not included in MVP:**
- Qualification form (email is sufficient filter)
- Admin panel for availability toggle (code change is fine)
- Analytics tracking (can add via existing system later)
- SEO optimization (intentionally hidden)
- Multiple contact channels
- Portfolio deep-dives (main site handles this)

**Why:** This is a precision interface, not a marketing page. Less is more.

---

## Assumptions

1. Direct email provides sufficient filtering (unqualified people won't email)
2. One page is enough — no multi-page CV site needed
3. Availability toggle changes rarely (code deploy acceptable)
4. PDF generation script can run at build time

---

## Open Questions

1. **Availability status source:** Environment variable or hardcoded config?
   - Recommendation: Config constant in code, simple to change.

2. **Footer signal copy:** Final wording for homepage footer line?
   - Current: "Select part-time availability for systems roles."
   - Confirm or refine.

---

## Design Direction

**Aesthetic:**
- Same dark theme as ahiya.xyz (`bg-[#0a0f1a]`)
- Clean typography hierarchy
- Purple accent for status/highlights (sparingly)
- No images except possibly logo
- Generous spacing

**Tone:**
- Professional, not warm
- Direct, not explanatory
- Confident, not selling

**Reference:** The capabilities page aesthetic, but more minimal.

---

## File Structure

```
app/
  cv/
    page.tsx              # Main CV page
scripts/
  generate-cv-pdf.tsx     # PDF generator (similar to capabilities)
public/
  ahiya-cv.pdf           # Generated PDF output
```

---

## Next Steps

- [ ] Review and refine this vision
- [ ] Run `/2l-plan` for interactive master planning
- [ ] OR run `/2l-mvp` to auto-plan and execute

---

**Vision Status:** VISIONED
**Ready for:** Master Planning

# Builder Tasks

## Overview

4 primary builders will work in parallel. All builders have independent scopes with minimal overlap. The only shared file is `/app/page.tsx` which is modified by both Builder-2 (CTA strip) and Builder-3 (hero + How We Work).

## Builder Execution Order

All builders can execute in parallel:

| Builder | Scope | Dependencies | Blocks |
|---------|-------|--------------|--------|
| Builder-1 | 2L Page | None | None |
| Builder-2 | Capabilities Page + CTA Strip | None | None |
| Builder-3 | Homepage B2B + Navigation | None | None |
| Builder-4 | Project Badges + Print CSS | None | None |

**Integration Note:** Builder-2 and Builder-3 both modify `/app/page.tsx`. Builder-2 adds the CTA strip section, Builder-3 modifies hero and How We Work. Integrator will merge both changes.

---

## Builder-1: 2L Methodology Page

### Scope

Create the dedicated 2L methodology page at `/app/2l/page.tsx`. This is the most content-heavy page, explaining the proprietary AI orchestration system to potential B2B clients.

### Complexity Estimate

**HIGH**

Large page with multiple sections, but straightforward React/Tailwind implementation with no external dependencies.

### Success Criteria

- [ ] Page exists at `/app/2l/page.tsx` and renders at `/2l`
- [ ] Hero section with headline "AI-Orchestrated Development at Enterprise Scale"
- [ ] Pipeline section with 7-phase visual diagram
- [ ] Agent types section with 6 agent cards
- [ ] Benefits section with 4 benefit cards
- [ ] Case study section with metrics row
- [ ] Technical accordion with 4 expandable items
- [ ] Final CTA section with "Get in Touch" button
- [ ] Page uses shared Navigation and Footer components
- [ ] All animations work (hero-word, section-reveal)
- [ ] Mobile responsive

### Files to Create

- `/app/2l/page.tsx` - Complete 2L methodology page

### Dependencies

**Depends on:** Nothing
**Blocks:** Nothing

### Implementation Notes

**Hero Section Content:**
- Headline: "AI-Orchestrated Development at Enterprise Scale"
- Subheadline: "From vision to validated system in days, not months. 2L is my proprietary multi-agent framework that accelerates complex builds without sacrificing quality."
- Primary CTA: "See How It Works" (scroll to pipeline)
- Secondary CTA: "View Case Study" (scroll to portfolio link)

**Pipeline Section (7 phases):**
1. Vision - Target icon - "Requirements crystallized into clear objectives"
2. Exploration - Search icon - "Parallel agents analyze architecture and patterns"
3. Planning - FileText icon - "Concrete tasks with file-level specifications"
4. Building - Hammer icon - "Multiple builders execute in parallel"
5. Integration - GitMerge icon - "Outputs merged into cohesive codebase"
6. Validation - Shield icon - "Automated testing against acceptance criteria"
7. Healing - RefreshCw icon - "Self-correcting loop for validation failures"

Include self-healing callout below pipeline.

**Agent Types (6 agents):**
1. Explorers - "Deep codebase analysis before any code is written"
2. Planners - "Concrete implementation plans with file specifications"
3. Builders - "Parallel feature development with conflict awareness"
4. Integrators - "Systematic merge of parallel work streams"
5. Validators - "Automated acceptance testing and quality gates"
6. Healers - "Self-correcting fixes when issues arise"

**Benefits (4 cards):**
1. Speed: "Weeks, Not Months" - Lightning icon
2. Quality: "Validation at Every Phase" - Shield icon
3. Transparency: "Full Audit Trail" - Eye icon
4. Consistency: "Patterns Enforced Across Builders" - Grid icon

**Case Study Section:**
- Metrics: "7 iterations", "10+ features per iteration", "Real-time observability", "Self-healing active"
- Link to portfolio section on homepage

**Technical Accordion (4 items):**
1. Multi-Iteration Architecture
2. Event-Driven Observability
3. Graceful Degradation
4. 5-Tier Validation

**Final CTA:**
- Headline: "Ready to Build Something?"
- Subheadline: "Let's talk about your project. I'll show you how 2L can accelerate your timeline."
- Primary: "Get in Touch" (mailto link)
- Secondary: "View Capabilities" (link to /capabilities)

### Patterns to Follow

Reference patterns from `patterns.md`:
- Use Page Pattern for overall structure
- Use Pipeline Diagram Pattern for 7 phases
- Use Card Grid Pattern for agents and benefits
- Use Accordion Pattern for technical section
- Use Button Patterns for CTAs

### Testing Requirements

- Visual verification of all sections
- Mobile responsiveness (test at 375px, 768px, 1024px widths)
- Animation timing verification
- Link functionality

---

## Builder-2: Capabilities Page + CTA Strip

### Scope

Create the B2B capabilities page at `/app/capabilities/page.tsx` with print-optimized layout, AND add a CTA strip to the homepage below the hero section.

### Complexity Estimate

**MEDIUM**

Two distinct tasks, but both are straightforward implementations.

### Success Criteria

- [ ] Page exists at `/app/capabilities/page.tsx` and renders at `/capabilities`
- [ ] 9 sections implemented as specified
- [ ] Page is print-friendly (test with Ctrl+P)
- [ ] Navigation and footer hidden in print view
- [ ] CTA strip added to homepage below hero section
- [ ] CTA strip has 4 action items with icons
- [ ] Mobile responsive

### Files to Create

- `/app/capabilities/page.tsx` - Complete capabilities page

### Files to Modify

- `/app/page.tsx` - Add CTA strip section ONLY (do not modify other sections)

### Dependencies

**Depends on:** Nothing
**Blocks:** Nothing

### Implementation Notes

**Capabilities Page Sections (9 total):**

1. **Header/Identity Block**
   - Name: "Ahiya Butman"
   - Title: "Systems Developer & AI Architect"
   - Contact: ahiya.xyz | ahiya.butman@gmail.com | GitHub
   - Tagline: "Custom research systems, business tools, and AI pipelines. Delivered fast."

2. **Core Value Proposition**
   - Single paragraph about building custom systems

3. **Capabilities List (6 items)**
   - Full-Stack SaaS Systems
   - AI Pipelines & Orchestration
   - Research Tools & Statistical Systems
   - Business Automation Tools
   - Custom APIs & Backend Infrastructure
   - UX-Light Tools That Do Heavy Lifting

4. **Selected Work (4 mini case studies)**
   - Mirror of Dreams
   - Wealth
   - StatViz
   - AI Research Pipeline

5. **The 2L Method**
   - Brief paragraph with link to /2l

6. **Workflow (3 steps)**
   - Define, Build, Launch

7. **Tech Stack**
   - Backend, Frontend, Infrastructure, Databases, AI/ML, DevOps

8. **Availability & Contact**
   - Availability statement
   - Contact info

9. **Optional Footer**
   - Signature line: "Intention. Clarity. Results."

**Print Considerations:**
- Add `print-hide` class to Navigation and Footer imports
- Use `print-avoid-break` on card elements
- Ensure text is readable (dark text on white background)

**CTA Strip for Homepage:**

Insert after hero section (after the closing `</section>` of hero, before portfolio section):

```typescript
{/* CTA Strip */}
<section className="py-8 border-b border-white/5 section-reveal section-reveal-1">
  <div className="container-wide">
    <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
      <a href="#portfolio" className="..."><Grid /> See the Work</a>
      <Link href="/2l" className="..."><Workflow /> How I Build</Link>
      <Link href="/capabilities" className="..."><FileText /> Capabilities</Link>
      <a href="#contact" className="..."><Mail /> Get in Touch</a>
    </div>
  </div>
</section>
```

### Patterns to Follow

Reference patterns from `patterns.md`:
- Use Page Pattern for capabilities page structure
- Use CTA Strip Pattern for homepage addition
- Use Print Styles Pattern (reference for CSS additions)

### Testing Requirements

- All 9 sections render correctly
- Print preview shows readable content (Ctrl+P)
- Navigation/footer hidden in print
- CTA strip visible on homepage
- Mobile responsive
- Links work correctly

---

## Builder-3: Homepage B2B Refresh + Navigation

### Scope

Update homepage messaging for B2B positioning and add navigation links for the new pages.

### Complexity Estimate

**MEDIUM**

Modifying existing content, not creating from scratch.

### Success Criteria

- [ ] Hero subheadline updated to include speed/precision messaging
- [ ] "How We Work" section copy updated for B2B tone
- [ ] 2L mention enhanced with link to /2l page
- [ ] Navigation includes "2L" link to /2l
- [ ] Navigation includes "Capabilities" link to /capabilities
- [ ] Mobile navigation works with new items
- [ ] All existing functionality preserved

### Files to Modify

- `/app/page.tsx` - Update hero subheadline and How We Work section (DO NOT add CTA strip - Builder-2 handles that)
- `/app/components/Navigation.tsx` - Add new nav items

### Dependencies

**Depends on:** Nothing
**Blocks:** Nothing

### Implementation Notes

**Hero Subheadline Update:**

Current:
```typescript
<p className="body-xl text-slate-300 max-w-2xl mx-auto mb-10 hero-subline">
  Research systems. Business tools. AI pipelines.
</p>
```

Updated:
```typescript
<p className="body-xl text-slate-300 max-w-2xl mx-auto mb-10 hero-subline">
  Precision-engineered systems delivered in weeks, not months.
</p>
```

**How We Work Section Updates:**

Current Define step:
```typescript
<p className="text-slate-400">
  We talk. I listen. You see the blueprint before I write a line of code.
</p>
```

Updated:
```typescript
<p className="text-slate-400">
  We align on requirements. You see the architecture before development begins.
</p>
```

Current Build step:
```typescript
<p className="text-slate-400">
  I move fast. You stay in the loop. No surprises.
</p>
```

Updated:
```typescript
<p className="text-slate-400">
  Parallel agents accelerate delivery. You stay informed. No surprises.
</p>
```

Current Launch step:
```typescript
<p className="text-slate-400">
  It works. It's documented. I'm here if you need me.
</p>
```

Updated:
```typescript
<p className="text-slate-400">
  Production-ready. Documented. Supported.
</p>
```

**2L Mention Enhancement:**

Current:
```typescript
<p className="text-center text-slate-500 text-sm">
  Powered by <span className="text-gentle">2L</span> — my AI orchestration framework.
</p>
```

Updated:
```typescript
<p className="text-center text-slate-500 text-sm">
  Powered by <Link href="/2l" className="text-gentle hover:underline">2L</Link> — my AI orchestration framework.{" "}
  <Link href="/2l" className="text-purple-400 hover:text-purple-300 transition-colors">Learn how it works</Link>
</p>
```

**Navigation Update:**

In `/app/components/Navigation.tsx`, update navItems:

```typescript
const navItems: NavItem[] = [
  { label: "Work", href: "#portfolio" },
  { label: "Process", href: "#how-we-work" },
  { label: "2L", href: "/2l" },
  { label: "Capabilities", href: "/capabilities" },
  { label: "Contact", href: "#contact" },
];
```

### Patterns to Follow

Reference patterns from `patterns.md`:
- Use Navigation Update Pattern for navItems

### Testing Requirements

- Hero subheadline shows new text
- How We Work shows updated B2B copy
- 2L mention has working link
- Navigation shows 5 items (Work, Process, 2L, Capabilities, Contact)
- Mobile menu shows all 5 items
- All navigation links work correctly

---

## Builder-4: Project Badges + Print CSS

### Scope

Add "Built with 2L" badges to all 4 project pages and add print styles to globals.css.

### Complexity Estimate

**LOW**

Repetitive changes across 4 files + one CSS addition.

### Success Criteria

- [ ] Badge visible on Mirror of Dreams project page
- [ ] Badge visible on Wealth project page
- [ ] Badge visible on StatViz project page
- [ ] Badge visible on AI Research Pipeline project page
- [ ] All badges link to /2l
- [ ] Badges have hover effect
- [ ] Print styles added to globals.css
- [ ] Print styles work correctly (test with Ctrl+P on /capabilities)

### Files to Modify

- `/app/projects/mirror-of-dreams/page.tsx` - Add badge
- `/app/projects/wealth/page.tsx` - Add badge
- `/app/projects/statviz/page.tsx` - Add badge
- `/app/projects/ai-research-pipeline/page.tsx` - Add badge
- `/app/globals.css` - Add print styles section

### Dependencies

**Depends on:** Nothing
**Blocks:** Nothing

### Implementation Notes

**Badge Implementation:**

Add the badge in the hero section of each project page, after the title and before the description. Find the hero section (usually has `min-h-screen flex items-center justify-center`) and locate the title `<h1>`. Add the badge div after it:

```typescript
{/* Title */}
<h1 className="display-xl text-white mb-4">Project Title</h1>

{/* Built with 2L Badge - ADD THIS */}
<div className="mb-6">
  <Link
    href="/2l"
    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-400/20 text-purple-300 text-xs font-medium hover:bg-purple-500/20 hover:border-purple-400/30 transition-all duration-300"
  >
    Built with 2L
  </Link>
</div>

{/* Description */}
<p className="body-xl text-slate-300 mb-8">...</p>
```

**Important:** Each project page has a slightly different structure. Find the hero section and add the badge appropriately. The exact JSX above may need minor adjustments per page.

**Print Styles for globals.css:**

Add at the end of the file:

```css
/* ═══════════════════════════════════════════════════════════════════════════
   PRINT STYLES - For capabilities page and other printable content
   ═══════════════════════════════════════════════════════════════════════════ */

@media print {
  /* Hide decorative elements */
  body::after {
    display: none;
  }

  /* Utility classes for print control */
  .print-hide {
    display: none !important;
  }

  .print-only {
    display: block !important;
  }

  .print-break-before {
    page-break-before: always;
  }

  .print-break-after {
    page-break-after: always;
  }

  .print-avoid-break {
    break-inside: avoid;
  }

  /* Reset background and colors */
  body {
    background: white !important;
    color: black !important;
  }

  main {
    background: white !important;
  }

  /* Reset card styles */
  .contemplative-card,
  .breathing-glass {
    background: white !important;
    border: 1px solid #e2e8f0 !important;
    box-shadow: none !important;
    backdrop-filter: none !important;
  }

  /* Text color overrides for print readability */
  .text-white {
    color: #1e293b !important;
  }

  .text-slate-200,
  .text-slate-300 {
    color: #334155 !important;
  }

  .text-slate-400,
  .text-slate-500 {
    color: #64748b !important;
  }

  /* Reset gradient text for print */
  .text-gentle {
    background: none !important;
    -webkit-background-clip: initial !important;
    -webkit-text-fill-color: #7c3aed !important;
    background-clip: initial !important;
    color: #7c3aed !important;
  }

  /* Hide navigation and footer for print */
  nav {
    display: none !important;
  }

  footer {
    display: none !important;
  }

  /* Reset hero gradient */
  .hero-gradient-bg::before {
    display: none;
  }

  /* Ensure links are visible and accessible */
  a {
    color: #7c3aed !important;
    text-decoration: underline;
  }

  /* Section spacing for print */
  .section-breathing {
    padding: 2rem 0;
  }
}
```

### Patterns to Follow

Reference patterns from `patterns.md`:
- Use "Built with 2L" Badge Pattern for exact badge JSX
- Use Print Styles Pattern for CSS additions

### Testing Requirements

- Each project page shows badge in hero section
- Badge hover effect works (background/border darken)
- Clicking badge navigates to /2l
- Print preview (Ctrl+P) on any page shows print styles applied
- Navigation hidden in print
- Text readable in print (dark on white)

---

## Integration Notes

### Conflict Resolution

The only file modified by multiple builders is `/app/page.tsx`:
- **Builder-2** adds the CTA strip section (new section between hero and portfolio)
- **Builder-3** modifies hero subheadline and How We Work section

These changes are in different parts of the file and should merge cleanly. If conflicts arise:
1. Keep Builder-3's hero and How We Work changes
2. Keep Builder-2's CTA strip addition
3. Verify both sets of imports are included (Link from next/link, icons from lucide-react)

### Import Additions

**Builder-2 adds to page.tsx:**
```typescript
import Link from "next/link";
import { Grid, Workflow, FileText } from "lucide-react";
```

**Builder-3 adds to page.tsx:**
```typescript
import Link from "next/link";
```

Integrator should deduplicate imports.

### Verification Checklist

After integration, verify:
- [ ] Homepage renders with CTA strip
- [ ] Homepage hero has updated subheadline
- [ ] Homepage How We Work has B2B copy
- [ ] Homepage 2L mention has link
- [ ] /2l page renders completely
- [ ] /capabilities page renders completely
- [ ] Navigation has all 5 items
- [ ] All 4 project pages have badges
- [ ] Print styles work on /capabilities

# Builder Task Breakdown

## Overview

**3 primary builders** will work in parallel after Builder-1 completes globals.css.

| Builder | Scope | Complexity |
|---------|-------|------------|
| Builder-1 | globals.css + StatViz (template) | MEDIUM |
| Builder-2 | Wealth + Mirror of Dreams | MEDIUM |
| Builder-3 | AI Research Pipeline | MEDIUM |

---

## Builder Execution Order

### Phase 1: Foundation (Builder-1 starts first)

**Builder-1** creates:
1. globals.css animation classes
2. StatViz page as template for other builders

### Phase 2: Parallel (After Builder-1 completes globals.css)

**Builder-2** and **Builder-3** can begin immediately after globals.css is ready:
- Builder-2: Wealth + Mirror of Dreams
- Builder-3: AI Research Pipeline

---

## Builder-1: globals.css + StatViz Page (Template)

### Scope

1. Add CSS-only section-reveal animation classes to `globals.css`
2. Transform StatViz page into the phenomenal template that other builders will reference
3. StatViz is the simplest structure, making it ideal for the template

### Complexity Estimate

**MEDIUM**

### Success Criteria

- [ ] `.section-reveal` and `.section-reveal-1` through `.section-reveal-8` classes added to globals.css
- [ ] Reduced motion support added for `.section-reveal`
- [ ] StatViz page has visual mockup section with HTML-based admin panel representation
- [ ] StatViz page has 4 metrics displayed in grid
- [ ] StatViz page has Tech Deep-Dive section (5 technologies with "why")
- [ ] StatViz page has dual CTAs in hero (View Live + Private Repository badge)
- [ ] StatViz page has enhanced Next Project preview card
- [ ] StatViz page uses `section-reveal` classes on all sections
- [ ] useScrollReveal hook removed from StatViz
- [ ] Homepage still works correctly (no CSS regressions)

### Files to Modify

- `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/globals.css` - Add section-reveal animations
- `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/projects/statviz/page.tsx` - Complete transformation

### Dependencies

**Depends on:** Nothing (starts first)
**Blocks:** Builder-2, Builder-3 (they need globals.css changes)

### Implementation Notes

**globals.css additions (add after line 378):**

```css
/* ═══════════════════════════════════════════════════════════════════════════
   PROJECT PAGE SECTION REVEAL - CSS-only staggered animation
   ═══════════════════════════════════════════════════════════════════════════ */

.section-reveal {
  animation: fade-in-up 0.6s ease forwards;
  opacity: 0;
}

.section-reveal-1 { animation-delay: 0.1s; }
.section-reveal-2 { animation-delay: 0.2s; }
.section-reveal-3 { animation-delay: 0.3s; }
.section-reveal-4 { animation-delay: 0.4s; }
.section-reveal-5 { animation-delay: 0.5s; }
.section-reveal-6 { animation-delay: 0.6s; }
.section-reveal-7 { animation-delay: 0.7s; }
.section-reveal-8 { animation-delay: 0.8s; }
```

**Also add to existing `@media (prefers-reduced-motion: reduce)` block (around line 471):**

```css
  .section-reveal {
    animation: none;
    opacity: 1;
  }
```

**StatViz-specific data:**

```typescript
// Visual Mockup
const mockupScreens = [
  {
    title: "Admin Dashboard",
    description: "Centralized project management interface",
    elements: [
      { type: 'header', label: 'Projects Overview' },
      { type: 'card', label: 'Active Projects', accent: true },
      { type: 'table', label: 'Recent Reports' },
      { type: 'button', label: 'Create New Project' },
    ]
  },
  {
    title: "Student Report View",
    description: "Secure, password-protected access to reports",
    elements: [
      { type: 'header', label: 'Your Report' },
      { type: 'chart', label: 'Statistical Analysis' },
      { type: 'list', label: 'Key Findings' },
      { type: 'button', label: 'Download DOCX' },
    ]
  },
];

// Metrics
const metrics = [
  { value: "2", label: "Format Options" },
  { value: "100%", label: "Hebrew RTL Support" },
  { value: "Secure", label: "Password Protected" },
  { value: "Fast", label: "Centralized Access" },
];

// Tech Deep-Dive
const techDeepDive = [
  { name: "Next.js", why: "Full-stack framework for seamless admin and student experiences." },
  { name: "TypeScript", why: "Type-safe codebase. Fewer runtime errors." },
  { name: "Prisma", why: "Type-safe database queries. Easy schema management." },
  { name: "PostgreSQL", why: "Reliable relational database for project and user data." },
  { name: "JWT", why: "Secure, stateless authentication for student access." },
];

// Next Project
const nextProject = {
  href: "/projects/mirror-of-dreams",
  emoji: "\u{1F319}",
  title: "Mirror of Dreams",
  subtitle: "Dream Journal with AI Insight"
};
```

### Patterns to Follow

Reference patterns from `patterns.md`:
- Use CSS Animation Pattern for section-reveal
- Use Visual Mockup Section Pattern with MockupElement renderer
- Use Metrics Section Pattern
- Use Tech Deep-Dive Section Pattern
- Use Next Project Preview Card Pattern
- Use Hero Section Pattern (Dual CTAs) with Private Repository badge

### Testing Requirements

- Verify homepage animations still work after globals.css changes
- Test StatViz page animations in browser
- Test `prefers-reduced-motion` behavior
- Verify responsive layout on mobile

---

## Builder-2: Wealth + Mirror of Dreams Pages

### Scope

Transform Wealth and Mirror of Dreams pages following the StatViz template:
1. Add visual mockup sections
2. Add metrics sections
3. Transform tech stack to tech deep-dive
4. Add dual CTAs with Private Repository badge
5. Add enhanced Next Project preview cards
6. Apply section-reveal animations

### Complexity Estimate

**MEDIUM**

Two pages with similar structure. Copy pattern from StatViz template.

### Success Criteria

**Wealth Page:**
- [ ] Visual mockup section with dashboard representation
- [ ] 4 metrics displayed (Israeli bank sync, AI categorization, etc.)
- [ ] Tech Deep-Dive with 6 technologies
- [ ] Dual CTAs (View Live + Private Repository)
- [ ] Enhanced Next Project preview (AI Research Pipeline)
- [ ] section-reveal classes applied to all sections
- [ ] useScrollReveal hook removed

**Mirror of Dreams Page:**
- [ ] Visual mockup section with journal interface representation
- [ ] 4 metrics displayed (subscription tiers, AI reflections, etc.)
- [ ] Tech Deep-Dive with 6 technologies
- [ ] Dual CTAs (View Live + Private Repository)
- [ ] Enhanced Next Project preview (Wealth)
- [ ] section-reveal classes applied to all sections
- [ ] useScrollReveal hook removed

### Files to Modify

- `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/projects/wealth/page.tsx`
- `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/projects/mirror-of-dreams/page.tsx`

### Dependencies

**Depends on:** Builder-1 (globals.css must be complete)
**Blocks:** Nothing

### Implementation Notes

**Wealth Page Data:**

```typescript
// Visual Mockup
const mockupScreens = [
  {
    title: "Financial Dashboard",
    description: "Real-time overview of your finances",
    elements: [
      { type: 'header', label: 'Dashboard' },
      { type: 'card', label: 'Total Balance', accent: true },
      { type: 'chart', label: 'Monthly Spending' },
      { type: 'list', label: 'Recent Transactions' },
    ]
  },
  {
    title: "Transaction View",
    description: "AI-categorized transaction management",
    elements: [
      { type: 'header', label: 'Transactions' },
      { type: 'input', label: 'Search transactions...' },
      { type: 'table', label: 'Transaction List' },
      { type: 'button', label: 'Export Data' },
    ]
  },
];

// Metrics
const metrics = [
  { value: "Local", label: "Israeli Bank Sync" },
  { value: "AI", label: "Smart Categorization" },
  { value: "Real-time", label: "Budget Alerts" },
  { value: "Personal", label: "AI Financial Advisor" },
];

// Tech Deep-Dive
const techDeepDive = [
  { name: "Next.js", why: "Full-stack framework for responsive financial dashboard." },
  { name: "TypeScript", why: "Type-safe financial calculations. No currency bugs." },
  { name: "Prisma", why: "Reliable ORM for transaction storage and querying." },
  { name: "PostgreSQL", why: "ACID-compliant database for financial data integrity." },
  { name: "Claude API", why: "AI-powered categorization and personalized financial advice." },
  { name: "tRPC", why: "Type-safe API layer between frontend and backend." },
];

// Next Project
const nextProject = {
  href: "/projects/ai-research-pipeline",
  emoji: "\u{1F52C}",
  title: "AI Research Pipeline",
  subtitle: "AI-Powered Academic Research"
};
```

**Mirror of Dreams Page Data:**

```typescript
// Visual Mockup
const mockupScreens = [
  {
    title: "Dream Journal",
    description: "Capture your dreams with guided questions",
    elements: [
      { type: 'header', label: 'New Entry' },
      { type: 'input', label: 'What did you dream about?' },
      { type: 'list', label: '5 Sacred Questions' },
      { type: 'button', label: 'Save & Reflect' },
    ]
  },
  {
    title: "AI Reflection",
    description: "Personalized insights from Claude",
    elements: [
      { type: 'header', label: 'Your Reflection' },
      { type: 'card', label: 'AI Insight', accent: true },
      { type: 'list', label: 'Patterns Detected' },
      { type: 'button', label: 'Explore More' },
    ]
  },
];

// Metrics
const metrics = [
  { value: "3", label: "Subscription Tiers" },
  { value: "AI", label: "Claude Reflections" },
  { value: "Secure", label: "PayPal Integration" },
  { value: "Track", label: "Evolution Over Time" },
];

// Tech Deep-Dive
const techDeepDive = [
  { name: "Next.js", why: "React framework with server-side rendering for fast loads." },
  { name: "TypeScript", why: "Type safety for complex dream data structures." },
  { name: "Supabase", why: "Authentication and PostgreSQL database in one." },
  { name: "Claude API", why: "Emotionally intelligent AI for personalized dream insights." },
  { name: "tRPC", why: "End-to-end type-safe API for dream submissions." },
  { name: "PayPal", why: "Trusted subscription management for tier upgrades." },
];

// Next Project
const nextProject = {
  href: "/projects/wealth",
  emoji: "\u{1F4B0}",
  title: "Wealth",
  subtitle: "Personal Finance, Simplified"
};
```

### Patterns to Follow

Reference patterns from `patterns.md`:
- Use Visual Mockup Section Pattern (copy MockupElement function from StatViz)
- Use Metrics Section Pattern
- Use Tech Deep-Dive Section Pattern
- Use Next Project Preview Card Pattern
- Use Hero Section Pattern (Dual CTAs)

### Testing Requirements

- Both pages load without errors
- Animations trigger correctly on page load
- Navigation chain works (Mirror -> Wealth -> AI Research)
- Responsive layout on mobile

---

## Builder-3: AI Research Pipeline Page

### Scope

Transform the AI Research Pipeline page with special considerations:
1. The existing SampleNarratives section serves as the Visual Mockup (preserve it)
2. Add metrics section
3. Transform tech stack to tech deep-dive
4. Add dual CTAs with Private Repository badge
5. Add enhanced Next Project preview card
6. Apply section-reveal animations
7. Remove placeholder useScrollReveal hook

### Complexity Estimate

**MEDIUM**

Most complex page (541 lines) but most structure is preserved. The SampleNarratives section already provides excellent visual proof.

### Success Criteria

- [ ] SampleNarratives section preserved and functioning (this IS the visual proof)
- [ ] 4 metrics displayed in grid
- [ ] Tech Deep-Dive with 4 technologies (replace simple tech stack)
- [ ] Dual CTAs (Contact for Access + Private Repository badge)
- [ ] Enhanced Next Project preview (StatViz)
- [ ] section-reveal classes applied to all sections
- [ ] useScrollReveal hook removed
- [ ] SampleNarratives tab switching still works

### Files to Modify

- `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/projects/ai-research-pipeline/page.tsx`

### Dependencies

**Depends on:** Builder-1 (globals.css must be complete)
**Blocks:** Nothing

### Implementation Notes

**Key Difference:** This page already has a "Sample Outputs" section with tab navigation (lines 349-420). This serves as the Visual Mockup section. Do NOT add another visual mockup section.

**Section Order for AI Research Pipeline:**
1. Hero (enhanced with dual CTAs)
2. Challenge (add section-reveal-1)
3. Solution (add section-reveal-2)
4. Sample Outputs (PRESERVE AS-IS, add section-reveal-3)
5. Capabilities (add section-reveal-4)
6. Use Cases (add section-reveal-5)
7. Tech Deep-Dive (replace Tech Stack, add section-reveal-6)
8. Metrics (NEW, add section-reveal-7)
9. Next Project Preview (ENHANCED, add section-reveal-8)
10. CTA (preserve)
11. Footer (preserve)

**AI Research Pipeline Page Data:**

```typescript
// Metrics (add new section)
const metrics = [
  { value: "10K+", label: "Responses Possible" },
  { value: "5+", label: "Demographic Variables" },
  { value: "2", label: "Languages (EN/HE)" },
  { value: "100%", label: "Culturally Aware" },
];

// Tech Deep-Dive (replace techStack array)
const techDeepDive = [
  { name: "Next.js 15", why: "Server components for fast generation. Modern React patterns." },
  { name: "TypeScript", why: "Type-safe factorial design. Compile-time validation." },
  { name: "React 19", why: "Latest React with concurrent features for smooth UI." },
  { name: "Claude API", why: "Culturally-aware narrative generation with emotional depth." },
];

// Next Project
const nextProject = {
  href: "/projects/statviz",
  emoji: "\u{1F4CA}",
  title: "StatViz",
  subtitle: "Statistical Analysis, Visualized"
};
```

**Hero CTA Update (this page has no live site):**

```tsx
{/* CTA Buttons */}
<div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
  <a
    href="mailto:ahiya.butman@gmail.com"
    className="gentle-button inline-flex items-center space-x-3 text-lg px-8 py-4"
  >
    <span>Contact for Access</span>
  </a>
  <div className="inline-flex items-center space-x-3 px-6 py-3 border border-white/10 rounded-xl text-slate-500">
    <Lock className="w-5 h-5" aria-hidden="true" />
    <span>Private Repository</span>
  </div>
</div>
```

### Patterns to Follow

Reference patterns from `patterns.md`:
- Use Metrics Section Pattern
- Use Tech Deep-Dive Section Pattern
- Use Next Project Preview Card Pattern
- Use Hero Section Pattern (no live site variant)
- Do NOT add Visual Mockup - SampleNarratives section already serves this purpose

### Testing Requirements

- SampleNarratives tab switching still works
- Metrics section displays correctly
- Tech Deep-Dive shows all 4 technologies
- Navigation to StatViz works
- section-reveal animations work

---

## Integration Notes

### Shared Resources

| Resource | Owner | Others Can Use |
|----------|-------|----------------|
| globals.css | Builder-1 | After Builder-1 commits |
| section-reveal classes | Builder-1 | All builders |
| MockupElement function | Builder-1 (StatViz) | Builder-2 (copy to each page) |

### Potential Conflicts

- **None expected** - Each builder owns specific files exclusively
- globals.css is only modified by Builder-1

### Navigation Chain Verification

After all builders complete:

```
ai-research-pipeline -> statviz -> mirror-of-dreams -> wealth -> ai-research-pipeline
```

Verify each "Next Project" card links correctly.

---

## Checklist for All Builders

Before marking complete:

- [ ] Page loads without console errors
- [ ] All section-reveal animations trigger on load
- [ ] `prefers-reduced-motion` respected (animations disabled)
- [ ] Mobile responsive layout works
- [ ] Next Project navigation works
- [ ] useScrollReveal hook completely removed
- [ ] No unused imports
- [ ] TypeScript compiles without errors

---

*Builder tasks finalized: 2025-12-04*
*Iteration: 8 - Phenomenal Project Pages*

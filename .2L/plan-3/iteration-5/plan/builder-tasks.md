# Builder Task Breakdown

## Overview

2 primary builders will work in parallel on completely separate files. No coordination needed.

## Builder Assignment Strategy

- **Builder 1:** Homepage redesign (page.tsx, Navigation.tsx, Footer.tsx)
- **Builder 2:** Project pages (statviz, mirror-of-dreams, wealth)
- Builders work on isolated file sets
- No dependencies between builders

---

## Builder-1: Homepage Redesign

### Scope

Complete homepage content redesign including new sections, updated sections, and component updates (Navigation, Footer).

### Complexity Estimate

**MEDIUM**

Well-defined content changes using existing CSS patterns. Multiple sections but all straightforward.

### Success Criteria

- [ ] Hero section has new headline with "clarity" and "intention" highlighted
- [ ] Hero section has new subheadline about boutique studio
- [ ] Hero CTAs are "See My Work" and "Contact Me"
- [ ] Badge with Zap icon is removed
- [ ] New About section with 4 pillar cards
- [ ] Services section title is "What I Build"
- [ ] Services has 4 cards with new titles: SaaS Systems, AI Research Tools, Automation & Data Pipelines, Architecture & Technical Design
- [ ] Services subtitle about delivery timeline is removed
- [ ] How I Work has 3-phase layout (Architecture, Build, Deliver)
- [ ] How I Work has subtle 2L mention at bottom
- [ ] Portfolio section title is "Selected Work"
- [ ] New Testimonials section with 5 stars and Michal Schriber quote
- [ ] Contact title is "Tell Me What You Want to Build"
- [ ] Contact body mentions 24-hour response
- [ ] Footer says "Made with intention by Ahiya" and "2025 - Building systems that work"
- [ ] Footer Soul link is removed
- [ ] Navigation includes "About" link
- [ ] Navigation Soul link is removed (both desktop and mobile)

### Files to Modify

| File | Purpose |
|------|---------|
| `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/page.tsx` | All homepage sections |
| `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/components/Navigation.tsx` | Add About, remove Soul |
| `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/components/Footer.tsx` | Update text, remove Soul |

### Dependencies

**Depends on:** Nothing
**Blocks:** Nothing (parallel with Builder-2)

### Implementation Notes

#### Step 1: Update page.tsx imports

**Current imports (line 3):**
```tsx
import { Zap, ArrowRight, Mail, Github, Code, Database, Bot, BarChart3 } from "lucide-react";
```

**Replace with:**
```tsx
import { ArrowRight, Mail, Github, Code, Database, FlaskConical, Layers, Star } from "lucide-react";
```

#### Step 2: Replace Hero section (lines 15-51)

Remove badge, update headline, subheadline, and CTAs per patterns.md Hero Section Pattern.

**New headline:** "I build systems with clarity, intention, and the speed of good engineering."
- Wrap "clarity" in `<span className="text-gentle">clarity</span>`
- Wrap "intention" in `<span className="text-gentle">intention</span>`

**New subheadline:** "A boutique studio delivering complete SaaS systems, AI research tools, and automated workflows — designed, built, and deployed end-to-end with precision and intention."

**New CTAs:** "See My Work" -> #portfolio, "Contact Me" -> #contact

#### Step 3: Insert About section (after Hero, line ~52)

Insert the full About section from patterns.md.

#### Step 4: Update Services section (lines 53-87 in current, will shift)

**Changes:**
1. Title: "What I Build" (remove "for Clients")
2. Remove subtitle paragraph about delivery timeline
3. Update 4 cards:

Card 1:
- Icon: `Code` (keep)
- Title: "SaaS Systems"
- Description: "Full-stack platforms built from the ground up, including architecture, backend, frontend, and deployment."

Card 2:
- Icon: `FlaskConical` (new import)
- Title: "AI Research Tools"
- Description: "Custom pipelines for generating structured data, research stimuli, personas, factorial design outputs, and automated workflows."

Card 3:
- Icon: `Database` (keep)
- Title: "Automation & Data Pipelines"
- Description: "CSV processors, LLM-driven generators, ETL workflows, and research automation."

Card 4:
- Icon: `Layers` (new import)
- Title: "Architecture & Technical Design"
- Description: "Database schema design, service layer design, and long-term system planning."

#### Step 5: Keep Portfolio section, update SectionHeading

**Change title:** "Selected Work" (from "What I've Built")
**Keep description as-is.**

#### Step 6: Replace How I Work section

Replace entire section with 3-phase layout from patterns.md.

**Phases:**
1. Architecture: "We define the system clearly: requirements, flows, data models, milestones, and scope." / Outcome: "a sharp blueprint"
2. Build: "Rapid development across backend, frontend, UI, automation, and AI components." / Outcome: "a functioning, production-grade system"
3. Deliver: "Deployment, testing, handover, documentation, and optional support." / Outcome: "a clean, scalable system ready for real use"

**2L mention:** "Powered by 2L — my custom AI orchestration framework."

#### Step 7: Insert Testimonials section (after Portfolio, before Contact)

Use full Testimonials pattern from patterns.md.

**Quote:** "Ahiya is an excellent statistician. He delivered precise results quickly and clearly."
**Attribution:** "Michal Schriber, Head of Department, Herzog College"
**Trust line:** "Trusted by academic researchers across multiple institutions."

#### Step 8: Update Contact section

**New title:** "Tell Me What You Want to Build"
**New body:** "I respond within 24 hours with a clear plan, timeline, and next steps."
**Button text:** "Get in Touch" (was "Send a Message")

#### Step 9: Update Navigation.tsx

**File:** `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/components/Navigation.tsx`

**Changes:**
1. Remove `Sparkles` from lucide-react import (line 6)
2. Update navItems array (lines 13-17):
```tsx
const navItems: NavItem[] = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Contact", href: "#contact" },
];
```
3. Remove Soul link from desktop nav (lines 81-88)
4. Remove Soul link from mobile nav (lines 139-147)
5. Remove mobile menu quote section (lines 150-158) - optional but recommended for cleaner look

#### Step 10: Update Footer.tsx

**File:** `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/components/Footer.tsx`

**Changes:**
1. Remove `Link` import (line 3)
2. Remove `Sparkles` import (line 5)
3. Remove Soul link section (lines 14-23)
4. Update attribution text (line 37-38):
```tsx
<p className="text-center text-slate-500 text-sm mb-2">
  Made with intention by <span className="text-gentle">Ahiya</span>
</p>
```
5. Replace copyright line (lines 41-43):
```tsx
<p className="text-center text-slate-500 text-xs">
  2025 · Building systems that work
</p>
```
6. Remove `currentYear` variable (line 9) - no longer needed

### Patterns to Follow

Reference patterns from `patterns.md`:
- Use Hero Section Pattern for hero
- Use About Section Pattern for new About section
- Use Services Card Pattern for service cards
- Use How I Work Phase Card Pattern for phases
- Use Testimonials Section Pattern for testimonials
- Use Button Patterns for all buttons
- Use Navigation Pattern for nav updates
- Use Footer Pattern for footer

### Testing Requirements

- Visual check on desktop (1200px+)
- Visual check on tablet (768px)
- Visual check on mobile (375px)
- Verify smooth scroll to all anchor links
- Verify 3-column How I Work stacks on mobile

---

## Builder-2: Project Page Upgrades

### Scope

Add Challenge and Solution sections to 3 project pages: StatViz, Mirror of Dreams, Wealth.

### Complexity Estimate

**LOW**

Identical pattern applied to 3 files. Template exists (AI Research Pipeline). Content fully specified.

### Success Criteria

- [ ] StatViz has Challenge section with 4 points
- [ ] StatViz has Solution section with 5 points
- [ ] Mirror of Dreams has Challenge section with 4 points
- [ ] Mirror of Dreams has Solution section with 5 points
- [ ] Wealth has Challenge section with 4 points
- [ ] Wealth has Solution section with 5 points
- [ ] All sections use red dots for challenges, green dots for solutions
- [ ] All sections are placed between Hero and Features

### Files to Modify

| File | Purpose |
|------|---------|
| `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/projects/statviz/page.tsx` | Add Challenge/Solution |
| `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/projects/mirror-of-dreams/page.tsx` | Add Challenge/Solution |
| `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/projects/wealth/page.tsx` | Add Challenge/Solution |

### Dependencies

**Depends on:** Nothing
**Blocks:** Nothing (parallel with Builder-1)

### Implementation Notes

#### Pattern for All 3 Files

1. Add data arrays after `techStack` array
2. Insert Challenge section after Hero `</section>` (after line ~138-145 depending on file)
3. Insert Solution section after Challenge section
4. Both sections go before Features section

#### StatViz Implementation

**File:** `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/projects/statviz/page.tsx`

**Add after techStack array (around line 44):**
```tsx
const challenges = [
  "Traditional report delivery via email is insecure and untracked",
  "Students lose access to reports or forward them inappropriately",
  "No central system for consultants to manage multiple projects",
  "Hebrew RTL content breaks in standard document viewers",
];

const solutions = [
  "Password-protected individual access ensures only authorized students view reports",
  "Centralized admin panel for project and user management",
  "Interactive HTML reports with embedded visualizations",
  "Full Hebrew RTL support for natural reading experience",
  "Dual format delivery (HTML + DOCX) for flexibility",
];
```

**Insert after line 138 (Hero section closing tag):**

Challenge section with intro: "Delivering statistical reports to academic students presents unique challenges:"

Solution section with intro: "StatViz provides a secure, centralized platform for report delivery:"

#### Mirror of Dreams Implementation

**File:** `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/projects/mirror-of-dreams/page.tsx`

**Add after techStack array (around line 51):**
```tsx
const challenges = [
  "Dream journaling apps offer storage but no meaningful insight",
  "Generic AI responses lack personalization and emotional depth",
  "No pathway from casual reflection to deeper exploration",
  "Subscription fatigue from apps that don't deliver value",
];

const solutions = [
  "Claude AI generates deeply personalized, emotionally resonant reflections",
  "5 sacred questions guide users through structured self-exploration",
  "Tiered access (Free/Pro/Unlimited) lets users grow at their own pace",
  "Evolution tracking reveals patterns across sessions over time",
  "PayPal integration for seamless, trusted subscription management",
];
```

**Insert after line 146 (Hero section closing tag):**

Challenge section with intro: "Most dream exploration tools fall short of meaningful reflection:"

Solution section with intro: "Mirror of Dreams creates space for genuine self-discovery:"

#### Wealth Implementation

**File:** `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/projects/wealth/page.tsx`

**Add after techStack array (around line 51):**
```tsx
const challenges = [
  "Manual transaction entry is tedious and often abandoned",
  "Generic categorization misses personal spending patterns",
  "Israeli bank integration is rare in international finance apps",
  "Budget alerts come too late, after overspending occurs",
];

const solutions = [
  "Automatic bank sync imports transactions in real-time",
  "Claude AI learns your unique spending patterns for smart categorization",
  "Native support for Israeli banks and local payment methods",
  "Proactive budget alerts before you exceed limits",
  "AI financial advisor provides personalized guidance based on your actual data",
];
```

**Insert after line 145 (Hero section closing tag):**

Challenge section with intro: "Personal finance tools often fail Israeli users in key ways:"

Solution section with intro: "Wealth brings intelligent, localized financial management:"

### Full Challenge Section JSX

```tsx
{/* The Challenge Section */}
<section className="section-breathing">
  <div className="container-content">
    <h2 className="heading-xl text-center spacing-generous">
      The Challenge
    </h2>
    <div className="contemplative-card p-6 md:p-8">
      <p className="body-lg text-slate-300 mb-6">
        {/* INSERT PROJECT-SPECIFIC INTRO TEXT HERE */}
      </p>
      <ul className="space-y-4">
        {challenges.map((challenge, index) => (
          <li key={index} className="flex items-start space-x-3">
            <div className="w-2 h-2 rounded-full bg-red-400/60 mt-2 flex-shrink-0" />
            <span className="text-slate-300">{challenge}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
</section>
```

### Full Solution Section JSX

```tsx
{/* The Solution Section */}
<section className="section-breathing">
  <div className="container-content">
    <h2 className="heading-xl text-center spacing-generous">
      The Solution
    </h2>
    <div className="contemplative-card p-6 md:p-8">
      <p className="body-lg text-slate-300 mb-6">
        {/* INSERT PROJECT-SPECIFIC INTRO TEXT HERE */}
      </p>
      <ul className="space-y-4">
        {solutions.map((solution, index) => (
          <li key={index} className="flex items-start space-x-3">
            <div className="w-2 h-2 rounded-full bg-emerald-400/60 mt-2 flex-shrink-0" />
            <span className="text-slate-300">{solution}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
</section>
```

### Patterns to Follow

Reference patterns from `patterns.md`:
- Use Challenge Section Pattern for all challenge sections
- Use Solution Section Pattern for all solution sections
- Use red dots (`bg-red-400/60`) for challenges
- Use green dots (`bg-emerald-400/60`) for solutions

### Testing Requirements

- Visual check each project page
- Verify sections appear between Hero and Features
- Verify red dots for challenges, green dots for solutions
- Check mobile layout (should stack naturally)

---

## Builder Execution Order

### Parallel Group 1 (No dependencies)

Both builders start immediately:

- **Builder-1:** Homepage Redesign
- **Builder-2:** Project Page Upgrades

### Integration Notes

- No file conflicts between builders
- No shared state or components modified by both
- Builders can work completely independently
- Integration is simple merge of all changes

---

## Estimated Time

| Builder | Task | Estimate |
|---------|------|----------|
| Builder-1 | Homepage + Nav + Footer | 30 minutes |
| Builder-2 | 3 Project Pages | 25 minutes |
| **Total** | Parallel execution | **~30 minutes** |

---

**Task Breakdown Status:** READY FOR EXECUTION

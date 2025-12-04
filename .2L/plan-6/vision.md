# Project Vision: Phenomenal Project Pages

**Created:** 2025-12-04T12:45:00Z
**Plan:** plan-6

---

## Problem Statement

The project pages are currently functional but not impressive. They document projects but don't **sell** them. A visitor should leave each project page thinking "I need to work with this person" — currently they leave thinking "okay, that's a project."

**Current state:**
- Basic structure (Challenge → Solution → Features → Tech Stack)
- Static presentation
- Tech stack is just a list of names
- No visual proof (screenshots, demos)
- No GitHub links for credibility
- No metrics or outcomes
- Broken scroll animations (now removed)

**Target state:**
- Each project page is a **mini-experience**
- Visual proof that the work is real and impressive
- Technical depth that demonstrates expertise
- Metrics that prove impact
- Smooth, working animations
- Links to live sites AND source code

---

## Target Users

Same as homepage:
- Decision-makers evaluating whether to hire
- Technical peers assessing capability
- Potential collaborators

**What they're looking for on project pages:**
- "Is this real?" → Visual proof
- "Can they actually build?" → GitHub, tech depth
- "What was the outcome?" → Metrics, testimonials
- "Is this relevant to me?" → Clear problem/solution framing

---

## Core Value Proposition

**Before:** "Here's a project I built."
**After:** "Here's proof I can solve problems like yours."

---

## Feature Breakdown

### Must-Have (MVP)

#### 1. **Visual Proof Section**

Each project gets a dedicated "See It In Action" section with:

**Screenshots:**
- 2-4 high-quality screenshots of the actual application
- Full-width or large cards with subtle hover zoom
- Captions explaining what's shown

**For projects without screenshots available:**
- Architecture diagram
- Flow visualization
- Code snippet highlights

**Implementation:**
```
## See It In Action

[Screenshot 1: Dashboard overview]
[Screenshot 2: Key feature in use]
[Screenshot 3: Mobile view or detail]
```

**Technical note:** Store images in `/public/projects/{slug}/` directory.

---

#### 2. **GitHub Links**

Add GitHub repository links where applicable:

**AI Research Pipeline:** Private (client work) — show "Private Repository" badge
**StatViz:** If public, link to repo
**Mirror of Dreams:** Link to repo
**Wealth:** Link to repo

**Display:**
```tsx
<div className="flex gap-4">
  <a href={liveLink}>
    <ExternalLink /> Live Site
  </a>
  <a href={githubLink}>
    <Github /> View Source
  </a>
</div>
```

If private: Show "Private Repository" with lock icon instead.

---

#### 3. **Tech Deep-Dive Section**

Transform the tech stack from a list to a story:

**Current:**
```
Tech Stack: Next.js, TypeScript, Prisma, PostgreSQL
```

**New:**
```
## Built With

### Next.js 15 + React 19
Server components for speed. App router for clean architecture.

### TypeScript
End-to-end type safety. Fewer bugs, faster development.

### Prisma + PostgreSQL
Type-safe database access. Reliable, scalable data layer.

### Claude API
AI that understands context. Personalized, not generic.
```

Each technology gets:
- Name + version (where relevant)
- One-line "why" explanation
- Shows thoughtful tech choices, not just tool familiarity

---

#### 4. **Metrics & Outcomes Section**

Add concrete numbers where available:

**AI Research Pipeline:**
- "10,000+ synthetic responses generated"
- "5 demographic variables supported"
- "Bilingual: English + Hebrew"

**StatViz:**
- "X students served" (if known)
- "Dual format delivery (HTML + DOCX)"
- "Full Hebrew RTL support"

**Mirror of Dreams:**
- "3 subscription tiers"
- "AI-powered reflections via Claude"
- "PayPal integration for seamless payments"

**Wealth:**
- "Israeli bank sync support"
- "AI categorization with Claude"
- "Real-time budget alerts"

**Display:**
```tsx
<div className="grid grid-cols-3 gap-6 text-center">
  <div>
    <div className="text-4xl font-bold text-purple-400">10K+</div>
    <div className="text-slate-400">Responses Generated</div>
  </div>
  ...
</div>
```

---

#### 5. **Working Scroll Animations**

Fix the broken scroll reveal with a reliable implementation:

**Approach:**
- Use CSS-only animations with `animation-timeline: view()` where supported
- Fallback to simple fade-in on load for browsers without support
- NO JavaScript-based opacity-0 that can break

**Or simpler:**
- Just use CSS `@keyframes` with `animation-delay` on page load
- Stagger sections by 0.1s, 0.2s, 0.3s, etc.
- Works everywhere, no IntersectionObserver needed

**Implementation:**
```css
.section-reveal {
  animation: fade-in-up 0.6s ease forwards;
  opacity: 0;
}
.section-reveal:nth-child(1) { animation-delay: 0.1s; }
.section-reveal:nth-child(2) { animation-delay: 0.2s; }
/* etc */
```

This is simpler and more reliable than IntersectionObserver for this use case.

---

#### 6. **Improved Hero Section**

Make the hero more impactful:

**Current:**
- Emoji
- Title
- One-liner
- "Visit Live Site" button

**Enhanced:**
- Emoji (keep, it's working)
- Title (larger, bolder)
- One-liner (punchier)
- **Two CTAs:** "View Live" + "View Source" (or "Private Repo")
- Subtle animated gradient background (already have `hero-gradient-bg`)

---

#### 7. **Project Navigation**

Improve the "Next Project" section:

**Current:**
```
Next: StatViz →
```

**Enhanced:**
```
Continue Exploring

[Card preview of next project with emoji, title, one-liner]
→ StatViz: Statistical Analysis, Visualized
```

Add a subtle preview card that entices clicking.

---

#### 8. **Consistent Structure Across All Pages**

Ensure all 4 project pages follow the same structure:

1. **Hero** — Full viewport, gradient, emoji, title, tagline, CTAs
2. **Visual Proof** — Screenshots or diagrams (NEW)
3. **The Challenge** — Problem framing
4. **The Solution** — How it was solved
5. **Key Features** — 4 feature cards
6. **Tech Deep-Dive** — Why each technology (ENHANCED)
7. **Metrics** — Concrete numbers (NEW)
8. **Next Project** — Preview card (ENHANCED)
9. **CTA** — Contact prompt
10. **Footer** — Minimal

---

### Should-Have (Post-MVP)

#### 9. **Interactive Code Snippets**

For technical visitors, show actual code:
- Syntax-highlighted code blocks
- Key architectural decisions
- "How it works" explanations

#### 10. **Video Demos**

Short (30-60 second) screen recordings:
- Walking through key features
- Showing the system in action
- Hosted on YouTube or embedded directly

#### 11. **Testimonials Per Project**

If available, project-specific testimonials:
- Quote from the client/user
- Adds credibility to that specific project

---

## Page-Specific Content

### AI Research Pipeline

**Hero:**
- 🔬 (microscope)
- "AI-Powered Academic Research"
- "From raw sources to publication-ready insights. Automatically."

**Visual Proof:**
- Screenshot of the sample output interface (the tab selector)
- Example generated narrative
- Demographic profile display

**Metrics:**
- 10,000+ responses possible
- 5+ demographic variables
- Bilingual (EN/HE)
- Used in academic research

**Tech Deep-Dive:**
- Next.js 15 — Server components for fast generation
- TypeScript — Type-safe factorial design
- Claude API — Culturally-aware narrative generation
- React 19 — Modern UI patterns

**GitHub:** Private (client research tool)

---

### StatViz

**Hero:**
- 📊 (chart)
- "Statistical Analysis, Visualized"
- "Complex data made clear and beautiful."

**Visual Proof:**
- Screenshot of admin panel
- Screenshot of student report view
- Example visualization

**Metrics:**
- Dual format (HTML + DOCX)
- Full Hebrew RTL
- Secure password-protected access
- Centralized project management

**Tech Deep-Dive:**
- Next.js — Full-stack in one framework
- Prisma + PostgreSQL — Reliable data layer
- JWT — Secure authentication
- TypeScript — End-to-end type safety

**GitHub:** [Link if public, or "Private Repository"]

---

### Mirror of Dreams

**Hero:**
- 🌙 (moon)
- "Dream Journal with AI Insight"
- "Capture, understand, remember."

**Visual Proof:**
- Screenshot of journal entry
- Screenshot of AI reflection
- Subscription tiers display

**Metrics:**
- 3 subscription tiers
- Claude-powered reflections
- PayPal integration
- Evolution tracking

**Tech Deep-Dive:**
- Next.js — React framework
- Supabase — Auth + Database
- Claude API — Personalized AI insights
- tRPC — Type-safe API layer
- PayPal — Subscription management

**GitHub:** [Link]

---

### Wealth

**Hero:**
- 💰 (money bag)
- "Personal Finance, Simplified"
- "Clarity from financial chaos."

**Visual Proof:**
- Screenshot of dashboard
- Screenshot of transaction categorization
- Budget alerts view

**Metrics:**
- Israeli bank sync
- AI categorization
- Real-time alerts
- Personal AI advisor

**Tech Deep-Dive:**
- Next.js — Full-stack framework
- Prisma + PostgreSQL — Transaction storage
- Claude API — Smart categorization + advisor
- tRPC — Type-safe mutations

**GitHub:** [Link]

---

## Technical Requirements

**Files to modify:**
- `app/projects/ai-research-pipeline/page.tsx`
- `app/projects/statviz/page.tsx`
- `app/projects/mirror-of-dreams/page.tsx`
- `app/projects/wealth/page.tsx`
- `app/globals.css` (animation fixes)

**New assets needed:**
- `/public/projects/ai-research-pipeline/` — screenshots
- `/public/projects/statviz/` — screenshots
- `/public/projects/mirror-of-dreams/` — screenshots
- `/public/projects/wealth/` — screenshots

**Note:** If screenshots aren't available, use placeholder sections that can be filled later, or create simple diagrams/illustrations.

**Animation approach:**
- CSS-only with `animation-delay` staggering
- No JavaScript-based opacity changes
- Simpler = more reliable

---

## Success Criteria

1. **Visual impact**
   - Each project page has at least 2 visual elements (screenshots/diagrams)
   - Visitor can SEE what was built

2. **Technical credibility**
   - GitHub links where applicable
   - Tech choices explained, not just listed
   - Shows thoughtful engineering

3. **Measurable outcomes**
   - Each project has 3-4 metrics displayed
   - Numbers create concrete impression

4. **Smooth experience**
   - Animations work reliably
   - No broken scroll effects
   - Fast page loads

5. **Clear next action**
   - Visitor knows how to contact
   - Next project is enticing

---

## Out of Scope

- Video production (can add later)
- Interactive code playgrounds
- Project-specific testimonials (unless already available)
- Major content rewrites (just enhancement)

---

## Open Questions

1. **Screenshots:** Do you have screenshots of each project? If not, we can:
   - Create placeholder sections
   - Use architecture diagrams
   - Skip visual proof for now and add later

2. **GitHub repos:** Which projects have public repos?
   - AI Research Pipeline: Private?
   - StatViz: Public?
   - Mirror of Dreams: Public?
   - Wealth: Public?

3. **Metrics:** Are the numbers I suggested accurate? Should adjust?

---

## Summary: Before → After

| Element | Before | After |
|---------|--------|-------|
| Visual Proof | None | Screenshots/diagrams for each |
| GitHub | None | Links where applicable |
| Tech Stack | List of names | Deep-dive with "why" |
| Metrics | None | 3-4 numbers per project |
| Animations | Broken | CSS-only, reliable |
| Next Project | Text link | Preview card |
| Overall Feel | Documentation | Mini-experience |

---

## Next Steps

1. Answer the open questions (screenshots, GitHub, metrics)
2. Run `/2l-mvp` to execute
3. Add screenshots when available

---

**Vision Status:** VISIONED
**Ready for:** Execution (pending screenshot availability)

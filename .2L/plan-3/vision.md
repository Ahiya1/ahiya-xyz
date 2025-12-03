# Project Vision: Ahiya Studio Homepage Redesign

**Created:** 2025-12-03T17:30:00Z
**Plan:** plan-3

---

## Problem Statement

The current homepage is functional but generic. It reads like a capable freelancer's landing page rather than a boutique studio with a distinct identity. Key gaps:

**Current pain points:**
- Hero ("I Build SaaS Systems Fast") lacks personality and philosophical depth
- No About section — visitors don't know who Ahiya is
- "How I Work" section focuses on 2L tooling instead of client-facing process
- No testimonials or trust signals
- Project pages are feature lists, not case studies

---

## Target Users

**Primary user:** Potential clients seeking custom software development
- Academic researchers needing data tools
- Businesses needing SaaS systems
- Professionals needing automation workflows

**Secondary users:** Technical peers evaluating collaboration

---

## Core Value Proposition

A boutique engineering studio that builds complete systems with clarity, intention, and the speed of good engineering.

**Key benefits:**
1. End-to-end delivery (architecture to deployment)
2. Speed without sacrificing quality
3. Clear, transparent process
4. Modern AI integration where it matters

---

## Feature Breakdown

### Must-Have (MVP)

#### 1. **Redesigned Hero Section**
- New headline: "I build systems with clarity, intention, and the speed of good engineering."
- Subtext: "A boutique studio delivering complete SaaS systems, AI research tools, and automated workflows — designed, built, and deployed end-to-end with precision and intention."
- Two CTAs: "See My Work" (scroll to portfolio) and "Contact Me" (jump to CTA)
- Visual: Dark background, soft purple gradient accents, minimal and confident

#### 2. **New About Section**
- Title: "About Me"
- Introduction: Systems architect and full-stack engineer identity
- Four pillars displayed as cards or inline:
  - **Architecture** — clear data models, services, structure
  - **Speed** — rapid development without sacrificing quality
  - **Intention** — thoughtful design, grounded decision-making
  - **Intelligence** — modern AI pipelines where they matter
- Closing line: "I work alone, but I build like a studio: fast, reliable, well-structured, and aesthetically clean."

#### 3. **Services Overview Section**
- Title: "What I Build"
- Four service categories with icons:
  - **SaaS Systems** — Full-stack platforms from ground up
  - **AI Research Tools** — Custom pipelines, structured data, research automation
  - **Automation & Data Pipelines** — CSV processors, ETL, LLM workflows
  - **Architecture & Technical Design** — Schema design, system planning
- Keep concise, category-based — no project details here

#### 4. **Redesigned How I Work Section**
- Title: "How I Work"
- Subtitle: "A simple, transparent, end-to-end process."
- Three phases displayed horizontally or as timeline:
  - **Phase 1 — Architecture**: Define system clearly (requirements, flows, data models, scope). Outcome: sharp blueprint.
  - **Phase 2 — Build**: Rapid development across all components. Outcome: functioning, production-grade system.
  - **Phase 3 — Deliver**: Deployment, testing, handover, documentation. Outcome: clean, scalable system ready for use.
- Subtle 2L mention at bottom: "Powered by 2L — my custom AI orchestration framework."

#### 5. **Selected Work Section**
- Title: "Selected Work"
- Display 4 project cards (2x2 grid):
  - **AI Research Pipeline** — "A custom AI system that generates culturally nuanced, demographically accurate first-person narratives and factorial design outputs at scale."
  - **StatViz** — "A secure platform for delivering interactive statistical reports to academic students, with admin panel and full RTL support."
  - **Mirror of Dreams** — "AI-powered reflection platform with tiered subscriptions for dream exploration and personalized insights."
  - **Wealth** — "Personal finance SaaS with AI categorization, Israeli bank connections, and intelligent financial advisor."
- Each card: Project name, one-sentence summary, "View Project →" link
- No duplicated content from project pages

#### 6. **Testimonial Section**
- Title: "Trusted by Researchers and Professionals"
- Single testimonial block:
  - ★★★★★
  - "Ahiya is an excellent statistician. He delivered precise results quickly and clearly."
  - — **Michal Schriber**, Head of Department, Herzog College
- Trust line below: "Trusted by academic researchers across multiple institutions."
- Keep minimal

#### 7. **Redesigned CTA Section**
- Title: "Tell Me What You Want to Build"
- Body: "I respond within 24 hours with a clear plan, timeline, and next steps."
- Primary button: "Get in Touch" (mailto link)
- Secondary: GitHub link (keep existing)
- Tone: Calm, not salesy

#### 8. **Updated Footer**
- Signature: "Made with intention by Ahiya"
- Year: 2025
- Tagline: "Building systems that work"
- Keep dark, minimal, quiet

### Should-Have (Project Page Upgrades)

#### 9. **Upgrade StatViz Project Page**
- Add "The Challenge" section (problem it solves)
- Add "The Solution" section (approach taken)
- Keep existing features section
- Add "Show the Work" section (screenshots or report preview if possible)
- Keep tech stack and CTA

#### 10. **Upgrade Mirror of Dreams Project Page**
- Add "The Challenge" section
- Add "The Solution" section
- Keep existing features section
- Add visual proof section if applicable
- Keep tech stack and CTA

#### 11. **Upgrade Wealth Project Page**
- Add "The Challenge" section
- Add "The Solution" section
- Keep existing features section
- Add visual proof section if applicable
- Keep tech stack and CTA

#### 12. **AI Research Pipeline Page** (Already Good)
- Already has Challenge/Solution/Sample Outputs structure
- No major changes needed
- Optional: Minor refinements for consistency

---

## User Flows

### Flow 1: New Visitor Exploring Services

**Steps:**
1. Visitor lands on homepage, sees hero with clear value proposition
2. Scrolls to About section, understands who Ahiya is
3. Scrolls to Services, sees capability categories
4. Scrolls to How I Work, understands the process
5. Scrolls to Selected Work, sees project summaries
6. Clicks "View Project →" on interesting project
7. Reads case study (Problem → Solution → Features → Proof)
8. Returns to homepage or clicks CTA
9. Contacts via email

**Edge cases:**
- Mobile users: Responsive layout, hamburger nav
- Quick visitors: Hero CTA jumps directly to portfolio or contact

### Flow 2: Returning Visitor Ready to Contact

**Steps:**
1. Lands on homepage
2. Clicks "Contact Me" in hero or nav
3. Jumps to CTA section
4. Clicks "Get in Touch" (mailto)

---

## Design Guidelines

### Visual
- Background: Dark (#0a0f1a)
- Accents: Soft purple gradients, minimal
- Cards: Glass-morphism with subtle borders (existing style)
- Spacing: Generous, breathing room between sections
- Animations: Minimal — fade-in on scroll only, no distracting motion

### Typography
- Keep existing font system
- Hierarchy: Display for hero, heading for sections, body for content

### Tone
- Calm
- Confident
- Intentional
- Precise
- Slightly philosophical but never mystical

### Brand Message
A blend of **clarity**, **intention**, **speed**, and **intelligence** — reflected in both content and design.

---

## Technical Requirements

**Must support:**
- Responsive design (mobile-first)
- Smooth scroll navigation
- Accessible (ARIA labels, semantic HTML)
- Fast load times (no heavy assets)

**Constraints:**
- Keep existing Next.js/React/Tailwind stack
- No new dependencies unless necessary
- Maintain existing URL structure (/projects/*)

**Preferences:**
- Reuse existing component patterns (breathing-glass, contemplative-card, etc.)
- Keep consistent with current dark theme

---

## Success Criteria

**The redesign is successful when:**

1. **Brand identity is clear**
   - Metric: Hero communicates philosophical approach, not just capability
   - Target: Visitor understands "clarity, intention, speed" within 5 seconds

2. **Trust is established**
   - Metric: Testimonial and process sections visible above fold on desktop
   - Target: Credibility signals present before portfolio

3. **Navigation is intuitive**
   - Metric: All sections reachable via nav and scroll
   - Target: Contact accessible in 1 click from any point

4. **Project pages tell stories**
   - Metric: Each project page has Problem/Solution structure
   - Target: 3 of 4 project pages upgraded to case study format

---

## Out of Scope

**Explicitly not included:**
- Contact form (keep mailto for now)
- Blog or writing section
- Pricing page
- Multi-language support
- Analytics integration
- CMS for content management

**Why:** Focus on core homepage and portfolio experience first. These can be added in future iterations.

---

## Assumptions

1. Existing visual design language (dark theme, glass cards, purple accents) is retained
2. All four project pages remain at current URLs
3. GitHub link in CTA section is acceptable (not requiring separate social section)
4. Single testimonial is sufficient for MVP (more can be added later)
5. 2L mention is one line, not a dedicated section

---

## Open Questions

1. Should "Show the Work" on project pages include actual screenshots, or just descriptive sections?
2. Is the testimonial quote accurate as written, or does it need adjustment?
3. Should the About section pillars be cards (visual) or inline text?

---

## Content Reference

### Hero
```
Headline: "I build systems with clarity, intention, and the speed of good engineering."

Subtext: "A boutique studio delivering complete SaaS systems, AI research tools, and automated workflows — designed, built, and deployed end-to-end with precision and intention."

CTA 1: "See My Work" → scrolls to #portfolio
CTA 2: "Contact Me" → scrolls to #contact
```

### About
```
I'm Ahiya, a systems architect and full-stack engineer.

I build complete software systems — architecture, backend, frontend, AI tooling, automation, UX, and deployment. Every system is designed with clarity, built with intention, and delivered with clean, scalable engineering.

My work lives at the intersection of:
• Architecture — clear data models, services, structure
• Speed — rapid development without sacrificing quality
• Intention — thoughtful design, grounded decision-making
• Intelligence — modern AI pipelines where they matter

I work alone, but I build like a studio: fast, reliable, well-structured, and aesthetically clean.
```

### Services
```
What I Build

• SaaS Systems
  Full-stack platforms built from the ground up, including architecture, backend, frontend, and deployment.

• AI Research Tools
  Custom pipelines for generating structured data, research stimuli, personas, factorial design outputs, and automated workflows.

• Automation & Data Pipelines
  CSV processors, LLM-driven generators, ETL workflows, and research automation.

• Architecture & Technical Design
  Database schema design, service layer design, and long-term system planning.
```

### How I Work
```
How I Work
A simple, transparent, end-to-end process.

Phase 1 — Architecture
We define the system clearly: requirements, flows, data models, milestones, and scope.
Outcome: a sharp blueprint.

Phase 2 — Build
Rapid development across backend, frontend, UI, automation, and AI components.
Outcome: a functioning, production-grade system.

Phase 3 — Deliver
Deployment, testing, handover, documentation, and optional support.
Outcome: a clean, scalable system ready for real use.

Powered by 2L — my custom AI orchestration framework.
```

### Testimonial
```
Trusted by Researchers and Professionals

★★★★★
"Ahiya is an excellent statistician. He delivered precise results quickly and clearly."
— Michal Schriber, Head of Department, Herzog College

Trusted by academic researchers across multiple institutions.
```

### CTA
```
Tell Me What You Want to Build

I respond within 24 hours with a clear plan, timeline, and next steps.

[Get in Touch]  [GitHub]
```

### Footer
```
Made with intention by Ahiya
2025 · Building systems that work
```

---

## Next Steps

- [ ] Review and refine this vision
- [ ] Run `/2l-plan` for interactive master planning
- [ ] OR run `/2l-mvp` to auto-plan and execute

---

**Vision Status:** VISIONED
**Ready for:** Master Planning

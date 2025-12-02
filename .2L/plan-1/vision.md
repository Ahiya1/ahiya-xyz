# Project Vision: ahiya.xyz Business Transformation

**Created:** 2025-12-02T09:15:00Z
**Plan:** plan-1
**Type:** Complete Site Transformation (Philosophical → Business Portfolio)

---

## Problem Statement

The current ahiya.xyz is a beautiful, sophisticated philosophical site about "technology that serves presence, not productivity." While authentic to Ahiya's journey, it does **not** communicate value to the target audience: software agencies, startups, and founders looking to hire a freelance developer.

**Current pain points:**

- **Wrong message for business:** "Sacred Potato energy" and "consciousness through code" don't resonate with agencies looking for reliable contractors
- **Hidden capabilities:** The site mentions projects philosophically but doesn't showcase actual deployed systems (Wealth, StatViz, Mirror-of-Dreams)
- **No clear CTA:** "If your soul recognizes something here" is not a business pitch
- **Missing 2L differentiation:** The proprietary AI orchestration framework isn't mentioned
- **No portfolio of real work:** Current projects (Selah, AI Mafia, DiveInk) are blueprints, not deployed systems
- **No dev journal/case studies:** Missing content marketing that builds trust with technical clients

**Impact:**
- Agencies visiting the site won't understand what Ahiya can build for them
- Lost freelance opportunities due to unclear value proposition
- Beautiful site, wrong audience

---

## Target Users

### Primary: Software Agencies

**Who they are:**
- Small-medium agencies (5-50 people) with overflow work
- Need contractors who can own entire features or MVPs independently
- Value speed, reliability, and clean architecture
- Don't have time for hand-holding or extensive onboarding

**What they need to see:**
- Proof of shipped products
- Technical competence (stack familiarity)
- Evidence of independent execution
- Professional communication style

### Secondary: Startups & Non-Technical Founders

**Who they are:**
- Early-stage startups needing MVP development
- Founders with ideas but no technical co-founder
- Budget-conscious but need quality

**What they need to see:**
- End-to-end capability (idea → deployed product)
- Understanding of product, not just code
- Clear pricing/engagement model
- Trust signals (portfolio, testimonials)

---

## Core Value Proposition

**"I build complete SaaS systems fast using 2L, a proprietary AI orchestration framework I developed."**

**Key differentiators:**
1. **Full-stack ownership:** Frontend, backend, infrastructure, deployment
2. **AI-native development:** Deep LLM integration experience, not just "uses ChatGPT"
3. **Proven speed:** 4 deployed systems demonstrating rapid execution
4. **Unique methodology:** 2L framework coordinates AI agents for exploration, planning, building, and validation
5. **Production experience:** Real systems handling real users

---

## Feature Breakdown

### Must-Have (MVP)

#### 1. **New Homepage: Business-First Hero**

**Description:** Complete redesign of homepage with clear business value proposition

**Current state:**
```
"Building technology that serves presence, not productivity"
"Sometimes we are consciousness taking itself too seriously..."
```

**Target state:**
```
"I Build SaaS Systems Fast"
"Full-stack development with AI-powered orchestration.
From idea to deployed product, independently."

[View Portfolio] [Work With Me]
```

**Acceptance criteria:**
- [ ] Hero headline clearly states what Ahiya does for clients
- [ ] Subheadline mentions speed and independence
- [ ] Two primary CTAs: Portfolio and Contact
- [ ] Professional, clean design (keep dark theme, remove mystical elements)
- [ ] Mobile responsive
- [ ] Fast load time (<2s)

---

#### 2. **Portfolio Section: 4 Deployed Projects**

**Description:** Showcase real, deployed systems with screenshots, descriptions, and tech stacks

**Projects to feature:**

**A. Wealth (Financial Tracking)**
- **What it is:** Personal finance SaaS for expense tracking and insights
- **Explore:** Read actual codebase at `~/Ahiya/2L/Prod/wealth`
- **Show:** Screenshots, live link, tech stack, key features
- **Message:** "Full SaaS with auth, subscriptions, dashboards"

**B. StatViz (Data Visualization)**
- **What it is:** Statistical visualization and analysis platform
- **Explore:** Read actual codebase at `~/Ahiya/2L/Prod/StatViz`
- **Show:** Screenshots, live link, tech stack, key features
- **Message:** "Complex data processing and visualization"

**C. Mirror-of-Dreams (Creative/AI)**
- **What it is:** AI-powered reflection tool with tiered pricing
- **Explore:** Read actual codebase at `~/Ahiya/2L/Prod/mirror-of-dreams`
- **Show:** Screenshots, live link (mirror-of-truth.xyz), tech stack
- **Message:** "AI integration with Stripe payments"

**D. AI Research Pipeline (Olympic Youth)**
- **What it is:** Factorial design prompt generator + n8n batch processing
- **Explore:** Read codebase at `~/olympic-youth/olympic-youth-app`
- **Show:** Screenshots of UI, workflow diagram, sample outputs
- **Message:** "Custom AI data processing at scale"

**Sample AI Output (translated):**
> "I started playing basketball at 12, when my mother was looking for suitable physical activity for Orthodox girls. The club was one of the few that offered a framework adapted to our background... At 17, I felt like an old woman who had already given everything. I wanted to live a normal life like other girls my age."

**Acceptance criteria:**
- [ ] Each project has: title, description, screenshot(s), tech stack, live link (if applicable)
- [ ] Projects ordered by impressiveness/relevance
- [ ] Card hover effects (can reuse existing animation system)
- [ ] "View Details" expands to full case study (optional for MVP)
- [ ] AI Research Pipeline includes 2-3 translated sample outputs
- [ ] Tech stack badges for each project

---

#### 3. **"How I Work" Section: 2L Methodology**

**Description:** Brief introduction to 2L as competitive advantage

**Content:**
```markdown
## How I Work

I use **2L**, a development framework I built that coordinates AI agents
to explore, plan, build, and validate software autonomously.

This is why I can deliver complete systems faster than traditional development:
- Multiple AI agents work in parallel on different aspects
- Automated exploration of existing codebases
- Structured planning before any code is written
- Built-in validation and quality checks

**Curious?** [Ask me about it →]
```

**Acceptance criteria:**
- [ ] Maximum 4-5 sentences
- [ ] Focus on outcomes (speed, quality), not process details
- [ ] Link to contact for more information
- [ ] No mystical/philosophical language
- [ ] Optional: small diagram showing Vision → Plan → Build → Validate flow

---

#### 4. **Contact Section: Clear CTA**

**Description:** Simple, professional contact section

**Content:**
```markdown
## Work With Me

Looking for a developer who can own your next feature or MVP?

**Email:** ahiya.butman@gmail.com
**GitHub:** github.com/Ahiya1

[Send a Message]
```

**Acceptance criteria:**
- [ ] Email displayed prominently
- [ ] GitHub link
- [ ] Optional: Simple contact form (name, email, message)
- [ ] Optional: Calendly link for scheduling calls
- [ ] Professional tone, no "soul recognition" language

---

#### 5. **Archive Philosophical Content: /soul Subdirectory**

**Description:** Move all philosophical content to archive, accessible but not prominent

**Current pages to archive:**
- `/` (current homepage) → `/soul`
- `/journey` → `/soul/journey`
- `/writing` → `/soul/writing`
- `/writing/sacred-potato` → `/soul/writing/sacred-potato`
- `/building` (current version) → `/soul/building`
- `/blueprint/*` → `/soul/blueprint/*`
- `/connect` (current version) → `/soul/connect`

**Implementation:**
- Create `/soul` route group
- Move all existing pages under `/soul`
- Keep all existing styles, animations, content intact
- Add small footer link on main site: "The philosophical side →"

**Acceptance criteria:**
- [ ] All philosophical content preserved at `/soul/*`
- [ ] Current animations and effects still work
- [ ] Footer link from main site to `/soul`
- [ ] `/soul` has its own navigation (current nav structure)
- [ ] SEO: canonical URLs updated, redirects if needed
- [ ] No broken links

---

#### 6. **Updated Navigation**

**Description:** New navigation structure for business site

**Current nav:**
```
Ahiya | Home | Journey | Writing | Connect
```

**New nav:**
```
Ahiya | Portfolio | How I Work | Contact | [Soul →]
```

**Acceptance criteria:**
- [ ] Clean, minimal navigation
- [ ] "Soul" link subtle (smaller, different style, or footer only)
- [ ] Mobile hamburger menu
- [ ] Sticky header with backdrop blur

---

#### 7. **Updated Metadata & SEO**

**Description:** Update all SEO metadata for business positioning

**Current:**
```
Title: "Ahiya - Technology that serves presence"
Description: "Building contemplative technology from Sacred Potato energy"
Keywords: "contemplative technology", "consciousness", "sacred potato"...
```

**New:**
```
Title: "Ahiya Butman - Full-Stack Developer | SaaS & AI Systems"
Description: "I build complete SaaS systems fast using AI-powered development.
             Full-stack, from idea to deployment. View my portfolio."
Keywords: "full-stack developer", "SaaS development", "AI integration",
          "freelance developer", "Next.js", "TypeScript", "startup MVP"
```

**Acceptance criteria:**
- [ ] Updated title, description, keywords
- [ ] OpenGraph tags for social sharing
- [ ] Twitter card metadata
- [ ] Structured data (JSON-LD) for person/developer
- [ ] Favicon can stay the same

---

### Should-Have (Post-MVP)

1. **Dev Journal / Case Studies**
   - Blog-style section for technical writing
   - Case study for each portfolio project
   - SEO-friendly technical content
   - Markdown-based for easy writing

2. **Testimonials Section**
   - Space for client testimonials (populate later)
   - Simple quote + name + company format

3. **Services/Pricing Page**
   - Clear service offerings
   - Hourly/project rate ranges
   - Engagement models (hourly, weekly, project-based)

4. **Contact Form with Backend**
   - Form submissions to email
   - Optional: Save to database
   - Spam protection (reCAPTCHA or similar)

5. **Analytics Integration**
   - Google Analytics or Plausible
   - Track portfolio views, contact clicks

### Could-Have (Future)

1. **Interactive 2L Demo**
   - Live demonstration of 2L workflow
   - Simplified version for visitors to try

2. **Video Introduction**
   - Short video explaining capabilities
   - Embedded on homepage

3. **Multi-language Support**
   - Hebrew version for Israeli clients

4. **Client Portal**
   - Project status tracking
   - File sharing
   - Communication hub

---

## User Flows

### Flow 1: Agency Scout Evaluating Contractor

**Persona:** Technical lead at 20-person agency, needs overflow help

**Steps:**
1. Arrives at homepage from LinkedIn/referral
2. Sees "I Build SaaS Systems Fast" - immediately understands offering
3. Scrolls to portfolio, sees 4 deployed projects
4. Clicks on Wealth project - sees full tech stack, screenshots
5. Notices "2L methodology" - intrigued by AI-powered development
6. Scrolls to contact, clicks email
7. Sends inquiry about availability

**Success criteria:**
- Time to understand offering: <10 seconds
- Time to reach contact: <60 seconds
- Clear understanding of capabilities

### Flow 2: Startup Founder Seeking MVP Developer

**Persona:** Non-technical founder with app idea

**Steps:**
1. Arrives at homepage from Google search "freelance SaaS developer"
2. Sees clear value proposition - "from idea to deployed product"
3. Reviews portfolio - sees variety of completed projects
4. Reads "How I Work" - appreciates structured approach
5. Clicks "Work With Me"
6. Fills contact form with project description

**Success criteria:**
- Confidence that Ahiya can handle full project
- Understanding of process (2L methodology)
- Easy path to initiate conversation

### Flow 3: Curious Visitor Discovers Philosophical Content

**Persona:** Developer who resonates with deeper approach

**Steps:**
1. Arrives at business homepage
2. Completes main journey (portfolio, contact)
3. Notices subtle "Soul →" link in footer
4. Clicks through to `/soul`
5. Discovers full philosophical site
6. Spends time reading contemplations
7. Returns to main site with deeper appreciation

**Success criteria:**
- Philosophical content accessible but not distracting
- Clean separation between business and personal expression
- Both audiences served without compromise

---

## Technical Requirements

### Must Support

- **Next.js 14+ App Router:** Current stack, maintain consistency
- **TypeScript:** Type safety throughout
- **Tailwind CSS:** Current styling approach
- **Responsive Design:** Mobile-first, all breakpoints
- **Dark Theme:** Keep current dark aesthetic (works for both business and dev audiences)
- **Fast Performance:** Core Web Vitals passing
- **Accessibility:** WCAG 2.1 AA compliance

### Constraints

- **Preserve existing animations:** The breathing, glitch, typewriter effects are impressive - keep them for portfolio cards
- **No breaking changes to /soul:** Philosophical content must continue working exactly as-is
- **Single codebase:** No separate repos for business vs philosophical
- **Vercel deployment:** Current hosting, maintain CI/CD

### Preferences

- **Minimal dependencies:** Don't add unnecessary packages
- **Component reuse:** Leverage existing card components where possible
- **CSS-in-JS or Tailwind:** Maintain current approach
- **Image optimization:** Next/Image for all images
- **Font consistency:** Can update fonts if needed for professional feel

---

## Data Model Overview

### Key Entities

#### 1. **Project (Portfolio Item)**
```typescript
interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription?: string;
  status: 'live' | 'development' | 'archived';
  liveUrl?: string;
  githubUrl?: string;
  screenshots: string[];
  techStack: string[];
  features: string[];
  caseStudySlug?: string;
  order: number;
}
```

#### 2. **ContactSubmission** (if form implemented)
```typescript
interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: Date;
  source: 'website' | 'referral';
}
```

#### 3. **BlogPost** (if dev journal implemented)
```typescript
interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string; // MDX
  publishedAt: Date;
  tags: string[];
  relatedProjectId?: string;
}
```

---

## Content Requirements

### Homepage Copy

**Hero:**
```
# I Build SaaS Systems Fast

Full-stack development powered by AI orchestration.
From idea to deployed product, independently.

[View Portfolio]  [Work With Me]
```

**Portfolio Section Header:**
```
## What I've Built

Real systems, deployed and running. Each project showcases
end-to-end development: architecture, implementation, and deployment.
```

**2L Section:**
```
## How I Work

I use **2L**, a development framework I built that coordinates AI agents
to explore, plan, build, and validate software autonomously.

This is why I deliver complete systems faster than traditional development.

[Ask me about it →]
```

**Contact Section:**
```
## Work With Me

Looking for a developer who can own your next feature or MVP?

Email: ahiya.butman@gmail.com
GitHub: github.com/Ahiya1

[Send a Message]
```

**Footer:**
```
Built by Ahiya Butman | [GitHub] [Email] | The philosophical side →
```

### Project Descriptions

**Wealth:**
```
Title: Wealth
Subtitle: Personal Finance SaaS
Description: Complete financial tracking system with expense management,
insights, and reporting. Full auth, subscription tiers, and dashboard analytics.
Tech: Next.js, TypeScript, Prisma, PostgreSQL, Stripe, Tailwind
```

**StatViz:**
```
Title: StatViz
Subtitle: Statistical Visualization Platform
Description: Data analysis and visualization tool for exploring statistical
relationships. Complex data processing with interactive charts and exports.
Tech: Next.js, TypeScript, D3.js/Recharts, Data Processing Pipelines
```

**Mirror-of-Dreams:**
```
Title: Mirror of Dreams
Subtitle: AI Reflection Tool
Description: Tiered AI-powered reflection tool that shows wholeness, not brokenness.
Three tiers: Free glimpse, Essential ($4.99), Premium ($9.99).
Tech: Next.js, Claude Sonnet 4, Stripe Payments, Nodemailer
Live: mirror-of-truth.xyz
```

**AI Research Pipeline:**
```
Title: AI Research Pipeline
Subtitle: Synthetic Data Generation System
Description: Factorial design prompt generator with automated LLM processing.
Generates culturally-aware synthetic personas from demographic parameters.
Built for academic research on youth sports dropout in Israel.
Tech: Next.js, n8n Workflows, Claude API, Google Sheets Integration

Sample Output:
"I started sailing almost by accident. One summer, the local yacht club
opened a free youth program... The sea doesn't recognize religion or gender—
only talent and determination. At 16, I felt I was missing my childhood."
```

---

## Success Criteria

### 1. **Clear Value Proposition**
- **Metric:** First-time visitor understanding
- **Target:** 90% of visitors can state what Ahiya does within 10 seconds
- **Validation:** User testing with 5 target personas

### 2. **Portfolio Showcases Real Work**
- **Metric:** All 4 projects have complete information
- **Target:** Each project has: title, description, 2+ screenshots, tech stack, live link (if applicable)
- **Validation:** Manual review

### 3. **Philosophical Content Preserved**
- **Metric:** All existing pages accessible
- **Target:** 100% of current pages available at `/soul/*`
- **Validation:** Automated link checking

### 4. **Contact Path Clear**
- **Metric:** Clicks to contact
- **Target:** Contact visible without scrolling on mobile
- **Validation:** Manual testing on multiple devices

### 5. **Performance Maintained**
- **Metric:** Core Web Vitals
- **Target:** All green (LCP <2.5s, FID <100ms, CLS <0.1)
- **Validation:** Lighthouse audit

### 6. **Professional Appearance**
- **Metric:** Subjective assessment
- **Target:** Would not embarrass Ahiya when sending to agency
- **Validation:** Self-review + peer feedback

---

## Out of Scope

**Explicitly not included in MVP:**

- **Blog/Dev Journal:** Post-MVP enhancement
- **Testimonials:** Need to collect first
- **Pricing Page:** Can discuss in conversation
- **Contact Form Backend:** Email link sufficient for MVP
- **Analytics:** Post-MVP
- **Multi-language:** Future consideration
- **Video Content:** Future consideration
- **CMS Integration:** Static content for MVP

**Why:** Focus on core transformation first. Get site live, then iterate based on actual client feedback.

---

## Assumptions

1. **Current codebase is healthy:** No major refactoring needed
2. **Vercel deployment works:** No hosting changes required
3. **Domain stays ahiya.xyz:** No DNS changes
4. **Content is ready:** Project descriptions, screenshots available
5. **No client testimonials yet:** Will add section post-MVP when available
6. **Philosophical content stays static:** No changes to archived content

---

## Open Questions

1. **Should we add a "Services" page?**
   - **Recommendation:** Not for MVP. Discuss services in conversation.

2. **Contact form vs. just email?**
   - **Recommendation:** Email link for MVP. Form adds complexity.

3. **How prominent should /soul link be?**
   - **Recommendation:** Footer only. Subtle but accessible.

4. **Should portfolio have filtering?**
   - **Recommendation:** No. Only 4 projects, filtering adds clutter.

5. **Keep current animations?**
   - **Recommendation:** Yes, but use selectively. Impressive on portfolio cards.

---

## Exploration Directives

**CRITICAL:** Before planning, the orchestrator MUST explore the actual deployed projects to understand them:

### Required Exploration

1. **Wealth System** (`~/Ahiya/2L/Prod/wealth`)
   - Understand: What does it do? Key features? Tech stack?
   - Find: Screenshots or ways to capture them
   - Document: 3-5 bullet points for portfolio

2. **StatViz System** (`~/Ahiya/2L/Prod/StatViz`)
   - Understand: What does it visualize? User flows?
   - Find: Screenshots or demo data
   - Document: 3-5 bullet points for portfolio

3. **Mirror-of-Dreams** (`~/Ahiya/2L/Prod/mirror-of-dreams`)
   - Understand: How does the tiered system work? AI integration?
   - Find: Live URL, screenshots
   - Document: 3-5 bullet points for portfolio

4. **Olympic Youth / AI Research Pipeline** (`~/olympic-youth/olympic-youth-app`)
   - Understand: Full workflow from prompt generation to output
   - Find: n8n workflow JSON, sample outputs
   - Document: Technical architecture for portfolio

5. **Current ahiya.xyz Site** (`~/Ahiya/2L/Prod/ahiya-xyz`)
   - Understand: Full page structure, component architecture
   - Find: Reusable components (cards, animations, layouts)
   - Document: What to preserve, what to transform

### Exploration Questions to Answer

- What are the actual deployed URLs for each system?
- What screenshots exist or need to be captured?
- What's the exact tech stack for each project?
- What components from current site can be reused?
- What's the current build/deploy process?

---

## Implementation Phases

### Phase 1: Archive & Restructure (Iteration 1)
- Move all existing pages to `/soul/*`
- Set up new route structure
- Verify philosophical content still works
- Create basic new homepage shell

### Phase 2: Portfolio & Content (Iteration 2)
- Build portfolio section with 4 projects
- Create project cards with existing animation system
- Add project detail views (optional)
- Write all project descriptions

### Phase 3: Business Sections (Iteration 3)
- Add "How I Work" section with 2L intro
- Add contact section
- Update navigation
- Add footer with /soul link

### Phase 4: Polish & SEO (Iteration 4)
- Update all metadata
- Performance optimization
- Mobile testing
- Final copy review

---

## Risk Mitigation

| Risk | Mitigation |
|------|------------|
| Breaking philosophical site | Archive first, test thoroughly before new content |
| Portfolio projects not impressive enough | Focus on variety and technical depth, not scale |
| 2L explanation confusing | Keep it brief, outcome-focused |
| Site feels generic | Maintain unique dark aesthetic, subtle use of animations |
| Contact form spam | Use email link, add form post-MVP with protection |

---

## Next Steps

- [ ] Review and refine this vision
- [ ] Run `/2l-plan` for interactive master planning
- [ ] OR run `/2l-mvp` to auto-plan and execute
- [ ] After completion: gather feedback, iterate

---

**Vision Status:** VISIONED
**Ready for:** Master Planning (`/2l-plan`) or Auto-Execution (`/2l-mvp`)
**Priority:** HIGH (Core business enablement)
**Complexity Estimate:** COMPLEX (Multi-page transformation, content migration, new features)

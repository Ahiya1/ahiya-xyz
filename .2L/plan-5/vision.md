# Project Vision: Irresistible Presence

**Created:** 2025-12-04T11:30:00Z
**Plan:** plan-5

---

## Problem Statement

Plan-4 gave us confidence. Now we need magnetism.

The homepage is good, but it could be *captivating*. The project pages are still static case studies — informative but not alive. We want visitors to feel pulled in, not just informed.

**Goal:** Everyone who lands on the site wants to work with you.

---

## Target Users

Same as before:
- Decision-makers at universities, research institutions, companies
- Technical peers evaluating collaboration

**But now optimizing for:** Emotional response, not just information transfer.

---

## Core Value Proposition

**Before:** "Here's what I do."
**After:** "You need to work with this person."

---

## Feature Breakdown

### Must-Have (MVP)

#### 1. **Homepage — More Animation**

**Hero enhancements:**
- Staggered word reveal: "Intention." → "Clarity." → "Results." appear one by one (subtle, 200ms delay between each)
- Subline fades in after headline completes
- CTAs fade in last
- Keep gradient shift (already implemented)

**Portfolio cards:**
- Each card fades in on scroll (staggered, not all at once)
- Hover: more pronounced lift + glow
- Maybe subtle continuous animation on the cards (breathing border glow?)

**How We Work:**
- Already has scroll reveal — enhance with staggered timing
- Each step (🎯 ⚡ 🚀) reveals 150ms after the previous

**CTA section:**
- Fade in on scroll
- "Let's Build" could have subtle pulse or glow to draw attention

**Micro-interactions:**
- Buttons: scale(1.02) + shadow increase on hover
- Links: smooth underline animation
- Selection color: match brand purple

---

#### 2. **Remove Testimonial Section**

Delete entirely. The portfolio is the proof. Confidence doesn't need external validation.

This also removes the "statistician" framing problem.

---

#### 3. **Project Pages — Alive & Confident**

Transform all 4 project pages from static case studies to magnetic presentations.

**Current structure (keep but enliven):**
- Hero with title + one-liner
- Challenge section
- Solution section
- Key Features
- Proof/Results

**Enhancements:**

**Hero:**
- Full-viewport height with gradient background (like homepage)
- Title large and bold
- One-liner that hits immediately
- "Back to Work" link (subtle, top-left)

**Scroll animations:**
- Each section fades in on scroll
- Feature cards stagger in
- Stats/metrics animate (count up?)

**Visual breathing:**
- More whitespace between sections
- Subtle gradient overlays
- Cards with soft glow on hover

**Content tightening:**
- Remove any "explaining" language
- Statements, not justifications
- Short paragraphs, punchy copy

**Specific pages:**

1. **AI Research Pipeline**
   - Hero: "AI-Powered Academic Research"
   - Emphasize: Speed, cultural nuance, automation
   - The sample outputs are gold — make them prominent

2. **StatViz**
   - Hero: "Statistical Analysis, Visualized"
   - Emphasize: Complexity made clear, beautiful outputs

3. **Mirror of Dreams**
   - Hero: "Dream Journal with AI Insight"
   - Emphasize: Personal, mystical, meaningful
   - This one can be more atmospheric/artistic

4. **Wealth**
   - Hero: "Personal Finance, Simplified"
   - Emphasize: Clarity from chaos, beautiful dashboards

---

#### 4. **Navigation Polish**

- Smooth scroll behavior (already likely, but verify)
- Active section indicator as you scroll
- Subtle hover states on nav items

---

#### 5. **Footer — Final Touch**

Keep minimal but add subtle animation:
- Fade in on scroll
- Maybe a very subtle gradient line above it

---

### Should-Have (Post-MVP)

#### 6. **Page Transitions**
- Smooth fade between homepage and project pages
- Loading state that feels intentional

#### 7. **Cursor Effects**
- Custom cursor on hover over interactive elements
- Subtle trail or glow (might be too much — test)

---

## Technical Requirements

**Animation approach:**
- CSS @keyframes for continuous animations (gradient, pulse)
- Intersection Observer for scroll triggers
- Stagger delays with CSS custom properties or inline styles
- Keep it native — no heavy libraries

**Performance:**
- All animations must be 60fps
- Use transform and opacity only (GPU accelerated)
- Reduced motion media query support

**Files to modify:**
- `app/page.tsx` — Homepage enhancements
- `app/globals.css` — New animations, micro-interactions
- `app/projects/[slug]/page.tsx` — Project page template
- `app/data/portfolio.ts` — Maybe update copy
- `app/components/Navigation.tsx` — Active state
- `app/components/PortfolioCard.tsx` — Enhanced hover

---

## Success Criteria

1. **Immediate hook**
   - Visitor is captivated within 2 seconds
   - Hero animation creates "wow" moment

2. **Scroll engagement**
   - Animations reward scrolling
   - Each section feels like a reveal

3. **Project page impact**
   - Entering a project page feels like entering a world
   - Visitor understands value in 5 seconds

4. **Action pull**
   - "Let's Build" CTA feels magnetic
   - Visitor actively wants to reach out

5. **No testimonial needed**
   - Site confidence removes need for external validation
   - Portfolio speaks for itself

---

## Out of Scope

- Contact form (keep mailto)
- Blog
- New projects
- Major content rewrites (just tightening)
- Sound design

---

## Content Reference

### Homepage Sections (Final Order)
1. Hero (animated reveal)
2. Portfolio (staggered cards)
3. How We Work (staggered steps)
4. CTA (fade in, magnetic)
5. Footer (minimal)

**NO testimonial section.**

### Project Page Template
```
[Back to Work]

# {Project Title}
{One powerful line}

[Scroll indicator]

---

## The Challenge
{2-3 sentences max}

---

## The Solution
{What was built — confident, not explaining}

---

## Key Features
{Cards with icons, staggered reveal}

---

## Results / Proof
{Metrics, screenshots, outcomes}

---

[View Next Project →]
```

---

## Animation Specifications

### Hero Word Reveal
```css
.hero-word {
  opacity: 0;
  transform: translateY(20px);
  animation: word-reveal 0.6s ease forwards;
}
.hero-word:nth-child(1) { animation-delay: 0.1s; }
.hero-word:nth-child(2) { animation-delay: 0.3s; }
.hero-word:nth-child(3) { animation-delay: 0.5s; }

@keyframes word-reveal {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### Staggered Scroll Reveal
```css
.reveal-item {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.6s ease;
}
.reveal-item.visible {
  opacity: 1;
  transform: translateY(0);
}
/* Stagger with nth-child or inline delay */
```

### Button Micro-interaction
```css
.cta-button {
  transition: all 0.2s ease;
}
.cta-button:hover {
  transform: scale(1.02);
  box-shadow: 0 0 30px rgba(168, 85, 247, 0.4);
}
```

### Selection Color
```css
::selection {
  background: rgba(168, 85, 247, 0.3);
  color: white;
}
```

---

## Summary: Plan-5 Deliverables

| Area | Change |
|------|--------|
| Hero | Staggered word reveal, enhanced presence |
| Portfolio | Staggered card reveals, enhanced hover |
| How We Work | Staggered step reveals |
| Testimonial | **REMOVED** |
| CTA | Fade in, magnetic glow |
| Project Pages | Full transformation — alive, confident |
| Micro-interactions | Buttons, links, selection |
| Footer | Subtle fade in |

---

**Vision Status:** VISIONED
**Ready for:** Execution

**Energy:** Irresistible. Magnetic. "I need to work with this person."

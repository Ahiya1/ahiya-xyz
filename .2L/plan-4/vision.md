# Project Vision: Homepage — Alive & Confident

**Created:** 2025-12-04T10:00:00Z
**Plan:** plan-4

---

## Problem Statement

The current homepage (plan-3) is better than before, but it still over-explains. It justifies. It reads like a freelancer trying to convince, not a studio that knows its worth.

**Core issues:**
- Hero is too long ("I build systems with clarity, intention, and the speed of good engineering")
- Too many sections explaining things that should be self-evident
- Static, museum-like feel — sophisticated but not alive
- "About" section with pillars feels defensive
- "Services" section duplicates what the portfolio already shows
- "How I Work" explains methodology instead of inviting into a process

**What's needed:**
- Confidence that doesn't explain itself
- Aliveness — the page should feel like it's breathing, responding
- Warmth — "I'm here for you" not "Let me tell you about me"
- Minimalism — let the work speak

---

## Target Users

**Primary:** Decision-makers at universities, research institutions, and companies
- They don't need convincing with long explanations
- They need to see: "This person delivers. Here's proof."
- They value substance over flash

**Secondary:** Technical peers evaluating collaboration

---

## Core Value Proposition

**Intention. Clarity. Results.**

Three words. No explanation needed. The work proves it.

---

## Feature Breakdown

### Must-Have (MVP)

#### 1. **New Hero — Veni Vidi Vici Energy**

**Headline:**
```
Intention. Clarity. Results.
```

**Subline (required — replaces Services section):**
```
Research systems. Business tools. AI pipelines.
```
This one line provides domain context in 2 seconds. No separate Services section needed.

**Visual:**
- Dark background with subtle gradient that shifts slowly (alive)
- The three words should have presence — maybe staggered, maybe with subtle animation
- Minimal. Powerful. Like a gallery entrance.

**CTAs:**
- "See the Work" → scrolls to portfolio
- "Let's Build" → scrolls to contact

---

#### 2. **Remove About Section**

The work introduces you. No pillars. No explanation.

If anything, one line in the footer or near the logo:
```
Ahiya — Systems Architect
```

That's it.

---

#### 3. **Services → One-Liner in Hero**

Instead of a dedicated Services section with 4 cards, services are conveyed through the hero subline:
```
Research systems. Business tools. AI pipelines.
```
This provides quick orientation without a whole section. The portfolio proves it.

---

#### 4. **How We Work — Alive & Inviting**

**Title:** "How We Work" (not "How I Work" — it's collaborative)

**The three steps with emojis:**

```
🎯 Define
We talk. I listen. You see the blueprint before I write a line of code.

⚡ Build
I move fast. You stay in the loop. No surprises.

🚀 Launch
It works. It's documented. I'm here if you need me.
```

**Visual treatment:**
- Each step could fade in on scroll (subtle, not flashy)
- Emojis are visual anchors — warm, approachable
- Short statements that breathe — not paragraphs
- Maybe a subtle connecting line or flow between the three

**Tone:** Welcoming into a safe, clear process. Not explaining methodology.

**Optional:** Keep the subtle 2L mention at the bottom:
```
Powered by 2L — my AI orchestration framework.
```

---

#### 5. **Portfolio — The Star**

**Title:** "Selected Work" or just "Work"

**Treatment:**
- This section should dominate
- Give it room to breathe
- 2x2 grid or even full-width cards
- Each card: Project name, one-line summary, "View →" link
- Subtle hover animation (lift, glow, or scale)

**Projects (same 4):**
- AI Research Pipeline
- StatViz
- Mirror of Dreams
- Wealth

The descriptions stay as they are — they're good.

---

#### 6. **Testimonial — Quieter**

**Title:** "Trusted" or no title at all

**Content:**
```
⭐⭐⭐⭐⭐

"Ahiya is an excellent statistician. He delivered precise results quickly and clearly."

— Michal Schriber, Head of Department, Herzog College
```

**Visual:**
- Single testimonial
- Simple presentation
- No additional "trusted by researchers across..." — let the quote speak
- Maybe slightly smaller, understated — confident doesn't need to shout

---

#### 7. **CTA — Simple & Direct**

**Headline:**
```
Let's Build
```

Or:
```
Ready?
```

**Body:** None needed. Or at most:
```
I respond within 24 hours.
```

**Buttons:**
- "Get in Touch" (mailto)
- GitHub icon (subtle, secondary)

**Tone:** One button. Clear action. No selling.

---

#### 8. **Footer — Minimal**

```
Ahiya — Systems Architect
2025
```

Or:
```
Made with intention.
2025
```

Dark. Quiet. Done.

---

#### 9. **Aliveness — Subtle Animation & Presence**

The page should feel like it's breathing, not dead.

**Specific treatments:**

1. **Hero gradient** — Very slow, subtle shift in the purple gradient. Barely noticeable but creates life.

2. **Logo pulse** — The logo (if displayed) has a very subtle, slow pulse or glow.

3. **Scroll fade-ins** — Sections fade in gently as you scroll to them. Not dramatic — just present.

4. **Hover states that respond:**
   - Portfolio cards: slight lift + glow
   - Buttons: subtle scale or color shift
   - Links: smooth underline or color transition

5. **"How We Work" steps** — Each step fades in sequentially as you scroll, creating rhythm.

6. **Cursor or selection** — Maybe a custom cursor or selection color that matches the brand.

**What NOT to do:**
- No flashy animations
- No parallax overload
- No distracting motion
- Keep it subtle — sophistication preserved

---

### Should-Have (Post-MVP)

#### 10. **Micro-interactions**

- Click feedback on buttons
- Subtle sound design (optional, probably skip)
- Progress indicator while scrolling (maybe)

#### 11. **Mobile Polish**

- Ensure animations are smooth on mobile
- Hamburger menu feels responsive
- Touch states are clear

---

## User Flows

### Flow 1: New Visitor

1. Lands on homepage
2. Sees "Intention. Clarity. Results." — immediately understands the vibe
3. Scrolls (or clicks "See the Work")
4. Sees portfolio — clicks into a project
5. Reads case study
6. Returns, clicks "Let's Build"
7. Contacts via email

### Flow 2: Returning Visitor / Referred

1. Lands on homepage
2. Clicks "Let's Build" immediately
3. Contacts

---

## Design Guidelines

### Visual
- **Background:** Dark (#0a0f1a) — keep it
- **Accents:** Purple gradient — but now with subtle life (slow shift)
- **Spacing:** Even more generous than before. Let it breathe.
- **Typography:** Large, confident hero text. Clean body text.

### Tone
- Confident
- Warm
- Minimal
- Alive
- No justification

### Brand Energy
**Before:** "Let me explain my value"
**After:** "I know my worth. Here's the work."

---

## Technical Requirements

**Must support:**
- CSS animations for subtle life (gradient shift, fade-ins)
- Intersection Observer for scroll-triggered animations
- Smooth, performant animations (60fps)
- Responsive design

**Constraints:**
- No heavy animation libraries (keep it native CSS/JS)
- Must load fast
- Animations should be subtle, not distracting

**Preferences:**
- Use CSS `@keyframes` for gradient animation
- Use Intersection Observer API for scroll fade-ins
- Keep bundle size minimal

---

## Success Criteria

1. **Hero is impactful**
   - Visitor understands the vibe within 3 seconds
   - No scrolling needed to "get it"

2. **Page feels alive**
   - Subtle animation creates presence
   - Hover states feel responsive
   - Not static or museum-like

3. **Confidence without explanation**
   - No Services section
   - No About pillars
   - Work speaks for itself

4. **Clear path to action**
   - "Let's Build" is obvious and easy
   - Contact accessible in 1 click

---

## Out of Scope

- Contact form (keep mailto)
- Blog
- Pricing
- Multi-language
- Major project page changes (already upgraded in plan-3)

---

## Content Reference

### Hero
```
Intention. Clarity. Results.

Research systems. Business tools. AI pipelines.

[See the Work]  [Let's Build]
```

### How We Work
```
How We Work

🎯 Define
We talk. I listen. You see the blueprint before I write a line of code.

⚡ Build
I move fast. You stay in the loop. No surprises.

🚀 Launch
It works. It's documented. I'm here if you need me.

Powered by 2L — my AI orchestration framework.
```

### Testimonial
```
⭐⭐⭐⭐⭐

"Ahiya is an excellent statistician. He delivered precise results quickly and clearly."

— Michal Schriber, Head of Department, Herzog College
```

### CTA
```
Let's Build

I respond within 24 hours.

[Get in Touch]  [GitHub]
```

### Footer
```
Ahiya — Systems Architect
2025
```

---

## Summary: Before → After

| Element | Before (plan-3) | After (plan-4) |
|---------|-----------------|----------------|
| Hero | "I build systems with clarity, intention, and the speed of good engineering." | "Intention. Clarity. Results." |
| About | 4 pillars, paragraph explaining | Removed (or 1 line in footer) |
| Services | 4 category cards | One-liner in hero |
| How I Work | 3 phases explaining methodology | 3 emojis, short inviting statements |
| Portfolio | Same | Same (already good) |
| Testimonial | Full section with trust line | Just the quote, quieter |
| CTA | "Tell Me What You Want to Build" | "Let's Build" |
| Feel | Static, explaining | Alive, confident |

---

## Next Steps

- [ ] Review and refine this vision
- [ ] Run `/2l-mvp` to execute

---

**Vision Status:** VISIONED
**Ready for:** Master Planning

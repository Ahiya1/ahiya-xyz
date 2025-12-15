# Project Vision: Landing Page Conversion Optimization

**Created:** 2025-12-15T14:50:00Z
**Plan:** plan-16

---

## Problem Statement

The landing page is missing key conversion elements that would help attract and convert first clients. Currently lacks social proof, clear pricing transparency, urgency signals, and emphasis on the core AI/Agent integration differentiator.

**Current gaps:**
- No testimonials (social proof missing entirely)
- AI/LLM integration expertise not emphasized enough
- No pricing information (friction for potential clients)
- No urgency elements (no reason to act now)

---

## Target Users

**Primary user:** Potential clients visiting ahiya.xyz
- Founders/CTOs evaluating freelance developers
- Companies needing AI integration expertise
- Decision-makers comparing service providers

**Goal:** Convert visitors into discovery call bookings

---

## Core Value Proposition

Professional transparency and social proof that builds trust and creates urgency to act.

**Key benefits:**
1. Social proof from institutional clients builds immediate credibility
2. Clear pricing reduces friction and pre-qualifies leads
3. Urgency creates motivation to reach out now vs. "later"
4. AI/Agent emphasis positions Ahiya as the go-to specialist

---

## Feature Breakdown

### Must-Have (MVP)

1. **Testimonials Section on Landing Page**
   - Description: Display 3 testimonials from real clients with names and organizations
   - Testimonials to include:
     - **Michal Schriber, Head of Department, Herzog College:** "The students were very satisfied with the efficiency and the results in StatViz"
     - **HIT (Holon Institute of Technology):** "The AI results were comprehensive and aligned with our purpose. Exactly what we needed"
     - **Mirror of Dream user:** "The app helped me connect to my aspirations in a transitional period in my life"
   - Design: Premium styling consistent with site aesthetic, subtle animations
   - Placement: After "How I Work" section, before Projects
   - Acceptance criteria:
     - [ ] 3 testimonials displayed with proper attribution
     - [ ] Responsive design (mobile + desktop)
     - [ ] Consistent with site's premium aesthetic
     - [ ] Subtle entrance animations

2. **AI/Agent Integration Emphasis**
   - Description: Elevate AI/Agent integration as THE core differentiator
   - Changes needed:
     - Hero section should mention AI/Agent expertise more prominently
     - "How I Work" or new section highlighting AI integration capability
     - Use "Agent" language (not "chatbot")
   - Messaging examples:
     - "AI Agents that actually do things"
     - "Custom AI integration for your product"
     - "From idea to intelligent product"
   - Acceptance criteria:
     - [ ] AI/Agent expertise visible in hero area
     - [ ] Clear value prop about connecting AI to apps
     - [ ] Modern "Agent" terminology (not chatbot)

3. **Dedicated Pricing Page**
   - Description: Full pricing page at /pricing with transparency and professionalism
   - Route: `/pricing`
   - Content structure:

     **Launch Pricing Banner:**
     - "Launch Pricing - Available for the next 5 clients or through March 2025"
     - Creates urgency + explains lower rates

     **Service Tiers:**

     | Service | Timeline | Launch Price | Description |
     |---------|----------|--------------|-------------|
     | Landing Page / Marketing Site | 1-2 weeks | $2,500+ | Professional web presence |
     | AI Agent Integration | 2-3 weeks | $5,000+ | Connect AI that does things to your product |
     | Full MVP Build | 4-6 weeks | $12,000+ | From idea to working product |
     | Strategy Consulting | Per session | $100/hr | Expert guidance on AI integration |

     **Additional content:**
     - Brief description of what each service includes
     - Examples of past work for each category
     - "Final pricing depends on scope" disclaimer
     - Clear CTA: "Book a free discovery call"

   - Acceptance criteria:
     - [ ] Dedicated /pricing route exists
     - [ ] Launch pricing banner with expiration
     - [ ] 4 service tiers with prices and timelines
     - [ ] Examples/descriptions for each tier
     - [ ] Clear CTA to book call
     - [ ] Mobile responsive
     - [ ] Premium design consistent with site

4. **Pricing Mention on Landing Page**
   - Description: Small, tasteful mention of pricing on homepage that links to full pricing page
   - Placement: Near CTA section or in "How I Work"
   - Content example: "Transparent pricing starting at $2,500 → View Pricing & Timelines"
   - Acceptance criteria:
     - [ ] Brief pricing mention on homepage
     - [ ] Links to /pricing page
     - [ ] Not intrusive, fits naturally

5. **Urgency Element**
   - Description: Create authentic urgency without being salesy
   - Implementation options (pick one):
     - "2 slots remaining for January" (if true)
     - "Currently booking for Q1 2025"
     - "Limited to 2-3 projects per month"
   - Placement: Near CTA, on pricing page, possibly in header
   - Must be maintainable (easy to update monthly)
   - Acceptance criteria:
     - [ ] Urgency message displayed
     - [ ] Feels authentic, not pushy
     - [ ] Easy to update/maintain
     - [ ] Consistent with brand tone

6. **Navigation Update**
   - Description: Add Pricing to main navigation
   - Changes:
     - Add "Pricing" link to nav menu
     - Ensure mobile menu includes Pricing
   - Acceptance criteria:
     - [ ] Pricing link in desktop nav
     - [ ] Pricing link in mobile nav

7. **Cal.com Integration**
   - Description: Seamless booking experience via Cal.com embed
   - Cal.com URL: `cal.com/ahiya-butman-tigupi/discovery-call`
   - Implementation:
     - Embed Cal.com widget on pricing page (primary booking location)
     - All "Book a Call" CTAs link to Cal.com or trigger embed
     - Replace email-based contact with direct scheduling
   - Event details:
     - Type: Discovery Call
     - Duration: 30 minutes
     - Location: Google Meet (auto-generated)
   - Acceptance criteria:
     - [ ] Cal.com embed on pricing page
     - [ ] All CTAs updated to use Cal.com booking
     - [ ] Mobile-friendly booking experience
     - [ ] Seamless integration with site design

---

## User Flows

### Flow 1: Visitor evaluates services and pricing

**Steps:**
1. Visitor lands on homepage
2. Sees hero with AI/Agent expertise messaging
3. Scrolls through "How I Work"
4. Reads testimonials (social proof builds trust)
5. Sees urgency element ("2 slots remaining")
6. Clicks "View Pricing" or nav link
7. Reviews pricing page with all services
8. Scrolls to Cal.com embed or clicks "Book Discovery Call"
9. Selects available time slot directly on site
10. Meeting confirmed - lead converted

### Flow 2: Direct pricing check

**Steps:**
1. Visitor arrives (maybe from referral mentioning pricing)
2. Clicks "Pricing" in nav
3. Sees transparent pricing with launch discount
4. Understands scope and timelines
5. Books directly via Cal.com embed
6. Receives calendar invite automatically

---

## Technical Requirements

**Must support:**
- New /pricing route
- Updated navigation
- New testimonials component
- Urgency component (ideally configurable)
- Cal.com embed integration

**Constraints:**
- Must maintain site performance
- Must be mobile responsive
- Must match existing premium aesthetic

**Preferences:**
- Use existing component patterns
- Subtle animations consistent with site
- Easy content updates (testimonials, availability)
- Cal.com embed should feel native to site design

---

## Success Criteria

**The update is successful when:**

1. **Social proof visible**
   - All 3 testimonials displayed attractively
   - Attribution clear and credible

2. **AI expertise prominent**
   - Visitor immediately understands AI/Agent specialization
   - Differentiation is clear

3. **Pricing transparency achieved**
   - Full pricing page exists and is navigable
   - All 4 service tiers with prices visible
   - Launch pricing creates urgency

4. **Urgency communicated**
   - Availability/scarcity message visible
   - Feels authentic, not desperate

5. **Conversion path clear**
   - Multiple CTAs lead to Cal.com booking
   - No friction in the journey
   - Visitor can book without leaving site

6. **Seamless booking**
   - Cal.com embed works on pricing page
   - Calendar invite sent automatically
   - Google Meet link auto-generated

---

## Out of Scope

**Explicitly not included:**
- Payment processing
- Client portal
- Blog/content marketing
- Case study deep-dives (projects pages already exist)
- Custom booking system (using Cal.com instead)

**Why:** Focus on conversion elements only. Keep scope tight.

---

## Assumptions

1. The 3 testimonials provided are approved for public use
2. Launch pricing is valid through March 2025 or first 5 clients
3. Current availability allows for urgency messaging (slots are actually limited)
4. Cal.com account is active and availability is configured
5. Google Calendar is synced with Cal.com for scheduling

---

## Open Questions

1. Exact urgency wording - "2 slots for January" or "Limited availability"?
2. Should testimonials include photos/logos if available?
3. Any specific examples to showcase on pricing page service tiers?

---

## Content Reference

### Testimonials (exact quotes)

**1. Academic/Institutional:**
> "The students were very satisfied with the efficiency and the results in StatViz"
> — Michal Schriber, Head of Department, Herzog College

**2. Corporate/Technical:**
> "The AI results were comprehensive and aligned with our purpose. Exactly what we needed"
> — HIT (Holon Institute of Technology)

**3. Personal/Emotional:**
> "The app helped me connect to my aspirations in a transitional period in my life"
> — Mirror of Dream user

### Pricing Table

| Service | Timeline | Launch Price |
|---------|----------|--------------|
| Landing Page / Marketing Site | 1-2 weeks | $2,500+ |
| AI Agent Integration | 2-3 weeks | $5,000+ |
| Full MVP Build | 4-6 weeks | $12,000+ |
| Strategy Consulting | - | $100/hr |

*Launch pricing available through March 2025 or first 5 clients*

### Cal.com Booking

- **URL:** `https://cal.com/ahiya-butman-tigupi/discovery-call`
- **Event:** Discovery Call (30 min)
- **Location:** Google Meet (auto-generated)

---

## Next Steps

- [ ] Review and refine this vision
- [ ] Run `/2l-plan` for interactive master planning
- [ ] OR run `/2l-mvp` to auto-plan and execute

---

**Vision Status:** VISIONED
**Ready for:** Master Planning

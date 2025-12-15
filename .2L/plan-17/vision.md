# Project Vision: The Living Site

**Created:** 2025-12-15T17:00:00Z
**Plan:** plan-17

---

## Problem Statement

The site is technically polished but feels **static**. Visitors land, see nice design, but don't feel anything special. In a sea of freelancer portfolios, "nice" doesn't convert. The site needs to feel **undeniably alive** - a breathing organism that demonstrates craft before a single word is read.

Additionally, we cannot measure engagement effectively. Current analytics track page views but miss the crucial behavioral data: scroll depth, time on page, interaction events, and conversions. Without this data, we're blind to whether changes actually improve engagement.

**Current pain points:**
- Hero animates once on load, then sits static forever
- Background gradient shifts so slowly (25s) nobody notices
- Framer Motion installed but only used in admin dashboard
- 30+ CSS keyframes defined but mostly unused on public pages
- Portfolio cards have hover effects but feel flat, not alive
- No floating elements, no particles, no ambient life
- Analytics show pageviews but not engagement depth
- Time on page is hardcoded placeholder (45s)
- No scroll tracking, click tracking, or conversion tracking
- Can't measure if site changes actually improve engagement

---

## Target Users

**Primary user:** Potential clients evaluating whether to work with Ahiya
- Decision makers at startups and scale-ups
- Technical enough to appreciate craft
- Evaluating multiple freelancers/agencies
- Form impressions in first 3-5 seconds

**Secondary user:** Ahiya (site owner)
- Needs to measure what's working
- Wants data-driven iteration
- Requires conversion tracking to Cal.com

---

## Core Value Proposition

**The site itself becomes the portfolio piece.** When someone lands on ahiya.xyz, they should think: "If they built THIS, imagine what they could build for ME."

**Key benefits:**
1. **Differentiation** - No other freelancer site feels this alive
2. **Trust Signal** - Craft in every detail = competence signal
3. **Conversion** - Guided attention toward CTAs through motion
4. **Measurability** - Know exactly what's working and what isn't

---

## Feature Breakdown

### PART 1: THE LIVING SITE

---

### Must-Have: Ambient Life Layer

**1. Floating Particle System**
- Description: Subtle particles floating in the background across all pages
- User story: As a visitor, I see gentle floating elements that make the site feel alive without being distracting
- Technical approach:
  - Create reusable `<AmbientParticles />` component
  - 15-25 particles with varied sizes (2-6px)
  - Slow float animations (15-30s cycles)
  - Very low opacity (0.1-0.3)
  - Purple/white color scheme matching brand
  - Respects `prefers-reduced-motion`
- Acceptance criteria:
  - [ ] Particles visible on all public pages
  - [ ] Different particles have different speeds/paths
  - [ ] Performance: no jank, minimal CPU usage
  - [ ] Disabled when reduced motion preferred

**2. Breathing Background Gradient**
- Description: Hero and section backgrounds that visibly breathe
- User story: As a visitor, I subconsciously feel the site is alive through gentle background movement
- Technical approach:
  - Increase gradient shift visibility (currently too subtle at 0.04-0.08 opacity)
  - Add secondary gradient layer with different cycle time
  - Create depth through layered gradients moving at different speeds
  - 8-12 second cycles (not 25s - too slow to notice)
- Acceptance criteria:
  - [ ] Background movement is noticeable but not distracting
  - [ ] Multiple gradient layers create depth
  - [ ] Smooth infinite animation

**3. Floating Orbs in Corners**
- Description: Large, blurred orbs that slowly drift in page corners
- User story: As a visitor, I perceive depth and atmosphere
- Technical approach:
  - 2-4 large orbs (200-400px) with extreme blur
  - Positioned in corners, partially off-screen
  - Slow drift animation (20-30s cycles)
  - Purple/cyan/pink colors at very low opacity
- Acceptance criteria:
  - [ ] Orbs visible on hero sections
  - [ ] Create sense of depth without obscuring content
  - [ ] Smooth, organic movement paths

---

### Must-Have: Reactive Life Layer

**4. Magnetic CTA Buttons**
- Description: Buttons that subtly pull toward the cursor
- User story: As a visitor, I feel drawn to click the CTAs - they seem to want my attention
- Technical approach:
  - Track mouse position relative to button
  - Apply subtle transform (3-5px max) toward cursor when nearby
  - Smooth spring animation on movement
  - Enhanced glow when cursor is close
  - Use Framer Motion for smooth physics
- Acceptance criteria:
  - [ ] CTAs on all pages respond to cursor proximity
  - [ ] Movement is subtle (not distracting)
  - [ ] Smooth spring physics, not jerky
  - [ ] Works on hero CTAs, pricing CTAs, contact CTAs
- Pages affected: Homepage, Pricing, 2L, all project pages

**5. 3D Tilt on Portfolio Cards**
- Description: Cards that tilt in 3D space following mouse position
- User story: As a visitor, I want to interact with the portfolio - it feels responsive
- Technical approach:
  - Track mouse position over card
  - Apply perspective + rotateX/rotateY transforms
  - Max tilt: 5-8 degrees
  - Smooth transition on mouse leave (return to flat)
  - Enhanced glow following tilt direction
- Acceptance criteria:
  - [ ] All portfolio cards have 3D tilt
  - [ ] Tilt follows mouse smoothly
  - [ ] Returns to flat state gracefully
  - [ ] Glow shifts with tilt direction

**6. Animated Icons**
- Description: Project icons that animate on hover and periodically
- User story: As a visitor, I notice the attention to detail in small interactions
- Technical approach:
  - Sparkles icon: gentle rotation + scale pulse
  - Terminal icon: cursor blink effect
  - BarChart3 icon: bars that animate up
  - FlaskConical icon: bubbling effect
  - Trigger on hover + periodic subtle animation when idle
- Acceptance criteria:
  - [ ] Each project icon has unique animation
  - [ ] Animations trigger on card hover
  - [ ] Subtle idle animations every 5-10 seconds
- Pages affected: Homepage portfolio section, individual project pages

**7. Interactive Testimonial Cards**
- Description: Testimonials that respond to interaction
- User story: As a visitor, I engage more with social proof because it feels alive
- Technical approach:
  - Subtle 3D tilt on hover (less than portfolio cards)
  - Quote marks that draw themselves on scroll reveal
  - Logo pulse on hover
  - Staggered reveal with personality
- Acceptance criteria:
  - [ ] Testimonials have hover interactions
  - [ ] Quote marks animate on reveal
  - [ ] Each testimonial feels unique

---

### Must-Have: Choreographed Life Layer

**8. Varied Section Reveals**
- Description: Different sections animate in with different styles
- User story: As a visitor, I'm surprised and delighted - not everything moves the same way
- Technical approach:
  - Hero: Word-by-word with shimmer (existing + enhanced)
  - Portfolio: Cards fan in from center
  - How I Work: Steps cascade with connecting lines
  - Testimonials: Slide in from alternating sides
  - CTAs: Scale up with glow bloom
  - Use Framer Motion `variants` for orchestration
- Acceptance criteria:
  - [ ] At least 4 different reveal styles across homepage
  - [ ] Reveals are scroll-triggered
  - [ ] Timing feels choreographed, not random

**9. Text Shimmer Effect**
- Description: Gradient shimmer that passes over headline text
- User story: As a visitor, the headline catches my eye and feels premium
- Technical approach:
  - CSS gradient mask animation
  - Subtle left-to-right shimmer on "Intention. Clarity. Results."
  - Triggers periodically (every 8-10 seconds) after initial load
  - Very subtle - enhancement not distraction
- Acceptance criteria:
  - [ ] Hero headline has shimmer effect
  - [ ] Shimmer repeats periodically
  - [ ] Effect is subtle and premium-feeling

**10. Connected Animations**
- Description: Elements that respond to each other
- User story: As a visitor, I sense the site as a cohesive system, not isolated parts
- Technical approach:
  - When one portfolio card is hovered, others subtly recede
  - CTA glow intensifies as user scrolls toward it
  - Navigation responds to scroll position
- Acceptance criteria:
  - [ ] Portfolio cards have group awareness
  - [ ] CTA visibility affects its animation state

---

### Must-Have: Continuous Life Layer

**11. Hero That Never Stops Breathing**
- Description: Hero section maintains subtle life even after initial animation
- User story: As a visitor, I feel the site is alive even if I sit on the hero for 30 seconds
- Technical approach:
  - Subtle scale breathing on headline (1.0 → 1.005 → 1.0, 6s cycle)
  - Particles continue floating
  - Background gradient continues shifting
  - Occasional shimmer on text
- Acceptance criteria:
  - [ ] Hero has continuous subtle animation
  - [ ] Nothing is ever completely static
  - [ ] Animations are subtle enough to not distract reading

**12. Page Transition Smoothness**
- Description: Smooth transitions between pages
- User story: As a visitor, navigating feels fluid, not jarring
- Technical approach:
  - Fade out current page content
  - Fade in new page content
  - Maintain ambient layer during transition
  - Use Next.js app router + Framer Motion
- Acceptance criteria:
  - [ ] Page transitions feel smooth
  - [ ] No jarring flash of white/empty
  - [ ] Ambient particles persist through navigation

---

### Should-Have: Enhanced Interactions

**13. Cursor Trail Effect** (Subtle)
- Description: Very subtle trail following cursor
- User story: As a visitor, I notice the extra polish
- Technical approach:
  - Small fading dots following cursor
  - Only visible on desktop
  - Very low opacity, short trail (3-5 dots)
  - Purple color matching brand
- Acceptance criteria:
  - [ ] Cursor trail visible on desktop
  - [ ] Trail is subtle, not distracting
  - [ ] Disabled on mobile/touch devices

**14. Scroll Progress Indicator**
- Description: Visual indicator of scroll position
- User story: As a visitor, I know how much content remains
- Technical approach:
  - Thin progress bar at top of viewport
  - Purple gradient fill
  - Smooth animation with scroll
- Acceptance criteria:
  - [ ] Progress bar shows scroll position
  - [ ] Visible but not intrusive

---

### PART 2: ENHANCED ANALYTICS

---

### Must-Have: Behavioral Tracking

**15. Scroll Depth Tracking**
- Description: Track how far visitors scroll on each page
- User story: As the site owner, I know if visitors see the CTAs below the fold
- Technical approach:
  - Create client-side scroll tracker component
  - Track milestones: 25%, 50%, 75%, 100%
  - Fire event to new `/api/analytics/event` endpoint
  - Store in new `events` table
- Acceptance criteria:
  - [ ] Scroll depth tracked on all pages
  - [ ] Events stored in database
  - [ ] Visible in admin dashboard
  - [ ] Shows which pages have scroll problems

**16. Real Time on Page**
- Description: Actual engagement time, not placeholder
- User story: As the site owner, I know if content is engaging
- Technical approach:
  - Use Visibility API to track active tab time
  - Heartbeat every 5 seconds while page visible
  - Stop counting when tab hidden
  - Send final duration on page unload
  - Update existing page_views or new engagement table
- Acceptance criteria:
  - [ ] Real time on page in admin dashboard
  - [ ] Only counts active tab time
  - [ ] Average per page visible in Pages analytics

**17. Interaction Event Tracking**
- Description: Track clicks and hovers on key elements
- User story: As the site owner, I know which elements get attention
- Technical approach:
  - Track clicks on: CTAs, portfolio cards, navigation, pricing tiers
  - Track hovers on: portfolio cards (with dwell time)
  - Create `trackEvent(category, action, label)` utility
  - Store in events table with metadata
- Acceptance criteria:
  - [ ] CTA clicks tracked across all pages
  - [ ] Portfolio card interactions tracked
  - [ ] Events visible in admin dashboard
  - [ ] Can see click-through rates on CTAs

**18. Conversion Tracking**
- Description: Track actual conversions (Cal.com bookings)
- User story: As the site owner, I know if the site converts
- Technical approach:
  - Track Cal.com embed interactions
  - Track "Book Discovery Call" button clicks
  - If possible: webhook for completed bookings
  - Conversion funnel: Page view → CTA click → Cal.com open → Booking
- Acceptance criteria:
  - [ ] Cal.com button clicks tracked
  - [ ] Cal.com embed opens tracked
  - [ ] Conversion rate visible in dashboard
  - [ ] Funnel visualization in admin

---

### Must-Have: Analytics Infrastructure

**19. Events Database Schema**
- Description: New table for event tracking
- Technical approach:
  ```sql
  CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    session_id VARCHAR(36) NOT NULL,
    visitor_hash VARCHAR(64) NOT NULL,
    page_path VARCHAR(500) NOT NULL,
    event_category VARCHAR(50) NOT NULL,  -- 'scroll', 'click', 'engagement', 'conversion'
    event_action VARCHAR(100) NOT NULL,   -- 'scroll_25', 'cta_click', 'card_hover'
    event_label VARCHAR(200),             -- 'hero_cta', 'portfolio_mirror'
    event_value INTEGER,                  -- scroll %, time in ms, etc.
    metadata JSONB                        -- flexible additional data
  );
  ```
- Acceptance criteria:
  - [ ] Events table created
  - [ ] Proper indexes for querying
  - [ ] API endpoint for inserting events

**20. Client-Side Tracking Library**
- Description: Reusable tracking utilities for frontend
- Technical approach:
  - Create `/lib/tracking.ts` with:
    - `trackScroll(depth: number)`
    - `trackClick(category: string, label: string)`
    - `trackEngagement(timeMs: number)`
    - `trackConversion(type: string)`
  - Debounce/throttle where appropriate
  - Batch events to reduce API calls
  - Respect Do Not Track header
- Acceptance criteria:
  - [ ] Easy-to-use tracking functions
  - [ ] Minimal performance impact
  - [ ] Privacy-respecting (DNT support)

**21. Enhanced Admin Dashboard**
- Description: New sections for behavioral analytics
- Technical approach:
  - New "Engagement" tab in admin
  - Scroll depth visualization per page
  - Time on page (real) in Pages table
  - Click tracking summary
  - Conversion funnel chart
  - Engagement score per page
- Acceptance criteria:
  - [ ] Engagement metrics visible in admin
  - [ ] Scroll depth breakdown per page
  - [ ] Click heatmap or summary
  - [ ] Conversion funnel visualization

**22. Engagement Score**
- Description: Composite metric combining scroll + time + interactions
- User story: As the site owner, I have one number to track overall engagement
- Technical approach:
  - Formula: (scroll_depth * 0.3) + (time_score * 0.4) + (interaction_score * 0.3)
  - Normalize each component to 0-100
  - Calculate per session and aggregate per page
  - Show trend over time
- Acceptance criteria:
  - [ ] Engagement score calculated
  - [ ] Visible on overview dashboard
  - [ ] Trend comparison with previous period

---

### PART 3: PAGE-BY-PAGE SPECIFICATIONS

---

### Homepage (`/`)

**Ambient Layer:**
- Floating particles throughout
- Breathing gradient in hero
- Corner orbs in hero section

**Reactive Layer:**
- Magnetic "See the Work" and "Let's Build" CTAs
- 3D tilt on all 4 portfolio cards
- Animated project icons
- Interactive testimonial cards

**Choreographed Layer:**
- Hero words shimmer periodically
- Portfolio cards fan in on scroll
- How I Work steps cascade
- Testimonials slide from alternating sides

**Continuous Layer:**
- Hero headline breathes
- Background never stops moving
- Particles always floating

**Analytics:**
- Scroll depth tracking
- Time on page
- CTA click tracking
- Portfolio card hover tracking

---

### Pricing Page (`/pricing`)

**Ambient Layer:**
- Floating particles
- Subtle background gradient

**Reactive Layer:**
- Magnetic "Book Discovery Call" CTA
- Tier cards with subtle hover lift
- Interactive feature lists

**Choreographed Layer:**
- Tiers animate in with stagger
- "Launch Pricing" badge pulses subtly
- Cal.com embed fades in smoothly

**Analytics:**
- Scroll depth (do they see all tiers?)
- Time on pricing page
- Tier hover tracking (which tier gets attention?)
- Cal.com interaction tracking
- Conversion tracking

---

### 2L Page (`/2l`)

**Ambient Layer:**
- Particles with code/tech feel
- Gradient that shifts between phase colors

**Reactive Layer:**
- Pipeline phases respond to hover
- Agent cards have tilt effect
- Interactive demo controls

**Choreographed Layer:**
- Pipeline animates phase by phase
- Agent cards cascade in
- Demo triggers on scroll

**Continuous Layer:**
- InvoiceFlow demo loops (already alive - keep it)
- Pipeline has subtle pulse on active phase

**Analytics:**
- Scroll depth
- Time spent watching demo
- Pipeline phase hover tracking
- "Built by 2L" badge visibility

---

### Project Pages (`/projects/*`)

**All project pages need:**

**Ambient Layer:**
- Project-specific particle colors
- Themed background gradient

**Reactive Layer:**
- Demo interactions where applicable
- CTA buttons magnetic
- Tech stack items have hover effects

**Choreographed Layer:**
- Content reveals with project personality
- Screenshots/demos animate on scroll

**Analytics:**
- Scroll depth per project
- Time on each project page
- Demo interaction tracking
- CTA clicks

**Page-Specific:**
- Mirror of Dreams: Cosmic particles, golden accents
- SelahReach: Terminal-style reveals, green accents
- StatViz: Data visualization particles, blue accents
- AI Research Pipeline: Lab-style animations, cyan accents

---

### CV Page (`/cv`)

**Ambient Layer:**
- Professional, subtle particles
- Minimal background movement (it's a CV)

**Reactive Layer:**
- Download PDF button magnetic
- Section links have hover states

**Choreographed Layer:**
- Sections reveal as you scroll
- Skills/experience items cascade

**Analytics:**
- Scroll depth (did they read the whole CV?)
- Time on CV
- PDF download tracking
- Contact email click tracking

---

## Technical Requirements

**Must support:**
- All modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile devices (touch interactions, no cursor effects)
- Reduced motion preferences (disable animations)
- Performance: 60fps animations, no jank
- Accessibility: Animations don't interfere with screen readers

**Constraints:**
- No external animation libraries beyond Framer Motion (already installed)
- Keep bundle size reasonable (no heavy particle libraries)
- Analytics must be privacy-respecting (no PII)
- Must work with existing Next.js App Router

**Preferences:**
- Use Framer Motion for complex orchestration
- Use CSS for simple infinite animations
- Keep tracking client-side lightweight
- Batch API calls where possible

---

## Success Criteria

**The site is successful when:**

1. **Undeniably Alive**
   - Metric: User feedback / qualitative assessment
   - Target: First-time visitors comment on how alive/different the site feels

2. **Improved Engagement**
   - Metric: Average scroll depth
   - Target: >75% of visitors scroll past 50% on homepage

3. **Increased Time on Site**
   - Metric: Real time on page (not placeholder)
   - Target: Average >45 seconds on homepage (currently unknown)

4. **Higher CTA Engagement**
   - Metric: CTA click rate
   - Target: >5% of homepage visitors click a CTA

5. **Conversion Tracking Works**
   - Metric: Can track visitor → Cal.com booking funnel
   - Target: Full funnel visibility in admin dashboard

6. **Performance Maintained**
   - Metric: Lighthouse performance score
   - Target: >90 performance score

---

## Out of Scope

**Explicitly not included:**
- Full heatmap/session recording (too complex for now)
- A/B testing infrastructure
- Email capture / newsletter
- Blog or content marketing features
- Multi-language support
- Advanced attribution modeling

**Why:** Focus on making the site alive and measurable first. These can come in future iterations once we have baseline data.

---

## Assumptions

1. Framer Motion can handle all required animations without performance issues
2. Vercel Postgres can handle increased event tracking load
3. Visitors will notice and appreciate the additional animation
4. Cal.com embed allows tracking of open/interaction events
5. Mobile visitors will have degraded but still pleasant experience

---

## Open Questions

1. Should cursor trail be included or is it too much?
2. What's the right balance of animation - where's the line between "alive" and "distracting"?
3. Do we need to track hover events or just clicks?
4. Should we add sound effects to any interactions? (probably no)

---

## Implementation Priority

**Phase 1: Ambient Foundation**
- Floating particle system
- Breathing background gradient
- Corner orbs

**Phase 2: Reactive Interactions**
- Magnetic CTAs
- 3D tilt on cards
- Animated icons

**Phase 3: Choreography**
- Varied section reveals
- Text shimmer
- Connected animations

**Phase 4: Continuous Life**
- Hero breathing
- Page transitions

**Phase 5: Analytics Infrastructure**
- Events table + API
- Client-side tracking library
- Scroll depth tracking

**Phase 6: Behavioral Tracking**
- Time on page (real)
- Click tracking
- Conversion tracking

**Phase 7: Admin Dashboard**
- Engagement tab
- Funnel visualization
- Engagement score

---

## Complexity Assessment

**This is a COMPLEX orchestration requiring:**
- Deep CSS/animation work
- Framer Motion expertise
- Database schema changes
- New API endpoints
- Client-side tracking implementation
- Admin dashboard expansion
- Testing across all pages and devices

**Recommended:** 4-5 explorers, multiple iterations

---

**Vision Status:** VISIONED
**Ready for:** Master Planning

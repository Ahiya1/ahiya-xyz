# Builder Task Breakdown

## Overview

3 primary builders will work in parallel after Builder 1 completes the foundation.

**Builder execution order:**
1. Builder 1 runs first (creates foundation)
2. Builder 2 and Builder 3 run in parallel (depend on Builder 1)

---

## Builder-1: Data Files & Reusable Components

### Scope

Create all data files and reusable components that Builder 2 and Builder 3 will depend on. This is the foundation layer.

### Complexity Estimate

**MEDIUM**

### Success Criteria

- [ ] `/app/data/testimonials.ts` exports `Testimonial` interface and `testimonials` array with 3 items
- [ ] `/app/data/pricing.ts` exports `ServiceTier` interface, `serviceTiers` array with 4 items, and `launchPricingConfig`
- [ ] `/app/data/availability.ts` exports `AvailabilityConfig` interface and `availability` config object
- [ ] `/app/components/UrgencyBadge.tsx` renders availability message with pulsing dot
- [ ] `/app/components/CalcomEmbed.tsx` wraps Cal.com embed with dark theme configuration
- [ ] All components are "use client" and properly typed

### Files to Create

1. `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/data/testimonials.ts`
   - Export `Testimonial` interface
   - Export `testimonials` array with exactly 3 testimonials from vision document

2. `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/data/pricing.ts`
   - Export `ServiceTier` interface
   - Export `serviceTiers` array with 4 tiers from vision document
   - Export `launchPricingConfig` object

3. `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/data/availability.ts`
   - Export `AvailabilityConfig` interface
   - Export `availability` config object

4. `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/components/UrgencyBadge.tsx`
   - Client component
   - Import availability from data file
   - Render amber-colored badge with pulsing dot
   - Return null if `showBadge` is false

5. `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/components/CalcomEmbed.tsx`
   - Client component
   - Import and configure @calcom/embed-react
   - Props: optional `calLink` (default: "ahiya-butman-tigupi/discovery-call")
   - Configure dark theme with purple brand color (#a855f7)

### Dependencies

**Depends on:** Nothing (runs first)
**Blocks:** Builder 2, Builder 3

### Implementation Notes

1. **Install @calcom/embed-react first:**
   ```bash
   cd /home/ahiya/Ahiya/2L/Prod/ahiya-xyz && npm install @calcom/embed-react
   ```

2. **Testimonial content (exact quotes from vision):**
   - Herzog College: "The students were very satisfied with the efficiency and the results in StatViz"
   - HIT: "The AI results were comprehensive and aligned with our purpose. Exactly what we needed"
   - Mirror user: "The app helped me connect to my aspirations in a transitional period in my life"

3. **Pricing tiers (exact from vision):**
   - Landing Page: 1-2 weeks, $2,500+
   - AI Agent Integration: 2-3 weeks, $5,000+ (highlighted)
   - Full MVP Build: 4-6 weeks, $12,000+
   - Strategy Consulting: Per session, $100/hr

4. **Availability message:**
   - Default: "2 slots remaining for January"
   - Should be easy to update monthly

### Patterns to Follow

Reference patterns from `patterns.md`:
- Use Data File Patterns for interface definitions
- Use UrgencyBadge Pattern for badge component
- Use CalcomEmbed Pattern for embed component

### Testing Requirements

- Verify TypeScript compilation passes
- Verify imports work from other files
- Verify Cal.com embed loads in browser

---

## Builder-2: Pricing Page

### Scope

Create the complete `/pricing` page with hero, service tiers grid, launch pricing banner, Cal.com embed for booking, and urgency messaging.

### Complexity Estimate

**MEDIUM-HIGH**

### Success Criteria

- [ ] `/app/pricing/page.tsx` exists and is accessible at `/pricing` route
- [ ] Hero section with "Pricing & Timelines" heading
- [ ] Launch pricing banner visible with expiration message
- [ ] 4 service tier cards displayed in responsive grid
- [ ] AI Agent Integration tier visually highlighted
- [ ] Cal.com embed functional with booking capability
- [ ] UrgencyBadge displayed near CTA
- [ ] Mobile responsive design
- [ ] Premium aesthetic consistent with site

### Files to Create

1. `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/pricing/page.tsx`
   - Full page component with Navigation and Footer
   - Hero section
   - Launch pricing banner section
   - Service tiers grid (4 cards)
   - Cal.com embed section
   - Scroll reveal animations

### Dependencies

**Depends on:** Builder 1 (data files, UrgencyBadge, CalcomEmbed)
**Blocks:** Nothing

### Implementation Notes

1. **Page structure:**
   - Navigation (existing component)
   - Hero section with pt-32 for nav offset
   - Launch pricing banner (amber accent)
   - Service tiers grid (md:grid-cols-2 lg:grid-cols-4)
   - Disclaimer section ("Final pricing depends on scope")
   - Cal.com embed section with heading
   - Footer (existing component)

2. **Launch pricing banner content:**
   ```
   Launch Pricing
   Available for the next 5 clients or through March 2025
   ```

3. **Cal.com embed section:**
   - Section heading: "Book a Free Discovery Call"
   - Embed in contemplative-card container
   - Min height: 600px for embed

4. **Service tier highlighting:**
   - AI Agent Integration tier gets:
     - `border-purple-400/30`
     - `shadow-[0_0_30px_rgba(168,85,247,0.15)]`
     - "Most Popular" badge

5. **Include icons from lucide-react:**
   - Check icon for feature lists
   - Calendar icon near booking section

### Patterns to Follow

Reference patterns from `patterns.md`:
- Use Page Pattern for overall structure
- Use Pricing Card Pattern for tier cards
- Use Section Pattern for each section
- Use Scroll Reveal Pattern for animations

### Testing Requirements

- Verify page renders at `/pricing`
- Verify Cal.com embed loads and allows date selection
- Verify mobile responsive (stack cards on mobile)
- Verify all 4 tiers display correctly

---

## Builder-3: Homepage Updates

### Scope

Update the homepage with testimonials section, AI/Agent emphasis in hero, pricing mention near CTA, navigation update with Pricing link, and CTA updates to use Cal.com.

### Complexity Estimate

**MEDIUM**

### Success Criteria

- [ ] Testimonials section displays after "How I Work" and before "Contact"
- [ ] 3 testimonial cards with proper attribution
- [ ] Hero section updated with AI/Agent emphasis
- [ ] Pricing mention added near CTA section
- [ ] Navigation includes "Pricing" link (desktop and mobile)
- [ ] "Let's Build" CTA updated to link to Cal.com or pricing page
- [ ] "Get in Touch" CTA updated to link to Cal.com or pricing page
- [ ] Mobile responsive maintained
- [ ] Scroll reveal animations on testimonials

### Files to Create

1. `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/components/Testimonials.tsx`
   - Client component with scroll reveal
   - Import testimonials data
   - 3-column responsive grid (md:grid-cols-3)
   - Testimonial cards with quotes and attribution

### Files to Modify

2. `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/page.tsx`
   - Import Testimonials component
   - Add Testimonials section after "How I Work" (after line ~203)
   - Update hero subline to emphasize AI/Agent capability
   - Add pricing mention near CTA section
   - Update "Let's Build" href to Cal.com or /pricing
   - Update "Get in Touch" href to Cal.com or /pricing

3. `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/components/Navigation.tsx`
   - Add `{ label: "Pricing", href: "/pricing" }` to navItems array
   - Position after "Process" and before "2L"

### Dependencies

**Depends on:** Builder 1 (testimonials data, UrgencyBadge)
**Blocks:** Nothing

### Implementation Notes

1. **Testimonials section placement:**
   - Insert after line 203 (after "How I Work" section)
   - Before the Contact/CTA section (line 205)
   - Use section id="testimonials"

2. **Hero AI/Agent emphasis options:**
   - Option A: Update subline to mention AI: "AI-powered systems delivered in weeks, not months."
   - Option B: Add a small badge/tag below headline: "AI Agent Integration Specialist"
   - Recommendation: Use Option A (simpler, less intrusive)

3. **Pricing mention near CTA:**
   - Add after the 2L mention paragraph (line ~201)
   - Text: "Transparent pricing starting at $2,500"
   - Link text: "View Pricing & Timelines"
   - Style: subtle, text-slate-500 with hover effect

4. **Navigation update:**
   ```typescript
   const navItems: NavItem[] = [
     { label: "Work", href: "/#portfolio" },
     { label: "Process", href: "/#how-i-work" },
     { label: "Pricing", href: "/pricing" },  // NEW - add here
     { label: "2L", href: "/2l" },
     { label: "Capabilities", href: "/capabilities" },
     { label: "Contact", href: "/#contact" },
   ];
   ```

5. **CTA updates:**
   - Hero "Let's Build" button: Change href from "#contact" to "/pricing"
   - CTA Strip "Get in Touch" button: Change href from "#contact" to "/pricing"
   - Contact section primary CTA: Change from mailto to Cal.com link

6. **Contact section Cal.com update:**
   - Change: `href="mailto:ahiya.butman@gmail.com"`
   - To: `href="https://cal.com/ahiya-butman-tigupi/discovery-call"` with `target="_blank" rel="noopener noreferrer"`
   - Or: `href="/pricing#book"` to scroll to embed on pricing page

### Patterns to Follow

Reference patterns from `patterns.md`:
- Use Section Pattern for Testimonials section
- Use Testimonial Card Pattern for each card
- Use Scroll Reveal Pattern for animations
- Use Button Patterns for CTAs

### Testing Requirements

- Verify testimonials section appears in correct position
- Verify 3 testimonials display with correct content
- Verify navigation shows "Pricing" link on desktop and mobile
- Verify CTAs link to correct destinations
- Verify mobile responsive layout

---

## Builder Execution Order

### Phase 1 (Sequential - Run First)
- **Builder-1**: Data Files & Reusable Components
  - Must complete before Phase 2
  - Installs npm dependency
  - Creates foundation for other builders

### Phase 2 (Parallel - Run After Phase 1)
- **Builder-2**: Pricing Page
- **Builder-3**: Homepage Updates

Both depend on Builder 1's outputs but do not depend on each other.

---

## Integration Notes

### Shared Files Created by Builder 1
- `/app/data/testimonials.ts` - Used by Builder 3
- `/app/data/pricing.ts` - Used by Builder 2
- `/app/data/availability.ts` - Used by Builder 2, Builder 3
- `/app/components/UrgencyBadge.tsx` - Used by Builder 2, Builder 3 (optional)
- `/app/components/CalcomEmbed.tsx` - Used by Builder 2

### Potential Conflict Areas
- None expected - builders work on separate files
- Navigation.tsx is only modified by Builder 3
- page.tsx (homepage) is only modified by Builder 3
- pricing/page.tsx is only created by Builder 2

### Final Integration Checklist
After all builders complete:
1. Verify all imports resolve correctly
2. Test navigation flow: Homepage -> Pricing -> Book call
3. Test testimonials section scroll position
4. Test Cal.com booking flow end-to-end
5. Test mobile responsive on all new sections
6. Run `npm run build` to verify no TypeScript errors

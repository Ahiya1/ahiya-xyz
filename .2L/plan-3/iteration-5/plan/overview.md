# 2L Iteration Plan - Homepage Redesign + Project Page Upgrades

## Project Vision

Transform the ahiya.xyz homepage from a generic freelancer landing page into a boutique studio presentation with distinct identity, philosophical depth, and professional polish. Upgrade project pages to case-study format with Challenge/Solution structure.

## Success Criteria

Specific, measurable criteria for MVP completion:

- [ ] Homepage hero communicates "clarity, intention, speed" value proposition
- [ ] New About section establishes systems architect identity with four pillars
- [ ] Services section updated with new titles and descriptions
- [ ] How I Work section shows three-phase process (Architecture, Build, Deliver)
- [ ] New Testimonials section with star rating and Michal Schriber quote
- [ ] Contact section has new title and 24-hour response promise
- [ ] Footer updated with new tagline, Soul link removed
- [ ] Navigation includes About link, Soul link removed
- [ ] StatViz project page has Challenge/Solution sections
- [ ] Mirror of Dreams project page has Challenge/Solution sections
- [ ] Wealth project page has Challenge/Solution sections

## MVP Scope

**In Scope:**
- Homepage complete redesign (7 sections)
- Navigation and Footer updates
- Project page upgrades (3 pages: StatViz, Mirror of Dreams, Wealth)

**Out of Scope (Post-MVP):**
- Contact form (keep mailto)
- Screenshots/visual proof on project pages
- AI Research Pipeline page changes (already complete)
- Blog or writing section
- Pricing page
- Analytics integration

## Development Phases

1. **Exploration** - Complete
2. **Planning** - Current
3. **Building** - ~45 minutes (2 parallel builders)
4. **Integration** - ~5 minutes
5. **Validation** - ~5 minutes
6. **Deployment** - Final

## Timeline Estimate

- Exploration: Complete
- Planning: Complete
- Building: 45 minutes (parallel builders)
  - Builder 1 (Homepage): ~30 minutes
  - Builder 2 (Project Pages): ~25 minutes
- Integration: 5 minutes
- Validation: 5 minutes
- Total: ~55 minutes

## Risk Assessment

### Low Risks
- **Content-only changes**: Most changes are text replacements using existing CSS patterns
- **Established patterns**: All sections use proven CSS classes from globals.css

### Medium Risks
- **3-column layout on mobile**: The new How I Work section uses md:grid-cols-3, needs to stack on mobile (already handled by Tailwind responsive)
- **Soul link removal**: Navigation and Footer both have Soul links - must remove from both

## Integration Strategy

Builder 1 and Builder 2 work on completely separate files:
- Builder 1: `app/page.tsx`, `app/components/Navigation.tsx`, `app/components/Footer.tsx`
- Builder 2: `app/projects/statviz/page.tsx`, `app/projects/mirror-of-dreams/page.tsx`, `app/projects/wealth/page.tsx`

**No file conflicts expected.** Builders can work in parallel without coordination.

## Deployment Plan

1. All changes are content/style updates (no database or API changes)
2. Standard Next.js build and deploy
3. Visual verification on desktop and mobile
4. No environment variable changes required

---

**Plan Status:** READY FOR BUILDING
**Builders Required:** 2 (parallel)

# Iteration 9 Overview: Premium B2B Positioning & 2L Deep Dive

## Vision

Transform ahiya.xyz into a premium B2B portfolio that positions Ahiya as a high-value technical partner, not a generic freelancer. The centerpiece is a dedicated 2L methodology page that explains the proprietary AI orchestration system - the key differentiator that enables "weeks, not months" delivery.

**Target Outcome:** When an agency CTO or founder lands on this site, they immediately understand: this is someone who delivers enterprise-grade systems fast, with a unique technical advantage.

## Success Criteria

- [ ] **2L Page exists** at `/2l` with complete methodology explanation
  - Hero with compelling headline
  - Visual 7-phase pipeline diagram
  - 6 agent types overview
  - 4 client benefit cards
  - Technical accordion with 4 expandable items
  - Case study section with metrics
  - Final CTA section

- [ ] **Capabilities page exists** at `/capabilities` with print-optimized layout
  - 9 sections as specified in vision
  - Proper print styles in globals.css
  - Clean semantic HTML structure

- [ ] **Homepage B2B refresh complete**
  - Updated subheadline with speed/precision messaging
  - CTA strip below hero with 4 action items
  - Updated "How We Work" copy for B2B tone
  - Enhanced 2L mention with link

- [ ] **Navigation updated**
  - "2L" link added pointing to `/2l`
  - "Capabilities" link added pointing to `/capabilities`

- [ ] **Project badges implemented**
  - "Built with 2L" badge on all 4 project pages
  - Badge links to `/2l` page
  - Consistent placement in hero area

- [ ] **Premium polish applied**
  - Print styles in globals.css for capabilities page
  - Subtle badge hover effects

## File Changes Summary

### New Files to Create

| File | Purpose |
|------|---------|
| `/app/2l/page.tsx` | Dedicated 2L methodology deep-dive page |
| `/app/capabilities/page.tsx` | B2B capabilities sheet with print styles |

### Files to Modify

| File | Changes |
|------|---------|
| `/app/page.tsx` | Update subheadline, add CTA strip, update How We Work copy |
| `/app/components/Navigation.tsx` | Add "2L" and "Capabilities" nav items |
| `/app/globals.css` | Add print styles for capabilities page |
| `/app/projects/mirror-of-dreams/page.tsx` | Add "Built with 2L" badge |
| `/app/projects/wealth/page.tsx` | Add "Built with 2L" badge |
| `/app/projects/statviz/page.tsx` | Add "Built with 2L" badge |
| `/app/projects/ai-research-pipeline/page.tsx` | Add "Built with 2L" badge |

## Development Phases

1. **Exploration** - COMPLETE
2. **Planning** - COMPLETE (current)
3. **Building** - Estimated 45-60 minutes (4 parallel builders)
4. **Integration** - Estimated 5-10 minutes
5. **Validation** - Estimated 5 minutes
6. **Deployment** - Final

## Timeline Estimate

- Exploration: Complete
- Planning: Complete
- Building: ~45 minutes (4 parallel builders)
- Integration: ~10 minutes
- Validation: ~5 minutes
- **Total: ~1 hour**

## Risk Assessment

### Low Risk
- **Navigation overflow on mobile:** Adding 2 items may crowd mobile nav. Mitigation: The current mobile nav panel has ample space; test after implementation.

### Low Risk
- **Print styles complexity:** May need iterative testing. Mitigation: Start with basic print overrides, enhance if needed.

### Very Low Risk
- **Consistency across project pages:** Badge must look the same on all 4 pages. Mitigation: Use exact same JSX/classes; documented in patterns.md.

## Integration Strategy

Builders work on isolated concerns:
- Builder-1: Creates new `/app/2l/page.tsx` (no conflicts)
- Builder-2: Creates new `/app/capabilities/page.tsx` + modifies CTA strip on homepage
- Builder-3: Modifies homepage + navigation
- Builder-4: Modifies 4 project pages + adds CSS

**Potential conflict area:** Homepage (`/app/page.tsx`) is modified by both Builder-2 (CTA strip) and Builder-3 (hero/How We Work). Solution: Builder-2 handles ONLY the CTA strip insertion, Builder-3 handles everything else. Integration will merge both changes.

## Deployment Plan

Standard Vercel deployment:
1. All changes merged to main branch
2. Vercel auto-deploys on push
3. No environment variables needed for these changes
4. Test print functionality on deployed site

## Builder Assignment

| Builder | Scope | Complexity |
|---------|-------|------------|
| Builder-1 | 2L Methodology Page | HIGH |
| Builder-2 | Capabilities Page + CTA Strip | MEDIUM |
| Builder-3 | Homepage B2B Refresh + Navigation | MEDIUM |
| Builder-4 | Project Badges + Print CSS | LOW |

# 2L Iteration Plan - Iteration 10: Undeniably Premium & Alive

## Project Vision

Transform the Ahiya portfolio site from "pretty premium" to "undeniably premium" - a site that feels alive, where every element breathes, counts, flows, and responds. This iteration fixes critical navigation bugs, creates a professional PDF capabilities document, animates the 2L methodology showcase, and builds custom interactive demos for each project that genuinely represent what they do.

## Success Criteria

Specific, measurable criteria for iteration completion:

- [ ] Navigation works correctly from ALL pages (hash links go to /#section, not #section)
- [ ] "How We Work" changed to "How I Work" throughout homepage
- [ ] Capabilities PDF generates at build time and is downloadable from /capabilities.pdf
- [ ] Capabilities page redesigned as landing page with download CTA
- [ ] 2L page pipeline has sequential phase lighting animation
- [ ] 2L page metrics count up from 0 when visible (show "7 plans, 10 iterations")
- [ ] StatViz project has animated bar chart demo with toggle views
- [ ] Wealth project has ticking balance counter and transaction animations
- [ ] Mirror of Dreams has cosmic background with AI typing effect
- [ ] AI Research Pipeline has streaming text reveal when switching tabs
- [ ] Scroll-triggered reveals work properly using Intersection Observer
- [ ] useScrollReveal and useCountUp hooks extracted to /app/hooks/
- [ ] Premium CSS utilities added to globals.css

## MVP Scope

**In Scope:**

1. **Navigation Fix** - Use Next.js Link for internal routes, fix hash links to /#hash format
2. **Copy Fixes** - "How We Work" to "How I Work" across homepage
3. **PDF Generation** - @react-pdf/renderer with build-time script
4. **Capabilities Page Redesign** - Landing page with download CTA
5. **2L Page Animations** - Pipeline phases, agent icons, count-up metrics
6. **StatViz Demo** - Animated charts, toggle views, counting metrics
7. **Wealth Demo** - Ticking balance, category bars, transaction list
8. **Mirror of Dreams Demo** - Cosmic background, AI typing effect
9. **AI Pipeline Enhancement** - Streaming text reveal on tab change
10. **Global Animation System** - useScrollReveal hook, useCountUp hook
11. **Premium CSS Utilities** - New keyframes, enhanced hovers, section reveals

**Out of Scope (Post-MVP):**

- Full page transitions between routes
- 3D effects or WebGL
- Sound effects
- Dark/light theme toggle
- Additional project pages
- Blog or content pages

## Development Phases

1. **Exploration** - Complete
2. **Planning** - Current (this document)
3. **Building** - 6 parallel builders (~4-6 hours)
4. **Integration** - Sequential merge (~30 minutes)
5. **Validation** - Manual testing (~20 minutes)
6. **Deployment** - Vercel auto-deploy

## Timeline Estimate

| Phase | Duration | Status |
|-------|----------|--------|
| Exploration | 2 hours | Complete |
| Planning | 30 minutes | Complete |
| Building | 4-6 hours (parallel) | Pending |
| Integration | 30 minutes | Pending |
| Validation | 20 minutes | Pending |
| **Total** | **~5-7 hours** | - |

## Risk Assessment

### High Risks

**None identified** - All tasks use well-understood patterns with existing codebase infrastructure.

### Medium Risks

| Risk | Mitigation |
|------|------------|
| globals.css conflicts (4 builders touch it) | Each builder uses designated CSS section with comments; Builder-6 has final authority |
| PDF logo rendering issues | PNG with transparency should work; JPEG fallback if needed |
| Mobile responsiveness for demos | Test early; have simplified mobile fallback layouts |

### Low Risks

| Risk | Mitigation |
|------|------------|
| Animation performance | CSS-first approach is GPU-accelerated; test on low-end devices |
| package.json conflicts | Only Builder-2 modifies package.json |

## Builder Assignment

| Builder | Focus Area | Complexity | Estimated Time |
|---------|------------|------------|----------------|
| Builder-1 | Navigation Fix + Copy Fixes | LOW | 30-45 min |
| Builder-2 | PDF Generation System | MEDIUM | 2-3 hours |
| Builder-3 | 2L Page Animations | MEDIUM | 2-3 hours |
| Builder-4 | StatViz + Wealth Demos | MEDIUM-HIGH | 3-4 hours |
| Builder-5 | Mirror + AI Pipeline Demos | MEDIUM | 2-3 hours |
| Builder-6 | Global Animations + Polish | MEDIUM | 2-3 hours |

## Integration Strategy

### Merge Order

1. **Builder-1 (Navigation)** - FIRST, no dependencies, critical fix
2. **Builder-6 (Global CSS/Hooks)** - SECOND, creates shared utilities
3. **Builder-2 (PDF)** - THIRD, adds dependency and new files
4. **Builders 3, 4, 5** - PARALLEL after Builder-6, independent features

### CSS Integration

Each builder adds CSS under designated sections in globals.css:

```css
/* ========== BUILDER-3: 2L Page Animations ========== */
/* ========== BUILDER-4: Demo Animations ========== */
/* ========== BUILDER-5: Demo Animations ========== */
/* ========== BUILDER-6: Global Premium Polish ========== */
```

Builder-6 has final authority to resolve any CSS conflicts.

### Shared Files

| File | Builders | Coordination |
|------|----------|--------------|
| globals.css | 3, 4, 5, 6 | Section-based ownership |
| package.json | 2 only | No conflicts |
| /app/hooks/ | 6 (creates), 3, 4, 5 (use) | Builder-6 creates first |

## Deployment Plan

1. All builders complete and push to feature branches
2. Integration merge in order specified above
3. Run `npm run generate:pdf` to create capabilities PDF
4. Run `npm run build` to verify no errors
5. Push to main branch
6. Vercel auto-deploys from main

## File Changes Summary

### New Files Created

| File | Builder | Purpose |
|------|---------|---------|
| /scripts/generate-capabilities-pdf.tsx | Builder-2 | PDF generation script |
| /app/hooks/useScrollReveal.ts | Builder-6 | Shared scroll reveal hook |
| /app/hooks/useCountUp.ts | Builder-6 | Shared count-up hook |
| /public/ahiya-capabilities.pdf | Builder-2 | Generated PDF (build-time) |

### Modified Files

| File | Builder(s) | Changes |
|------|------------|---------|
| /app/components/Navigation.tsx | Builder-1 | Use Link, fix hash links |
| /app/page.tsx | Builder-1, 2 | "How I Work" copy, download link |
| /app/capabilities/page.tsx | Builder-2 | Redesign as landing page |
| /app/2l/page.tsx | Builder-3 | Pipeline animations, count-up |
| /app/projects/statviz/page.tsx | Builder-4 | StatVizDemo integration |
| /app/projects/wealth/page.tsx | Builder-4 | WealthDemo integration |
| /app/projects/mirror-of-dreams/page.tsx | Builder-5 | MirrorDemo integration |
| /app/projects/ai-research-pipeline/page.tsx | Builder-5 | Streaming text enhancement |
| /app/globals.css | Builders 3-6 | Animation keyframes, utilities |
| /package.json | Builder-2 | Add @react-pdf/renderer |

---

*Plan created: 2025-12-04*
*Iteration: 10 (Plan-8)*

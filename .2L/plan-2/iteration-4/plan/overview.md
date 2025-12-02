# 2L Iteration Plan - Portfolio Project Pages & Link Fixes

## Project Vision

Create 4 dedicated project detail pages to showcase the depth of portfolio work, fix incorrect URLs in portfolio data, and update the AI Research Pipeline description to accurately represent its capabilities. Portfolio cards will link to detail pages rather than external sites directly.

## Success Criteria

Specific, measurable criteria for MVP completion:

- [ ] All 4 project detail pages exist and are accessible at `/projects/{project-id}`
- [ ] Portfolio cards on homepage navigate to detail pages (not external sites)
- [ ] Detail pages have correct "Visit Live Site" links (except AI Pipeline)
- [ ] AI Research Pipeline page displays all 5 sample narratives with demographic profiles
- [ ] Mirror of Dreams URL corrected to `selahmirror.xyz` (was `mirror-of-truth.xyz`)
- [ ] Wealth URL added: `selahwealth.xyz`
- [ ] StatViz URL added: `statviz.xyz`
- [ ] AI Research Pipeline description updated to reflect general-purpose capability
- [ ] Build passes without errors (`npm run build`)
- [ ] Mobile responsive on all pages

## MVP Scope

**In Scope:**
- Create `/projects/mirror-of-dreams/page.tsx`
- Create `/projects/wealth/page.tsx`
- Create `/projects/statviz/page.tsx`
- Create `/projects/ai-research-pipeline/page.tsx` (with 5 sample narratives)
- Update `PortfolioProject` interface (add `detailUrl` field)
- Update `portfolio.ts` data (fix URLs, add `detailUrl`, update descriptions)
- Modify `PortfolioCard` to wrap card in Link component

**Out of Scope (Post-MVP):**
- Screenshots/demos for projects
- Video walkthroughs
- Projects index page at `/projects/`
- GitHub repository links
- Analytics/metrics
- Navigation between project pages ("Next Project" links)

## Development Phases

1. **Exploration** - Complete
2. **Planning** - Current
3. **Building** - ~2-3 hours (3 parallel builders)
4. **Integration** - ~15 minutes
5. **Validation** - ~15 minutes
6. **Deployment** - Final

## Timeline Estimate

- Exploration: Complete
- Planning: Complete
- Building: 2-3 hours (parallel builders)
  - Builder 1: ~30 minutes (data & component)
  - Builder 2: ~1 hour (2 simple pages)
  - Builder 3: ~2 hours (1 simple + 1 complex page)
- Integration: ~15 minutes
- Validation: ~15 minutes
- Total: ~3 hours

## Risk Assessment

### Low Risks
- **Interface change breaks existing code**: Mitigation - additive change only (new `detailUrl` field)
- **Link propagation issues**: Mitigation - use `stopPropagation()` on external link buttons

### Medium Risks
- **Wrong URLs deployed**: Mitigation - verify URLs before commit, test all links
- **Sample output formatting issues on mobile**: Mitigation - test narrative tabs/layout on mobile devices

## Integration Strategy

1. **Builder 1 completes first** - Creates the interface changes and data updates that other builders depend on
2. **Builders 2 & 3 work in parallel** - Create project pages independently
3. **Integration**: All pages use consistent patterns from `patterns.md`
4. **Validation**: Run `npm run build` and test all navigation paths

### File Dependencies

| File | Created By | Used By |
|------|------------|---------|
| `PortfolioCard.tsx` (interface) | Builder 1 | Builder 1 (data), Builders 2&3 (pages) |
| `portfolio.ts` (data) | Builder 1 | Homepage portfolio section |
| `mirror-of-dreams/page.tsx` | Builder 2 | - |
| `wealth/page.tsx` | Builder 2 | - |
| `statviz/page.tsx` | Builder 3 | - |
| `ai-research-pipeline/page.tsx` | Builder 3 | - |

## Deployment Plan

1. All files are static Next.js pages - no server-side requirements
2. Standard Next.js build process: `npm run build`
3. Deploy to existing hosting (Vercel or similar)
4. No database migrations required
5. No environment variable changes needed

## Content Sources

All content (descriptions, features, sample narratives) is specified in the vision document:
- `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/.2L/plan-2/vision.md`

Builders should copy content exactly as specified - no creative interpretation needed.

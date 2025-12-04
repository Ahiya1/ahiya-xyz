# 2L Iteration Plan - Phenomenal Project Pages

## Project Vision

Transform project pages from documentation into compelling mini-experiences that prove technical capability and inspire action. Each page should make visitors think "I need to work with this person" rather than just "okay, that's a project."

**Core transformation:** From static documentation to proof of expertise.

## Success Criteria

Specific, measurable criteria for MVP completion:

- [ ] All 4 project pages have visual mockup sections (HTML-based app representations)
- [ ] Each page displays 3-4 concrete metrics with gradient-styled numbers
- [ ] Tech Stack sections transformed to Tech Deep-Dive with "why" explanations
- [ ] GitHub links OR "Private Repository" badges present on all pages
- [ ] CSS-only staggered animations working via `.section-reveal` class
- [ ] Enhanced "Next Project" preview cards replace text links
- [ ] Animations respect `prefers-reduced-motion` preference
- [ ] No JavaScript-based scroll reveal hooks (replaced with CSS-only)

## MVP Scope

**In Scope:**
- Visual Mockup sections with HTML-based app representations
- Metrics display grids (3-4 numbers per project)
- Tech Deep-Dive sections with rationale
- Dual CTAs in hero (View Live + View Source/Private Repo)
- CSS-only section-reveal animations in globals.css
- Enhanced Next Project preview cards
- GitHub/Lock icons for repository indicators

**Out of Scope (Post-MVP):**
- Actual screenshot images (using HTML mockups instead)
- Video demos
- Interactive code playgrounds
- Project-specific testimonials
- Code snippet highlighting

## Development Phases

1. **Exploration** - Complete
2. **Planning** - Current
3. **Building** - Estimated 2-3 hours (parallel builders)
4. **Integration** - Estimated 15 minutes
5. **Validation** - Estimated 15 minutes
6. **Deployment** - Final

## Timeline Estimate

- Exploration: Complete
- Planning: Complete
- Building: ~2 hours (3 parallel builders)
- Integration: ~15 minutes
- Validation: ~15 minutes
- **Total: ~2.5 hours**

## Risk Assessment

### High Risks

- **CSS changes break homepage:** New animation classes could conflict with existing styles
  - *Mitigation:* Use `section-reveal` prefix, test homepage before proceeding with page changes

### Medium Risks

- **useScrollReveal hook inconsistency:** Three different implementations exist across pages
  - *Mitigation:* Remove all JavaScript hooks, replace with CSS-only approach

- **AI Research Pipeline complexity:** Most complex page (541 lines) with SampleNarratives section
  - *Mitigation:* Preserve existing SampleNarratives as Visual Proof, add other sections carefully

### Low Risks

- **Icon import errors:** All required icons available in lucide-react 0.517.0
  - *Mitigation:* Verify imports before use

## Integration Strategy

1. **Builder-1** creates globals.css changes and StatViz template FIRST
2. **Builder-2** and **Builder-3** can work in parallel after globals.css is ready
3. All pages follow identical section structure for consistency
4. No shared component extraction this iteration (keep pages standalone)

**Conflict Prevention:**
- Only Builder-1 touches `globals.css`
- Each builder owns specific page files exclusively
- Use consistent import patterns across all pages

## Deployment Plan

1. All builders complete their tasks
2. Integration phase verifies all 4 pages work correctly
3. Validation phase tests animations, responsive layout, and navigation chain
4. Standard deployment via existing workflow

---

## Page Enhancement Summary

| Page | Visual Mockup | Metrics | Tech Deep-Dive | GitHub |
|------|---------------|---------|----------------|--------|
| StatViz | Admin panel mockup | 4 metrics | 5 technologies | Private |
| Wealth | Dashboard mockup | 4 metrics | 6 technologies | Private |
| Mirror of Dreams | Journal entry mockup | 4 metrics | 6 technologies | Private |
| AI Research Pipeline | Use existing SampleNarratives | 4 metrics | 4 technologies | Private |

---

## Section Order (All Pages)

1. **Hero** - Enhanced with dual CTAs (View Live + View Source/Private)
2. **Visual Mockup** - HTML-based app representation (NEW)
3. **The Challenge** - Existing content, add section-reveal
4. **The Solution** - Existing content, add section-reveal
5. **Key Features** - Existing content, add section-reveal
6. **Tech Deep-Dive** - Enhanced from Tech Stack (ENHANCED)
7. **Metrics** - Concrete numbers display (NEW)
8. **Next Project** - Preview card (ENHANCED)
9. **CTA** - Contact prompt, add section-reveal
10. **Footer** - Existing, unchanged

---

*Plan created: 2025-12-04*
*Iteration: 8*
*Focus: Phenomenal Project Pages*

# 2L Iteration Plan - Hidden CV Interface Implementation

## Project Vision

Create a hidden, professional CV page at `/cv` for part-time collaboration inquiries. The page is intentionally unlisted (no navigation access) and discoverable only through a subtle footer signal on the main site. The design filters for qualified contacts rather than attracting volume.

## Success Criteria

Specific, measurable criteria for completion:

- [ ] CV page renders at `/cv` with all 5 sections (Vision, Systems, Scope, Availability, Contact)
- [ ] Page has no Navigation component (intentionally isolated)
- [ ] Page has minimal footer with just "ahiya.xyz" link
- [ ] Page-level noindex metadata prevents search indexing
- [ ] Availability status displays with colored indicator (green=open, gray=closed)
- [ ] PDF download link points to `/ahiya-cv.pdf`
- [ ] Email link opens mailto with pre-filled subject
- [ ] Footer on main site includes subtle "/cv" link
- [ ] `app/robots.ts` excludes /cv from indexing
- [ ] `npm run generate:cv-pdf` generates PDF successfully
- [ ] `npm run prebuild` chains both PDF generators

## Files Summary

### New Files to Create

| File | Owner | Purpose |
|------|-------|---------|
| `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/lib/cv-config.ts` | Builder 1 | Configuration and copy source of truth |
| `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/cv/page.tsx` | Builder 1 | CV page component |
| `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/robots.ts` | Builder 2 | Robots metadata route |
| `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/scripts/generate-cv-pdf.tsx` | Builder 3 | PDF generator script |

### Files to Modify

| File | Owner | Change |
|------|-------|--------|
| `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/app/components/Footer.tsx` | Builder 2 | Add availability signal link |
| `/home/ahiya/Ahiya/2L/Prod/ahiya-xyz/package.json` | Builder 3 | Add generate:cv-pdf script, update prebuild |

## Development Phases

1. **Exploration** - Complete
2. **Planning** - Current
3. **Building** - ~20 minutes (3 parallel builders)
4. **Integration** - ~5 minutes
5. **Validation** - ~5 minutes
6. **Deployment** - Automatic via prebuild

## Timeline Estimate

- Exploration: Complete
- Planning: Complete
- Building: 20 minutes (parallel)
- Integration: 5 minutes
- Validation: 5 minutes
- **Total: ~30 minutes**

## Risk Assessment

### Low Risks

- **PDF Generation:** Follows proven pattern from capabilities PDF
- **Hydration Mismatch:** Using established mounted state pattern
- **Footer Modification:** Simple 3-line addition with Link import

### No High Risks

All patterns are well-established in the codebase. This is a straightforward implementation.

## Integration Strategy

1. Builder 1 creates config first (dependency for Builder 3)
2. Builder 2 works in parallel (no dependencies)
3. Builder 3 starts after Builder 1 completes (needs cv-config.ts)
4. No file conflicts between builders

## Deployment Plan

1. PDF is generated during `prebuild` script
2. Standard `npm run build` includes CV page
3. No additional deployment configuration needed
4. PDF served as static file from /public
